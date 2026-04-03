import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#001e2d] text-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">

            {/* Column 1: Logo, Contact Details */}
            <div className="space-y-8">
              {/* Logo with White Background Block */}
              <div className="inline-block bg-white p-4 rounded-[6px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10">
                <div className="h-10 w-[160px] relative">
                  <Image
                    src="/images/metatech_logo.png"
                    alt="METATECH Industries"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full">
                {/* Address & Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <span className="material-symbols-outlined text-[#82cfff] mt-1 group-hover:scale-110 transition-transform">location_on</span>
                    <div>
                      <p className="text-sm text-slate-300 leading-relaxed font-semibold">
                        Cosmos Bank Bldg, 476,<br />
                        Laxmi Rd, Narayan Peth,<br />
                        Pune, Maharashtra 411030
                      </p>
                      <a href="https://maps.google.com/?q=Metatech+Industries+Pune" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest text-[#82cfff] hover:text-white transition-colors mt-3">
                        <span className="material-symbols-outlined text-[14px]">map</span> View on maps
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <span className="material-symbols-outlined text-[#82cfff] group-hover:scale-110 transition-transform">call</span>
                    <p className="text-sm text-slate-300 font-bold">+91 94225 26706</p>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <span className="material-symbols-outlined text-[#82cfff] group-hover:scale-110 transition-transform">mail</span>
                    <p className="text-sm text-slate-300 font-bold font-mono">sales@metatechind.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Our products */}
            <div>
              <h4 className="text-[13px] font-black tracking-[0.2em] mb-8 text-[#82cfff] border-l-4 border-[#82cfff] pl-4 uppercase">Our Products</h4>
              <ul className="space-y-3">
                {[
                  { name: "Abrasive sectioning", href: "/products" },
                  { name: "Diamond sectioning", href: "/products" },
                  { name: "Hot/cold mounting", href: "/products" },
                  { name: "Manual/automatic polishing", href: "/products" },
                  { name: "Microscopes", href: "/products" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-[14px] text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-semibold group">
                      <span className="w-1.5 h-1.5 bg-[#82cfff] rounded-full opacity-40 shrink-0 group-hover:opacity-100 transition-opacity"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick links */}
            <div>
              <h4 className="text-[13px] font-black tracking-[0.2em] mb-8 text-[#82cfff] border-l-4 border-[#82cfff] pl-4 uppercase">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Products", href: "/products" },
                  { name: "About Us", href: "/about" },
                  { name: "Courses", href: "/courses" },
                  { name: "Accolades", href: "/accolades" },
                  { name: "Contact", href: "/contact" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-[14px] text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-semibold group">
                      <span className="w-2 h-[1px] bg-[#82cfff] opacity-40 shrink-0 group-hover:w-4 transition-all"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Global standards / Certifications */}
            <div>
              <h4 className="text-[13px] font-black tracking-[0.2em] mb-8 text-[#82cfff] border-l-4 border-[#82cfff] pl-4 uppercase">Global Standards</h4>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4 bg-white/5 p-5 rounded-md border border-white/10 group hover:border-[#82cfff]/50 transition-colors">
                  <div className="w-14 h-14 relative shrink-0 bg-white rounded-sm p-1 shadow-inner overflow-hidden">
                    <Image
                      src="/images/iso1-removebg-preview.png"
                      alt="ISO 9001:2015"
                      fill
                      className="object-contain scale-125"
                    />
                  </div>
                  <div>
                    <strong className="block text-[#82cfff] text-[10px] font-black tracking-widest mb-1 uppercase">ISO 9001:2015</strong>
                    <p className="text-[12px] text-slate-300 leading-snug font-medium">Certified manufacturing ensuring absolute precision.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-[10px] font-black tracking-[0.2em] mb-3 text-slate-500 uppercase">Direct procurement</h4>
                  <Link href="/rfq" className="inline-flex items-center gap-3 bg-[#1E6FA8] hover:bg-white hover:text-[#1a3c5a] transition-all text-white text-[11px] font-black tracking-widest px-6 py-4 rounded-sm w-full justify-center group shadow-xl shadow-black/20">
                    Request quotation <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

      {/* Footer Bottom Bar
      <div className="bg-black/20 border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-[12px] font-bold text-slate-500 tracking-wide text-center md:text-left flex items-center gap-1 flex-wrap">
            <span>© 2025</span>{" "}
            <Link href="/" className="text-[#82cfff] text-[18px] font-black hover:text-white transition-colors">
              Metatech Industries
            </Link>
            <span>. All rights reserved. Managed by</span>{" "}
            <a
              href="https://techryz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E6FA8] hover:text-white transition-colors"
            >
              Techryz Innovation LLP
            </a>
            <span>.</span>
          </p>

          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors"
            >
              Terms & conditions
            </Link>
          </div>

        </div>
      </div> */}
    </footer>
  );
}
