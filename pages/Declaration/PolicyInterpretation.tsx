
import React, { useState, useEffect, useRef } from 'react';
import { interpretPolicy } from '../../services/geminiService';
import { 
  InformationCircleIcon, 
  BookOpenIcon, 
  LightBulbIcon, 
  ArrowRightCircleIcon,
  MagnifyingGlassIcon,
  DocumentArrowDownIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  MinusIcon,
  ArrowPathIcon,
  BookmarkSquareIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

interface InterpretationHistory {
  id: string;
  topic: string;
  category: string;
  date: string;
  source: string;
}

const MOCK_HISTORY: InterpretationHistory[] = [
  { id: 'PI-2024-001', topic: '关于赴德出访人数限制的最新解释', category: '出访限额', date: '2024-05-22', source: '外事管理条例 v2.4' },
  { id: 'PI-2024-002', topic: '伙食补助费标准在不同国家的差异', category: '财务报销', date: '2024-05-21', source: '财审发 [2023] 42号' },
  { id: 'PI-2024-003', topic: '敏感领域出访的补充报送要求', category: '合规准入', date: '2024-05-20', source: '国家安全部指导意见' },
  { id: 'PI-2024-004', topic: '电子签章在归国报告中的应用标准', category: '流程规范', date: '2024-05-18', source: '系统操作手册' },
];

const PolicyInterpretation: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是政策解读 AI 智能体。您可以询问我任何关于出国任务申报、经费标准、签证政策或合规要求的疑问。' }
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
        contents: `你是一个专业的政府外事政策解读专家。基于最新的国家和地方出国管理政策，解读以下疑问：${messageText}。
        请按“1. 背景、2. 核心条款、3. 实操建议、4. 风险点”四个维度进行深度解读。回答要专业、准确且易于理解。`,
        config: {
          systemInstruction: "你是一个严肃、权威的外事政策专家。你的回答应引用可信的政策文件（如模拟外事管理条例），并提供具体的落地指导建议。"
        }
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "智能解读暂时无法生成，请联系政策室。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "系统连接超时，请重试。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)] pb-12">
      {/* 头部展示 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
            <InformationCircleIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">政策关联解读</h1>
            <p className="text-sm text-gray-500">集成国家级政策与地方细则，通过 RAG 技术提供全链路关联解读。</p>
          </div>
        </div>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          <span>咨询政策 AI</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 主要内容区域：历史记录与案例推荐 */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                <BookmarkSquareIcon className="w-5 h-5 text-blue-500" />
                <span>最近解读记录</span>
              </h3>
              <div className="flex space-x-2">
                 <button className="text-[10px] text-gray-400 hover:text-blue-600">查看全部</button>
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {MOCK_HISTORY.map((item) => (
                <div key={item.id} className="p-5 hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => handleSendMessage(`关于“${item.topic}”的详细解读`)}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{item.category}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{item.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-blue-600">{item.topic}</h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-gray-400">依据：{item.source}</span>
                    <button className="p-1 text-gray-300 hover:text-blue-600 transition-colors">
                      <DocumentArrowDownIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <LightBulbIcon className="w-5 h-5 text-amber-500" />
              <span>相似案例推荐</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { type: '申报成功', title: '某市代表团赴新招商申报全流程案例', tags: ['招商引资', '东南亚'], match: '98%' },
                 { type: '材料补齐', title: '关于企事业团组人数超限的合规性补件指引', tags: ['企事业', '超限'], match: '85%' },
                 { type: '审核否决', title: '敏感领域出访申请未通过典型原因分析', tags: ['合规性', '敏感领域'], match: '72%' },
                 { type: '变更处理', title: '任务执行中临时调整行程的合规路径', tags: ['突发变更', '流程管理'], match: '92%' },
               ].map((item, idx) => (
                 <div key={idx} className="p-4 rounded-xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/20 cursor-pointer transition-all group">
                   <div className="flex justify-between items-start mb-2">
                     <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                       item.type === '申报成功' ? 'bg-green-100 text-green-700' :
                       item.type === '审核否决' ? 'bg-red-100 text-red-700' :
                       'bg-blue-100 text-blue-700'
                     }`}>{item.type}</span>
                     <span className="text-[10px] text-blue-500 font-bold">匹配度 {item.match}</span>
                   </div>
                   <p className="text-xs font-bold text-gray-800 mb-2 group-hover:text-blue-600">{item.title}</p>
                   <div className="flex flex-wrap gap-1">
                     {item.tags.map(t => <span key={t} className="text-[9px] text-gray-400">#{t}</span>)}
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* 右侧边栏：流程导航与速查 */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold mb-6 flex items-center space-x-2 text-blue-400">
              <ArrowRightCircleIcon className="w-5 h-5" />
              <span>流程节点关联指引</span>
            </h3>
            <div className="space-y-6 relative">
               <div className="absolute left-3.5 top-0 h-full w-0.5 bg-slate-800"></div>
               {[
                 { node: '预申报准备', desc: '关联材料清单及自查标准' },
                 { node: '线上初核', desc: '风险识别引擎拦截逻辑说明' },
                 { node: '决策建议', desc: '分级评审标准及上报路径' },
                 { node: '备案归档', desc: '电子签章及存证合规要求' },
               ].map((step, i) => (
                 <div key={i} className="relative pl-10 group cursor-pointer">
                    <div className="absolute left-0 top-1 w-7 h-7 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
                      {i + 1}
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{step.node}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{step.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
              <span>政策速查字典</span>
              <span className="text-[10px] text-gray-400 font-normal">共 1,248 条</span>
            </h4>
            <div className="relative mb-4">
               <input 
                 type="text" 
                 placeholder="关键词检索 (如: 伙食补助)" 
                 className="w-full pl-9 pr-4 py-2 bg-gray-50 border-0 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
               />
               <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <div className="space-y-2">
               {['因公临时出国人员经费管理办法', '出访团组管理人数上限细则', '2024 境外活动禁限事项清单'].map((policy, i) => (
                 <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                   <div className="flex items-center space-x-2 truncate">
                     <DocumentTextIcon className="w-3 h-3 text-gray-300" />
                     <span className="text-xs text-gray-600 truncate mr-2 group-hover:text-blue-600">{policy}</span>
                   </div>
                   <ChevronRightIcon className="w-3 h-3 text-gray-300" />
                 </div>
               ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
              查看完整政策库
            </button>
          </div>
        </div>
      </div>

      {/* --- 全局悬浮 政策解读 AI 智能体 --- */}
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
                <h3 className="text-sm font-bold tracking-tight">政策解读智能体</h3>
                <p className="text-[10px] text-blue-400 font-medium uppercase tracking-widest">Policy Agent</p>
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
                placeholder="在此询问政策细节，如：'赴美天数限制'..."
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
               <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('解读最新的伙食补助费报销标准')}>伙食补助</button>
               <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('关于敏感领域出访的审核要点')}>敏感领域</button>
               <button className="text-[10px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-gray-100" onClick={() => handleSendMessage('总结申报全流程的关键时间节点')}>时间节点</button>
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
             需要政策深度解读？
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

export default PolicyInterpretation;
