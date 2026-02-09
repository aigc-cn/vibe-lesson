
import React from 'react';
import { 
  KeyIcon, 
  UserCircleIcon, 
  CheckBadgeIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';

const ApprovalSignature: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <KeyIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">审批电子签章</h1>
            <p className="text-sm text-gray-500 italic">在数字化审批流中，实现意见签署与责任主体强关联。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
           <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                 <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                    <DocumentDuplicateIcon className="w-5 h-5 text-indigo-500" />
                    <span>审批签署预览区 (模拟)</span>
                 </h3>
                 <span className="text-[10px] font-mono text-gray-400">任务号: MA-2024-8821</span>
              </div>
              <div className="flex-1 p-10 space-y-8">
                 <div className="prose prose-sm max-w-none">
                    <h2 className="text-center font-black text-xl mb-10 tracking-widest">出访任务申报审批意见表</h2>
                    <div className="grid grid-cols-2 gap-4 border-t border-l border-gray-100">
                       <div className="p-4 border-b border-r border-gray-100 bg-gray-50/30 text-xs font-bold text-gray-400 uppercase">申请单位</div>
                       <div className="p-4 border-b border-r border-gray-100 text-xs font-bold text-gray-800 uppercase">市经济和信息化局</div>
                       <div className="p-4 border-b border-r border-gray-100 bg-gray-50/30 text-xs font-bold text-gray-400 uppercase">审批环节</div>
                       <div className="p-4 border-b border-r border-gray-100 text-xs font-bold text-gray-800 uppercase">归口管理部门初审</div>
                    </div>
                    <div className="mt-8 space-y-4">
                       <p className="text-sm font-bold text-gray-700">审批意见：</p>
                       <p className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-blue-800 leading-relaxed italic">
                          "经核查，该招商团组行程紧凑，预算符合标准，邀请方背景实力雄厚，建议予以通过并上报市外办复核。"
                       </p>
                    </div>
                 </div>

                 {/* 签章预览 */}
                 <div className="flex justify-end pt-10">
                    <div className="relative p-6 border-2 border-red-500/20 rounded-2xl bg-red-50/5 flex flex-col items-center">
                       <div className="absolute -top-3 -left-3 p-1.5 bg-red-600 text-white rounded-lg shadow-lg scale-75">
                          <CheckBadgeIcon className="w-4 h-4" />
                       </div>
                       <img src="https://img.icons8.com/color/96/000000/official-seal.png" className="w-24 h-24 opacity-80" alt="印章" />
                       <div className="text-center mt-2">
                          <p className="text-[10px] font-black text-red-600">市外办电子签章专用</p>
                          <p className="text-[8px] font-mono text-red-400 mt-0.5">2024-05-23 10:45:12</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="p-6 border-t border-gray-50 flex justify-end bg-gray-50/20">
                 <button className="flex items-center space-x-2 px-10 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all">
                    <CursorArrowRaysIcon className="w-5 h-5" />
                    <span>执行数字签章</span>
                 </button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="font-bold mb-6 flex items-center space-x-2 text-indigo-400">
                 <UserCircleIcon className="w-5 h-5" />
                 <span>责任主体绑定</span>
              </h3>
              <div className="space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">审批人</p>
                    <p className="text-xs font-bold">李长虹 (外事办副主任)</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">CA 证书序列号</p>
                    <p className="text-[10px] font-mono break-all text-slate-400">CA-0091-8832-7712-4912-XXXX</p>
                 </div>
              </div>
           </div>

           <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
              <div className="flex items-center space-x-3 mb-3">
                 <ShieldCheckIcon className="w-6 h-6 text-indigo-600" />
                 <h4 className="font-bold text-indigo-800 text-xs">数字化闭环说明</h4>
              </div>
              <p className="text-[10px] text-indigo-600 leading-relaxed">
                 签章完成后，审批表单将自动锁定并生成防伪 PDF 存档，所有修改痕迹将记录在 [过程存证] 模块中。
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalSignature;
