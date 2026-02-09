
import React from 'react';
import { 
  DocumentCheckIcon, 
  CloudIcon, 
  ShieldCheckIcon, 
  LinkIcon,
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const ContractSignature: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100 text-white">
            <DocumentCheckIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">合同电子签章</h1>
            <p className="text-sm text-gray-500 italic">对接政务外网标准 CA 接口，实现合同签署全生命周期线上化。</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
           <CloudIcon className="w-5 h-5 text-emerald-600" />
           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">政务云网关：已连接</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           {/* 操作指南 */}
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
              <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                 <InformationCircleIcon className="w-5 h-5 text-blue-500" />
                 <span>合同线上签署操作说明</span>
              </h3>
              
              <div className="space-y-8 relative pl-8">
                 <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gray-100 border-dashed border-l"></div>
                 
                 {[
                   { step: '01', title: '合同语义预审', desc: '上传合同草案，AI 将根据外事合规字典自动检索潜在条款风险。' },
                   { step: '02', title: '调用政务外网 CA 接口', desc: '系统自动上报合同元数据至政务电子签章中台，核验签署人身份。' },
                   { step: '03', title: '多方协同签署', desc: '各方在政务外网节点进行数字签名，系统实时加盖防伪时间戳。' },
                   { step: '04', title: '生成合法证据链', desc: '完成签署后生成 PDF 合同原件，并自动计算全文明文 Hash 进行区块链存证。' }
                 ].map((item, i) => (
                   <div key={i} className="relative group">
                      <div className="absolute -left-8 top-0 w-7 h-7 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center text-[10px] font-black text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all z-10 shadow-sm">
                         {item.step}
                      </div>
                      <h4 className="text-sm font-black text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
              </div>

              <div className="pt-6 border-t border-gray-50">
                 <button className="flex items-center space-x-2 px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all">
                    <span>立即进入签署大厅</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="font-bold mb-6 flex items-center space-x-2 text-blue-400">
                 <ShieldCheckIcon className="w-5 h-5" />
                 <span>合规性与追溯</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                 采用 RSA-2048 算法加密，替代纸质印章，确保签署过程不可篡改、不可抵赖。
              </p>
              <div className="space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">电子印章效力</p>
                    <p className="text-xs font-bold mt-1">等同于实体公章 (GB/T 38540)</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">审计关联</p>
                    <p className="text-xs font-bold mt-1">自动关联出访任务 ID: DE-2024-001</p>
                 </div>
              </div>
           </div>

           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start space-x-3">
              <LinkIcon className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                 <p className="text-xs font-bold text-blue-800">法律效力声明</p>
                 <p className="text-[10px] text-blue-600 leading-relaxed mt-1">
                    本模块符合《中华人民共和国电子签名法》，签署后的电子合同可作为成果转化合作中的法律依据。
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSignature;
