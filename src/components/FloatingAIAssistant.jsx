import { useState } from "react";
import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

const FloatingAIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!prompt) {
            setError("Please enter some content to analyze.");
            return;
        }
        setIsLoading(true);
        setError("");
        setResponse("");
        
         const apiUrl = '/api/generate';

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!res.ok) throw new Error(`request error, status code: ${res.status}`);

            const result = await res.json();

            if (result.candidates && result.candidates[0]?.content?.parts[0]) {
                const text = result.candidates[0].content.parts[0].text.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400">$1</strong>');
                setResponse(text);
            } else {
                // 如果后端转发了错误信息, 这里可以尝试显示
                const errorMessage = result.error || "An unexpected error occurred while processing your request.";
                throw new Error(errorMessage);
            }
        } catch (e) {
            console.error(e);
            setError(e.message || "An error occurred while processing your request.");
        } finally {
            setIsLoading(false);
            setPrompt(""); // 清空输入框
        }
    };

    const dialogVariants = {
        closed: { opacity: 0, y: 50, scale: 0.95, transitionEnd: { display: "none" } },
        open: { opacity: 1, y: 0, scale: 1, display: "flex" }
    };

    // 关键修复: 修正了FAB按钮的动画逻辑
    const fabVariants = {
        // 当对话框打开时，按钮隐藏
        dialogOpen: { opacity: 0, scale: 0.5 },
        // 当对话框关闭时，按钮显示
        dialogClosed: { opacity: 1, scale: 1 }
    };

    const transition = { type: 'spring', stiffness: 400, damping: 30 };

    return (
        <>
            {/* 聊天对话框 */}
            <motion.div
                className="fixed bottom-24 right-4 sm:right-10 bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl w-[calc(100%-2rem)] max-w-md h-auto max-h-[70vh] flex-col z-[100]"
                variants={dialogVariants}
                transition={transition}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2"><Sparkles size={20} className="text-cyan-400" /> AI Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
                </div>
                <div className="flex-grow p-4 overflow-y-auto">
                    {response ? (
                        <div className="mb-4 p-3 bg-gray-800 border border-gray-700 rounded-md">
                            <div className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: response }}></div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">Please provide your project description or personal profile, and I will offer optimization suggestions from an interviewer's point of view.</p>
                    )}
                    {isLoading && <div className="flex justify-center items-center p-4"><div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div></div>}
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>
                <div className="p-4 border-t border-gray-700 flex-shrink-0">
                    <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your content here..." className="w-full h-24 p-3 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm" disabled={isLoading} />
                    <button onClick={handleGenerate} disabled={isLoading} className="mt-2 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center">
                        {isLoading ? 'Analyzing...' : "Get optimization suggestions"}
                    </button>
                </div>
            </motion.div>

            {/* 浮动操作按钮 (FAB) */}
            <motion.button
                className="fixed bottom-4 right-4 sm:right-10 w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg z-[100]"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.15, rotate: '15deg' }}
                whileTap={{ scale: 0.9 }}
                variants={fabVariants}
                transition={transition}
                initial="dialogClosed"
                animate={isOpen ? "dialogOpen" : "dialogClosed"}
            >
                <Sparkles size={32} />
            </motion.button>
        </>
    );
};

export default FloatingAIAssistant;