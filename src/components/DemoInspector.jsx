import React, { useState, useEffect } from 'react';
import { 
  Database, RefreshCw, Trash2, Eye, EyeOff, ShieldAlert, Sparkles, 
  ExternalLink, BarChart3, QrCode, X, ChevronRight, Check
} from 'lucide-react';
import { getAllRegistrations, getRegistrationStats, resetDemoRegistrations, seedDemoRegistrations } from '../lib/storage';
import { getAttribution } from '../lib/attribution';

export function DemoInspector({ currentVariant, onVariantChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [attribution, setAttribution] = useState(null);
  const [activeTab, setActiveTab] = useState('records'); // 'records' | 'attribution' | 'qr'
  const [qrUrl, setQrUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const refreshData = () => {
    const list = getAllRegistrations();
    setRecords(list);
    setStats(getRegistrationStats());
    setAttribution(getAttribution());
  };

  useEffect(() => {
    refreshData();
    if (typeof window !== 'undefined') {
      setQrUrl(window.location.href);
    }
  }, [isOpen]);

  const handleReset = () => {
    if (window.confirm('Clear all locally stored demo registrations?')) {
      resetDemoRegistrations();
      refreshData();
    }
  };

  const handleSeed = () => {
    seedDemoRegistrations();
    refreshData();
  };

  // Mask email for data privacy demo
  const maskEmail = (email) => {
    if (!email) return '---';
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const name = parts[0];
    const maskedName = name.length <= 2 ? name + '***' : name.slice(0, 2) + '***' + name.slice(-1);
    return `${maskedName}@${parts[1]}`;
  };

  const copySimulatedLink = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <>
      {/* Floating Trigger Button (Non-intrusive bottom corner) */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-[#10172A]/90 hover:bg-[#17243D] text-[#F7F9FC] border border-[#203254] hover:border-[#50DFFF]/60 px-3.5 py-2 rounded-xl text-xs font-mono shadow-xl backdrop-blur-md transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#50DFFF]"
          title="Open Evaluator Demo Inspector & Attribution Tools"
        >
          <div className="w-2 h-2 rounded-full bg-[#C5F56A] animate-ping" />
          <Database className="w-4 h-4 text-[#50DFFF]" />
          <span className="font-semibold text-white">Demo Inspector</span>
          <span className="px-1.5 py-0.5 rounded bg-[#203254] text-[#C5F56A] font-bold text-[10px]">
            {records.length}
          </span>
        </button>
      </div>

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
          
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Drawer Container */}
          <div className="relative w-full max-w-xl h-full bg-[#0B1322] border-l border-[#203254] shadow-2xl flex flex-col z-10 text-[#F7F9FC] font-sans overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-5 bg-[#10172A] border-b border-[#203254] flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#C5F56A]" />
                  <h3 className="font-bold text-base text-white font-mono">
                    EVALUATOR DEMO INSPECTOR
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-[#C5F56A]/10 text-[#C5F56A] px-2 py-0.5 rounded border border-[#C5F56A]/30">
                    LocalStorage Demo Data
                  </span>
                  <span className="text-[11px] text-[#A8B6C8]">
                    Not live server data
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-[#17243D] text-[#A8B6C8] hover:text-white hover:bg-[#203254] transition-colors"
                aria-label="Close inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 bg-[#0E1729] border-b border-[#203254] text-xs font-mono">
              <button
                onClick={() => setActiveTab('records')}
                className={`py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'records'
                    ? 'bg-[#131E33] text-[#C5F56A] font-bold border-b-2 border-b-[#C5F56A]'
                    : 'text-[#A8B6C8] hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Registrations ({records.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('attribution')}
                className={`py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'attribution'
                    ? 'bg-[#131E33] text-[#50DFFF] font-bold border-b-2 border-b-[#50DFFF]'
                    : 'text-[#A8B6C8] hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Campaign & Variants</span>
              </button>

              <button
                onClick={() => setActiveTab('qr')}
                className={`py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'qr'
                    ? 'bg-[#131E33] text-[#F7F9FC] font-bold border-b-2 border-b-[#50DFFF]'
                    : 'text-[#A8B6C8] hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Code Hub</span>
              </button>
            </div>

            {/* Drawer Body Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* TAB 1: REGISTRATIONS */}
              {activeTab === 'records' && (
                <div className="space-y-5">
                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#10172A] border border-[#203254]">
                      <div className="text-[10px] font-mono uppercase text-[#A8B6C8]">Total Registrations</div>
                      <div className="text-xl font-bold text-white mt-1">{stats?.totalRegistrations || 0}</div>
                      <div className="text-[10px] text-[#50DFFF]">Normalized emails</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#10172A] border border-[#203254]">
                      <div className="text-[10px] font-mono uppercase text-[#A8B6C8]">Final Year Ratio</div>
                      <div className="text-xl font-bold text-[#C5F56A] mt-1">{stats?.finalYearPercentage || 0}%</div>
                      <div className="text-[10px] text-[#A8B6C8]">{stats?.finalYearCount || 0} students</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#10172A] border border-[#203254]">
                      <div className="text-[10px] font-mono uppercase text-[#A8B6C8]">Colleges</div>
                      <div className="text-xl font-bold text-white mt-1">{stats?.uniqueCollegesCount || 0}</div>
                      <div className="text-[10px] text-[#A8B6C8]">Institutions</div>
                    </div>
                  </div>

                  {/* Seed & Reset Controls */}
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#10172A] border border-[#203254]">
                    <div className="text-xs text-[#A8B6C8]">
                      Demo Data Actions:
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSeed}
                        className="px-2.5 py-1.5 rounded-lg bg-[#17243D] hover:bg-[#203254] text-xs font-mono text-[#50DFFF] border border-[#203254] transition-colors"
                      >
                        + Seed 3 Samples
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-xs font-mono text-red-300 border border-red-500/30 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* Registrations Table / List */}
                  {records.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-[#203254] rounded-xl space-y-3">
                      <Database className="w-8 h-8 text-[#64748B] mx-auto" />
                      <p className="text-sm text-[#A8B6C8]">No registrations stored yet in LocalStorage.</p>
                      <p className="text-xs text-[#64748B]">Fill out the landing page form or click "Seed 3 Samples" above.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#A8B6C8] font-mono">
                        <span>Latest Demo Registrations</span>
                        <span className="text-[11px] text-[#50DFFF]">Email masked for privacy</span>
                      </div>

                      <div className="space-y-2.5">
                        {records.map((r) => (
                          <div
                            key={r.id}
                            className="p-3.5 rounded-xl bg-[#10172A] border border-[#203254] hover:border-[#2E4574] transition-colors text-xs space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-[#C5F56A]">{r.id}</span>
                              <span className="font-mono text-[10px] text-[#A8B6C8]">
                                {new Date(r.registeredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[#A8B6C8]">
                              <div>
                                <span className="text-white font-medium">{r.fullName}</span>
                                <div className="text-[11px] text-[#64748B] truncate">{maskEmail(r.normalizedEmail)}</div>
                              </div>
                              <div className="text-right">
                                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#17243D] text-[#50DFFF] border border-[#203254]">
                                  {r.yearOfStudy}
                                </span>
                                <div className="text-[11px] text-[#A8B6C8] truncate">{r.college}</div>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-[#203254]/50 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                              <span>Source: <strong className="text-[#A8B6C8]">{r.attribution?.source || 'direct'}</strong></span>
                              {r.referralCode && (
                                <span className="text-[#C5F56A]">Ref: {r.referralCode}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CAMPAIGN ATTRIBUTION & VARIANTS */}
              {activeTab === 'attribution' && (
                <div className="space-y-6">
                  {/* Current Active Attribution */}
                  <div className="p-4 rounded-xl bg-[#10172A] border border-[#203254] space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#50DFFF] tracking-wider">
                      Currently Active Attribution
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[#64748B] block">utm_source:</span>
                        <span className="text-white font-bold">{attribution?.utm_source || 'direct'}</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block">utm_medium:</span>
                        <span className="text-white font-bold">{attribution?.utm_medium || 'web'}</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block">utm_campaign:</span>
                        <span className="text-white font-bold">{attribution?.utm_campaign || 'ai_workshop'}</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block">referral code:</span>
                        <span className="text-[#C5F56A] font-bold">{attribution?.ref || '(None)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Headline Variant Tester */}
                  <div className="p-4 rounded-xl bg-[#10172A] border border-[#203254] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#C5F56A] tracking-wider">
                        Headline Experiment Variant
                      </h4>
                      <span className="text-[10px] font-mono text-[#A8B6C8]">A/B Message Test</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { key: 'default', label: 'Default', desc: 'Build in 60m' },
                        { key: 'outcome', label: 'Outcome', desc: 'Build & Deploy' },
                        { key: 'career', label: 'Career', desc: 'Placement Boost' }
                      ].map((v) => (
                        <button
                          key={v.key}
                          onClick={() => onVariantChange(v.key)}
                          className={`p-2.5 rounded-lg border text-left transition-colors ${
                            currentVariant === v.key
                              ? 'bg-[#17243D] border-[#C5F56A] text-white font-bold'
                              : 'bg-[#0B1322] border-[#203254] text-[#A8B6C8] hover:text-white'
                          }`}
                        >
                          <div className="font-mono text-[11px] text-[#50DFFF]">{v.label}</div>
                          <div className="text-[10px] truncate">{v.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Campaign Simulation Links */}
                  <div className="p-4 rounded-xl bg-[#10172A] border border-[#203254] space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                      Simulate Inbound Campaign Links
                    </h4>
                    <p className="text-xs text-[#A8B6C8]">
                      Click below to test how incoming students from WhatsApp, Campus Ambassadors, or QR posters are attributed:
                    </p>

                    <div className="space-y-2 text-xs font-mono">
                      {[
                        {
                          title: 'WhatsApp Student Community',
                          query: '?utm_source=whatsapp&utm_medium=student_community&utm_campaign=ai_workshop'
                        },
                        {
                          title: 'Campus Ambassador Referral',
                          query: '?utm_source=campus_ambassador&utm_medium=student_network&ref=AMBASSADOR01'
                        },
                        {
                          title: 'Canva Poster QR Code',
                          query: '?utm_source=qr_poster&utm_medium=print_canva&utm_campaign=ai_workshop'
                        },
                        {
                          title: 'Engineering College Tech Club',
                          query: '?utm_source=college_club&utm_medium=discord&utm_campaign=ai_workshop&variant=career'
                        }
                      ].map((item) => (
                        <a
                          key={item.title}
                          href={item.query}
                          className="block p-2.5 rounded-lg bg-[#0B1322] hover:bg-[#17243D] border border-[#203254] text-[#A8B6C8] hover:text-white transition-colors group"
                        >
                          <div className="flex items-center justify-between text-[11px] text-white font-semibold">
                            <span>{item.title}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#50DFFF] group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <div className="text-[10px] text-[#50DFFF] truncate mt-0.5">{item.query}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: QR CODE GENERATOR & POSTER LINKING */}
              {activeTab === 'qr' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-[#10172A] border border-[#203254] space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#C5F56A] tracking-wider">
                      Campaign QR Code Linkage
                    </h4>
                    <p className="text-xs text-[#A8B6C8] leading-relaxed">
                      Use this QR code on your printed or digital Canva campaign poster. When students scan it with their smartphone camera, they land directly on this optimized mobile landing page with attribution parameters pre-attached.
                    </p>
                  </div>

                  {/* QR Code Visual Preview */}
                  <div className="p-6 rounded-2xl bg-[#0B1322] border border-[#203254] text-center space-y-4">
                    <div className="inline-block p-4 rounded-2xl bg-white shadow-xl">
                      {/* Standard dynamic SVG QR Code visual */}
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl)}&color=07111F&bgcolor=FFFFFF`}
                        alt="Campaign QR Code for Canva Poster"
                        className="w-44 h-44 mx-auto rounded-lg"
                        onError={(e) => {
                          // Fallback to placeholder if offline
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-mono text-[#C5F56A]">SCAN TO REGISTER</div>
                      <div className="text-xs text-[#A8B6C8] font-mono break-all max-w-sm mx-auto">
                        {qrUrl}
                      </div>
                    </div>

                    <button
                      onClick={() => copySimulatedLink(qrUrl)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#17243D] hover:bg-[#203254] text-xs font-mono text-white border border-[#203254] transition-colors"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-[#C5F56A]" /> : <QrCode className="w-3.5 h-3.5 text-[#50DFFF]" />}
                      <span>{copiedLink ? 'Link Copied!' : 'Copy Target Link'}</span>
                    </button>
                  </div>

                  {/* Step Instructions */}
                  <div className="p-4 rounded-xl bg-[#10172A] border border-[#203254] text-xs text-[#A8B6C8] space-y-2">
                    <strong className="text-white block font-mono text-xs uppercase">
                      How to link this to your Canva Poster:
                    </strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Deploy your site to Vercel (e.g. <code className="text-[#50DFFF]">ai-build-lab.vercel.app</code>)</li>
                      <li>Add campaign query: <code className="text-[#C5F56A]">?utm_source=qr_poster&utm_medium=canva_print</code></li>
                      <li>Generate your final SVG or PNG QR in Canva / QR generator</li>
                      <li>Paste into the poster's "SCAN TO REGISTER" frame!</li>
                    </ol>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#0E1729] border-t border-[#203254] flex items-center justify-between text-xs text-[#64748B] font-mono">
              <span>NxtWave Growth Challenge</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#A8B6C8] hover:text-white"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
