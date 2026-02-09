
import React, { useState, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  SparklesIcon, 
  FunnelIcon,
  TagIcon,
  CheckBadgeIcon,
  UserCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { GoogleGenAI } from "@google/genai";

const FitAssessment: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const mockAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResults([
        { id: '1', title: '德方六轴机器人控制核心算法', score: 94, source: '某德国工业团组报告', successRate: '88%' },
        { id: '2', title: '先进工业视觉识别系统专利项', score: 82, source: '2023招商引资成果', successRate: '75%' },
        { id: '3', title: '智能工厂数字化管理底座', score: 71, source: '企事业技术交流记录', successRate: '62%' },
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <SparklesIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">契合度智能评估</h1>
            <p className="text-sm text-gray-500">基于 NLP 提取关键词自动匹配成果库，阈值（≥70分）筛选推送。</p>
          </div>
        </div>
        <button 
          onClick={mockAnalyze}
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 shadow-lg"
        >
          执行智能匹配
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           {isAnalyzing ? (
             <div className="bg-white p-20 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-4">
                <ArrowPathIcon className="w-12 h-12 text-indigo-500 animate-spin" />
                <p className="text-sm font-bold text-gray-500">AI 正在深度解析需求关键词并检索向量库...</p>
             </div>
           ) : results.length > 0 ? (
             <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {results.map((item, i) => (
                  <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex items-center justify-between">
                     <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                           <span className={`text-2xl font-black ${item.score > 90 ? 'text-indigo-600' : 'text-gray-400'}`}>{item.score}</span>
                           <h4 className="font-bold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                        </div>
                        <p className="text-xs text-gray-400 flex items-center"><TagIcon className="w-3 h-3 mr-1" />数据来源：{item.source}</p>
                     </div>
                     <div className="text-right space-y-2">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-gray-400">预估转化率</span>
                           <span className="text-lg font-black text-emerald-600">{item.successRate}</span>
                        </div>
                        <button className="px-4 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold hover:bg-indigo-600 hover:text-white transition-all">发起对接</button>
                     </div>
                  </div>
                ))}
             </div>
           ) : (
             <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-20 rounded-3xl flex flex-col items-center justify-center text-gray-400">
                <ChatBubbleLeftRightIcon className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-sm">暂无匹配结果，请提交申请或点击上方按钮手动触发分析</p>
             </div>
           )}
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
              <h3 className="font-bold mb-6 flex items-center space-x-2 text-indigo-400">
                 <FunnelIcon className="w-5 h-5" />
                 <span>匹配参数调优</span>
              </h3>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-3">契合度阈值 ({'>'} 70)</label>
                    <input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">人工补充政策性推荐</span>
                    <div className="w-10 h-5 bg-indigo-600 rounded-full flex items-center justify-end px-1 cursor-pointer">
                       <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                 </div>
                 <button className="w-full py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-bold shadow-lg shadow-indigo-500/20">应用当前策略</button>
              </div>
           </div>

           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center space-x-3">
              <CheckBadgeIcon className="w-10 h-10 text-blue-600 shrink-0" />
              <div>
                 <p className="text-xs font-bold text-blue-800">关键字提取结果预览</p>
                 <p className="text-[10px] text-blue-600 mt-1">#六轴算法 #精密制造 #德资 #工业大脑</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FitAssessment;
