
import { GoogleGenAI, Type } from "@google/genai";

export const getEnvironmentAssessment = async (country: string) => {
  // Initialize GoogleGenAI inside the function to ensure up-to-date API key usage as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `对${country}进行出访安全与政治环境评估。请提供：1.安全评分(0-100) 2.政治稳定性(0-100) 3.对华友好度(0-100) 4.三条关键预警 5.具体建议。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          safetyScore: { type: Type.NUMBER },
          politicalStability: { type: Type.NUMBER },
          friendlyScore: { type: Type.NUMBER },
          warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.STRING }
        },
        required: ["safetyScore", "politicalStability", "friendlyScore", "warnings", "suggestions"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const getCultureEconomicAssessment = async (country: string) => {
  // Initialize GoogleGenAI inside the function to ensure up-to-date API key usage
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `评估${country}的人文历史与经济综合情况。请提供：1.经济合作潜力指数(0-100) 2.重点合作行业清单 3.文化禁忌与敏感话题 4.社交礼仪要点 5.媒体沟通建议。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          economicScore: { type: Type.NUMBER },
          industries: { type: Type.ARRAY, items: { type: Type.STRING } },
          taboos: { type: Type.ARRAY, items: { type: Type.STRING } },
          etiquette: { type: Type.STRING },
          mediaAdvice: { type: Type.STRING }
        },
        required: ["economicScore", "industries", "taboos", "etiquette", "mediaAdvice"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const getInviterAssessment = async (inviterInfo: string) => {
  // Initialize GoogleGenAI inside the function to ensure up-to-date API key usage
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `根据以下邀请方信息进行综合评估：${inviterInfo}。请提供：1.综合实力评分(0-100) 2.资源优势匹配度 3.历史合作记录分析(模拟) 4.三个谈判要点 5.潜在风险提示。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strengthScore: { type: Type.NUMBER },
          matchScore: { type: Type.NUMBER },
          historyAnalysis: { type: Type.STRING },
          negotiationPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          risks: { type: Type.STRING }
        },
        required: ["strengthScore", "matchScore", "historyAnalysis", "negotiationPoints", "risks"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const interpretPolicy = async (query: string) => {
  // Initialize GoogleGenAI inside the function to ensure up-to-date API key usage
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `解读以下出国管理政策或疑问：${query}。请按“背景、核心条款、实操建议、风险点”四个维度回答。`,
  });
  return response.text;
};

export const generateReportDraft = async (data: any, type: 'bureau' | 'enterprise' | 'investment') => {
  // Initialize GoogleGenAI inside the function to ensure up-to-date API key usage
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `根据以下出访数据生成一份${type === 'bureau' ? '局级' : type === 'investment' ? '招商引资' : '企事业'}归国报告草稿：${JSON.stringify(data)}。`,
  });
  return response.text;
};
