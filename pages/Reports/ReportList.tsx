
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentPlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  DocumentArrowDownIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface ReportItem {
  id: string;
  title: string;
  type: 'bureau' | 'enterprise' | 'investment';
  destination: string;
  submitDate: string;
  status: 'draft' | 'reviewing' | 'approved';
}

const MOCK_REPORTS: ReportItem[] = [
  { id: 'R-2024-001', title: '中德工业创新合作论坛成果报告', type: 'bureau', destination: '德国/法国', submitDate: '2024-05-15', status: 'approved' },
  { id: 'R-2024-002', title: '北美生物技术巡回展考察总结', type: 'investment', destination: '美国/加拿大', submitDate: '2024-05-20', status: 'reviewing' },
  { id: 'R-2024-003', title: '东南亚现代农业对接执行报告', type: 'enterprise', destination: '越南/泰国', submitDate: '2024-05-22', status: 'draft' },
  { id: 'R-2024-004', title: '中东新能源市场调研报告', type: 'investment', destination: '沙特阿拉伯', submitDate: '2024-05-10', status: 'approved' },
];

const ReportList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: ReportItem['status']) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold flex items-center w-fit"><CheckCircleIcon className="w-3 h-3 mr-1" />已审批</span>;
      case 'reviewing':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold flex items-center w-fit"><ClockIcon className="w-3 h-3 mr-1" />审批中</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold flex items-center w-fit"><PencilSquareIcon className="w-3 h-3 mr-1" />草稿</span>;
    }
  };

  const getTypeLabel = (type: ReportItem['type']) => {
    switch (type) {
      case 'bureau': return '局级报告';
      case 'investment': return '招商报告';
      case 'enterprise': return '企事业报告';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">归国报告管理</h1>
          <p className="text-sm text-gray-500">查看、编辑和导出各团组归国报告，支持 AI 辅助撰写及格式校验。</p>
        </div>
        <Link 
          to="/reports/create"
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
        >
          <DocumentPlusIcon className="w-5 h-5" />
          <span>新建报告</span>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="搜索报告标题、目的地、编号..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 rounded-xl text-gray-600 text-sm font-semibold hover:bg-gray-100 transition-colors">
            <FunnelIcon className="w-4 h-4" />
            <span>筛选</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">报告编号 / 标题</th>
                <th className="px-6 py-4">报告类型</th>
                <th className="px-6 py-4">目的地</th>
                <th className="px-6 py-4">提交日期</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {MOCK_REPORTS.filter(r => r.title.includes(searchTerm)).map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-gray-400 mb-0.5">{report.id}</span>
                      <span className="font-semibold text-gray-800">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-xs px-2 py-1 bg-gray-100 rounded-md font-medium">{getTypeLabel(report.type)}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xs">{report.destination}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{report.submitDate}</td>
                  <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="查看/编辑">
                        <DocumentTextIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded" title="导出 PDF">
                        <DocumentArrowDownIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="删除">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
