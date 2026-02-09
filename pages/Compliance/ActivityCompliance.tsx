
import React from 'react';
import { SparklesIcon, ListBulletIcon, ShieldExclamationIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const ActivityCompliance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-100 text-white">
            <SparklesIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">境外活动合规监控</h1>
            <p className="text-sm text-gray-500">维护活动禁限库，自动比对行程表中的会议、考察及参展项目。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
               <ShieldExclamationIcon className="w-5 h-5 text-red-500" />
               <span>禁止/敏感活动清单 (Blacklist)</span>
            </h3>
            <div className="space-y-3">
               {[
                 '任何形式的境外营利性宣讲',
                 '未经授权的敏感军事/国防设施考察',
                 '涉及主权领土争议的官方论坛',
                 '由列入黑名单的非政府组织(NGO)资助的活动'
               ].map((item, i) => (
                 <div key={i} className="p-4 bg-red-50/50 rounded-2xl border border-red-50 text-xs font-bold text-red-700 flex items-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 shadow-sm" />
                    {item}
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
               <CheckBadgeIcon className="w-5 h-5 text-emerald-500" />
               <span>豁免/白名单活动</span>
            </h3>
            <div className="space-y-3">
               {[
                 '联合国及关联国际组织正式会议',
                 '我驻外使领馆直接组织的招商会',
                 '全球 500 强企业总部开放日技术交流',
               ].map((item, i) => (
                 <div key={i} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-50 text-xs font-bold text-emerald-700 flex items-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3 shadow-sm" />
                    {item}
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ActivityCompliance;
