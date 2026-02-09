
import React, { useState } from 'react';
import { 
  ArrowPathIcon, 
  CloudArrowUpIcon, 
  PauseIcon, 
  PlayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CircleStackIcon,
  SignalIcon,
  // Added missing ShieldCheckIcon import
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const ResumableUpload: React.FC = () => {
  const [activeUploads, setActiveUploads] = useState([
    { id: '1', name: '2024年三季度归国成果汇编.xlsx', size: '256 MB', progress: 45, status: 'Uploading', chunks: '45/100', speed: '2.4 MB/s' },
    { id: '2', name: '全球工业大脑专利集(欧非区).zip', size: '1.2 GB', progress: 12, status: 'Paused', chunks: '12/500', speed: '-' },
    { id: '3', name: '历史考察文本库迁移_v2.csv', size: '18 MB', progress: 100, status: 'Completed', chunks: '10/10', speed: '-' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <ArrowPathIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">上传进度断点续传</h1>
            <p className="text-sm text-gray-500">支持超大文件分片并行上传，遇网络波动自动保留进度，秒级续传。</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-2xl">
           <div className="flex items-center space-x-2 text-[10px] font-black text-gray-400">
              <SignalIcon className="w-4 h-4 text-emerald-500" />
              <span>网络状态：极佳 (45ms)</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 活跃上传队列 */}
        <div className="lg:col-span-8 space-y-4">
           {activeUploads.map((upload) => (
             <div key={upload.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group hover:border-blue-100 transition-all">
                <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-2xl ${
                        upload.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                        upload.status === 'Paused' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                         <CircleStackIcon className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-gray-800">{upload.name}</h4>
                         <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-widest">{upload.size} • 分片进度：{upload.chunks}</p>
                      </div>
                   </div>
                   <div className="flex items-center space-x-2">
                      {upload.status !== 'Completed' && (
                        <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-blue-600 transition-all">
                           {upload.status === 'Uploading' ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                        </button>
                      )}
                      <button className="p-2 hover:bg-red-50 rounded-xl text-gray-300 hover:text-red-500 transition-all">
                         <ArrowPathIcon className="w-5 h-5" />
                      </button>
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className={`${
                        upload.status === 'Completed' ? 'text-emerald-600' : 
                        upload.status === 'Paused' ? 'text-amber-600' : 'text-blue-600'
                      }`}>{upload.status}</span>
                      <span className="text-gray-400">{upload.progress}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          upload.status === 'Completed' ? 'bg-emerald-500' : 
                          upload.status === 'Paused' ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${upload.progress}%` }}
                      ></div>
                   </div>
                   {upload.status === 'Uploading' && (
                      <p className="text-[9px] text-gray-400 text-right italic">当前瞬时速率：{upload.speed}</p>
                   )}
                </div>
             </div>
           ))}
        </div>

        {/* 状态监控 */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="font-bold mb-6 flex items-center space-x-2 text-indigo-400">
                 {/* Fixed: Imported missing ShieldCheckIcon from outline icons */}
                 <ShieldCheckIcon className="w-5 h-5" />
                 <span>分片安全校验中心</span>
              </h3>
              <div className="space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-xs font-bold text-blue-400 mb-1">重复分片检测</p>
                    <p className="text-[10px] text-slate-400 leading-relaxed">系统会自动对齐上传指针，跳过已持久化存储的文件分片 (Hash 对比)。</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-xs font-bold text-amber-400 mb-1">异常自动重试</p>
                    <p className="text-[10px] text-slate-400 leading-relaxed">网络异常时，每个分片提供 3 次指数退避重试策略。</p>
                 </div>
              </div>
           </div>

           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center space-x-3">
              <ExclamationCircleIcon className="w-10 h-10 text-blue-600" />
              <div>
                 <p className="text-xs font-bold text-blue-800">存储空间告警</p>
                 <p className="text-[10px] text-blue-600 mt-1 italic">临时分片缓存剩余 12.4 GB，建议及时清理 30 天前未完成的任务。</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResumableUpload;
