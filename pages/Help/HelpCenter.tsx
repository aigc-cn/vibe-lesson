
import React, { useState } from 'react';
import { 
  BookOpenIcon, 
  MagnifyingGlassIcon, 
  ChevronRightIcon, 
  BookmarkIcon 
} from '@heroicons/react/24/outline';

interface HelpNode {
  id: string;
  title: string;
  children?: HelpNode[];
  content?: string;
}

const HELP_STRUCTURE: HelpNode[] = [
  {
    id: '1',
    title: '1 出访评估功能模块',
    children: [
      { id: '1.1', title: '1.1 安全形势、政治环境评估', content: '对接全球动态风险库，量化评估目标国安全风险、政治稳定性及对华友好度。支持 AI 智能体浮窗即时咨询。' },
      { id: '1.2', title: '1.2 人文历史、经济综合评估', content: '深度解析目的地经济潜力、重点行业赛道及文化礼仪禁忌，辅助制定外事交往策略。' },
      { id: '1.3', title: '1.3 邀请方综合评估', content: '穿透评估邀请机构背景实力，匹配历史往来记录，生成定制化谈判要点与风险预判。' },
    ]
  },
  {
    id: '2',
    title: '2 申报预审管理模块',
    children: [
      { id: '2.1', title: '2.1 政策关联解读', content: '集成 RAG 技术，精准关联国家及地方外事政策，提供申报全流程节点指引及相似成功案例推荐。' },
      { id: '2.2', title: '2.2 审核助手参考', content: '内置 AI 审核助手，自动识别经费超标、敏感领域及国别风险，生成《审核参考比对表》。' },
      { id: '2.3', title: '2.3 任务变更填报', content: '规范执行过程中的行程、人员或预算变更，提供标准模版并确保存证完整性。' },
      { id: '2.4', title: '2.4 申诉复核管理', content: '针对不予通过的申报任务提供二次复核通道，支持在线提交异议理由与专家独立评审。' },
    ]
  },
  {
    id: '3-5',
    title: '3-5 归国报告管理',
    children: [
      { id: '3', title: '3 招商引资团组报告', content: '包含意向企业画像自动生成、行程要素结构化提取及重点跟进清单智能建议。' },
      { id: '4', title: '4 局级团组归国报告', content: '符合公文版式要求，自动提炼政策建议，提供市级决策建议分级智能辅助。' },
      { id: '5', title: '5 企事业团组归国报告', content: '聚焦感悟心得润色与后续转化计划编排，通过 AI 智能体提升报告撰写效率。' },
    ]
  },
  {
    id: '16',
    title: '16 合规管理模块 (核心更新)',
    children: [
      { id: '16.1', title: '16.1 预算审批流程', content: '实时监控预算执行，实现 80% 黄色预警、100% 红色熔断拦截，确保存量额度动态调控。' },
      { id: '16.2', title: '16.2 规则版本迭代记录', content: '记录规则包变更历史，支持版本间的差异化比对及一键回滚。' },
      { id: '16.3', title: '16.3 规则适用范围设置', content: '按单位层级、团组类型、地理区域精准配置规则包的生效范围。' },
      { id: '16.4', title: '16.4 人数上限动态调整', content: '基于职级标准、国家风险及紧急程度，动态设定并强控出访人数限额。' },
      { id: '16.5', title: '16.5 行程天数合规校验', content: '自动识别行程单中的天数溢出，对比标准红线并提供偏差优化建议。' },
      { id: '16.6', title: '16.6 境外活动合规', content: '维护禁止/敏感活动负面清单，实时预警报告中可能存在的违规活动项。' },
      { id: '16.7', title: '16.7 内容完整性检查', content: '强制校验必填字段、附件签章及关联材料的完整性。' },
      { id: '16.8', title: '16.8 表述规范性字典', content: '内置 AI 润色引擎（Chatbot），自动修正口语化表达、纠偏术语并统一公文格式。' },
      { id: '16.9', title: '16.9 涉密内容自动识别', content: '集成 OCR 与 NLP 技术，深度扫描附件全文，自动识别并预警涉密或敏感关键词。' },
    ]
  },
  {
    id: '15',
    title: '15 成果社区与撮合',
    children: [
      { id: '15.1', title: '15.1 成果数据驾驶舱', content: '全链路动态监测，包含全球热力分布、转化排行、合规雷达及重点项目实时跟踪。' },
      { id: '15.2', title: '15.2 成果撮合辅助', content: '基于余弦相似度算法执行契合度评估，智能推荐高匹配成果，支持全周期进度可视。' },
      { id: '15.3', title: '15.3 成果社区运营', content: '标准化分类体系，水印防伪注入，支持语义检索与积分激励机制。' },
    ]
  },
  {
    id: '27',
    title: '27 系统管理与安全',
    children: [
      { id: '27.1', title: '27.1 服务状态监测', content: '监测 AI 集群、数据库及接口运行状态，保障系统一致性。' },
      { id: '27.2', title: '27.2 身份与鉴权', content: 'RBAC 角色权限管理与 MFA 多因素认证，确保障号生命周期安全。' },
      { id: '30', title: '30 数据安全传输', content: '全链路 AES-256 加密，存储层列级加密，保障政务数据机密性。' },
    ]
  }
];

