
import React from 'react';
import { 
  PresentationChartLineIcon, 
  ArrowRightCircleIcon,
  BellIcon,
  AdjustmentsVerticalIcon,
  CheckBadgeIcon,
  // Added missing AdjustmentsHorizontalIcon import
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const ProcessManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <PresentationChartLineIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">进度流程可视化管理</h1>
            <p className="text-sm text-gray-500">全流程进度条展示，超期节点自动标红预警，支持人工干预与详情穿透。</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-12">
         {[
           { name: '某跨国药企联合研发实验室撮合', progress: 65, status: 'warning', overdue: true },
           { name: '中欧工业机器人控制方案引进', progress: 92, status: 'success', overdue: false },
           { name: '拉美现代农业数字底座项目', progress: 25, status: 'active', overdue: false },
         ].map((project, i) => (
           <div key={i} className="space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    {project.overdue && (
                      <span className="flex items-center px-2 py-0.5 bg-red-100 text-red-600 rounded text-[9px] font-black uppercase tracking-tighter animate-pulse">
                         <BellIcon className="w-3 h-3 mr-1" /> 超期预警
                      </span>
                    )}
                 </div>
                 <span className={`text-xs font-black ${project.overdue ? 'text-red-500' : 'text-blue-600'}`}>{project.progress}% Complete</span>
              </div>
              
              <div className="relative pt-1">
                 <div className="flex mb-2 items-center justify-between">
                    <div className="flex space-x-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                       <span>需求发布</span>
                       <span className={project.progress > 30 ? 'text-indigo-600' : ''}>智能匹配</span>
                       <span className={project.progress > 60 ? 'text-indigo-600' : ''}>三方洽谈</span>
                       <span className={project.progress > 90 ? 'text-indigo-600' : ''}>协议签署</span>
                    </div>
                 </div>
                 <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-100">
                    <div 
                       style={{ width: `${project.progress}%` }} 
                       className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ${
                         project.overdue ? 'bg-red-500' : 'bg-indigo-600'
                       }`}
                    ></div>
                 </div>
              </div>

              <div className="flex justify-end space-x-3">
                 <button className="px-4 py-1.5 bg-white border border-gray-200 text-[10px] font-bold rounded-lg hover:bg-gray-50 flex items-center space-x-1">
                    <AdjustmentsHorizontalIcon className="w-3 h-3" />
                    <span>人工干预</span>
                 </button>
                 <button className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 flex items-center space-x-1 shadow-lg">
                    <ArrowRightCircleIcon className="w-3 h-3" />
                    <span>查看节点详情</span>
                 </button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default ProcessManagement;
