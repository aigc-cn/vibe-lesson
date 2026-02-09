
import React, { useState } from 'react';
import { 
  LockClosedIcon, 
  UserGroupIcon, 
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  ShieldExclamationIcon,
  MagnifyingGlassIcon,
  FingerPrintIcon
} from '@heroicons/react/24/outline';

const PermissionManagement: React.FC = () => {
  const [permissions, setPermissions] = useState([
    { role: '系统管理员', scope: '全局所有签章、权限分配', effect: '最高效力 (一级)', status: 'Active' },
    { role: '外事办领导', scope: '局级行政审批签章', effect: '二级效力', status: 'Active' },
    { role: '企事业负责人', scope: '所属单位合同签署签章', effect: '业务效力 (三级)', status: 'Restricted' },
    { role: '普通申报员', scope: '无签署权限，仅支持填报', effect: '查看/发起', status: 'Active' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-100 text-white">
            <LockClosedIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">签章权限分级管理</h1>
            <p className="text-sm text-gray-500 italic">基于 RBAC 分级模型，严防越权签署，维护业务审批秩序。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                 <UserGroupIcon className="w-5 h-5 text-red-500" />
                 <span>权限分级矩阵配置</span>
              </h3>
              <div className="relative">
                 <input type="text" placeholder="检索角色..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] w-48" />
                 <MagnifyingGlassIcon className="w-4 h-4 text-gray-300 absolute left-3 top-2.5" />
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <tr>
                       <th className="px-6 py-4">角色名称</th>
                       <th className="px-6 py-4">签章范围权限</th>
                       <th className="px-6 py-4">法律效力等级</th>
                       <th className="px-6 py-4 text-right">管理</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm divide-y divide-gray-50">
                    {permissions.map((p, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                           <div className="flex items-center space-x-3">
                              <div className={`p-1.5 rounded-lg ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                 <FingerPrintIcon className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-gray-800">{p.role}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500 font-medium">{p.scope}</td>
                        <td className="px-6 py-4 font-black text-[10px] text-blue-600 uppercase">{p.effect}</td>
                        <td className="px-6 py-4 text-right">
                           <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" /></button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center space-x-2 text-red-400 mb-6">
                 <ShieldExclamationIcon className="w-6 h-6" />
                 <h3 className="font-bold">越权拦截逻辑</h3>
              </div>
              <div className="space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all cursor-pointer">
                    <p className="text-xs font-bold text-slate-100">跨单位签章拦截</p>
                    <p className="text-[10px] text-slate-500 mt-1">自动识别签署人组织架构，禁止签署非本单位业务合同。</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all cursor-pointer">
                    <p className="text-xs font-bold text-slate-100">密级权限匹配</p>
                    <p className="text-[10px] text-slate-500 mt-1">签发 [秘密] 级以上成果时，强制校验签署人保密资质。</p>
                 </div>
              </div>
              <button className="w-full mt-10 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">配置越权熔断机制</button>
           </div>

           <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center space-x-3">
              <CheckCircleIcon className="w-10 h-10 text-emerald-600" />
              <div>
                 <p className="text-xs font-bold text-emerald-800">当前权限包：V4.1</p>
                 <p className="text-[10px] text-emerald-600 mt-1 italic">已通过网络安全等保三级基线核查。</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionManagement;
