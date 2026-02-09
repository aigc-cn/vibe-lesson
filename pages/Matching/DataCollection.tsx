
import React from 'react';
import { 
  CircleStackIcon, 
  ArrowPathIcon, 
  DocumentArrowDownIcon,
  CpuChipIcon,
  TimelineIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

const DataCollection: React.FC = () => {
  const logs = [
    { time: '10:45:12', event: '流程状态变更：已提交 -> 契合度评估中', source: '审批引擎日志', cost: '0.05s' },
    { time: '10:46:05', event: 'NLP 关键词提取完成，锁定向量 ID: #4921', source: 'AI 处理模块', cost: '1.2s' },
    { time: '11:02:22', event: '三级审核节点激活：[成果持有方中心站]', source: '权限分配系统', cost: '0.12s' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-slate-800 rounded-2xl shadow-lg shadow-slate-200 text-white">
            <CircleStackIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">撮合进度数据自动采集</h1>
            <p className="text-sm text-gray-500">基于状态变更事件实时计算耗时，构建不可篡改的撮合进度档案。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {[
           { label: '累计采集事件', value: '45,218', color: 'text-blue-600' },
           { label: '平均处理延时', value: '0.45s', color: 'text-indigo-600' },
           { label: '同步失效率', value: '0.02%', color: 'text-emerald-600' },
           { label: '数据副本数', value: '3', color: 'text-amber-600' },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <p className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</p>
           </div>
         ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 flex items-center space-x-2">
               <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
               <span>实时事件流 (Event Stream)</span>
            </h3>
            <button className="flex items-center space-x-2 text-[10px] font-bold text-blue-600 hover:underline">
               <ArrowPathIcon className="w-4 h-4" />
               <span>手动拉取全量日志</span>
            </button>
         </div>
         <div className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                     <tr>
                        <th className="px-6 py-4">采集时间</th>
                        <th className="px-6 py-4">事件描述</th>
                        <th className="px-6 py-4">数据源</th>
                        <th className="px-6 py-4 text-right">处理耗时</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-50">
                     {logs.map((log, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-mono text-[10px] text-gray-400">{log.time}</td>
                          <td className="px-6 py-4 font-bold text-gray-700">{log.event}</td>
                          <td className="px-6 py-4 text-xs text-gray-500 italic">{log.source}</td>
                          <td className="px-6 py-4 text-right font-mono text-emerald-600 font-bold">{log.cost}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DataCollection;
