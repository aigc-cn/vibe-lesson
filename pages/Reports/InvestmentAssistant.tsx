
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SparklesIcon, 
  DocumentArrowDownIcon, 
  TableCellsIcon, 
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ArrowTrendingUpIcon,
  // Fix: Added missing ShieldExclamationIcon import
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { GoogleGenAI } from "@google/genai";

const MOCK_STATS = [
  { name: '对接企业', value: 12 },
  { name: '意向项目', value: 5 },
  { name: '预计金额(亿)', value: 8.5 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

const InvestmentAssistant: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是招商引资报告撰写助手。请告诉我您的出访团组、对接重点及初步成果，我将为您生成标准化报告大纲及策略建议。' }
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
        contents: `你是一个专业的招商引资归国报告辅助助手。基于以下输入生成报告框架、数据总结及下一步建议：${msgText}。请确保输出包含：对接企业统计、意向项目分析、成功案例剖析及重点跟进清单建议。`,
        config: { systemInstruction: "你是一个政府招商部门的资深报告专家。回答应专业、逻辑严密，并能从数据中洞察投资价值。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "生成报告建议失败，请稍后重试。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "连接AI助手超时。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-amber-500 rounded-2xl shadow-lg shadow-amber-200 text-white">
            <SparklesIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">招商引资报告辅助撰写助手</h1>
            <p className="text-sm text-gray-500">标准报告框架引导，数据一键图表化，生成重点跟进清单。</p>
          </div>
        </div>
        <div className="flex space-x-2">
           <button className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 flex items-center space-x-2">
              <TableCellsIcon className="w-4 h-4" />
              <span>导入行程表格数据</span>
           </button>
           <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100">
              导出 Word/PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">报告基础信息填报</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-2">出访团组名称</label>
                  <input type="text" placeholder="例：2024市级赴德招商团" className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-2">主要目的地</label>
                  <input type="text" placeholder="例：德国慕尼黑、汉堡" className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2">核心招商成果简述</label>
                <textarea rows={4} placeholder="在此输入主要对接的企业、达成的初步合作意向等..." className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <button onClick={() => handleSendMessage("根据以上信息生成一份招商报告草案")} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all">
                AI 辅助一键成稿
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6">成果数据概览 (预览)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_STATS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40}>
                    {MOCK_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold mb-4 flex items-center space-x-2">
              <ArrowTrendingUpIcon className="w-5 h-5" />
              <span>重点跟进企业清单建议</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: '德国宝马集团', status: '高优先级', task: '推进电池回收联合实验室' },
                { name: '西门子医疗', status: '高优先级', task: '确认华东生产中心选址' },
                { name: 'SAP 软件', status: '中优先级', task: '数字化转型顾问项目对接' }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-white/10 rounded-xl border border-white/10 group cursor-pointer hover:bg-white/20 transition-all">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm">{item.name}</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase">{item.status}</span>
                  </div>
                  <p className="text-[11px] text-indigo-100">任务：{item.task}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-3 flex items-center space-x-2">
               <ShieldExclamationIcon className="w-5 h-5" />
               <span>公文标准校验结果</span>
            </h4>
            <ul className="space-y-2 text-xs text-emerald-700">
               <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span>报告格式符合 [局级团组] 标准模板</span>
               </li>
               <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span>未发现涉密敏感关键词</span>
               </li>
               <li className="flex items-center space-x-2 text-amber-600">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <span>建议：补全 [后期保障计划] 必填项</span>
               </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- AI Chatbot --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">招商报告辅助智能体</h3>
                <p className="text-[10px] text-amber-400 font-medium uppercase">Drafting Agent</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400"><MinusIcon className="w-5 h-5" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-5 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-amber-400" />}
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
              <input type="text" placeholder="询问报告建议、大纲生成..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
               <button className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 whitespace-nowrap" onClick={() => handleSendMessage('请给出一个招商团组归国报告的通用框架')}>通用框架</button>
               <button className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 whitespace-nowrap" onClick={() => handleSendMessage('帮我总结本次招商活动的3个亮点建议')}>亮点建议</button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-amber-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-amber-600 hover:scale-110 transition-all z-[100] group">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default InvestmentAssistant;
