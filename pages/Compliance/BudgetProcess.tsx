
import React from 'react';
import { 
  CurrencyYenIcon, 
  ExclamationCircleIcon, 
  ShieldCheckIcon,
  ArrowPathIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DATA = [
  { name: '外事接待费', used: 75, total: 100, status: 'normal' },
  { name: '公杂费', used: 85, total: 100, status: 'warning' },
  { name: '伙食补助', used: 102, total: 100, status: 'danger' },
  { name: '住宿费', used: 45, total: 100, status: 'normal' },
  { name: '交通费', used: 60, total: 100, status: 'normal' },
];

const BudgetProcess: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <CurrencyYenIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">预算审批流程监控</h1>
            <p className="text-sm text-gray-500">实时比对预算科目限额，动态提示超标风险（80% 预警 / 100% 熔断）。</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center space-x-2">
          <ArrowPathIcon className="w-4 h-4" />
          <span>同步财务数据</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5 text-blue-500" />
            <span>各科目执行进度 (%)</span>
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="used" radius={[4, 4, 0, 0]} barSize={40}>
                  {DATA.map((entry, index) => (
                    <Cell key={index} fill={entry.used >= 100 ? '#EF4444' : entry.used >= 80 ? '#F59E0B' : '#3B82F6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
            <div className="flex items-center space-x-2 text-red-700 mb-4">
              <ExclamationCircleIcon className="w-6 h-6" />
              <h4 className="font-bold">熔断拦截警报</h4>
            </div>
            <p className="text-xs text-red-600 leading-relaxed font-medium mb-4">
              [伙食补助] 科目已超出本月限额 2%。系统已自动拦截所有该科目相关的非必要支付申请，请提交特批申请或调剂额度。
            </p>
            <button className="w-full py-3 bg-red-600 text-white rounded-2xl text-[10px] font-bold shadow-lg shadow-red-500/20">查看特批流程</button>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center space-x-3">
            <ShieldCheckIcon className="w-10 h-10 text-emerald-600" />
            <div>
              <p className="text-xs font-bold text-emerald-800">预算合规状态：良好</p>
              <p className="text-[10px] text-emerald-600 mt-1">除一项异常外，其余 12 个科目均处于安全范围内。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetProcess;
