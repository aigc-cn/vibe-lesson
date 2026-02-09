
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldExclamationIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ExclamationTriangleIcon,
  DocumentArrowDownIcon,
  ClockIcon,
  LightBulbIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const BureauRisk: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是局级报告风险预警智能体。我将结合历史风险案例与本次行程，为您识别落地风险及后续合作隐患，并输出处置建议。' }
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
        contents: `你是一个专业的出访风险评估专家。请评估以下局级出访报告的潜在风险：${msgText}。输出应包含风险等级、历史类似案例比对、针对性的处置方案及预防后续隐患的建议。`,
        config: { systemInstruction: "你是一个经验丰富、考虑周全的政府风险防控助手。回答应包含风险档案链接（模拟）和具体的干预流程步骤。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "预警生成失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "服务连接超时。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-200 text-white">
            <ShieldExclamationIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">局级报告风险预警</h1>
            <p className="text-sm text-gray-500">基于历史风险案例评估成果落地、后续合作及政策性合规风险。</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg">导出风险档案</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                 <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                 <span>正在识别的重大风险点</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-400">更新于: 5分钟前</span>
            </div>
            <div className="space-y-6">
              {[
                { title: '成果落地偏差风险', desc: '报告提及的德方投资协议，与近期欧盟制造业外流趋势不符。', level: '高风险' },
                { title: '敏感政策触碰预警', desc: '涉及核心技术交换的部分条款可能触及我方最新的对外技术出口管制清单。', level: '中风险' }
              ].map((r, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-white hover:border-red-100 transition-colors">
                  <div className="flex justify-between mb-2">
                    <h4 className="text-sm font-bold text-gray-900">{r.title}</h4>
                    <span className="text-[10px] font-bold text-red-600 px-2 py-0.5 bg-red-50 rounded">{r.level}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
                  <button className="mt-3 text-[10px] font-bold text-blue-600 hover:underline" onClick={() => handleSendMessage(`请详细解读风险点：${r.title}`)}>查看 AI 分析与处置建议</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
             <h3 className="font-bold mb-6 flex items-center space-x-2 text-blue-400">
                <LightBulbIcon className="w-5 h-5" />
                <span>历史风险案例库匹配</span>
             </h3>
             <div className="space-y-4">
                {[
                  { case: '2023年某省赴德考察成果中止案例', match: '88% 相似' },
                  { case: '某市科技团知识产权冲突预警回顾', match: '72% 相似' }
                ].map((c, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                     <p className="text-xs font-bold text-slate-100 mb-1">{c.case}</p>
                     <p className="text-[10px] text-blue-400">{c.match}</p>
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-2 border border-blue-500/30 rounded-xl text-[10px] font-bold text-blue-400 hover:bg-blue-500/10 transition-colors">查看更多关联案例</button>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center space-x-3">
             <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <ArrowPathIcon className="w-6 h-6 text-emerald-600" />
             </div>
             <div>
                <p className="text-xs font-bold text-emerald-800">实时处置建议引擎</p>
                <p className="text-[10px] text-emerald-600">已匹配 3 套标准处置预案，支持一键嵌入报告。</p>
             </div>
          </div>
        </div>
      </div>

      {/* --- AI Chatbot --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[420px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">局级报告风险预警智能体</h3>
                <p className="text-[10px] text-red-400 font-medium uppercase tracking-widest">Risk Agent</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400"><MinusIcon className="w-5 h-5" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-5 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-red-400" />}
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
              <input type="text" placeholder="询问特定风险详情或处置流程..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all z-[100] group">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default BureauRisk;
