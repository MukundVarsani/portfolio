// ============================================================
// Portfolio Data — Sourced from data.json
// ============================================================

export const personalInfo = {
  fullName: "Mukund Varsani",
  title: "Flutter Developer",
  location: "Ahmedabad, Gujarat, India",
  email: "varsanimukund56@gmail.com",
  mobile: "+919879074458",
  linkedin: "",
  github: "",
  objective:
    "Flutter developer with 2+ years of hands-on experience building cross-platform mobile applications, including production apps published on both the App Store and Google Play Store. I enjoy solving real-world problems through scalable architecture and clean code — driven by curiosity, whether building multi-role systems, integrating real-time communication, exploring AI automation, or finding creative solutions when traditional approaches fail.",
  personality:
    "Fast learner who enjoys going deep into problems. I take ownership of my work and enjoy building features end-to-end — from UI to backend integration. I think unconventionally — when something does not work the obvious way, I look for creative workarounds.",
  availability: "Available for full-time roles",
  preferredRoles: ["Flutter Developer", "Mobile App Developer", "Full-Stack Developer"],
  openToRemote: true,
};

export const skills = [
  // Languages
  { category: "Languages", name: "Dart", proficiency: "expert", years: 2, level: 95 },
  { category: "Languages", name: "JavaScript", proficiency: "intermediate", years: 2, level: 70 },
  { category: "Languages", name: "Python", proficiency: "beginner", years: 1, level: 35 },
  { category: "Languages", name: "C#", proficiency: "beginner", years: 1, level: 30 },
  // Frameworks
  { category: "Frameworks & Libraries", name: "Flutter", proficiency: "expert", years: 2, level: 95 },
  { category: "Frameworks & Libraries", name: "BLoC / Cubit", proficiency: "expert", years: 2, level: 95 },
  { category: "Frameworks & Libraries", name: "GetX", proficiency: "expert", years: 1, level: 85 },
  { category: "Frameworks & Libraries", name: "Node.js", proficiency: "intermediate", years: 2, level: 65 },
  { category: "Frameworks & Libraries", name: "React", proficiency: "intermediate", years: 1, level: 60 },
  // Databases
  { category: "Databases & Backend", name: "Firebase", proficiency: "expert", years: 2, level: 90 },
  { category: "Databases & Backend", name: "MongoDB", proficiency: "intermediate", years: 1, level: 60 },
  { category: "Databases & Backend", name: "Pinecone (Vector DB)", proficiency: "intermediate", years: 1, level: 55 },
  // AI & Automation
  { category: "AI & Automation", name: "LLM Integration (GPT-4, Gemini)", proficiency: "intermediate", years: 1, level: 65 },
  { category: "AI & Automation", name: "RAG (Retrieval-Augmented Generation)", proficiency: "intermediate", years: 1, level: 60 },
  { category: "AI & Automation", name: "n8n Workflow Automation", proficiency: "beginner", years: 1, level: 40 },
  // Platform Integrations
  { category: "Platform Integrations", name: "HealthKit (iOS) & Health Connect (Android)", proficiency: "intermediate", years: 1, level: 65 },
  { category: "Platform Integrations", name: "In-App Purchases (iOS & Android)", proficiency: "intermediate", years: 1, level: 65 },
  { category: "Platform Integrations", name: "Passio SDK (AI Nutrition)", proficiency: "intermediate", years: 1, level: 60 },
  // Dev Tools
  { category: "Dev Tools", name: "Git & GitHub", proficiency: "expert", years: 2, level: 80 },
  { category: "Dev Tools", name: "Android Studio & VS Code", proficiency: "expert", years: 2, level: 90 },
];

