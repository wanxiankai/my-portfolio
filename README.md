[English](./README.md) | [中文](./README.zh-CN.md)

# **Portfolio Website**

This is a modern and responsive portfolio website built with React, Vite, and Tailwind CSS. It integrates rich interactive animations and an AI Assistant feature, aiming to showcase personal skills, project experience, and a personal bio in a unique and innovative way.

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.2.0-yellowgreen.svg?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg?logo=node.js)

---

### **✨ Screenshots**


![Project Demo](./docs/portfolio-demo.gif)

---

### **🚀 Live Demo**

You can visit my portfolio online at the following link:

**[https://my-portfolio-project-463508.de.r.appspot.com/](https://my-portfolio-project-463508.de.r.appspot.com/)**

---

### **🌟 Features**

* **Rich Interactive Animations**:
    * Page elements use `Framer Motion` for elegant entry and staggered animations.
    * Skill cards feature a cool 3D flip effect on hover.
    * Smooth in-page scroll navigation.
* **AI Career Assistant**:
    * Integrates the Gemini API to provide a floating AI chat window.
    * Users can input their project descriptions or personal bios, and the AI will provide professional optimization suggestions from the perspective of a senior technical interviewer.
* **Modern Design**:
    * Built with Tailwind CSS for a fully responsive design, providing a perfect visual experience on both PC and mobile devices.
    * The Hero section features a dynamic gradient background implemented with pure CSS, which is both beautiful and high-performance.
* **Componentization & Performance Optimization**:
    * Uses React Hooks for clear and logical state management.
    * Implements `React.lazy` and `Suspense` for lazy loading of non-core components to optimize initial page load speed.

---

### **🛠️ Technical Implementation**

This project aims to comprehensively showcase front-end development capabilities, from UI/UX design and animation interaction to back-end integration and cloud deployment.

#### **1. Frontend Architecture**

* **Build Tool**: **Vite** was chosen for its extremely fast development server based on native ES Modules and its optimized build output.
* **Core Framework**: Built with **React 18**, fully utilizing functional components and Hooks (like `useState`, `useEffect`, `useMemo`) to create declarative and reusable UI components.
* **Component-Based Design**: The entire application is broken down into highly cohesive, loosely coupled components (e.g., `Navbar`, `Hero`, `Skills`, `FloatingAIAssistant`), making the code structure clear and easy to maintain and extend.
* **Styling Solution**: Adopts **Tailwind CSS**, a utility-first CSS framework. It allows us to build complex responsive interfaces directly in JSX without writing separate CSS files, significantly improving development efficiency.

#### **2. Visuals & Interactive Animations**

* **Animation Library**: The core animation capabilities are provided by **`Framer Motion`**.
    * **Entry Animations**: Using preset `variants` and `staggerChildren`, it achieves an elegant, layered loading effect for page content.
    * **3D Interaction**: In the "Skills" section, by setting the `perspective` property on the parent container and adding `whileHover={{ rotateY: 180 }}` to the cards, a 3D flip animation on hover is easily implemented, enhancing user interaction.
* **Dynamic Background**: The initial attempt to use WebGL (Three.js) for a 3D Earth background encountered intractable rendering conflicts in certain environments. To ensure project stability and final delivery, a switch was decisively made to a **dynamic gradient animation background implemented with pure CSS**. This not only solved the technical problem but also demonstrated the engineering mindset of choosing mature, stable technical solutions when facing complex issues.

#### **3. AI Assistant (Full-Stack Feature)**

The AI Assistant is a highlight of this project, implemented following the best security practice of **"Frontend Request -> Backend Proxy -> AI Service"** to ensure the API key is not exposed on the client side.

* **Frontend**:
    * The user inputs text into a floating chat window.
    * Upon clicking the button, a POST request is sent via `fetch` to our self-hosted backend proxy service, with the user's `prompt` in the request body.
* **Backend (Secure Proxy)**:
    * A lightweight backend service is built with **Node.js + Express**.
    * The backend service securely reads the `GEMINI_API_KEY` from the server's environment variables using the `dotenv` module.
    * Upon receiving a request from the frontend, the backend constructs a complete request body by combining the user's `prompt` with a predefined instruction (e.g., "You are a senior interviewer...").
    * It then uses `axios` to send this complete request to the actual Gemini API.
    * After receiving the response from the Gemini API, it forwards it back to the frontend.
* **Security**: This proxy pattern is the industry standard for protecting sensitive credentials. The user's browser only communicates with our backend service, never coming into contact with the private API key.

#### **4. Deployment Architecture (Google Cloud Platform)**

**Google App Engine** was chosen to deploy this full-stack application due to its highly automated deployment and management experience.

* **Dual-Service Architecture**:
    * **`default` Service (Frontend)**: Configured via the root `app.yaml`, it is deployed as a static web service. The `handlers` configuration directs all static assets (JS, CSS, etc.) to the `dist` directory generated by Vite and routes all other requests to `index.html` to allow React Router to handle client-side routing.
    * **`api` Service (Backend)**: Configured via `server/app.yaml`, it is deployed as an independent Node.js service. The `"start": "node index.js"` script in `package.json` tells App Engine how to start this service.
* **Environment Variables**: The backend's `GEMINI_API_KEY` is securely injected into the production environment via the `env_variables` section in `server/app.yaml`.
* **Communication**: In production, the frontend application calls the backend `api` service using the auto-generated service URL provided by App Engine (`https://api-dot-[Project-ID]...`).

---

### **🚀 Local Development Guide**

To run this project locally, please follow these steps.

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/](https://github.com/)[Your-GitHub-Username]/my-portfolio.git
    cd my-portfolio
    ```

2.  **Install frontend dependencies** (using pnpm):
    ```bash
    pnpm install
    ```

3.  **Install backend dependencies**:
    ```bash
    cd server
    pnpm install
    cd ..
    ```

4.  **Configure environment variables**:
    * Create a `.env` file in the `server` directory (`server/.env`).
    * Add your Gemini API key to the file:
        ```env
        GEMINI_API_KEY="YOUR_API_KEY_HERE"
        ```

5.  **Run both frontend and backend concurrently**:
    * Open your **first terminal** and start the frontend development server:
        ```bash
        pnpm dev
        ```
    * Open a **second terminal** and start the backend proxy service:
        ```bash
        cd server
        node index.js
        ```

6.  Open `http://localhost:5173` (or the address shown in the terminal) in your browser.

---

### **📄 License**

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.