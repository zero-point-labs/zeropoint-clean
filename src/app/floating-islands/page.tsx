import FloatingIslands from '@/components/sections/FloatingIslands';
import PricingSection from '@/components/sections/PricingSection';
import ChatSection from '@/components/sections/ChatSection';

export default function FloatingIslandsPage() {
  return (
    <div className="relative">
      {/* Top Section - Pricing */}
      <section className="relative z-30">
        <PricingSection />
      </section>
      
      {/* Main Floating Islands Experience */}
      <section className="relative z-20">
        <FloatingIslands />
      </section>
      
      {/* Bottom Section - AI Chat */}
      <section className="relative z-30 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a1f]">
        <ChatSection />
      </section>
    </div>
  );
}
