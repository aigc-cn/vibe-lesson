
import React, { useState } from 'react';
import { 
  ArrowPathIcon, 
  ChatBubbleBottomCenterTextIcon, 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  // Fix: Added missing icon imports
  CalendarDaysIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const AppealReview: React.FC = () => {
  const [appeals, setAppeals] = useState([
    { id: 'APL-001', project: '东亚半导体技术考察', reason: '预算审核结果存在误判', date: '2024-05-18', status: '待复核', priority: '高' },
    { id: 'APL-002', project: '北欧可再生能源交流', reason: '出访天数计算规则争议', date: '2024-05-15', status: '复核中', priority: '中' },
    { id: 'APL-003', project: '拉美农业机械推介会', reason: '人员背景审查复议', date: '2024-05-10', status: '已反馈', priority: '低' },
  ]);

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">申诉复核管理</h1>
          <p className="text-sm text-gray-500">为申报结果存在异议的项目提供二次复核通道，确保审批公正透明。</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
        >
          提交复核申诉
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Appeal List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="font-bold text-gray-800">申诉记录列表</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {appeals.map((appeal) => (
                <div key={appeal.id} className="p-6 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{appeal.id}</span>
                      <h4 className="font-bold text-gray-800">{appeal.project}</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      appeal.status === '待复核' ? 'bg-amber-100 text-amber-600' :
                      appeal.status === '复核中' ? 'bg-blue-100 text-blue-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {appeal.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{appeal.reason}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>申请时间：{appeal.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <ShieldCheckIcon className="w-4 h-4" />
                        <span>优先级：{appeal.priority}</span>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <ArrowPathIcon className="w-5 h-5 text-blue-500" />
              <span>复核流转机制</span>
            </h3>
            <div className="relative pl-6 space-y-8">
              <div className="absolute left-1.5 top-0 h-full w-0.5 bg-gray-100"></div>
              {[
                { node: '在线申诉', desc: '填报异议理由并上传补充佐证材料' },
                { node: '二次审核', desc: '由非原审核人员的上级主管进行独立评审' },
                { node: '结果反馈', desc: '系统实时推送结果，复核意见自动入库存档' },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                  <h4 className="text-xs font-bold text-gray-800">{step.node}</h4>
                  <p className="text-[11px] text-gray-400 mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <div className="flex items-center space-x-2 text-indigo-700 mb-3">
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
              <h4 className="font-bold">审核专家回复 (最新)</h4>
            </div>
            <p className="text-xs text-indigo-800 italic leading-relaxed">
              "针对 APL-003 项目，复核专家组已查阅补充的外方背调证明，认定该访问单位不属于清单敏感实体，建议予以放行..."
            </p>
            <div className="mt-4 flex justify-end">
              <span className="text-[10px] font-bold text-indigo-400">—— 2024-05-22</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appeal Form Modal Simulation */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">提交复核申诉</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                  <XCircleIcon className="w-8 h-8" />
                </button>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-2">申诉项目 ID</label>
                  <input type="text" placeholder="例如：DE-2024-001" className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-2">申诉理由 (必填)</label>
                  <textarea placeholder="请详细阐述您对原审批结果的异议理由..." className="w-full h-32 px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-2">上传补充证据</label>
                  <div className="border-2 border-dashed border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer">
                    <DocumentTextIcon className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">点击上传</span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  确认提交
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppealReview;