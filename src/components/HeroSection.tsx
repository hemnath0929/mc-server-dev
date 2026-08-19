import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, ArrowRight, Server, Zap, CheckCircle2, Compass, Box } from 'lucide-react';
import { STUDIO_INFO } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

interface HeroSectionProps {
  onOpenQuest: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuest }) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'telemetry'>('terminal');
  const [tpsValue, setTpsValue] = useState(20.00);
  const [tickMs, setTickMs] = useState(0.04);

  // Subtle simulated telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = (Math.random() - 0.5) * 0.01;
      setTickMs(Number((0.04 + jitter).toFixed(3)));
      setTpsValue(20.00);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Minecraft Glows & Beacon Beams */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-mc-emerald/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-mc-portal/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-mc-diamond/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Decorative Minecraft Pixel Cube Horizon Wireframe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px mc-beacon-line opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Minecraft HUD Status & Coordinates Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-mc-obsidian/90 border border-mc-border text-xs font-mono text-mc-muted shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-mc-emerald animate-pulse" />
            <span className="text-mc-emerald font-bold">{STUDIO_INFO.brandShort}</span>
            <span className="text-mc-subtle">|</span>
            <span className="flex items-center gap-1 text-mc-text">
              <Compass className="w-3 h-3 text-mc-gold" />
              <span>XYZ: 128 / 64 / -384</span>
            </span>
            <span className="hidden sm:inline text-mc-subtle">|</span>
            <span className="hidden sm:inline text-mc-diamond font-semibold">CHUNK: 8, -24</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-mc-obsidian/90 border border-mc-emerald/30 text-xs font-mono text-mc-emerald backdrop-blur-md">
            <Box className="w-3.5 h-3.5" />
            <span>● 20.00 TPS</span>
            <span className="text-mc-subtle">|</span>
            <span className="text-white font-semibold">JAVA 21 ENGINE READY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Main Headline */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-mc-emerald/10 border border-mc-emerald/30 text-mc-emerald text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Minecraft-Native Software Studio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Custom Systems. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-mc-emerald via-mc-diamond to-mc-emerald-glow bg-clip-text text-transparent">
                  Built for Your Server.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-mc-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Custom Minecraft plugins, high-throughput Paper, Purpur & Folia systems, and bi-directional Discord bridges engineered around the way your community plays. Zero tick lag, dupe-proof architectures, and clean configuration.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0 pt-1">
              <div className="mc-panel p-3.5 text-center lg:text-left bg-mc-obsidian/90 border-mc-border">
                <div className="text-xl sm:text-2xl font-mono font-bold text-mc-emerald">20.00</div>
                <div className="text-[11px] font-mono text-mc-muted uppercase tracking-wider">Target TPS</div>
              </div>
              <div className="mc-panel p-3.5 text-center lg:text-left bg-mc-obsidian/90 border-mc-border">
                <div className="text-xl sm:text-2xl font-mono font-bold text-mc-diamond">Anytime</div>
                <div className="text-[11px] font-mono text-mc-muted uppercase tracking-wider">Bug Warranty</div>
              </div>
              <div className="mc-panel p-3.5 text-center lg:text-left bg-mc-obsidian/90 border-mc-border">
                <div className="text-xl sm:text-2xl font-mono font-bold text-mc-portal">Java 21</div>
                <div className="text-[11px] font-mono text-mc-muted uppercase tracking-wider">Modern Stack</div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onOpenQuest();
                }}
                className="mc-button-primary w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold shadow-glow-emerald"
              >
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>Build My Plugin</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#case-studies"
                onClick={() => soundEffects.playClick()}
                className="mc-button-secondary w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base"
              >
                <Terminal className="w-4 h-4 text-mc-diamond" />
                <span>Explore My Work</span>
              </a>
            </div>

            {/* Sub-note */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-mono text-mc-subtle">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-mc-emerald" />
                100% Tailored Specifications
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-mc-emerald" />
                No Cookie-Cutter Templates
              </span>
            </div>
          </div>

          {/* Right Column: Floating Simulated Server HUD / Terminal */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-mc-emerald/30 via-mc-diamond/20 to-mc-portal/30 rounded-xl blur-lg opacity-75 animate-pulse-slow pointer-events-none" />

              {/* Console Container */}
              <div className="relative mc-panel overflow-hidden border border-mc-border/90 bg-mc-obsidian shadow-2xl">
                {/* Window Header */}
                <div className="bg-mc-dark/95 px-4 py-3 border-b border-mc-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-mc-redstone" />
                    <div className="w-2.5 h-2.5 rounded-full bg-mc-gold" />
                    <div className="w-2.5 h-2.5 rounded-full bg-mc-emerald" />
                    <span className="ml-2 text-xs font-mono font-semibold text-mc-muted flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-mc-emerald" />
                      devil@server-node-1:~#
                    </span>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex items-center gap-1 bg-mc-obsidian px-1.5 py-0.5 rounded border border-mc-border/60 text-[11px] font-mono">
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveTab('terminal');
                      }}
                      className={`px-2 py-0.5 rounded ${
                        activeTab === 'terminal' ? 'bg-mc-surface text-mc-emerald font-bold' : 'text-mc-subtle hover:text-mc-muted'
                      }`}
                    >
                      Build
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveTab('telemetry');
                      }}
                      className={`px-2 py-0.5 rounded ${
                        activeTab === 'telemetry' ? 'bg-mc-surface text-mc-diamond font-bold' : 'text-mc-subtle hover:text-mc-muted'
                      }`}
                    >
                      Spark TPS
                    </button>
                  </div>
                </div>

                {/* Tab Content: Terminal Simulation */}
                {activeTab === 'terminal' && (
                  <div className="p-4 sm:p-5 font-mono text-xs space-y-2.5 text-mc-muted leading-relaxed bg-[#0a0d14]/90 min-h-[300px]">
                    <div className="flex items-center gap-2 text-mc-subtle">
                      <span>$</span>
                      <span className="text-white">gradle build --profile --daemon</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-start gap-2 text-mc-emerald">
                        <span className="font-bold">✓</span>
                        <span>[Paper API 1.20.4+] Target compile succeeded</span>
                      </div>
                      <div className="flex items-start gap-2 text-mc-diamond">
                        <span className="font-bold">✓</span>
                        <span>[Redis Cache] Thread-safe ring buffer active</span>
                      </div>
                      <div className="flex items-start gap-2 text-mc-emerald">
                        <span className="font-bold">✓</span>
                        <span>[HikariCP] MySQL connection pool ready (10/10)</span>
                      </div>
                      <div className="flex items-start gap-2 text-mc-gold">
                        <span className="font-bold">✓</span>
                        <span>[Adventure] MiniMessage GUI components bound</span>
                      </div>
                      <div className="flex items-start gap-2 text-mc-portal">
                        <span className="font-bold">✓</span>
                        <span>[JDA 5] Discord webhook & slash router verified</span>
                      </div>
                      <div className="flex items-start gap-2 text-mc-emerald">
                        <span className="font-bold">✓</span>
                        <span>[Spark Profiler] Zero tick lag budget verified</span>
                      </div>
                    </div>

                    <div className="pt-3 pb-1 border-t border-mc-border/40">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-mc-subtle">DEPLOYMENT STATE:</span>
                        <span className="text-mc-emerald font-bold animate-pulse">● READY FOR /PLUGINS</span>
                      </div>
                    </div>

                    {/* Simulated Command Input */}
                    <div className="bg-mc-obsidian/90 p-2 rounded border border-mc-border/60 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 text-mc-emerald">
                        <span>&gt;</span>
                        <span className="text-mc-text font-mono">/plugin deploy --target=production</span>
                      </div>
                      <span className="text-mc-subtle">[ENTER]</span>
                    </div>
                  </div>
                )}

                {/* Tab Content: Telemetry & Spark Metrics */}
                {activeTab === 'telemetry' && (
                  <div className="p-4 sm:p-5 font-mono text-xs space-y-4 bg-[#0a0d14]/90 min-h-[300px]">
                    <div className="flex items-center justify-between">
                      <span className="text-mc-muted uppercase tracking-wider text-[10px]">SPARK ENGINE TELEMETRY</span>
                      <span className="mc-xp-badge">● STABLE 20.00</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-mc-obsidian p-3 rounded border border-mc-border/60">
                        <div className="text-[10px] text-mc-subtle uppercase">Current Server TPS</div>
                        <div className="text-xl font-bold text-mc-emerald mt-1">{tpsValue.toFixed(2)}</div>
                        <div className="text-[9px] text-mc-muted mt-0.5">Max 20.00 · 0 drops</div>
                      </div>
                      <div className="bg-mc-obsidian p-3 rounded border border-mc-border/60">
                        <div className="text-[10px] text-mc-subtle uppercase">Plugin Loop Cost</div>
                        <div className="text-xl font-bold text-mc-diamond mt-1">{tickMs} ms</div>
                        <div className="text-[9px] text-mc-muted mt-0.5">Budget 50.00 ms</div>
                      </div>
                    </div>

                    {/* Spark Bar visualization */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-mc-muted">Main Thread CPU Load</span>
                        <span className="text-mc-emerald font-bold">1.4%</span>
                      </div>
                      <div className="w-full bg-mc-surface h-2 rounded overflow-hidden border border-mc-border/50">
                        <div className="bg-gradient-to-r from-mc-emerald to-mc-diamond h-full w-[4%]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-mc-muted">Async Worker Pool Util</span>
                        <span className="text-mc-portal font-bold">12.8%</span>
                      </div>
                      <div className="w-full bg-mc-surface h-2 rounded overflow-hidden border border-mc-border/50">
                        <div className="bg-gradient-to-r from-mc-portal to-mc-diamond h-full w-[13%]" />
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-mc-surface/40 border border-mc-border/40 text-[10px] text-mc-muted flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-mc-emerald shrink-0" />
                      <span>Zero blocking queries on the primary tick. Tested up to 250 concurrent players.</span>
                    </div>
                  </div>
                )}

                {/* Console Footer Status */}
                <div className="bg-mc-dark px-4 py-2 border-t border-mc-border/70 flex items-center justify-between text-[10px] font-mono text-mc-subtle">
                  <span>REGION: INDIA (GLOBAL CLIENTS)</span>
                  <span className="text-mc-emerald font-semibold">100% ASYNC SAFE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
