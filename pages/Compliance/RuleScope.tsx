
import React from 'react';
import { GlobeAsiaAustraliaIcon, ListBulletIcon, CheckCircleIcon, UsersIcon } from '@heroicons/react/24/outline';

const RuleScope: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <GlobeAsiaAustraliaIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">规则适用范围设置</h1>
            <p className="text-sm text-gray-500">精准定义各级规则包的生效范围，支持按区域、团组类型、单位层级配置。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
               <ListBulletIcon className="w-5 h-5 text-blue-500" />
               <span>适用团组类型</span>
            </h3>
            <div className="space-y-3">
               {['局级出访团组', '企事业专业团组', '招商引资专项', '个人公务出访'].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-200 cursor-pointer group">
                    <span className="text-sm font-bold text-gray-700">{item}</span>
                    <input type="checkbox" defaultChecked className="rounded text-blue-600 w-5 h-5 border-gray-300" />
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
            <h3 className="font-bold mb-6 flex items-center space-x-2 text-indigo-400">
               <UsersIcon className="w-5 h-5" />
               <span>单位覆盖白名单</span>
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
               {['市经信局', '市投促办', '科技成果中心', '某智能装备集团', '绿能研究院'].map((unit, i) => (
                 <div key={i} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                    <span className="text-xs text-slate-300">{unit}</span>
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                 </div>
               ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">添加新单位关联</button>
         </div>
      </div>
    </div>
  );
};

export default RuleScope;
