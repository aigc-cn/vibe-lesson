
import React, { useState } from 'react';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon, 
  PlusIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  LinkIcon,
  ClockIcon,
  TableCellsIcon,
  ChevronRightIcon,
  CloudIcon,
  IdentificationIcon,
  FingerPrintIcon,
  // Added missing UserIcon import
  UserIcon
} from '@heroicons/react/24/outline';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'sso' | 'mapping'>('users');

  const users = [
    { id: 'U-001', name: '张明', role: '系统管理员', unit: '市经信局', lastLogin: '10分钟前', status: 'Active' },
    { id: 'U-002', name: '李瑞华', role: '审批员', unit: '市外办', lastLogin: '2小时前', status: 'Active' },
    { id: 'U-003', name: '王伟', role: '普通申报', unit: '某智能装备', lastLogin: '1天前', status: 'Locked' },
  ];

  const ssoLogs = [
    { time: '2024-05-23 14:20:12', user: '张明', provider: '政务外网 OAuth', ip: '10.2.45.122', event: '登录成功' },
    { time: '2024-05-23 13:45:05', user: '李瑞华', provider: '域控 LDAP', ip: '10.2.12.8', event: 'Token 刷新' },
    { time: '2024-05-23 10:02:44', user: 'Guest_04', provider: '外部门户', ip: '211.4.15.22', event: '认证失败' },
  ];

  const mappings = [
    { localUser: '张明', extSystem: '市人事管理系统 (HRMS)', extId: 'HR-4921-X', mapStatus: 'Verified' },
    { localUser: '李瑞华', extSystem: '全国政务信用库 (G-Credit)', extId: 'GC-88229', mapStatus: 'Verified' },
    { localUser: '王伟', extSystem: '市财政局结算中台', extId: 'FB-990-21', mapStatus: 'Pending' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 头部 */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-teal-500 rounded-2xl shadow-lg shadow-teal-100 text-white">
            <UserGroupIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">用户与身份中心</h1>
            <p className="text-sm text-gray-500">统一管理系统账户、单点登录审计及外部异构系统身份映射。</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-teal-600 text-white rounded-2xl text-xs font-bold hover:bg-teal-700 shadow-xl shadow-teal-500/20 flex items-center space-x-2 transition-all">
          <PlusIcon className="w-4 h-4" />
          <span>创建新账户</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
        {[
          { id: 'users', label: '账户权限', icon: <UserGroupIcon /> },
          { id: 'sso', label: '单点登录日志', icon: <FingerPrintIcon /> },
          { id: 'mapping', label: '外部身份映射', icon: <LinkIcon /> },
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${activeTab === t.id ? 'bg-white text-teal-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {React.cloneElement(t.icon as React.ReactElement, { className: 'w-4 h-4' })}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          {activeTab === 'users' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <div className="relative">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-300 absolute left-4 top-3" />
                    <input type="text" placeholder="搜索姓名、单位..." className="pl-12 pr-4 py-2.5 bg-gray-50 border-0 rounded-2xl text-xs w-64 focus:ring-2 focus:ring-teal-500" />
                  </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <tr>
                       <th className="px-6 py-4">账户标识</th>
                       <th className="px-6 py-4">姓名 / 业务角色</th>
                       <th className="px-6 py-4">所属单位</th>
                       <th className="px-6 py-4">最后在线</th>
                       <th className="px-6 py-4 text-right">状态</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm divide-y divide-gray-50">
                     {users.map(u => (
                       <tr key={u.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                         <td className="px-6 py-4 font-mono text-[10px] font-bold text-gray-400">{u.id}</td>
                         <td className="px-6 py-4">
                            <div className="font-bold text-gray-800">{u.name}</div>
                            <div className="text-[10px] text-teal-600 font-bold uppercase">{u.role}</div>
                         </td>
                         <td className="px-6 py-4 text-gray-500 text-xs font-medium">{u.unit}</td>
                         <td className="px-6 py-4 text-gray-400 text-xs font-mono">{u.lastLogin}</td>
                         <td className="px-6 py-4 text-right">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{u.status}</span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}

          {activeTab === 'sso' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-300">
               <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                  <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                     <ClockIcon className="w-5 h-5 text-indigo-500" />
                     <span>SSO 统一认证审计日志</span>
                  </h3>
                  <button className="text-[10px] font-black text-indigo-600 hover:underline">导出 CSV 日志</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                     <tr>
                       <th className="px-6 py-4">访问时间</th>
                       <th className="px-6 py-4">用户</th>
                       <th className="px-6 py-4">认证源 (OAuth/LDAP)</th>
                       <th className="px-6 py-4">访问 IP</th>
                       <th className="px-6 py-4 text-right">事件类型</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm divide-y divide-gray-50">
                     {ssoLogs.map((log, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                         <td className="px-6 py-4 font-mono text-[10px] text-gray-400">{log.time}</td>
                         <td className="px-6 py-4 font-bold text-gray-800">{log.user}</td>
                         <td className="px-6 py-4">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold border border-blue-100">{log.provider}</span>
                         </td>
                         <td className="px-6 py-4 font-mono text-xs text-gray-400">{log.ip}</td>
                         <td className="px-6 py-4 text-right">
                           <span className={`font-black text-[10px] ${log.event === '认证失败' ? 'text-red-500' : 'text-emerald-500'}`}>{log.event}</span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}

          {activeTab === 'mapping' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-300">
               <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                     <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                        <LinkIcon className="w-5 h-5 text-teal-500" />
                        <span>异构系统身份对齐映射表</span>
                     </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4">本地用户</th>
                          <th className="px-6 py-4">集成外部系统</th>
                          <th className="px-6 py-4">外部全局唯一 ID</th>
                          <th className="px-6 py-4 text-right">映射状态</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-50">
                        {mappings.map((m, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4">
                               <div className="flex items-center space-x-2">
                                  <UserIcon className="w-4 h-4 text-gray-300" />
                                  <span className="font-bold text-gray-800">{m.localUser}</span>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-xs text-gray-500 font-medium">{m.extSystem}</td>
                            <td className="px-6 py-4 font-mono text-[10px] text-teal-600 font-bold">{m.extId}</td>
                            <td className="px-6 py-4 text-right">
                               <div className="flex items-center justify-end space-x-2">
                                  <span className={`w-1.5 h-1.5 rounded-full ${m.mapStatus === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                  <span className="text-[10px] font-black uppercase text-gray-500">{m.mapStatus}</span>
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
                     <h3 className="font-bold mb-6 flex items-center space-x-2 text-teal-400">
                        <CloudIcon className="w-5 h-5" />
                        <span>集成中台状态</span>
                     </h3>
                     <div className="space-y-4">
                        {[
                          { name: '市 HRMS 接口', status: 'Healthy', latency: '12ms' },
                          { name: '国家 CA 统一网关', status: 'Healthy', latency: '240ms' },
                          { name: '财政部支付数据源', status: 'Warning', latency: '1.2s' }
                        ].map((s, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
                             <div>
                                <p className="text-xs font-bold text-slate-100">{s.name}</p>
                                <p className="text-[10px] text-slate-500">{s.latency}</p>
                             </div>
                             <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${s.status === 'Healthy' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{s.status}</span>
                          </div>
                        ))}
                     </div>
                     <button className="w-full mt-10 py-3 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">重新初始化所有映射</button>
                  </div>

                  <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100 flex items-start space-x-4">
                     <ShieldCheckIcon className="w-10 h-10 text-teal-600" />
                     <div>
                        <p className="text-xs font-bold text-teal-800">等保三级基线合规</p>
                        <p className="text-[10px] text-teal-600 leading-relaxed mt-1">
                           系统已启用身份二次核验（MFA），对于跨域映射操作已记录至不可篡改的区块链审计节点中。
                        </p>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
