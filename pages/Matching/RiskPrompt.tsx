
import React from 'react';
import { 
  ShieldExclamationIcon, 
  MagnifyingGlassIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const RiskPrompt: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-100 text-white">
            <ShieldExclamationIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">撮合合规风险辅助提示</h1>
            <p className="text-sm text-gray-500">专利冲突检索、知识产权归属确认及历史风险案例自动对标。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
           <h3 className="font-bold text-gray-800 flex items-center space-x-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
              <span>智能识别的潜在风险点</span>
           </h3>
           <div className="space-y-4">
              {[
                { title: '知识产权冲突风险', level: '高', desc: '该技术方案与 2022 年某已签约专利库存在 32% 重合度，需核查子授权限制。', advice: '立即开启专利法务核查程序' },
                { title: '出口管制合规风险', level: '中', desc: '涉及德国限制出口的二级工业算法，可能面临欧盟外贸管制审查。', advice: '联系大使馆经商处获取政策指导' },
                { title: '主体资信预警', level: '低', desc: '需求方近期有 1 宗知识产权合同纠纷记录。', advice: '加强履约能力二次评估' },
              ].map((r, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-white hover:border-red-100 transition-all group">
                   <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-900">{r.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${r.level === '高' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>{r.level} Risk</span>
                   </div>
                   <p className="text-xs text-gray-500 leading-relaxed mb-4">{r.desc}</p>
                   <div className="pt-3 border-t border-gray-200">
                      <p className="text-[10px] font-bold text-blue-600 uppercase">系统建议方案</p>
                      <p className="text-xs text-blue-700 mt-1 font-medium italic">{r.advice}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="font-bold mb-6">历史风险事件库检索</h3>
              <div className="relative mb-6">
                 <input type="text" placeholder="搜索专利编号、关键词或单位..." className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500" />
                 <MagnifyingGlassIcon className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
              </div>
              <div className="space-y-4">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">相似历史违规记录 (1条)</p>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 italic">
                    <p className="text-xs text-slate-300">"2023年关于‘工业互联网安全算法’的撮合案因未充分核查第三方库授权导致合作中止。"</p>
                 </div>
              </div>
           </div>

           <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                 <CheckCircleIcon className="w-10 h-10 text-emerald-600" />
                 <div>
                    <h4 className="font-bold text-emerald-800">全网专利库同步状态</h4>
                    <p className="text-[10px] text-emerald-600 mt-1 uppercase font-bold">Latest Sync: 10 mins ago</p>
                 </div>
              </div>
              <ArrowPathIcon className="w-6 h-6 text-emerald-300" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default RiskPrompt;
