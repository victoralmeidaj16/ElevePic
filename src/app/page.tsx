import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/Gallery";
import { ProfissionaisAutonomos } from "@/components/sections/ProfissionaisAutonomos";
import { Steps } from "@/components/sections/Steps";
import { UploadMockup } from "@/components/sections/UploadMockup";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { TransformationShowcase } from "@/components/sections/TransformationShowcase";

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <Hero />
            <Steps />
            <TransformationShowcase />
            <Gallery />
            <ProfissionaisAutonomos />
            <UploadMockup />
            <Benefits />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Footer />
        </main>
    );
}
