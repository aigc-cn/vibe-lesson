
import React, { useState } from 'react';
import { 
  DocumentCheckIcon, 
  ArrowUpTrayIcon, 
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const TemplateValidation: React.FC = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <DocumentCheckIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">模板智能校验</h1>
            <p className="text-sm text-gray-500">上传批量数据模板，自动执行格式合规与逻辑一致性核查。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* 上传区域 */}
          <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center group hover:bg-blue-50/50 transition-all cursor-pointer shadow-sm">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <ArrowUpTrayIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">上传待校验数据模板</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-sm">支持 Excel (.xlsx, .xls) 及 CSV 格式，单文件上限 50MB。</p>
            <button 
              onClick={handleValidate}
              className="mt-6 px-10 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all flex items-center space-x-2"
            >
              {isValidating ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <ArrowUpTrayIcon className="w-5 h-5" />}
              <span>{isValidating ? '正在深度校验中...' : '开始智能校验'}</span>
            </button>
          </div>

          {/* 校验结果预览 */}
          {showResults && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                 <h3 className="font-bold text-gray-800">校验反馈明细</h3>
                 <button className="flex items-center space-x-2 text-[10px] font-black text-blue-600 hover:underline">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>导出完整错误报告</span>
                 </button>
              </div>
              <div className="p-6 space-y-4">
                 {[
                   { field: '出访日期', issue: '日期格式不统一 (2024/05/12)', action: '自动修复为 2024-05-12', type: 'auto' },
                   { field: '预算总额', issue: '数值非空逻辑冲突 (部分单元格缺失)', action: '已标记为红色提醒', type: 'manual' },
                   { field: '护照证件号', issue: '非法特殊字符干扰', action: '已自动过滤非法字符', type: 'auto' },
                 ].map((res, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 group hover:bg-white border border-transparent hover:border-blue-100 transition-all">
                      <div className="flex items-start space-x-4">
                         <div className={`mt-1 ${res.type === 'auto' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {res.type === 'auto' ? <CheckCircleIcon className="w-5 h-5" /> : <ExclamationCircleIcon className="w-5 h-5" />}
                         </div>
                         <div>
                            <p className="text-xs font-black text-gray-800">{res.field}</p>
                            <p className="text-[11px] text-gray-500 mt-1">{res.issue}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${res.type === 'auto' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            {res.type === 'auto' ? '自动修复' : '需人工干预'}
                         </span>
                         <p className="text-[10px] text-gray-400 mt-1 italic">{res.action}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>

        {/* 规则配置侧边 */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold flex items-center space-x-2 text-indigo-400">
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  <span>校验规则引擎配置</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">v3.12</span>
              </div>
              <div className="space-y-6">
                 {[
                   { label: '日期格式强制校验', active: true, desc: 'YYYY-MM-DD 规范化' },
                   { label: '敏感词汇实时扫描', active: true, desc: '自动识别并拦截秘密字段' },
                   { label: '数值逻辑平衡检查', active: false, desc: '计算总和与分项一致性' },
                 ].map((rule, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all cursor-pointer">
                      <div>
                         <p className="text-xs font-bold">{rule.label}</p>
                         <p className="text-[10px] text-slate-500 mt-0.5">{rule.desc}</p>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${rule.active ? 'bg-blue-600' : 'bg-slate-700'}`}>
                         <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${rule.active ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-3 bg-white/10 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">应用配置调优</button>
           </div>

           <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center space-x-4">
              <ShieldCheckIcon className="w-10 h-10 text-emerald-600" />
              <div>
                 <p className="text-xs font-bold text-emerald-800">拦截成功率提升 40%</p>
                 <p className="text-[10px] text-emerald-600 mt-1 italic">开启“逻辑预审”模式可大幅减少无效提交。</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateValidation;
