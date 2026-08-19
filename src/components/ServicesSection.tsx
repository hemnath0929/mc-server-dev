import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { Sword, Coins, LayoutGrid, MessageCircle, Activity, Server, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  Sword: <Sword className="w-5 h-5 text-mc-emerald" />,
  Coins: <Coins className="w-5 h-5 text-mc-gold" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5 text-mc-diamond" />,
  MessageCircle: <MessageCircle className="w-5 h-5 text-mc-portal" />,
  Activity: <Activity className="w-5 h-5 text-mc-redstone" />,
  Server: <Server className="w-5 h-5 text-mc-emerald" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mc-emerald/10 border border-mc-emerald/30 text-mc-emerald text-xs font-mono font-bold uppercase tracking-wider">
            <span>⚔️ Tailored Engineering Offerings</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built Around Your Server.
          </h2>

          <p className="text-base sm:text-lg text-mc-muted leading-relaxed">
            No cookie-cutter templates or generic code. Every mechanic, database query, and interface is custom-developed to fit your exact gamemode and player experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => {
            const badgeClass =
              service.badgeType === 'emerald'
                ? 'mc-xp-badge'
                : service.badgeType === 'diamond'
                ? 'mc-diamond-badge'
                : service.badgeType === 'portal'
                ? 'mc-portal-badge'
                : service.badgeType === 'gold'
                ? 'text-mc-gold bg-mc-gold/10 border border-mc-gold/30'
                : 'mc-redstone-badge';

            return (
              <div
                key={service.id}
                onMouseEnter={() => soundEffects.playPop()}
                className="mc-panel p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-mc-emerald/50"
              >
                {/* Subtle Card Background Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-mc-emerald/5 rounded-full blur-2xl group-hover:bg-mc-emerald/10 transition-colors pointer-events-none" />

                <div>
                  {/* Top Row: Icon Slot & Highlight Badge */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="mc-slot group-hover:border-mc-emerald">
                      {serviceIcons[service.iconName] || <Sword className="w-5 h-5 text-mc-emerald" />}
                    </div>

                    <span className={`${badgeClass} text-[11px]`}>{service.highlight}</span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-mc-emerald transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-sm text-mc-muted leading-relaxed mb-5">
                    {service.detailedDesc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-6 border-t border-mc-border/40 pt-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-mc-text/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-mc-emerald shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-mc-obsidian text-mc-muted border border-mc-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Request Button */}
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectService(service.title);
                    }}
                    className="w-full py-2.5 px-4 text-xs font-mono font-bold text-mc-text hover:text-mc-dark bg-mc-surface hover:bg-mc-emerald border border-mc-border hover:border-mc-emerald rounded transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Request This System</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
