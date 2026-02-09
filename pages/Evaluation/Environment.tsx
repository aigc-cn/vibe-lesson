
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldExclamationIcon, 
  MagnifyingGlassIcon, 
  PlusIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ArrowDownTrayIcon,
  GlobeAsiaAustraliaIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  MinusIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

interface HistoryRecord {
  id: string;
  country: string;
  safetyScore: number;
  politicalStability: number;
  friendlyScore: number;
  date: string;
  level: 'low' | 'medium' | 'high';
}

const MOCK_HISTORY: HistoryRecord[] = [
  { id: 'EV-2024-001', country: '德国', safetyScore: 85, politicalStability: 90, friendlyScore: 82, date: '2024-05-20', level: 'low' },
  { id: 'EV-2024-002', country: '叙利亚', safetyScore: 15, politicalStability: 10, friendlyScore: 45, date: '2024-05-18', level: 'high' },
  { id: 'EV-2024-003', country: '越南', safetyScore: 78, politicalStability: 85, friendlyScore: 75, date: '2024-05-15', level: 'low' },
  { id: 'EV-2024-004', country: '巴西', safetyScore: 55, politicalStability: 60, friendlyScore: 68, date: '2024-05-10', level: 'medium' },
];

const EvaluationEnv: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是环境评估智能体。请输入您想评估的国家或地区名称，我将为您提供安全、政治稳定性及友好度分析。' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setIsTyping(true);
    setIsChatOpen(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `你是一个专业的环境评估智能体。请对以下国家/地区进行出访安全与政治环境评估：${messageText}。
        输出应包括：
        1. 安全评分(0-100)
        2. 政治稳定性(0-100)
        3. 对华友好度(0-100)
        4. 行前安全预警
        5. 防护与应急建议。
        请以专业、客观、严谨的口吻回答。`,
        config: {
          systemInstruction: "你是一个政府外事部门的高级评估专家。你的分析应基于实时数据、外交动态和可信风险数据源。回答要结构清晰，重点突出。"
        }
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "评估暂时无法生成，请检查数据源。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "系统连接超时，请重试。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getLevelBadge = (level: HistoryRecord['level']) => {
    switch (level) {
      case 'low': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">低风险</span>;
      case 'medium': return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">中风险</span>;
      case 'high': return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold">高风险</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      {/* 头部展示 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
            <ShieldExclamationIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">安全形势、政治环境评估</h1>
            <p className="text-sm text-gray-500">基于全球动态风险库，实时分析目标国家环境及合规预警。</p>
          </div>
        </div>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
        >
          <PlusIcon className="w-5 h-5" />
          <span>发起新评估</span>
        </button>
      </div>

      {/* 核心列表展示 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-gray-800 font-bold">
            <GlobeAsiaAustraliaIcon className="w-5 h-5 text-blue-500" />
            <span>历史评估记录</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索评估记录..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 w-64"
              />
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">国家/地区</th>
                <th className="px-6 py-4">风险等级</th>
                <th className="px-6 py-4">安全评分</th>
                <th className="px-6 py-4">稳定性</th>
                <th className="px-6 py-4">友好度</th>
                <th className="px-6 py-4">评估日期</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {MOCK_HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{item.country}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getLevelBadge(item.level)}</td>
                  <td className="px-6 py-4">
                    <span className={`font-black ${item.safetyScore < 40 ? 'text-red-500' : 'text-gray-700'}`}>{item.safetyScore}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">{item.politicalStability}</td>
                  <td className="px-6 py-4 font-bold text-gray-700">{item.friendlyScore}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-600 hover:underline font-bold text-xs" onClick={() => handleSendMessage(`重新评估 ${item.country}`)}>重评</button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 信息统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <div className="flex items-center space-x-2 text-red-700 mb-2">
            <ExclamationTriangleIcon className="w-5 h-5" />
            <h4 className="font-bold">实时高风险国家列表</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {['也门', '南苏丹', '利比亚', '叙利亚'].map(c => (
              <span key={c} className="px-2 py-1 bg-white text-red-600 text-[10px] font-bold rounded border border-red-200">{c}</span>
            ))}
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <div className="flex items-center space-x-2 text-emerald-700 mb-2">
            <CheckCircleIcon className="w-5 h-5" />
            <h4 className="font-bold">评估数据源状态</h4>
          </div>
          <p className="text-xs text-emerald-600 font-medium">外交部/大使馆数据接口: 正常</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">国际风险舆情库: 实时同步中</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-blue-800">月度评估总量</h4>
            <p className="text-2xl font-black text-blue-900">128</p>
          </div>
          <ArrowPathIcon className="w-8 h-8 text-blue-200" />
        </div>
      </div>

      {/* --- 全局悬浮 AI 环境评估智能体 --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[420px] h-[min(700px,calc(100vh-100px))] overflow-hidden">
          {/* 头部 */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CpuChipIcon className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">环境评估智能体</h3>
                <p className="text-[10px] text-blue-400 font-medium uppercase tracking-widest">Environment Agent</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400">
              <MinusIcon className="w-5 h-5" />
            </button>
          </div>

          {/* 消息区域 */}
          <div 
            ref={scrollRef}
            className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-5 scroll-smooth custom-scrollbar"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-blue-400" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm border whitespace-pre-wrap ${
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

          {/* 输入区域 */}
          <div className="p-5 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="请输入国家/地区名称，如：德国、阿联酋..."
                className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/30"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
               <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('评估美国的安全形势')}>评估美国</button>
               <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('查看全球风险趋势总结')}>风险趋势</button>
               <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('最近高风险预警有哪些？')}>最新预警</button>
            </div>
          </div>
        </div>
      </div>

      {/* 唤起按钮 */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all z-[100] group"
        >
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
          <div className="absolute right-20 px-4 py-2 bg-slate-900 text-white text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
             需要环境评估建议？
          </div>
        </button>
      )}

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

export default EvaluationEnv;
