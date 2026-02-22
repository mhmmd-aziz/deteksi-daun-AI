import React from "react";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Mail, 
  MapPin, 
  Phone, 
  Instagram, 
  Twitter, 
  Github,
  LucideIcon 
} from "lucide-react";

// Definisi Interface untuk props jika diperlukan di masa depan
interface FooterLink {
  name: string;
  path: string;
}

interface SocialLink {
  Icon: LucideIcon;
  href: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { Icon: Instagram, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Github, href: "#" },
  ];

  const navLinks: FooterLink[] = [
    { name: "Beranda", path: "/" },
    { name: "Deteksi AI", path: "/detect" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Kontak", path: "/contact" },
  ];

  return (
    <footer className="relative w-full bg-[#052e16] pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Efek Background Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Leaf size={20} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                OenKayee<span className="text-emerald-500">AI</span>
              </span>
            </div>
            <p className="text-emerald-100/50 leading-relaxed text-sm">
              Solusi pertanian cerdas berbasis AI Vision untuk membantu petani mendeteksi penyakit tanaman secara real-time dan meningkatkan hasil panen.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, idx) => (
                <a 
                  key={idx} 
                  href={href} 
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-emerald-100/50 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-[10px]">Navigasi</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-emerald-100/50 hover:text-emerald-400 transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Info Kontak */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-[10px]">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-emerald-100/50">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <span>Jl. Agroteknologi No. 12, Jakarta Selatan</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-emerald-100/50">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-emerald-100/50">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>hello@greenx.ai</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-[10px]">Newsletter</h4>
            <p className="text-emerald-100/50 text-sm">Update teknologi agrikultur mingguan.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email anda" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
                Berlangganan
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-emerald-200/20 text-[11px]">
          <p>© 2026 Greenx. Built for a Greener Tomorrow.</p>
          <div className="flex gap-8 font-bold uppercase tracking-widest">
             <span className="hover:text-emerald-400/50 transition-colors cursor-pointer">Privacy</span>
             <span className="hover:text-emerald-400/50 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;