
import React from 'react';
import { 
  NumberedListIcon, 
  PencilSquareIcon, 
  PlusIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const PointRules: React.FC = () => {
  const rules = [
    { id: 'R1', name: '高质量成果发布奖', points: '+50/项', status: 'Published', date: '2024-05-20' },
    { id: 'R2', name: '成功撮合并签约奖', points: '+500/项', status: 'Published', date: '2024-04-15' },
    { id: 'R3', name: '提供战略情报建议奖', points: '+20-100/条', status: 'Draft', date: '2024-05-22' },
    { id: 'R4', name: '活跃参与对接会奖励', points: '+5/次', status: 'Published', date: '2023-12-01' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <NumberedListIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">积分规则管理</h1>
            <p className="text-sm text-gray-500">维护激励机制的有效性，动态调整成果价值与积分对应规则。</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center space-x-2">
          <PlusIcon className="w-4 h-4" />
          <span>新增积分规则</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
           <h3 className="font-bold text-gray-800">规则字典列表</h3>
           <div className="flex space-x-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold">3 个运行中</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-400 rounded-full text-[10px] font-bold">1 个草稿</span>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">规则名称</th>
                <th className="px-6 py-4">积分标准</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4">最后修订时间</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {rules.map(rule => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-800">{rule.name}</td>
                  <td className="px-6 py-4">
                     <span className="font-mono text-blue-600 font-black">{rule.points}</span>
                  </td>
                  <td className="px-6 py-4">
                    {rule.status === 'Published' ? (
                      <span className="flex items-center text-emerald-600 font-bold text-[10px]"><CheckCircleIcon className="w-3.5 h-3.5 mr-1" /> 已生效</span>
                    ) : (
                      <span className="flex items-center text-gray-400 font-bold text-[10px]"><ClockIcon className="w-3.5 h-3.5 mr-1" /> 草稿待发布</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs font-mono">{rule.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-300 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100">
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <h3 className="font-bold mb-4 flex items-center space-x-2 text-amber-400">
               <ShieldCheckIcon className="w-5 h-5" />
               <span>变更留痕与审计</span>
            </h3>
            <div className="space-y-4">
               {[
                 { action: 'Admin 修改了 [成功签约奖] 积分由 400 提升至 500', time: '2小时前' },
                 { action: 'System 自动归档了 2023 年度全量规则版本', time: '1天前' }
               ].map((log, i) => (
                 <div key={i} className="text-xs border-l-2 border-slate-700 pl-4 py-1">
                    <p className="text-slate-200">{log.action}</p>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">{log.time}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 flex flex-col justify-center">
            <h4 className="font-bold text-blue-800 mb-2">规则版本迭代管理</h4>
            <p className="text-xs text-blue-600 leading-relaxed">
               系统每季度自动评估规则激励效能。当前规则包：v2024_Q2_Default。如需切换至备选激励模式，请联系管理员。
            </p>
            <button className="mt-6 px-6 py-3 bg-white border border-blue-200 text-blue-600 font-bold rounded-2xl text-xs hover:bg-blue-100 transition-all w-fit">查看历史版本列表</button>
         </div>
      </div>
    </div>
  );
};

export default PointRules;
