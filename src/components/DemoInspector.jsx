import React, { useState, useEffect } from 'react';
import { 
  Database, Trash2, 
  BarChart3, QrCode, X, ChevronRight, Check
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
          className="flex items-center gap-2 bg-[#0D1523]/90 hover:bg-[#111C2E] text-[#F5F7FB] border border-white/[0.1] hover:border-white/[0.25] px-3 py-1.5 rounded-lg text-xs font-mono shadow-xl backdrop-blur-md transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#4ADFFF]"
          title="Open Evaluator Demo Inspector & Attribution Tools"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5F56A]" />
          <Database className="w-3.5 h-3.5 text-[#4ADFFF]" strokeWidth={1.75} />
          <span className="font-medium text-[#F5F7FB]">Demo Inspector</span>
          <span className="px-1.5 py-0.2 rounded bg-[#111C2E] text-[#C5F56A] font-bold text-[10px] border border-white/[0.08]">
            {records.length}
          </span>
        </button>
      </div>

      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
          
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Drawer Container */}
          <div className="relative w-full max-w-xl h-full bg-[#070B14] border-l border-white/[0.08] shadow-2xl flex flex-col z-10 text-[#F5F7FB] font-sans overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-4 bg-[#0D1523] border-b border-white/[0.06] flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#C5F56A]" strokeWidth={1.75} />
                  <h3 className="font-display font-bold text-sm text-[#F5F7FB]">
                    EVALUATOR DEMO INSPECTOR
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-[#C5F56A]/10 text-[#C5F56A] px-2 py-0.2 rounded border border-[#C5F56A]/20">
                    LocalStorage Demo Data
                  </span>
                  <span className="text-[11px] text-[#A5B2C5]/70">
                    Not live server data
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md bg-[#111C2E] text-[#A5B2C5] hover:text-[#F5F7FB] border border-white/[0.06] transition-colors"
                aria-label="Close inspector"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 bg-[#090F1A] border-b border-white/[0.06] text-xs font-mono">
              <button
                onClick={() => setActiveTab('records')}
                className={`py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === 'records'
                    ? 'bg-[#0D1523] text-[#C5F56A] font-semibold border-b border-b-[#C5F56A]'
                    : 'text-[#A5B2C5] hover:text-[#F5F7FB]'
                }`}
              >
                <Database className="w-3 h-3" strokeWidth={1.75} />
                <span>Registrations ({records.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('attribution')}
                className={`py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === 'attribution'
                    ? 'bg-[#0D1523] text-[#4ADFFF] font-semibold border-b border-b-[#4ADFFF]'
                    : 'text-[#A5B2C5] hover:text-[#F5F7FB]'
                }`}
              >
                <BarChart3 className="w-3 h-3" strokeWidth={1.75} />
                <span>Campaign & Variants</span>
              </button>

              <button
                onClick={() => setActiveTab('qr')}
                className={`py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === 'qr'
                    ? 'bg-[#0D1523] text-[#F5F7FB] font-semibold border-b border-b-[#4ADFFF]'
                    : 'text-[#A5B2C5] hover:text-[#F5F7FB]'
                }`}
              >
                <QrCode className="w-3 h-3" strokeWidth={1.75} />
                <span>QR Code Hub</span>
              </button>
            </div>

            {/* Drawer Body Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              
              {/* TAB 1: REGISTRATIONS */}
              {activeTab === 'records' && (
                <div className="space-y-4">
                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-lg bg-[#0D1523] border border-white/[0.06]">
                      <div className="text-[10px] font-mono uppercase text-[#A5B2C5]/70">Total Registrations</div>
                      <div className="font-display text-lg font-bold text-[#F5F7FB] mt-0.5">{stats?.totalRegistrations || 0}</div>
                      <div className="text-[10px] text-[#4ADFFF]">Normalized emails</div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0D1523] border border-white/[0.06]">
                      <div className="text-[10px] font-mono uppercase text-[#A5B2C5]/70">Final Year Ratio</div>
                      <div className="font-display text-lg font-bold text-[#C5F56A] mt-0.5">{stats?.finalYearPercentage || 0}%</div>
                      <div className="text-[10px] text-[#A5B2C5]/70">{stats?.finalYearCount || 0} students</div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0D1523] border border-white/[0.06]">
                      <div className="text-[10px] font-mono uppercase text-[#A5B2C5]/70">Colleges</div>
                      <div className="font-display text-lg font-bold text-[#F5F7FB] mt-0.5">{stats?.uniqueCollegesCount || 0}</div>
                      <div className="text-[10px] text-[#A5B2C5]/70">Institutions</div>
                    </div>
                  </div>

                  {/* Seed & Reset Controls */}
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#0D1523] border border-white/[0.06]">
                    <div className="text-xs text-[#A5B2C5]">
                      Demo Data Actions:
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSeed}
                        className="px-2.5 py-1 rounded-md bg-[#111C2E] hover:bg-white/[0.06] text-xs font-mono text-[#4ADFFF] border border-white/[0.08] transition-colors"
                      >
                        + Seed 3 Samples
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-2.5 py-1 rounded-md bg-red-950/30 hover:bg-red-900/40 text-xs font-mono text-red-300 border border-red-500/30 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* Registrations Table / List */}
                  {records.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-white/[0.08] rounded-xl space-y-2">
                      <Database className="w-6 h-6 text-[#627288] mx-auto" strokeWidth={1.75} />
                      <p className="text-xs text-[#A5B2C5]">No registrations stored yet in LocalStorage.</p>
                      <p className="text-[11px] text-[#627288]">Fill out the landing page form or click "Seed 3 Samples" above.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-[#A5B2C5] font-mono">
                        <span>Stored Demo Registrations</span>
                        <span className="text-[11px] text-[#4ADFFF]">Masked for privacy</span>
                      </div>

                      <div className="space-y-2">
                        {records.map((r) => (
                          <div
                            key={r.id}
                            className="p-3 rounded-lg bg-[#0D1523] border border-white/[0.06] hover:border-white/[0.14] transition-colors text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-[#C5F56A]">{r.id}</span>
                              <span className="font-mono text-[10px] text-[#A5B2C5]/70">
                                {new Date(r.registeredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[#A5B2C5]">
                              <div>
                                <span className="text-[#F5F7FB] font-medium">{r.fullName}</span>
                                <div className="text-[11px] text-[#627288] truncate font-mono">{maskEmail(r.normalizedEmail)}</div>
                              </div>
                              <div className="text-right">
                                <span className="inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#111C2E] text-[#4ADFFF] border border-white/[0.06]">
                                  {r.yearOfStudy}
                                </span>
                                <div className="text-[11px] text-[#A5B2C5] truncate">{r.college}</div>
                              </div>
                            </div>

                            <div className="pt-1.5 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-[#627288]">
                              <span>Source: <strong className="text-[#A5B2C5]">{r.attribution?.source || 'direct'}</strong></span>
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
                <div className="space-y-4">
                  {/* Current Active Attribution */}
                  <div className="p-3.5 rounded-lg bg-[#0D1523] border border-white/[0.06] space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#4ADFFF] tracking-wider">
                      Currently Active Attribution
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[#627288] block text-[10px]">utm_source:</span>
                        <span className="text-[#F5F7FB] font-semibold">{attribution?.utm_source || 'direct'}</span>
                      </div>
                      <div>
                        <span className="text-[#627288] block text-[10px]">utm_medium:</span>
                        <span className="text-[#F5F7FB] font-semibold">{attribution?.utm_medium || 'web'}</span>
                      </div>
                      <div>
                        <span className="text-[#627288] block text-[10px]">utm_campaign:</span>
                        <span className="text-[#F5F7FB] font-semibold">{attribution?.utm_campaign || 'ai_workshop'}</span>
                      </div>
                      <div>
                        <span className="text-[#627288] block text-[10px]">referral code:</span>
                        <span className="text-[#C5F56A] font-semibold">{attribution?.ref || '(None)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Headline Variant Tester */}
                  <div className="p-3.5 rounded-lg bg-[#0D1523] border border-white/[0.06] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#C5F56A] tracking-wider">
                        Headline Experiment Variant
                      </h4>
                      <span className="text-[10px] font-mono text-[#A5B2C5]/70">A/B Message Test</span>
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
                              ? 'bg-[#111C2E] border-[#C5F56A] text-[#F5F7FB] font-semibold'
                              : 'bg-[#080E18] border-white/[0.06] text-[#A5B2C5] hover:text-[#F5F7FB]'
                          }`}
                        >
                          <div className="font-mono text-[11px] text-[#4ADFFF]">{v.label}</div>
                          <div className="text-[10px] truncate">{v.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Campaign Simulation Links */}
                  <div className="p-3.5 rounded-lg bg-[#0D1523] border border-white/[0.06] space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#F5F7FB] tracking-wider">
                      Simulate Inbound Campaign Links
                    </h4>
                    <p className="text-xs text-[#A5B2C5]/80 font-sans">
                      Click below to test how incoming students from WhatsApp, Campus Ambassadors, or QR posters are attributed:
                    </p>

                    <div className="space-y-1.5 text-xs font-mono">
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
                          className="block p-2 rounded-md bg-[#080E18] hover:bg-[#111C2E] border border-white/[0.06] text-[#A5B2C5] hover:text-[#F5F7FB] transition-colors group"
                        >
                          <div className="flex items-center justify-between text-[11px] text-[#F5F7FB] font-medium font-sans">
                            <span>{item.title}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#4ADFFF] group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <div className="text-[10px] text-[#4ADFFF] truncate mt-0.5">{item.query}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: QR CODE GENERATOR & POSTER LINKING */}
              {activeTab === 'qr' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-lg bg-[#0D1523] border border-white/[0.06] space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#C5F56A] tracking-wider">
                      Campaign QR Code Linkage
                    </h4>
                    <p className="text-xs text-[#A5B2C5] leading-relaxed font-sans">
                      Use this QR code on your printed or digital Canva campaign poster. When students scan it with their smartphone camera, they land directly on this optimized mobile landing page with attribution parameters pre-attached.
                    </p>
                  </div>

                  {/* QR Code Visual Preview */}
                  <div className="p-5 rounded-xl bg-[#080E18] border border-white/[0.06] text-center space-y-3">
                    <div className="inline-block p-3 rounded-xl bg-white shadow-lg">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrUrl)}&color=070B14&bgcolor=FFFFFF`}
                        alt="Campaign QR Code for Canva Poster"
                        className="w-40 h-40 mx-auto rounded-md"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-xs font-mono text-[#C5F56A]">SCAN TO REGISTER</div>
                      <div className="text-[11px] text-[#A5B2C5]/80 font-mono break-all max-w-sm mx-auto">
                        {qrUrl}
                      </div>
                    </div>

                    <button
                      onClick={() => copySimulatedLink(qrUrl)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#111C2E] hover:bg-white/[0.06] text-xs font-mono text-white border border-white/[0.08] transition-colors"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-[#C5F56A]" strokeWidth={2} /> : <QrCode className="w-3.5 h-3.5 text-[#4ADFFF]" strokeWidth={1.75} />}
                      <span>{copiedLink ? 'Link Copied' : 'Copy Target Link'}</span>
                    </button>
                  </div>

                  {/* Step Instructions */}
                  <div className="p-3.5 rounded-lg bg-[#0D1523] border border-white/[0.06] text-xs text-[#A5B2C5] space-y-1.5 font-sans">
                    <strong className="text-[#F5F7FB] block font-mono text-[11px] uppercase">
                      How to link this to your Canva Poster:
                    </strong>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Deploy your site to Vercel (e.g. <code className="text-[#4ADFFF]">ai-build-lab.vercel.app</code>)</li>
                      <li>Add campaign query: <code className="text-[#C5F56A]">?utm_source=qr_poster&utm_medium=canva_print</code></li>
                      <li>Generate your final QR in Canva / QR generator</li>
                      <li>Paste into the poster's "SCAN TO REGISTER" frame!</li>
                    </ol>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-[#090F1A] border-t border-white/[0.06] flex items-center justify-between text-xs text-[#627288] font-mono">
              <span>NxtWave Growth Challenge</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#A5B2C5] hover:text-[#F5F7FB]"
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
