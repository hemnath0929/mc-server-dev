import React, { useState } from 'react';
import { PRICING_TIERS } from '../data/portfolioData';
import { Wrench, ShieldCheck, Crown, CheckCircle2, ArrowRight, Calculator } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface PricingSectionProps {
  onOpenQuestWithTier: (tierName: string) => void;
}

const tierIcons: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-5 h-5 text-mc-diamond" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-mc-emerald" />,
  Crown: <Crown className="w-5 h-5 text-mc-gold" />,
};

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenQuestWithTier }) => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonOptions = [
    { id: 'redis', label: 'Redis / Distributed Cross-Server Sync', complexity: '+ Low/Medium' },
    { id: 'discord', label: 'Discord JDA 5 Bot Bridge & Slash Commands', complexity: '+ Medium' },
    { id: 'gui', label: 'Custom Animated MiniMessage GUIs & Menus', complexity: '+ Low' },
    { id: 'folia', label: 'Folia Regionized Multithreading Support', complexity: '+ Medium' },
  ];

  const handleToggleAddon = (id: string) => {
    soundEffects.playPop();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="pricing" className="py-24 relative z-10 bg-mc-obsidian/40 border-t border-mc-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mc-gold/10 border border-mc-gold/30 text-mc-gold text-xs font-mono font-bold uppercase tracking-wider">
            <span>💎 Transparent Milestone Estimates</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tailored Quotes. Zero Hidden Fees.
          </h2>

          <p className="text-base sm:text-lg text-mc-muted leading-relaxed">
            Every custom plugin is priced transparently based on your required features, database architecture, and timeline. No recurring surprise licensing costs.
          </p>
        </div>

        {/* 3 Scope Guidance Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRICING_TIERS.map((tier) => {
            return (
              <div
                key={tier.id}
                className={`mc-panel p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  tier.isPopular
                    ? 'border-mc-emerald shadow-glow-emerald bg-mc-surface/95 -translate-y-2'
                    : 'hover:border-mc-border/90'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-mc-emerald text-mc-dark text-[10px] font-mono font-extrabold tracking-wider uppercase shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  {/* Top Slot Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="mc-slot">
                      {tierIcons[tier.itemIcon] || <Wrench className="w-5 h-5 text-mc-emerald" />}
                    </div>
                    <span className="mc-badge text-[10px]">{tier.tag}</span>
                  </div>

                  {/* Title & Suitability */}
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-xs sm:text-sm text-mc-muted mb-6 leading-relaxed">{tier.suitability}</p>

                  {/* Pricing Model Badge */}
                  <div className="p-3.5 rounded-lg bg-mc-obsidian border border-mc-border/70 mb-6 text-center">
                    <div className="text-xs font-mono text-mc-subtle uppercase">Pricing Model</div>
                    <div className="text-lg font-mono font-extrabold text-mc-emerald mt-0.5">
                      {tier.pricingModel}
                    </div>
                    <div className="text-[10px] font-mono text-mc-muted mt-0.5">Fixed Milestone Estimate</div>
                  </div>

                  {/* Typical Scope Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[10px] font-mono text-mc-subtle uppercase tracking-wider">
                      Included Architecture:
                    </div>
                    {tier.typicalScope.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-mc-text/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-mc-emerald shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trigger Button */}
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onOpenQuestWithTier(tier.name);
                  }}
                  className={`w-full py-3 px-4 text-xs font-mono font-bold rounded transition-all duration-200 flex items-center justify-center gap-2 ${
                    tier.isPopular
                      ? 'mc-button-primary'
                      : 'mc-button-secondary'
                  }`}
                >
                  <span>Start Custom Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Scope Addon Previewer */}
        <div className="mc-panel p-6 sm:p-8 bg-mc-obsidian border-mc-border max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="mc-slot w-10 h-10">
              <Calculator className="w-5 h-5 text-mc-emerald" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Interactive Scope Blueprint Calculator</h4>
              <p className="text-xs text-mc-muted">Select desired modules to preview architecture scope.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
            {addonOptions.map((addon) => {
              const isChecked = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => handleToggleAddon(addon.id)}
                  className={`p-3 rounded-lg border text-left flex items-center justify-between text-xs font-mono transition-all ${
                    isChecked
                      ? 'bg-mc-emerald/10 border-mc-emerald text-white shadow-sm'
                      : 'bg-mc-surface/40 border-mc-border text-mc-muted hover:border-mc-border/90'
                  }`}
                >
                  <span className="font-medium">{addon.label}</span>
                  <span className="text-[10px] text-mc-emerald font-bold shrink-0 ml-2">{addon.complexity}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-mc-surface/70 border border-mc-border/70">
            <div className="text-xs text-mc-muted">
              <span>Selected Modules: </span>
              <strong className="text-mc-emerald font-mono">
                {selectedAddons.length > 0 ? `${selectedAddons.length} Advanced Modules` : 'Base Custom Core'}
              </strong>
            </div>

            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenQuestWithTier('Custom Blueprint System');
              }}
              className="mc-button-primary text-xs px-5 py-2 font-bold w-full sm:w-auto"
            >
              <span>Get Estimate for this Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
