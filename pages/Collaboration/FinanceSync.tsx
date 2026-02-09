
import React, { useState, useEffect, useRef } from 'react';
import { 
  CloudArrowDownIcon, 
  ArrowPathIcon, 
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
  UserIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  CircleStackIcon,
  FunnelIcon,
  ArrowUpTrayIcon,
  ShieldCheckIcon,
  PresentationChartBarIcon,
  TableCellsIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar 
} from 'recharts';
import { GoogleGenAI } from "@google/genai";

const HISTORICAL_MINING_DATA = [
  { month: '1月', budget: 120, actual: 110 },
  { month: '2月', budget: 150, actual: 145 },
  { month: '3月', budget: 200, actual: 210 },
  { month: '4月', budget: 180, actual: 160 },
  { month: '5月', budget: 220, actual: 195 },
  { month: '6月', budget: 250, actual: 230 },
];

const FinanceSync: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncType, setSyncType] = useState<'pull' | 'push' | null>(null);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '您好！我是财政协同分析智能体。我可以帮您分析预算下达与实际支出间的偏差，并针对‘剩余额度不足’或‘拨付滞后’的项目提供决策建议。' }
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
        contents: `你是一个专业的政务财务审计专家。请根据以下财政同步数据或问题进行分析：${msgText}。请重点关注预算执行合规性、额度结余预判及支付异常说明。`,
        config: { systemInstruction: "你熟悉《预算法》及政务支出标准。回答应包含四个核心节点：下达、拨付、支出、结余的逻辑关联。" }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "数据分析失败。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "网络超时。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const triggerSync = (type: 'pull' | 'push') => {
    setIsSyncing(true);
    setSyncType(type);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncType(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-160px)] pb-12">
      {/* 顶部标题与标准接口控制 */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100 text-white">
            <CloudArrowDownIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">财政局数据双向接入</h1>
            <div className="flex items-center space-x-3 mt-1">
               <span className="flex items-center text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                 <ShieldCheckIcon className="w-3 h-3 mr-1" /> 国密 SM4 加密传输
               </span>
               <p className="text-xs text-gray-400 font-medium italic">标准接口版本：API v3.4.2</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => triggerSync('pull')}
            disabled={isSyncing}
            className="px-6 py-3 bg-white border border-emerald-200 text-emerald-600 rounded-2xl text-xs font-bold hover:bg-emerald-50 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            <CloudArrowDownIcon className={`w-4 h-4 ${syncType === 'pull' ? 'animate-bounce' : ''}`} />
            <span>拉取财政指标</span>
          </button>
          <button 
            onClick={() => triggerSync('push')}
            disabled={isSyncing}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            <ArrowUpTrayIcon className={`w-4 h-4 ${syncType === 'push' ? 'animate-bounce' : ''}`} />
            <span>推送执行记录</span>
          </button>
        </div>
      </div>

      {/* 多维筛选系统 */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
          <input type="text" placeholder="按项目 ID 或名称筛选..." className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-0 rounded-2xl text-xs focus:ring-2 focus:ring-emerald-500" />
        </div>
        <select className="bg-gray-50 border-0 rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-600">
           <option>所有团组类型</option>
           <option>局级出访</option>
           <option>招商引资</option>
           <option>企事业研发</option>
        </select>
        <div className="flex items-center space-x-2">
           <input type="date" className="bg-gray-50 border-0 rounded-2xl px-4 py-2.5 text-xs text-gray-500" />
           <span className="text-gray-300">-</span>
           <input type="date" className="bg-gray-50 border-0 rounded-2xl px-4 py-2.5 text-xs text-gray-500" />
        </div>
        <button className="p-3 bg-gray-900 text-white rounded-2xl hover:bg-gray-800">
           <FunnelIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 数据挖掘可视化展示 */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                 <PresentationChartBarIcon className="w-5 h-5 text-indigo-500" />
                 <span>历史经费使用深度挖掘 (百万)</span>
              </h3>
              <div className="flex items-center space-x-4 text-[10px] font-bold text-gray-400">
                 <div className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div> 预算额度</div>
                 <div className="flex items-center"><div className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></div> 实际支出</div>
              </div>
           </div>
           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={HISTORICAL_MINING_DATA}>
                    <defs>
                       <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="budget" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorBudget)" />
                    <Area type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* 异常预警 */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
              <div>
                 <h3 className="font-bold mb-6 flex items-center space-x-2 text-red-400">
                    <ExclamationCircleIcon className="w-5 h-5" />
                    <span>决策支持预警</span>
                 </h3>
                 <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-xs font-bold text-red-400 mb-1">剩余额度风险</p>
                       <p className="text-[10px] text-slate-400 leading-relaxed">任务 #8821 [赴美半导体考察] 剩余额度仅剩 2.4%，不足以覆盖后续转机杂费。</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-xs font-bold text-amber-400 mb-1">拨付节点滞后</p>
                       <p className="text-[10px] text-slate-400 leading-relaxed">检测到 3 个团组已通过初审，但财政系统的“资金拨付”节点处于 Pendding 状态。</p>
                    </div>
                 </div>
              </div>
              <button className="w-full mt-8 py-3 bg-red-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">立即生成联调函</button>
           </div>
        </div>

        {/* 详细财务节点追踪列表 */}
        <div className="lg:col-span-12">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                   <TableCellsIcon className="w-5 h-5 text-emerald-500" />
                   <span>项目财务节点追踪明细</span>
                </h3>
                <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">Last Global Sync: {new Date().toLocaleTimeString()}</span>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                      <tr>
                         <th className="px-6 py-4">项目 ID / 团组名称</th>
                         <th className="px-6 py-4">预算下达</th>
                         <th className="px-6 py-4">资金拨付</th>
                         <th className="px-6 py-4">实际支出</th>
                         <th className="px-6 py-4">剩余额度</th>
                         <th className="px-6 py-4 text-right">同步状态</th>
                      </tr>
                   </thead>
                   <tbody className="text-sm divide-y divide-gray-50">
                      {[
                        { id: 'DE-24-01', name: '赴德先进制造考察', issuance: '120.00', allocation: '100.00', expenditure: '85.20', balance: '34.80', status: 'In Sync' },
                        { id: 'US-24-12', name: '北美生物技术巡回展', issuance: '85.60', allocation: '85.60', expenditure: '82.00', balance: '3.60', status: 'Warning' },
                        { id: 'AS-24-05', name: '东南亚现代农业对接', issuance: '200.00', allocation: '50.00', expenditure: '12.40', balance: '187.60', status: 'In Sync' },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                           <td className="px-6 py-4">
                              <div className="flex flex-col">
                                 <span className="font-black text-gray-800">{item.name}</span>
                                 <span className="font-mono text-[10px] text-gray-400">{item.id}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 font-mono font-bold text-gray-600">￥{item.issuance}k</td>
                           <td className="px-6 py-4 font-mono font-bold text-indigo-600">￥{item.allocation}k</td>
                           <td className="px-6 py-4 font-mono font-bold text-emerald-600">￥{item.expenditure}k</td>
                           <td className="px-6 py-4">
                              <span className={`font-mono font-black ${parseFloat(item.balance) < 10 ? 'text-red-500' : 'text-gray-900'}`}>￥{item.balance}k</span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${item.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{item.status}</span>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>

      {/* 智能体浮窗 */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col w-[380px] h-[min(650px,calc(100vh-100px))] overflow-hidden">
          <div className="p-5 bg-emerald-900 text-white flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"><CpuChipIcon className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">财政协同审计智能体</h3>
                <p className="text-[10px] text-emerald-400 font-medium uppercase tracking-widest">Finance Analysis Agent</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400"><MinusIcon className="w-5 h-5" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto bg-gray-50/50 space-y-5 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <CpuChipIcon className="w-4 h-4 text-emerald-400" />}
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
              <input type="text" placeholder="咨询预算执行情况或同步逻辑..." className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-[13px] focus:ring-2 focus:ring-emerald-500" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg"><PaperAirplaneIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all z-[100] group">
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

export default FinanceSync;
