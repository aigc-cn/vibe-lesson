import React, { useState, useEffect, useRef } from 'react';
import { 
  FunnelIcon, 
  MagnifyingGlassIcon, 
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  TagIcon,
  GlobeAltIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  // Fix: Added missing MinusIcon import
  MinusIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const Discovery: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是语义检索引领智能体。您可以直接描述您的需求，例如“帮我找德国先进制造领域的合作成果”，我将为您自动生成结构化筛选条件并推荐语义相关的成果。' }
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
        contents: `你是一个专业的成果检索助手。请解析用户的查询意图：${msgText}。输出包含：关键词提取、可能的所属分类、建议的筛选条件（如时间、地域、密级）以及语义相关的成果摘要建议。`,
        config: { systemInstruction: "你是一个精通NLP和向量检索的助手。你的目标是理解用户的模糊意图并将其转化为结构化的检索条件。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "语义解析失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "系统繁忙，检索服务暂时不可用。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
           <input
             type="text"
             placeholder="搜索成果标题、摘要、关键词、负责人..."
             className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
           />
           <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-3.5" />
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
           <button onClick={() => setIsChatOpen(true)} className="flex items-center space-x-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100">
              <CpuChipIcon className="w-5 h-5" />
              <span>语义检索</span>
           </button>
           <button className="p-4 bg-gray-100 rounded-2xl text-gray-400 hover:bg-gray-200"><FunnelIcon className="w-6 h-6" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-black text-gray-800 text-xs uppercase tracking-widest mb-6">高级筛选维度</h4>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-3">合作国家 / 地区</label>
                    <div className="space-y-2">
                       {['德国', '东南亚', '阿联酋', '美国'].map(c => (
                         <label key={c} className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" className="rounded text-blue-600 border-gray-300" />
                            <span className="text-xs text-gray-600 group-hover:text-blue-600">{c}</span>
                         </label>
                       ))}
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-3">密级限制</label>
                    <select className="w-full bg-gray-50 border-0 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 focus:ring-0">
                       <option>全部密级</option>
                       <option>公开 (Public)</option>
                       <option>内部 (Internal)</option>
                       <option>秘密 (Secret)</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-3">转化状态</label>
                    <div className="flex flex-wrap gap-2">
                       {['已发布', '撮合中', '已签约', '落地中'].map(s => (
                         <button key={s} className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-[9px] font-bold border border-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-colors">{s}</button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-9 space-y-6">
           <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-400">检索到 <span className="text-blue-600">42</span> 项相关成果</p>
              <div className="flex items-center space-x-2 text-[10px] font-bold">
                 <button className="text-blue-600">相关度排序</button>
                 <span className="text-gray-300">|</span>
                 <button className="text-gray-400">最新发布</button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: '工业机器人感知控制专利包', category: '先进制造', region: '德国', time: '2024-05-12', match: '98%', status: '已发布' },
                { title: '新型钙钛矿电池光伏转换效率优化', category: '绿色能源', region: '东南亚', time: '2024-05-10', match: '85%', status: '撮合中' },
                { title: '跨国区块链清算协议标准', category: '数字经济', region: '全球', time: '2024-05-08', match: '72%', status: '已签约' },
                { title: '智慧农业物流无人机路径优化算法', category: '现代农业', region: '巴西', time: '2024-05-05', match: '65%', status: '已发布' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
                   <div className="flex justify-between items-start mb-4">
                      <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${
                        item.status === '已签约' ? 'bg-emerald-100 text-emerald-700' : 
                        item.status === '撮合中' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>{item.status}</span>
                      <span className="text-[10px] text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded">语义匹配 {item.match}</span>
                   </div>
                   <h4 className="font-bold text-gray-800 mb-6 group-hover:text-blue-600 line-clamp-2 h-10 leading-tight transition-colors">{item.title}</h4>
                   <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-50 pt-4">
                      <div className="flex items-center space-x-3">
                         <span className="flex items-center"><TagIcon className="w-3 h-3 mr-1" />{item.category}</span>
                         <span className="flex items-center"><GlobeAltIcon className="w-3 h-3 mr-1" />{item.region}</span>
                      </div>
                      <span>{item.time}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* AI Semantic Search Agent Chat UI */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[420px] h-[min(700px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">语义检索引领智能体</h3>
                <p className="text-[10px] text-indigo-400 font-medium uppercase">Search Intelligence</p>
              </div>
            </div>
            {/* Fix: Added missing MinusIcon import */}
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
              <input type="text" placeholder="描述您的检索意图，例如：'高价值的AI相关成果'..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default Discovery;