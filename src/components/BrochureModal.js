"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrochureModal({ isOpen, onClose, productName, downloadUrl }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "brochure",
          email: email,
          productInterest: productName || "General Brochure",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        // Trigger download after a slight delay
        setTimeout(() => {
          if (downloadUrl) {
            window.open(downloadUrl, "_blank");
          } else {
            alert("Download starting for: " + productName);
          }
          onClose(); // Close modal
          setStatus("idle");
          setEmail(""); // Reset for next time
        }, 1500);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#071240]/60 backdrop-blur-sm"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[480px] bg-white border-t-4 border-[#1E6FA8] shadow-2xl p-8 rounded-sm z-10 font-work-sans"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#1a3c5a] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="mb-6 flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-[#f0f7fc] border border-[#1E6FA8]/20 flex items-center justify-center rounded-sm">
                <span className="material-symbols-outlined text-[#1E6FA8]">picture_as_pdf</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#1a3c5a] uppercase tracking-tighter mb-1">
                  Download brochure
                </h3>
                <p className="text-sm font-medium text-slate-500">
                  {productName ? `Technical specifications for ${productName}` : "Access full engineering specifications."}
                </p>
              </div>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-100 p-6 text-center text-emerald-700 flex flex-col items-center gap-3"
              >
                <span className="material-symbols-outlined text-4xl">check_circle</span>
                <p className="text-[13px] font-black uppercase tracking-widest text-[#071240]">
                  Preparing file...
                </p>
                <p className="text-xs font-medium">Your download will begin automatically.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-black text-[#1a3c5a] uppercase tracking-widest">
                    Business email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="engineer@company.com"
                    className={`w-full bg-slate-50 border-b-2 ${
                      status === "error" ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#1E6FA8]"
                    } focus:bg-white px-4 py-3 text-[13px] font-medium outline-none transition-all`}
                    disabled={status === "loading"}
                    required
                  />
                  {status === "error" && (
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">
                      Unable to process. Please try again or use a valid email.
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 text-xs font-bold text-slate-500 hover:text-[#1a3c5a] hover:bg-slate-50 transition-colors uppercase tracking-widest border border-transparent"
                    disabled={status === "loading"}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-[#1E6FA8] text-white py-4 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#1a3c5a] hover:shadow-lg shadow-[#1E6FA8]/20 transition-all flex items-center justify-center gap-2"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                    ) : (
                      <>
                        Download now
                        <span className="material-symbols-outlined text-sm">download</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
            
            <p className="text-center text-[9px] text-slate-400 mt-6 uppercase tracking-widest font-medium">
              A copy will also be sent to your email.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
