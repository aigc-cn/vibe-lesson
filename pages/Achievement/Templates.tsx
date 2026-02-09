
import React from 'react';
import { 
  Square2StackIcon, 
  CloudArrowUpIcon, 
  EyeIcon, 
  PencilIcon, 
  ShieldCheckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Templates: React.FC = () => {
  const templates = [
    { id: '1', name: 'PDF 合作协议标准模板', type: 'PDF', version: 'v2.4', watermarked: true, security: 'Internal' },
    { id: '2', name: 'PPT 成果转化简报模板', type: 'PPT', version: 'v1.1', watermarked: true, security: 'Public' },
    { id: '3', name: 'HTML 成功案例展示模板', type: 'HTML', version: 'v3.0', watermarked: false, security: 'Secret' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <Square2StackIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">发布格式模板管理</h1>
            <p className="text-sm text-gray-500">定制化成果发布模板，注入水印、密级标识及版权声明。</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-100 flex items-center space-x-2">
          <CloudArrowUpIcon className="w-4 h-4" />
          <span>上传新模板</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl group-hover:bg-blue-600 transition-colors ${
                template.type === 'PDF' ? 'bg-red-50 text-red-600' :
                template.type === 'PPT' ? 'bg-orange-50 text-orange-600' :
                'bg-blue-50 text-blue-600'
              } group-hover:text-white`}>
                <Square2StackIcon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Version</span>
                <span className="text-sm font-black text-gray-800">{template.version}</span>
              </div>
            </div>
            
            <h3 className="font-bold text-gray-800 mb-2">{template.name}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold">
                <span className={`px-2 py-0.5 rounded ${template.watermarked ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
                  {template.watermarked ? '已注入水印' : '无水印'}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600">密级: {template.security}</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:border-blue-100 transition-colors">
                <p className="text-[10px] text-gray-400 mb-1">模板说明</p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">适用于正式对外的招商合作意向书发布，包含我市的标准公文抬头与防伪标识。</p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-4">
              <button className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline">
                <EyeIcon className="w-4 h-4" />
                <span>预览效果</span>
              </button>
              <div className="flex space-x-2">
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><PencilIcon className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><ShieldCheckIcon className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center space-x-4">
        <CheckCircleIcon className="w-10 h-10 text-emerald-500" />
        <div>
          <h4 className="font-bold text-emerald-800">全局注入规则生效中</h4>
          <p className="text-xs text-emerald-600 leading-relaxed">
            所有新发布的 [Secret] 密级成果已自动注入动态溯源水印，包含下载人 ID 与 IP 地址。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Templates;
