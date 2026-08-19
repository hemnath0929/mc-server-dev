import React, { useState, useEffect } from 'react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { TechCapabilityBar } from '../components/TechCapabilityBar';
import { ServicesSection } from '../components/ServicesSection';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { HowItWorks } from '../components/HowItWorks';
import { ServerConsoleDemo } from '../components/ServerConsoleDemo';
import { PricingSection } from '../components/PricingSection';
import { DeveloperAbout } from '../components/DeveloperAbout';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/Footer';
import { QuestEnquiryModal } from '../components/QuestEnquiryModal';

export const PublicSite: React.FC = () => {
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Ensure the website always opens at the very top (Hero Section) on fresh load or reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // If there is no specific hash, scroll cleanly to top
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  const handleOpenQuest = (serviceName?: string) => {
    setPrefilledService(serviceName);
    setQuestModalOpen(true);
  };

  const handleCloseQuest = () => {
    setQuestModalOpen(false);
    setPrefilledService(undefined);
  };

  return (
    <div className="min-h-screen bg-mc-dark text-mc-text relative selection:bg-mc-emerald selection:text-mc-dark">
      {/* Background Interactive Particle Mesh */}
      <ParticleCanvas />

      {/* Main Layout (100% Client-Facing) */}
      <Navbar onOpenQuest={() => handleOpenQuest()} />

      <main className="relative z-10">
        <HeroSection onOpenQuest={() => handleOpenQuest()} />
        <TechCapabilityBar />
        <ServicesSection onSelectService={(service) => handleOpenQuest(service)} />
        <CaseStudiesSection onOpenQuestWithRef={(projectName) => handleOpenQuest(`Similar to ${projectName}`)} />
        <HowItWorks onOpenQuest={() => handleOpenQuest()} />
        <ServerConsoleDemo onOpenQuest={() => handleOpenQuest()} />
        <PricingSection onOpenQuestWithTier={(tier) => handleOpenQuest(tier)} />
        <DeveloperAbout onOpenQuest={() => handleOpenQuest()} />
        <FAQSection />
      </main>

      <Footer onOpenQuest={() => handleOpenQuest()} />

      {/* 7-Step Plugin Quest Enquiry Modal */}
      <QuestEnquiryModal
        isOpen={questModalOpen}
        onClose={handleCloseQuest}
        initialService={prefilledService}
      />
    </div>
  );
};
