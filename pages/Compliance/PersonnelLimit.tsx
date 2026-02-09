
import React from 'react';
import { UsersIcon, AdjustmentsHorizontalIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const PersonnelLimit: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <UsersIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">人数上限动态调整</h1>
            <p className="text-sm text-gray-500">基于职级、国家风险、任务紧急程度，动态设定并管控出访人数上限。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {[
           { level: '局级团组', limit: '5 人', rule: '国家标准 (强制)' },
           { level: '企事业研发', limit: '3-8 人', rule: '按项目规模浮动' },
           { level: '招商引资', limit: '不限', rule: '需提交合理性论证' },
         ].map((card, i) => (
           <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group hover:border-blue-200 transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-2">{card.level}</p>
              <h3 className="text-3xl font-black text-gray-900 mb-6">{card.limit}</h3>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                 <span className="text-[10px] font-bold text-blue-600">{card.rule}</span>
                 <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-300 group-hover:text-blue-500 cursor-pointer" />
              </div>
           </div>
         ))}
      </div>

      <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex items-start space-x-4">
         <ShieldCheckIcon className="w-10 h-10 text-indigo-600" />
         <div>
            <h4 className="font-black text-indigo-800">动态限额算法说明</h4>
            <p className="text-xs text-indigo-700 leading-loose mt-2">
               系统会自动检测目的地安全风险，对于 [高风险] 地区，人数上限将自动锁定为 “必需人员 + 2人冗余”，且强制要求至少一名保密/安全专职人员随行。
            </p>
         </div>
      </div>
    </div>
  );
};

export default PersonnelLimit;
