
import React, { useState } from 'react';
import { 
  IdentificationIcon, 
  ArrowPathIcon, 
  ClipboardDocumentCheckIcon,
  PlusIcon,
  ArchiveBoxIcon,
  // Added missing ShieldCheckIcon import
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const ApplicationEntry: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <IdentificationIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">成果转化需求申请入口</h1>
            <p className="text-sm text-gray-500">根据外事办标准自定义字段，实现在线录入、保存草稿及撤回操作。</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 flex items-center space-x-2">
            <ArchiveBoxIcon className="w-4 h-4" />
            <span>表单配置管理</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="border-b border-gray-100 pb-4">
           <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-blue-500" />
              <span>成果转化需求申请表 (V2.1)</span>
           </h3>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">需求单位</label>
              <input type="text" placeholder="请输入单位全称" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">所属产业领域</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500">
                <option>请选择领域</option>
                <option>先进制造</option>
                <option>数字经济</option>
                <option>生物医药</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">转化目标详情</label>
            <textarea rows={4} placeholder="描述核心技术需求或合作模式（如：技术许可、联合研发）" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">意向考察国家/地区</label>
              <input type="text" placeholder="例：德国、日本" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">预计转化预算 (万元)</label>
              <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 font-mono" />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-gray-100">
            <div className="flex space-x-3">
              <button type="button" className="px-6 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl text-sm hover:bg-gray-200">保存草稿</button>
              <button type="button" className="px-6 py-3 bg-red-50 text-red-500 font-bold rounded-xl text-sm hover:bg-red-100">撤回申请</button>
            </div>
            <button 
              type="button" 
              onClick={() => { setIsSubmitting(true); setTimeout(() => setIsSubmitting(false), 1500); }}
              className="px-10 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all flex items-center space-x-2"
            >
              {isSubmitting ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <PlusIcon className="w-5 h-5" />}
              <span>立即提交申请</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-start space-x-4">
         <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
            <ShieldCheckIcon className="w-6 h-6" />
         </div>
         <div>
            <h4 className="text-sm font-bold text-emerald-800">表单校验已开启</h4>
            <p className="text-xs text-emerald-600 mt-1 leading-relaxed">
               系统会自动校验预算合理性及领域关联性，确保提交数据的合规与可用性。
            </p>
         </div>
      </div>
    </div>
  );
};

export default ApplicationEntry;
