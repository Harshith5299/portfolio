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
            "Harshith Chittajallu is a Full Stack and Gen AI Developer with 8+ years in software engineering. "
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
        "id": "exp-ge-vernova",
        "title": "Application Developer, GE Vernova (Jul 2026 to present)",
        "section": "Experience",
        "text": (
            "Harshith's current role, since July 2026, is Application Developer at GE Vernova. "
            "He provides production support for GE Vernova's internal agentic AI platform, a productivity platform "
            "that hosts multiple AI services and APIs running on AWS Bedrock AgentCore."
        ),
    },
    {
        "id": "exp-wells-fargo",
        "title": "Full Stack Python AI Developer, Wells Fargo (Jan 2025 to Jun 2026)",
        "section": "Experience",
        "text": (
            "At Wells Fargo (January 2025 to June 2026, cybersecurity and identity and access governance) Harshith built "
            "IAM Remediation, an internal platform that helps managers review and revoke large volumes of user "
            "entitlements, reducing blanket approvals and improving audit readiness. He implemented LangGraph multi-step "
            "agents that generate natural-language entitlement summaries and recommend revocation actions, with FastAPI "
            "microservices and a React UI built on Google's Agent Development Kit (ADK)."
        ),
    },
    {
        "id": "exp-wells-fargo-platform",
        "title": "Wells Fargo: data, risk analytics and delivery",
        "section": "Experience",
        "text": (
            "Also at Wells Fargo, Harshith built Python scenario models and data pipelines for stress testing and what-if "
            "analysis on a Treasury and Risk analytics platform, stored entitlement data in MongoDB and PostgreSQL, and "
            "shipped services with Docker, HashiCorp Nomad, GitHub Actions and Jenkins, tested with Pytest and React "
            "Testing Library."
        ),
    },
    {
        "id": "exp-amazon",
        "title": "Full Stack Developer, Amazon (May 2022 to Dec 2024)",
        "section": "Experience",
        "text": (
            "At Amazon (May 2022 to December 2024, Amazon Photos, AI and fraud detection) Harshith developed FastAPI "
            "microservices on AWS Lambda and API Gateway, replaced Java backend logic with async Python services, "
            "integrated Amazon Rekognition and Hugging Face Transformers for image tagging and semantic photo search, "
            "rebuilt transaction validation as a Python fraud-detection pipeline on Kafka streams, and built "
            "LangChain and LangGraph document-classification workflows."
        ),
    },
    {
        "id": "exp-earlier",
        "title": "Earlier roles (2017 to 2022)",
        "section": "Experience",
        "text": (
            "Before Amazon, Harshith was a Full Stack Developer at Principal Healthcare (2022, FastAPI, React, GCP and GKE), "
            "a Python Full Stack Developer at Tango Analytics (2021, Flask, FastAPI, React, Kubernetes), a Python Backend "
            "Developer at AT&T (2020 to 2021, Flask and FastAPI APIs for a portfolio management platform), a Jr. Software "
            "Developer at L&T Infotech (2018 to 2019, Flask, Django, AWS S3, Jenkins, Terraform) and started his career "
            "as an Assistant Developer at Value Labs (2017 to 2018, Java, MySQL, JavaScript)."
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
