// All content data for the portfolio
// Centralized so editing copy doesn't require touching component files

import { assetPath } from "./site";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  link: string;
  category: string;
  demoUrl?: string;
}

export interface CaseStudy {
  slug: string; // matches Project.id
  title: string;
  tagline: string;
  youtubeId: string;
  github: string;
  demoUrl?: string;
  overview: string;
  highlights: { value: string; label: string }[];
  sections: { heading: string; body: string[] }[];
  architecture?: {
    agent: string;
    agentNote?: string;
    stages: { name: string; detail: string }[];
    note?: string;
  };
  stack: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  achievements: string[];
}

export interface WritingLink {
  title: string;
  url: string;
  excerpt?: string;
  featured?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export const projects: Project[] = [
  {
    id: "pallet",
    name: "Pallet",
    tagline: "Forecasts demand and plans inventory, with an AI agent that runs the numbers",
    description:
      "A retail demand and inventory system on the M5 Walmart dataset (~21M daily sales rows). A LightGBM model forecasts how much each product will sell, a set of inventory rules turns that into when and how much to reorder, and a day-by-day simulation tests how those rules would have performed. On top sits an AI agent that does the work with you: it runs the forecasts, tries what-if scenarios, compares options, and pulls real figures from the sales data, and it checks every number it reports against an actual calculation, so it never makes figures up.",
    tags: ["AI Agents", "LangGraph", "LightGBM", "Time series forecasting", "Gemini", "FastAPI", "DuckDB", "MLflow", "Langfuse", "Next.js"],
    link: "https://github.com/MelakuAlehegn/inventory-copilot",
    category: "AI / Agentic · ML · Full Stack",
  },
  {
    id: "project-chimera",
    name: "Chimera",
    tagline: "Autonomous AI influencer agent in Java 21",
    description:
      "Manager / Worker / Judge agent architecture with LLM-backed reasoning (Gemini), event-sourced memory in PostgreSQL, a custom Model Context Protocol client, and autonomous Bluesky publishing. End-to-end production-grade agentic AI architecture, built from scratch.",
    tags: ["Java 21", "Gemini", "PostgreSQL", "MCP", "LLM", "AI Agents", "Multi-Agent Systems"],
    link: "https://github.com/MelakuAlehegn/project-chimera",
    category: "AI / Agentic",
  },
  {
    id: "verba",
    name: "Verba",
    tagline: "Full-stack RAG application for document Q&A",
    description:
      "Multi-tenant Retrieval-Augmented Generation app, built backend-first. Documents are parsed, chunked, and embedded into the Qdrant vector store by an async Celery worker; questions are answered only from a user's own files — refusing to guess below a relevance threshold — with citations linking back to the exact source passages. Answers stream token-by-token over Server-Sent Events. Strict route → service → crud layering on FastAPI, with Postgres as the source of truth and the vector store as a rebuildable index.",
    tags: ["FastAPI", "Qdrant", "RAG", "Celery", "Gemini", "React"],
    link: "https://github.com/MelakuAlehegn/verba",
    category: "Full Stack · AI / Agentic",
  },
  {
    id: "data-warehouse",
    name: "Data Warehouse",
    "tagline": "Builds an analytics warehouse from pNEUMA drone telemetry",
    "description": "The pNEUMA dataset captures roughly half a million vehicle trajectories from drone swarms over downtown Athens, stored as irregular-width CSV that breaks vanilla pandas. This project lands the data in Postgres via Airflow, transforms it into a star schema with dbt, and exposes the result as Metabase dashboards — all dockerised, with Cosmos rendering each dbt model as its own Airflow task and Elementary tracking run history. Tests gate downstream models, so a failing assertion stops the pipeline before bad data reaches the dashboards.",
    "tags": ["Airflow", "dbt", "PostgreSQL", "Docker", "Metabase"],
    "category": "Data Engineering",
    "link": "https://github.com/MelakuAlehegn/pneuma-data-warehouse"
  },
  {
  id: "nl-to-sql",
  name: "Natural Language to SQL",
  tagline: "LLM-based tool for querying databases",
  description:
    "Translates natural-language questions into safe, read-only SQL with Gemini, executes them live against PostgreSQL, and returns results, a plain-English explanation, and an auto-inferred chart. A self-correcting loop feeds execution errors back to the model to repair its own queries, and defense-in-depth (keyword screening, EXPLAIN pre-flight, a least-privilege read-only role) keeps generation safe. Backed by an execution-accuracy eval harness, a pytest suite, and GitHub Actions CI.",
  tags: ["FastAPI", "Gemini", "PostgreSQL", "Next.js", "Docker"],
  link: "https://github.com/MelakuAlehegn/natural-language-to-sql",
  category: "Full Stack · AI / Agentic",
},
  {
    id: "telecom-analysis",
    name: "Telecom User Analysis",
    tagline: "Engagement & growth analytics for a telecom",
    description:
      "Data analysis and dashboard project evaluating business growth opportunities in the telecommunications industry. Focuses on user engagement and satisfaction, with end-to-end exploratory analysis through to interactive visualization.",
    tags: ["Python", "Pandas", "Streamlit", "Analytics"],
    link: "https://github.com/MelakuAlehegn/TelecomUserAnalysis",
    category: "Data Science"

  },
];

export const caseStudies: Record<string, CaseStudy> = {
  pallet: {
    slug: "pallet",
    title: "Pallet",
    tagline: "Forecasts demand and plans inventory, with an AI agent that runs the numbers",
    youtubeId: "0vwCXfhoAFs",
    github: "https://github.com/MelakuAlehegn/inventory-copilot",
    demoUrl: "https://www.youtube.com/watch?v=0vwCXfhoAFs",
    overview:
      "Pallet helps a retail planner answer a hard daily question: how much of each product to stock. It is built on the M5 Walmart dataset, about 21 million daily sales rows. A machine-learning model forecasts how much each product will sell, a set of inventory rules turns that forecast into concrete numbers (when to reorder, how much buffer to hold, how much to order), and a day-by-day simulation shows how those numbers would have played out. On top sits an AI agent that does the work with you: it runs the forecast, tries what-if scenarios, compares the options side by side, and checks every number it reports against a real calculation before you see it.",
    highlights: [
      { value: "+19.6%", label: "more accurate demand forecasts than the standard baseline" },
      { value: "93.2%", label: "of demand met from stock, up from 92.3%" },
      { value: "-12.4%", label: "lower cost from lost sales than the standard policy" },
      { value: "~21M", label: "daily sales rows analyzed" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Stores lose money in two opposite ways. Order too much and cash sits frozen in stock that lingers on the shelf. Order too little and products run out, so customers leave and the sale is gone for good.",
          "Finding the right amount for every product is hard. You first need a good guess of future demand, then rules for how much stock to keep on hand, and a way to test those rules before betting real money on them. Pallet ties that whole chain together so the decision is easier and safer to make.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "Pallet works in three steps. First, a LightGBM model, trained on years of daily sales together with prices and calendar events like holidays and promotions, forecasts future demand. It predicts a range rather than a single number, so we see both the likely demand and the busy-day highs worth preparing for.",
          "Second, that forecast feeds a set of inventory rules that calculate the three numbers a planner actually acts on: the reorder point (the stock level that triggers a new order), the safety stock (a buffer for demand that runs higher than expected), and the order-up-to level (how far to top stock back up).",
          "Third, a simulation replays those rules day by day against real history to show how they would have performed on service and cost. The same inputs always produce the same numbers, so the output is something a planner can check and trust rather than a black box.",
        ],
      },
      {
        heading: "The AI agent",
        body: [
          "The forecasting and inventory math is powerful but not easy to drive by hand. The agent makes it usable: you ask a question in plain English and it does the work. It runs the forecast, changes an assumption and re-runs a what-if, compares two stocking policies side by side, and pulls real figures straight from the sales data to back up an answer. It is a hands-on assistant that executes and compares, not just one that talks.",
          "It also has a strict rule that makes it safe to rely on. Before any answer reaches you, every number in it is matched against the actual calculation that produced it. If a figure was not computed by a real tool, the answer is thrown out, so the agent cannot invent numbers. For questions about past sales it uses a look-only connection to the data that can read but never change anything.",
        ],
      },
      {
        heading: "Results",
        body: [
          "The forecast is 19.6% more accurate than the standard baseline most teams start from. Feeding that better forecast into the inventory rules lifts the share of demand met from stock to 93.2% (from 92.3%) while cutting the cost of lost sales by 12.4%.",
          "And because every number the agent reports is tied back to a real calculation, the explanations you read are backed by the same math that drives the decisions.",
        ],
      },
      {
        heading: "Engineering",
        body: [
          "The backend is FastAPI with async Postgres for app state and DuckDB over Parquet for fast analytical queries. The frontend is Next.js. MLflow tracks every training run and keeps the trained forecasting model in a registry, and Langfuse records each agent run so its steps can be inspected.",
          "The whole system is Dockerized and gated by CI that runs the test suite plus ruff and strict mypy, so the code stays clean as it grows.",
        ],
      },
    ],
    architecture: {
      agent: "AI agent",
      agentNote:
        "Takes a plain-English question, runs the right steps, compares the options, and verifies the numbers.",
      stages: [
        { name: "Data", detail: "Daily sales, prices, and calendar events" },
        { name: "Forecast", detail: "LightGBM predicts a range of demand" },
        { name: "Inventory rules", detail: "Reorder point, safety stock, order-up-to level" },
        { name: "Simulation", detail: "Replays the rules to measure service level and cost" },
      ],
      note: "verifies every number in an answer against the calculation that produced it, before you see it.",
    },
    stack: [
      "LangGraph",
      "Gemini",
      "LightGBM",
      "Polars",
      "DuckDB",
      "FastAPI",
      "Postgres",
      "MLflow",
      "Langfuse",
      "Next.js",
      "Docker",
    ],
  },
};

