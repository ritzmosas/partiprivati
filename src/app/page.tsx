"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadYamlData, type BandInfo } from "@/lib/yaml-loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  const [bandInfo, setBandInfo] = useState<BandInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    loadYamlData<BandInfo>("about.yml")
      .then(setBandInfo)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="typewriter text-large">Loading...</div>
      </div>
    );
  }

  if (!bandInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-large">
          Failed to load band information
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <Navigation />

      {/* Main Content */}
      <main>
        <div className="flex flex-col items-center my-16">
          <div className="relative w-full max-w-[800px]">
            <div className=" ml-[-8px]">
              <Image
                src="/Wortmarke-6.svg"
                alt="Logo"
                width={800}
                height={400}
                className="transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center my-16">
          <div className="relative w-full max-w-[800px]">
            <div className=" ml-[-8px]">
              <Image
                src="/band.png"
                alt="Logo"
                width={800}
                height={400}
                className="transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Description - Centered */}
        <div className="space-huge">
          <div className="max-w-[500px] mx-auto">
            <p className="text-medium md:text-large leading-relaxed">
              {bandInfo.description.split("\n\n")[0]}
            </p>
          </div>
        </div>

        {/* Info centered */}
        <div className="space-huge">
          <div className="position-center space-large">
            <div className="text-small typewriter">Gegründet</div>
            <div className="text-huge md:text-huge text-large text-[var(--accent-yellow)]">
              {bandInfo.formation}
            </div>
          </div>

          <div className="position-center space-large">
            <div className="text-large md:text-large text-medium">
              {bandInfo.location}
            </div>
          </div>

          <div className="position-center space-large">
            <div className="text-medium md:text-medium text-small text-[var(--accent)]">
              {bandInfo.genre}
            </div>
          </div>
        </div>

        {/* Contact - Big block center */}
        <div className="space-huge paper-bg p-8">
          <h2 className="text-huge md:text-huge text-large mb-8 position-center">
            Kontakt
          </h2>
          <div className="space-medium">
            <div className="position-center">
              <span className="text-large md:text-large text-medium typewriter text-[var(--accent-yellow)]">
                Email:
              </span>
              <br />
              <a
                href={`mailto:${bandInfo.contact.email}`}
                className="text-medium md:text-medium text-small text-[var(--accent)] hover:underline"
              >
                {bandInfo.contact.email}
              </a>
            </div>
            <div className="position-center space-medium">
              <span className="text-large md:text-large text-medium typewriter text-[var(--accent-yellow)]">
                Instagram:
              </span>
              <br />
              <a
                href={`https://instagram.com/${bandInfo.contact.instagram.replace(
                  "@",
                  ""
                )}`}
                className="text-medium md:text-medium text-small text-[var(--accent)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {bandInfo.contact.instagram}
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action - Centered */}
        <div className="space-huge">
          <div className="position-center">
            <Link
              href="/events"
              className="indie-btn text-large md:text-large text-medium bg-[var(--accent-yellow)] text-black border-black hover:bg-[var(--accent)] hover:text-white"
            >
              Tourdaten
            </Link>
          </div>
          <div className="position-center space-medium">
            <Link
              href="/releases"
              className="indie-btn text-large md:text-large text-medium bg-[var(--accent-yellow)] text-black border-black hover:bg-[var(--accent)] hover:text-white"
            >
              Releases
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