const HelpCenter: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<HelpNode>(HELP_STRUCTURE[0].children![0]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-160px)]">
      {/* Sidebar TOC */}
      <div className="lg:w-80 bg-white rounded-3xl border border-gray-100 flex flex-col overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-50">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索文档内容或关键词..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          {HELP_STRUCTURE.map((group) => (
            <div key={group.id} className="mb-6">
              <h4 className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{group.title}</h4>
              <div className="space-y-1 mt-1">
                {group.children?.filter(c => c.title.includes(searchTerm) || c.content?.includes(searchTerm)).map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedSection(child)}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-between group ${
                      selectedSection.id === child.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                      : 'text-slate-500 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="truncate mr-2">{child.title}</span>
                    <ChevronRightIcon className={`w-3 h-3 transition-transform ${selectedSection.id === child.id ? 'translate-x-1' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 p-10 overflow-y-auto shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-4 mb-10">
            <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-100">
              <BookOpenIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[10px] text-blue-600 font-black tracking-[0.2em] uppercase">User Knowledge Base</p>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{selectedSection.title}</h1>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <BookmarkIcon className="w-24 h-24 text-slate-900" />
              </div>
              <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center space-x-2">
                <BookmarkIcon className="w-5 h-5 text-blue-500" />
                <span>功能业务逻辑描述</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium relative z-10">
                {selectedSection.content}
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-lg font-black text-slate-800 border-b-4 border-blue-500 pb-2 mb-6 inline-block">核心操作手册</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black shrink-0">01</div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">支持按关键字或分类快速定位业务功能，提供颗粒度极细的操作指引。</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black shrink-0">02</div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">内置合规性规则字典，所有参数动态可配置，满足最新国家外事政策变动。</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black shrink-0">03</div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">各模块均集成 AI 智能体（Agent），通过浮窗对话框提供即时咨询与内容润色。</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black shrink-0">04</div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">数据链路全透明，从申请到归档提供全周期一致性校验与安全溯源。</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-black text-slate-800 border-b-4 border-indigo-500 pb-2 mb-6 inline-block">智能体（Agent）赋能说明</h2>
                <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl"></div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                    <h4 className="font-black tracking-widest text-indigo-400">AI 处理引擎逻辑</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-loose mb-8 font-medium">
                    系统内置基于 Gemini 3 Pro 驱动的智能体集群，在页面右下角通过对话框浮窗形式呈现。它精通公文规范、合规细则及全球经贸情报，支持 PDF/DOCX 附件的深度解析与纠偏建议，助力审核提效 70% 以上。
                  </p>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center group hover:bg-white/10 transition-colors">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">向量存储</p>
                      <p className="text-xs font-black mt-1 text-white">语义化关联</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center group hover:bg-white/10 transition-colors">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">推理引擎</p>
                      <p className="text-xs font-black mt-1 text-white">Gemini Pro</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center group hover:bg-white/10 transition-colors">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">安全性</p>
                      <p className="text-xs font-black mt-1 text-white">密级控制</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default HelpCenter;
