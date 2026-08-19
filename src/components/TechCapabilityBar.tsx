import React from 'react';
import { TECH_CAPABILITIES } from '../data/portfolioData';
import { Terminal, Cpu, Network, Code2, Sparkles, Zap, Database, MessageSquare } from 'lucide-react';
import { soundEffects } from '../utils/audio';

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-3.5 h-3.5" />,
  Cpu: <Cpu className="w-3.5 h-3.5" />,
  Network: <Network className="w-3.5 h-3.5" />,
  Code2: <Code2 className="w-3.5 h-3.5" />,
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  Zap: <Zap className="w-3.5 h-3.5" />,
  Database: <Database className="w-3.5 h-3.5" />,
  MessageSquare: <MessageSquare className="w-3.5 h-3.5" />,
};

export const TechCapabilityBar: React.FC = () => {
  return (
    <div className="border-y border-mc-border/60 bg-mc-obsidian/70 backdrop-blur-md py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Label */}
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-mc-muted uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-mc-emerald" />
            <span>Target Architecture & Runtime Stack</span>
          </div>

          {/* Badges Grid / Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-2.5">
            {TECH_CAPABILITIES.map((tech) => {
              const badgeClass =
                tech.badgeColor === 'emerald'
                  ? 'border-mc-emerald/30 hover:border-mc-emerald hover:text-white hover:shadow-glow-emerald text-mc-emerald'
                  : tech.badgeColor === 'diamond'
                  ? 'border-mc-diamond/30 hover:border-mc-diamond hover:text-white hover:shadow-glow-diamond text-mc-diamond'
                  : tech.badgeColor === 'portal'
                  ? 'border-mc-portal/30 hover:border-mc-portal hover:text-white hover:shadow-glow-portal text-mc-portal'
                  : tech.badgeColor === 'gold'
                  ? 'border-mc-gold/30 hover:border-mc-gold hover:text-white text-mc-gold'
                  : 'border-mc-redstone/30 hover:border-mc-redstone hover:text-white text-mc-redstone';

              return (
                <div
                  key={tech.name}
                  onMouseEnter={() => soundEffects.playPop()}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-mc-surface/70 border ${badgeClass} text-xs font-mono transition-all duration-200 cursor-default`}
                  title={tech.description}
                >
                  <span className="opacity-90">{iconMap[tech.icon] || <Terminal className="w-3.5 h-3.5" />}</span>
                  <span className="font-semibold text-mc-text group-hover:text-white">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
