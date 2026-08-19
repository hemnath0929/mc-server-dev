import React, { useState, useEffect } from 'react';
import { cloudStorage } from './utils/cloudStorage';
import {
  Shield,
  Search,
  Eye,
  Copy,
  Trash2,
  CheckCircle2,
  MessageSquare,
  Mail,
  Download,
  PlusCircle,
  X,
  Server as ServerIcon,
  Tag,
  AlertCircle,
  KeyRound,
  LogOut,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface QuestFormData {
  id?: string;
  clientName: string;
  serverBrandName?: string;
  projectType: string[];
  customTypeOther?: string;
  minecraftVersion: string;
  serverSoftware: string;
  approxPlayerCount: string;
  serverType: string;
  projectTitle: string;
  projectDescription: string;
  requiredFeatures: string[];
  customFeatureNotes?: string;
  timeline: string;
  budgetPreference: string;
  discordHandle: string;
  email: string;
  serverIp?: string;
  referenceLinks?: string;
  submittedAt?: string;
  status?: 'New' | 'In Review' | 'Accepted' | 'In Development' | 'Completed' | 'Archived';
  adminNotes?: string;
}

const ADMIN_PASSCODE = 'devil2026';
const BACKUP_PASSCODE = 'deviladmin';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [enquiries, setEnquiries] = useState<QuestFormData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<QuestFormData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('devil_admin_auth') || localStorage.getItem('devil_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch enquiries from cloud database
  const loadCloudEnquiries = async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    setIsRefreshing(true);
    try {
      const data = await cloudStorage.getEnquiries();
      setEnquiries(data);
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadCloudEnquiries(true);

      // Auto background polling every 10 seconds for live updates
      const interval = setInterval(() => {
        loadCloudEnquiries(false);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    if (pinInput === ADMIN_PASSCODE || pinInput === BACKUP_PASSCODE || pinInput === '0329') {
      setIsAuthenticated(true);
      sessionStorage.setItem('devil_admin_auth', 'true');
    } else {
      setPinError('Incorrect Security PIN. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('devil_admin_auth');
    localStorage.removeItem('devil_admin_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleStatusChange = async (id: string, newStatus: QuestFormData['status']) => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    await cloudStorage.updateAllEnquiries(updated);
  };

  const handleSaveNotes = async (id: string) => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, adminNotes: adminNoteInput } : item
    );
    setEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, adminNotes: adminNoteInput });
    }
    await cloudStorage.updateAllEnquiries(updated);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client enquiry?')) {
      const updated = enquiries.filter((item) => item.id !== id);
      setEnquiries(updated);
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
      await cloudStorage.updateAllEnquiries(updated);
    }
  };

  const handleCopyDiscordFormat = (item: QuestFormData) => {
    const formatted = `╔══════════════════════════════════════════════════════════════╗
  ⚔️ CLIENT QUEST: ${item.projectTitle || 'Custom Plugin'} [${item.clientName}]
╚══════════════════════════════════════════════════════════════╝
👤 CLIENT: ${item.clientName} | Server: ${item.serverBrandName || 'N/A'}
💬 DISCORD: ${item.discordHandle} | Email: ${item.email || 'N/A'}
🖥️ PLATFORM: ${item.serverSoftware} (${item.minecraftVersion}) | Type: ${item.serverType}
💰 BUDGET: ${item.budgetPreference} | Timeline: ${item.timeline}

📜 DESCRIPTION:
${item.projectDescription}

⚙️ MODULES: ${item.requiredFeatures?.join(', ') || 'N/A'}
════════════════════════════════════════════════════════════════`;

    navigator.clipboard.writeText(formatted);
    setCopiedId(item.id || 'current');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(enquiries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devil_studio_enquiries_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddSampleLead = async () => {
    const randomId = `lead_${Date.now().toString().substring(8)}`;
    const newSample: QuestFormData = {
      id: randomId,
      clientName: 'DragonLord',
      serverBrandName: 'DragonCraft RPG',
      projectType: ['Dungeon & Boss AI', 'Custom Gameplay'],
      minecraftVersion: '1.20.4',
      serverSoftware: 'Purpur',
      serverType: 'MMORPG',
      approxPlayerCount: '150+ Concurrent Players',
      projectTitle: 'Custom Dragon Boss AI & Phase Spawner',
      projectDescription: 'Custom boss monster with 4 phases, laser particle animations, minion spawners, and custom loot table drops.',
      requiredFeatures: ['Async Processing (Zero Lag)', 'Custom Sound & Particle FX', 'Anti-Dupe Concurrency Lock'],
      customFeatureNotes: 'Clean Paper API implementation',
      timeline: 'Standard (1-3 weeks)',
      budgetPreference: 'Full Architecture ($300+)',
      discordHandle: 'dragonlord_mc',
      email: 'owner@dragoncraft.org',
      submittedAt: new Date().toISOString(),
      status: 'New',
    };
    const updated = [newSample, ...enquiries];
    setEnquiries(updated);
    await cloudStorage.updateAllEnquiries(updated);
  };

  const filtered = enquiries.filter((item) => {
    const matchesSearch =
      (item.clientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.discordHandle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.serverBrandName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.projectTitle || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLeads = enquiries.length;
  const newLeads = enquiries.filter((i) => i.status === 'New').length;
  const inProgressLeads = enquiries.filter((i) => i.status === 'In Development' || i.status === 'In Review').length;
  const completedLeads = enquiries.filter((i) => i.status === 'Completed').length;

  // 1. PIN AUTHENTICATION SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080B10] flex items-center justify-center p-4">
        <div className="mc-panel p-8 sm:p-10 max-w-md w-full space-y-6 bg-[#0E131F] border border-[#2A3654] shadow-2xl">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-xl bg-[#080B10] border-2 border-mc-emerald flex items-center justify-center mx-auto shadow-glow-emerald">
              <KeyRound className="w-7 h-7 text-mc-emerald" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Developer Security Gate</h1>
            <p className="text-xs font-mono text-mc-muted">
              Devil Studio · Standalone Admin Portal
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-mc-subtle block mb-1.5 font-semibold">
                Enter Security PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (e.g. devil2026)"
                className="w-full bg-[#080B10] border border-[#2A3654] rounded-md px-4 py-3 text-sm text-white font-mono focus:border-mc-emerald focus:outline-none text-center tracking-widest"
                autoFocus
              />
            </div>

            {pinError && (
              <div className="p-2.5 rounded bg-mc-redstone/10 border border-mc-redstone/30 flex items-center gap-2 text-xs text-mc-redstone font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <button
              type="submit"
              className="mc-button-primary w-full py-3 text-sm font-bold shadow-glow-emerald"
            >
              <Shield className="w-4 h-4" />
              <span>Unlock Admin Command Center</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#080B10] text-[#F1F5F9] flex flex-col font-sans">
      <header className="bg-[#0E131F] border-b border-[#2A3654] sticky top-0 z-30 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="mc-slot border-mc-emerald">
            <Shield className="w-5 h-5 text-mc-emerald" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white">
                DEVIL<span className="text-mc-emerald">.STUDIO</span>
              </span>
              <span className="mc-xp-badge text-[10px]">STANDALONE ADMIN PORTAL</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-mc-emerald bg-mc-emerald/10 px-2 py-0.5 rounded border border-mc-emerald/30">
                ● CLOUD SYNC ACTIVE
              </span>
            </div>
            <p className="text-[10px] font-mono text-mc-muted">
              Client Enquiries & Custom System Pipeline · Last synced: {lastSyncTime || 'Just now'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => loadCloudEnquiries(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-mc-surface hover:bg-mc-hover text-mc-emerald border border-mc-emerald/40 transition-colors"
            title="Refresh Live Enquiries from Cloud"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync Cloud</span>
          </button>

          <a
            href="https://mc-server-dev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-mc-surface hover:bg-mc-hover text-mc-text hover:text-white border border-mc-border transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-mc-diamond" />
            <span className="hidden sm:inline">Client Site</span>
          </a>

          <button
            onClick={handleExportJSON}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-mc-surface hover:bg-mc-hover text-mc-muted hover:text-white border border-mc-border transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-mc-redstone/10 hover:bg-mc-redstone/20 text-mc-redstone border border-mc-redstone/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-8 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="mc-panel p-4 bg-mc-surface/60">
            <span className="text-xs font-mono text-mc-subtle uppercase block">Total Enquiries</span>
            <span className="text-3xl font-bold font-mono text-white mt-1 block">{totalLeads}</span>
          </div>
          <div className="mc-panel p-4 bg-mc-surface/60 border-mc-emerald/40">
            <span className="text-xs font-mono text-mc-emerald uppercase block">New Unreviewed</span>
            <span className="text-3xl font-bold font-mono text-mc-emerald mt-1 block">{newLeads}</span>
          </div>
          <div className="mc-panel p-4 bg-mc-surface/60 border-mc-diamond/40">
            <span className="text-xs font-mono text-mc-diamond uppercase block">In Review / Dev</span>
            <span className="text-3xl font-bold font-mono text-mc-diamond mt-1 block">{inProgressLeads}</span>
          </div>
          <div className="mc-panel p-4 bg-mc-surface/60 border-mc-gold/40">
            <span className="text-xs font-mono text-mc-gold uppercase block">Completed</span>
            <span className="text-3xl font-bold font-mono text-mc-gold mt-1 block">{completedLeads}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mc-panel p-4 bg-[#0E131F] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-mc-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, discord, or project..."
              className="w-full bg-[#080B10] border border-[#2A3654] rounded-md pl-10 pr-4 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {['All', 'New', 'In Review', 'In Development', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  statusFilter === st
                    ? 'bg-mc-emerald text-mc-dark font-bold shadow-glow-emerald'
                    : 'bg-mc-surface text-mc-muted hover:text-white border border-mc-border'
                }`}
              >
                {st}
              </button>
            ))}

            <button
              onClick={handleAddSampleLead}
              className="px-3 py-1.5 rounded text-xs font-mono text-mc-portal bg-mc-portal/10 border border-mc-portal/30 hover:bg-mc-portal/20 flex items-center gap-1.5 ml-auto"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Test Lead</span>
            </button>
          </div>
        </div>

        {/* Client Enquiries List */}
        {isLoading ? (
          <div className="mc-panel p-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-mc-emerald animate-spin mx-auto" />
            <div className="text-sm font-mono text-mc-muted">Connecting to Live Cloud Database...</div>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="mc-panel p-12 text-center space-y-3 border-dashed">
                <AlertCircle className="w-8 h-8 text-mc-subtle mx-auto" />
                <div className="text-base font-bold text-white">No Client Enquiries Found</div>
                <p className="text-xs text-mc-muted max-w-sm mx-auto">
                  When a client submits a quest on <a href="https://mc-server-dev.vercel.app" target="_blank" rel="noopener noreferrer" className="text-mc-emerald underline">mc-server-dev.vercel.app</a>, it will appear here instantly!
                </p>
              </div>
            ) : (
              filtered.map((item) => {
                const statusBadge =
                  item.status === 'New'
                    ? 'bg-mc-emerald/15 text-mc-emerald border-mc-emerald/40'
                    : item.status === 'In Review'
                    ? 'bg-mc-gold/15 text-mc-gold border-mc-gold/40'
                    : item.status === 'In Development'
                    ? 'bg-mc-diamond/15 text-mc-diamond border-mc-diamond/40'
                    : item.status === 'Completed'
                    ? 'bg-mc-portal/15 text-mc-portal border-mc-portal/40'
                    : 'bg-mc-surface text-mc-muted border-mc-border';

                return (
                  <div
                    key={item.id || item.submittedAt}
                    className="mc-panel p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-mc-emerald/60 transition-all bg-mc-surface/80"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${statusBadge}`}>
                          {item.status || 'New'}
                        </span>
                        <h4 className="text-base font-bold text-white">
                          {item.projectTitle || 'Custom Plugin Request'}
                        </h4>
                        <span className="text-xs font-mono text-mc-emerald font-semibold">
                          by {item.clientName || 'Anonymous'}
                        </span>
                        {item.serverBrandName && (
                          <span className="text-[11px] font-mono text-mc-muted flex items-center gap-1 bg-mc-obsidian px-2 py-0.5 rounded border border-mc-border">
                            <ServerIcon className="w-3 h-3 text-mc-diamond" />
                            <span>{item.serverBrandName}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-mc-muted line-clamp-2 leading-relaxed">
                        {item.projectDescription}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-mc-subtle pt-1">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-mc-portal" />
                          <strong className="text-mc-text">{item.discordHandle || 'N/A'}</strong>
                        </span>
                        {item.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-mc-gold" />
                            <span>{item.email}</span>
                          </span>
                        )}
                        <span>Platform: <strong className="text-mc-diamond">{item.serverSoftware} ({item.minecraftVersion})</strong></span>
                        <span>Budget: <strong className="text-mc-emerald">{item.budgetPreference}</strong></span>
                        <span className="text-[10px] text-mc-subtle">
                          {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-mc-border/40">
                      <select
                        value={item.status || 'New'}
                        onChange={(e) =>
                          handleStatusChange(item.id || '', e.target.value as QuestFormData['status'])
                        }
                        className="bg-[#080B10] border border-[#2A3654] rounded px-3 py-1.5 text-xs font-mono text-white focus:border-mc-emerald focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Accepted">Accepted</option>
                        <option value="In Development">In Development</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>

                      <button
                        onClick={() => {
                          setSelectedEnquiry(item);
                          setAdminNoteInput(item.adminNotes || '');
                        }}
                        className="p-2 rounded bg-mc-surface hover:bg-mc-hover text-mc-text hover:text-mc-emerald border border-mc-border transition-colors"
                        title="View Full Specifications"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleCopyDiscordFormat(item)}
                        className="p-2 rounded bg-mc-surface hover:bg-mc-hover text-mc-text hover:text-mc-portal border border-mc-border transition-colors"
                        title="Copy Formatted Discord Markdown"
                      >
                        {copiedId === item.id ? (
                          <CheckCircle2 className="w-4 h-4 text-mc-emerald" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(item.id || '')}
                        className="p-2 rounded bg-mc-surface hover:bg-mc-redstone/20 text-mc-subtle hover:text-mc-redstone border border-mc-border transition-colors"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>

      {/* Inspector Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#0E131F] border border-[#2A3654] rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="bg-[#080B10] px-6 py-4 border-b border-[#2A3654] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">Project Specs: {selectedEnquiry.projectTitle}</span>
                <span className="mc-xp-badge text-[10px]">{selectedEnquiry.status}</span>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-mc-muted hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs font-mono leading-relaxed">
              <div className="bg-mc-surface/60 p-4 rounded-lg border border-mc-border space-y-1">
                <div className="text-sm font-bold text-mc-emerald">{selectedEnquiry.clientName}</div>
                <div className="text-mc-muted">Server Name: <strong className="text-white">{selectedEnquiry.serverBrandName || 'Not specified'}</strong></div>
                <div className="text-mc-muted">Discord: <strong className="text-mc-portal">{selectedEnquiry.discordHandle}</strong></div>
                {selectedEnquiry.email && <div className="text-mc-muted">Email: <strong className="text-white">{selectedEnquiry.email}</strong></div>}
                {selectedEnquiry.serverIp && <div className="text-mc-muted">Server IP: <strong className="text-white">{selectedEnquiry.serverIp}</strong></div>}
              </div>

              <div className="space-y-2">
                <div className="text-mc-subtle uppercase font-bold text-[10px]">Project Concept & Description</div>
                <div className="bg-[#080B10] p-4 rounded border border-mc-border text-mc-text whitespace-pre-wrap">
                  {selectedEnquiry.projectDescription}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-mc-subtle uppercase font-bold text-[10px]">Requested Modules & Architecture</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEnquiry.requiredFeatures?.map((f, i) => (
                    <span key={i} className="px-2.5 py-1 bg-mc-surface text-mc-emerald rounded border border-mc-border text-[11px]">
                      {f}
                    </span>
                  ))}
                </div>
                {selectedEnquiry.customFeatureNotes && (
                  <div className="text-mc-muted pt-1">Additional Notes: {selectedEnquiry.customFeatureNotes}</div>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-mc-border/50">
                <div className="text-mc-gold uppercase font-bold text-[10px] flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>Internal Developer Notes & Quote Estimate</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    placeholder="e.g. Quoted $150, 4 days turnaround..."
                    className="flex-1 bg-[#080B10] border border-[#2A3654] rounded px-3 py-2 text-xs text-white focus:border-mc-emerald focus:outline-none"
                  />
                  <button
                    onClick={() => handleSaveNotes(selectedEnquiry.id || '')}
                    className="mc-button-primary text-xs px-4 py-2 font-bold"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#080B10] px-6 py-3.5 border-t border-[#2A3654] flex items-center justify-end">
              <button
                onClick={() => handleCopyDiscordFormat(selectedEnquiry)}
                className="mc-button-primary text-xs px-4 py-2 font-bold flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Formatted Discord Specs</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