export const projectCategories = [
  "All",
  "AI / Agentic",
  "ML",
  "Data Engineering",
  "Data Science",
  "Full Stack",
];

export const experience: Experience[] = [
  {
    id: "wickedanalytics",
    company: "WickedAnalytics",
    role: "Machine Learning / Data Engineer",
    dates: "Jan 2026 — Present",
    location: "Remote",
    achievements: [
      "Built and maintained Airflow ingestion pipelines across the company's multi-client retail-analytics platform, loading supplier data into Snowflake through Azure Blob staging, headless xlsx repair, pandas-based transformation, and templated COPY INTO operations.",
      "Built and refactored dbt models across 11 client deployments, implementing incremental deduplication with natural-key merges and correcting data grain for vendors with one-to-many product hierarchies.",
      "Replaced the manual demand-planning methodology with an automated Snowflake data layer and an internal web tool for demand planners, surfacing forecast, supply, and inventory data directly through the application and removing the prior Excel-driven method.",
      "Built the Snowflake-Based ML forecast pipeline producing per-client weekly demand forecasts, with outputs materialized to client-facing Excel workbooks delivered into shared Box folders for downstream demand planners.",
      ],
  },
  {
    id: "arifpay",
    company: "Arifpay",
    role: "Data Scientist",
    dates: "Jan 2025 — May 2026",
    location: "Addis Ababa, Ethiopia",
    achievements: [
      "Built and deployed ML models for payment fraud detection on high-volume transactional data with severe class imbalance.",
      "Designed behavioral and temporal feature pipelines that contributed to a 15% reduction in fraud incidents.",
      "Developed a merchant credit scoring service in FastAPI, improving lending decision accuracy by ~40%.",
      "Implemented continuous-learning pipelines with MLflow and Celery; built and maintained Airflow DAGs for ML workflows.",
      "Built RAG systems on internal documents to support analytics and decision-support workflows.",
      "Designed Metabase dashboards for executive KPIs (revenue, churn, acquisition, efficiency).",
    ],
  },
  {
    id: "nedamco",
    company: "Nedamco Africa",
    role: "Cloud Consultant",
    dates: "Dec 2023 — Mar 2024",
    location: "Addis Ababa, Ethiopia (Remote)",
    achievements: [
      "Cloud architecture consulting on AWS for client deployments.",
      "Python tooling for cloud automation and infrastructure scripting.",
      "Worked across the data ingestion and processing layers for client workloads.",
    ],
  },
  {
    id: "openstack",
    company: "OpenStack",
    role: "Software Developer Intern",
    dates: "Dec 2023 — Mar 2024",
    location: "Remote (Outreachy program)",
    achievements: [
      "Enhanced the UI of OpenStack Manila, implementing a streamlined Django-based workflow for share network creation.",
      "Achieved 90% unit test coverage on the manila-ui project.",
      "Introduced pre-commit and tox configurations to standardize development.",
      "Worked directly with OpenStack core reviewers to merge patches within release cycles.",
    ],
  },
  {
    id: "mmcy-tech",
    company: "MMCY Tech",
    role: "Full Stack Developer Intern",
    dates: "Jul 2023 — Jan 2024",
    location: "Addis Ababa, Ethiopia",
    achievements: [
      "Built a full-stack Applicant Tracking System with Vue.js, Express.js, and Tailwind CSS, including schema design and API endpoints.",
      "Implemented core features: authentication, candidate listings, job listings, admin dashboard.",
    ],
  },
];

