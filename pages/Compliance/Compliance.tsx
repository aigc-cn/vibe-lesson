
import React, { useState } from 'react';
import { 
  ShieldCheckIcon, 
  UserPlusIcon, 
  CalendarDaysIcon, 
  DocumentMagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const ComplianceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('budget');

  const tabs = [
    { id: 'budget', name: '预算审批', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: 'personnel', name: '人数天数', icon: <UserPlusIcon className="w-5 h-5" /> },
    { id: 'activity', name: '境外活动', icon: <CalendarDaysIcon className="w-5 h-5" /> },
    { id: 'archive', name: '归档规范', icon: <DocumentMagnifyingGlassIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex space-x-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
              : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rules Config */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold">实时合规监控面板</h3>
            <button className="text-xs text-blue-600 font-bold border border-blue-600 px-3 py-1 rounded-lg">编辑规则字典</button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[
                { title: '年度预算执行预警', status: 'warning', desc: '某部门经费下达已超82%，触发黄色预警', time: '2024-05-20' },
                { title: '行程天数校验异常', status: 'danger', desc: '出访任务 #492 实际天数(12) 超过上限(10)', time: '2024-05-19' },
                { title: '归档完整性自动核查', status: 'success', desc: '本周新增 24 份报告，内容合规率 100%', time: '2024-05-18' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl border border-gray-50 bg-gray-50/30">
                  {item.status === 'success' && <CheckCircleIcon className="w-6 h-6 text-green-500" />}
                  {item.status === 'warning' && <ClockIcon className="w-6 h-6 text-orange-500" />}
                  {item.status === 'danger' && <XCircleIcon className="w-6 h-6 text-red-500" />}
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{item.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h4 className="text-sm font-bold mb-4">动态规则配置 (版本 2.4.1)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">人数限额控制</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">局团限制 5 人</span>
                    <span className="text-xs text-blue-600 cursor-pointer">修改</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">预算拦截阈值</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">100% 自动锁定</span>
                    <span className="text-xs text-blue-600 cursor-pointer">修改</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Timeline */}
        <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold mb-6">合规管理之智能预警雷达</h3>
          <div className="space-y-6">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    预算安全度
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    75%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
              </div>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                    流程准时率
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-orange-600">
                    92%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-100">
                <div style={{ width: "92%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100">
              <h4 className="text-xs font-bold text-red-800 mb-2">高风险项提醒</h4>
              <p className="text-xs text-red-600 leading-relaxed">
                近期有 3 份企事业归国报告存在涉密词汇触发风险，已自动转入人工复核序列，请及时处理。
              </p>
              <button className="mt-3 w-full py-2 bg-red-600 text-white rounded-lg text-[10px] font-bold">
                立即处理
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceManagement;
