
import React from 'react';
import { 
  ArrowPathIcon, 
  CircleStackIcon, 
  CalendarDaysIcon,
  ShieldCheckIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';

const AuditEvidence: React.FC = () => {
  const events = [
    { time: '2024-05-23 10:45:12', action: '执行数字签章', user: '李长虹 (外事办)', hash: 'f2a7..88e1', status: 'Verified' },
    { time: '2024-05-23 10:44:55', action: '签章身份核验', user: 'SYS-AUTH', hash: 'd9e1..22c9', status: 'Success' },
    { time: '2024-05-23 10:40:02', action: '发起合同签署流程', user: '张明 (经信局)', hash: 'a1b2..90cc', status: 'Success' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-slate-900 rounded-2xl shadow-lg shadow-slate-200 text-white">
            <CircleStackIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">签章过程存证</h1>
            <p className="text-sm text-gray-500 italic">全链路不可篡改存证，为监管核查与成果转化争议提供电子证据支撑。</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
           <CubeTransparentIcon className="w-5 h-5 text-blue-600" />
           <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">区块链节点：同步正常</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
           <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                 <ListBulletIcon className="w-5 h-5 text-blue-500" />
                 <span>存证流水 (Evidence Chain)</span>
              </h3>
              <div className="flex space-x-2">
                 <button className="flex items-center space-x-1 text-[10px] font-bold text-blue-600 hover:underline">
                    <ArrowPathIcon className="w-3.5 h-3.5" />
                    <span>刷新同步记录</span>
                 </button>
              </div>
           </div>
           
           <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <tr>
                       <th className="px-6 py-4">时间点位</th>
                       <th className="px-6 py-4">存证操作</th>
                       <th className="px-6 py-4">主体人</th>
                       <th className="px-6 py-4">数据 Hash</th>
                       <th className="px-6 py-4 text-right">状态</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm divide-y divide-gray-50">
                    {events.map((e, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-[10px] text-gray-400">{e.time}</td>
                        <td className="px-6 py-4 font-bold text-gray-800">{e.action}</td>
                        <td className="px-6 py-4 text-gray-500 text-xs">{e.user}</td>
                        <td className="px-6 py-4 font-mono text-[10px] text-blue-600 font-bold">{e.hash}</td>
                        <td className="px-6 py-4 text-right">
                           <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black uppercase">{e.status}</span>
                        </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="font-bold mb-6 flex items-center space-x-2 text-blue-400">
                 <CalendarDaysIcon className="w-5 h-5" />
                 <span>存证概览统计</span>
              </h3>
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-[9px] font-bold text-slate-500 uppercase mb-1 tracking-widest">已存证文件</p>
                       <p className="text-xl font-black">1,542 件</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-[9px] font-bold text-slate-500 uppercase mb-1 tracking-widest">存证稳定性</p>
                       <p className="text-xl font-black text-emerald-400">100%</p>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">存证争议处置</p>
                    <p className="text-xs leading-relaxed text-slate-400">
                       系统检测到 0 宗存证 Hash 冲突。如有签章效力异议，可下载带防伪页的《电子存证报告》用于司法核验。
                    </p>
                 </div>
              </div>
              <button className="w-full mt-10 py-3 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">导出完整证据包</button>
           </div>

           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center space-x-3">
              <ShieldCheckIcon className="w-10 h-10 text-blue-600 shrink-0" />
              <div>
                 <p className="text-xs font-bold text-blue-800">可信时间戳认证</p>
                 <p className="text-[10px] text-blue-600 mt-1 italic">所有存证记录均绑定国家授时中心标准物理时间。</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuditEvidence;
