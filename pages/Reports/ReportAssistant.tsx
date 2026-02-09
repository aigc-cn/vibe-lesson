
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateReportDraft } from '../../services/geminiService';
import { SparklesIcon, DocumentDuplicateIcon, ArrowDownTrayIcon, PencilSquareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ReportAssistant: React.FC = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState<'bureau' | 'enterprise' | 'investment'>('enterprise');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState('');
  const [tripData, setTripData] = useState({
    destination: '德国、法国',
    duration: '10天',
    outcomes: '签署合作备忘录2份，对接企业5家',
    highlights: '参观了大众汽车总部和空客工业园区'
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateReportDraft(tripData, reportType);
      setDraft(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={() => navigate('/reports')}
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm font-semibold">返回报告列表</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Configuration Column */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">归国报告智能撰写助手</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">报告类型</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'bureau', label: '局级公文', icon: <DocumentDuplicateIcon /> },
                    { id: 'investment', label: '招商引资', icon: <SparklesIcon /> },
                    { id: 'enterprise', label: '企事业', icon: <PencilSquareIcon /> },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setReportType(t.id as any)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        reportType === t.id 
                        ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-inner' 
                        : 'border-gray-50 bg-gray-50 text-gray-400 grayscale'
                      }`}
                    >
                      {React.cloneElement(t.icon as React.ReactElement, { className: 'w-6 h-6 mb-2' })}
                      <span className="text-xs font-bold">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">出访目的地</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 text-sm"
                    value={tripData.destination}
                    onChange={e => setTripData({...tripData, destination: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">出访时长</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 text-sm"
                      value={tripData.duration}
                      onChange={e => setTripData({...tripData, duration: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">关键成果</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 text-sm"
                      value={tripData.outcomes}
                      onChange={e => setTripData({...tripData, outcomes: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">行程亮点</label>
                  <textarea 
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 text-sm h-24"
                    value={tripData.highlights}
                    onChange={e => setTripData({...tripData, highlights: e.target.value})}
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 mt-6"
              >
                {loading ? 'AI 正在梳理中...' : '一键生成报告草案'}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-2">温馨提示</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              AI 智能体基于您的基础数据和归档案例库为您生成报告初稿。请在生成后进行人工核对，特别注意敏感词汇和公文术语规范。
            </p>
          </div>
        </div>

        {/* Draft Column */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[600px]">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-800">报告实时预览</span>
            <button className="flex items-center space-x-2 px-4 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors">
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>导出报告 (DOCX)</span>
            </button>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            {draft ? (
              <div className="prose prose-blue max-w-none animate-in fade-in duration-700">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                  {draft}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-300">
                <DocumentDuplicateIcon className="w-16 h-16 mb-4" />
                <p className="text-sm">等待生成报告草案...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAssistant;
