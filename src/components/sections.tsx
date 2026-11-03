import { availability, experienceNote, experiences, type Locale } from "@/lib/content";

export function Journey({ locale: l }: { locale: Locale }) {
  return (
    <>
      <div className="journey-note">
        <p>{availability(l)}</p>
        <p>{experienceNote(l)}</p>
      </div>
      <div className="journey-list">
        <div className="journey-track">
          <span className="journey-progress" />
        </div>
        {experiences.map((e, i) => (
          <article key={e.company.en} className="journey-item" data-reveal>
            <div className="journey-date">
              <span className="journey-dot" />
              <span className="mono">0{i + 1}</span>
              <p>{e.date[l]}</p>
            </div>
            <div>
              <h3>{e.company[l]}</h3>
              <span className="journey-role">{e.role[l]}</span>
              <p className="journey-mode">{e.mode[l]}</p>
            </div>
            <p className="journey-description">{e.description[l]}</p>
          </article>
        ))}
      </div>
    </>
  );
}
