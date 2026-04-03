"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, inquiries: 0, brochures: 0 });
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  
  // Filter state
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const fetchInquiries = async (token, filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams({
        ...filters,
        type: filters.type || typeFilter,
        search: filters.search !== undefined ? filters.search : searchTerm,
        startDate: filters.startDate !== undefined ? filters.startDate : startDate,
        endDate: filters.endDate !== undefined ? filters.endDate : endDate
      });

      const res = await fetch(`/api/inquiries?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch inquiries");
      }
      
      setInquiries(data.inquiries || []);
      if (data.stats) setStats(data.stats);
      setAuthenticated(true);
    } catch (err) {
      setError(err.message);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      const delayDebounceFn = setTimeout(() => {
        fetchInquiries(secret);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, typeFilter, startDate, endDate, authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetchInquiries(secret);
  };

  const handleExport = async (format) => {
    setShowExportMenu(false);
    setIsExporting(true);
    
    const queryParams = new URLSearchParams({
      token: secret,
      format,
      type: typeFilter,
      search: searchTerm,
      startDate,
      endDate
    });

    try {
      const res = await fetch(`/api/export?${queryParams.toString()}`);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Export failed");
      }

      if (format === 'google-sheets') {
        const data = await res.json();
        if (data.success && data.url) {
          window.open(data.url, '_blank');
        } else {
          alert(data.error || "Failed to export to Google Sheets");
        }
      } else {
        // Handle file download for CSV and Excel
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `metatech-export-${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : 'csv'}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      alert("Export Error: " + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const isFiltered = searchTerm || typeFilter !== 'all' || startDate || endDate;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-work-sans">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-xl border border-gray-100 w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <span className="material-symbols-outlined text-[#1E6FA8] text-4xl mb-2 flex">lock</span>
            <h1 className="text-xl font-black text-[#1a3c5a] uppercase tracking-tight">Admin portal</h1>
          </div>
          
          {error && <div className="text-red-600 bg-red-50 p-3 text-sm mb-6 rounded border border-red-100 text-center font-medium">{error}</div>}
          
          <div className="mb-6 flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Admin secret</label>
            <div className="relative w-full">
              <input 
                type={showSecret ? "text" : "password"} 
                value={secret} 
                onChange={(e) => setSecret(e.target.value)}
                className="w-full bg-slate-50 border-b-2 border-slate-200 focus:border-[#1E6FA8] focus:bg-white px-4 py-3 pr-10 text-sm outline-none transition-all font-medium"
                placeholder="Enter secure key"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowSecret(!showSecret)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-[#1E6FA8] transition-colors focus:outline-none"
                title={showSecret ? "Hide secret" : "View secret"}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showSecret ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-[#1E6FA8] text-white py-4 rounded-none font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#1a3c5a] transition-colors active:scale-[0.98] flex items-center justify-center gap-2" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
            {!loading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
          </button>
        </form>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-work-sans text-slate-800">
      <div className="max-w-[1400px] mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex flex-col items-center sm:items-start">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Total leads</span>
               <div className="text-3xl font-black text-[#1a3c5a]">{stats.total}</div>
            </div>
            <div className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex flex-col items-center sm:items-start">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Inquiries</span>
               <div className="text-3xl font-black text-blue-600">{stats.inquiries}</div>
            </div>
            <div className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex flex-col items-center sm:items-start">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Brochures</span>
               <div className="text-3xl font-black text-emerald-600">{stats.brochures}</div>
            </div>
        </div>

        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1a3c5a] uppercase tracking-tighter flex items-center gap-3">
              <span className="w-6 h-6 rounded-sm bg-[#1E6FA8] inline-block"></span>
              Inquiries data
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Reviewing incoming leads from website contact forms.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">search</span>
              <input 
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 text-sm focus:border-[#1E6FA8] outline-none transition-all rounded-sm font-medium"
              />
            </div>

            {/* Type Filter */}
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-200 text-sm focus:border-[#1E6FA8] outline-none transition-all rounded-sm font-bold uppercase tracking-wider text-[#1a3c5a]"
            >
              <option value="all">All Types</option>
              <option value="brochure">Brochures</option>
              <option value="inquiry">Inquiries</option>
            </select>

            {/* Date Filters */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-sm">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Range:</span>
                <input 
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-xs outline-none font-bold text-slate-600"
                />
                <span className="text-slate-300">-</span>
                <input 
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-xs outline-none font-bold text-slate-600"
                />
                {(startDate || endDate) && (
                    <button onClick={() => {setStartDate(""); setEndDate("");}} className="ml-1 text-slate-400 hover:text-red-500">
                        <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                )}
            </div>
            
            {/* Export Dropdown */}
            <div className="relative ml-auto xl:ml-0">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={isExporting}
                className="bg-[#1E6FA8] text-white px-6 py-3 min-w-[200px] text-xs font-bold uppercase tracking-widest hover:bg-[#1a3c5a] transition-all rounded-sm shadow-md flex items-center justify-between gap-3 disabled:opacity-70"
              >
                {isExporting ? "Processing..." : `Export ${isFiltered ? '(Filtered Results)' : 'Data'}`}
                <span className={`material-symbols-outlined text-sm transition-transform ${showExportMenu ? 'rotate-180' : ''}`}>
                   {isExporting ? 'sync' : 'expand_more'}
                </span>
              </button>
              
              {showExportMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowExportMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-sm shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                    <button 
                      onClick={() => handleExport('csv')}
                      className="w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-[#1E6FA8] transition-colors flex items-center gap-3 border-b border-slate-50"
                    >
                      <span className="material-symbols-outlined text-lg opacity-60">description</span>
                      Download CSV
                    </button>
                    <button 
                      onClick={() => handleExport('excel')}
                      className="w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-[#1E6FA8] transition-colors flex items-center gap-3 border-b border-slate-50"
                    >
                      <span className="material-symbols-outlined text-lg opacity-60">table_view</span>
                      Export to Excel
                    </button>
                    <button 
                      onClick={() => handleExport('google-sheets')}
                      className="w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-[#1E6FA8] transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-lg opacity-60">open_in_new</span>
                      Open in G-Sheets
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-slate-200 rounded-sm overflow-hidden min-h-[400px]">
          <div className="overflow-x-auto">
            {loading ? (
               <div className="text-center py-20 text-slate-500 font-medium flex flex-col items-center gap-3">
                 <span className="material-symbols-outlined animate-spin text-[#1E6FA8]">sync</span>
                 Syncing Database...
               </div>
            ) : inquiries.length === 0 ? (
               <div className="text-center py-20 flex flex-col items-center gap-3">
                 <span className="material-symbols-outlined text-4xl text-slate-300">inbox</span>
                 <p className="text-slate-500 font-medium">No inquiries found in database.</p>
               </div>
            ) : (
              <table className="w-full min-w-max text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50">
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date logged</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Prospect info</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact details</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Product line</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 max-w-sm">Submission data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inquiries.map((inq) => (
                    <tr key={inq._id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="py-5 px-6 align-top">
                        <div className="flex items-center gap-2 mb-2">
                          {inq.type === 'brochure' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-sm text-[9px] font-black tracking-widest uppercase border border-emerald-100">
                              <span className="material-symbols-outlined text-[10px]">download</span> Brochure
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-sm text-[9px] font-black tracking-widest uppercase border border-blue-100">
                              <span className="material-symbols-outlined text-[10px]">mail</span> Inquiry
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-bold text-slate-700">{new Date(inq.createdAt).toLocaleDateString()}</div>
                        <div className="text-xs text-slate-400 mt-1 font-medium">{new Date(inq.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </td>
                      <td className="py-5 px-6 align-top">
                        <div className="text-sm font-black text-[#1a3c5a]">{inq.fullName}</div>
                        <div className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px] opacity-70">domain</span>
                          {inq.company || "-"}
                        </div>
                      </td>
                      <td className="py-5 px-6 align-top">
                        <a href={`mailto:${inq.email}`} className="text-[#1E6FA8] hover:underline font-bold text-sm block mb-1 truncate max-w-[200px]" title={inq.email}>{inq.email}</a>
                        <div className="text-xs text-slate-500 font-medium">{inq.phone || "No Phone"}</div>
                      </td>
                      <td className="py-5 px-6 align-top">
                        <span className="inline-block px-3 py-1 bg-[#1E6FA8]/10 text-[#1E6FA8] rounded-sm text-[10px] font-black tracking-wider uppercase" title={inq.category}>
                            {inq.category}
                        </span>
                        {inq.productInterest && (
                          <div className="mt-2 text-xs text-slate-600 font-medium truncate max-w-[200px]">
                            <span className="opacity-60">Req:</span> {inq.productInterest}
                          </div>
                        )}
                      </td>
                      <td className="py-5 px-6 align-top max-w-md">
                        <p className="text-sm text-slate-600 leading-relaxed overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}} title={inq.message}>
                          {inq.message || <span className="italic text-gray-400">No message provided</span>}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
