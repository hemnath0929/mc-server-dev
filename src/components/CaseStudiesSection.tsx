import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/portfolioData';
import { CaseStudy } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowUpRight, Layers } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface CaseStudiesSectionProps {
  onOpenQuestWithRef: (projectName: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenQuestWithRef }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const handleOpenModal = (study: CaseStudy) => {
    soundEffects.playPop();
    setSelectedCaseStudy(study);
  };

  return (
    <section id="case-studies" className="py-24 relative z-10 bg-mc-obsidian/40 border-t border-mc-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mc-diamond/10 border border-mc-diamond/30 text-mc-diamond text-xs font-mono font-bold uppercase tracking-wider">
            <span>🛡️ Proof of Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built for Real Server Problems.
          </h2>

          <p className="text-base sm:text-lg text-mc-muted leading-relaxed">
            Explore deep architectural case studies. See how async Redis caching, transactional locks, and JDA 5 bot bridges solve real performance bottlenecks.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="mc-panel p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:border-mc-diamond/60 hover:-translate-y-1"
            >
              <div>
                {/* Header Row: Category Badge & Status */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="mc-diamond-badge text-[11px]">{study.category}</span>
                    <span className="text-xs font-mono text-mc-muted">MC {study.version}</span>
                  </div>

                  <span className="text-[10px] font-mono text-mc-emerald bg-mc-emerald/10 px-2 py-0.5 rounded border border-mc-emerald/30">
                    {study.status}
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <h3 className="text-2xl font-bold text-white group-hover:text-mc-diamond transition-colors mb-2">
                  {study.title}
                </h3>
                <p className="text-sm font-medium text-mc-emerald/90 mb-4">{study.tagline}</p>
                <p className="text-xs sm:text-sm text-mc-muted leading-relaxed mb-6">{study.summary}</p>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 py-4 mb-6 border-y border-mc-border/50 bg-mc-surface/40 rounded-lg px-3">
                  {study.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-base sm:text-lg font-mono font-bold text-mc-text">{m.value}</div>
                      <div className="text-[10px] font-mono text-mc-subtle uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Platform Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-[11px] font-mono text-mc-subtle mr-1">Platforms:</span>
                  {study.platforms.map((plat) => (
                    <span
                      key={plat}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-mc-obsidian text-mc-text border border-mc-border"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => handleOpenModal(study)}
                  className="w-full py-3 px-4 text-xs font-mono font-bold text-mc-diamond hover:text-mc-dark bg-mc-surface hover:bg-mc-diamond border border-mc-diamond/40 hover:border-mc-diamond rounded-md transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <Layers className="w-4 h-4" />
                  <span>Inspect System Architecture & Benchmarks</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenQuestWithRef={onOpenQuestWithRef}
      />
    </section>
  );
};
