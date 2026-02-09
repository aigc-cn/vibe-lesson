
import React, { useState, useEffect, useRef } from 'react';
import { 
  CalculatorIcon, 
  FireIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ArrowTrendingUpIcon,
  NumberedListIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const PointCalculation: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是积分价值评估智能体。请提供成果的核心参数（如技术领域、预计转化金额、政策契合度等），我将基于积分规则引擎为您计算积分估值并生成评估说明。' }
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
        contents: `你是一个专业的积分价值评估专家。请基于以下成果参数计算积分：${msgText}。输出包含：计算公式引用、积分基础值、加成项分析、最终建议分值以及异常预警提示。`,
        config: { systemInstruction: "你是一个极其严谨的审计助手。你的目标是确保积分分配合理、公平，并能识别出可能的刷分或虚假成果行为。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "积分评估失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络超时，积分计算引擎正在排队中。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-100 text-white">
            <CalculatorIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">积分价值计算</h1>
            <p className="text-sm text-gray-500">智能价值评估引擎，实现积分自动计算、账户明细查询及异常审计。</p>
          </div>
        </div>
        <div className="flex space-x-2">
           <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg">导出积分明细 (Excel)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '系统总积分池', value: '1.4M', color: 'text-blue-600' },
          { label: '人均获取积分', value: '2.4k', color: 'text-indigo-600' },
          { label: '本月发放积分', value: '45.2k', color: 'text-emerald-600' },
          { label: '待处理复核项', value: '12', color: 'text-amber-600' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">{kpi.label}</p>
            <p className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-800">最新积分变动记录</h3>
              <button onClick={() => setIsChatOpen(true)} className="flex items-center space-x-1 text-[10px] font-bold text-blue-600 hover:underline">
                 <ArrowTrendingUpIcon className="w-3 h-3" />
                 <span>价值评估 Agent 介入</span>
              </button>
           </div>
           <div className="p-0">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                       <tr>
                          <th className="px-6 py-4">时间</th>
                          <th className="px-6 py-4">单位 / 个人</th>
                          <th className="px-6 py-4">关联成果</th>
                          <th className="px-6 py-4">积分</th>
                          <th className="px-6 py-4 text-right">状态</th>
                       </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-50">
                       {[
                         { time: '10:45:12', user: '市经信局-张明', result: '工业机器人算法合作项', points: '+500', status: 'Auto' },
                         { time: '09:30:00', user: '某新能源公司', result: '光伏并网专利包', points: '+320', status: 'Manual' },
                         { time: '昨天', user: '王伟', result: '提供东南亚招商线索', points: '+20', status: 'Auto' },
                       ].map((row, i) => (
                         <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 text-[10px] font-mono text-gray-400">{row.time}</td>
                            <td className="px-6 py-4 font-bold text-gray-700">{row.user}</td>
                            <td className="px-6 py-4 text-xs text-gray-500">{row.result}</td>
                            <td className="px-6 py-4 font-black text-blue-600">{row.points}</td>
                            <td className="px-6 py-4 text-right">
                               <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${row.status === 'Auto' ? 'bg-blue-50 text-blue-500' : 'bg-amber-50 text-amber-500'}`}>{row.status}</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl h-full flex flex-col justify-between">
              <div>
                 <h3 className="font-bold mb-6 flex items-center space-x-2 text-indigo-400">
                    <NumberedListIcon className="w-5 h-5" />
                    <span>积分奖励排行 (Top 3)</span>
                 </h3>
                 <div className="space-y-6">
                    {[
                      { user: '市经信局', points: '124.5k', change: '+12%' },
                      { user: '科技成果中心', points: '98.2k', change: '+5%' },
                      { user: '某高新园区', points: '85.4k', change: '+18%' }
                    ].map((top, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${i === 0 ? 'bg-yellow-400 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>{i+1}</div>
                            <span className="text-xs font-bold">{top.user}</span>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-black text-blue-400">{top.points}</p>
                            <p className="text-[9px] text-emerald-500">{top.change}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <button className="mt-12 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-bold transition-all">查看完整势力榜</button>
           </div>
        </div>
      </div>

      {/* AI Agent Chat UI for Points Valuation */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">积分价值评估智能体</h3>
                <p className="text-[10px] text-emerald-400 font-medium uppercase">Value Agent</p>
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
              <input type="text" placeholder="描述成果核心数据，让我计算建议积分..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-600 hover:scale-110 transition-all z-[100] group">
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

export default PointCalculation;
