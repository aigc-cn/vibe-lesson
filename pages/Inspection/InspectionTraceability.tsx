
import React from 'react';
import { 
  MagnifyingGlassIcon, 
  ArrowPathIcon,
  CircleStackIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';

const InspectionTraceability: React.FC = () => {
  const traces = [
    { id: 'LOG-8891', time: '2024-05-22 10:45:12', system: '财务局-预算子系统', operator: 'ID-4921', action: '接口采集', status: 'Success', node: '采集层' },
    { id: 'LOG-8892', time: '2024-05-22 10:45:15', system: 'OGMS-数据中控', operator: 'SYS-AUTO', action: 'AES-256 加密传输', status: 'Success', node: '传输层' },
    { id: 'LOG-8893', time: '2024-05-22 10:45:20', system: 'OGMS-核心数据库', operator: 'SYS-DB', action: '存储入库 (v2.1)', status: 'Success', node: '存储层' },
    { id: 'LOG-8894', time: '2024-05-22 11:02:01', system: '签证中心-同步接口', operator: 'ID-1102', action: '状态更新', status: 'Success', node: '采集层' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">出站数据来源追溯</h1>
        <p className="text-sm text-gray-500">全链路记录采集-传输-存储过程，实现数据异常快速定位溯源。</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="通过日志 ID、操作工号、源系统进行检索..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-3" />
          </div>
          <div className="flex space-x-2">
            <input type="date" className="px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm" />
            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center space-x-2">
              <ArrowPathIcon className="w-5 h-5" />
              <span>刷新链路</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-100"></div>
          <div className="space-y-8 relative">
            {traces.map((trace, i) => (
              <div key={i} className="flex items-start space-x-8 ml-4">
                <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg flex-shrink-0 z-10 flex items-center justify-center ${
                  trace.node === '采集层' ? 'bg-blue-500' : 
                  trace.node === '传输层' ? 'bg-indigo-500' : 'bg-emerald-500'
                }`}>
                  {trace.node === '采集层' && <CpuChipIcon className="w-4 h-4 text-white" />}
                  {trace.node === '传输层' && <ShieldCheckIcon className="w-4 h-4 text-white" />}
                  {trace.node === '存储层' && <CircleStackIcon className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-black text-white px-2 py-0.5 rounded uppercase tracking-widest bg-slate-400">
                        {trace.node}
                      </span>
                      <h4 className="font-bold text-gray-800">{trace.action}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">{trace.time}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">日志 ID</p>
                      <p className="text-xs font-mono font-medium text-gray-600">{trace.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">源系统</p>
                      <p className="text-xs font-medium text-gray-600">{trace.system}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">操作工号</p>
                      <p className="text-xs font-medium text-gray-600">{trace.operator}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded font-bold text-[10px]">
                        {trace.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-full">
           <DocumentIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h4 className="font-bold text-blue-800">日志保存周期</h4>
          <p className="text-xs text-blue-600">系统当前配置日志保存周期为 180 天，支撑审计与问题排查。可通过 [系统配置] 调整周期。</p>
        </div>
      </div>
    </div>
  );
};

export default InspectionTraceability;
