import { useState } from "react";
import { motion } from 'framer-motion';

const staggerContainer = (staggerChildren, delayChildren) => ({
    hidden: {},
    show: {
        transition: { staggerChildren, delayChildren },
    },
});

const fadeIn = (direction = 'up', type = 'spring', delay = 0, duration = 1) => ({
    hidden: {
        x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
        y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
        opacity: 0,
    },
    show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { type, delay, duration, ease: 'easeOut' },
    },
});

const AIAssistant = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!prompt) {
            setError("请输入一些内容, 比如你的项目描述或个人简介。");
            return;
        }
        setIsLoading(true);
        setError("");
        setResponse("");
        
        const chatHistory = [{
            role: "user",
            parts: [{ text: `你现在是一位资深的技术面试官和简历优化专家。请根据以下内容, 从专业角度提出3-5条具体的、可操作的优化建议, 帮助我更好地展示我的能力和项目价值。请使用中文回答, 格式清晰, 语气专业且有建设性。\n\n内容如下：\n"${prompt}"` }]
        }];
        
        const payload = { contents: chatHistory };
        const apiKey = ""; // Canvas会自动处理API Key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error(`API 请求失败, 状态码: ${res.status}`);
            }

            const result = await res.json();
            
            if (result.candidates && result.candidates[0]?.content?.parts[0]) {
                const text = result.candidates[0].content.parts[0].text;
                // 简单的Markdown格式化
                const formattedText = text
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400">$1</strong>')
                    .replace(/\n/g, '<br />');
                setResponse(formattedText);
            } else {
                throw new Error("AI未能生成有效回复, 请稍后重试。");
            }
        } catch (e) {
            console.error(e);
            setError(e.message || "发生未知错误, 请检查网络连接或联系管理员。");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <section id="ai-assistant" className="py-20 bg-primary">
            <motion.div
                className="container mx-auto px-6"
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
            >
                <motion.h2 variants={fadeIn('up')} className="text-4xl font-bold text-center text-white mb-4">AI 求职助理</motion.h2>
                <motion.p variants={fadeIn('up')} className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
                    粘贴你的项目描述或个人简介, 让 AI 帮助你优化, 提升求职竞争力。
                </motion.p>
                <motion.div variants={fadeIn('up')} className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-xl">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="例如: 我使用React和Three.js开发了一个3D数据可视化平台..."
                        className="w-full h-32 p-3 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                分析中...
                            </>
                        ) : "获取优化建议"}
                    </button>
                    {error && <p className="mt-4 text-red-400">{error}</p>}
                    {response && (
                        <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-md">
                             <h4 className="font-bold text-lg text-white mb-2">优化建议:</h4>
                             <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: response }}></div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AIAssistant;