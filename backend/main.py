import io
import json
import torch
import torch.nn as nn
import torch.nn.functional as F
import httpx
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from torchvision import models, transforms
from PIL import Image

# LOAD ENVIRONMENT VARIABLES
load_dotenv()
GROK_API_KEY = os.getenv("GROK_API_KEY")

# SETUP APLIKASI & CORS
app = FastAPI(title="Plant Disease Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Saat deploy asli, ganti "*" dengan URL domain React kamu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOAD CLASS NAMES & MODEL
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_PATH = "model_data/best_model.pth"
CLASS_NAMES_PATH = "model_data/class_names.json"

print("Loading class names...")
try:
    with open(CLASS_NAMES_PATH, "r") as f:
        class_names = json.load(f)
except Exception as e:
    raise RuntimeError(f"Gagal memuat class_names.json: {e}")

print("Loading MobileNetV2 model...")
model = models.mobilenet_v2(weights=None)
num_ftrs = model.classifier[1].in_features
model.classifier[1] = nn.Linear(num_ftrs, len(class_names))

try:
    model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
    model = model.to(DEVICE)
    model.eval()
    print("Model berhasil dimuat dan siap digunakan!")
except Exception as e:
    raise RuntimeError(f"Gagal memuat best_model.pth: {e}")

# SETUP IMAGE PREPROCESSING
transform_pipeline = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# SKEMA REQUEST UNTUK AI SOLUSI
class SolutionRequest(BaseModel):
    disease_name: str

# ENDPOINTS API
@app.get("/")
def read_root():
    return {"message": "Plant Disease API is running!", "model_device": str(DEVICE)}

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File yang diupload bukan gambar!")

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        input_tensor = transform_pipeline(image)
        input_batch = input_tensor.unsqueeze(0).to(DEVICE)
        
        with torch.no_grad():
            outputs = model(input_batch)
            probabilities = F.softmax(outputs, dim=1)
            confidence, predicted_idx = torch.max(probabilities, 1)
        
        predicted_class = class_names[predicted_idx.item()]
        confidence_score = confidence.item()
        
        return {
            "success": True,
            "prediction": predicted_class,
            "confidence": round(confidence_score, 4),
            "confidence_percent": f"{confidence_score * 100:.2f}%"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan saat memproses gambar: {str(e)}")

@app.post("/api/solution")
async def get_solution(request: SolutionRequest):
    print(f"\n Menerima permintaan solusi untuk penyakit: {request.disease_name}")
    
    if not GROK_API_KEY:
        print(" API Key tidak terbaca dari .env!")
        raise HTTPException(status_code=500, detail="API Key tidak ditemukan di backend")

    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        # Kita tambahkan .strip() untuk membuang spasi tidak sengaja di awal/akhir API Key
        "Authorization": f"Bearer {GROK_API_KEY.strip()}" 
    }
    
    payload = {
        # Menggunakan model terbaru & paling stabil dari Groq
        "model": "llama-3.3-70b-versatile", 
        "messages": [
            {
                "role": "system",
                "content": "Anda adalah pakar pertanian. Berikan solusi praktis untuk penyakit tanaman. DILARANG KERAS menggunakan format Markdown (seperti tanda bintang **, underscore _, atau pagar #). Jawab murni dengan teks biasa (plain text). Jika butuh membuat daftar, gunakan angka biasa (1., 2., 3.)."
            },
            {
                "role": "user",
                "content": f"Tanaman saya terdeteksi terkena penyakit: {request.disease_name}. Bagaimana cara mengatasi dan mengobatinya?"
            }
        ]
    }

    async with httpx.AsyncClient() as client:
        try:
            print(" Mengirim ke server Groq...")
            response = await client.post(url, headers=headers, json=payload, timeout=30.0)
            
            # Jika Groq menolak (error 400 dll), program akan langsung loncat ke 'except'
            response.raise_for_status() 
            
            data = response.json()
            print(" Berhasil mendapatkan solusi dari Groq!")
            return {"solution": data["choices"][0]["message"]["content"]}
            
        except httpx.HTTPStatusError as e:
            # INI YANG PALING PENTING: Mencetak pesan error asli dari Groq ke terminal
            error_msg = e.response.text
            print(f" ERROR DARI GROQ (Status {e.response.status_code}): {error_msg}")
            raise HTTPException(status_code=e.response.status_code, detail=f"Ditolak Groq: {error_msg}")
            
        except Exception as e:
            print(f" Error internal server: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))