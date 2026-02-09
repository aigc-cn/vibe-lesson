
import React from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ArrowRightIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const InspectionTracking: React.FC = () => {
  const tasks = [
    { id: 'T-8821', name: '某工业团组德国访问数据', unit: '市经信局', stage: '合规校验', progress: 85, time: '2小时前', status: 'normal' },
    { id: 'T-8822', name: '医疗器械美非巡回展数据', unit: '某生物科技', stage: '数据清洗', progress: 45, time: '12分钟前', status: 'warning' },
    { id: 'T-8823', name: '北欧能源合作项目结项', unit: '电力集团', stage: '流程归档', progress: 98, time: '5分钟前', status: 'normal' },
    { id: 'T-8824', name: '东南亚现代农业对接报告', unit: '农业局', stage: '数据采集', progress: 12, time: '1天前', status: 'danger' },
  ];

  const stages = ['数据采集', '数据清洗', '转换入库', '合规校验', '流程归档'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">出站结查流程跟踪</h1>
        <p className="text-sm text-gray-500">实时监控结查流程节点，确保流程可视化、及时处置异常。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Stage {i+1}</div>
            <h4 className="text-sm font-bold text-gray-800">{s}</h4>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-black text-blue-600">{Math.floor(Math.random() * 10) + 2}</span>
              <span className="text-[10px] text-gray-400">活跃任务</span>
            </div>
            {i < stages.length - 1 && (
              <ArrowRightIcon className="w-4 h-4 text-gray-200 absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block" />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">当前任务监控队列</h3>
          <div className="flex space-x-2">
             <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold">3 个异常预警</span>
             <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold">14 个正常进行</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">项目编号 / 名称</th>
                <th className="px-6 py-4">所属单位</th>
                <th className="px-6 py-4">当前阶段</th>
                <th className="px-6 py-4">整体进度</th>
                <th className="px-6 py-4">最后活跃</th>
                <th className="px-6 py-4 text-right">管理</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded w-fit mb-1">{task.id}</span>
                      <span className="font-semibold text-gray-800">{task.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <UserCircleIcon className="w-4 h-4" />
                      <span>{task.unit}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {task.status === 'normal' && <CheckCircleIcon className="w-4 h-4 text-emerald-500" />}
                      {task.status === 'warning' && <ClockIcon className="w-4 h-4 text-amber-500" />}
                      {task.status === 'danger' && <ExclamationCircleIcon className="w-4 h-4 text-red-500" />}
                      <span className="font-medium">{task.stage}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${task.status === 'danger' ? 'bg-red-500' : 'bg-blue-500'}`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">{task.time}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-blue-600 hover:underline">查看详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InspectionTracking;
