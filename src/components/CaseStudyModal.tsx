import React, { useState } from 'react';
import { CaseStudy } from '../types';
import { X, Server, Zap, ShieldCheck, ArrowRight, Layers, FileCode, CheckCircle2, Cpu } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenQuestWithRef: (projectName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose, onOpenQuestWithRef }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'config' | 'spark'>('architecture');

  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-mc-obsidian border border-mc-border/90 rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-mc-dark/95 px-6 py-4 border-b border-mc-border flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="mc-slot w-10 h-10">
              <Server className="w-5 h-5 text-mc-emerald" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{caseStudy.title}</h3>
                <span className="mc-xp-badge text-[10px]">{caseStudy.status}</span>
              </div>
              <p className="text-xs font-mono text-mc-muted">{caseStudy.tagline}</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-md bg-mc-surface hover:bg-mc-hover border border-mc-border flex items-center justify-center text-mc-muted hover:text-white transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {caseStudy.metrics.map((metric, idx) => (
              <div key={idx} className="bg-mc-surface/70 border border-mc-border rounded-lg p-4">
                <div className="text-xs font-mono text-mc-muted uppercase tracking-wider">{metric.label}</div>
                <div className="text-2xl font-bold font-mono text-mc-emerald mt-1">{metric.value}</div>
                <div className="text-xs text-mc-subtle mt-0.5">{metric.subtext}</div>
              </div>
            ))}
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-mc-surface/40 border border-mc-redstone/30 rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2 text-mc-redstone text-xs font-mono font-bold uppercase">
                <Zap className="w-4 h-4" />
                <span>The Engineering Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-mc-muted leading-relaxed">{caseStudy.problem}</p>
            </div>

            <div className="bg-mc-surface/40 border border-mc-emerald/30 rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2 text-mc-emerald text-xs font-mono font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>The Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-mc-muted leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>

          {/* Tab Navigation for Technical Views */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-mc-border pb-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('architecture');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-mc-emerald text-mc-dark shadow-glow-emerald'
                    : 'text-mc-muted hover:text-white bg-mc-surface/50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>System Architecture</span>
              </button>

              {caseStudy.sampleConfig && (
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setActiveTab('config');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                    activeTab === 'config'
                      ? 'bg-mc-emerald text-mc-dark shadow-glow-emerald'
                      : 'text-mc-muted hover:text-white bg-mc-surface/50'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Config Spec</span>
                </button>
              )}

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('spark');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                  activeTab === 'spark'
                    ? 'bg-mc-emerald text-mc-dark shadow-glow-emerald'
                    : 'text-mc-muted hover:text-white bg-mc-surface/50'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Spark Profiling</span>
              </button>
            </div>

            {/* Tab: System Architecture Pipeline */}
            {activeTab === 'architecture' && (
              <div className="space-y-3 bg-mc-dark/90 p-5 rounded-lg border border-mc-border">
                <div className="text-xs font-mono text-mc-muted uppercase tracking-wider mb-2">
                  DATAFLOW & EXECUTION PIPELINE
                </div>
                <div className="space-y-2.5">
                  {caseStudy.architecture.map((node, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded bg-mc-surface/60 border border-mc-border/60 hover:border-mc-emerald/50 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-mc-diamond uppercase">
                            {node.layer}
                          </span>
                          <span className="text-xs font-bold text-white">{node.title}</span>
                        </div>
                        <p className="text-xs text-mc-muted">{node.description}</p>
                      </div>
                      <span className="self-start sm:self-center px-2 py-0.5 text-[10px] font-mono text-mc-emerald bg-mc-emerald/10 border border-mc-emerald/30 rounded shrink-0">
                        {node.tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Config Viewer */}
            {activeTab === 'config' && caseStudy.sampleConfig && (
              <div className="bg-[#0a0d14] p-5 rounded-lg border border-mc-border font-mono text-xs text-mc-text overflow-x-auto">
                <pre className="text-mc-emerald-glow leading-relaxed">{caseStudy.sampleConfig}</pre>
              </div>
            )}

            {/* Tab: Spark Profiler Benchmarks */}
            {activeTab === 'spark' && (
              <div className="bg-mc-dark/90 p-5 rounded-lg border border-mc-border space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-mc-muted uppercase">Tick Budget Consumption</span>
                  <span className="mc-xp-badge">{caseStudy.sparkTickBenchmark.avgTickMs} ms / 50.0 ms</span>
                </div>

                <div className="w-full bg-mc-surface h-3 rounded-full overflow-hidden border border-mc-border/50">
                  <div
                    className="bg-gradient-to-r from-mc-emerald to-mc-diamond h-full"
                    style={{ width: `${Math.max(2, (caseStudy.sparkTickBenchmark.avgTickMs / 50.0) * 100 * 20)}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-mc-surface/40 rounded border border-mc-border/40">
                    <span className="text-mc-subtle text-[10px] block uppercase">Offload Thread Type</span>
                    <span className="text-mc-diamond font-bold text-sm">{caseStudy.sparkTickBenchmark.threadType}</span>
                  </div>
                  <div className="p-3 bg-mc-surface/40 rounded border border-mc-border/40">
                    <span className="text-mc-subtle text-[10px] block uppercase">JVM GC Alloc Overhead</span>
                    <span className="text-mc-emerald font-bold text-sm">{caseStudy.sparkTickBenchmark.gcOverhead}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Engineered Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {caseStudy.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-mc-text/90 bg-mc-surface/30 p-2.5 rounded border border-mc-border/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mc-emerald shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bar with Quest CTA */}
        <div className="bg-mc-dark px-6 py-4 border-t border-mc-border flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
          <div className="flex items-center gap-2 text-xs font-mono text-mc-muted">
            <span>Target Platforms:</span>
            <span className="text-mc-emerald font-bold">{caseStudy.platforms.join(', ')}</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playPop();
              onClose();
              onOpenQuestWithRef(caseStudy.title);
            }}
            className="mc-button-primary w-full sm:w-auto px-6 py-2.5 text-xs font-bold"
          >
            <span>Request Similar System</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
