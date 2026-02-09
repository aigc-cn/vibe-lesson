
import React, { useState } from 'react';
import { 
  BellIcon, 
  ShieldCheckIcon, 
  TableCellsIcon, 
  DocumentTextIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  SignalIcon,
  FingerPrintIcon,
  CircleStackIcon,
  CloudArrowUpIcon,
  SparklesIcon,
  CommandLineIcon,
  BoltIcon,
  AdjustmentsHorizontalIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie 
} from 'recharts';

const RESOURCE_DATA = [
  { time: '08:00', load: 12, push: 45 },
  { time: '10:00', load: 45, push: 120 },
  { time: '12:00', load: 30, push: 85 },
  { time: '14:00', load: 85, push: 240 },
  { time: '16:00', load: 55, push: 150 },
];

const LOG_STATS = [
  { name: '正常', value: 850 },
  { name: '预警', value: 120 },
  { name: '异常', value: 30 },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const SystemAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('messaging');

  const menuItems = [
    { id: 'messaging', name: '消息与服务状态', icon: <BellIcon /> },
    { id: 'auth', name: '用户鉴权与请求', icon: <FingerPrintIcon /> },
    { id: 'structured', name: '结构化数据管理', icon: <TableCellsIcon /> },
    { id: 'unstructured', name: '非结构化数据管理', icon: <DocumentTextIcon /> },
    { id: 'search', name: '检索与智能推荐', icon: <MagnifyingGlassIcon /> },
    { id: 'learning', name: '学习与进化服务', icon: <AcademicCapIcon /> },
    { id: 'analytics', name: '日志分析与查询', icon: <ChartBarIcon /> },
    { id: 'config', name: '配置与服务注册', icon: <Cog6ToothIcon /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 头部展示 */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-slate-900 rounded-2xl shadow-lg shadow-slate-200 text-white">
            <AdjustmentsHorizontalIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">OGMS 平台治理中心</h1>
            <p className="text-sm text-gray-500 italic">保障外事出国全流程信息高效触达、数据安全闭环与系统自我进化。</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
             <p className="text-[10px] text-gray-400 font-bold uppercase">集群健康度</p>
             <p className="text-xs font-black text-emerald-500">EXCELLENT</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-50 flex items-center justify-center">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧导航 */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-3 space-y-1 sticky top-24">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {React.cloneElement(item.icon as React.ReactElement, { className: 'w-5 h-5' })}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* 内容展示区 */}
        <div className="flex-1 min-w-0">
          {/* 1. 消息与服务状态 */}
          {activeTab === 'messaging' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                     <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
                        <BoltIcon className="w-5 h-5 text-amber-500" />
                        <span>异步推送引擎监控</span>
                     </h3>
                     <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={RESOURCE_DATA}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="time" hide />
                              <YAxis hide />
                              <Tooltip />
                              <Area type="monotone" dataKey="push" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={3} />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="mt-4 flex justify-between text-[10px] font-bold text-gray-400">
                        <span>支持多终端推送：iOS / Android / Web / 浙政钉</span>
                        <span className="text-emerald-500">平均延时: 12ms</span>
                     </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                     <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
                        <SignalIcon className="w-5 h-5 text-blue-500" />
                        <span>外事阶段服务一致性</span>
                     </h3>
                     <div className="space-y-4">
                        {[
                          { name: '出国前筹备 (Pre-Trip)', status: 'Syncing', color: 'bg-blue-500' },
                          { name: '执行中监控 (On-Trip)', status: 'Live', color: 'bg-emerald-500' },
                          { name: '回国后核销 (Post-Trip)', status: 'Idle', color: 'bg-gray-400' },
                        ].map((s, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                             <span className="text-xs font-bold text-gray-700">{s.name}</span>
                             <span className={`px-2 py-0.5 rounded text-[8px] font-black text-white ${s.color}`}>{s.status}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* 2. 用户鉴权与请求管理 */}
          {activeTab === 'auth' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
               <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                  <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                     <FingerPrintIcon className="w-5 h-5 text-indigo-500" />
                     <span>身份全生命周期与请求熔断</span>
                  </h3>
                  <button className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">配置 MFA 策略</button>
               </div>
               <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">操作请求频率限制</p>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                           <div className="flex justify-between mb-4">
                              <span className="text-xs font-bold">高频行为预警阈值</span>
                              <span className="text-xs font-black text-indigo-600">500 req/min</span>
                           </div>
                           <input type="range" className="w-full accent-indigo-600" defaultValue={50} />
                        </div>
                     </div>
                     <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h4 className="text-xs font-bold text-indigo-300 mb-2">多因素鉴权 (MFA)</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">针对“成果转化”等核心敏感操作，强制开启二次身份校验（CA证书/指纹/动态口令）。</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* 3. 结构化数据管理 */}
          {activeTab === 'structured' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in zoom-in-95 duration-300">
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                     <CircleStackIcon className="w-5 h-5 text-emerald-500" />
                     <span>周期性快照与存储策略</span>
                  </h3>
                  <div className="space-y-4">
                     {['每日全量快照', '月度趋势备份'].map((t, i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                          <span className="text-xs font-bold">{t}</span>
                          <span className="text-[10px] font-black text-emerald-600">自动执行中</span>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-800 flex items-center space-x-2 mb-4">
                     <ArrowPathIcon className="w-5 h-5" />
                     <span>数据清洗与标准化引擎</span>
                  </h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                     依据最新外事政策，系统自动清洗过滤无效字段（如已过期护照号），确保成果转化提取的数据真实、合规、标准。
                  </p>
               </div>
            </div>
          )}

          {/* 4. 非结构化数据管理 */}
          {activeTab === 'unstructured' && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in duration-300">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                     <CloudArrowUpIcon className="w-5 h-5 text-blue-500" />
                     <span>OCR/NLP 自动提炼工作流</span>
                  </h3>
                  <span className="text-[10px] font-black text-gray-400">已处理：14,242 份文档</span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: '图片/照片', action: 'OCR 特征提取', status: 'Active' },
                    { label: 'Word/PDF', action: 'NLP 语义打标', status: 'Active' },
                    { label: '归国日志', action: '分类标签化存储', status: 'Active' },
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 cursor-default transition-all">
                       <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{s.label}</p>
                       <p className="text-xs font-bold text-gray-800">{s.action}</p>
                       <div className="mt-3 w-full h-1 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-3/4 animate-pulse"></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* 5. 信息检索与推荐 */}
          {activeTab === 'search' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-300">
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-6">专属检索维度配置</h3>
                  <div className="space-y-4">
                     {['按业务维度精准检索', '成果素材语义复用', '政策文件关联推荐'].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                           <span className="text-xs font-bold">{item}</span>
                           <div className="w-8 h-4 bg-blue-600 rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div></div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-center items-center text-center">
                  <SparklesIcon className="w-12 h-12 text-indigo-400 mb-4 animate-pulse" />
                  <h4 className="font-bold">决策辅助模型已就绪</h4>
                  <p className="text-xs text-slate-400 mt-2">基于 RAG 技术的智能推荐系统已覆盖 100% 的外事存量文件。</p>
               </div>
            </div>
          )}

          {/* 6. 学习与进化服务 */}
          {activeTab === 'learning' && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                        <AcademicCapIcon className="w-5 h-5 text-indigo-500" />
                        <span>业务规律分析与知识图谱</span>
                     </h3>
                     <button className="text-[10px] font-bold text-indigo-600">刷新模型权重</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                        <p className="text-xs font-bold text-indigo-900 mb-4">跨子服务日志关联分析</p>
                        <ul className="space-y-3 text-[10px] text-indigo-600">
                           <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"/><span>自动定位管理监督中的瓶颈环节</span></li>
                           <li className="flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"/><span>支持成果转化全流程一键溯源</span></li>
                        </ul>
                     </div>
                     <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                        <p className="text-xs font-bold text-gray-700 mb-4">标准化日志提炼 (NLP)</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed italic">"系统已自动过滤 85% 无效系统日志，提炼出 1,240 条具有监管价值的业务关键行为日志。"</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* 7. 日志分析与查询 */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                     <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                           <CommandLineIcon className="w-5 h-5 text-blue-500" />
                           <span>灵活分析查询工具</span>
                        </h3>
                        <div className="flex space-x-2">
                           <input type="text" placeholder="检索操作员/业务类型..." className="px-4 py-1.5 bg-gray-50 border-0 rounded-xl text-[10px] w-48" />
                        </div>
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                           <thead className="text-[10px] font-black text-gray-400 uppercase border-b border-gray-50">
                              <tr>
                                 <th className="py-3">时间</th>
                                 <th className="py-3">操作人</th>
                                 <th className="py-3">业务类型</th>
                                 <th className="py-3 text-right">状态</th>
                              </tr>
                           </thead>
                           <tbody className="text-[11px] divide-y divide-gray-50">
                              {[
                                { t: '14:20:12', u: '张管理员', b: '成果匹配策略调整', s: 'Success' },
                                { t: '13:55:00', u: 'System', b: '指标偏离度提醒', s: 'Warning' },
                                { t: '12:10:45', u: '李审批', b: '归国报告强制脱敏', s: 'Success' },
                              ].map((l, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                   <td className="py-3 font-mono text-gray-400">{l.t}</td>
                                   <td className="py-3 font-bold text-gray-700">{l.u}</td>
                                   <td className="py-3 font-medium text-gray-500">{l.b}</td>
                                   <td className="py-3 text-right"><span className={`font-black uppercase ${l.s === 'Success' ? 'text-emerald-500' : 'text-amber-500'}`}>{l.s}</span></td>
                                </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center items-center">
                     <h4 className="text-xs font-bold text-gray-800 mb-6 uppercase tracking-widest">指标健康分布</h4>
                     <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie data={LOG_STATS} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                 {LOG_STATS.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                              </Pie>
                              <Tooltip />
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="mt-4 p-4 bg-red-50 rounded-2xl w-full border border-red-100">
                        <div className="flex items-center space-x-2 text-red-700 mb-1">
                           <ExclamationTriangleIcon className="w-4 h-4" />
                           <span className="text-[10px] font-black">多层级异常提醒</span>
                        </div>
                        <p className="text-[9px] text-red-600 italic">检测到“成果转化进度”指标偏离标准范围 12%。</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* 8. 配置与服务注册 */}
          {activeTab === 'config' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
                     <Cog6ToothIcon className="w-5 h-5 text-slate-500" />
                     <span>系统参数在线调整 (Hot-Fix)</span>
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">出访天数红线配置 (一区国家)</label>
                        <div className="flex items-center space-x-4">
                           <input type="number" defaultValue={10} className="w-20 bg-gray-50 border-0 rounded-xl px-4 py-2 text-sm font-black focus:ring-2 focus:ring-blue-500" />
                           <span className="text-xs text-gray-400">天 (更新后立即全局生效)</span>
                        </div>
                     </div>
                     <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-200">应用最新外事政策参数</button>
                  </div>
               </div>
               <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
                  <h3 className="font-bold mb-6 flex items-center space-x-2 text-blue-400">
                     <CubeTransparentIcon className="w-5 h-5" />
                     <span>微服务注册中心 (Nacos/Consul)</span>
                  </h3>
                  <div className="space-y-4">
                     {['OGMS-Auth-Service', 'OGMS-NLP-Engine', 'OGMS-Data-Snapshot'].map((service, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
                           <span className="text-xs font-mono">{service}</span>
                           <span className="text-[8px] font-black bg-emerald-500 px-1.5 py-0.5 rounded text-white uppercase tracking-tighter">UP & HEALTHY</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemAdmin;
