
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldExclamationIcon, 
  MagnifyingGlassIcon, 
  CloudArrowUpIcon,
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  // FIX: Added missing CheckBadgeIcon import
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const SecretIdentification: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是涉密识别安全智能体。我可以深度扫描报告全文，自动发现可能涉及国家机密、商业机密或违规表达的风险项，并给出脱敏建议。' }
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
        contents: `你是一个国家安全防泄密专家。请审核以下内容是否包含涉密、敏感或违规信息：${msgText}。请明确列出可疑关键词，并给出对应的脱敏修正方案。`,
        config: { systemInstruction: "你精通《保守国家秘密法》及相关外事保密准则，回答应极其严谨，宁可错标不可漏标。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "安全扫描失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "安全服务繁忙。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-160px)]">
      {/* 头部展示 */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-100 text-white">
            <ShieldExclamationIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">涉密内容自动识别</h1>
            <p className="text-sm text-gray-500">集成非结构化数据解析引擎，穿透扫描附件，拦截保密违规项。</p>
          </div>
        </div>
        <button 
          onClick={startScan}
          disabled={isScanning}
          className="px-8 py-3 bg-red-600 text-white rounded-2xl text-sm font-bold hover:bg-red-700 shadow-xl shadow-red-500/20 flex items-center space-x-2 disabled:bg-red-300 transition-all"
        >
          {isScanning ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <MagnifyingGlassIcon className="w-5 h-5" />}
          <span>{isScanning ? '正在深度扫描...' : '开始全局风控扫描'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[400px]">
              <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
                 <h3 className="font-bold text-gray-800">扫描报告摘要</h3>
                 <span className="text-[10px] font-mono text-gray-400">上次扫描: 2024-05-23 14:00</span>
              </div>
              
              <div className="space-y-6">
                 <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                    <div className="flex justify-between items-center mb-4">
                       <span className="px-2 py-1 bg-red-600 text-white text-[9px] font-black rounded uppercase">紧急提醒</span>
                       <span className="text-xs font-bold text-red-600 underline">详情穿透 &rarr;</span>
                    </div>
                    <h4 className="text-sm font-black text-red-800 mb-2">检测到 [机密] 级技术参数描述</h4>
                    <p className="text-xs text-red-700 leading-relaxed italic">
                       "在归国报告第三章中，提到的新型伺服电机扭矩参数在 [限制出口清单] 范围内。建议立即对具体数值进行模糊化处理或删除。"
                    </p>
                 </div>

                 <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
                    <h4 className="text-sm font-black text-amber-800 mb-2">地理信息敏感预警</h4>
                    <p className="text-xs text-amber-700 leading-relaxed">
                       "行程中涉及的某国外实验室经纬度信息过于精确，可能触发对方国家的反间谍预警逻辑，建议仅保留城市级位置描述。"
                    </p>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-xl group border border-white/5 hover:border-red-500/30 transition-all cursor-pointer">
              <CloudArrowUpIcon className="w-16 h-16 text-slate-700 group-hover:text-red-500 transition-colors mb-4" />
              <h4 className="text-white font-black mb-2">上传待查核文档</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">支持 PDF, DOCX, 图片扫描件。单次扫描限 500 页。</p>
           </div>

           <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center space-x-3">
              <CheckBadgeIcon className="w-10 h-10 text-emerald-600" />
              <div>
                 <p className="text-xs font-bold text-emerald-800">安全合规证书：有效</p>
                 <p className="text-[10px] text-emerald-600 mt-1">识别规则库更新至：v2024.05.22</p>
              </div>
           </div>
        </div>
      </div>

      {/* --- AI Chatbot Floating Window --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(700px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-red-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">涉密安全审计智能体</h3>
                <p className="text-[10px] text-red-400 font-medium uppercase">Security Agent</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400"><MinusIcon className="w-5 h-5" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-5 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-red-400" />}
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
              <input type="text" placeholder="输入涉及敏感信息的文本进行审查..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-red-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all z-[100] group">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default SecretIdentification;
