
import React, { useState } from 'react';
import { 
  PaperAirplaneIcon, 
  CloudArrowUpIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  SparklesIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

const Publishing: React.FC = () => {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <PaperAirplaneIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">内部平台成果发布</h1>
            <p className="text-sm text-gray-500">成果建档、角色可见性控制及三级审批发布全流程。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">1. 成果基础信息</label>
              <input type="text" placeholder="成果标题 (如：某跨国制药企业联合研发实验室意向)" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500">
                  <option>请选择分类领域</option>
                  <option>先进制造</option>
                  <option>数字经济</option>
                </select>
                <select className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500">
                  <option>请选择密级</option>
                  <option>Public (公开)</option>
                  <option>Internal (内部)</option>
                  <option>Secret (秘密)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">2. 成果内容摘要</label>
                <button 
                  onClick={() => { setIsGeneratingSummary(true); setTimeout(() => setIsGeneratingSummary(false), 1500); }}
                  className="flex items-center space-x-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <SparklesIcon className={`w-3.5 h-3.5 ${isGeneratingSummary ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingSummary ? '正在提取关键点...' : 'AI 智能摘要生成'}</span>
                </button>
              </div>
              <textarea rows={6} placeholder="输入成果详细内容或粘贴行程记录，由 AI 协助提炼精简摘要..." className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">3. 成果附件上传</label>
              <div className="border-2 border-dashed border-gray-100 rounded-3xl p-10 flex flex-col items-center justify-center group hover:bg-blue-50/50 transition-colors cursor-pointer">
                <CloudArrowUpIcon className="w-12 h-12 text-gray-300 group-hover:text-blue-500 transition-colors mb-3" />
                <p className="text-sm font-bold text-gray-600">上传成果文件、协议草案、PPT 简报</p>
                <p className="text-[10px] text-gray-400 mt-2">支持 PDF, PPTX, DOCX | 单文件 Max 50MB</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-xs text-gray-500">定时发布</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-xs text-gray-500">全员可见</span>
                 </div>
              </div>
              <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all">提交初审</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold mb-6 flex items-center space-x-2 text-blue-400">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>三级审核流程预览</span>
            </h3>
            <div className="space-y-6 relative pl-6">
              <div className="absolute left-1.5 top-0 h-full w-0.5 bg-slate-800"></div>
              {[
                { node: '初审 (关联性)', desc: '由本级归口单位进行关联性核查' },
                { node: '复核 (价值评估)', desc: '专家委员会进行转化价值判定' },
                { node: '终审 (密级范围)', desc: '保密办确认公开范围及脱敏完整性' },
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-slate-700 group-hover:bg-blue-500 border-2 border-slate-900 shadow-sm transition-colors"></div>
                  <h4 className="text-xs font-bold text-slate-100">{step.node}</h4>
                  <p className="text-[10px] text-slate-500 mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start space-x-3">
             <CheckBadgeIcon className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
             <div>
                <h4 className="text-xs font-bold text-blue-800">我的发布配额</h4>
                <p className="text-[10px] text-blue-600 mt-1 italic">本月还可发布 8 份高级成果。当前积分支点奖励加成：+15%</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publishing;
