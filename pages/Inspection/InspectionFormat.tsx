
import React, { useState } from 'react';
import { 
  CheckBadgeIcon, 
  ExclamationCircleIcon, 
  ArrowPathIcon, 
  CloudArrowUpIcon,
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  TableCellsIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

interface ValidationResult {
  field: string;
  value: string;
  error: string;
  suggestion: string;
  type: 'format' | 'business' | 'security';
}

const MOCK_VALIDATIONS: ValidationResult[] = [
  { field: '出访日期', value: '2024/05/12', error: '日期格式不规范', suggestion: '应使用 YYYY-MM-DD', type: 'format' },
  { field: '护照号码', value: 'G12345678', error: '敏感数据未脱敏', suggestion: '建议应用脱敏掩码', type: 'security' },
  { field: '预算金额', value: '55,000', error: '超出所属科目限额 10%', suggestion: '请调减住宿费或补充特殊理由', type: 'business' },
  { field: '随行人员名单', value: '张三,李四', error: '与申报审批名单不一致', suggestion: '缺失人员：王五', type: 'business' },
];

const InspectionFormat: React.FC = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [maskActive, setMaskActive] = useState(true);

  const startValidation = () => {
    setIsValidating(true);
    setTimeout(() => setIsValidating(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-pink-500 rounded-2xl shadow-lg shadow-pink-100 text-white">
            <DocumentMagnifyingGlassIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">出站格式合规性校验</h1>
            <p className="text-sm text-gray-500">基于多维校验引擎自动标注错误字段，支持敏感数据识别与脱敏策略。</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 flex items-center space-x-2">
            <ShieldCheckIcon className="w-4 h-4 text-blue-500" />
            <span>脱敏策略配置</span>
          </button>
          <button 
            onClick={startValidation}
            disabled={isValidating}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center space-x-2 disabled:bg-blue-300"
          >
            {isValidating ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : <CheckBadgeIcon className="w-4 h-4" />}
            <span>{isValidating ? '正在校验...' : '执行批量校验'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                <TableCellsIcon className="w-5 h-5 text-blue-500" />
                <span>实时校验结果视图</span>
              </h3>
              <button 
                onClick={() => setMaskActive(!maskActive)}
                className="flex items-center space-x-1 text-[10px] font-bold text-gray-500 hover:text-blue-600"
              >
                {maskActive ? <EyeSlashIcon className="w-3 h-3" /> : <EyeIcon className="w-3 h-3" />}
                <span>{maskActive ? '脱敏预览已开启' : '显示真实数据'}</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">校验字段</th>
                    <th className="px-6 py-4">输入值</th>
                    <th className="px-6 py-4">异常描述</th>
                    <th className="px-6 py-4">修复建议</th>
                    <th className="px-6 py-4 text-right">标记</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-50">
                  {MOCK_VALIDATIONS.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-800">{row.field}</td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">
                        {row.field === '护照号码' && maskActive ? 'G********' : row.value}
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center text-red-500 font-bold text-[11px]">
                          <ExclamationCircleIcon className="w-3 h-3 mr-1" />
                          {row.error}
                        </span>
                      </td>
                      <td className="px-6 py-4 italic text-gray-400 text-xs">{row.suggestion}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          row.type === 'format' ? 'bg-blue-100 text-blue-600' :
                          row.type === 'security' ? 'bg-red-100 text-red-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>{row.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <h3 className="font-bold mb-6">校验引擎配置</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-blue-400 mb-2">基础格式校验</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">自动校验日期、金额、证件号、联系方式等 24 类标准数据项格式。</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-emerald-400 mb-2">业务逻辑校验</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">交叉比对行程天数、经费预算、随行名单与预申报审批原件的逻辑一致性。</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-red-400 mb-2">数据安全脱敏</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">内置 [姓名、证件、住址、薪酬] 脱敏策略，支持 MD5 哈希与掩码遮蔽。</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center group hover:bg-blue-50 transition-colors cursor-pointer">
            <CloudArrowUpIcon className="w-10 h-10 text-gray-300 group-hover:text-blue-500 transition-colors" />
            <p className="mt-4 text-xs font-bold text-gray-600">点击上传待校验批次数据</p>
            <p className="text-[9px] text-gray-400 mt-1">支持 Excel 模板批量导入 (Max: 5000条)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionFormat;
