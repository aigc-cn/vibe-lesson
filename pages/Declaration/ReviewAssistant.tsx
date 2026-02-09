
import React, { useState, useEffect, useRef } from 'react';
import { 
  ExclamationTriangleIcon, 
  CheckBadgeIcon, 
  ArrowTrendingUpIcon,
  TableCellsIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserIcon,
  CpuChipIcon,
  XMarkIcon,
  ChevronDoubleRightIcon,
  HandThumbUpIcon,
  ArrowPathIcon,
  MinusIcon
} from '@heroicons/react/24/outline';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { GoogleGenAI } from "@google/genai";

const COMPARISON_DATA = [
  { name: '人均费用 (k)', current: 45, average: 38 },
  { name: '出访天数 (d)', current: 12, average: 10 },
  { name: '团组人数 (p)', current: 6, average: 5 },
  { name: '任务相似度 (%)', current: 85, average: 60 },
];

const ReviewAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是您的AI审核助手。您可以询问我关于当前待审任务的合规性、风险点或历史对标详情。' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `你是一个专业的出国业务审核助手。基于当前上下文（项目：中东新能源市场考察，单位：能源发展集团，目的地风险：高，经费超标：25%），回答用户的审核咨询：${userMessage}`,
        config: {
          systemInstruction: "你是一个严肃、专业且细致的外事业务审核专家。你的回答应该基于现有的外事管理政策，重点关注合规性、预算合理性和安全风险。回答要简洁有力。"
        }
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "抱歉，我现在无法处理您的请求。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "系统繁忙，请稍后再试。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* 页面头部 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">审核助手</h1>
          <p className="text-sm text-gray-500">智能辅助审核：整合风险预判、对标分析与全局 AI 对话助手。</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold border border-blue-100 hover:bg-blue-100 transition-all">
            配置风险规则表
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center space-x-2">
            <TableCellsIcon className="w-4 h-4" />
            <span>生成《审核参考比对表》</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 主要分析内容占用全部宽度 */}
        <div className="lg:col-span-12 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">当前待审任务风险概览</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">项目名称</th>
                    <th className="px-6 py-4">目的地风险</th>
                    <th className="px-6 py-4">经费超标率</th>
                    <th className="px-6 py-4">敏感度</th>
                    <th className="px-6 py-4 text-right">状态</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-50">
                  <tr className="bg-blue-50/30">
                    <td className="px-6 py-4 font-bold text-gray-800">中东新能源市场考察</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600">高风险</span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-red-500">+25%</td>
                    <td className="px-6 py-4">
                       <div className="flex items-center space-x-2">
                         <div className="flex-1 h-1.5 bg-gray-100 rounded-full w-48 overflow-hidden">
                           <div className="h-full bg-red-500" style={{ width: '85%' }}></div>
                         </div>
                         <span className="text-[10px] text-gray-400">85</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold">待复核</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-gray-800">智能比对分析 (近3年对标)</h3>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COMPARISON_DATA} barGap={12}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip />
                    <Bar dataKey="current" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
                    <Bar dataKey="average" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="text-sm font-bold text-red-800">高风险国家预警</h4>
                </div>
                <p className="text-xs text-red-700 leading-loose">
                  检测到目的地 [叙利亚] 处于最新安全负面名单。根据外交部最新通报，该地区存在严重不确定性，建议审批意见中明确要求增加“行前应急保障方案”及“归口单位主要领导签字承诺”。
                </p>
                <div className="mt-4 flex space-x-2">
                   <button className="text-[10px] font-bold text-red-600 border border-red-200 px-3 py-1 rounded bg-white">查看风险详情</button>
                </div>
              </div>
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <ArrowPathIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="text-sm font-bold text-amber-800">历史处理建议库</h4>
                </div>
                <p className="text-xs text-amber-700 leading-loose">
                  针对 25% 经费超标，系统匹配到 14 条类似修正记录。建议：优先调减与核心公务无关的境外逗留时间（如往返转机冗余）；或要求出访单位在归口经费包内自行调剂，不增加额外财政预算。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 全局悬浮 AI Chatbot --- */}
      
      {/* 浮窗容器 - 使用 fixed 固定在视口右下角 */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[380px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          {/* 浮窗头部 */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <CpuChipIcon className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">AI 审核助手</h3>
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] text-blue-400 font-medium uppercase tracking-widest">Active Intelligence</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400">
                <MinusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 浮窗对话内容 */}
          <div 
            ref={scrollRef}
            className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-5 scroll-smooth custom-scrollbar"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-blue-400" />}
                  </div>
                  <div className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm border ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' 
                    : 'bg-white text-gray-800 border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <CpuChipIcon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none flex space-x-1.5 items-center shadow-sm border border-gray-100">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 浮窗输入区域 */}
          <div className="p-5 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="在此询问审核要点、对标结果..."
                className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/30"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
              <div className="flex flex-wrap gap-2">
                 <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg transition-colors border border-gray-100" onClick={() => setInput('为什么这个项目经费超标？')}>超标分析</button>
                 <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg transition-colors border border-gray-100" onClick={() => setInput('请给出初步审核结论草案')}>审核草案</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 浮动唤起按钮 - 当浮窗关闭时显示 */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all z-[100] group"
        >
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center shadow-md">1</span>
          <div className="absolute right-20 px-4 py-2 bg-slate-900 text-white text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
             有什么可以帮您的审核工作？
          </div>
        </button>
      )}

      {/* 底部快捷操作条 - 浮动在底部中心 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-4 z-40">
         <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-blue-100 flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
               <HandThumbUpIcon className="w-4 h-4 text-emerald-500" />
               <span className="mr-2">针对当前项目：</span>
            </div>
            <button className="px-5 py-2 bg-emerald-500 text-white rounded-full text-xs font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5">原则通过</button>
            <button className="px-5 py-2 bg-amber-500 text-white rounded-full text-xs font-bold hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5">退回补正</button>
            <div className="w-px h-4 bg-gray-200"></div>
            <button className="px-5 py-2 bg-slate-800 text-white rounded-full text-xs font-bold hover:bg-slate-900 shadow-lg shadow-slate-500/20 transition-all hover:-translate-y-0.5">转专家会商</button>
         </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default ReviewAssistant;
