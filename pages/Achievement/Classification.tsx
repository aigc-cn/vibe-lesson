
import React, { useState } from 'react';
import { 
  TagIcon, 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  ChevronRightIcon, 
  ChevronDownIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';

interface CategoryNode {
  id: string;
  name: string;
  count: number;
  children?: CategoryNode[];
}

const Classification: React.FC = () => {
  const [categories] = useState<CategoryNode[]>([
    {
      id: '1', name: '先进制造', count: 124,
      children: [
        { id: '1-1', name: '工业机器人', count: 45 },
        { id: '1-2', name: '数控机床', count: 32 },
        { id: '1-3', name: '精密仪器', count: 47 },
      ]
    },
    {
      id: '2', name: '数字经济', count: 215,
      children: [
        { id: '2-1', name: '人工智能', count: 88 },
        { id: '2-2', name: '区块链技术', count: 42 },
        { id: '2-3', name: '大数据分析', count: 85 },
      ]
    },
    {
      id: '3', name: '绿色能源', count: 98,
      children: [
        { id: '3-1', name: '光伏产业', count: 50 },
        { id: '3-2', name: '氢能技术', count: 28 },
        { id: '3-3', name: '储能系统', count: 20 },
      ]
    }
  ]);

  const [expanded, setExpanded] = useState<string[]>(['1', '2']);

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <TagIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">成果多维分类体系</h1>
            <p className="text-sm text-gray-500">标准化成果分类框架，按领域、层级、形式三级建档管理。</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center space-x-2">
          <PlusIcon className="w-4 h-4" />
          <span>新增顶级分类</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[600px]">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <Squares2X2Icon className="w-5 h-5 text-blue-500" />
            <span>分类树形视图</span>
          </h3>
          <div className="space-y-2">
            {categories.map(node => (
              <div key={node.id} className="space-y-1">
                <div className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-50 group ${expanded.includes(node.id) ? 'bg-blue-50/50' : ''}`}>
                  <div className="flex items-center space-x-2" onClick={() => toggleExpand(node.id)}>
                    {expanded.includes(node.id) ? <ChevronDownIcon className="w-4 h-4 text-gray-400" /> : <ChevronRightIcon className="w-4 h-4 text-gray-400" />}
                    <span className={`text-sm font-bold ${expanded.includes(node.id) ? 'text-blue-600' : 'text-gray-700'}`}>{node.name}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">{node.count}</span>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:text-blue-600"><PlusIcon className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:text-amber-600"><PencilSquareIcon className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                {expanded.includes(node.id) && node.children && (
                  <div className="pl-6 space-y-1 border-l border-gray-100 ml-4">
                    {node.children.map(child => (
                      <div key={child.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group cursor-pointer">
                        <span className="text-xs text-gray-600">{child.name} ({child.count})</span>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 hover:text-amber-600"><PencilSquareIcon className="w-3.5 h-3.5" /></button>
                          <button className="p-1 hover:text-red-600"><TrashIcon className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <h3 className="font-bold mb-4">分类映射建议 (AI)</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">根据近期的成果描述词云，AI 建议新增 [量子计算]、[合成生物] 两个子分类以适应新的招商趋势。</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
                <p className="text-xs font-bold text-blue-400">量子计算</p>
                <p className="text-[10px] text-slate-500 mt-1">建议归类于 [数字经济] 下级</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
                <p className="text-xs font-bold text-emerald-400">合成生物</p>
                <p className="text-[10px] text-slate-500 mt-1">建议归类于 [医疗健康] 下级</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6">分类体系运行报告</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">总建档分类数</span>
                <span className="text-lg font-black text-gray-900">42</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">本月活跃分类</span>
                <span className="text-lg font-black text-emerald-600">12</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">未归类成果数</span>
                <span className="text-lg font-black text-amber-600">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classification;
