
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts';
import { 
  RocketLaunchIcon, 
  MapIcon, 
  ChartPieIcon, 
  ListBulletIcon, 
  ShieldCheckIcon,
  ClockIcon,
  TrophyIcon,
  ShareIcon,
  ChevronDownIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const HEATMAP_DATA = [
  { name: '欧洲', count: 124, value: '￥8.5B' },
  { name: '东南亚', count: 85, value: '￥4.2B' },
  { name: '北美', count: 62, value: '￥12.1B' },
  { name: '中东', count: 45, value: '￥3.8B' },
  { name: '拉美', count: 28, value: '￥1.2B' },
];

const INDUSTRY_DATA = [
  { name: '先进制造', value: 45 },
  { name: '生物医药', value: 25 },
  { name: '数字经济', value: 18 },
  { name: '新能源', value: 12 },
];

const COMPLIANCE_RADAR = [
  { subject: '政策合规', A: 95, fullMark: 100 },
  { subject: '知识产权', A: 88, fullMark: 100 },
  { subject: '履约能力', A: 72, fullMark: 100 },
  { subject: '数据安全', A: 90, fullMark: 100 },
  { subject: '流程完整', A: 85, fullMark: 100 },
];

const APPROVAL_AGING = [
  { name: '初审', avg: 1.2, max: 4, min: 0.2 },
  { name: '复核', avg: 2.5, max: 8, min: 1.0 },
  { name: '终审', avg: 0.8, max: 2, min: 0.1 },
  { name: '归档', avg: 1.5, max: 5, min: 0.5 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const AchievementDataCockpit: React.FC = () => {
  const [timeRange, setTimeRange] = useState('本年度');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <RocketLaunchIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">成果数据驾驶舱</h1>
            <p className="text-sm text-gray-500">全球视野下的成果转化全链路动态监测与深度量化分析。</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 pr-10 focus:ring-0 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option>本月度</option>
              <option>本季度</option>
              <option>本年度</option>
            </select>
            <ChevronDownIcon className="w-3 h-3 text-gray-400 absolute right-3 top-3 pointer-events-none" />
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center space-x-2">
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>导出全量看板</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 区域分布热力视图 */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-800 flex items-center space-x-2">
              <MapIcon className="w-5 h-5 text-blue-500" />
              <span>全球区域成果热力图</span>
            </h3>
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Live Data Feed</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {HEATMAP_DATA.map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-white hover:border-indigo-100 hover:bg-indigo-50/50 transition-all cursor-pointer group">
                <p className="text-[10px] font-bold text-gray-400 mb-1">{item.name}</p>
                <p className="text-xl font-black text-gray-900">{item.count}</p>
                <p className="text-[10px] text-indigo-600 font-bold mt-2 group-hover:underline">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 h-48 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 flex items-center justify-center relative overflow-hidden">
             {/* 模拟热力背景 */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')]"></div>
             <p className="text-xs text-gray-400 font-bold z-10">点击区域下钻查看详情</p>
          </div>
        </div>

        {/* 动态饼图 - 行业占比 */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <ChartPieIcon className="w-5 h-5 text-emerald-500" />
            <span>重点行业分布</span>
          </h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={INDUSTRY_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {INDUSTRY_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
             {INDUSTRY_DATA.map((item, i) => (
               <div key={i} className="flex items-center justify-between text-xs">
                 <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                   <span className="text-gray-500">{item.name}</span>
                 </div>
                 <span className="font-bold">{item.value}%</span>
               </div>
             ))}
          </div>
        </div>

        {/* 重点项目追踪 - 甘特图/进度条视图 */}
        <div className="lg:col-span-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-8 flex items-center space-x-2">
            <ListBulletIcon className="w-5 h-5 text-orange-500" />
            <span>重点转化项目实时跟踪</span>
          </h3>
          <div className="space-y-8">
            {[
              { name: '库卡六轴机器人联合实验室', status: '协议签署', progress: 85, risk: 'Low' },
              { name: '博世新能源三电系统落地', status: '匹配成功', progress: 45, risk: 'Medium' },
              { name: '东南亚碳中和技术合作', status: '项目落地', progress: 95, risk: 'Low' },
            ].map((proj, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-sm text-gray-900">{proj.name}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-tighter">{proj.status}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-[10px] font-bold ${proj.risk === 'Low' ? 'text-emerald-500' : 'text-amber-500'}`}>Risk: {proj.risk}</span>
                    <span className="text-xs font-black text-indigo-600">{proj.progress}%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${proj.risk === 'Low' ? 'bg-indigo-500' : 'bg-amber-500'}`} 
                    style={{ width: `${proj.progress}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 合规性预警雷达 */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <ShieldCheckIcon className="w-5 h-5 text-red-500" />
            <span>合规风险多维雷达</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={COMPLIANCE_RADAR}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                <Radar name="合规分" dataKey="A" stroke="#EF4444" fill="#EF4444" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
             <p className="text-[10px] font-bold text-red-800 uppercase mb-1">风险提示 (AI)</p>
             <p className="text-xs text-red-600 italic leading-relaxed">履约能力维度低于阈值，建议加强对方财务审计复核。</p>
          </div>
        </div>

        {/* 审批时效柱状图 */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <ClockIcon className="w-5 h-5 text-blue-500" />
            <span>流程审批时效分布 (Days)</span>
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={APPROVAL_AGING}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar dataKey="avg" name="平均耗时" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="max" name="最大耗时" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 成果转化排行表 */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <TrophyIcon className="w-5 h-5 text-yellow-500" />
            <span>成果转化价值排行 (TOP 5)</span>
          </h3>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-3">排名</th>
                  <th className="px-4 py-3">项目/成果</th>
                  <th className="px-4 py-3">单位</th>
                  <th className="px-4 py-3 text-right">价值评分</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-50">
                {[
                  { name: '工业4.0视觉专利包', unit: '市经信局', score: 98, rank: 1 },
                  { name: '氢能源电池堆技术', unit: '绿能科技', score: 95, rank: 2 },
                  { name: '跨国供应链优化算法', unit: '物流集团', score: 92, rank: 3 },
                  { name: '生物制药合成路径', unit: '康泰生物', score: 88, rank: 4 },
                  { name: '智慧农业控制系统', unit: '农业开发', score: 85, rank: 5 },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-4 py-3">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black ${
                        i < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-400'
                      }`}>{item.rank}</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-800 truncate max-w-[150px]">{item.name}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{item.unit}</td>
                    <td className="px-4 py-3 text-right font-black text-indigo-600">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 关联产业图谱 - 模拟视图 */}
        <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2xl shadow-xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <ShareIcon className="w-48 h-48 text-white" />
          </div>
          <h3 className="font-bold text-white mb-6 flex items-center space-x-2 relative z-10">
            <ShareIcon className="w-5 h-5 text-blue-400" />
            <span>关联产业图谱及高价值案例</span>
          </h3>
          <div className="flex-1 flex items-center justify-center relative z-10">
            {/* 模拟图谱中心节点 */}
            <div className="relative">
               <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <span className="text-white text-[10px] font-black">核心成果</span>
               </div>
               <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 w-12 h-12 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="text-[8px] text-white/60">智能制造</span>
               </div>
               <div className="absolute bottom-0 right-0 translate-x-12 translate-y-12 w-12 h-12 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="text-[8px] text-white/60">数字孪生</span>
               </div>
               <div className="absolute top-1/2 right-0 translate-x-16 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="text-[8px] text-white/60">云计算</span>
               </div>
            </div>
          </div>
          <div className="mt-6 bg-white/5 rounded-2xl p-4 border border-white/10 relative z-10">
             <p className="text-[10px] font-bold text-blue-400 uppercase mb-1 tracking-widest">高价值转化案例</p>
             <h4 className="text-sm font-bold text-white mb-1">库卡工业大脑深度应用案</h4>
             <p className="text-[11px] text-slate-400 italic">“该项目成功带动本地 12 家配套企业数字化转型...”</p>
             <button className="mt-3 text-[10px] font-bold text-indigo-400 hover:text-indigo-300">查看详细报告 &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementDataCockpit;
