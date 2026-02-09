
import React from 'react';
import { CalendarDaysIcon, CheckCircleIcon, ExclamationTriangleIcon, MapIcon } from '@heroicons/react/24/outline';

const ItineraryCheck: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100 text-white">
            <CalendarDaysIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">行程天数合规校验</h1>
            <p className="text-sm text-gray-500">基于外事办出访天数控制红线，自动识别计划行程与实际天数中的异常。</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-bold text-gray-800">地区标准天数对照表</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <tr>
                     <th className="px-6 py-4">目的地</th>
                     <th className="px-6 py-4">标准天数限制</th>
                     <th className="px-6 py-4">允许偏差</th>
                     <th className="px-6 py-4">管控状态</th>
                  </tr>
               </thead>
               <tbody className="text-sm divide-y divide-gray-50">
                  {[
                    { region: '欧洲 (一区)', limit: '10 天', drift: '±1 天', status: 'Strict' },
                    { region: '北美 (一区)', limit: '10 天', drift: '±1 天', status: 'Strict' },
                    { region: '亚洲/东南亚', limit: '5-7 天', drift: '±2 天', status: 'Normal' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                       <td className="px-6 py-4 font-bold text-gray-700 flex items-center"><MapIcon className="w-4 h-4 mr-2 text-gray-300" />{row.region}</td>
                       <td className="px-6 py-4">{row.limit}</td>
                       <td className="px-6 py-4 text-gray-500">{row.drift}</td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            row.status === 'Strict' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                          }`}>{row.status}</span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start space-x-4">
         <ExclamationTriangleIcon className="w-10 h-10 text-amber-600" />
         <div>
            <h4 className="font-black text-amber-800">实时校验预警 (T-4921 项目)</h4>
            <p className="text-xs text-amber-700 leading-loose mt-2 italic">
               “该项目申报行程为 [德国-法国-德国] 共 12 天，超过标准限额 2 天。检测到第三段行程为中转待机，建议优化为直飞以缩减天数，或提交 [特殊必要性说明]。”
            </p>
         </div>
      </div>
    </div>
  );
};

export default ItineraryCheck;
