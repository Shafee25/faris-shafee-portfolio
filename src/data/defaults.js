// src/data/defaults.js

export const defaultSkills = [
  {
    id: "def-1",
    title: "Full Stack Web",
    description: "Building responsive apps with React, Node.js, and Laravel using MVC architecture.",
    tools: "React.js, Laravel, Node.js, Tailwind, Next.js",
    createdAt: { seconds: 1 } // Fake timestamp for sorting
  },
  {
    id: "def-2",
    title: "Cloud & DevOps",
    description: "Deploying serverless applications on Azure/AWS and managing CI/CD pipelines.",
    tools: "Azure Functions, Cosmos DB, AWS, Docker, Git",
    createdAt: { seconds: 2 }
  },
  {
    id: "def-3",
    title: "Mobile & IoT",
    description: "Developing cross-platform mobile apps and IoT systems with real-time sensor data.",
    tools: "Flutter, Arduino, ESP32, MQTT, Firebase",
    createdAt: { seconds: 3 }
  }
];

export const defaultProjects = [
  {
    id: "def-p1",
    title: "Oasis Amps EV",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?fit=crop&w=800&q=80",
    tech: "Laravel, MySQL, Google Maps API, Stripe",
    description: "EV Charger booking platform with interactive maps and secure payments. Allows station owners to list charging spots.",
    github: "https://github.com/Shafee25",
    demo: "",
    createdAt: { seconds: 3 }
  },
  {
    id: "def-p2",
    title: "Low Stock Alert System",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80",
    tech: "Azure Functions, Cosmos DB, React, Node.js",
    description: "A serverless inventory monitoring system. Uses Azure Functions to scan stock levels and send intelligent email alerts via SendGrid.",
    github: "https://github.com/Shafee25",
    demo: "",
    createdAt: { seconds: 2 }
  },
  {
    id: "def-p3",
    title: "Smart Cradle IoT",
    category: "IoT",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?fit=crop&w=800&q=80",
    tech: "Flutter, Arduino ESP32, Firebase, C++",
    description: "AI-based sleep pattern analysis system. Features real-time sensor monitoring, mobile app control, and automated cradle rocking.",
    github: "https://github.com/Shafee25",
    demo: "",
    createdAt: { seconds: 1 }
  }
];

export const defaultExperience = [
  {
    id: "def-e1",
    role: "Associate Software Engineer",
    company: "AI Generix - Remote",
    period: "Sept 2025 - Present",
    type: "work",
    description: "Implementing frontend and backend features using Laravel & React. Designing schemas for MySQL/MS SQL and managing MVC architecture.",
    createdAt: { seconds: 4 }
  },
  {
    id: "def-e2",
    role: "Software Engineer - Intern",
    company: "MobioS Pvt Ltd",
    period: "Sept 2025 - Present",
    type: "work",
    description: "Developing scalable web apps with React.js, Node.js, and MS SQL. Optimizing stored procedures and deploying to cloud environments.",
    createdAt: { seconds: 3 }
  },
  {
    id: "def-e3",
    role: "IT Lecturer",
    company: "Zips Campus",
    period: "Apr 2024 - Apr 2025",
    type: "work",
    description: "Teaching web development courses (React, Laravel). Mentoring students to build and deploy functional web applications.",
    createdAt: { seconds: 2 }
  },
  {
    id: "def-e4",
    role: "B.ICT (Hons) in Software Tech",
    company: "South Eastern University",
    period: "2021 - 2025",
    type: "education",
    description: "Specialized in Software Technologies. Gained strong foundation in Algorithms, Cloud Computing, and Mobile Development.",
    createdAt: { seconds: 1 }
  }
];