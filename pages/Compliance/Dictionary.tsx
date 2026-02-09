
import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpenIcon, 
  SparklesIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  MagnifyingGlassIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const Dictionary: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是表述规范性智能体。我可以帮您检查报告中的术语是否标准，并协助纠正非规范的公文表达。请粘贴您需要润色的段落。' }
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
        contents: `你是一个专业的政府公文校对专家。请检查以下文本中的术语规范性及表达逻辑：${msgText}。请给出修改前后的对比及依据。`,
        config: { systemInstruction: "你熟悉《党政机关公文处理工作条例》，回答应严谨且提供具体的规范用语库对比。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "校对失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络超时。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 min-h-[calc(100vh-160px)] relative">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <BookOpenIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">表述规范性字典</h1>
            <p className="text-sm text-gray-500">统一公文术语标准，在线纠偏口语化表达，确保报告严谨专业。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
                 <MagnifyingGlassIcon className="w-5 h-5 text-blue-500" />
                 <span>标准术语速查</span>
              </h3>
              <div className="relative mb-8">
                 <input type="text" placeholder="输入术语关键词，如“成果转化”..." className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500" />
                 <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-3.5" />
              </div>
              <div className="space-y-4">
                 {[
                   { term: '成果转化', standard: 'Technology Transfer', usage: '指为提高生产力水平而对科学研究与技术开发所产生的具有实用价值的科技成果所进行的后续试验、开发、应用、推广直至形成新产品、新工艺、新材料，发展新产业等活动。' },
                   { term: '双边经贸', standard: 'Bilateral Trade', usage: '特指出访地与我市之间直接发生的经济贸易往来。' }
                 ].map((t, i) => (
                   <div key={i} className="p-4 rounded-2xl border border-gray-50 hover:border-indigo-100 transition-all group">
                      <div className="flex justify-between items-center mb-2">
                         <h4 className="font-black text-gray-800 group-hover:text-indigo-600">{t.term}</h4>
                         <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{t.standard}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{t.usage}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="font-bold mb-4 flex items-center space-x-2 text-indigo-400">
                 <SparklesIcon className="w-5 h-5" />
                 <span>智能校对历史</span>
              </h3>
              <div className="space-y-4">
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 italic text-[11px] text-slate-300">
                    "已将 '我们见了很多人' 优化为 '双方进行了广泛的业务交流与人员对接'..."
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* --- AI Chatbot Floating Window --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[380px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">规范性校对助手</h3>
                <p className="text-[10px] text-indigo-400 font-medium uppercase">Lexicon Agent</p>
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
              <input type="text" placeholder="在此输入需要规范的文字..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-indigo-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 hover:scale-110 transition-all z-[100] group">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default Dictionary;