export const experience = [
  {
    role: "Flutter Developer",
    company: "Binstellar Technologies",
    location: "Ahmedabad, Gujarat",
    duration: "March 2025 – Present",
    type: "Full-Time",
    summary:
      "After completing my internship, I transitioned into a full-time Flutter Developer role. This role required me to work on an already large and complex production codebase — integrating native health APIs, AI-powered SDKs, and in-app purchases for a live health application used by real users.",
    responsibilities: [
      "Integrated Android Health Connect and iOS HealthKit to track user health and activity data",
      "Integrated Passio SDK for AI-based food recognition and nutritional analysis",
      "Implemented in-app purchases for both Android and iOS platforms",
      "Fixed production-level bugs and improved app stability",
      "Handled app deployment on App Store and Google Play Store",
      "Worked on platform-specific permission handling and native behavior",
    ],
  },
  {
    role: "Flutter Developer Intern",
    company: "Binstellar Technologies",
    location: "Ahmedabad, Gujarat",
    duration: "Sep 2023 – Feb 2025",
    type: "Internship",
    summary:
      "Transitioned from web development (HTML, CSS, Bootstrap) into Flutter mobile development. Built two production apps published on the App Store and Google Play Store. Mentored a junior developer on BLoC patterns during the Playscheme project.",
    responsibilities: [
      "Built responsive web pages using HTML, CSS, and Bootstrap",
      "Transitioned to Flutter and built production mobile apps for iOS and Android",
      "Implemented multi-role systems, real-time updates, and complex UI flows",
      "Worked closely with senior developers on code reviews and architecture decisions",
      "Mentored a junior developer on the Playscheme project",
      "Handled App Store and Google Play Store deployments",
    ],
  },
];

export const education = [
  {
    institution: "Silver Oak University",
    location: "Ahmedabad, Gujarat",
    degree: "Bachelor of Technology in Computer Engineering",
    score: "CGPA: 9.27",
    duration: "Sep 2021 – April 2025",
  },
  {
    institution: "Divya Brahmlok Global Academy",
    location: "Bhuj, Gujarat",
    degree: "Higher Secondary Certificate (HSC)",
    score: "72%",
    duration: "June 2019 – May 2021",
  },
];

