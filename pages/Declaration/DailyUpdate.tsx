
import React, { useState } from 'react';
import { 
  BellIcon, 
  ArrowPathIcon, 
  DocumentArrowUpIcon, 
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const DailyUpdate: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'change'>('daily');
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-8 z-50 animate-in fade-in slide-in-from-right-4">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="text-sm font-bold">提交成功！已实时存证</span>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">日更填报与任务变更</h1>
          <p className="text-sm text-gray-500">规范任务执行过程中的进度更新与变更上报，确保全生命周期留痕。</p>
        </div>
        <div className="flex space-x-2">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex items-center space-x-2 border border-blue-100">
            <BellIcon className="w-5 h-5" />
            <span className="text-xs font-bold">每日提醒已开启</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-100 p-1.5 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('daily')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'daily' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          日常进展填报
        </button>
        <button 
          onClick={() => setActiveTab('change')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'change' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          重大任务变更
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">关联项目名称</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 font-medium">
                  <option>中德工业创新合作论坛 (DE-2024-001)</option>
                  <option>北美生物技术巡回展 (US-2024-042)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">填报日期</label>
                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 font-medium" />
              </div>
            </div>

            {activeTab === 'daily' ? (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">今日进展简述</label>
                  <textarea 
                    placeholder="请输入当日任务执行情况、完成节点等..."
                    className="w-full h-32 px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">遇到问题/风险</label>
                  <textarea 
                    placeholder="记录执行中遇到的障碍或潜在风险点 (选填)"
                    className="w-full h-24 px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">变更类型</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 font-medium">
                      <option>行程调整</option>
                      <option>人员变更</option>
                      <option>经费预算调剂</option>
                      <option>出访目的优化</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">紧急程度</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 font-medium">
                      <option>常规变更</option>
                      <option className="text-orange-500 font-bold">重要紧急</option>
                      <option className="text-red-500 font-bold">特急 (立即审批)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">变更原因及方案说明</label>
                  <textarea 
                    placeholder="详细说明变更的必要性及调整后的具体执行方案..."
                    className="w-full h-40 px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 font-medium"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">佐证附件 (单文件最大 20MB)</label>
              <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group">
                <DocumentArrowUpIcon className="w-10 h-10 text-gray-300 group-hover:text-blue-500 transition-colors" />
                <p className="text-sm text-gray-500 mt-2">点击或拖拽上传 PDF、Word 或图片材料</p>
                <p className="text-[10px] text-gray-400 mt-1">支持：.pdf, .doc, .docx, .jpg, .png</p>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center space-x-2 disabled:bg-blue-300"
              >
                {submitting ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    <span>正在同步存证...</span>
                  </>
                ) : (
                  <>
                    <ClipboardDocumentListIcon className="w-5 h-5" />
                    <span>提交{activeTab === 'daily' ? '日常填报' : '变更申请'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info & Status Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h3 className="text-sm font-bold flex items-center space-x-2 mb-4">
              <ExclamationCircleIcon className="w-5 h-5 text-amber-500" />
              <span>填报规范提醒</span>
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-blue-400">时间要求</p>
                <p className="text-[10px] text-slate-400 mt-1">当日进展请在次日 10:00 前完成填报。</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-orange-400">变更时效</p>
                <p className="text-[10px] text-slate-400 mt-1">行程/人员重大变更必须在变更发生前至少 24 小时提交申请。</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">最近填报记录</h3>
            <div className="space-y-4">
              {[
                { time: '2024-05-21 14:20', type: '日常填报', status: '已存证', project: '中德工业创新...' },
                { time: '2024-05-20 09:15', type: '行程变更', status: '审批中', project: '北美生物技术...' },
                { time: '2024-05-19 16:40', type: '日常填报', status: '已存证', project: '中德工业创新...' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-xs pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">{log.type}</span>
                    <span className="text-[10px] text-gray-400">{log.project}</span>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${log.status === '已存证' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {log.status}
                    </span>
                    <p className="text-[9px] text-gray-400 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyUpdate;
