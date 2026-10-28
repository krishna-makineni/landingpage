import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Steps } from './components/Steps';
import { Audience } from './components/Audience';
import { RegistrationCard } from './components/RegistrationCard';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { DemoInspector } from './components/DemoInspector';
import { getAttribution } from './lib/attribution';

export default function App() {
  const [currentVariant, setCurrentVariant] = useState('default');

  useEffect(() => {
    const attr = getAttribution();
    if (attr.variant) {
      setCurrentVariant(attr.variant);
    }
  }, []);

  const scrollToRegistration = () => {
    const el = document.getElementById('register');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Focus first input field for maximum usability
      setTimeout(() => {
        const input = document.getElementById('field-fullName');
        if (input) input.focus();
      }, 500);
    }
  };

  const scrollToExplore = () => {
    const el = document.getElementById('learn');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F7F9FC] font-sans antialiased selection:bg-[#C5F56A] selection:text-[#07111F] relative bg-tech-grid">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        onRegisterClick={scrollToRegistration}
        variantName={currentVariant}
      />

      {/* Main Content Flow */}
      <main>
        {/* Section 1: Hero */}
        <Hero
          onRegisterClick={scrollToRegistration}
          onExploreClick={scrollToExplore}
          variant={currentVariant}
        />

        {/* Section 2: Workshop Benefits */}
        <Benefits
          onRegisterClick={scrollToRegistration}
        />

        {/* Section 3: How It Works Timeline */}
        <Steps
          onRegisterClick={scrollToRegistration}
        />

        {/* Section 4: Target Audience */}
        <Audience />

        {/* Section 5: Primary Conversion Point — Registration Card */}
        <section className="py-20 sm:py-28 relative">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <RegistrationCard
              onRegistrationSuccess={() => {
                // Smooth scroll back to top of registration card if needed
                const el = document.getElementById('register');
                if (el) {
                  const yOffset = -90;
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            />
          </div>
        </section>

        {/* Section 6: FAQ Accordion */}
        <FAQ />

        {/* Section 7: Final Call to Action */}
        <FinalCTA
          onRegisterClick={scrollToRegistration}
        />
      </main>

      {/* Footer */}
      <Footer
        onRegisterClick={scrollToRegistration}
      />

      {/* Evaluator & Demo Inspector Drawer (LocalStorage data, attribution simulation & QR code) */}
      <DemoInspector
        currentVariant={currentVariant}
        onVariantChange={(v) => setCurrentVariant(v)}
      />

    </div>
  );
}
