import React, { useState, useEffect } from 'react';
import { QuestFormData } from '../types';
import { submitProjectEnquiry, formatEnquiryForDiscord } from '../utils/discordWebhook';
import { STUDIO_INFO } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Copy,
  MessageSquare,
  Send,
  AlertCircle,
  User,
  Server as ServerIcon,
  Mail
} from 'lucide-react';

interface QuestEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const DEFAULT_FORM_DATA: QuestFormData = {
  clientName: '',
  serverBrandName: '',
  projectType: ['Custom Plugin'],
  customTypeOther: '',
  minecraftVersion: '1.20.4',
  serverSoftware: 'Paper',
  approxPlayerCount: '20 - 50 Players',
  serverType: 'Survival / SMP',
  projectTitle: '',
  projectDescription: '',
  requiredFeatures: ['Async Processing (Zero Lag)', 'Configurable YAML Messages'],
  customFeatureNotes: '',
  timeline: 'Standard (1-3 weeks)',
  budgetPreference: 'Custom Estimate',
  discordHandle: '',
  email: '',
  serverIp: '',
  referenceLinks: '',
};

export const QuestEnquiryModal: React.FC<QuestEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuestFormData>(DEFAULT_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load from local storage draft or preset
  useEffect(() => {
    if (isOpen) {
      const savedDraft = localStorage.getItem('devil_mc_quest_draft');
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          setFormData((prev) => ({ ...prev, ...parsed }));
        } catch {
          // Ignore
        }
      }
      if (initialService) {
        setFormData((prev) => ({
          ...prev,
          projectType: [initialService],
          projectTitle: prev.projectTitle || `${initialService} Request`,
        }));
      }
    }
  }, [isOpen, initialService]);

  // Save to local storage on change
  useEffect(() => {
    if (isOpen && !isSuccess) {
      localStorage.setItem('devil_mc_quest_draft', JSON.stringify(formData));
    }
  }, [formData, isOpen, isSuccess]);

  if (!isOpen) return null;

  const totalSteps = 7;
  const xpPercentage = Math.round((step / totalSteps) * 100);

  const handleNext = () => {
    setErrorMessage('');

    // Step validations
    if (step === 1 && formData.projectType.length === 0 && !formData.customTypeOther) {
      setErrorMessage('Please select at least one system category.');
      return;
    }
    if (step === 3 && (!formData.projectDescription.trim() || formData.projectDescription.length < 15)) {
      setErrorMessage('Please describe your plugin concept in a bit more detail (minimum 15 characters).');
      return;
    }
    if (step === 7) {
      if (!formData.clientName.trim()) {
        setErrorMessage('Please provide your name or in-game nickname.');
        return;
      }
      if (!formData.discordHandle.trim() && !formData.email.trim()) {
        setErrorMessage('Please provide either your Discord handle or an Email so I can reach you with the estimate.');
        return;
      }
    }

    soundEffects.playXpOrb();
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    soundEffects.playClick();
    setErrorMessage('');
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await submitProjectEnquiry(formData);

      if (result.success) {
        setIsSuccess(true);
        soundEffects.playLevelUp();
        localStorage.removeItem('devil_mc_quest_draft');

        // Confetti burst
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#06b6d4', '#a855f7', '#eab308'],
        });
      }
    } catch {
      setErrorMessage('Enquiry submission failed. You can copy your details directly below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyClipboard = () => {
    soundEffects.playPop();
    const text = formatEnquiryForDiscord(formData);
    navigator.clipboard.writeText(text);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 3000);
  };

  const toggleProjectType = (type: string) => {
    soundEffects.playPop();
    setFormData((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter((t) => t !== type)
        : [...prev.projectType, type],
    }));
  };

  const toggleFeature = (feat: string) => {
    soundEffects.playPop();
    setFormData((prev) => ({
      ...prev,
      requiredFeatures: prev.requiredFeatures.includes(feat)
        ? prev.requiredFeatures.filter((f) => f !== feat)
        : [...prev.requiredFeatures, feat],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-mc-obsidian border border-mc-border/90 rounded-xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-mc-dark px-5 py-3.5 border-b border-mc-border flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="mc-slot w-8 h-8">
              <Sparkles className="w-4 h-4 text-mc-emerald" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Plugin Quest Intake
                </span>
                <span className="mc-xp-badge text-[10px]">
                  QUEST {step} / {totalSteps}
                </span>
              </div>
              <p className="text-[11px] font-mono text-mc-muted">Minecraft Server Engineering Studio</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-md bg-mc-surface hover:bg-mc-hover border border-mc-border flex items-center justify-center text-mc-muted hover:text-white transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full bg-mc-dark px-5 py-2 border-b border-mc-border/50 bg-gradient-to-r from-mc-obsidian to-mc-dark">
          <div className="flex items-center justify-between text-[10px] font-mono mb-1">
            <span className="text-mc-emerald font-bold">XP LEVEL {step * 10}</span>
            <span className="text-mc-subtle">{xpPercentage}% COMPLETED</span>
          </div>
          <div className="w-full bg-mc-surface h-2 rounded-full overflow-hidden border border-mc-border/60">
            <div
              className="bg-gradient-to-r from-mc-emerald to-mc-emerald-glow h-full transition-all duration-300 shadow-glow-emerald"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* SUCCESS STATE */}
          {isSuccess ? (
            <div className="space-y-6 text-center py-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-mc-emerald/20 border-2 border-mc-emerald flex items-center justify-center mx-auto shadow-glow-emerald">
                <CheckCircle2 className="w-8 h-8 text-mc-emerald" />
              </div>

              <div className="space-y-2">
                <span className="mc-xp-badge text-xs">QUEST SUBMISSION RECEIVED</span>
                <h3 className="text-2xl font-extrabold text-white">Your Quest Has Been Registered!</h3>
                <p className="text-sm text-mc-muted max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.clientName}</strong>! I will review your server specifications for <strong className="text-mc-emerald">{formData.serverBrandName || 'your server'}</strong> and reply with a tailored roadmap & estimate within 24 hours.
                </p>
              </div>

              {/* Direct Discord Option */}
              <div className="bg-mc-surface/70 border border-mc-portal/40 rounded-lg p-5 space-y-3 max-w-lg mx-auto text-left">
                <div className="flex items-center gap-2 text-mc-portal text-xs font-mono font-bold uppercase">
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct Message devil on Discord (@{STUDIO_INFO.discordHandle})</span>
                </div>
                <p className="text-xs text-mc-muted leading-relaxed">
                  You can also direct message developer <strong className="text-white">@{STUDIO_INFO.discordHandle}</strong> directly on Discord or copy your formatted quest specification to paste in DMs:
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <a
                    href={STUDIO_INFO.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEffects.playClick()}
                    className="flex-1 py-2.5 px-4 text-xs font-mono font-bold text-center text-white bg-mc-portal hover:bg-mc-portal-glow rounded transition-all shadow-glow-portal"
                  >
                    Open Discord DM (@{STUDIO_INFO.discordHandle})
                  </a>
                  <button
                    onClick={handleCopyClipboard}
                    className="py-2.5 px-4 text-xs font-mono font-bold text-mc-text bg-mc-obsidian border border-mc-border hover:border-mc-emerald rounded transition-all flex items-center justify-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedPayload ? 'Copied Specs!' : 'Copy Formatted Specs'}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                  setIsSuccess(false);
                  setStep(1);
                  setFormData(DEFAULT_FORM_DATA);
                }}
                className="mc-button-secondary text-xs px-6 py-2.5"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1: System Category */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-mc-emerald uppercase font-bold">Step 1 of 7</span>
                    <h3 className="text-xl font-bold text-white">What type of system are you building?</h3>
                    <p className="text-xs text-mc-muted">Select all categories that describe your project idea.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                    {[
                      'Custom Gameplay',
                      'Economy & Vault',
                      'Ranks & Progression',
                      'Custom GUI Menus',
                      'Minigame Core',
                      'Discord Integration',
                      'Server Utility / QoL',
                      'Dungeon & Boss AI',
                      'Proxy / Velocity',
                    ].map((type) => {
                      const isSelected = formData.projectType.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleProjectType(type)}
                          className={`p-3 rounded-lg border text-left text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-mc-emerald/15 border-mc-emerald text-white shadow-glow-emerald'
                              : 'bg-mc-surface/50 border-mc-border text-mc-muted hover:border-mc-border/90'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{type}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-mc-emerald" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="text-[11px] font-mono text-mc-subtle block mb-1">
                      Other / Specific Category (Optional):
                    </label>
                    <input
                      type="text"
                      value={formData.customTypeOther || ''}
                      onChange={(e) => setFormData({ ...formData, customTypeOther: e.target.value })}
                      placeholder="e.g. Prison Enchants, Custom Fishing, Slimefun Addon..."
                      className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Server Environment */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-mc-emerald uppercase font-bold">Step 2 of 7</span>
                    <h3 className="text-xl font-bold text-white">Your Server Environment</h3>
                    <p className="text-xs text-mc-muted">Ensures full API compatibility and zero version conflicts.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-mono text-mc-muted block mb-1.5 font-semibold">
                        Target Minecraft Version
                      </label>
                      <select
                        value={formData.minecraftVersion}
                        onChange={(e) => setFormData({ ...formData, minecraftVersion: e.target.value })}
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono focus:border-mc-emerald focus:outline-none"
                      >
                        <option value="1.21.x (Latest)">1.21.x (Latest Tricky Trials)</option>
                        <option value="1.20.4 - 1.20.6">1.20.4 - 1.20.6</option>
                        <option value="1.20.1 / 1.20.2">1.20.1 / 1.20.2</option>
                        <option value="1.19.4">1.19.4</option>
                        <option value="1.16.5 - 1.18.2">1.16.5 - 1.18.2 (Legacy)</option>
                        <option value="1.8.8 - 1.12.2">1.8.8 - 1.12.2 (Legacy PvP)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-mc-muted block mb-1.5 font-semibold">
                        Server Software / Platform
                      </label>
                      <select
                        value={formData.serverSoftware}
                        onChange={(e) => setFormData({ ...formData, serverSoftware: e.target.value })}
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono focus:border-mc-emerald focus:outline-none"
                      >
                        <option value="Paper">Paper (Recommended)</option>
                        <option value="Purpur">Purpur</option>
                        <option value="Folia (Multithreaded)">Folia (Region Multithreaded)</option>
                        <option value="Velocity (Proxy Network)">Velocity Proxy Network</option>
                        <option value="Spigot">Spigot</option>
                        <option value="BungeeCord / Waterfall">BungeeCord / Waterfall</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-mc-muted block mb-1.5 font-semibold">
                        Gamemode / Server Type
                      </label>
                      <input
                        type="text"
                        value={formData.serverType}
                        onChange={(e) => setFormData({ ...formData, serverType: e.target.value })}
                        placeholder="e.g. Semi-Vanilla SMP, Skyblock, MMORPG, Prison"
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-mc-muted block mb-1.5 font-semibold">
                        Approximate Player Count
                      </label>
                      <select
                        value={formData.approxPlayerCount}
                        onChange={(e) => setFormData({ ...formData, approxPlayerCount: e.target.value })}
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono focus:border-mc-emerald focus:outline-none"
                      >
                        <option value="Under 20 Players">Under 20 Players (Small Community)</option>
                        <option value="20 - 50 Players">20 - 50 Players (Growing Server)</option>
                        <option value="50 - 150 Players">50 - 150 Players (Established Server)</option>
                        <option value="150+ Concurrent Players">150+ Concurrent (High-Traffic Network)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Project Title & Description */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-mc-emerald uppercase font-bold">Step 3 of 7</span>
                    <h3 className="text-xl font-bold text-white">Describe Your Plugin Idea</h3>
                    <p className="text-xs text-mc-muted">Explain what you want the plugin to do and how players will interact with it.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-mono text-mc-muted block mb-1 font-semibold">
                        Project Name or Working Title
                      </label>
                      <input
                        type="text"
                        value={formData.projectTitle}
                        onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                        placeholder="e.g. RealmEnchantments, CustomQuestCore..."
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-mc-muted block mb-1 font-semibold">
                        Concept & Gameplay Details <span className="text-mc-redstone">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        placeholder="Explain your idea in detail:
• What commands or GUI menus should players use?
• How should data be saved or calculated?
• Are there specific permission nodes or rewards?
• Any integrations with existing plugins (Vault, WorldGuard, LuckPerms)?"
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md p-3 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Features & Architecture Checklist */}
              {step === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-mc-emerald uppercase font-bold">Step 4 of 7</span>
                    <h3 className="text-xl font-bold text-white">Technical Modules Checklist</h3>
                    <p className="text-xs text-mc-muted">Select specific technical features you'd like included in the build.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {[
                      'Async Processing (Zero Lag)',
                      'Configurable YAML Messages',
                      'PlaceholderAPI (PAPI) Hooks',
                      'MySQL / MariaDB Database',
                      'Redis Real-time Sync',
                      'Custom MiniMessage GUI Menus',
                      'Vault Economy Provider',
                      'Discord Webhook Audit Logs',
                      'Custom Sound & Particle FX',
                      'Anti-Dupe Concurrency Lock',
                    ].map((feat) => {
                      const isSelected = formData.requiredFeatures.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => toggleFeature(feat)}
                          className={`p-3 rounded-lg border text-left text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-mc-emerald/15 border-mc-emerald text-white shadow-glow-emerald'
                              : 'bg-mc-surface/50 border-mc-border text-mc-muted hover:border-mc-border/90'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{feat}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-mc-emerald" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="text-[11px] font-mono text-mc-subtle block mb-1">
                      Additional Technical Notes (Optional):
                    </label>
                    <input
                      type="text"
                      value={formData.customFeatureNotes || ''}
                      onChange={(e) => setFormData({ ...formData, customFeatureNotes: e.target.value })}
                      placeholder="e.g. Must support ItemsAdder textures, custom NBT tags..."
                      className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Timeline & Urgency */}
              {step === 5 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-mc-emerald uppercase font-bold">Step 5 of 7</span>
                    <h3 className="text-xl font-bold text-white">Desired Delivery Window</h3>
                    <p className="text-xs text-mc-muted">When do you need the plugin deployed to your server?</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      {
                        value: 'Urgent (Under 1 week)',
                        label: '⚡ Urgent Delivery (Under 1 Week)',
                        desc: 'Priority sprint development for impending server launches or critical bug fixes.',
                      },
                      {
                        value: 'Standard (1-3 weeks)',
                        label: '⏱️ Standard Timeline (1 to 3 Weeks)',
                        desc: 'Optimal agile development window including thorough testing and Spark profiling.',
                      },
                      {
                        value: 'Flexible / Large Milestone',
                        label: '🛠️ Flexible / Multi-Phase Roadmap',
                        desc: 'For large systems or networks with iterative development milestones.',
                      },
                    ].map((opt) => {
                      const isSelected = formData.timeline === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            soundEffects.playPop();
                            setFormData({ ...formData, timeline: opt.value as QuestFormData['timeline'] });
                          }}
                          className={`w-full p-4 rounded-lg border text-left transition-all ${
                            isSelected
                              ? 'bg-mc-emerald/15 border-mc-emerald text-white shadow-glow-emerald'
                              : 'bg-mc-surface/50 border-mc-border text-mc-muted hover:border-mc-border/90'
                          }`}
                        >
                          <div className="text-xs font-mono font-bold text-white mb-1">{opt.label}</div>
                          <div className="text-xs text-mc-muted">{opt.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: Budget & Estimation Preference */}
              {step === 6 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-mc-emerald uppercase font-bold">Step 6 of 7</span>
                    <h3 className="text-xl font-bold text-white">Budget & Estimation Model</h3>
                    <p className="text-xs text-mc-muted">Every quote is fixed and milestone-based. No surprise fees.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      {
                        value: 'Custom Estimate',
                        label: '🎯 Custom Quote Based on Exact Specifications',
                        desc: 'I will analyze your requirements and provide an exact fixed price quote.',
                      },
                      {
                        value: 'Small Scope ($40-$100)',
                        label: '🔧 Small Scope / Utility ($40 - $100)',
                        desc: 'Ideal for single-purpose mechanics, custom commands, or focused GUI tools.',
                      },
                      {
                        value: 'Medium System ($100-$300)',
                        label: '🛡️ Complete Gameplay System ($100 - $300)',
                        desc: 'For full economy engines, progression loops, dungeons, or rank systems.',
                      },
                      {
                        value: 'Full Architecture ($300+)',
                        label: '👑 Multi-Server Network Architecture ($300+)',
                        desc: 'Cross-server Velocity networks, Redis clusters, and custom JDA 5 bot bridges.',
                      },
                    ].map((opt) => {
                      const isSelected = formData.budgetPreference === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            soundEffects.playPop();
                            setFormData({
                              ...formData,
                              budgetPreference: opt.value as QuestFormData['budgetPreference'],
                            });
                          }}
                          className={`w-full p-4 rounded-lg border text-left transition-all ${
                            isSelected
                              ? 'bg-mc-emerald/15 border-mc-emerald text-white shadow-glow-emerald'
                              : 'bg-mc-surface/50 border-mc-border text-mc-muted hover:border-mc-border/90'
                          }`}
                        >
                          <div className="text-xs font-mono font-bold text-white mb-1">{opt.label}</div>
                          <div className="text-xs text-mc-muted">{opt.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 7: Client Details & Contact Info */}
              {step === 7 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-mc-emerald uppercase font-bold">Step 7 of 7</span>
                    <h3 className="text-xl font-bold text-white">Client & Contact Details</h3>
                    <p className="text-xs text-mc-muted">Enter your name, server branding, and where to send the quote.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div>
                      <label className="text-xs font-mono text-mc-muted flex items-center gap-1 mb-1 font-semibold">
                        <User className="w-3.5 h-3.5 text-mc-emerald" />
                        <span>Your Name / Nickname <span className="text-mc-redstone">*</span></span>
                      </label>
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="e.g. Alex, LordCommander, ServerAdmin"
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-mc-muted flex items-center gap-1 mb-1 font-semibold">
                        <ServerIcon className="w-3.5 h-3.5 text-mc-diamond" />
                        <span>Server / Network Name</span>
                      </label>
                      <input
                        type="text"
                        value={formData.serverBrandName || ''}
                        onChange={(e) => setFormData({ ...formData, serverBrandName: e.target.value })}
                        placeholder="e.g. AetherSMP, CraftLandia, PixelNetwork"
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-mc-muted flex items-center gap-1 mb-1 font-semibold">
                        <MessageSquare className="w-3.5 h-3.5 text-mc-portal" />
                        <span>Discord Handle <span className="text-mc-emerald">*</span></span>
                      </label>
                      <input
                        type="text"
                        value={formData.discordHandle}
                        onChange={(e) => setFormData({ ...formData, discordHandle: e.target.value })}
                        placeholder="e.g. server_owner or owner#1234"
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-mc-muted flex items-center gap-1 mb-1 font-semibold">
                        <Mail className="w-3.5 h-3.5 text-mc-gold" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. owner@myserver.net"
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-mc-muted block mb-1 font-semibold">
                        Server IP or Testbed (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.serverIp || ''}
                        onChange={(e) => setFormData({ ...formData, serverIp: e.target.value })}
                        placeholder="e.g. play.myserver.net"
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-mc-muted block mb-1 font-semibold">
                        Reference Docs / Links (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.referenceLinks || ''}
                        onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                        placeholder="Google Doc, Pastebin, or inspiration link"
                        className="w-full bg-mc-obsidian border border-mc-border rounded-md px-3 py-2 text-xs text-white font-mono placeholder-mc-subtle focus:border-mc-emerald focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded bg-mc-surface/50 border border-mc-border/60 text-xs font-mono text-mc-muted flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-mc-emerald shrink-0" />
                    <span>Your request will be delivered directly to developer <strong>devil</strong>. Free anytime bug-fix warranty included.</span>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded bg-mc-redstone/10 border border-mc-redstone/30 flex items-center gap-2 text-xs text-mc-redstone font-mono animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation Bar */}
        {!isSuccess && (
          <div className="bg-mc-dark px-6 py-4 border-t border-mc-border flex items-center justify-between sticky bottom-0 z-20">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="mc-button-secondary text-xs px-4 py-2 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleNext}
              className="mc-button-primary text-xs sm:text-sm px-6 py-2.5 font-bold flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-mc-dark border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Quest...</span>
                </>
              ) : step === totalSteps ? (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Project Request</span>
                </>
              ) : (
                <>
                  <span>Next Quest Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
