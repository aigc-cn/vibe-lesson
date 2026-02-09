
import React, { useState, useEffect, useRef } from 'react';
import { 
  UserCircleIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  TagIcon,
  ChartBarSquareIcon,
  AcademicCapIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

interface Enterprise {
  id: string;
  name: string;
  industry: string;
  scale: string;
  revenue: string;
  matchScore: number;
  tags: string[];
  strategy: string;
}

const MOCK_ENTERPRISES: Enterprise[] = [
  { id: '1', name: '德国库卡机器人 (KUKA)', industry: '工业自动化', scale: '全球性企业', revenue: '32亿欧元', matchScore: 95, tags: ['先进制造', '高技术壁垒', '合作意愿高'], strategy: '重点引进工业视觉控制联合实验室' },
  { id: '2', name: '罗伯特博世 (BOSCH)', industry: '汽车零部件/物联', scale: '全球性企业', revenue: '880亿欧元', matchScore: 82, tags: ['新能源汽车', '感知系统', '研发中心'], strategy: '推进其三电系统生产线落地我市' },
  { id: '3', name: '阿斯麦 (ASML)', industry: '半导体设备', scale: '全球性企业', revenue: '210亿欧元', matchScore: 75, tags: ['半导体', '垄断性', '合规敏感'], strategy: '主要建立后期维护技术服务站' },
];

const EnterprisePersona: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是企业画像生成智能体。请输入您感兴趣的企业名称，我将综合公开资料、行程记录及历史数据，为您生成多维深度画像。' }
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
        contents: `你是一个专业的企业画像分析智能体。请为以下企业生成深度画像分析：${msgText}。输出应包含：核心业务、财务概况、市场份额、发展战略以及与我市产业的合作契合度标签。`,
        config: { systemInstruction: "你是一个精通全球商业竞争与产业招商的专家。回答应客观、敏锐且具有极高的商业参考价值。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "生成企业画像失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "系统繁忙。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
            <UserCircleIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">意向企业画像生成</h1>
            <p className="text-sm text-gray-500">穿透公开资料与行程数据，动态生成企业全景画像与契合度评分。</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input type="text" placeholder="搜索企业名称..." className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 w-64" />
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg"><FunnelIcon className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ENTERPRISES.map((ent) => (
          <div key={ent.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all group overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors">
                 <ChartBarSquareIcon className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <div className="text-right">
                 <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">匹配契合度</p>
                 <span className="text-2xl font-black text-blue-600">{ent.matchScore}%</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2">{ent.name}</h3>
            <p className="text-xs text-gray-500 font-medium mb-4 flex items-center">
              <TagIcon className="w-3 h-3 mr-1" />
              {ent.industry} | {ent.scale}
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] text-gray-400 font-bold mb-1">年营收</p>
                    <p className="text-xs font-bold text-gray-700">{ent.revenue}</p>
                 </div>
                 <div className="p-3 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] text-gray-400 font-bold mb-1">活跃度</p>
                    <p className="text-xs font-bold text-emerald-600">极高</p>
                 </div>
              </div>
              
              <div>
                <p className="text-[10px] text-gray-400 font-bold mb-2">契合度标签</p>
                <div className="flex flex-wrap gap-1.5">
                   {ent.tags.map(tag => (
                     <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold border border-blue-100">{tag}</span>
                   ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50">
                 <p className="text-[10px] text-gray-400 font-bold mb-2">推荐招商策略</p>
                 <p className="text-xs text-gray-600 leading-relaxed italic">"{ent.strategy}"</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
               <button onClick={() => handleSendMessage(`请深度分析 ${ent.name} 的市场竞争力和近期战略变动`)} className="text-xs font-bold text-blue-600 flex items-center space-x-1 hover:underline">
                  <AcademicCapIcon className="w-4 h-4" />
                  <span>AI 深度解析</span>
               </button>
               <button className="p-1.5 hover:bg-gray-50 rounded"><LinkIcon className="w-4 h-4 text-gray-300" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* --- AI Chatbot --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">企业画像智能体</h3>
                <p className="text-[10px] text-blue-400 font-medium uppercase">Enterprise Agent</p>
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
              <input type="text" placeholder="输入企业名称进行多维画像生成..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
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

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default EnterprisePersona;
