
import React from 'react';
import { 
  DocumentChartBarIcon, 
  ArrowPathIcon, 
  AdjustmentsVerticalIcon,
  SquaresPlusIcon,
  ChartPieIcon,
  TableCellsIcon,
  ChevronRightIcon,
  // Added missing ListBulletIcon import
  ListBulletIcon
} from '@heroicons/react/24/outline';

const DepthAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <DocumentChartBarIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">深度分析报告自定义</h1>
            <p className="text-sm text-gray-500">自由配置报告结构与排版，可视化图表组件拖拽式生成，满足多样化决策需求。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 组件池 */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
              <h4 className="font-bold text-gray-800 text-xs uppercase tracking-widest mb-6">可视化组件池</h4>
              <div className="space-y-3">
                 {[
                   { name: '月度趋势折线图', icon: <ArrowPathIcon className="w-4 h-4" /> },
                   { name: '行业分布饼图', icon: <ChartPieIcon className="w-4 h-4" /> },
                   { name: '重点项目列表', icon: <ListBulletIcon className="w-4 h-4" /> },
                   { name: '转化价值数据表', icon: <TableCellsIcon className="w-4 h-4" /> },
                   { name: '合规风险雷达', icon: <AdjustmentsVerticalIcon className="w-4 h-4" /> },
                 ].map((c, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-transparent hover:border-blue-200 hover:bg-blue-50/50 cursor-grab active:cursor-grabbing transition-all group">
                      <div className="flex items-center space-x-3 text-gray-600">
                         {c.icon}
                         <span className="text-[11px] font-bold">{c.name}</span>
                      </div>
                      <SquaresPlusIcon className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                   </div>
                 ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                 <p className="text-[10px] text-gray-400 leading-relaxed italic">提示：拖拽组件到右侧画布即可自动关联业务数据源并生成图表。</p>
              </div>
           </div>
        </div>

        {/* 画布预览 */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-gray-100 shadow-sm p-12 min-h-[700px] flex flex-col">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight underline decoration-blue-500 decoration-4 underline-offset-8">2024 年度成果转化深度分析报告</h2>
              <p className="text-gray-400 mt-4 text-sm uppercase tracking-widest font-bold font-mono">Report Serial: OGMS-MATCH-ANNUAL-2024</p>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-gray-50 rounded-[40px] group hover:bg-gray-50/50 transition-all">
              <SquaresPlusIcon className="w-16 h-16 text-gray-100 group-hover:text-blue-100 transition-colors mb-4" />
              <p className="text-gray-300 font-bold">拖拽组件或点击配置章节结构</p>
           </div>

           <div className="mt-12 flex justify-between items-center border-t border-gray-100 pt-8">
              <div className="flex space-x-4">
                 <button className="px-6 py-2 bg-gray-100 text-gray-500 font-bold rounded-xl text-xs hover:bg-gray-200 transition-all">存为个人模版</button>
              </div>
              <button className="px-10 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all flex items-center space-x-2">
                 <span>发布并导出最终报告</span>
                 <ChevronRightIcon className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DepthAnalysis;
