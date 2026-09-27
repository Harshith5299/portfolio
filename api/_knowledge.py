"""Knowledge base for the "Ask My Portfolio" RAG assistant (api/ask.py).

Every passage restates something already published on harshithportfolio.com
(About, Experience, Skills, Projects, Learning). When the site content changes,
update the matching passage here so the assistant never says anything the site
doesn't. Files starting with "_" are not deployed as endpoints by Vercel.
"""

PASSAGES = [
    {
        "id": "about-summary",
        "title": "Who Harshith is",
        "section": "About",
        "text": (
            "Harshith Chittajallu is a Full Stack and Gen AI Developer with 5+ years in software engineering. "
            "He pivoted into Python, data engineering and AI-driven applications mid-career, and builds scalable "
            "backend services, modern web UIs and data pipelines that help teams make faster, safer decisions, "
            "especially in banking and enterprise environments."
        ),
    },
    {
        "id": "about-current-focus",
        "title": "Current focus",
        "section": "About",
        "text": (
            "Most recently Harshith has been building cybersecurity-focused applications in the banking domain, "
            "reducing manual review work through contextual insights and AI-assisted decisioning. He has worked on "
            "large-scale enterprise systems where reliability, auditability and speed matter."
        ),
    },
    {
        "id": "about-ways-of-working",
        "title": "How he works",
        "section": "About",
        "text": (
            "Harshith is comfortable in fast-paced teams, collaborates across product, security and data stakeholders, "
            "and delivers production-grade solutions with strong testing and CI/CD practices. He is open to new "
            "opportunities and can be reached through the contact form on harshithportfolio.com or on LinkedIn "
            "at linkedin.com/in/harshith-ch."
        ),
    },
    {
        "id": "exp-senior",
        "title": "Senior Software Engineer, Financial Services Firm (2022 to present)",
        "section": "Experience",
        "text": (
            "As Senior Software Engineer at a financial services firm (2022 to present, cybersecurity and banking), "
            "Harshith built AI-driven decisioning tools using LangGraph and ADK, reducing manual security review "
            "workload by 60%. He designed LLM-assisted summarisation pipelines for cybersecurity alerts in a "
            "high-governance banking environment."
        ),
    },
    {
        "id": "exp-senior-platform",
        "title": "Senior Software Engineer: platform and delivery",
        "section": "Experience",
        "text": (
            "In the same senior role he architected FastAPI microservices with async processing, PostgreSQL and "
            "AWS Lambda for real-time risk workflows, led cross-functional collaboration between product, security "
            "and data stakeholders to ship audit-ready features, and established CI/CD with GitHub Actions and "
            "CloudWatch monitoring. Stack: Python, FastAPI, LangGraph, ADK, AWS, PostgreSQL, Docker."
        ),
    },
    {
        "id": "exp-swe",
        "title": "Software Engineer, Enterprise Technology Solutions (2019 to 2022)",
        "section": "Experience",
        "text": (
            "As Software Engineer (2019 to 2022, enterprise systems and data engineering) Harshith developed Java and "
            "Spring Boot microservices for high-throughput transaction processing, led a phased migration of legacy "
            "data workflows to Python ETL pipelines on PySpark and AWS Glue, built Kafka event streaming for real-time "
            "ingestion, and delivered SQL optimisations that cut query latency by 40%. He also introduced Docker and "
            "Jenkins CI pipelines for the team."
        ),
    },
    {
        "id": "exp-junior",
        "title": "Junior Software Developer, Software Consultancy (2017 to 2019)",
        "section": "Experience",
        "text": (
            "As Junior Software Developer (2017 to 2019, full stack) Harshith built REST APIs with Java and Spring Boot "
            "for client-facing enterprise portals, developed React and TypeScript frontend features for internal "
            "dashboards, and worked in an Agile team with sprint planning, code reviews and retrospectives."
        ),
    },
    {
        "id": "skills-ai",
        "title": "AI and agentic systems skills",
        "section": "Skills",
        "text": (
            "AI and agentic systems: LangGraph, ADK integration, LLM orchestration, tool-calling patterns, evaluation, "
            "observability and RAG pipelines. This assistant is itself a RAG pipeline: keyword retrieval with BM25 "
            "over the portfolio, then grounded generation with Claude and cited sources."
        ),
    },
    {
        "id": "skills-backend",
        "title": "Backend and API skills",
        "section": "Skills",
        "text": (
            "Backend and APIs: Python, FastAPI, REST APIs, SQLAlchemy, microservices, async processing and Pydantic. "
            "Also experienced with Java, Spring Boot, Kafka, MongoDB, PostgreSQL, Redis and GraphQL."
        ),
    },
    {
        "id": "skills-data-cloud",
        "title": "Data engineering and cloud skills",
        "section": "Skills",
        "text": (
            "Data engineering: PySpark, AWS Glue, ETL orchestration, S3 lifecycle, SQL optimisation and data pipelines. "
            "Cloud and DevOps: AWS (Lambda, S3, IAM), Docker, Kubernetes, OpenShift, GitHub Actions, Jenkins and CloudWatch."
        ),
    },
    {
        "id": "skills-frontend",
        "title": "Frontend skills",
        "section": "Skills",
        "text": (
            "Frontend: React, TypeScript, Vite, state management, CSS and SCSS, component design and UX patterns."
        ),
    },
    {
        "id": "proj-event-syncer",
        "title": "Event Syncer",
        "section": "Projects",
        "text": (
            "Event Syncer is a Python FastAPI and React service that reconciles CRM and calendar data: it normalises "
            "records from two sources, scores cross-source matches, surfaces conflicts and flags data-quality issues "
            "in a filterable React dashboard. Source: github.com/Harshith5299/event_syncer."
        ),
    },
    {
        "id": "proj-spring-bank",
        "title": "Spring Bank",
        "section": "Projects",
        "text": (
            "Spring Bank is a full-stack banking application Harshith hand-coded: a Spring Boot REST API on MySQL with "
            "a React frontend supporting account creation, balance enquiries, fund transfers and full transaction "
            "history. Source: github.com/Harshith5299/spring-bank."
        ),
    },
    {
        "id": "proj-portfolio",
        "title": "This portfolio",
        "section": "Projects",
        "text": (
            "The portfolio site is React 19 and TypeScript on Vite, with Python serverless functions, deployed on "
            "Vercel with GitHub Actions CI, Trivy and SonarCloud scanning. It is built with AI coding agents that open "
            "pull requests and fix CI, and the source is public at github.com/Harshith5299/portfolio."
        ),
    },
    {
        "id": "proj-in-dev",
        "title": "Projects in development",
        "section": "Projects",
        "text": (
            "Projects in development include a Cybersecurity Analytics Dashboard (agentic AI risk insights with "
            "LangGraph, ADK and FastAPI), a ServiceNow and Azure DevOps integration hub with AI-generated status "
            "summaries, an ML application platform, and Netflix and YouTube clones."
        ),
    },
    {
        "id": "learning",
        "title": "Learning plan",
        "section": "Learning",
        "text": (
            "Planned learning: Generative AI and LLM Engineering (DeepLearning.AI), Databricks Data Engineering, "
            "AWS Solutions Architect certification and the Machine Learning Specialisation (Stanford Online)."
        ),
    },
]
