
import React from 'react';
import { 
  ExclamationTriangleIcon, 
  DocumentDuplicateIcon,
  ShieldExclamationIcon,
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface ConflictItem {
  id: string;
  field: string;
  docA: { name: string, value: string };
  docB: { name: string, value: string };
  level: 'High' | 'Medium' | 'Low';
  desc: string;
}

const MOCK_CONFLICTS: ConflictItem[] = [
  { 
    id: 'C-001', 
    field: '考察单位名称', 
    docA: { name: '申报计划', value: '库卡自动化工厂' }, 
    docB: { name: '归国报告', value: '库卡南美研发中心' }, 
    level: 'High', 
    desc: '访问单位主体发生重大偏离，涉及业务领域不匹配。' 
  },
  { 
    id: 'C-002', 
    field: '出访人数', 
    docA: { name: '预申报名单', value: '6人' }, 
    docB: { name: '执行日志', value: '5人' }, 
    level: 'Medium', 
    desc: '实际成行人员与审批名单不符，缺失：李四。' 
  },
  { 
    id: 'C-003', 
    field: '技术协议版本', 
    docA: { name: '招商初稿', value: 'v1.4' }, 
    docB: { name: '最终协议', value: 'v2.1' }, 
    level: 'Low', 
    desc: '检测到协议条款微调，已自动同步至最新版。' 
  },
];

const InspectionConflict: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-100 text-white">
            <ShieldExclamationIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">出站跨文档冲突检测</h1>
            <p className="text-sm text-gray-500">自动检测申报计划、执行记录、归国报告之间的关键信息一致性冲突。</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg flex items-center space-x-2">
            <ArrowPathIcon className="w-4 h-4" />
            <span>重新扫描冲突</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { label: '扫描文档总数', value: '124', color: 'text-blue-600' },
          { label: '检测一致性项', value: '1,542', color: 'text-indigo-600' },
          { label: '发现冲突数', value: '12', color: 'text-red-600' },
          { label: 'AI 自动修正', value: '8', color: 'text-emerald-600' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">{kpi.label}</p>
            <p className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
            <span>严重冲突项扫描列表</span>
          </h3>
          <div className="flex space-x-3">
             <div className="relative">
                <input type="text" placeholder="搜索项目、字段..." className="pl-9 pr-4 py-1.5 bg-gray-50 border-0 rounded-lg text-xs w-48" />
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2" />
             </div>
             <button className="p-2 bg-gray-50 rounded-lg"><FunnelIcon className="w-4 h-4 text-gray-400" /></button>
          </div>
        </div>
        <div className="p-6 space-y-6">
           {MOCK_CONFLICTS.map((conflict) => (
             <div key={conflict.id} className="group relative flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 p-6 rounded-3xl border border-gray-50 hover:border-red-100 hover:bg-red-50/10 transition-all">
                <div className={`p-4 rounded-2xl flex-shrink-0 ${
                  conflict.level === 'High' ? 'bg-red-50 text-red-600' : 
                  conflict.level === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  <DocumentDuplicateIcon className="w-8 h-8" />
                  <span className="block text-[8px] font-black text-center mt-1 uppercase tracking-tighter">{conflict.level}</span>
                </div>
                
                <div className="flex-1 space-y-4">
                   <div className="flex items-center justify-between">
                      <h4 className="font-black text-gray-800 text-lg">{conflict.field} <span className="text-xs font-mono text-gray-300 ml-2">ID: {conflict.id}</span></h4>
                      <div className="flex space-x-2">
                         <button className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold hover:bg-gray-50">忽略此项</button>
                         <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold hover:bg-blue-700">标记待查</button>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm relative">
                         <span className="absolute -top-2 left-4 px-2 py-0.5 bg-gray-800 text-white text-[8px] font-bold rounded uppercase tracking-widest">{conflict.docA.name}</span>
                         <p className="text-sm font-bold text-gray-600">{conflict.docA.value}</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl border border-red-200 shadow-sm relative">
                         <span className="absolute -top-2 left-4 px-2 py-0.5 bg-red-600 text-white text-[8px] font-bold rounded uppercase tracking-widest">{conflict.docB.name}</span>
                         <p className="text-sm font-bold text-red-600">{conflict.docB.value}</p>
                      </div>
                   </div>

                   <p className="text-xs text-gray-500 bg-gray-50/50 p-3 rounded-xl italic">
                      <span className="font-bold text-gray-700 mr-2">风险评估结果：</span>
                      {conflict.desc}
                   </p>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center space-x-4">
         <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <CheckCircleIcon className="w-7 h-7" />
         </div>
         <div>
            <h4 className="font-bold text-emerald-800">冲突自动对标模型 (v3.2)</h4>
            <p className="text-xs text-emerald-600 leading-relaxed">
               检测模型已完成最近一次训练，覆盖 12,000+ 历史冲突样本，识别准确率提升至 94.2%。扫描深度已覆盖至 PDF 附件内容。
            </p>
         </div>
      </div>
    </div>
  );
};

export default InspectionConflict;
