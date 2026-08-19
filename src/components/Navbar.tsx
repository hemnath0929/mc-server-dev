import React, { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, Menu, X, MessageSquare, Sparkles, ChevronRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

interface NavbarProps {
  onOpenQuest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuest }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newMuted = soundEffects.toggleMute();
    setIsMuted(newMuted);
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Process', href: '#process' },
    { label: 'Console', href: '#console' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavLinkClick = () => {
    soundEffects.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-mc-dark/90 backdrop-blur-md border-b border-mc-border/80 py-3 shadow-mc-card'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={() => soundEffects.playClick()}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-mc-emerald rounded-md p-1"
        >
          <div className="relative w-9 h-9 rounded bg-mc-obsidian border border-mc-emerald/60 flex items-center justify-center shadow-glow-emerald transition-transform group-hover:scale-105">
            {/* Minecraft Block Icon */}
            <div className="w-5 h-5 bg-mc-emerald rounded-sm relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-mc-emerald-dark to-mc-emerald-glow opacity-80" />
              <Terminal className="w-3 h-3 text-mc-dark relative z-10 stroke-[2.5]" />
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-mc-emerald animate-ping opacity-75" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-mc-emerald" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-mc-emerald transition-colors">
                DEVIL<span className="text-mc-emerald">.STUDIO</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-bold text-mc-emerald bg-mc-emerald/10 border border-mc-emerald/30 rounded">
                20.0 TPS
              </span>
            </div>
            <p className="text-[10px] font-mono text-mc-muted hidden sm:block">
              Minecraft Server Engineering
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-mc-obsidian/80 px-3 py-1.5 rounded-full border border-mc-border/60 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavLinkClick}
              className="px-3.5 py-1 text-xs font-medium text-mc-muted hover:text-white hover:bg-mc-surface/80 rounded-full transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio FX Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            className="w-9 h-9 rounded-md bg-mc-surface/60 border border-mc-border hover:border-mc-emerald/50 flex items-center justify-center text-mc-muted hover:text-mc-emerald transition-all"
            aria-label="Toggle Sound Effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-mc-subtle" /> : <Volume2 className="w-4 h-4 text-mc-emerald" />}
          </button>

          {/* Discord Direct DM Link */}
          <a
            href={STUDIO_INFO.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-mc-portal bg-mc-portal/10 border border-mc-portal/30 hover:bg-mc-portal/20 rounded-md transition-all"
            title="Direct Message devil on Discord (@devil0329.)"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="font-mono">DM: @{STUDIO_INFO.discordHandle}</span>
          </a>

          {/* Primary CTA */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onOpenQuest();
            }}
            className="mc-button-primary text-xs sm:text-sm px-4 sm:px-5 py-2 font-bold tracking-wide"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Build My Plugin</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden w-9 h-9 rounded-md bg-mc-surface border border-mc-border flex items-center justify-center text-mc-muted hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-mc-obsidian/98 border-b border-mc-border px-6 py-6 mt-2 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-mc-border/40">
              <span className="text-xs font-mono text-mc-muted">QUICK NAVIGATION</span>
              <span className="mc-xp-badge">● ONLINE 20.0 TPS</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavLinkClick}
                className="flex items-center justify-between py-2 text-sm font-medium text-mc-text hover:text-mc-emerald border-b border-mc-border/20 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-mc-subtle" />
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={STUDIO_INFO.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playClick()}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono font-semibold text-mc-portal bg-mc-portal/10 border border-mc-portal/30 rounded-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>DM on Discord (@{STUDIO_INFO.discordHandle})</span>
              </a>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setMobileMenuOpen(false);
                  onOpenQuest();
                }}
                className="mc-button-primary w-full py-3 text-sm font-bold"
              >
                <Sparkles className="w-4 h-4" />
                <span>Build My Plugin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
