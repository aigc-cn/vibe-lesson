
import React from 'react';
import { 
  ClockIcon, 
  ChatBubbleLeftEllipsisIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  // Added missing CheckCircleIcon import
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const ProgressTracking: React.FC = () => {
  const timeline = [
    { time: '2024-05-22 10:00', node: '匹配成功', content: 'AI 完成特征锁定，匹配度 94 分。', status: 'done' },
    { time: '2024-05-22 14:30', node: '需求方确认', content: '需求单位已查阅匹配成果并同意发起对接。', status: 'done' },
    { time: '2024-05-23 09:15', node: '持有方反馈', content: '成果持有单位正在确认最新合作意向及细节。', status: 'active' },
    { time: '-', node: '签署撮合备忘录', content: '待双方确认核心条款。', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <ClockIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">匹配进度全周期追踪</h1>
            <p className="text-sm text-gray-500">实时同步各节点耗时并提供超时预警，存档沟通记录形成历史轨迹。</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative">
           <div className="absolute left-12 top-24 bottom-24 w-0.5 bg-gray-100"></div>
           <div className="space-y-12 relative">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-start space-x-8">
                   <div className={`w-8 h-8 rounded-full border-4 border-white shadow-md flex-shrink-0 z-10 flex items-center justify-center ${
                     item.status === 'done' ? 'bg-emerald-500' : item.status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'
                   }`}>
                      {item.status === 'done' && <CheckCircleIcon className="w-4 h-4 text-white" />}
                   </div>
                   <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                         <h4 className="font-bold text-gray-800 text-lg">{item.node}</h4>
                         <span className="text-xs font-mono text-gray-400">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">{item.content}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
              <div className="flex items-center space-x-2 text-amber-700 mb-3">
                 <ExclamationCircleIcon className="w-6 h-6" />
                 <h4 className="font-bold">超时风险预警</h4>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                 当前节点 [持有方反馈] 已耗时 18 小时，超过预设 12 小时阈值。系统已自动推送“待办催办”站内信给成果持有方管理员。
              </p>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                 <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-blue-500" />
                 <span>沟通历史存证</span>
              </h4>
              <div className="space-y-4">
                 {[
                   { user: '需求方', content: '询问核心专利授权期限', time: '1天前' },
                   { user: '持有方', content: '回复：标准授权期为 5 年', time: '1天前' }
                 ].map((log, i) => (
                   <div key={i} className="text-[11px] p-3 bg-gray-50 rounded-xl">
                      <p className="font-bold text-gray-700 mb-1">{log.user}</p>
                      <p className="text-gray-500 italic">"{log.content}"</p>
                      <p className="mt-2 text-right text-[9px] text-gray-400 font-mono">{log.time}</p>
                   </div>
                 ))}
                 <button className="w-full py-2 text-[10px] font-bold text-blue-600 hover:underline">上传沟通纪要附件</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
