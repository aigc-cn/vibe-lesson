
import React, { useState, useEffect, useRef } from 'react';
import { 
  IdentificationIcon, 
  ArrowPathIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  UserPlusIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const VisaSync: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是签证服务助手。我可以为您同步当前的签证办理进度，提醒材料补件，并根据目的地政策为您预审申请材料的完整性。' }
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
        contents: `你是一个专业的签证政策顾问。请分析以下签证相关咨询：${msgText}。请关注申请国家政策、常见材料痛点、面签注意事项及办理时长预估。`,
        config: { systemInstruction: "你精通各国签证政策。回答应细致、耐心且具备最新的政策敏感度。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "建议生成失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络连接失败。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <IdentificationIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">签证中心接入</h1>
            <p className="text-sm text-gray-500">集成省/市外办签证系统接口，自动拉取各团组人员签证申请与签出状态。</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center space-x-2">
          <ArrowPathIcon className="w-4 h-4" />
          <span>刷新办证进度</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center space-x-2">
             <UserPlusIcon className="w-5 h-5 text-indigo-500" />
             <span>在办人员签证明细</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">姓名 / 证件号</th>
                <th className="px-6 py-4">目的地</th>
                <th className="px-6 py-4">当前状态</th>
                <th className="px-6 py-4">申请时间</th>
                <th className="px-6 py-4 text-right">管理</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {[
                { name: '张三', id: 'G420***21', dest: '德国 (申根)', status: '已签发', date: '2024-05-10', color: 'text-emerald-600' },
                { name: '李四', id: 'G420***88', dest: '美国 (B1/B2)', status: '面试审核中', date: '2024-05-15', color: 'text-blue-600' },
                { name: '王五', id: 'G420***12', dest: '德国 (申根)', status: '材料待补件', date: '2024-05-18', color: 'text-amber-600' },
              ].map((v, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{v.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{v.id}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">{v.dest}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${v.color.replace('text', 'bg')}`}></div>
                       <span className={`font-bold ${v.color}`}>{v.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs font-mono">{v.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-blue-600 hover:underline" onClick={() => handleSendMessage(`请帮我预审人员 [${v.name}] 的签证材料完整性`)}>材料预审</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start space-x-4">
           <ExclamationTriangleIcon className="w-10 h-10 text-amber-600" />
           <div>
              <h4 className="font-bold text-amber-800">补件紧急通知</h4>
              <p className="text-xs text-amber-700 leading-loose mt-1">
                 检测到有 1 名出访人员（王五）的签证申请被签证中心标记为“材料待补”。缺失材料：[邀请函原件扫描件]。请立即联系申报人处理。
              </p>
           </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center justify-between">
           <div>
              <h4 className="font-bold text-blue-800">平均办证周期</h4>
              <p className="text-2xl font-black text-blue-900 mt-1">8.2 天</p>
              <p className="text-[10px] text-blue-600">近 30 天样本量: 124 人次</p>
           </div>
           <div className="p-3 bg-white rounded-full shadow-sm"><ClockIcon className="w-8 h-8 text-blue-300" /></div>
        </div>
      </div>

      {/* Chatbot Window */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[380px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-blue-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">签证政务助手智能体</h3>
                <p className="text-[10px] text-blue-400 font-medium uppercase">Visa Agent</p>
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
              <input type="text" placeholder="询问办理政策、补件建议..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
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

export default VisaSync;
