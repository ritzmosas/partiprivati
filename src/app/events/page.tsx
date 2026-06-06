"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadYamlData, type EventsData } from "@/lib/yaml-loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function EventsPage() {
  const [eventsData, setEventsData] = useState<EventsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadYamlData<EventsData>("events.yml")
      .then(setEventsData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    // Support bare "YYYY-MM-DD" reliably (avoid inconsistent Date parsing)
    const ymd = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = dateString.match(ymd);
    let date: Date;

    if (match) {
      const [, year, month, day] = match;
      date = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      date = new Date(dateString);
    }

    if (Number.isNaN(date.getTime())) {
      return dateString; // fallback to original string on invalid date
    }

    return date.toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="typewriter text-large">Konzerte werden geladen...</div>
      </div>
    );
  }

  if (!eventsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-large">
          Fehler beim Laden der Konzerte
        </div>
      </div>
    );
  }

  const upcomingEvents = eventsData.events.filter((event) =>
    isUpcoming(event.date)
  );
  const pastEvents = eventsData.events.filter(
    (event) => !isUpcoming(event.date)
  );

  return (
    <div className="min-h-screen p-6">
      <Navigation />

      {/* Header - Dramatic and Split */}
      <header className="space-medium">
        <div className="position-left">
          <h1 className="text-massive font-bold text-[var(--accent)]">
            Konzerte
          </h1>
        </div>
      </header>

      <main>
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section>
            <div className="space-large flex flex-col items-center">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="space-large w-full max-w-lg">
                  <div className="event-card">
                    <div className="space-small">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-large font-bold text-[var(--accent)]">
                          {event.city}
                        </h3>
                      </div>
                      <p className="text-medium text-[var(--muted)] typewriter mb-4">
                        {formatDate(event.date)}
                      </p>
                      <p className="text-small typewriter mb-2">
                        {event.time} • {event.venue}
                      </p>
                      <p className="text-medium mb-3 handwritten">
                        {event.description}
                      </p>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-light">
                          {event.price}
                        </span>
                        {event.ticketLink && (
                          <a
                            href={event.ticketLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="indie-btn text-medium bg-[var(--accent-yellow)] text-black border-black hover:bg-[var(--accent)] hover:text-white"
                          >
                            Tickets kaufen
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {/* {pastEvents.length > 0 && (
          <section className="space-huge">
            <div className="position-center space-large">
              <h2 className="text-huge">Vergangene Konzerte</h2>
            </div>
            <div className="position-center space-medium">
              <p className="text-medium text-[var(--muted)] handwritten">
                Danke an alle, die bei diesen Konzerten dabei waren!
              </p>
            </div>
            <div className="space-large flex flex-col items-center">
              {pastEvents.map((event, index) => (
                <div key={index} className="space-medium w-full max-w-md">
                  <div className="event-card opacity-75">
                    <h3 className="text-medium font-bold text-[var(--muted)]">
                      {event.venue} • {event.city}
                    </h3>
                    <p className="text-small text-[var(--muted)] typewriter">
                      {formatDate(event.date)}
                    </p>
                    <p className="text-small mt-2 handwritten">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )} */}

        {/* No Events Message */}
        {eventsData.events.length === 0 && (
          <div className="text-block-center space-huge">
            <div className="paper-bg p-12">
              <h2 className="text-huge mb-8">Keine Konzerte geplant</h2>
              <p className="text-medium text-[var(--muted)] mb-8 handwritten">
                Wir sind wahrscheinlich im Proberaum und arbeiten an neuen
                Songs.
                <br />
                Schaut bald wieder vorbei oder folgt uns für Updates!
              </p>
              <Link href="/" className="indie-btn text-large">
                Zurück zur Startseite
              </Link>
            </div>
          </div>
        )}

        {/* Booking Info - Full width dramatic */}
        <div className="space-huge">
          <div className="text-block-wide paper-bg p-12">
            <div className="position-center space-large">
              <h2 className="text-huge mb-8">Wollt ihr uns buchen?</h2>
            </div>
            <div className="position-center">
              <a
                href="mailto:info@partiprivati-band.de"
                className="indie-btn text-large bg-[var(--accent-yellow)] text-black border-black hover:bg-[var(--accent)] hover:text-white"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
