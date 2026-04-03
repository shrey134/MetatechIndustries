"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phoneCode: "+91",
    phone: "",
    category: "",
    productInterest: "",
    message: ""
  });

  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    const prod = searchParams.get("product");
    if (cat || prod) {
      setFormData(prev => ({
        ...prev,
        category: cat || "",
        productInterest: prod || "",
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 10-digit numeric-only validation for phone
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        ...formData,
        phone: formData.phone ? `${formData.phoneCode} ${formData.phone}` : ""
      };

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "An error occurred during submission.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#f0f9ff] border-l-4 border-[#1E6FA8] p-8 mt-4 animate-in fade-in duration-500">
        <div className="flex items-center gap-4 mb-4">
          <span className="material-symbols-outlined text-[40px] text-[#1E6FA8]">check_circle</span>
          <h3 className="text-2xl font-black text-[#1a3c5a] tracking-tight">Inquiry Received</h3>
        </div>
        <p className="text-slate-600 font-medium leading-relaxed max-w-md">
          Thank you. Our dedicated team will review your requirements and contact you shortly. A confirmation email has been sent to <strong>{formData.email}</strong>.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData(prev => ({ ...prev, message: "", productInterest: "" })); // reset some fields
          }}
          className="mt-6 text-sm font-bold text-[#1E6FA8] hover:underline tracking-widest flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
      {status === "error" && (
        <div className="md:col-span-2 bg-red-50 text-red-600 p-4 text-sm font-bold border-l-4 border-red-500">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-[#1a3c5a] mb-2 tracking-tight">Full name *</label>
        <input name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full border-2 border-[#1E6FA8]/30 px-4 py-3 text-sm bg-white focus:border-[#1E6FA8] focus:outline-none rounded-sm transition-colors" placeholder="Ex: John Doe" type="text" disabled={status === "submitting"} />
      </div>

      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-[#1a3c5a] mb-2 tracking-tight">Company</label>
        <input name="company" value={formData.company} onChange={handleChange} className="w-full border-2 border-[#1E6FA8]/30 px-4 py-3 text-sm bg-white focus:border-[#1E6FA8] focus:outline-none rounded-sm transition-colors" placeholder="Organization Name" type="text" disabled={status === "submitting"} />
      </div>

      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-[#1a3c5a] mb-2 tracking-tight">Email address *</label>
        <input name="email" value={formData.email} onChange={handleChange} required className="w-full border-2 border-[#1E6FA8]/30 px-4 py-3 text-sm bg-white focus:border-[#1E6FA8] focus:outline-none rounded-sm transition-colors" placeholder="john@company.com" type="email" disabled={status === "submitting"} />
      </div>

      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-[#1a3c5a] mb-2 tracking-tight">Phone number</label>
        <div className="flex gap-2">
          <select name="phoneCode" value={formData.phoneCode} onChange={handleChange} className="border-2 border-[#1E6FA8]/30 px-2 py-3 text-sm bg-white focus:border-[#1E6FA8] focus:outline-none w-24 shrink-0 rounded-sm transition-colors" disabled={status === "submitting"}>
            <option>+91</option>
            <option>+1</option>
            <option>+44</option>
            <option>+971</option>
            <option>+66</option>
          </select>
          <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border-2 border-[#1E6FA8]/30 px-4 py-3 text-sm bg-white focus:border-[#1E6FA8] focus:outline-none rounded-sm transition-colors" placeholder="10-digit Number" type="tel" disabled={status === "submitting"}/>
        </div>
      </div>
      
      <div className="flex flex-col md:col-span-2">
        <label className="text-[16px] font-medium text-[#1a3c5a] mb-2 tracking-tight">Product category *</label>
        <div className="relative">
          <select 
            name="category"
            value={formData.category} 
            onChange={handleChange}
            required
            disabled={status === "submitting"}
            className="w-full border-2 border-[#1E6FA8]/30 px-4 py-3 text-sm bg-white focus:border-[#1E6FA8] focus:outline-none appearance-none cursor-pointer pr-10 rounded-sm transition-colors"
          >
            <option disabled value="">Select product category...</option>
            <option value="Sectioning & Cutting">Sectioning & Cutting</option>
            <option value="Mounting & Embedding">Mounting & Embedding</option>
            <option value="Grinding & Polishing">Grinding & Polishing</option>
            <option value="Microscopy & Imaging">Microscopy & Imaging</option>
            <option value="Hardness Testing">Hardness Testing</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">
            unfold_more
          </span>
        </div>
      </div>

      <div className="flex flex-col md:col-span-2">
        <label className="text-[16px] font-medium text-[#1a3c5a] mb-2 tracking-tight">Product interest</label>
        <input 
          name="productInterest"
          value={formData.productInterest}
          onChange={handleChange}
          disabled={status === "submitting"}
          className="w-full border-2 border-[#1E6FA8]/30 px-4 py-3 text-sm bg-white focus:border-[#1E6FA8] focus:outline-none rounded-sm transition-colors" 
          placeholder="Specific model or material type" 
          type="text" 
        />
      </div>

      <div className="flex flex-col md:col-span-2">
        <label className="text-[16px] font-medium text-[#1a3c5a] mb-2 tracking-tight">Message / requirements</label>
        <textarea 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          disabled={status === "submitting"}
          className="w-full border-2 border-[#1E6FA8]/30 px-4 py-3 text-sm bg-white focus:border-[#1E6FA8] focus:outline-none resize-none rounded-sm transition-colors" 
          placeholder="Please describe your requirements..." 
          rows="4"
        ></textarea>
      </div>

      <div className="md:col-span-2 pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`text-white px-10 py-3 text-sm font-medium transition-all flex items-center justify-center gap-3 tracking-wider rounded-none ${status === "submitting" ? "bg-[#1E6FA8]/70 cursor-not-allowed" : "bg-[#1a3c5a] hover:bg-[#16324a] active:scale-[0.98]"}`}
        >
          {status === "submitting" ? "Processing..." : "Send inquiry"}
          {!status.includes("submitting") && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
          {status === "submitting" && <span className="material-symbols-outlined text-sm animate-spin">sync</span>}
        </button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-work-sans">
      {/* Hero Header - Refined Alignment & Typography */}
      <section className="relative pt-6 pb-12 border-b border-slate-100 overflow-hidden bg-slate-50">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[#1E6FA8] translate-x-1/2 -rotate-12 transform origin-top-right"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:mt-4">
            <div className="lg:w-1/2 pt-4">
              <span className="inline-block text-sm md:text-base font-semibold tracking-[0.08em] text-primary mb-6">
                Direct Channel
                <span className="block w-12 h-[2px] bg-primary mt-2"></span>
              </span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-[#1a3c5a] mb-8 leading-none">
                Get in Touch
              </h1>
              <p className="text-slate-600 text-[16px] md:text-lg leading-relaxed max-w-xl font-medium mb-10">
                Access our global network of technical expertise. Whether you need immediate troubleshooting, software updates, or a detailed project consultation, our precision-engineered support system is at your service.
              </p>
              
              {/* ISO Certification Badge - Integrated exactly as requested */}
              <div className="flex items-center gap-4 bg-white/60 px-4 py-3 rounded-md border border-white/50 shadow-sm w-fit backdrop-blur-sm">
                <img
                  src="/images/iso1-removebg-preview.png"
                  alt="ISO Certified"
                  className="w-16 h-16 object-contain"
                />
                <div className="space-y-0.5">
                  <p className="text-[20px] font-semibold text-[#1a3c5a] leading-tight">
                    ISO 9001:2015 Certified
                  </p>
                  <p className="text-sm text-slate-500 font-medium">
                    Trusted Quality Excellence
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full self-stretch">
              <div className="relative h-[350px] md:h-[450px] w-full rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white">
                <Image
                  src="/images/1774676327322~2.png"
                  alt="Metatech Industrial Laboratory"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid - Structured & Industrial */}
      <section className="max-w-7xl mx-auto px-8 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Inquiry Form Column */}
        <div className="lg:col-span-8">
          <div className="bg-[#F0F9FF] p-10 border border-[#1E6FA8]/10 rounded-none shadow-sm">
            <h2 className="text-[22px] font-black text-[#1a3c5a] mb-10 pb-4 border-b border-[#1E6FA8]/10 flex items-center gap-3 tracking-tight">
              <span className="w-8 h-[2px] bg-[#1E6FA8]"></span>
              Submit an Inquiry
            </h2>
            <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse"></div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Main Map Visualization */}
          <div id="map" className="mt-16 group">
            <h2 className="text-xl font-black text-[#1a3c5a] mb-6 pb-4 border-b border-gray-100 tracking-tight flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#1E6FA8]"></span>
              Locate Us
            </h2>
            <div className="relative w-full h-[400px] overflow-hidden rounded-none border border-gray-200 shadow-none">
              <iframe
                src="https://www.google.com/maps?q=Metatech%20Industries%20Pune&z=17&output=embed"
                className="w-full h-full border-0 transition-all duration-700"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 md:p-10 border border-gray-200 shadow-sm space-y-10">

            {/* Quick Contact Block */}
            <div className="space-y-5">
              <h4 className="text-[16px] font-black text-[#1E6FA8] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                Direct Contact
              </h4>
              <div className="p-6 md:p-8 bg-gradient-to-br from-[#1a3c5a] to-[#00658d] text-white rounded-[4px] shadow-lg shadow-[#00658d]/20 border-none relative overflow-hidden">
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/5 text-[100px] pointer-events-none">engineering</span>
                <p className="text-[10px] font-black tracking-widest mb-2 opacity-70 relative z-10">Sales Inquiries</p>
                <Link href="mailto:sales@metatechind.com" className="text-sm md:text-base font-bold tracking-tight mb-6 hover:text-[#82cfff] transition-colors block break-all relative z-10">sales@metatechind.com</Link>
                <div className="h-[1px] w-12 bg-white/20 mb-6 relative z-10"></div>
                <p className="text-[10px] font-black tracking-widest mb-2 opacity-70 relative z-10">Main Office Lines</p>
                <p className="text-xl font-bold tracking-tight mb-1 relative z-10">+91 94225 26706</p>
                <p className="text-xl font-bold tracking-tight relative z-10">+91 98220 12226</p>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="group border-t border-gray-100 pt-8">
              <h4 className="text-[16px] font-black text-[#1a3c5a] mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Department Emails
              </h4>
              <ul className="space-y-5 text-[14px] text-slate-800 font-medium">
                <li>
                  <strong className="block text-[11px] text-[#1a3c5a] font-black tracking-wider mb-1">General Information</strong> 
                  <a href="mailto:meta@metatechind.com" className="text-[#1E6FA8] hover:underline">meta@metatechind.com</a>
                </li>
                <li>
                  <strong className="block text-[11px] text-[#1a3c5a] font-black tracking-wider mb-1">Support Team</strong> 
                  <a href="mailto:support@metatechind.com" className="text-[#1E6FA8] hover:underline">support@metatechind.com</a>
                </li>
              </ul>
            </div>

            {/* Phone Numbers */}
            <div className="group border-t border-gray-100 pt-8">
              <h4 className="text-[16px] font-black text-[#1a3c5a] mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">call_log</span>
                Direct Lines
              </h4>
              <ul className="space-y-5 text-[14px] text-slate-800 font-medium">
                <li>
                  <strong className="block text-[11px] text-[#1a3c5a] font-black tracking-wider mb-2">Consumables Department</strong> 
                  <div className="flex flex-col gap-1 text-slate-600">
                    <span>+91 98220 06106</span>
                    <span>+91 83800 15435</span>
                  </div>
                </li>
                <li>
                  <strong className="block text-[11px] text-[#1a3c5a] font-black tracking-wider mb-2">Technical Support</strong> 
                  <span className="text-slate-600">+91 98765 43210</span>
                </li>
              </ul>
            </div>

            {/* Working Hours */}
            <div className="group border-t border-gray-100 pt-8">
              <h4 className="text-[16px] font-black text-[#1a3c5a] mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                Working Hours
              </h4>
              <ul className="space-y-3 text-[14px] text-slate-600 font-medium border-l-[3px] border-[#1E6FA8]/20 pl-4 py-1">
                <li className="flex justify-between items-center">
                  <strong className="text-slate-800">Monday - Friday:</strong> 
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between items-center">
                  <strong className="text-slate-800">Saturday:</strong> 
                  <span>9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between items-center">
                  <strong className="text-slate-800">Sunday:</strong> 
                  <span className="text-red-600 font-bold tracking-wider text-[11px]">Closed</span>
                </li>
              </ul>
              
              <div className="mt-5 bg-[#f8fafc] p-4 rounded-md border border-[#e2e8f0]">
                <strong className="block text-[10px] text-[#1E6FA8] font-black tracking-widest mb-1">Technical Support Hours</strong>
                <span className="text-[14px] font-bold text-slate-700">8:00 AM - 8:00 PM (Weekdays)</span>
              </div>
            </div>

            {/* Main Office Address */}
            <div className="group border-t border-gray-100 pt-8">
              <h4 className="text-[16px] font-black text-[#1a3c5a] mb-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">business</span>
                Main Office
              </h4>
              <address className="text-[14px] text-slate-800 leading-relaxed font-semibold not-italic border-l-[3px] border-[#1a3c5a] pl-4">
                476, Narayan Peth,<br />
                Cosmos Bank Building,<br />
                Off Laxmi Road,<br />
                Pune - 411 030
              </address>
              <button onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-slate-50 border border-slate-200 text-[11px] font-black tracking-widest text-[#1a3c5a] hover:bg-slate-100 transition-colors w-full justify-center">
                <span className="material-symbols-outlined text-[14px] text-[#1E6FA8]">map</span> View on maps
              </button>
            </div>


          </div>
        </div>
      </section>
    </div>
  );
}
