import { SkillIcon } from "@/components/icons/SkillIcons";
import { skills } from "@/lib/content";

export const SkillsSection = () => (
  <section className="mx-auto w-full max-w-7xl px-5 pb-16 md:w-[60%] md:px-4">
    <h2 className="font-mono text-sm font-medium text-foreground-secondary">
      Skills
    </h2>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <span
          key={skill.slug}
          className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-muted px-2 py-1 text-xs text-foreground-secondary transition-colors hover:text-foreground"
        >
          <SkillIcon slug={skill.slug} size={12} />
          {skill.name}
        </span>
      ))}
    </div>
  </section>
);
