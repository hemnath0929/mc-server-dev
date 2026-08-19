import React from 'react';
import { STUDIO_INFO } from '../data/portfolioData';
import { ShieldCheck, Cpu, Terminal, Sparkles, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface DeveloperAboutProps {
  onOpenQuest: () => void;
}

export const DeveloperAbout: React.FC<DeveloperAboutProps> = ({ onOpenQuest }) => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Developer Card & Stats */}
          <div className="lg:col-span-5">
            <div className="mc-panel p-6 sm:p-8 relative bg-gradient-to-b from-mc-surface to-mc-obsidian border-mc-border/90">
              {/* Top Slot Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="mc-slot w-16 h-16 rounded-lg bg-mc-obsidian border-2 border-mc-emerald shadow-glow-emerald">
                  <div className="w-9 h-9 rounded bg-mc-emerald flex items-center justify-center font-mono font-black text-mc-dark text-lg shadow-inner">
                    DEV
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-white">{STUDIO_INFO.developerName}</h3>
                    <span className="mc-xp-badge text-[10px]">SOLO DEV</span>
                  </div>
                  <p className="text-xs font-mono text-mc-emerald">{STUDIO_INFO.developerTitle}</p>
                  <div className="flex items-center gap-1.5 text-xs text-mc-muted mt-1">
                    <MapPin className="w-3.5 h-3.5 text-mc-redstone" />
                    <span>{STUDIO_INFO.location}</span>
                  </div>
                </div>
              </div>

              {/* Developer Philosophy Pills */}
              <div className="space-y-3 py-4 border-y border-mc-border/50 text-xs">
                <div className="flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-mc-diamond shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Strict Asynchronous Model</span>
                    <span className="text-mc-muted text-[11px]">Database queries and heavy calculations never touch the main server tick.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-mc-emerald shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Anti-Dupe Concurrency Safety</span>
                    <span className="text-mc-muted text-[11px]">Transactional mutex locks protect economies and inventories across sub-servers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Terminal className="w-4 h-4 text-mc-portal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Clean & Maintainable Configs</span>
                    <span className="text-mc-muted text-[11px]">Every message, permission node, and GUI slot is 100% configurable via YAML.</span>
                  </div>
                </div>
              </div>

              {/* Discord Link */}
              <div className="pt-6">
                <a
                  href={STUDIO_INFO.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEffects.playClick()}
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs font-mono font-bold text-mc-portal bg-mc-portal/10 border border-mc-portal/40 hover:bg-mc-portal/20 rounded-md transition-all"
                  title="Direct Message devil on Discord (@devil0329.)"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct Message devil on Discord (@{STUDIO_INFO.discordHandle})</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Engineering Approach */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mc-emerald/10 border border-mc-emerald/30 text-mc-emerald text-xs font-mono font-bold uppercase tracking-wider">
              <span>👤 Engineering Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Crafting High-Performance Minecraft Infrastructure.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-mc-muted leading-relaxed">
              <p>
                Hi, I'm <strong className="text-white">devil</strong>, an independent Minecraft software engineer based in India. I specialize in building custom Paper, Purpur, Folia, and Velocity server systems that stay locked at <strong className="text-mc-emerald">20.00 TPS</strong> under high player loads.
              </p>
              <p>
                Most public plugins suffer from blocking queries, memory leaks, and rigid configuration formats. I build tailored, maintainable solutions engineered specifically for your server's gameplay loop—integrating asynchronous Redis caching, transactional database layers, dynamic MiniMessage GUIs, and bi-directional Discord bot bridges.
              </p>
              <p>
                Whether you need a bespoke progression system, an anti-dupe multi-currency economy engine, or a multi-server network core, every deliverable is built with clean architecture and backed by an <strong className="text-white">anytime bug warranty</strong>.
              </p>
            </div>

            {/* Direct Commitments Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-mc-text bg-mc-surface/40 p-3 rounded border border-mc-border/40">
                <CheckCircle2 className="w-4 h-4 text-mc-emerald shrink-0" />
                <span>100% Direct Developer Contact</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-mc-text bg-mc-surface/40 p-3 rounded border border-mc-border/40">
                <CheckCircle2 className="w-4 h-4 text-mc-emerald shrink-0" />
                <span>Spark Profiler Benchmarked</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-mc-text bg-mc-surface/40 p-3 rounded border border-mc-border/40">
                <CheckCircle2 className="w-4 h-4 text-mc-emerald shrink-0" />
                <span>Anytime Free Bug-Fix Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-mc-text bg-mc-surface/40 p-3 rounded border border-mc-border/40">
                <CheckCircle2 className="w-4 h-4 text-mc-emerald shrink-0" />
                <span>Production-Ready Compiled .jar</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onOpenQuest();
                }}
                className="mc-button-primary px-8 py-3.5 text-sm font-bold shadow-glow-emerald"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Your Plugin Idea</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
