
import React, { useState, useEffect, useRef } from 'react';
import { 
  CloudArrowUpIcon, 
  ArrowPathIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  TableCellsIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightCircleIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const EnterpriseItinerary: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是企事业行程提取智能体。请上传活动日志、行程照片或文档，我将自动提取关键要素并与您的初始计划进行量化对比。' }
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
        contents: `你是一个精通OCR和NLP的数据提取专家。请从以下企事业行程文本中提取：日期、访问单位、参与人、活动内容。并与模拟计划对比，指出时间偏差或人员变动：${msgText}。`,
        config: { systemInstruction: "你是一个细致入微、实事求是的数据审计助手。输出应包含对比列表，明确指出每一项的计划 vs 实际差异。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "行程提取失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络故障。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-200 text-white">
            <ArrowPathIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">企事业团组行程数据提取</h1>
            <p className="text-sm text-gray-500">从行程记录自动提取要素，计划 vs 实际量化对比，结构化入库。</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg">导出对比 Excel</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center border-dashed border-2 group hover:bg-blue-50 transition-colors cursor-pointer">
             <CloudArrowUpIcon className="w-12 h-12 text-gray-300 group-hover:text-blue-500 transition-colors" />
             <p className="mt-4 text-sm font-bold text-gray-600">点击或拖拽上传行程文档、活动记录照片或日志</p>
             <p className="text-[10px] text-gray-400 mt-2">支持 PDF, DOCX, JPG, PNG (AI 自动 OCR 解析)</p>
          </div>
        </div>

        <div className="lg:col-span-12">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                   <TableCellsIcon className="w-5 h-5 text-blue-500" />
                   <span>计划 vs 实际 执行对比表</span>
                </h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">时间节点</th>
                      <th className="px-6 py-4">计划访问单位</th>
                      <th className="px-6 py-4">实际访问单位</th>
                      <th className="px-6 py-4">执行状态</th>
                      <th className="px-6 py-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-50">
                    {[
                      { time: '10-15 上午', plan: '新加坡国立大学实验室', actual: '新加坡国立大学实验室', status: 'match' },
                      { time: '10-15 下午', plan: '谷歌亚太总部交流', actual: '由于签证问题改为线上会议', status: 'deviated' },
                      { time: '10-16 全天', plan: '科技园招商专场', actual: '科技园招商专场 + 额外对接企业1家', status: 'match' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-[10px] text-gray-500">{row.time}</td>
                        <td className="px-6 py-4 text-gray-600">{row.plan}</td>
                        <td className={`px-6 py-4 font-bold ${row.status === 'match' ? 'text-gray-900' : 'text-amber-600'}`}>{row.actual}</td>
                        <td className="px-6 py-4">
                           {row.status === 'match' ? (
                             <span className="flex items-center text-emerald-600 font-bold text-[10px]"><CheckCircleIcon className="w-3 h-3 mr-1"/> 按计划执行</span>
                           ) : (
                             <span className="flex items-center text-amber-600 font-bold text-[10px]"><XCircleIcon className="w-3 h-3 mr-1"/> 存在偏差</span>
                           )}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-[10px] font-bold text-blue-600 hover:underline">人工修正</button>
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
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">企事业行程提取智能体</h3>
                <p className="text-[10px] text-blue-400 font-medium uppercase tracking-widest">Itinerary Agent</p>
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
              <input type="text" placeholder="粘贴行程片段或描述差异..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all z-[100] group">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default EnterpriseItinerary;
