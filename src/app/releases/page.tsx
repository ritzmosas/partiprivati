"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadYamlData, type ReleasesData } from "@/lib/yaml-loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ReleasesPage() {
  const [releasesData, setReleasesData] = useState<ReleasesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadYamlData<ReleasesData>("releases.yml")
      .then(setReleasesData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="typewriter text-large md:text-large text-medium">
          Loading discography...
        </div>
      </div>
    );
  }

  if (!releasesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-large md:text-large text-medium">
          Failed to load releases
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <Navigation />

      {/* Header - Dramatic and Split */}
      <header className="space-medium">
        <div className="position-center md:position-left">
          <h1 className="text-massive md:text-massive text-huge font-bold text-[var(--accent-yellow)]">
            Releases
          </h1>
        </div>
      </header>

      <main>
        {/* Releases - Varied layouts */}
        <div className="space-medium">
          {releasesData.releases.map((release, index) => (
            <div key={index} className="space-huge">
              {/* Full width on mobile, alternate between left and right layouts on desktop */}
              <div className={`mx-auto md:${index % 2 === 0 ? "text-block-left" : "text-block-right"}`}>
                <div className="release-card max-w-4xl mx-auto">
                  
                  {/* Nur der eingebettete Spotify-Link bleibt aktiv */}
                  <iframe
                    src={release.embedLink}
                    className="w-full h-100"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />

                  {/* Die restlichen Zusatzinfos (Titel, Beschreibung, Links, Tracklist) 
                    wurden hier komplett deaktiviert.
                  */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Releases Message */}
        {releasesData.releases.length === 0 && (
          <div className="text-block-center space-huge">
            <div className="paper-bg p-12">
              <h2 className="text-huge md:text-huge text-large mb-8">
                No Releases Yet
              </h2>
              <p className="text-medium md:text-medium text-small text-[var(--muted)] mb-8 handwritten">
                We're still figuring out how to record things properly. <br />
                Check back soon for some extremely lo-fi indie goodness!
              </p>
              <Link
                href="/"
                className="indie-btn text-large md:text-large text-medium"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