export const projects = [
  {
    name: "Child Engagement & Activity Management Platform",
    shortName: "Playscheme",
    type: "professional",
    tag: "Published · App Store & Play Store",
    tech: ["Flutter", "Firebase", "BLoC", "Dart"],
    platform: ["iOS", "Android"],
    description:
      "A multi-role Flutter application for a playscheme organization with 5 different user types — each with a completely different interface, permissions, and data flow inside a single codebase.",
    highlight: "5 distinct user roles in one codebase, with BLoC-based module separation and tablet-responsive layouts.",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.binstellar.dareplayscheme",
      appStore: "https://apps.apple.com/gb/app/dare-play-scheme/id6751529234",
      github: "",
      live: "",
    },
  },
  {
    name: "Digital Pharmacy Platform",
    shortName: "GoMeds",
    type: "professional",
    tag: "Published · App Store & Play Store",
    tech: ["Flutter", "Dart", "Firebase", "Pusher", "Cubit"],
    platform: ["iOS", "Android"],
    description:
      "A mobile app that allows users to compare medicine and lab test prices across multiple partnered pharmacies and labs, with real-time price updates via Pusher.",
    highlight: "Optimized Cubit-based state management to update only changed list items — eliminating UI lag on real-time updates.",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.binstellar.gomeds",
      appStore: "https://apps.apple.com/in/app/gomeds-24-7/id6755947115",
      github: "",
      live: "",
    },
  },
  {
    name: "Health & Nutrition Tracking App",
    shortName: "VitaCoach AI",
    type: "professional",
    tag: "Published · App Store & Play Store",
    tech: ["Flutter", "Dart", "HealthKit", "Health Connect", "Passio SDK", "In-App Purchases"],
    platform: ["iOS", "Android"],
    description:
      "A comprehensive health tracking app integrating iOS HealthKit and Android Health Connect for activity tracking, and Passio SDK for AI-powered food recognition and nutritional analysis.",
    highlight: "Platform-specific native integrations with real physical device testing; production codebase with existing real users.",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.vitacoach.ai",
      appStore: "https://apps.apple.com/gb/app/vitacoach-ai/id6756865892",
      github: "",
      live: "",
    },
  },
  {
    name: "Don't just watch, Feel it",
    shortName: "Android Haptic",
    type: "personal",
    tag: "Personal Project",
    tech: [
      "Flutter",
      "Dart",
      "Android Native APIs",
      "Haptic Feedback"
    ],
    platform: ["Android", "iOS"],
    description:
      "A self-learning mobile application created to experiment with advanced haptic feedback patterns, vibration intensity, and tactile interactions using Flutter and native platform APIs.",
    highlight:
      "Explored platform-specific haptic behaviors, custom vibration patterns, and real-device testing to understand how modern apps create immersive touch feedback experiences.",
    links: {
      apk: "https://drive.google.com/file/d/1MTxDQMZizXW24a6_jXzVi1DaqrNr2_iI/view?usp=sharing",
      appStore: "",
      github: "",
      live: ""
    },
  },
  {
    name: "Future Capsule",
    shortName: "Time Capsule App",
    type: "personal",
    tag: "Personal Project",
    tech: ["Flutter", "Firebase", "GetX", "Node.js", "GPT-4"],
    platform: ["iOS", "Android"],
    description:
      "A digital time capsule app where users create capsules of memories, messages, and photos — scheduled to unlock at a specific future date. Features AI-generated content via GPT-4 and a Node.js cron backend for precise scheduled notifications.",
    highlight: "Node.js cron job + Firebase Admin SDK for reliable future-date notification delivery that Firebase alone can't handle.",
    links: { playStore: "", appStore: "", github: "https://github.com/MukundVarsani/future-capsule", live: "" },
  },
  {
    name: "Real-Time Chat App",
    shortName: "Chat App",
    type: "personal",
    tag: "Personal Project",
    tech: ["Flutter", "React", "Node.js", "WebSocket", "MongoDB"],
    platform: ["iOS", "Android", "Web"],
    description:
      "A full-stack real-time chat application with two separate frontends — React for web, Flutter for mobile — both powered by the same Node.js WebSocket backend with MongoDB storage.",
    highlight: "Same backend serving two completely different clients simultaneously with server-side timestamp-based message ordering.",
    links: { playStore: "", appStore: "", github: "https://github.com/MukundVarsani/flutter_chat_app_using_node_js", live: "" },
  },
  {
    name: "Fiverr Clone",
    shortName: "MERN Marketplace",
    type: "learning",
    tag: "Learning Project",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    platform: ["Web"],
    description:
      "A Fiverr clone built with the MERN stack, replicating core marketplace features including user authentication with JWT refresh logic, service listings, and a dynamic responsive UI.",
    highlight: "Deep dive into JWT authentication — token expiry, refresh logic, and route guarding on both frontend and backend.",
    links: { playStore: "", appStore: "", github: "https://github.com/MukundVarsani/Fiverr-clone", live: "" },
  },
];

export const softSkills = [
  { name: "Fast Learner", icon: "⚡" },
  { name: "Problem Solving", icon: "🧩" },
  { name: "Ownership", icon: "🎯" },
  { name: "Adaptability", icon: "🔄" },
  { name: "Teamwork", icon: "🤝" },
  { name: "Leadership", icon: "🚀" },
];

export const featureProjects = [
  {
    name: "Browser URL Extraction via Native DLL",
    tech: ["Node.js", "C#", "Windows DLL"],
    description:
      "Built a native Windows DLL in C# to extract active browser URLs in real-time and bridged it into a Node.js desktop application using native bindings — solving a problem that pure JavaScript couldn't handle.",
  },
  {
    name: "Brick Image Similarity Search (POC)",
    tech: ["LLM Vision API", "Pinecone", "Node.js", "Vector Embeddings"],
    description:
      "Designed a visual similarity search for brick images using LLM-generated text descriptions and Pinecone vector search — no custom ML model, no large dataset required. Worked with just 10–15 reference images.",
  },
  {
    name: "Auto Restart Tracker via Windows Scheduler",
    tech: ["Node.js", "Windows Task Scheduler", "VBScript"],
    description:
      "Built a self-healing mechanism using VBScript + Windows Task Scheduler that automatically restarts a desktop tracking app whenever a user kills it via Task Manager.",
  },
];
