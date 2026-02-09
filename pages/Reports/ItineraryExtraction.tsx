
import React, { useState, useEffect, useRef } from 'react';
import { 
  MapIcon, 
  ArrowPathIcon, 
  DocumentArrowUpIcon,
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  TableCellsIcon,
  CheckBadgeIcon,
  XCircleIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

interface ItineraryItem {
  id: string;
  date: string;
  location: string;
  participants: string;
  content: string;
  status: 'planned' | 'actual' | 'deviated';
}

const MOCK_ITINERARY: ItineraryItem[] = [
  { id: '1', date: '2024-05-12', location: '慕尼黑', participants: '考察团全员、库卡高层', content: '参观库卡自动化工厂，探讨联合实验室选址', status: 'actual' },
  { id: '2', date: '2024-05-13', location: '斯图加特', participants: '招商办、博世研发部', content: '技术交流会，推介我市高新园区优惠政策', status: 'actual' },
  { id: '3', date: '2024-05-14', location: '汉堡', participants: '考察团全员', content: '原定：汉堡港参观；实际：因罢工改为线上会议', status: 'deviated' },
];

const ItineraryExtraction: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是行程数据提取智能体。请上传您的归国报告或粘贴行程记录，我将自动提取时间、地点、人员及洽谈核心并结构化入库。' }
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
        contents: `你是一个专业的行程数据解析专家。请从以下文本中提取结构化行程要素（日期、地点、参与人、事项）：${msgText}。并与原始申报计划进行简单比对，指出偏差。`,
        config: { systemInstruction: "你是一个细致、严谨的数据录入与审计专家。回答应直接提供结构化信息，并标注出任何不一致的地方。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "数据提取失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络连接失败。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200 text-white">
            <MapIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">招商行程数据提取</h1>
            <p className="text-sm text-gray-500">OCR/NLP 自动抽取归国报告要素，计划 vs 实际量化比对。</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-emerald-200 text-emerald-600 bg-emerald-50 rounded-xl text-xs font-bold hover:bg-emerald-100 flex items-center space-x-2">
             <CloudArrowUpIcon className="w-4 h-4" />
             <span>上传报告 (PDF/DOC)</span>
          </button>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg">导出 Excel</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                <TableCellsIcon className="w-5 h-5 text-blue-500" />
                <span>行程要素结构化列表</span>
              </h3>
              <div className="flex items-center space-x-2">
                 <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">3 条已验证</span>
                 <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">1 条需核对</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">时间</th>
                    <th className="px-6 py-4">地点</th>
                    <th className="px-6 py-4">参与人员</th>
                    <th className="px-6 py-4">主要洽谈内容</th>
                    <th className="px-6 py-4">计划对比</th>
                    <th className="px-6 py-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-50">
                  {MOCK_ITINERARY.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-gray-500">{item.date}</td>
                      <td className="px-6 py-4 font-bold text-gray-800">{item.location}</td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{item.participants}</td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-xs leading-relaxed">{item.content}</span>
                      </td>
                      <td className="px-6 py-4">
                        {item.status === 'actual' ? (
                          <span className="flex items-center text-emerald-600 font-bold text-[10px]"><CheckBadgeIcon className="w-3 h-3 mr-1" /> 按计划</span>
                        ) : (
                          <span className="flex items-center text-amber-600 font-bold text-[10px]"><XCircleIcon className="w-3 h-3 mr-1" /> 有偏差</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:underline font-bold text-xs">编辑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- AI Chatbot --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[420px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">行程数据提取智能体</h3>
                <p className="text-[10px] text-emerald-400 font-medium uppercase">Extraction Agent</p>
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
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <input type="text" placeholder="粘贴行程描述文本或询问比对细节..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                 <button className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 whitespace-nowrap" onClick={() => handleSendMessage('请对比分析计划行程与实际行程的偏差')}>执行偏差分析</button>
                 <button className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 whitespace-nowrap" onClick={() => handleSendMessage('从报告全文中提取所有的参与人员名单')}>提取人员名单</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all z-[100] group">
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

export default ItineraryExtraction;
