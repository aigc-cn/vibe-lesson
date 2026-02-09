
import React, { useState, useEffect, useRef } from 'react';
import { 
  GlobeAltIcon, 
  MagnifyingGlassIcon, 
  PlusIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ArrowDownTrayIcon,
  CurrencyYenIcon,
  UsersIcon,
  AcademicCapIcon,
  ArrowPathIcon,
  MinusIcon,
  AdjustmentsHorizontalIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

interface CultureHistoryRecord {
  id: string;
  country: string;
  economicScore: number;
  industryFocus: string;
  culturalSensitivity: 'Low' | 'Medium' | 'High';
  date: string;
}

const MOCK_HISTORY: CultureHistoryRecord[] = [
  { id: 'CE-2024-001', country: '德国', economicScore: 88, industryFocus: '先进制造、新能源', culturalSensitivity: 'Low', date: '2024-05-20' },
  { id: 'CE-2024-002', country: '日本', economicScore: 82, industryFocus: '半导体、养老医疗', culturalSensitivity: 'Medium', date: '2024-05-18' },
  { id: 'CE-2024-003', country: '沙特阿拉伯', economicScore: 91, industryFocus: '基建、能源、数字转型', culturalSensitivity: 'High', date: '2024-05-15' },
  { id: 'CE-2024-004', country: '越南', economicScore: 75, industryFocus: '纺织、电子组装', culturalSensitivity: 'Low', date: '2024-05-10' },
];

const CultureEconomic: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是人文经济综合评估智能体。请输入您感兴趣的目标国家，我将为您生成经济潜力分析、行业机会清单以及详细的文化礼仪指南。' }
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
        contents: `你是一个专业的人文经济评估专家。请对以下国家进行人文与经济综合评估：${messageText}。
        输出应包括：
        1. 经济合作潜力指数(0-100)
        2. 核心合作行业机会建议
        3. 市场准入关键壁垒提示
        4. 文化习俗与社交礼仪核心指南
        5. 敏感话题清单与沟通禁忌。
        请以专业、详实、且具有实操建议的口吻回答。`,
        config: {
          systemInstruction: "你是一个政府外事及经贸部门的资深顾问。你的回答应结合世界银行、IMF及最新的行业报告数据。回答应结构化，便于阅读。"
        }
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "数据抓取异常，请稍后重试。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "智能体连接失败，请检查网络环境。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      {/* 头部展示 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
            <GlobeAltIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">人文历史、经济综合评估</h1>
            <p className="text-sm text-gray-500">深入分析目标国家的经贸潜力、行业赛道及文化礼仪，助力高效国际合作。</p>
          </div>
        </div>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
        >
          <PlusIcon className="w-5 h-5" />
          <span>新经济文化评估</span>
        </button>
      </div>

      {/* 核心列表展示 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-gray-800 font-bold">
            <PresentationChartBarIcon className="w-5 h-5 text-indigo-500" />
            <span>评估历史档案</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索国家或行业关键词..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 w-64"
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
                <th className="px-6 py-4">评估国家</th>
                <th className="px-6 py-4">潜力指数</th>
                <th className="px-6 py-4">重点关注行业</th>
                <th className="px-6 py-4">文化敏感度</th>
                <th className="px-6 py-4">最后更新</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {MOCK_HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">{item.country}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full w-24 overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${item.economicScore}%` }}></div>
                      </div>
                      <span className="font-black text-indigo-600">{item.economicScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-xs truncate max-w-xs block">{item.industryFocus}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.culturalSensitivity === 'Low' ? 'bg-emerald-50 text-emerald-600' : 
                      item.culturalSensitivity === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    }`}>{item.culturalSensitivity === 'Low' ? '常规模拟' : item.culturalSensitivity === 'Medium' ? '需注意' : '高敏感'}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-indigo-600 hover:underline font-bold text-xs" onClick={() => handleSendMessage(`重新评估 ${item.country} 的经济与人文环境`)}>深度分析</button>
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

      {/* 底部看板 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <div className="flex items-center space-x-2 text-indigo-700 mb-2">
            <CurrencyYenIcon className="w-5 h-5" />
            <h4 className="font-bold">热门经贸目的地</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {['德国', '阿联酋', '新加坡', '哈萨克斯坦'].map(c => (
              <span key={c} className="px-2 py-1 bg-white text-indigo-600 text-[10px] font-bold rounded border border-indigo-200">{c}</span>
            ))}
          </div>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <div className="flex items-center space-x-2 text-orange-700 mb-2">
            <UsersIcon className="w-5 h-5" />
            <h4 className="font-bold">文化冲突预警</h4>
          </div>
          <p className="text-xs text-orange-600 font-medium">检测到中东地区斋月期间出访计划，建议避开非办公时段及公共用餐。</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-emerald-800">报告同步率</h4>
            <p className="text-2xl font-black text-emerald-900">98.5%</p>
          </div>
          <ArrowPathIcon className="w-8 h-8 text-emerald-200" />
        </div>
      </div>

      {/* --- 全局悬浮 AI 人文经济智能体 --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[420px] h-[min(700px,calc(100vh-100px))] overflow-hidden">
          {/* 头部 */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <CpuChipIcon className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">人文经济智能体</h3>
                <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-widest">Culture & Econ Agent</p>
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
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm border whitespace-pre-wrap ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white border-indigo-500 rounded-tr-none' 
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
                    <CpuChipIcon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none flex space-x-1.5 items-center shadow-sm border border-gray-100">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
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
                placeholder="询问经济潜力、礼仪建议，如：'巴西的经贸潜力'..."
                className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/30"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
               <button className="text-[10px] font-bold text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('分析沙特阿拉伯的经济潜力与禁忌')}>评估沙特</button>
               <button className="text-[10px] font-bold text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('欧洲出访的常用商务礼仪')}>欧洲礼仪</button>
               <button className="text-[10px] font-bold text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('生成一份东南亚市场准入清单')}>准入清单</button>
            </div>
          </div>
        </div>
      </div>

      {/* 唤起按钮 */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 hover:scale-110 active:scale-95 transition-all z-[100] group"
        >
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
          <div className="absolute right-20 px-4 py-2 bg-slate-900 text-white text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
             需要人文经济分析建议？
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

export default CultureEconomic;
