
import React from 'react';
import { 
  ClockIcon, 
  DocumentMagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const RuleVersions: React.FC = () => {
  const versions = [
    { ver: 'v2.4.1', date: '2024-05-20', author: 'System Admin', changes: '更新了对华友好度分值权重计算逻辑', status: 'Active' },
    { ver: 'v2.3.0', date: '2024-04-12', author: '政策研究室', changes: '新增“双向背调”强制校验项', status: 'Archived' },
    { ver: 'v2.2.5', date: '2024-03-01', author: '法务中心', changes: '针对欧盟GDPR调整了脱敏掩码规则', status: 'Archived' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-slate-900 rounded-2xl shadow-lg shadow-slate-200 text-white">
            <ClockIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">规则版本迭代记录</h1>
            <p className="text-sm text-gray-500">记录系统审核规则包的每一次变迁，支持差异化比对与版本回滚。</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">版本号</th>
                <th className="px-6 py-4">修订时间</th>
                <th className="px-6 py-4">修订人</th>
                <th className="px-6 py-4">变更摘要</th>
                <th className="px-6 py-4 text-right">状态</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {versions.map((v, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-black text-blue-600">{v.ver}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{v.date}</td>
                  <td className="px-6 py-4 text-gray-600 font-bold">{v.author}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{v.changes}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      v.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
                    }`}>{v.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
           <DocumentMagnifyingGlassIcon className="w-10 h-10 text-blue-600" />
           <div>
              <h4 className="font-bold text-blue-800">版本差异可视化比对</h4>
              <p className="text-xs text-blue-600 mt-1">选择任意两个版本，系统将自动标记出新增、删除及修改的规则条目。</p>
           </div>
        </div>
        <button className="px-6 py-3 bg-white border border-blue-200 text-blue-600 font-bold rounded-2xl text-xs hover:bg-blue-100 transition-all flex items-center space-x-2">
           <span>开始比对</span>
           <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RuleVersions;
