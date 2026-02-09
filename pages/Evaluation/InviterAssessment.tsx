
import React, { useState, useEffect, useRef } from 'react';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon, 
  PlusIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ArrowDownTrayIcon,
  StarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  MinusIcon,
  AdjustmentsHorizontalIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

interface InviterRecord {
  id: string;
  name: string;
  industry: string;
  strengthScore: number;
  matchScore: number;
  date: string;
  status: 'High' | 'Medium' | 'Low';
}

const MOCK_INVITERS: InviterRecord[] = [
  { id: 'IV-2024-001', name: '慕尼黑工业大学', industry: '学术/教育', strengthScore: 95, matchScore: 88, date: '2024-05-20', status: 'High' },
  { id: 'IV-2024-002', name: '法拉第未来实验室', industry: '汽车/能源', strengthScore: 78, matchScore: 92, date: '2024-05-18', status: 'High' },
  { id: 'IV-2024-003', name: '东南亚农业发展署', industry: '政府/NGO', strengthScore: 65, matchScore: 70, date: '2024-05-15', status: 'Medium' },
  { id: 'IV-2024-004', name: '巴西卡洛斯贸易公司', industry: '商贸', strengthScore: 45, matchScore: 50, date: '2024-05-10', status: 'Low' },
];

const InviterAssessment: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是邀请方评估智能体。请提供邀请方的名称、行业及合作诉求，我将为您提供其综合实力评分、契合度分析及定制化谈判建议。' }
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
        contents: `你是一个专业的对外业务专家。请根据以下信息评估邀请方：${messageText}。
        输出应包括：
        1. 邀请方综合实力评分(0-100)
        2. 双方资源优势契合度分析
        3. 建议的重点沟通方向与谈判要点
        4. 可能存在的合规与合作风险提示
        5. 对标我方及相关部门的历史出访记录（模拟输出）。
        请以专业、严谨且具有前瞻性的口吻回答。`,
        config: {
          systemInstruction: "你是一个政府外事及企业国际合作部门的决策辅助专家。你的回答应基于工商、信用及历史出访大数据的模拟分析。"
        }
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "评估失败，请检查邀请方信息是否准确。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "系统连接超时，请重试。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      {/* 头部展示 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
            <UserGroupIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">邀请方综合评估</h1>
            <p className="text-sm text-gray-500">穿透评估邀请方背景实力、契合度及风险，优化谈判策略，提升出访成效。</p>
          </div>
        </div>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
        >
          <PlusIcon className="w-5 h-5" />
          <span>新邀请方评估</span>
        </button>
      </div>

      {/* 核心列表展示 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-gray-800 font-bold">
            <IdentificationIcon className="w-5 h-5 text-blue-500" />
            <span>受邀单位档案</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索邀请方名称或行业..." 
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
                <th className="px-6 py-4">邀请方名称</th>
                <th className="px-6 py-4">行业领域</th>
                <th className="px-6 py-4">综合实力</th>
                <th className="px-6 py-4">资源契合度</th>
                <th className="px-6 py-4">评估时间</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {MOCK_INVITERS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{item.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{item.industry}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-black text-gray-700">{item.strengthScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full w-20 overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${item.matchScore}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600">{item.matchScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-600 hover:underline font-bold text-xs" onClick={() => handleSendMessage(`重新评估邀请方: ${item.name}`)}>重新评估</button>
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
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <div className="flex items-center space-x-2 text-blue-700 mb-2">
            <ShieldCheckIcon className="w-5 h-5" />
            <h4 className="font-bold">高价值邀请方占比</h4>
          </div>
          <p className="text-2xl font-black text-blue-900">42.5%</p>
          <p className="text-[10px] text-blue-600 mt-1">实力评分 85 以上单位占总比</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <div className="flex items-center space-x-2 text-emerald-700 mb-2">
            <DocumentTextIcon className="w-5 h-5" />
            <h4 className="font-bold">评估档案库容</h4>
          </div>
          <p className="text-2xl font-black text-emerald-900">1,542</p>
          <p className="text-[10px] text-emerald-600 mt-1">历史评估数据总量，已结构化存储</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <div className="flex items-center space-x-2 text-orange-700 mb-2">
            <ExclamationTriangleIcon className="w-5 h-5" />
            <h4 className="font-bold">需关注邀请方</h4>
          </div>
          <div className="flex -space-x-2 overflow-hidden py-1">
             {[1,2,3,4].map(i => <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-200" />)}
             <span className="pl-4 text-xs font-bold text-orange-600 flex items-center">+5 个待查核</span>
          </div>
        </div>
      </div>

      {/* --- 全局悬浮 AI 邀请方评估智能体 --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[420px] h-[min(700px,calc(100vh-100px))] overflow-hidden">
          {/* 头部 */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <CpuChipIcon className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">邀请方评估智能体</h3>
                <p className="text-[10px] text-blue-400 font-medium uppercase tracking-widest">Inviter Agent</p>
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
                placeholder="在此输入邀请方名称及背景，点击发送..."
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
               <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('评估慕尼黑工业大学作为出访邀请方的实力')}>评估高校</button>
               <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('如果对方是一家初创企业，有哪些谈判风险？')}>初创评估</button>
               <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('总结该行业最近的国际合作对标案例')}>对标案例</button>
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
             需要邀请方深度分析？
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

export default InviterAssessment;
