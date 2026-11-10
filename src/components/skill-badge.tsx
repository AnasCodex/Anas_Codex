import brandIcons from "@/data/brand-icons.json";
import { expertise, type BrandedSkill, type Locale } from "@/lib/content";

// Leave the same optical margin around the solid, square marks.
const solidMarks = new Set<BrandedSkill>([
  "CSS",
  "JavaScript",
  "TypeScript",
  "Adobe Photoshop",
  "npm",
]);

export function SkillGroups({ locale }: { locale: Locale }) {
  return (
    <div className="skill-groups">
      {expertise.map(({ n, name, tools }) => (
        <div className="skill-group" key={n}>
          <h3>{name[locale]}</h3>
          <ul className="skill-grid" role="list">
            {tools.map((tool) => {
              const brand = brandIcons[tool];
              const label = locale === "ar" && tool === "Zid" ? "زد" : tool;
              return (
                <li className="skill-badge" key={tool}>
                  <span className="skill-badge-icon">
                    {"image" in brand ? (
                      <img
                        src={brand.image}
                        width="20"
                        height="20"
                        alt=""
                        data-brand={brand.slug}
                      />
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox={solidMarks.has(tool) ? "-1.33 -1.33 26.66 26.66" : brand.viewBox}
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                        data-brand={brand.slug}
                      >
                        {brand.paths.map((path, index) => (
                          <path key={index} d={path} />
                        ))}
                      </svg>
                    )}
                  </span>
                  <bdi>{label}</bdi>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
