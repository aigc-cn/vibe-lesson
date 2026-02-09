
import React, { useState } from 'react';
import { 
  ChatBubbleBottomCenterIcon, 
  PaperAirplaneIcon, 
  UserCircleIcon,
  PlusIcon,
  LinkIcon,
  SparklesIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const GroupDiscussion: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState('DE-2024-001');

  const groups = [
    { id: 'DE-2024-001', name: '2024 赴德招商专项小组', members: 12, lastMsg: '协议草案已上传，请核对', time: '10:24' },
    { id: 'US-2024-012', name: '北美医疗器械考察团', members: 8, lastMsg: '张三的签证补件已完成', time: '09:15' },
    { id: 'AS-2024-085', name: '东南亚绿色能源对接', members: 5, lastMsg: '建议增加越南胡志明市行程', time: '昨天' },
  ];

  return (
    <div className="h-[calc(100vh-180px)] flex gap-6 animate-in fade-in duration-500">
      {/* Group List Sidebar */}
      <div className="w-80 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
        <div className="p-5 border-b border-gray-50">
          <div className="relative">
            <input type="text" placeholder="搜索群组或项目..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-2xl text-xs focus:ring-2 focus:ring-purple-500" />
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-1">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all group ${
                activeGroup === g.id 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-100' 
                : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-mono ${activeGroup === g.id ? 'text-purple-200' : 'text-gray-400'}`}>{g.id}</span>
                <span className={`text-[10px] ${activeGroup === g.id ? 'text-purple-200' : 'text-gray-400'}`}>{g.time}</span>
              </div>
              <h4 className="text-sm font-bold truncate">{g.name}</h4>
              <div className="mt-2 flex items-center justify-between">
                <p className={`text-[11px] truncate flex-1 ${activeGroup === g.id ? 'text-purple-100' : 'text-gray-500'}`}>{g.lastMsg}</p>
                <div className={`flex items-center space-x-1 ml-2 px-1.5 py-0.5 rounded-full text-[9px] font-black ${activeGroup === g.id ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
                   <span>{g.members}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-50">
           <button className="w-full py-3 bg-purple-50 text-purple-600 rounded-2xl text-xs font-bold hover:bg-purple-100 flex items-center justify-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>新建任务群组</span>
           </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-5 bg-white border-b border-gray-50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm font-black">OG</div>
            <div>
               <h3 className="font-black text-gray-900 leading-none mb-1">
                 {groups.find(g => g.id === activeGroup)?.name}
               </h3>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ongoing Collaboration Space</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
             <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"><LinkIcon className="w-5 h-5" /></button>
             <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"><ArchiveBoxIcon className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 space-y-6 custom-scrollbar">
           <div className="flex justify-start">
              <div className="flex space-x-3 max-w-[70%]">
                 <UserCircleIcon className="w-8 h-8 text-gray-400 shrink-0" />
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 ml-1">王科长 (外办)</p>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-800 leading-relaxed">
                       各位，关于本次德国行的 [智能制造展示中心] 选址意见已汇总，请在明早 10 点前提交补充建议。
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex justify-end">
              <div className="flex flex-row-reverse space-x-3 space-x-reverse max-w-[70%]">
                 <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg">ME</div>
                 <div className="space-y-1 text-right">
                    <p className="text-[10px] font-bold text-gray-400 mr-1">超级管理员</p>
                    <div className="bg-purple-600 p-4 rounded-2xl rounded-tr-none shadow-lg text-sm text-white leading-relaxed">
                       收到，我这边会协调产业中心的人员今晚完成初审汇总。
                    </div>
                 </div>
              </div>
           </div>

           {/* AI Insight Inserted */}
           <div className="flex justify-center py-4">
              <div className="bg-indigo-900 rounded-3xl p-6 shadow-2xl border border-white/10 max-w-[85%] relative overflow-hidden group">
                 <div className="absolute -right-8 -top-8 p-4 opacity-5 rotate-12 group-hover:scale-110 transition-transform">
                    <SparklesIcon className="w-24 h-24 text-white" />
                 </div>
                 <div className="flex items-center space-x-2 text-indigo-400 mb-3">
                    <SparklesIcon className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">AI 协同灵感</span>
                 </div>
                 <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    根据当前讨论，AI 建议关联历史项目 [DE-2022-015] 的选址评审方案，该方案在后续转化中表现优异。
                 </p>
                 <button className="mt-4 text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-tighter">一键引用历史方案 &rarr;</button>
              </div>
           </div>
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-white border-t border-gray-100 shrink-0">
           <div className="flex items-center space-x-3">
              <input type="text" placeholder="在此输入讨论内容，按 Enter 发送..." className="flex-1 px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-purple-500 transition-all font-medium" />
              <button className="p-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 shadow-xl shadow-purple-500/30 transition-all active:scale-95">
                 <PaperAirplaneIcon className="w-6 h-6" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDiscussion;
