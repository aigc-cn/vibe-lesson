
import React, { useState, useEffect, useRef } from 'react';
import { 
  DocumentDuplicateIcon, 
  SparklesIcon, 
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const BureauAssistant: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是局级报告辅助撰写智能体。我可以为您提供公文模板、提炼政策要点，并协助您在报告中自动插入相关政策引用。' }
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
        contents: `你是一个专业的局级公文撰写专家。请根据以下要求提炼报告要点或生成内容草案：${msgText}。请注意符合严谨的政府公文格式，并关联最新的出国管理政策趋势。`,
        config: { systemInstruction: "你是一个严肃、权威、精通政府公文规范的助手。回答应包含标准的段落结构、政策引用建议和版式校对提示。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "内容生成失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络连接异常。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-slate-800 rounded-2xl shadow-lg shadow-slate-200 text-white">
            <DocumentDuplicateIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">局级报告辅助撰写助手</h1>
            <p className="text-sm text-gray-500">符合局级公文标准，语义提炼政策趋势，支持一键政策引用。</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 flex items-center space-x-2">
            <ListBulletIcon className="w-4 h-4" />
            <span>必填项校验</span>
          </button>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg">导出 Word (公文版式)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm min-h-[700px] flex flex-col">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-gray-900 tracking-widest border-b-2 border-red-600 pb-2 inline-block">归国报告 (局级)</h2>
            </div>
            <div className="flex-1 space-y-8 text-gray-800 leading-loose text-sm">
              <div className="space-y-2 border-b border-gray-50 pb-4">
                <p className="font-bold flex items-center text-slate-400 text-[10px] uppercase tracking-widest"><BookmarkIcon className="w-3 h-3 mr-1"/> 出访基本概况</p>
                <p className="bg-gray-50 p-4 rounded-xl italic text-gray-400">点击此处输入出访时间、地点、团组主要成员及核心任务...</p>
              </div>
              <div className="space-y-2 border-b border-gray-50 pb-4">
                <p className="font-bold flex items-center text-slate-400 text-[10px] uppercase tracking-widest"><BookmarkIcon className="w-3 h-3 mr-1"/> 任务执行与成效</p>
                <p className="bg-gray-50 p-4 rounded-xl italic text-gray-400">详细描述公务活动开展情况、达成的协议或合作意向...</p>
              </div>
              <div className="space-y-2">
                <p className="font-bold flex items-center text-slate-400 text-[10px] uppercase tracking-widest"><BookmarkIcon className="w-3 h-3 mr-1"/> 政策建议与后续安排</p>
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start space-x-3">
                   <SparklesIcon className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                   <div>
                      <p className="text-blue-800 font-bold mb-1">AI 提炼建议段落 (点击插入)</p>
                      <p className="text-blue-600 text-xs leading-relaxed">“基于本次对欧洲工业4.0的考察，建议我市在下一阶段外事工作中，重点加强与德国萨克森州的先进制造业人才互换协议...”</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl">
             <h3 className="font-bold mb-4 flex items-center space-x-2 text-indigo-300">
                <CpuChipIcon className="w-5 h-5" />
                <span>政策关联要点简报</span>
             </h3>
             <div className="space-y-4">
                {[
                  { tag: '核心', content: '《因公临时出国管理条例》2024修正案中对成果转化有最新界定。', ref: '见第12条' },
                  { tag: '趋势', content: '近期市级决策更加侧重“高水平科技自立自强”相关出访任务。', ref: '语义分析结果' }
                ].map((p, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] px-1.5 py-0.5 bg-indigo-500 rounded font-bold">{p.tag}</span>
                      <span className="text-[9px] text-indigo-400">{p.ref}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">{p.content}</p>
                    <button className="mt-2 text-[9px] font-bold text-blue-400 hover:text-blue-300">一键插入引用</button>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                <span>版式检查清单</span>
             </h4>
             <ul className="space-y-3">
                <li className="flex items-center space-x-2 text-xs text-emerald-600">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                   <span>标题字号符合 [方正小标宋简体] 标准</span>
                </li>
                <li className="flex items-center space-x-2 text-xs text-amber-500 font-bold">
                   <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                   <span>缺失：正文第二部分 [必填项] 尚未填写</span>
                </li>
                <li className="flex items-center space-x-2 text-xs text-emerald-600">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                   <span>已自动识别并纠正 3 处术语错别字</span>
                </li>
             </ul>
          </div>
        </div>
      </div>

      {/* --- AI Chatbot --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-blue-400" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">局级报告辅助智能体</h3>
                <p className="text-[10px] text-blue-400 font-medium uppercase tracking-widest">Bureau Agent</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400"><MinusIcon className="w-5 h-5" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-5 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-blue-400" />}
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
              <input type="text" placeholder="询问公文模版、政策提炼..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-800 hover:scale-110 transition-all z-[100] group">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default BureauAssistant;
