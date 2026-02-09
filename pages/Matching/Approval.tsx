
import React from 'react';
import { 
  ClipboardDocumentCheckIcon, 
  UserGroupIcon, 
  ArrowRightCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

const MatchingApproval: React.FC = () => {
  const approvals = [
    { id: 'MA-001', project: '库卡机器人算法转化申请', unit: '某智能装备公司', date: '2024-05-22', status: '待终审', level: 3 },
    { id: 'MA-002', project: '新能源电池包专利引进', unit: '绿能科技研究院', date: '2024-05-21', status: '复核中', level: 2 },
    { id: 'MA-003', project: '东南亚生鲜冷链体系方案', unit: '市商贸局', date: '2024-05-18', status: '已驳回', level: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100 text-white">
            <ClipboardDocumentCheckIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">成果撮合审批管理</h1>
            <p className="text-sm text-gray-500">三级审核机制，实时进度追踪与月度需求热点统计。</p>
          </div>
        </div>
        <div className="flex space-x-2">
           <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg flex items-center space-x-2">
              <DocumentArrowDownIcon className="w-4 h-4" />
              <span>输出月度分析报告</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">待审批列表</h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white">
                    <tr>
                      <th className="px-6 py-4">审批编号</th>
                      <th className="px-6 py-4">申请项目</th>
                      <th className="px-6 py-4">申报单位</th>
                      <th className="px-6 py-4">当前进度</th>
                      <th className="px-6 py-4">申请时间</th>
                      <th className="px-6 py-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-50">
                    {approvals.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-blue-600">{row.id}</td>
                        <td className="px-6 py-4 font-bold text-gray-800">{row.project}</td>
                        <td className="px-6 py-4 text-gray-500">{row.unit}</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center space-x-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.status === '已驳回' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                              }`}>{row.status}</span>
                              <div className="flex space-x-0.5">
                                 {[1,2,3].map(step => (
                                   <div key={step} className={`w-3 h-1 rounded-full ${step <= row.level ? (row.status === '已驳回' ? 'bg-red-400' : 'bg-blue-500') : 'bg-gray-200'}`}></div>
                                 ))}
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs font-mono">{row.date}</td>
                        <td className="px-6 py-4 text-right">
                           <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold hover:bg-blue-700">处理</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingApproval;
