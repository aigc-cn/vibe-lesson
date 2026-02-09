
import React from 'react';
import { 
  ComputerDesktopIcon, 
  AdjustmentsHorizontalIcon, 
  ArrowPathIcon,
  LightBulbIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

const AlgorithmManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-slate-800 rounded-2xl shadow-lg shadow-slate-200 text-white">
            <ComputerDesktopIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">匹配算法引擎管理</h1>
            <p className="text-sm text-gray-500">核心余弦相似度（0-100分）计算，支持多维加权参数及动态阈值管理。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
           <h3 className="font-bold text-gray-800 flex items-center space-x-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-blue-500" />
              <span>特征加权系数配置</span>
           </h3>
           <div className="space-y-8">
              {[
                { label: '语义向量相似度', weight: 45, color: 'bg-blue-500' },
                { label: '领域/分类契合度', weight: 25, color: 'bg-indigo-500' },
                { label: '成果持有方活跃度', weight: 15, color: 'bg-emerald-500' },
                { label: '政策扶持符合度', weight: 15, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between items-center text-xs font-bold text-gray-600 uppercase tracking-widest">
                      <span>{item.label}</span>
                      <span>{item.weight}%</span>
                   </div>
                   <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.weight}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
           <div className="pt-6">
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center justify-center space-x-2">
                 <ArrowPathIcon className="w-5 h-5" />
                 <span>重新校准算法模型</span>
              </button>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                 <CircleStackIcon className="w-5 h-5 text-blue-200" />
                 <span>模型训练集状态</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">训练样本数</p>
                    <p className="text-2xl font-black">12,452</p>
                 </div>
                 <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">当前精确率</p>
                    <p className="text-2xl font-black">94.2%</p>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
              <div className="flex items-center space-x-3 mb-6">
                 <LightBulbIcon className="w-6 h-6 text-amber-500" />
                 <h4 className="font-bold text-gray-800">算法优化建议 (AI)</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                 "检测到近期 [半导体] 领域成果转化活跃，建议将 '历史成功率' 权重暂时提升 5 个百分点，以优化短期匹配精准度。"
              </p>
              <button className="mt-6 text-xs font-bold text-blue-600 hover:underline">立即采纳建议</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmManagement;
