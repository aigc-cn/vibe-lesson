
import React, { useState, useEffect, useRef } from 'react';
import { 
  SparklesIcon, 
  PencilSquareIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const EnterpriseAssistant: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是企事业团组报告撰写助手。请告诉我您的行程收获或感悟，我将为您润色心得，并协助编排后续工作计划。' }
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
        contents: `你是一个专业的企事业团组工作报告助手。请根据以下内容生成或润色报告的心得感悟及后续计划：${msgText}。要求语言朴实、成效量化、计划具体。`,
        config: { systemInstruction: "你是一个亲切、高效、善于总结工作成果的助手。回答应包含清晰的时间节点、责任人和具体的转化目标建议。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "润色建议生成失败。" }]);
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
          <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200 text-white">
            <PencilSquareIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">企事业团组辅助撰写助手</h1>
            <p className="text-sm text-gray-500">简洁模板清晰呈现行程与成果，心得感悟引导，保障成果转化。</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100">导出 PDF/Word</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 block mb-1">行程安排与执行</label>
              <textarea rows={4} placeholder="例如：10月12日 参观新加坡科技园..." className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 block mb-1">交流收获与合作联系</label>
              <textarea rows={4} placeholder="描述对接单位、初步达成的意向内容..." className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-400">心得感悟 (AI 引导)</label>
                <button className="text-[10px] text-blue-600 font-bold" onClick={() => handleSendMessage('请基于以上行程收获引导我写一段心得感悟')}>生成心得引导</button>
             </div>
             <textarea rows={3} placeholder="输入您的初步感悟，让 AI 协助润色..." className="w-full px-4 py-3 bg-blue-50/30 border border-blue-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-50">
             <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-800 flex items-center space-x-2">
                   <CalendarIcon className="w-5 h-5 text-emerald-500" />
                   <span>后续工作计划</span>
                </h4>
                <button className="p-1 bg-emerald-50 text-emerald-600 rounded-lg"><PlusIcon className="w-4 h-4" /></button>
             </div>
             <div className="space-y-3">
                {[
                  { task: '完成协议法律审查', owner: '李部长', deadline: '2024-06-15' },
                  { task: '组织二次线上技术细节对接', owner: '张经理', deadline: '2024-06-30' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                       <input type="checkbox" className="rounded text-emerald-500" />
                       <span className="text-xs font-bold text-gray-700">{item.task}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-[10px] text-gray-400">
                       <span className="bg-white px-2 py-1 rounded border border-gray-100">{item.owner}</span>
                       <span className="font-mono">{item.deadline}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-xl">
              <h3 className="font-bold mb-4 flex items-center space-x-2 text-emerald-400">
                 <SparklesIcon className="w-5 h-5" />
                 <span>报告生成建议</span>
              </h3>
              <p className="text-xs text-emerald-100 leading-loose mb-6">
                 检测到您的合作意向中包含“碳中和技术”，AI 建议在后续计划中增加“申请专项财政补助”事项。
              </p>
              <button className="w-full py-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold hover:bg-emerald-500 transition-all shadow-lg">一键润色整篇报告</button>
           </div>
        </div>
      </div>

      {/* --- AI Chatbot --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">企事业团组辅助智能体</h3>
                <p className="text-[10px] text-emerald-400 font-medium uppercase tracking-widest">Enterprise Agent</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400"><MinusIcon className="w-5 h-5" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-5 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-emerald-400" />}
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
              <input type="text" placeholder="提供行程内容，让我协助润色..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all z-[100] group">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default EnterpriseAssistant;