export const featuredPosts: WritingLink[] = [
  {
    title: "From Spec to System: Building a Real AI Agent Architecture",
    url: "https://medium.com/@melakualehegn34/from-spec-to-system-building-a-real-ai-agent-architecture-c3d6ca4f630f",
    excerpt:
      "A deep dive into the production architecture of agentic AI -- memory, role separation, the revision loop, LLM-as-Judge, and writing a Model Context Protocol client from scratch.",
    featured: true,
  },
  {
    title: "Building a Robust Data Warehouse for Complex Vehicle Trajectory Data",
    url: "https://medium.com/@melakualehegn34/building-a-robust-data-warehouse-for-complex-vehicle-trajectory-data",
    excerpt:
      "A technical deep dive into building a production-grade data warehouse for high-volume vehicle trajectory data using Postgres, Airflow, dbt, Cosmos, and Elementary.",
    featured: true,
  },
];

export const writingLinks: WritingLink[] = [
  {
    title: "All posts on Medium",
    url: "https://medium.com/@melakualehegn34",
  },
  // {
  //   title: "All posts on Hashnode",
  //   url: "https://hashnode.com/@Melaku",
  // },
];

export const contact = {
  email: "melakualehegn34@gmail.com",
  linkedin: "https://linkedin.com/in/melakualehegn",
  github: "https://github.com/MelakuAlehegn",
  portfolioRepo: "https://github.com/MelakuAlehegn/portfolio",
  medium: "https://medium.com/@melakualehegn34",
  // hashnode: "https://hashnode.com/@Melaku",
  location: "Addis Ababa, Ethiopia",
};

