
import React, { useState } from 'react';
import { 
  CodeBracketSquareIcon, 
  ShieldCheckIcon, 
  KeyIcon, 
  ArrowPathIcon,
  DocumentTextIcon,
  ServerIcon,
  ShieldExclamationIcon,
  CpuChipIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ListBulletIcon,
  LockClosedIcon,
  SignalIcon,
  // Fix: Added missing icon imports
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const ApiPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'auth' | 'units' | 'monitor'>('auth');

  const units = [
    { id: 'UNIT-01', name: '市经信局', key: 'og_live_a82f...39d1', status: 'Active', calls: '1,240' },
    { id: 'UNIT-02', name: '高新园区管委会', key: 'og_live_772c...bb02', status: 'Active', calls: '856' },
    { id: 'UNIT-03', name: '绿能科技研究院', key: 'og_live_491d...0021', status: 'Restricted', calls: '42' },
    { id: 'UNIT-04', name: '市商贸发展中心', key: 'og_live_110e...88ef', status: 'Active', calls: '642' },
  ];

  const logs = [
    { time: '14:20:12', caller: '市经信局 (10.2.45.122)', api: '/v1/declaration/sync', status: 'Success', latency: '45ms' },
    { time: '14:19:45', caller: 'Unknown (211.4.15.22)', api: '/v1/auth/token', status: 'Blocked', latency: '-' },
    { time: '14:15:30', caller: '绿能研究院 (10.2.12.8)', api: '/v1/achievement/match', status: 'Limited', latency: '12ms' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <CodeBracketSquareIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">OGMS API 开放平台</h1>
            <p className="text-sm text-gray-500">为 14 家自行申报单位及第三方业务系统提供标准化、高安全的外事业务接入能力。</p>
          </div>
        </div>
        <div className="flex space-x-2">
           <button className="px-6 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 flex items-center space-x-2">
              <DocumentTextIcon className="w-4 h-4" />
              <span>开发者文档 (Swagger)</span>
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
        {[
          { id: 'auth', label: 'API 鉴权与安全', icon: <ShieldCheckIcon /> },
          { id: 'units', label: '自行申报单位对接', icon: <UserGroupIcon /> },
          { id: 'monitor', label: '网关流量监控', icon: <SignalIcon /> },
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${activeTab === t.id ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {React.cloneElement(t.icon as React.ReactElement, { className: 'w-4 h-4' })}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          {activeTab === 'auth' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                   <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                      <LockClosedIcon className="w-5 h-5 text-indigo-500" />
                      <span>API 身份校验与鉴权体系</span>
                   </h3>
                   <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                      <p className="leading-relaxed">
                        系统对涉及外事出国业务的 API 调用进行严格身份校验，验证调用方是否为授权的业务系统、人员。保障外事数据在跨系统交互时的安全性。
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="font-bold text-gray-800 text-xs mb-2">鉴权方式 (Auth Schemes)</p>
                            <ul className="text-[11px] list-disc list-inside space-y-1">
                               <li>HMAC 签名校验 (防止篡改)</li>
                               <li>OAuth 2.0 Bearer Token (会话授权)</li>
                               <li>国密 SM2 双向证书 (针对高密接口)</li>
                            </ul>
                         </div>
                         <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="font-bold text-gray-800 text-xs mb-2">安全防护逻辑</p>
                            <ul className="text-[11px] list-disc list-inside space-y-1">
                               <li>API 黑白名单过滤机制</li>
                               <li>恶意高频调用自动熔断 (WAF)</li>
                               <li>数据包全文明文加密 (AES-256)</li>
                            </ul>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-800">API 访问控制列表 (ACL)</h3>
                      <button className="flex items-center space-x-1 text-[10px] font-bold text-indigo-600 hover:underline">
                         <PlusIcon className="w-3 h-3" />
                         <span>新增白名单规则</span>
                      </button>
                   </div>
                   <div className="space-y-3">
                      {[
                        { name: '政务大数据中心同步网关', ip: '10.2.0.0/16', type: 'Whitelist', status: 'Trusted' },
                        { name: '市财政局结算中台', ip: '172.16.45.12', type: 'Whitelist', status: 'Trusted' },
                        { name: '异常扫描源 (Detected)', ip: '211.4.15.22', type: 'Blacklist', status: 'Blocked' },
                      ].map((acl, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:border-indigo-200 border border-transparent transition-all">
                           <div className="flex items-center space-x-4">
                              <div className={`p-2 rounded-xl ${acl.type === 'Whitelist' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                 <ShieldCheckIcon className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-xs font-bold text-gray-800">{acl.name}</p>
                                 <p className="text-[10px] font-mono text-gray-400 mt-1">{acl.ip}</p>
                              </div>
                           </div>
                           <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${acl.status === 'Trusted' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{acl.status}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
                    <h3 className="font-bold mb-6 flex items-center space-x-2 text-red-400">
                       <ShieldExclamationIcon className="w-5 h-5" />
                       <span>风控状态仪表盘</span>
                    </h3>
                    <div className="space-y-6">
                       <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">今日拦截威胁</span>
                          <span className="text-xl font-black text-red-500">1,242 次</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">平均 QPS</span>
                          <span className="text-xl font-black text-indigo-400">45 / s</span>
                       </div>
                       <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: '45%' }}></div>
                       </div>
                       <p className="text-[10px] text-slate-500 italic leading-relaxed">检测引擎正在实时扫描针对“成果转化”核心 API 的非授权请求。</p>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'units' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-300">
              <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                       <UserGroupIcon className="w-5 h-5 text-indigo-500" />
                       <span>自行申报单位对接管理 (14家)</span>
                    </h3>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-bold">签发新密钥</button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <tr>
                             <th className="px-6 py-4">单位标识</th>
                             <th className="px-6 py-4">单位名称</th>
                             <th className="px-6 py-4">API Key (脱敏)</th>
                             <th className="px-6 py-4">累计调用</th>
                             <th className="px-6 py-4 text-right">状态</th>
                          </tr>
                       </thead>
                       <tbody className="text-sm divide-y divide-gray-50">
                          {units.map(unit => (
                            <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
                               <td className="px-6 py-4 font-mono text-[10px] font-bold text-gray-400">{unit.id}</td>
                               <td className="px-6 py-4 font-bold text-gray-800">{unit.name}</td>
                               <td className="px-6 py-4 font-mono text-[10px] text-indigo-400">{unit.key}</td>
                               <td className="px-6 py-4 text-xs text-gray-500">{unit.calls}</td>
                               <td className="px-6 py-4 text-right">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                    unit.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                  }`}>{unit.status}</span>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl">
                    <h3 className="font-bold mb-4">对接指南摘要</h3>
                    <p className="text-xs text-indigo-200 leading-loose mb-6">
                       申报单位通过签发 API 密钥，在可控权限范围内调用接口。实现系统功能无缝对接，简化申报流程，提供申请、审批效率。
                    </p>
                    <div className="space-y-4">
                       <div className="flex items-center space-x-3 text-xs">
                          <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                          <span>HTTPS 安全协议全覆盖</span>
                       </div>
                       <div className="flex items-center space-x-3 text-xs">
                          <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                          <span>RESTful 异步调用规范</span>
                       </div>
                       <div className="flex items-center space-x-3 text-xs">
                          <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                          <span>JSON 数据结构标准转换</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'monitor' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
               <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                     <SignalIcon className="w-5 h-5 text-indigo-500" />
                     <span>实时访问流水与延时监测</span>
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-[10px] font-bold text-emerald-600">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                       <span>网关集群：Healthy</span>
                    </div>
                    <button className="text-[10px] font-bold text-blue-600 hover:underline">查看 Grafana 面板</button>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                        <tr>
                           <th className="px-6 py-4">时间点</th>
                           <th className="px-6 py-4">调用方 (IP)</th>
                           <th className="px-6 py-4">请求端点</th>
                           <th className="px-6 py-4">响应延时</th>
                           <th className="px-6 py-4 text-right">响应结果</th>
                        </tr>
                     </thead>
                     <tbody className="text-sm divide-y divide-gray-50">
                        {logs.map((log, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                             <td className="px-6 py-4 font-mono text-[10px] text-gray-400">{log.time}</td>
                             <td className="px-6 py-4 font-bold text-gray-800">{log.caller}</td>
                             <td className="px-6 py-4 font-mono text-xs text-indigo-600 font-bold">{log.api}</td>
                             <td className="px-6 py-4 font-mono text-xs text-gray-400">{log.latency}</td>
                             <td className="px-6 py-4 text-right">
                                <span className={`font-black text-[10px] uppercase ${
                                  log.status === 'Success' ? 'text-emerald-500' : log.status === 'Blocked' ? 'text-red-500' : 'text-amber-500'
                                }`}>{log.status}</span>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiPlatform;
