import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Hammer, BookOpen, Terminal, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface HowItWorksProps {
  onOpenQuest: () => void;
}

const stepIcons: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="w-5 h-5 text-mc-emerald" />,
  BookOpen: <BookOpen className="w-5 h-5 text-mc-diamond" />,
  Terminal: <Terminal className="w-5 h-5 text-mc-portal" />,
  Zap: <Zap className="w-5 h-5 text-mc-gold" />,
};

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenQuest }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mc-portal/10 border border-mc-portal/30 text-mc-portal text-xs font-mono font-bold uppercase tracking-wider">
            <span>✨ 4-Step Engineering Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            From Idea to /plugins.
          </h2>

          <p className="text-base sm:text-lg text-mc-muted leading-relaxed">
            A transparent, milestone-driven development process with zero guesswork. We align on specifications, build performant code, and guarantee post-launch stability.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.stepNumber}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveStep(idx);
                }}
                className={`mc-panel p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-mc-emerald shadow-glow-emerald bg-mc-surface'
                    : 'hover:border-mc-border/90'
                }`}
              >
                <div>
                  {/* Step Top Header: Step Number & Minecraft Item */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-extrabold text-mc-emerald">
                      {step.stepNumber}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-mc-obsidian text-mc-muted border border-mc-border">
                      {step.minecraftItem}
                    </span>
                  </div>

                  {/* Icon Slot */}
                  <div className="mc-slot mb-4">
                    {stepIcons[step.icon] || <Hammer className="w-5 h-5 text-mc-emerald" />}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-xs font-medium text-mc-emerald/90 mb-3">{step.tagline}</p>
                  <p className="text-xs text-mc-muted leading-relaxed mb-4">{step.description}</p>
                </div>

                {/* Deliverables Checklist */}
                <div className="border-t border-mc-border/40 pt-3 space-y-1.5">
                  <div className="text-[10px] font-mono text-mc-subtle uppercase tracking-wider">
                    Milestone Deliverables:
                  </div>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-mc-text/90">
                      <CheckCircle2 className="w-3 h-3 text-mc-emerald shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Banner: Start Quest */}
        <div className="mt-16 mc-panel p-8 sm:p-10 relative overflow-hidden bg-gradient-to-r from-mc-obsidian via-mc-surface to-mc-obsidian border-mc-emerald/40 shadow-glow-emerald text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="mc-xp-badge text-[11px]">READY TO UPGRADE YOUR SERVER?</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Have a Unique Server Concept?</h3>
            <p className="text-sm text-mc-muted">
              Tell me what you want to build. I will engineer the entire plugin system around your exact server specifications.
            </p>
          </div>

          <button
            onClick={() => {
              soundEffects.playPop();
              onOpenQuest();
            }}
            className="mc-button-primary px-8 py-3.5 text-sm sm:text-base font-bold shrink-0 w-full sm:w-auto"
          >
            <span>Start Plugin Quest</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
