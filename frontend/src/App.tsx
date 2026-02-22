import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Detection from "./pages/Detection";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative w-full min-h-screen bg-[#052e16] font-sans antialiased text-white flex flex-col">
        {/* Navbar tetap di atas */}
        <Navbar />

        {/* Main content dengan flex-grow agar mendorong footer ke bawah */}
        <main className="w-full flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<Detection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Footer akan muncul di semua halaman */}
        <Footer />
        
        {/* Efek Gradient Global */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full" />
        </div>
      </div>
    </Router>
  );
};

export default App;