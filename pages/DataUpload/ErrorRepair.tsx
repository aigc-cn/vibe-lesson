
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldExclamationIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  TableCellsIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const ErrorRepair: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是错误数据检查智能体。我可以深度扫描上传的批次数据，识别并修复格式或逻辑错误，并针对复杂问题给出修正建议。' }
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
        contents: `你是一个专业的政务数据质量专家。请分析以下数据上传中的错误项并给出修复建议：${msgText}。请重点关注逻辑错误纠正方案，并生成标准的修复指令。`,
        config: { systemInstruction: "你熟悉结构化数据质量管理。回答应包含：1. 错误原因分析 2. 建议修复方法 3. 预防类似错误的系统配置建议。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "AI 分析失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络超时，无法连接智能体。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFixAll = () => {
    setIsFixing(true);
    setTimeout(() => setIsFixing(false), 2000);
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-160px)] pb-12">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-100 text-white">
            <ShieldExclamationIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">错误数据拦截修复</h1>
            <p className="text-sm text-gray-500">实时拦截批处理中的异常数据，AI 智能引擎辅助自动纠错与风险分类。</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleFixAll}
            disabled={isFixing}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {isFixing ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : <CheckCircleIcon className="w-4 h-4" />}
            <span>{isFixing ? '正在批量修复中...' : '一键修复简单项'}</span>
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl text-xs font-bold hover:bg-gray-50 transition-all flex items-center space-x-2">
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>导出错误清单</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
           <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                 <TableCellsIcon className="w-5 h-5 text-red-500" />
                 <span>待处理错误列表</span>
              </h3>
              <div className="flex items-center space-x-2">
                 <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-black">12 条待审</span>
                 <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-black">24 条已修</span>
              </div>
           </div>
           <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-tighter border-b border-gray-100">
                    <tr>
                       <th className="px-6 py-4">批次 ID</th>
                       <th className="px-6 py-4">错误类型</th>
                       <th className="px-6 py-4">原始内容</th>
                       <th className="px-6 py-4">建议修正</th>
                       <th className="px-6 py-4 text-right">状态</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm divide-y divide-gray-50">
                    {[
                      { batch: 'UP-00241', type: '逻辑冲突', original: '回访日期早于出发日期', suggestion: '核对起止日期逻辑顺序', status: 'Pending' },
                      { batch: 'UP-00241', type: '格式错误', original: '金额项含特殊符号 ($)', suggestion: '系统已提取纯数值 (12540.00)', status: 'Auto-Fixed' },
                      { batch: 'UP-00241', type: '权限异常', original: '申报单位不在白名单内', suggestion: '需管理员手动关联所属单位', status: 'Pending' },
                      { batch: 'UP-00238', type: '涉密检测', original: '正文包含限制出口参数', suggestion: '执行模糊化脱敏策略', status: 'Pending' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 font-mono text-[10px] text-gray-400">{row.batch}</td>
                        <td className="px-6 py-4">
                           <span className={`text-[10px] font-black ${row.type === '涉密检测' ? 'text-purple-600' : 'text-gray-700'}`}>{row.type}</span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500 truncate max-w-[150px]">{row.original}</td>
                        <td className="px-6 py-4 text-xs font-bold text-blue-600">{row.suggestion}</td>
                        <td className="px-6 py-4 text-right">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                             row.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                           }`}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="font-bold mb-6 flex items-center space-x-2 text-indigo-400">
                 <ExclamationTriangleIcon className="w-5 h-5" />
                 <span>异常分类统计图</span>
              </h3>
              <div className="space-y-6">
                 {[
                   { label: '逻辑冲突', count: 4, percent: 35, color: 'bg-red-500' },
                   { label: '格式合规', count: 12, percent: 85, color: 'bg-blue-500' },
                   { label: '安全预警', count: 2, percent: 12, color: 'bg-purple-500' },
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                         <span className="text-slate-400">{stat.label}</span>
                         <span className="text-white">{stat.count} 项</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full ${stat.color}`} style={{ width: `${stat.percent}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <button 
             onClick={() => setIsChatOpen(true)}
             className="w-full p-8 bg-indigo-600 rounded-3xl text-white shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex flex-col items-center justify-center group"
           >
              <CpuChipIcon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-black tracking-tight">召唤数据审计智能体</h4>
              <p className="text-[10px] text-indigo-200 mt-2">基于 Gemini 3 Pro 深度诊断错误逻辑</p>
           </button>
        </div>
      </div>

      {/* --- AI Chatbot Floating Window --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">错误数据检查智能体</h3>
                <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-widest">Data Audit Agent</p>
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
              <input type="text" placeholder="描述特定异常数据项..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-indigo-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
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

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ErrorRepair;
