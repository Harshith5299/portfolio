export const AboutMeContent = {
    title: "A Personal and Professional Overview",
    shortBio:
      "I’m a Full-Stack Software Engineer who pivoted into Python, Data Engineering, and AI-driven applications in the middle of my career. I build scalable backend services, modern web UIs, and data pipelines that help teams make faster, safer decisions—especially in banking and enterprise environments.",

    skills: [
      {
        category: "Backend & APIs",
        items: ["Python (FastAPI)", "REST APIs", "SQLAlchemy", "Microservices", "Async Processing"],
      },
      {
        category: "AI & Agentic Systems",
        items: ["LangGraph", "ADK integration", "LLM-driven summarization", "Tool orchestration patterns", "Evaluation & observability"],
      },
      {
        category: "Data Engineering",
        items: ["PySpark", "AWS Glue", "S3 lifecycle/retention", "ETL orchestration", "SQL optimization"],
      },
      {
        category: "Cloud & DevOps",
        items: ["AWS (Lambda, S3, IAM)", "Docker", "Kubernetes/OpenShift", "CI/CD (Jenkins, GitHub Actions)", "Monitoring (CloudWatch)"],
      },
      {
        category: "Frontend",
        items: ["React", "TypeScript", "State management", "Component-driven UI", "UX for decision workflows"],
      },
      {
        category: "Also Experienced With",
        items: ["Java (2–4 years)", "Spring Boot (legacy + integrations)", "Kafka", "MongoDB", "PostgreSQL"],
      },
    ],

    detailedBackground: [
      "Over the past several years, I’ve worked on large-scale enterprise systems where reliability, auditability, and speed matter. My earlier experience included Java-based microservices, and I gradually transitioned toward Python-first systems for data processing, AI automation, and modern API development.",
      "Most recently, I’ve been building cybersecurity-focused applications in the banking domain, where the goal is to reduce manual review work and improve governance through contextual insights and AI-assisted decisioning. I enjoy designing clean service boundaries, building AI automation agents that scale, and shipping interfaces that make complex workflows easy for end users.",
      "I’m comfortable operating in fast-paced teams, collaborating across product/security/data stakeholders, and delivering production-grade solutions with strong testing and CI/CD practices.",
    ],

    highlights: [
      "Python-first backend development with real-world ETL and lifecycle workflows",
      "Agentic AI integrations (LangGraph + UI integration patterns)",
      "Banking domain experience (risk-aware workflows, audit readiness, governance)",
      "Strong foundation in scalable systems, cloud deployment, and modern frontend delivery",
    ],
  };

export function AboutMeSection() {
  return (
    <div className="profile-container">
      <p>{AboutMeContent.title}</p>

      <p>{AboutMeContent.shortBio}</p>

      {AboutMeContent.detailedBackground.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
        {AboutMeContent.skills.map((skillGroup, index) => (
    <p key={index}>
      <strong>{skillGroup.category}:</strong>{" "}
      {skillGroup.items.join(", ")}
    </p>
  ))}
    </div>
  );
}