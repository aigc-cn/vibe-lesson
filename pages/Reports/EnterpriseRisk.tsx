
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldExclamationIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ExclamationCircleIcon,
  ArchiveBoxIcon,
  CheckBadgeIcon,
  ListBulletIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const EnterpriseRisk: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是企事业风险预警智能体。我将基于您的行程与事件记录匹配风险库，为您输出预警及后续处理建议。' }
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
        contents: `你是一个专业的企事业风险审计专家。请根据以下出访记录评估潜在风险：${msgText}。输出应包括：风险类别、风险等级、历史对标及具体的处置建议模板。`,
        config: { systemInstruction: "你是一个冷静、严谨、善于分类管理的助手。回答应包含规范化的风险标签和处理时限建议。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "风险评估失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络响应缓慢。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-200 text-white">
            <ShieldExclamationIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">企事业风险预警</h1>
            <p className="text-sm text-gray-500">对出访中已遇或潜在风险进行二次评估与预警，分类结构化存档。</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg flex items-center space-x-2">
             <ArchiveBoxIcon className="w-4 h-4" />
             <span>归档至风险库</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-800">当前风险评估档案</h3>
              <div className="flex space-x-2">
                 <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-bold">2 个待处理建议</span>
              </div>
           </div>
           <div className="p-8 space-y-6">
              {[
                { type: '合规风险', level: '中', item: '关于知识产权归属条款的歧义', advice: '需法律部在 3 个工作日内介入核查', status: 'warning' },
                { type: '后续合作风险', level: '低', item: '外方联系人近期变动', advice: '建议建立双人联系机制以防信息断档', status: 'info' }
              ].map((r, i) => (
                <div key={i} className="flex items-start space-x-4 p-5 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/10 transition-all group">
                   <div className={`p-2 rounded-lg ${r.status === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                      <ExclamationCircleIcon className="w-5 h-5" />
                   </div>
                   <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">{r.type}</span>
                            <span className={`text-[10px] font-bold px-1.5 rounded ${r.status === 'warning' ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50'}`}>{r.level}级</span>
                         </div>
                         <button className="p-1 text-gray-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"><ArrowDownTrayIcon className="w-4 h-4"/></button>
                      </div>
                      <h4 className="font-bold text-gray-900">{r.item}</h4>
                      <p className="text-xs text-gray-500"><span className="font-bold text-gray-700">处理建议：</span>{r.advice}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
              <h3 className="font-bold mb-4 flex items-center space-x-2 text-red-400">
                 <ListBulletIcon className="w-5 h-5" />
                 <span>风险预置模板</span>
              </h3>
              <div className="space-y-3">
                 {['涉密内容识别与修正建议', '外方资信风险二次排查', '合同条款争议应急响应'].map((t, i) => (
                   <button key={i} className="w-full text-left p-3 rounded-xl border border-white/10 hover:bg-white/5 text-[11px] font-bold text-slate-300 transition-all">
                      {t}
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
              <div className="flex items-center space-x-3 mb-3">
                 <CheckBadgeIcon className="w-5 h-5 text-blue-600" />
                 <h4 className="font-bold text-blue-800 text-xs">评估结论追溯</h4>
              </div>
              <p className="text-[10px] text-blue-600 leading-relaxed">
                 所有风险评估结论均已结构化存证，支持 180 天内全链路审计与追溯。
              </p>
           </div>
        </div>
      </div>

      {/* --- AI Chatbot --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">企事业风险预警智能体</h3>
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
              <input type="text" placeholder="询问特定的出访风险评估建议..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
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

export default EnterpriseRisk;
