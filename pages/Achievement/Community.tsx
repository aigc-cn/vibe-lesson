
import React, { useState } from 'react';
import { Achievement } from '../../types';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowPathIcon, 
  LinkIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: '高精度工业机器人控制算法合作意向', category: '先进制造', status: 'matching', valueScore: 92, matchingRate: 88 },
  { id: '2', title: '新型钙钛矿电池转换效率提升方案', category: '绿色能源', status: 'published', valueScore: 85 },
  { id: '3', title: '跨国金融支付系统安全加密协议', category: '信息技术', status: 'converted', valueScore: 98, matchingRate: 95 },
  { id: '4', title: '东南亚现代农业物流体系规划', category: '现代物流', status: 'matching', valueScore: 78, matchingRate: 65 },
];

const AchievementCommunity: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="搜索成果标题、领域、负责人..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-gray-50 rounded-xl text-gray-600 text-sm font-semibold hover:bg-gray-100 transition-colors">
            <FunnelIcon className="w-4 h-4" />
            <span>更多筛选</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 rounded-xl text-white text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
            <span>发布新成果</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_ACHIEVEMENTS.filter(a => a.title.includes(searchTerm)).map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                item.status === 'published' ? 'bg-blue-50 text-blue-600' :
                item.status === 'matching' ? 'bg-orange-50 text-orange-600' :
                'bg-green-50 text-green-600'
              }`}>
                {item.status === 'published' ? '已发布' : item.status === 'matching' ? '撮合中' : '已转化'}
              </span>
              <div className="flex items-center space-x-1 text-gray-400">
                <TagIcon className="w-4 h-4" />
                <span className="text-[10px]">{item.category}</span>
              </div>
            </div>
            
            <h4 className="text-sm font-bold text-gray-800 mb-6 line-clamp-2 h-10 leading-tight">
              {item.title}
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">价值评估得分</span>
                <span className="font-bold text-gray-800">{item.valueScore}</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${item.valueScore}%` }}
                ></div>
              </div>

              {item.matchingRate && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-orange-500 font-semibold">AI 需求契合度</span>
                    <span className="text-orange-600 font-bold">{item.matchingRate}%</span>
                  </div>
                  <div className="w-full bg-orange-100 h-1 rounded-full">
                    <div 
                      className="h-full bg-orange-500 rounded-full" 
                      style={{ width: `${item.matchingRate}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-50">
              <button className="text-xs text-blue-600 font-bold flex items-center space-x-1 hover:text-blue-800">
                <LinkIcon className="w-3 h-3" />
                <span>成果详情</span>
              </button>
              {item.status === 'matching' ? (
                <button className="px-3 py-1.5 bg-orange-600 text-white text-[10px] font-bold rounded-lg hover:bg-orange-700 transition-colors">
                  处理撮合
                </button>
              ) : (
                <button className="px-3 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                  查看进度
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Matching progress tracker simulation */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-8 flex items-center space-x-2">
          <ArrowPathIcon className="w-5 h-5 text-blue-500" />
          <span>实时成果撮合链路监控</span>
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-100"></div>
          <div className="space-y-10 relative">
            {[
              { time: '10:24', node: '需求解析', content: 'AI 完成“新型传感器”需求特征抽取，匹配分：88', status: 'done' },
              { time: '11:15', node: '智能匹配', content: '检索到 5 个高契合成果，已推送到成果持有方确认', status: 'done' },
              { time: '14:30', node: '三方沟通', content: '某科技园与持有方开启在线洽谈，合规风险初审通过', status: 'active' },
              { time: '待定', node: '协议签署', content: '预计 3 个工作日内完成电子签章存证', status: 'pending' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start space-x-6 ml-1">
                <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md flex-shrink-0 z-10 ${
                  step.status === 'done' ? 'bg-green-500' : 
                  step.status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                }`}></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-800">{step.node}</span>
                    <span className="text-xs text-gray-400">{step.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCommunity;
