import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';
import { STUDIO_INFO } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

interface ServerConsoleDemoProps {
  onOpenQuest: () => void;
}

interface CommandOutput {
  id: string;
  command: string;
  lines: string[];
  type?: 'default' | 'success' | 'warning' | 'error' | 'spark';
}

export const ServerConsoleDemo: React.FC<ServerConsoleDemoProps> = ({ onOpenQuest }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'system init --version=1.21',
      type: 'default',
      lines: [
        'Minecraft Server Engineering Studio [Devil Studio] v1.4.0',
        'Connected to simulated Paper/Purpur runtime.',
        'Type `/help` or click the quick command chips below to test engine telemetry.',
      ],
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleRunCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    soundEffects.playClick();

    const cleanCmd = trimmed.startsWith('/') ? trimmed.substring(1) : trimmed;

    let responseLines: string[] = [];
    let responseType: 'default' | 'success' | 'warning' | 'error' | 'spark' = 'default';

    switch (cleanCmd) {
      case 'help':
        responseLines = [
          'AVAILABLE SIMULATION COMMANDS:',
          '  /tps        - View real-time server ticks per second & memory budget',
          '  /spark      - Run CPU profiling & asynchronous task telemetry',
          '  /plugins    - List active custom plugin architecture modules',
          '  /build      - Launch the 7-Step "Build My Plugin" Quest modal',
          '  /about      - View developer credentials & engineering philosophy',
          '  /contact    - Get direct Discord link and inquiry routes',
          '  /clear      - Wipe terminal history',
        ];
        break;

      case 'tps':
        responseLines = [
          'TPS from last 1m, 5m, 15m: §a20.00§r, §a20.00§r, §a20.00§r',
          'Tick durations: §a0.04ms§r avg / §750.00ms§r budget (0.08% CPU capacity)',
          'Thread Health: §aAll primary ticks operating at peak efficiency§r',
        ];
        responseType = 'success';
        break;

      case 'spark':
        responseLines = [
          '-- Spark Profiler Performance Report --',
          'TPS: 20.00 (100% stable) | MSPT: 0.04ms',
          'CPU Usage: System 2.1% | Process 1.2%',
          'Virtual Worker Pool: 4 Threads active (0 blocked)',
          'Database Pool: HikariCP [10 active / 0 waiting / 1.1ms latency]',
          'Memory: Heap 2.4GB / 8.0GB allocated (GC pause: < 0.01%)',
        ];
        responseType = 'spark';
        break;

      case 'plugins':
        responseLines = [
          'Server Plugins (4 Custom Engineered Modules):',
          '  §aAetherProgression v2.4§r - Asynchronous SMP Scoring & Leaderboards',
          '  §aNexusEconomy v3.1§r - Dupe-Proof Multi-Currency & Redis Mutex',
          '  §aVaultGuardBridge v1.9§r - Bi-Directional JDA 5 Staff Console Stream',
          '  §aDungeonEngine v2.0§r - Instanced World & Custom Boss AI Controller',
        ];
        responseType = 'success';
        break;

      case 'build':
      case 'quote':
      case 'quest':
        responseLines = ['Opening interactive 7-Step Plugin Quest intake system...'];
        responseType = 'success';
        onOpenQuest();
        break;

      case 'about':
        responseLines = [
          `Developer: ${STUDIO_INFO.developerName} (Solo Systems Engineer)`,
          `Location: ${STUDIO_INFO.location}`,
          'Specialization: High-throughput Paper/Purpur/Folia plugins with zero tick drops.',
          'Guarantee: Anytime Free Bug-Fix Warranty on all custom deliverables.',
        ];
        responseType = 'default';
        break;

      case 'contact':
        responseLines = [
          `Discord Direct Message: @${STUDIO_INFO.discordHandle} (${STUDIO_INFO.discordUrl})`,
          `Business Email: ${STUDIO_INFO.email}`,
          'Click "Build My Plugin" in the top bar to submit a custom specification.',
        ];
        responseType = 'default';
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        responseLines = [
          `Unknown command '/${cleanCmd}'. Type '/help' for available server simulation commands.`,
        ];
        responseType = 'error';
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmd.startsWith('/') ? cmd : `/${cmd}`,
        lines: responseLines,
        type: responseType,
      },
    ]);

    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunCommand(inputVal);
  };

  const quickCommands = ['/help', '/tps', '/spark', '/plugins', '/build', '/about'];

  return (
    <section id="console" className="py-24 relative z-10 bg-mc-obsidian/30 border-y border-mc-border/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mc-emerald/10 border border-mc-emerald/30 text-mc-emerald text-xs font-mono font-bold uppercase tracking-wider">
            <span>💻 Live Interactive Console Simulator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Test the Engineering Precision.
          </h2>

          <p className="text-sm sm:text-base text-mc-muted">
            Run real simulated server commands inside an interactive Paper terminal. Test TPS metrics, spark telemetry, and custom plugin modules.
          </p>
        </div>

        {/* Console Container */}
        <div className="mc-panel overflow-hidden border border-mc-border/90 bg-[#080B10] shadow-2xl rounded-xl">
          {/* Top Window Bar */}
          <div className="bg-mc-dark px-4 py-3 border-b border-mc-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-mc-redstone" />
              <div className="w-2.5 h-2.5 rounded-full bg-mc-gold" />
              <div className="w-2.5 h-2.5 rounded-full bg-mc-emerald" />
              <span className="ml-2 text-xs font-mono font-semibold text-mc-muted flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-mc-emerald" />
                paper-server-console (Java 21 · Paper 1.20.4+)
              </span>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                setHistory([]);
              }}
              className="text-[11px] font-mono text-mc-subtle hover:text-mc-muted flex items-center gap-1"
              title="Clear Console"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>

          {/* Quick Command Chips */}
          <div className="bg-[#0b0e14] px-4 py-2 border-b border-mc-border/40 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-mc-subtle mr-1">Quick Test:</span>
            {quickCommands.map((qc) => (
              <button
                key={qc}
                onClick={() => handleRunCommand(qc)}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-mc-surface/80 hover:bg-mc-emerald hover:text-mc-dark text-mc-emerald border border-mc-border hover:border-mc-emerald transition-colors"
              >
                {qc}
              </button>
            ))}
          </div>

          {/* Output Window */}
          <div className="p-4 sm:p-6 font-mono text-xs text-mc-muted space-y-4 max-h-[360px] overflow-y-auto bg-[#07090E]">
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5 leading-relaxed">
                <div className="flex items-center gap-2 text-mc-subtle">
                  <span className="text-mc-emerald font-bold">&gt;</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>

                <div
                  className={`pl-4 border-l-2 ${
                    item.type === 'spark'
                      ? 'border-mc-diamond text-mc-diamond-glow'
                      : item.type === 'success'
                      ? 'border-mc-emerald text-mc-emerald-glow'
                      : item.type === 'error'
                      ? 'border-mc-redstone text-mc-redstone'
                      : 'border-mc-border text-mc-muted'
                  } space-y-0.5`}
                >
                  {item.lines.map((line, lIdx) => (
                    <div key={lIdx} className="whitespace-pre-wrap">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Command Input Bar */}
          <form onSubmit={handleSubmit} className="bg-mc-dark/95 p-3 border-t border-mc-border flex items-center gap-2">
            <div className="flex items-center gap-2 text-mc-emerald font-mono text-sm pl-2">
              <span>&gt;</span>
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type /help, /tps, /spark, or /plugins..."
              className="flex-1 bg-transparent font-mono text-xs text-white placeholder-mc-subtle focus:outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-mono font-bold text-mc-dark bg-mc-emerald hover:bg-mc-emerald-glow rounded flex items-center gap-1.5 transition-colors shadow-glow-emerald"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Run</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
