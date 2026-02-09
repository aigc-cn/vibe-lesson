
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpTrayIcon, 
  DocumentCheckIcon, 
  ShieldExclamationIcon, 
  ArrowPathIcon,
  PauseIcon,
  PlayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CircleStackIcon,
  ArrowDownTrayIcon,
  AdjustmentsHorizontalIcon,
  CpuChipIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const UploadControlCenter: React.FC = () => {
  // 状态：断点续传任务
  const [activeUploads, setActiveUploads] = useState([
    { id: 'UP-241', name: '2024Q3出访成果汇编.xlsx', progress: 65, status: 'Uploading', chunks: '65/100', size: '256 MB' },
    { id: 'UP-242', name: '全球工业大脑专利集.zip', progress: 12, status: 'Paused', chunks: '12/500', size: '1.2 GB' },
  ]);

  // 状态：智能校验与错误列表
  const [validationResults, setValidationResults] = useState([
    { field: '出访日期', original: '2024/05/12', issue: '格式不规范', suggestion: '已自动修复为 2024-05-12', type: 'auto', status: 'Fixed' },
    { field: '预算总额', original: '55,000$', issue: '含非法货币符号', suggestion: '建议去除符号保留数值', type: 'manual', status: 'Pending' },
    { field: '密级标识', original: '公开', issue: '内容含敏感词', suggestion: '需降级或脱敏处理', type: 'manual', status: 'Pending' },
  ]);

  // 状态：智能体对话
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是错误数据检查智能体。我可以帮您分析上传中的格式错误与逻辑偏差，并提供一键纠错建议。' }
  ]);
  const [input, setInput] = useState('');
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
        contents: `你是一个专业的政务数据审计专家。请分析以下数据上传错误并提供修复方案：${msgText}。请给出：1. 错误深度分析 2. 建议修改值 3. 预防规则配置建议。`,
        config: { systemInstruction: "你精通结构化数据校验规则。回答应专业且具备实操性。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "分析失败，请重试。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络超时。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleUpload = (id: string) => {
    setActiveUploads(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Uploading' ? 'Paused' : 'Uploading' } : u));
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-160px)] pb-12 animate-in fade-in duration-500">
      {/* 头部状态总览 */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <ArrowUpTrayIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">数据上传控制中心</h1>
            <p className="text-sm text-gray-500 italic">集成断点续传、模板智能校验与AI纠错引擎 v4.2</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right mr-4">
             <p className="text-[10px] text-gray-400 font-bold uppercase">实时上传带宽</p>
             <p className="text-xs font-black text-emerald-600">4.5 MB/s</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all flex items-center space-x-2">
            <CircleStackIcon className="w-4 h-4" />
            <span>开始批量上传</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左侧：续传任务与校验详情 */}
        <div className="lg:col-span-8 space-y-6">
          {/* 任务 1: 断点续传队列 */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-5 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                   <ArrowPathIcon className="w-4 h-4 text-indigo-500" />
                   <span>活跃上传队列 (断点续传模式)</span>
                </h3>
                <span className="text-[10px] font-bold text-gray-400">分片大小: 5MB (Hash 校验中)</span>
             </div>
             <div className="p-6 space-y-4">
                {activeUploads.map((u) => (
                  <div key={u.id} className="p-4 bg-gray-50 rounded-2xl border border-white hover:border-indigo-100 transition-all group">
                     <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                           <div className={`p-2 rounded-xl ${u.status === 'Uploading' ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-amber-100 text-amber-600'}`}>
                              <CircleStackIcon className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-xs font-black text-gray-800">{u.name}</p>
                              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{u.size} • 分片进度: {u.chunks}</p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <button onClick={() => toggleUpload(u.id)} className="p-2 bg-white rounded-lg shadow-sm hover:text-blue-600">
                              {u.status === 'Uploading' ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                           </button>
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase text-gray-400">
                           <span>{u.status}</span>
                           <span>{u.progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                           <div className={`h-full transition-all duration-700 ${u.status === 'Uploading' ? 'bg-blue-600' : 'bg-amber-500'}`} style={{ width: `${u.progress}%` }}></div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* 任务 2: 智能校验与在线修复列表 */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                   <DocumentCheckIcon className="w-4 h-4 text-emerald-500" />
                   <span>数据内容智能校验与修复区</span>
                </h3>
                <div className="flex space-x-2">
                   <button className="flex items-center space-x-1 text-[10px] font-bold text-blue-600 hover:underline">
                      <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                      <span>导出错误报告</span>
                   </button>
                </div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                      <tr>
                         <th className="px-6 py-4">校验字段</th>
                         <th className="px-6 py-4">原始输入</th>
                         <th className="px-6 py-4">识别问题</th>
                         <th className="px-6 py-4">修复建议</th>
                         <th className="px-6 py-4 text-right">管理</th>
                      </tr>
                   </thead>
                   <tbody className="text-xs divide-y divide-gray-50">
                      {validationResults.map((res, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                           <td className="px-6 py-4 font-bold text-gray-700">{res.field}</td>
                           <td className="px-6 py-4 font-mono text-gray-400">{res.original}</td>
                           <td className="px-6 py-4">
                              <span className="flex items-center text-red-500 font-bold">
                                 <ShieldExclamationIcon className="w-3.5 h-3.5 mr-1" />
                                 {res.issue}
                              </span>
                           </td>
                           <td className="px-6 py-4 italic text-gray-500">{res.suggestion}</td>
                           <td className="px-6 py-4 text-right">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                res.status === 'Fixed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                              }`}>{res.status === 'Fixed' ? '自动修复' : '待处理'}</span>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* 右侧：规则配置与AI审计 */}
        <div className="lg:col-span-4 space-y-6">
           {/* 功能点：字段规则配置 */}
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold flex items-center space-x-2 text-indigo-400">
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  <span>校验规则动态配置</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-500 uppercase">v3.1</span>
              </div>
              <div className="space-y-5">
                 {[
                   { label: '日期格式强制规范', active: true, desc: '自动修复 YYYY-MM-DD' },
                   { label: '敏感字段自动拦截', active: true, desc: '语义扫描保密违规项' },
                   { label: '数值逻辑平衡检查', active: false, desc: '科目合计对标限额' },
                 ].map((rule, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                      <div>
                         <p className="text-xs font-bold">{rule.label}</p>
                         <p className="text-[10px] text-slate-500 mt-0.5">{rule.desc}</p>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${rule.active ? 'bg-blue-600' : 'bg-slate-700'}`}>
                         <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${rule.active ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-3 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">应用当前调优策略</button>
           </div>

           {/* 智能体快捷召唤 */}
           <button 
             onClick={() => setIsChatOpen(true)}
             className="w-full p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center group"
           >
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <CpuChipIcon className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-black text-gray-800 tracking-tight">错误数据检查智能体</h4>
              <p className="text-[10px] text-gray-400 mt-2 text-center leading-relaxed">扫描逻辑错误、自动修复简单项<br/>并生成标准纠错建议</p>
           </button>

           <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center space-x-4">
              <CheckCircleIcon className="w-10 h-10 text-emerald-600" />
              <div>
                 <p className="text-xs font-bold text-emerald-800">断点续传校验状态</p>
                 <p className="text-[10px] text-emerald-600 mt-1 italic">未发现分片冲突，历史片段已对齐。</p>
              </div>
           </div>
        </div>
      </div>

      {/* --- AI Chatbot Floating Window --- */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[400px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">数据审计智能体</h3>
                <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-widest">Data Repair Agent</p>
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
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <input type="text" placeholder="描述特定异常数据项，让我诊断逻辑错误..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-indigo-500 transition-all font-medium" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                 <button className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 whitespace-nowrap" onClick={() => handleSendMessage('请扫描当前任务队列中的所有逻辑冲突项')}>批量扫描任务</button>
                 <button className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 whitespace-nowrap" onClick={() => handleSendMessage('基于历史数据给出一个通用的修复建议库')}>生成修复手册</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all z-[100] group">
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default UploadControlCenter;
