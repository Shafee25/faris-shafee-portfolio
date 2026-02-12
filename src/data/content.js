// src/data/content.js

export const skillsData = [
  {
    id: 1,
    title: "Full Stack Web",
    description: "Building responsive apps with React, Node.js, and Laravel.",
    tools: ["React.js", "Laravel", "Node.js", "Tailwind"]
  },
  {
    id: 2,
    title: "Cloud & DevOps",
    description: "Deploying serverless applications on Azure/AWS.",
    tools: ["Azure Functions", "Cosmos DB", "AWS", "Docker"]
  },
  // ADD NEW SKILL HERE
];

export const projectsData = [
  {
    id: 1,
    title: "Low Stock Alert System",
    category: "Cloud & Azure",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    tech: ["Azure Functions", "React", "Node.js"],
    description: "A serverless inventory monitoring system using Azure."
  },
  // ADD NEW PROJECT HERE
];

export const blogPosts = [
  {
    id: 1,
    title: "The Future of AI: GPT-5 and Beyond",
    category: "AI Trends",
    date: "Feb 10, 2026",
    author: "Faris Shafee",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    excerpt: "Exploring the potential capabilities of the next generation of LLMs...",
    content: `
      ## Introduction
      Artificial Intelligence is evolving at a rapid pace. With GPT-5 on the horizon, we are looking at...
      
      ## What to Expect
      1. Improved Reasoning
      2. Multimodal Capabilities
      3. Faster Inference
      
      ## Conclusion
      As developers, we need to adapt to these changes...
    `
  },
  {
    id: 2,
    title: "Optimizing React Performance",
    category: "Tutorials",
    date: "Feb 08, 2026",
    author: "Faris Shafee",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    excerpt: "Deep dive into the latest React compiler features...",
    content: `
      ## Why Performance Matters
      React is fast, but bad code can slow it down. Here is how to fix it.
      
      ## Use Memoization
      Using useMemo and useCallback can drastically reduce re-renders...
    `
  },
  // TO ADD A NEW BLOG, COPY THIS BLOCK AND PASTE IT BELOW
];