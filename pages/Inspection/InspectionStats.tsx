
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  ArrowDownTrayIcon, 
  FunnelIcon,
  ChartPieIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

const TREND_DATA = [
  { month: '1月', count: 45, success: 42 },
  { month: '2月', count: 52, success: 48 },
  { month: '3月', count: 61, success: 59 },
  { month: '4月', count: 58, success: 55 },
  { month: '5月', count: 72, success: 68 },
  { month: '6月', count: 85, success: 82 },
];

const CATEGORY_DATA = [
  { name: '局级团组', value: 35 },
  { name: '企事业团组', value: 120 },
  { name: '个人出访', value: 45 },
  { name: '招商专项', value: 65 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const InspectionStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">出站数据统计分析</h1>
          <p className="text-sm text-gray-500">多维数据汇聚分析，为资源调配与政策优化提供量化依据。</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <FunnelIcon className="w-4 h-4" />
            <span>筛选维度</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>导出统计报告 (PDF)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI Cards */}
        {[
          { label: '总出站数据量', value: '1,284', trend: '+5.2%', desc: '较上月增长' },
          { label: '数据清洗成功率', value: '98.6%', trend: '+0.4%', desc: '近30天均值' },
          { label: '平均处理耗时', value: '4.2h', trend: '-12%', desc: '较去年同期' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-gray-800">{kpi.value}</h3>
              <div className="text-right">
                <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-green-500' : 'text-blue-500'}`}>
                  {kpi.trend}
                </span>
                <p className="text-[10px] text-gray-400">{kpi.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-6 text-gray-800 font-bold">
            <PresentationChartLineIcon className="w-5 h-5 text-blue-500" />
            <span>出站业务趋势分析 (按月)</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="count" name="总申报量" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="success" name="已通过量" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-6 text-gray-800 font-bold">
            <ChartPieIcon className="w-5 h-5 text-orange-500" />
            <span>出访类型分布</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {CATEGORY_DATA.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-bold text-gray-800">{item.value} 项</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionStats;
