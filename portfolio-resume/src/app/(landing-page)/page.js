import ProjectSection from "./components/ProjectSection";
import Link from "next/link";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-br from-white to-primary-50 border border-gray-200 shadow-lg rounded-lg overflow-hidden">
      <div className="container mx-auto p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <HeroSection />
        <ProjectSection />
      </div>
    </div>
  );
}
