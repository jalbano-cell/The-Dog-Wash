import Image from "next/image";
import { Award } from "lucide-react";
import { team } from "@/data/team";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

function initials(name: string) {
  const clean = name.replace(/\[[^\]]*\]/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function Team() {
  const founder = team.find((m) => m.isFounder) ?? team[0];
  const others = team.filter((m) => m !== founder);

  return (
    <section id="team" data-reveal className="bg-cream py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Team"
          title="Meet Angela & the team"
          description="The friendly, certified hands your dog is in — the people dog parents trust visit after visit."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          {/* Founder card */}
          <div className="flex flex-col gap-6 rounded-3xl border border-sand-dark/70 bg-white p-6 shadow-sm sm:flex-row sm:p-8">
            <div className="relative mx-auto aspect-square w-40 shrink-0 overflow-hidden rounded-2xl ring-1 ring-stone-800/5 sm:mx-0">
              {founder.image ? (
                <Image
                  src={`/images/${founder.image}`}
                  alt={founder.imageAlt ?? founder.name}
                  fill
                  loading="lazy"
                  sizes="160px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary-100 font-display text-3xl font-extrabold text-primary-600">
                  {initials(founder.name)}
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-600">
                <Award size={13} />
                Founder
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-stone-800">{founder.name}</h3>
              <p className="text-sm font-semibold text-primary-600">{founder.role}</p>
              {founder.bio ? (
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{founder.bio}</p>
              ) : null}
            </div>
          </div>

          {/* Supporting team members */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {others.map((member) => (
              <div
                key={member.name + member.role}
                className="flex flex-col items-center rounded-3xl border border-sand-dark/70 bg-white p-6 text-center shadow-sm"
              >
                <div className="relative mb-4 aspect-square w-20 overflow-hidden rounded-full ring-1 ring-stone-800/5">
                  {member.image ? (
                    <Image
                      src={`/images/${member.image}`}
                      alt={member.imageAlt ?? member.name}
                      fill
                      loading="lazy"
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-accent-500/15 font-display text-lg font-extrabold text-accent-600">
                      {initials(member.name)}
                    </div>
                  )}
                </div>
                <h3 className="font-display text-base font-extrabold text-stone-800">{member.name}</h3>
                <p className="text-xs font-semibold text-primary-600">{member.role}</p>
                {member.bio ? <p className="mt-2 text-xs leading-relaxed text-stone-600">{member.bio}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
