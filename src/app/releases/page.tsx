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
              <div
                className={`mx-auto md:${
                  index % 2 === 0 ? "text-block-left" : "text-block-right"
                }`}
              >
                <div className="release-card max-w-4xl mx-auto">
                  {/* Album Art Placeholder
                  <div
                    className={`mx-auto md:mx-0 md:${
                      index % 2 === 0 ? "float-left" : "float-right"
                    } w-60 h-60 paper-bg rough-border flex items-center justify-center mb-6`}
                  >
                    <span className="text-[var(--muted)] typewriter text-center text-small md:text-small text-tiny">
                      [{release.title}
                      <br />
                      Cover Art]
                    </span>
                  

                  {/* Release Info */}
                  
                    <iframe
                      src={release.embedLink}
                      className="w-full h-100"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  
                        <div className="space-medium">
                        <div className="mb-6">
                          {/<h2 className="text-large md:text-medium text-medium font-bold text-[var(--accent)] mb-2">
                            {release.title}
                          </h2>
                          <span className="px-4 py-2 bg-[var(--muted)] text-white text-medium md:text-medium text-small typewriter rounded inline-block">
                            {release.type}
                          </span>
                          <h2 className="text-medium md:text-sm text-[var(--accent-yellow)] mb-2 p-4">
                            {release.releaseDate}
                          </h2>
                          <div className="text-large md:text-large text-medium leading-relaxed handwritten mb-6">
                            {release.description
                              .split("\n")
                              .map((line, lineIndex) => (
                                <p key={lineIndex} className="mb-4">
                                  {line}
                                </p>
                              ))}
                          </div>
                        </div>}

                    {/* Links
                    {(release.links.bandcamp || release.links.spotify) && (
                      <div className="mb-8 space-small">
                        {release.links.bandcamp && (
                          <a
                            href={release.links.bandcamp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="indie-btn text-medium md:text-medium text-small mr-4"
                          >
                            Bandcamp
                          </a>
                        )}
                        {release.links.spotify && (
                          <a
                            href={release.links.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="indie-btn text-medium md:text-medium text-small"
                          >
                            Spotify
                          </a>
                        )}
                      </div>
                    )} */}

                    {/* Tracklist
                    <div className="clear-both">
                      <h3 className="text-large md:text-large text-medium font-bold mb-4 text-[var(--accent-yellow)]">
                        Tracklist
                      </h3>
                      <ol className="space-small">
                        {release.tracklist.map((track, trackIndex) => (
                          <li
                            key={trackIndex}
                            className="typewriter flex text-small sm:text-large md:text-large mb-2"
                          >
                            <span className="text-[var(--muted)] mr-4 min-w-[3rem]">
                              {trackIndex + 1}.
                            </span>
                            <span>{track}</span>
                          </li>
                        ))}
                      </ol>
                    </div> */}
                  </div>
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
                We're still figuring out how to record things properly.
                <br />
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
