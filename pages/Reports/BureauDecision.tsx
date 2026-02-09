
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowTrendingUpIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  ClockIcon,
  ScaleIcon,
  ArrowRightIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const BureauDecision: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是市级决策建议分级智能体。请提供出访成果或待审报告摘要，我将为您评估决策优先级并给出具体的操作建议。' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isChatOpen]);

  const handleSendMessage = async (text?: string) => {
    const msgText = text || input;
    if (!msgText.trim()) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msgText }]);
    setIsTyping(true);
    setIsChatOpen(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `你是一个专业的决策咨询助手。请分析以下内容并给出分级决策建议（紧急/重要/常规/非必要）：${msgText}。请包含原因分析、处理优先级和具体的后续操作步骤清单。`,
        config: { systemInstruction: "你是一个逻辑严密、洞察敏锐的决策咨询专家。回答应结构化，重点突出决策依据和风险预判。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "建议生成失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络超时。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
            <ScaleIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">市级决策建议分级</h1>
            <p className="text-sm text-gray-500">结合历史对比与政策要点，生成紧急、重要、常规、非必要四级决策建议。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { level: '紧急', count: 2, color: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50' },
          { level: '重要', count: 5, color: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50' },
          { level: '常规', count: 12, color: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50' },
          { level: '非必要', count: 3, color: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-50' },
        ].map((item, i) => (
          <div key={i} className={`${item.bg} p-6 rounded-2xl border border-white shadow-sm flex flex-col items-center justify-center group hover:scale-105 transition-transform cursor-pointer`}>
             <span className={`${item.text} text-xs font-black uppercase mb-1`}>{item.level}建议</span>
             <span className="text-3xl font-black text-gray-900">{item.count}</span>
             <div className={`mt-4 w-8 h-1 ${item.color} rounded-full`}></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">最新决策建议详情</h3>
          <button className="text-xs font-bold text-blue-600 flex items-center">配置建议模板 <ArrowRightIcon className="w-3 h-3 ml-1"/></button>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { project: '赴德先进制造业人才引进协议', level: '重要', reason: '符合我市“工业倍增计划”核心导向', next: '转市委人才办会审', time: '2小时前' },
            { project: '东南亚低端纺织业转移观察', level: '常规', reason: '属常态化经贸往来，无重大政策突破', next: '部门归档备查', time: '5小时前' },
            { project: '紧急：某合资实验室知识产权争议', level: '紧急', reason: '涉及核心技术流流失风险，需市领导紧急批示', next: '立即呈报分管副市长', time: '10分钟前' }
          ].map((item, i) => (
            <div key={i} className="p-6 flex items-start justify-between hover:bg-gray-50/50 transition-colors group">
               <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      item.level === '紧急' ? 'bg-red-100 text-red-600' : item.level === '重要' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>{item.level}</span>
                    <h4 className="font-bold text-gray-900">{item.project}</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed"><span className="font-bold text-gray-400">决策依据：</span>{item.reason}</p>
                  <p className="text-xs text-blue-600 font-bold flex items-center"><ClockIcon className="w-3 h-3 mr-1"/> 下一步：{item.next}</p>
               </div>
               <div className="text-right">
                  <span className="text-[10px] font-mono text-gray-400">{item.time}</span>
                  <div className="mt-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-white border border-gray-100 rounded shadow-sm hover:text-blue-600" onClick={() => handleSendMessage(`深入分析该项目的决策分级逻辑：${item.project}`)}><CpuChipIcon className="w-4 h-4" /></button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- AI Chatbot --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[420px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">市级决策建议分级智能体</h3>
                <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-widest">Decision Agent</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400"><MinusIcon className="w-5 h-5" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-5 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm border whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' : 'bg-white text-gray-800 border-gray-100 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && <div className="animate-pulse flex space-x-2 pl-12"><div className="w-2 h-2 bg-gray-400 rounded-full"/><div className="w-2 h-2 bg-gray-400 rounded-full"/><div className="w-2 h-2 bg-gray-400 rounded-full"/></div>}
          </div>
          <div className="p-5 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="输入出访任务进行智能评级..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all z-[100] group">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default BureauDecision;
