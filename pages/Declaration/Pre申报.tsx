
import React, { useState } from 'react';
import { interpretPolicy } from '../../services/geminiService';
import { InformationCircleIcon, ExclamationTriangleIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

const PreDeclaration: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [interpretation, setInterpretation] = useState('');

  const handleAsk = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await interpretPolicy(query);
      setInterpretation(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Policy Assistant */}
      <div className="lg:col-span-4 flex flex-col space-y-6">
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <InformationCircleIcon className="w-6 h-6" />
            <span>申报政策助手</span>
          </h3>
          <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
            AI 智能体为您解读最新的出国任务申报政策、经费标准及合规要求。
          </p>
          <div className="space-y-4">
            <textarea
              className="w-full h-32 p-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 outline-none text-sm"
              placeholder="请输入您的疑问 (如：因公赴美出访天数限制、交通费报销标准等)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              {loading ? '正在分析...' : '智能解读'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-4">典型案例库</h4>
          <div className="space-y-3">
            {[
              { type: '成功', title: '某市代表团赴新加坡招商申报案例', color: 'text-green-600 bg-green-50' },
              { type: '预警', title: '某大学企事业团组人数超限处理方案', color: 'text-orange-600 bg-orange-50' },
              { type: '否决', title: '某机构敏感领域出访申请审核不通过案例', color: 'text-red-600 bg-red-50' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold mb-1 inline-block ${item.color}`}>{item.type}</span>
                <p className="text-xs font-medium text-gray-700 leading-tight">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Review Area */}
      <div className="lg:col-span-8 space-y-6">
        {interpretation ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">智能解读结果</h3>
              <button className="text-blue-600 text-sm hover:underline" onClick={() => setInterpretation('')}>重置</button>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
              {interpretation}
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">待审申报任务</h3>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">全部 (12)</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">高风险 (3)</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <tr>
                    <th className="pb-4">项目名称</th>
                    <th className="pb-4">申报单位</th>
                    <th className="pb-4">目的地</th>
                    <th className="pb-4">风险级别</th>
                    <th className="pb-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-50">
                  {[
                    { name: '中德工业创新合作论坛', unit: '市经信局', dest: '德国', risk: '低', color: 'text-green-500' },
                    { name: '北美生物技术巡回展', unit: '某制药集团', dest: '美国/加拿大', risk: '中', color: 'text-yellow-500' },
                    { name: '中东新能源市场考察', unit: '某能源公司', dest: '沙特阿拉伯', risk: '高', color: 'text-red-500' },
                  ].map((task, idx) => (
                    <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-semibold text-gray-800">{task.name}</td>
                      <td className="py-4 text-gray-500">{task.unit}</td>
                      <td className="py-4 text-gray-500">{task.dest}</td>
                      <td className={`py-4 font-bold ${task.color}`}>{task.risk}</td>
                      <td className="py-4 text-right">
                        <button className="px-4 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                          审核
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
            <h4 className="flex items-center space-x-2 text-amber-800 font-bold mb-3">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <span>智能风险预判</span>
            </h4>
            <div className="space-y-2">
              <p className="text-xs text-amber-700">• 目的国：当前中东局势存在波动，建议加强应急预案。</p>
              <p className="text-xs text-amber-700">• 预算：北美巡回展人均每日标准超标15%，需补充特殊理由。</p>
            </div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
            <h4 className="flex items-center space-x-2 text-emerald-800 font-bold mb-3">
              <CheckBadgeIcon className="w-5 h-5" />
              <span>合规智能比对</span>
            </h4>
            <div className="space-y-2">
              <p className="text-xs text-emerald-700">• 成功匹配：该团组历史申报成功率为92%，模板引用正确。</p>
              <p className="text-xs text-emerald-700">• 相似度：与2023年某成功案例内容重合度达88%。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreDeclaration;
