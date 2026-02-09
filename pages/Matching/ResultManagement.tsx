
import React from 'react';
import { 
  IdentificationIcon, 
  ChartBarSquareIcon, 
  ArrowRightCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  FunnelIcon,
  AdjustmentsVerticalIcon
} from '@heroicons/react/24/outline';

const MatchingResults: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <ChartBarSquareIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">撮合匹配结果管理</h1>
            <p className="text-sm text-gray-500">智能过滤前 5 名高分候选，生成《匹配分析报告》及支持理由记录。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                 <h3 className="font-bold text-gray-800">Top 5 高契合候选成果</h3>
                 <span className="text-[10px] font-bold text-gray-400">已自动过滤涉密/不可公开成果</span>
              </div>
              <div className="p-0 divide-y divide-gray-50">
                 {[
                   { name: '六轴机器人感知方案', score: 94, techMatch: 9.5, feasibility: 8.8, complementary: 9.2 },
                   { name: '新型激光传感器模组', score: 88, techMatch: 8.5, feasibility: 9.0, complementary: 8.5 },
                   { name: '工业大脑底座 V3.0', score: 75, techMatch: 7.2, feasibility: 8.5, complementary: 7.8 },
                 ].map((item, i) => (
                   <div key={i} className="p-6 hover:bg-gray-50/50 transition-all flex items-center justify-between group">
                      <div className="flex items-center space-x-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${i === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>0{i+1}</div>
                         <div>
                            <h4 className="font-bold text-gray-800">{item.name}</h4>
                            <div className="flex items-center space-x-4 mt-1">
                               <span className="text-[10px] font-bold text-gray-400">技术评分: {item.techMatch}</span>
                               <span className="text-[10px] font-bold text-gray-400">可行性: {item.feasibility}</span>
                               <span className="text-[10px] font-bold text-gray-400">资源互补: {item.complementary}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center space-x-6">
                         <div className="text-right">
                            <span className="text-[10px] font-bold text-gray-400 block uppercase">匹配分</span>
                            <span className="text-2xl font-black text-indigo-600">{item.score}</span>
                         </div>
                         <button className="p-2 text-gray-300 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all"><ArrowRightCircleIcon className="w-6 h-6" /></button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between h-full min-h-[400px]">
              <div>
                 <h3 className="font-bold mb-6 flex items-center space-x-2 text-indigo-400">
                    <DocumentTextIcon className="w-5 h-5" />
                    <span>自动生成匹配分析报告</span>
                 </h3>
                 <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    系统已根据 Top 1 候选成果自动草拟《深度匹配报告》，包含合作可行性及资源补强计划。
                 </p>
              </div>
              <div className="space-y-3">
                 <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-500/20">预览分析报告</button>
                 <button className="w-full py-4 bg-white/5 border border-white/10 text-slate-300 rounded-2xl font-bold text-sm hover:bg-white/10">人工修正推荐并记录理由</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingResults;
