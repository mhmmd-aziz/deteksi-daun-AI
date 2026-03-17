import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' // TypeScript otomatis mencari file .tsx

/**
 * Penggunaan 'as HTMLElement' sangat penting di TSX.
 * Ini memberi tahu TypeScript bahwa elemen dengan id 'root' pasti ada di index.html,
 * sehingga mencegah error "Object is possibly 'null'".
 */
const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)