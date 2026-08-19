import React from 'react';
import { STUDIO_INFO } from '../data/portfolioData';
import { Terminal, MessageSquare, Mail, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface FooterProps {
  onOpenQuest: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuest }) => {
  return (
    <footer className="bg-mc-obsidian border-t border-mc-border/80 pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-mc-border/50">
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-mc-dark border border-mc-emerald flex items-center justify-center shadow-glow-emerald">
                <Terminal className="w-4 h-4 text-mc-emerald" />
              </div>
              <span className="font-extrabold text-lg text-white">
                DEVIL<span className="text-mc-emerald">.STUDIO</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-mc-muted leading-relaxed max-w-sm">
              An independent Minecraft software development studio crafting high-performance Paper, Purpur, Folia, and Velocity server systems.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mc-dark border border-mc-border text-xs font-mono text-mc-emerald">
              <span className="w-2 h-2 rounded-full bg-mc-emerald animate-pulse" />
              <span>COMMISSIONS OPEN · 20.00 TPS</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs font-mono text-mc-muted">
              <li>
                <a href="#services" onClick={() => soundEffects.playClick()} className="hover:text-mc-emerald transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#case-studies" onClick={() => soundEffects.playClick()} className="hover:text-mc-emerald transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#process" onClick={() => soundEffects.playClick()} className="hover:text-mc-emerald transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#console" onClick={() => soundEffects.playClick()} className="hover:text-mc-emerald transition-colors">
                  Server Console
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={() => soundEffects.playClick()} className="hover:text-mc-emerald transition-colors">
                  Pricing & Quotes
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => soundEffects.playClick()} className="hover:text-mc-emerald transition-colors">
                  About devil
                </a>
              </li>
              <li>
                <a href="#faq" onClick={() => soundEffects.playClick()} className="hover:text-mc-emerald transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Core Systems</h4>
            <ul className="space-y-2 text-xs font-mono text-mc-muted">
              <li>Custom Gameplay Mechanics</li>
              <li>Dupe-Proof Economy Engines</li>
              <li>MiniMessage Custom GUIs</li>
              <li>Discord JDA 5 Bot Bridges</li>
              <li>TPS Optimization & Profiling</li>
              <li>Velocity Proxy Networks</li>
            </ul>
          </div>

          {/* Col 5: Connect & CTA */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Connect</h4>
            <div className="space-y-2">
              <a
                href={STUDIO_INFO.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playClick()}
                className="flex items-center gap-2 text-xs font-mono text-mc-portal hover:text-mc-portal-glow bg-mc-portal/10 border border-mc-portal/30 p-2 rounded transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Join Discord Server</span>
              </a>

              <a
                href={`mailto:${STUDIO_INFO.email}`}
                onClick={() => soundEffects.playClick()}
                className="flex items-center gap-2 text-xs font-mono text-mc-muted hover:text-white bg-mc-surface p-2 rounded border border-mc-border transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-mc-emerald" />
                <span className="truncate">{STUDIO_INFO.email}</span>
              </a>
            </div>

            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenQuest();
              }}
              className="mc-button-primary w-full text-xs py-2.5 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Build My Plugin</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Mojang Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-mc-subtle">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {STUDIO_INFO.name}. Developed by</span>
            <strong className="text-mc-emerald font-bold">{STUDIO_INFO.developerName}</strong>
            <span>in India.</span>
          </div>

          <p className="text-[10px] text-mc-subtle text-center sm:text-right">
            Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
};
