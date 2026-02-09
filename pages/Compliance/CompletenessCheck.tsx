
import React from 'react';
import { CheckBadgeIcon, ListBulletIcon, IdentificationIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline';

const CompletenessCheck: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <CheckBadgeIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">内容完整性检查项配置</h1>
            <p className="text-sm text-gray-500">动态配置必填项、附件清单及签章要求，作为审核流水线的首道关口。</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
         <h3 className="font-bold text-gray-800 mb-8 flex items-center space-x-2">
            <ListBulletIcon className="w-5 h-5 text-blue-500" />
            <span>通用强制检查项 (Mandatory Checklist)</span>
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '邀请函原件及翻译件', type: '附件', icon: <DocumentArrowUpIcon /> },
              { title: '出访人员因公护照复印件', type: '附件', icon: <IdentificationIcon /> },
              { title: '团组主要领导签字审批表', type: '字段/附件', icon: <CheckBadgeIcon /> },
              { title: '详细行程执行方案 (含每日)', type: '字段', icon: <ListBulletIcon /> },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-blue-200 transition-all flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center space-x-4">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                       {React.cloneElement(item.icon as React.ReactElement, { className: 'w-5 h-5' })}
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                       <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">分类：{item.type}</p>
                    </div>
                 </div>
                 <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center justify-end px-1 shadow-inner">
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default CompletenessCheck;
