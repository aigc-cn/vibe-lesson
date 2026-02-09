
import React, { useState } from 'react';
import { 
  ArrowDownTrayIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  CpuChipIcon,
  Square2StackIcon,
  // Added missing ArrowPathIcon import
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const ReportGeneration: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-slate-900 rounded-2xl shadow-lg shadow-slate-200 text-white">
            <DocumentTextIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">撮合报告一键生成</h1>
            <p className="text-sm text-gray-500">基于撮合全流程数据自动草拟标准化报告，含背景、过程、风险评估等。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[500px] flex flex-col justify-center items-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
           <div className="flex flex-col items-center space-y-6 text-center max-w-md">
              <div className={`p-6 rounded-full transition-all duration-700 ${isGenerating ? 'bg-indigo-50 scale-110' : 'bg-gray-50'}`}>
                 {isGenerating ? <ArrowPathIcon className="w-16 h-16 text-indigo-500 animate-spin" /> : <DocumentTextIcon className="w-16 h-16 text-gray-200" />}
              </div>
              <div className="space-y-2">
                 <h3 className="text-xl font-bold text-gray-800">准备好生成报告了吗？</h3>
                 <p className="text-sm text-gray-400 leading-relaxed">
                    系统将从 [审批流]、[风险预警库] 及 [AI 契合度引擎] 中自动抓取 12 项关键指标填充至标准模版。
                 </p>
              </div>
              <button 
                onClick={generate}
                className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-500/30 transition-all active:scale-95"
              >
                {isGenerating ? '正在梳理数据...' : '一键自动生成'}
              </button>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
                 <Square2StackIcon className="w-5 h-5 text-blue-500" />
                 <span>报告模版选择</span>
              </h4>
              <div className="space-y-4">
                 {[
                   { name: '阶段性进度简报', type: 'DOCX' },
                   { name: '撮合终结分析报告', type: 'PDF' },
                   { name: '合规性风险评估表', type: 'XLSX' }
                 ].map((t, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-white hover:border-blue-100 cursor-pointer transition-all">
                      <span className="text-sm font-bold text-gray-700">{t.name}</span>
                      <span className="text-[10px] font-black text-gray-400">{t.type}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl flex items-center space-x-3">
              <CheckCircleIcon className="w-8 h-8 text-emerald-500 shrink-0" />
              <div>
                 <p className="text-xs font-bold">已就绪数据项：12/12</p>
                 <p className="text-[10px] text-slate-400 mt-0.5 italic">字段映射已通过在线校验</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGeneration;
