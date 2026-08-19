import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/portfolioData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Development', 'Compatibility', 'Process', 'Support'];

  const filteredFaqs =
    selectedCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  const toggleFaq = (id: string) => {
    soundEffects.playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mc-diamond/10 border border-mc-diamond/30 text-mc-diamond text-xs font-mono font-bold uppercase tracking-wider">
            <span>❓ Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to Know.
          </h2>

          <p className="text-sm sm:text-base text-mc-muted leading-relaxed">
            Common questions regarding custom development, 30-day warranties, Folia support, and delivery timelines.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playPop();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                selectedCategory === cat
                  ? 'bg-mc-emerald text-mc-dark font-bold shadow-glow-emerald'
                  : 'bg-mc-surface/70 text-mc-muted hover:text-white border border-mc-border/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`mc-panel overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-mc-emerald/60 bg-mc-surface/95' : 'hover:border-mc-border/90'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-mc-emerald shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-mc-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-mc-emerald' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-mc-muted leading-relaxed border-t border-mc-border/40 font-sans">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
