import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Service from "@/models/Service";
import Skill from "@/models/Skill";
import Testimonial from "@/models/Testimonial";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Settings from "@/models/Settings";
import Contact from "@/models/Contact";

export async function seedDatabase() {
  // ── Admin ──────────────────────────────────────────────
  await Admin.deleteMany({});
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await Admin.create({
    name: "Sayantan Kar",
    email: "admin@portfolio.com",
    password: hashedPassword,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  });

  // ── Settings ───────────────────────────────────────────
  await Settings.deleteMany({});
  await Settings.create({
    siteName: "Sayantan Kar",
    siteDescription: "Full Stack Developer & Creative Technologist based in Kolkata, India",
    heroTitle: "Hi, I'm Sayantan Kar",
    heroSubtitle: "Full Stack Developer & Creative Technologist",
    heroBio: "I craft beautiful, performant digital experiences using modern web technologies. With 5+ years of experience building scalable applications, I turn complex problems into elegant solutions that users love.",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
    aboutText: "I'm a passionate full-stack developer from Kolkata, India with a deep love for creating impactful digital products. My journey started with curiosity about how websites work, and today I architect enterprise-grade applications serving thousands of users.\n\nI specialize in the React/Next.js ecosystem on the frontend and Node.js/Python on the backend. I believe in writing clean, maintainable code and delivering pixel-perfect interfaces that are both beautiful and accessible.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers in the community.",
    email: "hello@sayantankar.dev",
    phone: "+91 98765 43210",
    address: "Kolkata, West Bengal, India",
    socialLinks: {
      github: "https://github.com/sayantankar",
      linkedin: "https://linkedin.com/in/sayantankar",
      twitter: "https://twitter.com/sayantankar",
      instagram: "https://instagram.com/sayantankar",
    },
    seoTitle: "Sayantan Kar - Full Stack Developer | React, Next.js, Node.js Expert",
    seoDescription: "Portfolio of Sayantan Kar — a Full Stack Developer specializing in React, Next.js, TypeScript, Node.js and modern cloud technologies. Available for freelance projects and collaborations.",
    seoKeywords: ["full stack developer", "react developer", "next.js developer", "node.js developer", "kolkata developer", "freelance developer", "web developer india", "typescript expert"],
  });

  // ── Projects ───────────────────────────────────────────
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: "ShopFlow — E-Commerce Platform",
      slug: "shopflow-ecommerce-platform",
      description: "A premium full-stack e-commerce platform with real-time inventory management, Stripe payments, admin dashboard, and AI-powered product recommendations.",
      content: "<h2>Overview</h2><p>ShopFlow is a modern e-commerce platform built from the ground up with Next.js 14 and TypeScript. It features a beautiful storefront, comprehensive admin panel, and integrations with Stripe for payments and Cloudinary for media management.</p><h2>Key Features</h2><ul><li>Server-side rendered product pages with ISR for blazing-fast performance</li><li>Real-time inventory tracking and low-stock alerts</li><li>Stripe integration with support for subscriptions and one-time payments</li><li>Admin dashboard with sales analytics, order management, and customer insights</li><li>AI-powered product recommendations using collaborative filtering</li></ul><h2>Technical Highlights</h2><p>The application uses Next.js App Router with React Server Components for optimal performance. The database layer is built on MongoDB with Mongoose ODM, featuring complex aggregation pipelines for analytics. Redis is used for session management and caching frequently accessed data.</p>",
      technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS", "Redis", "Cloudinary"],
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=700&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=700&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop",
      ],
      githubLink: "https://github.com/sayantankar/shopflow",
      liveLink: "https://shopflow-demo.vercel.app",
      category: "Full Stack",
      featured: true,
      order: 1,
      status: "published",
    },
    {
      title: "NeuralChat — AI Conversation App",
      slug: "neuralchat-ai-conversation-app",
      description: "An intelligent real-time chat application powered by GPT-4 with context-aware responses, conversation memory, and multi-language support.",
      content: "<h2>Overview</h2><p>NeuralChat is a sophisticated AI-powered chat application that leverages OpenAI's GPT-4 model for intelligent, context-aware conversations. It features real-time messaging via WebSockets, persistent conversation history, and a beautiful responsive interface.</p><h2>Key Features</h2><ul><li>Real-time messaging with WebSocket connections</li><li>AI-powered responses with conversation context memory</li><li>Multi-language support with automatic language detection</li><li>Code syntax highlighting in messages</li><li>File sharing and image generation capabilities</li></ul>",
      technologies: ["React", "Node.js", "Socket.io", "OpenAI API", "PostgreSQL", "Redis", "Docker"],
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=700&fit=crop",
        "https://images.unsplash.com/photo-1676299081847-824916de030a?w=1200&h=700&fit=crop",
      ],
      githubLink: "https://github.com/sayantankar/neuralchat",
      liveLink: "https://neuralchat-demo.vercel.app",
      category: "AI/ML",
      featured: true,
      order: 2,
      status: "published",
    },
    {
      title: "TaskBoard Pro — Project Management",
      slug: "taskboard-pro-project-management",
      description: "A Notion-inspired project management tool with Kanban boards, Gantt charts, real-time collaboration, time tracking, and team analytics.",
      content: "<h2>Overview</h2><p>TaskBoard Pro is a comprehensive project management solution designed for modern development teams. Inspired by tools like Notion and Linear, it combines beautiful design with powerful functionality.</p><h2>Key Features</h2><ul><li>Drag-and-drop Kanban boards with customizable workflows</li><li>Interactive Gantt charts for timeline visualization</li><li>Real-time collaboration with presence indicators</li><li>Built-in time tracking and productivity analytics</li><li>Integration with GitHub, Slack, and Jira</li></ul>",
      technologies: ["React", "TypeScript", "Firebase", "DnD Kit", "Chart.js", "Framer Motion"],
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=700&fit=crop",
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&h=700&fit=crop",
      ],
      githubLink: "https://github.com/sayantankar/taskboard-pro",
      liveLink: "https://taskboard-demo.vercel.app",
      category: "Full Stack",
      featured: true,
      order: 3,
      status: "published",
    },
    {
      title: "CloudVault — Secure File Storage",
      slug: "cloudvault-secure-file-storage",
      description: "An end-to-end encrypted cloud storage platform with file versioning, team sharing, real-time sync, and advanced search capabilities.",
      content: "<h2>Overview</h2><p>CloudVault is a privacy-first cloud storage solution that provides end-to-end encryption for all user files. Built with security as the core principle, it offers a seamless experience for individuals and teams.</p>",
      technologies: ["Next.js", "Node.js", "AWS S3", "PostgreSQL", "WebCrypto API", "Docker"],
      thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=700&fit=crop",
      ],
      githubLink: "https://github.com/sayantankar/cloudvault",
      category: "Backend",
      featured: false,
      order: 4,
      status: "published",
    },
    {
      title: "DevPortfolio — CMS Builder",
      slug: "devportfolio-cms-builder",
      description: "A developer-focused portfolio CMS with drag-and-drop page builder, markdown blog engine, custom themes, and built-in analytics.",
      content: "<h2>Overview</h2><p>DevPortfolio is a modern portfolio and CMS platform designed specifically for developers. It features an intuitive admin dashboard, a powerful blog engine with MDX support, and customizable themes.</p>",
      technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Framer Motion", "MDX", "Vercel"],
      thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=700&fit=crop",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=700&fit=crop",
      ],
      githubLink: "https://github.com/sayantankar/devportfolio",
      liveLink: "https://devportfolio-demo.vercel.app",
      category: "Full Stack",
      featured: true,
      order: 5,
      status: "published",
    },
    {
      title: "WeatherLens — Analytics Dashboard",
      slug: "weatherlens-analytics-dashboard",
      description: "A stunning weather analytics application with interactive maps, 7-day forecasts, air quality monitoring, and beautiful data visualizations.",
      content: "<h2>Overview</h2><p>WeatherLens combines multiple weather data APIs to deliver a comprehensive weather analytics experience. It features interactive Mapbox maps, animated D3.js charts, and real-time weather alerts.</p>",
      technologies: ["React", "TypeScript", "D3.js", "Mapbox GL", "OpenWeather API", "Chart.js"],
      thumbnail: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&h=700&fit=crop",
      ],
      liveLink: "https://weatherlens-demo.vercel.app",
      category: "Frontend",
      featured: false,
      order: 6,
      status: "published",
    },
    {
      title: "HealthTrack — Fitness Platform",
      slug: "healthtrack-fitness-platform",
      description: "A comprehensive fitness tracking platform with workout logging, nutrition planning, progress analytics, and social challenges.",
      content: "<h2>Overview</h2><p>HealthTrack helps users achieve their fitness goals with intelligent workout planning, macro tracking, and detailed progress analytics. The social features enable friendly competitions and accountability.</p>",
      technologies: ["React Native", "Node.js", "MongoDB", "Chart.js", "Firebase", "Expo"],
      thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=700&fit=crop",
      ],
      githubLink: "https://github.com/sayantankar/healthtrack",
      category: "Mobile App",
      featured: false,
      order: 7,
      status: "published",
    },
    {
      title: "CodeCollab — Pair Programming IDE",
      slug: "codecollab-pair-programming-ide",
      description: "A browser-based collaborative code editor with real-time multi-cursor editing, integrated terminal, video chat, and AI code suggestions.",
      content: "<h2>Overview</h2><p>CodeCollab brings the pair programming experience to the browser. Multiple developers can edit code simultaneously with real-time cursor presence, built-in terminal, and video conferencing.</p>",
      technologies: ["React", "Node.js", "WebRTC", "Monaco Editor", "Y.js", "Docker", "WebSocket"],
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=700&fit=crop",
      ],
      githubLink: "https://github.com/sayantankar/codecollab",
      liveLink: "https://codecollab-demo.vercel.app",
      category: "Full Stack",
      featured: false,
      order: 8,
      status: "published",
    },
  ]);

  // ── Services ───────────────────────────────────────────
  await Service.deleteMany({});
  await Service.insertMany([
    {
      title: "Web Development",
      description: "Building modern, responsive, and performant web applications using cutting-edge technologies like React, Next.js, and TypeScript. From landing pages to complex SaaS platforms.",
      icon: "HiCodeBracket",
      features: ["Custom Web Applications", "Single Page & Server-Rendered Apps", "RESTful & GraphQL APIs", "Database Architecture & Design"],
      order: 1,
      status: "active",
    },
    {
      title: "UI/UX Design",
      description: "Creating beautiful, intuitive user interfaces with a focus on user experience, accessibility, and modern design trends. Pixel-perfect implementation guaranteed.",
      icon: "HiPaintBrush",
      features: ["Interface & Interaction Design", "Wireframing & Prototyping", "Design Systems & Style Guides", "Responsive & Adaptive Layouts"],
      order: 2,
      status: "active",
    },
    {
      title: "Mobile Development",
      description: "Developing high-performance cross-platform mobile applications using React Native for both iOS and Android, with native-like experience and smooth animations.",
      icon: "HiDevicePhoneMobile",
      features: ["React Native & Expo", "Cross-Platform Development", "App Store & Play Store Deployment", "Push Notifications & Deep Linking"],
      order: 3,
      status: "active",
    },
    {
      title: "Cloud & DevOps",
      description: "Setting up cloud infrastructure, CI/CD pipelines, and deploying scalable applications on AWS, GCP, and Vercel with monitoring and auto-scaling.",
      icon: "HiCloud",
      features: ["AWS / GCP / Azure Setup", "Docker & Kubernetes", "CI/CD Pipeline Automation", "Performance Monitoring & Alerts"],
      order: 4,
      status: "active",
    },
    {
      title: "Database Engineering",
      description: "Designing efficient database schemas, writing optimized queries, and managing both SQL and NoSQL databases for applications at any scale.",
      icon: "HiCircleStack",
      features: ["MongoDB & PostgreSQL", "Redis Caching Strategies", "Data Modeling & Migration", "Query Optimization & Indexing"],
      order: 5,
      status: "active",
    },
    {
      title: "SEO & Performance",
      description: "Optimizing websites for search engines and Core Web Vitals to achieve top rankings, faster load times, and better conversion rates.",
      icon: "HiChartBar",
      features: ["Technical SEO Audits", "Core Web Vitals Optimization", "Google Analytics & Search Console", "Page Speed & Bundle Optimization"],
      order: 6,
      status: "active",
    },
  ]);

  // ── Skills ─────────────────────────────────────────────
  await Skill.deleteMany({});
  await Skill.insertMany([
    { name: "React", category: "Frontend", proficiency: 95, icon: "SiReact", order: 1 },
    { name: "Next.js", category: "Frontend", proficiency: 93, icon: "SiNextdotjs", order: 2 },
    { name: "TypeScript", category: "Frontend", proficiency: 91, icon: "SiTypescript", order: 3 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 96, icon: "SiTailwindcss", order: 4 },
    { name: "JavaScript", category: "Frontend", proficiency: 95, icon: "SiJavascript", order: 5 },
    { name: "HTML/CSS", category: "Frontend", proficiency: 98, icon: "SiHtml5", order: 6 },
    { name: "Framer Motion", category: "Frontend", proficiency: 88, icon: "SiFramer", order: 7 },
    { name: "Redux / Zustand", category: "Frontend", proficiency: 87, icon: "SiRedux", order: 8 },
    { name: "Node.js", category: "Backend", proficiency: 90, icon: "SiNodedotjs", order: 9 },
    { name: "Express.js", category: "Backend", proficiency: 88, icon: "SiExpress", order: 10 },
    { name: "MongoDB", category: "Backend", proficiency: 89, icon: "SiMongodb", order: 11 },
    { name: "PostgreSQL", category: "Backend", proficiency: 82, icon: "SiPostgresql", order: 12 },
    { name: "Python", category: "Backend", proficiency: 78, icon: "SiPython", order: 13 },
    { name: "GraphQL", category: "Backend", proficiency: 80, icon: "SiGraphql", order: 14 },
    { name: "REST APIs", category: "Backend", proficiency: 93, icon: "SiPostman", order: 15 },
    { name: "Redis", category: "Backend", proficiency: 76, icon: "SiRedis", order: 16 },
    { name: "Docker", category: "DevOps", proficiency: 78, icon: "SiDocker", order: 17 },
    { name: "AWS", category: "DevOps", proficiency: 72, icon: "SiAmazonaws", order: 18 },
    { name: "GitHub Actions", category: "DevOps", proficiency: 82, icon: "SiGithubactions", order: 19 },
    { name: "Vercel", category: "DevOps", proficiency: 90, icon: "SiVercel", order: 20 },
    { name: "Nginx", category: "DevOps", proficiency: 70, icon: "SiNginx", order: 21 },
    { name: "Git & GitHub", category: "Tools", proficiency: 94, icon: "SiGit", order: 22 },
    { name: "Figma", category: "Tools", proficiency: 82, icon: "SiFigma", order: 23 },
    { name: "VS Code", category: "Tools", proficiency: 95, icon: "SiVisualstudiocode", order: 24 },
    { name: "Postman", category: "Tools", proficiency: 88, icon: "SiPostman", order: 25 },
    { name: "Linux / Bash", category: "Tools", proficiency: 80, icon: "SiLinux", order: 26 },
  ]);

  // ── Testimonials ───────────────────────────────────────
  await Testimonial.deleteMany({});
  await Testimonial.insertMany([
    {
      name: "Sarah Johnson",
      company: "TechCorp Inc.",
      position: "Chief Technology Officer",
      feedback: "Sayantan is an exceptional developer who delivered our e-commerce platform ahead of schedule. His attention to detail, clean code architecture, and proactive communication made the entire project a pleasure. The platform handles 10K+ daily orders flawlessly.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      featured: true,
      order: 1,
    },
    {
      name: "Michael Chen",
      company: "InnovateLab",
      position: "Founder & CEO",
      feedback: "Working with Sayantan transformed our product from a basic MVP into a polished, scalable platform. His UI/UX improvements increased our user engagement by 45% and reduced bounce rate by 30%. He doesn't just write code — he solves business problems.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      featured: true,
      order: 2,
    },
    {
      name: "Priya Sharma",
      company: "DesignStudio Pro",
      position: "Creative Director",
      feedback: "Sayantan has a rare combination of technical skill and design sensibility. He took our Figma designs and brought them to life with pixel-perfect precision and smooth animations. The final product exceeded our expectations in every way.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      featured: true,
      order: 3,
    },
    {
      name: "David Williams",
      company: "CloudFirst Solutions",
      position: "VP of Engineering",
      feedback: "We hired Sayantan to rebuild our legacy dashboard, and the results were remarkable. He delivered a modern, responsive interface with real-time data visualizations that our clients love. His expertise in React and Next.js is truly top-tier.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      featured: true,
      order: 4,
    },
    {
      name: "Emily Rodriguez",
      company: "GrowthHacker Agency",
      position: "Head of Product",
      feedback: "One of the most talented developers we've ever collaborated with. Sayantan brought creative technical solutions to complex problems and always communicated clearly. Our client retention improved by 25% after the platform relaunch.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      featured: false,
      order: 5,
    },
    {
      name: "Arjun Patel",
      company: "FinTech Dynamics",
      position: "Product Manager",
      feedback: "Sayantan built our financial analytics dashboard from scratch with complex real-time data pipelines. His ability to handle both frontend elegance and backend complexity is impressive. A true full-stack expert.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      featured: false,
      order: 6,
    },
  ]);

  // ── Experience ─────────────────────────────────────────
  await Experience.deleteMany({});
  await Experience.insertMany([
    {
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      startDate: new Date("2022-03-01"),
      current: true,
      description: "Leading the architecture and development of enterprise SaaS products serving 50K+ users. Spearheading the migration from a monolithic architecture to microservices. Mentoring a team of 5 junior developers and conducting code reviews.",
      technologies: ["React", "Next.js", "Node.js", "AWS", "MongoDB", "Redis", "Docker", "GraphQL"],
      order: 1,
    },
    {
      company: "Digital Solutions Ltd",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      startDate: new Date("2020-06-01"),
      endDate: new Date("2022-02-28"),
      current: false,
      description: "Built and maintained 15+ client projects including e-commerce platforms, SaaS dashboards, and mobile applications. Implemented CI/CD pipelines that reduced deployment time by 60%. Integrated Stripe, PayPal, and Razorpay payment gateways.",
      technologies: ["React", "Express", "PostgreSQL", "Docker", "Redis", "Stripe", "TypeScript"],
      order: 2,
    },
    {
      company: "WebStudio Creative Agency",
      position: "Frontend Developer",
      duration: "2019 - 2020",
      startDate: new Date("2019-03-01"),
      endDate: new Date("2020-05-31"),
      current: false,
      description: "Created responsive, pixel-perfect web interfaces for 20+ agency clients across various industries. Collaborated with UI/UX designers to implement interactive animations and micro-interactions. Improved average page load speed by 40%.",
      technologies: ["React", "JavaScript", "SASS", "Webpack", "Figma", "GSAP", "Three.js"],
      order: 3,
    },
    {
      company: "Freelance",
      position: "Web Developer & Consultant",
      duration: "2018 - 2019",
      startDate: new Date("2018-06-01"),
      endDate: new Date("2019-02-28"),
      current: false,
      description: "Freelanced for startups and small businesses, delivering custom WordPress themes, landing pages, and web applications. Managed full project lifecycles from requirement gathering to deployment.",
      technologies: ["JavaScript", "WordPress", "PHP", "MySQL", "Bootstrap", "jQuery"],
      order: 4,
    },
  ]);

  // ── Education ──────────────────────────────────────────
  await Education.deleteMany({});
  await Education.insertMany([
    {
      institution: "Jadavpur University",
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      year: "2015 - 2019",
      startYear: "2015",
      endYear: "2019",
      description: "Graduated with First Class Honors. Specialized in Software Engineering, Data Structures & Algorithms, and Web Technologies. Led the university's Coding Club and organized 3 hackathons. Published a research paper on progressive web applications.",
      grade: "8.7 CGPA",
      order: 1,
    },
    {
      institution: "Udemy & Coursera",
      degree: "Professional Certifications",
      field: "Full Stack Web Development & Cloud Computing",
      year: "2019 - 2021",
      startYear: "2019",
      endYear: "2021",
      description: "Completed advanced certifications including: AWS Certified Developer Associate, Meta Front-End Developer Professional Certificate, and MongoDB University M220JS. Logged 500+ hours of structured online learning.",
      order: 2,
    },
    {
      institution: "St. Xavier's School, Kolkata",
      degree: "Higher Secondary (XII)",
      field: "Science (PCM + Computer Science)",
      year: "2013 - 2015",
      startYear: "2013",
      endYear: "2015",
      description: "Scored in the top 5% of the class. Developed the school's first student portal website. Won 1st place in the inter-school coding competition two years in a row.",
      grade: "94.6%",
      order: 3,
    },
  ]);

  // ── Blog Posts ─────────────────────────────────────────
  await Blog.deleteMany({});
  await Blog.insertMany([
    {
      title: "Building Blazing-Fast Web Apps with Next.js 14 App Router",
      slug: "building-blazing-fast-web-apps-nextjs-14-app-router",
      content: "<p>Next.js 14 has fundamentally changed how we build web applications. The App Router, combined with React Server Components, opens up entirely new patterns for data fetching, caching, and rendering that weren't possible before.</p><h2>Why the App Router Changes Everything</h2><p>The App Router introduces a file-system based routing paradigm with nested layouts, loading states, and error boundaries built right in. But the real game-changer is Server Components — they allow you to render components on the server, dramatically reducing the JavaScript bundle sent to the client.</p><h2>Server Components vs Client Components</h2><p>By default, all components in the App Router are Server Components. They can directly access databases, read files, and call APIs without exposing any of that logic to the browser. When you need interactivity (useState, useEffect, event handlers), you add the <code>\"use client\"</code> directive.</p><h2>Streaming & Suspense</h2><p>Next.js 14 supports streaming SSR out of the box. Wrap slow components in Suspense boundaries, and the rest of the page renders immediately while the slow parts stream in. This dramatically improves Time to First Byte (TTFB) and Largest Contentful Paint (LCP).</p><h2>Performance Results</h2><p>After migrating a production app from Pages Router to App Router, we saw: 40% reduction in JavaScript bundle size, 60% improvement in TTFB, and 35% better LCP scores. The user experience improvement was immediately noticeable.</p><h2>Conclusion</h2><p>Next.js 14's App Router isn't just an incremental update — it's a paradigm shift in how we think about React applications. If you haven't migrated yet, I highly recommend starting with new features and gradually moving existing pages.</p>",
      excerpt: "A deep dive into Next.js 14's App Router, Server Components, and streaming SSR — with real performance benchmarks from a production migration.",
      tags: ["Next.js", "React", "Performance", "Web Development"],
      category: "Web Development",
      featuredImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&h=600&fit=crop",
      featured: true,
      status: "published",
      views: 1247,
    },
    {
      title: "Advanced TypeScript Patterns Every React Developer Should Know",
      slug: "advanced-typescript-patterns-react-developers",
      content: "<p>TypeScript has become the de facto standard for professional React development. But many developers only scratch the surface. Let's explore advanced patterns that will make your code more robust, maintainable, and enjoyable to work with.</p><h2>1. Discriminated Unions for Component Props</h2><p>Instead of using optional props and checking for their existence, use discriminated unions to create type-safe component variants.</p><h2>2. Generic Components</h2><p>Create reusable components that preserve type information through generics. This is especially powerful for list components, form fields, and data tables.</p><h2>3. Template Literal Types</h2><p>TypeScript 4.1 introduced template literal types, which are incredibly useful for creating type-safe event handlers, CSS class builders, and API route definitions.</p><h2>4. Branded Types for Domain Safety</h2><p>Prevent accidentally passing a UserId where an OrderId is expected by using branded types — a pattern that adds zero runtime overhead but catches bugs at compile time.</p><h2>Conclusion</h2><p>These patterns leverage TypeScript's full power to catch more bugs at compile time, improve IDE autocompletion, and make refactoring safer. Start incorporating them into your projects gradually.</p>",
      excerpt: "Master discriminated unions, generic components, template literal types, and branded types to write bulletproof React applications.",
      tags: ["TypeScript", "React", "JavaScript", "Best Practices"],
      category: "Programming",
      featuredImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop",
      featured: true,
      status: "published",
      views: 892,
    },
    {
      title: "The Complete Guide to Modern CSS: From Grid to Container Queries",
      slug: "complete-guide-modern-css-grid-container-queries",
      content: "<p>CSS has evolved dramatically in recent years. Features that once required JavaScript hacks or complex workarounds are now natively supported in all modern browsers. Let's explore the most impactful modern CSS features.</p><h2>CSS Grid: Beyond Basic Layouts</h2><p>CSS Grid isn't just for creating rows and columns. With subgrid, auto-fill, and named grid areas, you can create complex, responsive layouts with minimal code.</p><h2>Container Queries: The Holy Grail</h2><p>Container queries let components respond to their container's size instead of the viewport. This is revolutionary for creating truly reusable components.</p><h2>The :has() Selector</h2><p>Often called the \"parent selector\", :has() enables styling based on child elements — something previously impossible in CSS.</p><h2>View Transitions API</h2><p>Create smooth, animated page transitions with just a few lines of CSS. No JavaScript animation libraries needed.</p>",
      excerpt: "Explore CSS Grid subgrid, container queries, :has() selector, and view transitions — the features reshaping modern web design.",
      tags: ["CSS", "Design", "Frontend", "Web Development"],
      category: "Design",
      featuredImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=600&fit=crop",
      featured: true,
      status: "published",
      views: 654,
    },
    {
      title: "Scaling Node.js APIs: From 100 to 100K Requests Per Second",
      slug: "scaling-nodejs-apis-100-to-100k-requests-per-second",
      content: "<p>Scaling a Node.js API isn't just about adding more servers. It requires understanding bottlenecks, optimizing at every layer, and implementing smart caching strategies. Here's what I learned scaling our API from 100 to 100K RPS.</p><h2>Profile Before You Optimize</h2><p>Use Node.js built-in profiler and tools like clinic.js to identify actual bottlenecks. Most performance issues come from unexpected places.</p><h2>Database Optimization</h2><p>The database is usually the first bottleneck. Implement connection pooling, add proper indexes, use projections to fetch only needed fields, and batch operations where possible.</p><h2>Caching Strategies</h2><p>Implement multi-layer caching: in-memory (LRU cache), distributed (Redis), and CDN-level. A well-designed cache can handle 90%+ of requests without hitting the database.</p><h2>Horizontal Scaling</h2><p>Use PM2 cluster mode to utilize all CPU cores. Combined with a load balancer, this alone can multiply your throughput by the number of available cores.</p>",
      excerpt: "Practical lessons from scaling a production Node.js API — covering profiling, database optimization, caching, and horizontal scaling.",
      tags: ["Node.js", "Backend", "Performance", "DevOps"],
      category: "Backend",
      featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
      featured: false,
      status: "published",
      views: 1534,
    },
    {
      title: "Designing Beautiful UIs: Principles Every Developer Should Know",
      slug: "designing-beautiful-uis-principles-developers",
      content: "<p>You don't need to be a trained designer to create beautiful user interfaces. By understanding a few core principles, developers can dramatically improve the visual quality and usability of their applications.</p><h2>The Power of Whitespace</h2><p>The single biggest improvement most developer-built UIs can make is adding more whitespace. Generous padding and margins make content more readable and create a sense of quality.</p><h2>Typography Hierarchy</h2><p>Use no more than 2-3 font sizes with clear hierarchy. Make headings significantly larger than body text, and use font weight and color to create additional levels of importance.</p><h2>Color: Less is More</h2><p>Pick one primary color and use it sparingly for CTAs and key interactive elements. Use gray shades for text and backgrounds for a clean, professional look.</p><h2>Consistency is King</h2><p>Use consistent spacing (multiples of 4 or 8px), consistent border radius, and consistent shadows throughout your UI.</p>",
      excerpt: "Core UI design principles — whitespace, typography, color theory, and consistency — that every developer can apply immediately.",
      tags: ["Design", "UI/UX", "Frontend", "Tips"],
      category: "Design",
      featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
      featured: false,
      status: "published",
      views: 423,
    },
    {
      title: "MongoDB Aggregation Pipelines: A Practical Deep Dive",
      slug: "mongodb-aggregation-pipelines-practical-deep-dive",
      content: "<p>MongoDB's aggregation framework is one of its most powerful features, yet many developers only use basic find() queries. Let's explore aggregation pipelines with real-world examples from production applications.</p><h2>Understanding the Pipeline Concept</h2><p>Think of aggregation as an assembly line. Documents enter the pipeline and are transformed through a series of stages: $match, $group, $sort, $project, $lookup, and more.</p><h2>Real-World Example: Sales Analytics</h2><p>Build a pipeline that calculates daily revenue, identifies top-selling products, and generates year-over-year comparisons — all in a single query.</p><h2>$lookup for Joins</h2><p>While MongoDB is a NoSQL database, $lookup allows you to perform left outer joins between collections. Learn when to use it vs. embedding documents.</p><h2>Performance Optimization</h2><p>Place $match stages early, create compound indexes that support your pipelines, and use $project to reduce document size between stages.</p>",
      excerpt: "Master MongoDB aggregation pipelines with real production examples — from basic grouping to complex analytics queries.",
      tags: ["MongoDB", "Backend", "Database", "Tutorial"],
      category: "Backend",
      featuredImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=600&fit=crop",
      featured: false,
      status: "published",
      views: 756,
    },
  ]);

  // ── Contact Messages (sample) ──────────────────────────
  await Contact.deleteMany({});
  await Contact.insertMany([
    {
      name: "Rahul Verma",
      email: "rahul.verma@gmail.com",
      phone: "+91 99887 76655",
      message: "Hi Sayantan, I came across your portfolio and I'm really impressed with your work. We're a startup building a SaaS platform for restaurant management and need a full-stack developer. Would you be available for a freelance project? Budget is flexible for the right person.",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      name: "Ananya Das",
      email: "ananya.das@techfirm.io",
      phone: "+91 98765 12345",
      message: "Hello! I'm the lead recruiter at TechFirm and we have an exciting senior developer position that matches your profile perfectly. Remote-first, competitive salary, equity options. Would love to schedule a call to discuss. When are you available?",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    },
    {
      name: "James Wilson",
      email: "james@designagency.co.uk",
      phone: "",
      message: "Loved your blog post on Next.js 14! Quick question — we're migrating our agency's client sites from Gatsby to Next.js. Would you be open to a consulting engagement? We need help with the architecture decisions and initial setup.",
      read: true,
      replied: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      name: "Sneha Gupta",
      email: "sneha.g@university.edu",
      phone: "+91 87654 32109",
      message: "Hi Sayantan! I'm a final year CS student and a big fan of your work. I've been following your blog and it's been incredibly helpful for my learning. Would you be open to mentoring a few students? We're starting a web dev community at our college.",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
      name: "Alex Thompson",
      email: "alex.t@ecommerce-brand.com",
      message: "We need a Shopify headless storefront built with Next.js. Saw your ShopFlow project and it's exactly the quality we're looking for. Timeline is 6-8 weeks. Can we set up a discovery call this week?",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
  ]);

  console.log("Database seeded successfully with rich dummy data!");
}
