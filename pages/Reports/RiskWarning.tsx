
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldExclamationIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

interface RiskPoint {
  id: string;
  type: string;
  level: 'High' | 'Medium' | 'Low';
  desc: string;
  advice: string;
}

const MOCK_RISKS: RiskPoint[] = [
  { id: '1', type: '合作真实性', level: 'High', desc: '罗伯特博世在德部分工厂正处于重组期，报告中提到的“立即投产”可能存在偏差。', advice: '建议通过大使馆经商处核实对方最新财务及裁员通报。' },
  { id: '2', type: '政策合规', level: 'Medium', desc: '涉及核心传感器技术引进，可能触及出口管制敏感领域。', advice: '需法律部门介入评估双边合规出口限制清单。' },
  { id: '3', type: '财务预算', level: 'Low', desc: '报告显示汉堡段住宿费超出标准 5%，已标注红色提示。', advice: '要求申报人提供合理性说明或从其他科目调剂。' }
];

const RiskWarning: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是招商报告风险预警智能体。您可以上传报告或粘贴段落，我将识别签约风险、合规风险及数据质量风险，并提供应对策论建议。' }
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
        contents: `你是一个专业的招商风险评估专家。请评估以下招商内容的潜在风险并分级：${msgText}。输出包含：风险类别、风险等级、原因分析及具体的处置方案建议。`,
        config: { systemInstruction: "你是一个极其敏锐的风险审计员。回答应重点突出，尤其是可能导致国资流失或政策违规的隐患。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "风险预警生成失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "AI服务超时。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative min-h-[calc(100vh-160px)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-200 text-white">
            <ShieldExclamationIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">招商报告风险预警</h1>
            <p className="text-sm text-gray-500">多维度自动识别合作、政策与财务风险，支持在线批注与版本留痕。</p>
          </div>
        </div>
        <div className="flex space-x-2">
           <button className="px-4 py-2 border border-red-100 text-red-600 bg-red-50 rounded-xl text-xs font-bold hover:bg-red-100 flex items-center space-x-2">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span>开始全局扫描</span>
           </button>
           <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700">预览审核意见</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col h-[600px]">
           <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
              <h3 className="font-bold text-gray-800">当前报告文本预审区</h3>
              <div className="flex items-center space-x-4">
                 <span className="text-[10px] font-bold text-gray-400">当前版本：V1.2 (修正版)</span>
                 <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors"><PencilSquareIcon className="w-4 h-4" /></button>
              </div>
           </div>
           <div className="flex-1 overflow-y-auto custom-scrollbar relative">
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-6">
                 <p>关于赴德国库卡公司考察的结项报告中提到：双方达成了初步投资协议，库卡公司高层承诺将于 2024 年底前在华投产下一代六轴机器人核心产线。</p>
                 <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl relative group">
                    <p className="font-bold text-red-800 mb-1 flex items-center"><ExclamationTriangleIcon className="w-4 h-4 mr-1"/> 风险警告：合作真实性</p>
                    <p className="text-red-700 italic">“库卡公司近期财报显示其全球研发中心正在向南美偏移，且欧方近期对核心制造技术出口政策有收紧趋势。”</p>
                    <div className="mt-2 text-[10px] text-red-500">—— 由 AI 审计引擎自动批注 (置信度 92%)</div>
                 </div>
                 <p>此外，在西门子医疗的对接中，对方提出了针对数字化诊断系统的联合开发意向。我方认为该项目具有极高的战略意义，建议立即拨付先行考察经费。</p>
                 <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl relative">
                    <p className="font-bold text-amber-800 mb-1 flex items-center"><ExclamationTriangleIcon className="w-4 h-4 mr-1"/> 提示：财务合规</p>
                    <p className="text-amber-700 italic">“先行经费拨付需在年度总预算内统筹，当前预算额度已达 85% 上限，建议转入重点会商环节。”</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="font-bold mb-6 flex items-center space-x-2">
                 <ArrowPathIcon className="w-5 h-5 text-blue-400" />
                 <span>分级预警统计</span>
              </h3>
              <div className="space-y-4">
                 {MOCK_RISKS.map((r, i) => (
                   <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all" onClick={() => handleSendMessage(`请详细说明风险点：${r.type}`)}>
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{r.type}</span>
                         <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                           r.level === 'High' ? 'bg-red-500' : r.level === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                         }`}>{r.level} Risk</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-normal line-clamp-2">{r.desc}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                 <CheckCircleIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                 <p className="text-xs font-bold text-blue-800">风险处置建议</p>
                 <p className="text-[10px] text-blue-600 leading-relaxed">已自动匹配 4 套针对德国制造业引进的应急预案，点击 [预览] 即可一键插入报告附件。</p>
              </div>
           </div>
        </div>
      </div>

      {/* --- AI Chatbot --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">风险预警智能体</h3>
                <p className="text-[10px] text-red-400 font-medium uppercase">Risk Agent</p>
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
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <input type="text" placeholder="询问关于特定段落的风险分析..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                 <button className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 whitespace-nowrap" onClick={() => handleSendMessage('详细分析一下报告中关于投资金额真实性的风险')}>投资额真实性分析</button>
                 <button className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 whitespace-nowrap" onClick={() => handleSendMessage('提供一份关于技术出口限制的应对建议草案')}>出口限制建议</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-red-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all z-[100] group">
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

export default RiskWarning;