export const resume = {
  href: assetPath("/resumeMelakuAlehegn.pdf"),
  downloadName: "resumeMelakuAlehegn.pdf",
};

export const heroNowTopics = [
  "agent memory · tool routing · loops that know when to stop",
  "RAG · embeddings · answers tied to real sources",
  "feature pipelines · model registries · retraining in production",
  "Airflow · dbt · warehouses that stay honest at scale",
  "fraud signals · drift checks · ML when the data fights back",
  "MCP · LLM judges · systems you can reason about",
  "FastAPI · batch + online inference · APIs models can live behind",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const skills = {
  Languages: ["Python", "SQL", "Java", "TypeScript", "Bash"],
  "Data & ML": [
    "Airflow",
    "dbt",
    "Snowflake",
    "MLflow",
    "Celery",
    "Pandas",
    "Polars",
    "scikit-learn",
    "LightGBM",
    "TensorFlow",
    "Time series forecasting",
    "DuckDB",
    "Cosmos",
  ],
  "Backend & Databases": [
    "FastAPI",
    "Flask",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "SQLAlchemy + Alembic",
    "Docker",
  ],
  "LLMs & AI": ["Gemini", "Claude", "LangChain", "LangGraph", "Langfuse", "ChromaDB", "Qdrant", "MCP", "RAG"],
  "Cloud & BI": [
    "AWS",
    "Azure",
    "Azure Blob Storage",
    "GCP",
    "Metabase",
    "PowerBI",
    "Redash",
  ],
};

// Certifications data
export const certifications: Certification[] = [
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "Mar 2024",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Feb 2024",
  },
  {
    name: "Data Engineering, ML & Generative AI",
    issuer: "10 Academy",
    date: "Apr 2024 — Sep 2024",
  },
  {
    name: "Software Engineering",
    issuer: "Holberton School",
    date: "Feb 2021 — Mar 2022",
  },
];
