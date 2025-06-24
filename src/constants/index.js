import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  magnetlabs,
  xmly,
  boohee,
  alibaba,
  talk2ai,
  crypt,
  portfolio,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
];

const experiences = [
  {
    title: "Frontend Developer",
    company_name: "Alibaba",
    icon: alibaba,
    iconBg: "#ed702d",
    date: "Jul 2017 - Sep 2020",
    points: [
      "Led the development of Taobao e-commerce platform and WeChat mini-program e-commerce platform",
      "Developed Key Market and Promotional Campaigns During Major Sales Events",
    ],
  },
  {
    title: "Frontend Developer, Team Leader",
    company_name: "薄荷健康",
    icon: boohee,
    iconBg: "#fff",
    date: "Sep 2020 - Feb 2023",
    points: [
      "Contributed to the Development and Iterative Enhancement of Boohee Health and Nutritionist Apps",
      "Led Business Development for Taro-based Nutritionist Mini Program",
      "Frontend Team Leadership, Recruitment, and Training",
      " Managed Frontend and Emerging Business Technology Teams",
    ],
  },
  {
    title: "Senior Frontend Developer",
    company_name: "喜马拉雅",
    icon: xmly,
    iconBg: "#d85533",
    date: "Feb 2023 - Oct 2023",
    points: [
      "Led the Development and Iteration of Marketing H5 Features for Himalaya's Main App",
      "Developed and Refactored Core Business Features Using React Native",
      "Monitored and Optimized Project Metrics for Enhanced User Experience",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "MagnetLabs",
    icon: magnetlabs,
    iconBg: "#fff",
    date: "April 2024 - May 2025",
    points: [
      "Developing and maintaining web applications using Next.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },

];


const projects = [
  {
    name: "Talk2Ai",
    description:
      "T2ai is a open-source chatbot likly project that allows you to interact with AI models like Gemini and Grok. It is free to use and can resgister with your github or twitter account. It will save your chat history and allow you to continue your conversations later.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: talk2ai,
    source_code_link: "https://github.com/wanxiankai/talk2ai",
  },
  {
    name: "Crypt",
    description:
      "It's a project to learn about the basics of Web and Smart Contract development. It's a simple decentralized application that allows users to login with wallet and transfer the token to another account. The project is built with React, Solidity, and Hardhat.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "solidity",
        color: "green-text-gradient",
      },
      {
        name: "ethers",
        color: "pink-text-gradient",
      },
    ],
    image: crypt,
    source_code_link: "https://github.com/wanxiankai/crypt_web3_app",
  },
  {
    name: "My Portfolio",
    description:
      "This is my personal portfolio website built with React, Tailwind CSS and WebGL. It showcases my skills, projects, and experiences. The website is fully responsive and optimized for performance.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "webgl",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/wanxiankai/my-portfolio",
  },
];

export { services, technologies, experiences, projects };
