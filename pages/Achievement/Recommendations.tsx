
import React from 'react';
import { 
  FireIcon, 
  SparklesIcon, 
  ArrowTrendingUpIcon, 
  StarIcon,
  ChevronRightIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';

const Recommendations: React.FC = () => {
  const hotList = [
    { title: '德国库卡工业机器人核心算法专利', visits: '1.2k', value: 98, tag: '顶级战略' },
    { title: '新加坡淡马锡生命科学合作协议', visits: '856', value: 92, tag: '高热度' },
    { title: '迪拜未来博物馆数字化展厅方案', visits: '642', value: 85, tag: '新入库' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-500 rounded-2xl shadow-lg shadow-orange-100 text-white">
            <FireIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">热点成果推荐</h1>
            <p className="text-sm text-gray-500">实时捕捉全球考察动态热度，自动推送高价值战略成果。</p>
          </div>
        </div>
        <button className="text-xs font-bold text-blue-600 border border-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all">
          推荐策略管理
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between h-48 relative overflow-hidden group">
               <SparklesIcon className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform" />
               <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded">今日置顶</span>
                  <h3 className="mt-4 text-xl font-bold leading-tight">东南亚碳中和技术考察成果汇编 (2024版)</h3>
               </div>
               <div className="flex items-center justify-between relative z-10">
                  <div className="flex -space-x-2">
                     {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-indigo-600 bg-gray-200" />)}
                     <span className="pl-4 text-[10px] font-bold flex items-center">+124人看过</span>
                  </div>
                  <button className="p-2 bg-white text-indigo-600 rounded-full hover:scale-110 transition-all shadow-lg"><ChevronRightIcon className="w-4 h-4" /></button>
               </div>
            </div>
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between h-48 group">
               <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500 px-2 py-1 rounded">重点关注</span>
                  <h3 className="mt-4 text-xl font-bold leading-tight">中欧工业自动化实验室联合建设方案</h3>
               </div>
               <div className="flex items-center justify-between">
                  <p className="text-[10px] text-slate-400 font-bold">预计成果转化价值: ￥2.4B</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-bold shadow-lg hover:bg-blue-500 transition-all">立即参与撮合</button>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                   <ArrowTrendingUpIcon className="w-5 h-5 text-blue-500" />
                   <span>实时热度排行榜</span>
                </h3>
             </div>
             <div className="divide-y divide-gray-50">
                {hotList.map((item, i) => (
                  <div key={i} className="p-6 hover:bg-gray-50 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-4">
                       <span className={`text-2xl font-black ${i === 0 ? 'text-orange-500' : 'text-gray-200'}`}>0{i+1}</span>
                       <div>
                          <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                          <div className="flex items-center space-x-3 mt-1">
                             <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded font-bold">{item.tag}</span>
                             <span className="text-[10px] text-gray-400 flex items-center"><FireIcon className="w-3 h-3 mr-1" />{item.visits} 访问</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center space-x-4">
                       <div className="text-right">
                          <p className="text-[9px] font-bold text-gray-400">价值评分</p>
                          <p className="text-sm font-black text-blue-600">{item.value}</p>
                       </div>
                       <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
                 <StarIcon className="w-5 h-5 text-yellow-500" />
                 <span>个性化智能推荐</span>
              </h4>
              <div className="space-y-4">
                 {[
                   { title: '半导体光刻胶国产化对接报告', score: '98% 契合' },
                   { title: '德国北威州先进制造业人才互换项目', score: '92% 契合' }
                 ].map((rec, i) => (
                   <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-white hover:border-blue-100 transition-colors cursor-pointer">
                      <p className="text-xs font-bold text-gray-800 mb-2">{rec.title}</p>
                      <span className="text-[10px] font-bold text-blue-600">{rec.score}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-bold shadow-lg shadow-slate-200">更新偏好设置</button>
           </div>

           <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
              <div className="flex items-center space-x-3 mb-3">
                 <HandThumbUpIcon className="w-5 h-5 text-emerald-600" />
                 <h4 className="font-bold text-emerald-800 text-xs">成功转化喜报</h4>
              </div>
              <p className="text-[10px] text-emerald-600 leading-relaxed font-medium">
                 "恭喜！由 [某市经信局] 发布的『跨国工业大脑算法合作成果』已正式签约落地，转化价值估值 1.2 亿元。"
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
