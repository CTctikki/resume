export const templateMetadata = {
  classic: {
    tags: ["ATS-friendly", "formal", "balanced"],
    idealFor: "General applications and conservative hiring flows",
    density: "Medium",
  },
  modern: {
    tags: ["two-column", "portfolio-ready", "compact"],
    idealFor: "Product, design, and engineering roles with denser content",
    density: "High",
  },
  leftRight: {
    tags: ["split-layout", "balanced", "content-dense"],
    idealFor: "People who want a structured two-zone layout with clear hierarchy",
    density: "High",
  },
  timeline: {
    tags: ["chronological", "experience-led", "formal"],
    idealFor: "Candidates with a clear linear work history",
    density: "Medium",
  },
  minimalist: {
    tags: ["ATS-friendly", "airy", "low-distraction"],
    idealFor: "Simple applications that benefit from a quiet, minimal layout",
    density: "Low",
  },
  elegant: {
    tags: ["polished", "editorial", "balanced"],
    idealFor: "Applicants who want a refined layout with softer visual structure",
    density: "Medium",
  },
  creative: {
    tags: ["expressive", "portfolio-ready", "bold"],
    idealFor: "Creative professionals who want a more distinctive presentation",
    density: "High",
  },
  editorial: {
    tags: ["story-led", "content-rich", "polished"],
    idealFor: "Candidates with layered experience and strong narrative sections",
    density: "High",
  },
} as const;
