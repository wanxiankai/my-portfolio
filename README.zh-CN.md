[English](./README.md) | 中文

# **个人作品集网站 (Portfolio Website)**

这是一个基于 React + Vite + Tailwind CSS 构建的现代化、响应式的个人作品集网站。它集成了丰富的交互动画和 AI 求职助理功能，旨在以独特和创新的方式展示个人技能、项目经验和个人简介。

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.2.0-yellowgreen.svg?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg?logo=node.js)

---

### **✨ 项目截图**

![Project Demo](./docs/portfolio-demo.gif)

---

### **🚀 在线访问**

你可以通过以下链接在线访问我的作品集：

**[https://my-portfolio-project-463508.de.r.appspot.com/](https://my-portfolio-project-463508.de.r.appspot.com/)**

---

### **🌟 主要功能**

* **丰富的交互动画**:
    * 页面元素使用 `Framer Motion` 实现优雅的入场和交错动画。
    * 技术栈卡片在鼠标悬停时拥有酷炫的 3D 翻转效果。
    * 平滑的页面内滚动导航。
* **AI 求职助理**:
    * 集成 Gemini API，提供一个浮动的 AI 聊天窗口。
    * 用户可以输入自己的项目描述或个人简介，AI 会以资深技术面试官的视角给出专业的优化建议。
* **现代化设计**:
    * 使用 Tailwind CSS 构建，实现了完全的响应式设计，在 PC 和移动端都有完美的视觉体验。
    * 主屏（Hero）部分拥有一个由纯 CSS 实现的动态渐变背景，既美观又高性能。
* **组件化与性能优化**:
    * 采用 React Hooks 进行状态管理，逻辑清晰。
    * 使用 `React.lazy` 和 `Suspense` 实现非核心组件的懒加载，优化首屏加载速度。

---

### **🛠️ 技术实现思路**

本项目旨在全面展示前端开发的综合能力，从 UI/UX 设计、动画交互到后端集成和云部署。

#### **1. 前端架构**

* **构建工具**: 选用 **Vite** 作为构建工具，因为它提供了基于原生 ES Module 的极速开发服务器和优化的构建输出。
* **核心框架**: 使用 **React 18** 进行开发，充分利用其函数式组件和 Hooks (如 `useState`, `useEffect`, `useMemo`) 来构建声明式、可复用的 UI 组件。
* **组件化设计**: 整个应用被拆分为多个高内聚、低耦合的组件（如 `Navbar`, `Hero`, `Skills`, `FloatingAIAssistant` 等），使代码结构清晰，易于维护和扩展。
* **样式方案**: 采用 **Tailwind CSS** 这一 Utility-First 的 CSS 框架。它使我们能够直接在 JSX 中快速构建复杂的响应式界面，而无需编写独立的 CSS 文件，极大地提升了开发效率。

#### **2. 视觉与交互动画**

* **动画库**: 项目的核心动画能力由 **`Framer Motion`** 提供。
    * **入场动画**: 通过预设的 `variants` (动画变体) 和 `staggerChildren` (子元素交错动画) ，实现了页面内容优雅、有层次感的加载效果。
    * **3D 交互**: 在“技术栈”板块，通过为父容器设置 `perspective` 属性，并为卡片添加 `whileHover={{ rotateY: 180 }}`，轻松实现了鼠标悬停时的 3D 翻转动画，增强了用户的交互感。
* **动态背景**: 最初尝试使用 WebGL (Three.js) 实现 3D 地球背景，但在某些环境下遇到了难以解决的渲染冲突。为了保证项目的稳定性和最终交付，果断切换为**纯 CSS 实现的动态渐变动画背景**。这不仅解决了技术难题，也体现了在面对复杂问题时，选择成熟、稳定技术方案的工程化思维。

#### **3. AI 助理 (全栈功能)**

AI 助理功能是本项目的亮点，其实现遵循了**“前端请求 -> 后端代理 -> AI 服务”**的最佳安全实践，以确保 API 密钥不被暴露于客户端。

* **前端**:
    * 用户在浮动聊天窗口中输入内容。
    * 点击按钮后，通过 `fetch` 向我们自己搭建的后端代理服务发送一个 POST 请求，请求体中包含用户的输入 `prompt`。
* **后端 (安全代理)**:
    * 使用 **Node.js + Express** 搭建一个轻量级后端服务。
    * 后端服务通过 `dotenv` 模块从服务器的环境变量中安全地读取 `GEMINI_API_KEY`。
    * 收到前端请求后，后端将用户的 `prompt` 和预设的指令（如“你是一位面试官...”）拼接成一个完整的请求体。
    * 使用 `axios` 将这个完整的请求发送给真正的 Gemini API。
    * 收到 Gemini API 的响应后，再将其原样转发给前端。
* **安全性**: 这种代理模式是保护敏感凭证的行业标准。用户的浏览器只与我们的后端服务通信，完全接触不到私密的 API 密钥。

#### **4. 部署架构 (Google Cloud Platform)**

为了将这个全栈应用部署上线，我们选择了 **Google App Engine**，因为它提供了高度自动化的部署和管理体验。

* **双服务架构**:
    * **`default` 服务 (前端)**: 通过根目录的 `app.yaml` 配置，它被部署为一个静态网站服务。`handlers` 配置将所有静态资源（JS, CSS 等）指向 Vite 构建生成的 `dist` 目录，并将所有未匹配的路由都指向 `index.html`，以便 React Router 能接管前端路由。
    * **`api` 服务 (后端)**: 通过 `server/app.yaml` 配置，它被部署为一个独立的 Node.js 服务。`package.json` 中的 `"start": "node index.js"` 脚本告诉 App Engine 如何启动这个服务。
* **环境变量**: 后端的 `GEMINI_API_KEY` 通过 `server/app.yaml` 中的 `env_variables` 节安全地注入到生产环境中。
* **通信**: 前端应用在生产环境中会通过 App Engine 自动生成的服务地址 (`https://api-dot-[项目ID]...`) 来调用后端 `api` 服务。

---

### **🚀 本地开发指南**

如果你想在本地运行此项目，请按照以下步骤操作。

1.  **克隆仓库**:
    ```bash
    git clone [https://github.com/](https://github.com/)[你的GitHub用户名]/my-portfolio.git
    cd my-portfolio
    ```

2.  **安装前端依赖** (使用 pnpm):
    ```bash
    pnpm install
    ```

3.  **安装后端依赖**:
    ```bash
    cd server
    pnpm install
    cd ..
    ```

4.  **配置环境变量**:
    * 在 `server` 文件夹下，创建一个 `.env` 文件 (`server/.env`)。
    * 在文件中添加你的 Gemini API 密钥：
        ```env
        GEMINI_API_KEY="YOUR_API_KEY_HERE"
        ```

5.  **同时运行前端和后端**:
    * 打开 **第一个终端**，启动前端开发服务器：
        ```bash
        pnpm dev
        ```
    * 打开 **第二个终端**，启动后端代理服务：
        ```bash
        cd server
        node index.js
        ```

6.  在浏览器中打开 `http://localhost:5173` (或终端提示的地址) 即可访问。

---

### **📄 许可证**

本项目采用 [MIT](https://choosealicense.com/licenses/mit/) 许可证。