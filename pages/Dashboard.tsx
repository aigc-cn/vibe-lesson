
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  GlobeAltIcon, 
  ArrowTrendingUpIcon, 
  UserGroupIcon, 
  CurrencyYenIcon 
} from '@heroicons/react/24/solid';

const INDUSTRY_DATA = [
  { name: '先进制造', value: 400 },
  { name: '信息技术', value: 300 },
  { name: '绿色能源', value: 300 },
  { name: '医疗健康', value: 200 },
  { name: '现代物流', value: 278 },
];

const COMPLIANCE_RADAR = [
  { subject: '政策合规', A: 120, fullMark: 150 },
  { subject: 'IP保护', A: 98, fullMark: 150 },
  { subject: '履约能力', A: 86, fullMark: 150 },
  { subject: '数据安全', A: 99, fullMark: 150 },
  { subject: '预算控制', A: 85, fullMark: 150 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: '年度出访总数', value: '428', icon: <GlobeAltIcon />, color: 'bg-blue-500', trend: '+12%' },
          { title: '成果转化总额', value: '￥2.4B', icon: <CurrencyYenIcon />, color: 'bg-green-500', trend: '+8.5%' },
          { title: '累计出访人次', value: '1,520', icon: <UserGroupIcon />, color: 'bg-purple-500', trend: '+15%' },
          { title: '风险预警总数', value: '12', icon: <ArrowTrendingUpIcon />, color: 'bg-orange-500', trend: '-2.3%' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{kpi.title}</p>
              <h3 className="text-2xl font-bold">{kpi.value}</h3>
              <p className={`text-xs mt-1 ${kpi.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.trend} <span className="text-gray-400">vs 去年同期</span>
              </p>
            </div>
            <div className={`${kpi.color} p-3 rounded-lg text-white shadow-lg`}>
              {React.cloneElement(kpi.icon as React.ReactElement, { className: 'w-6 h-6' })}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Achievement Distribution */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">区域成果转化价值分布</h3>
            <select className="text-xs border-gray-200 rounded p-1">
              <option>本季度</option>
              <option>本年度</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INDUSTRY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Radar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">合规性评估雷达</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={COMPLIANCE_RADAR}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="合规表现" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">行业占比 (动态饼图)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={INDUSTRY_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {INDUSTRY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">最近出访成果快讯</h3>
          <div className="space-y-4">
            {[
              { unit: '局级团组', destination: '德国/法国', content: '签署工业4.0合作备忘录', date: '2小时前' },
              { unit: '某制药企业', destination: '美国', content: '生物制药实验室揭牌', date: '5小时前' },
              { unit: '市经信局', destination: '日本', content: '高端传感器技术引进对接', date: '1天前' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{activity.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.unit} • {activity.destination}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
