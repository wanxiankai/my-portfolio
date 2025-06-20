// server/index.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

// 加载环境变量
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors()); // 允许所有来源的跨域请求 (在开发中很方便)
app.use(express.json()); // 解析 JSON 请求体

// 定义一个 API 路由来处理来自前端的请求
app.post('/api/generate', async (req, res) => {
  // 从你的服务器环境变量中安全地获取 API Key
  // 注意: 这里不再需要 VITE_ 前缀
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API Key 未配置' });
  }

  // 从前端请求体中获取用户输入的 prompt
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt 不能为空' });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  // 准备发送给 Gemini API 的数据结构
  const requestPayload = {
    contents: [{
      role: "user",
      parts: [{ text: `You are now a seasoned technical interviewer and resume optimization expert. Based on the following content, please provide 3-5 specific, actionable optimization suggestions from a professional perspective to help me better showcase my abilities and the value of my projects. Please respond in English, with clear formatting, in a professional and constructive tone.\n\nHere is the content：\n"${prompt}"` }]
    }]
  };

  try {
    // 使用 axios 向 Gemini API 发送请求
    const geminiResponse = await axios.post(apiUrl, requestPayload, {
      headers: { 'Content-Type': 'application/json' }
    });

    // 将 Gemini API 的响应直接转发给前端
    res.json(geminiResponse.data);
  } catch (error) {
    console.error('Gemini API 请求失败:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI 服务请求失败' });
  }
});

app.listen(port, () => {
  console.log(`✅ 后端代理服务正在运行于 http://localhost:${port}`);
});