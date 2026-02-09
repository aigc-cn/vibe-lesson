
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  ClipboardDocumentCheckIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  AcademicCapIcon,
  ScaleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassCircleIcon,
  ArrowsRightLeftIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  ArrowUpTrayIcon,
  FingerPrintIcon,
  CheckBadgeIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightStartOnRectangleIcon,
  CommandLineIcon,
  ShieldExclamationIcon,
  KeyIcon,
  CodeBracketSquareIcon
} from '@heroicons/react/24/outline';

// 基础页面
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UserManagement from './pages/Admin/UserManagement';
import ApiPlatform from './pages/Admin/ApiPlatform';

// 评估与申报页面
import EvaluationEnv from './pages/Evaluation/Environment';
import CultureEconomic from './pages/Evaluation/CultureEconomic';
import InviterAssessment from './pages/Evaluation/InviterAssessment';
import PolicyInterpretation from './pages/Declaration/PolicyInterpretation';
import ReviewAssistant from './pages/Declaration/ReviewAssistant';
import DailyUpdate from './pages/Declaration/DailyUpdate';
import AppealReview from './pages/Declaration/AppealReview';

// 成果与社区页面
import AchievementClassification from './pages/Achievement/Classification';
import AchievementTemplates from './pages/Achievement/Templates';
import AchievementPublishing from './pages/Achievement/Publishing';
import AchievementRecommendations from './pages/Achievement/Recommendations';
import AchievementDiscovery from './pages/Achievement/Discovery';
import AchievementPointRules from './pages/Achievement/PointRules';
import AchievementPointCalculation from './pages/Achievement/PointCalculation';
import AchievementDataCockpit from './pages/Achievement/DataCockpit';

// 撮合与检查页面
import MatchingApplicationEntry from './pages/Matching/ApplicationEntry';
import MatchingFitAssessment from './pages/Matching/FitAssessment';
import MatchingApproval from './pages/Matching/Approval';
import MatchingAlgorithm from './pages/Matching/AlgorithmManagement';
import MatchingResults from './pages/Matching/ResultManagement';
import MatchingProgressTracking from './pages/Matching/ProgressTracking';
import MatchingRiskPrompt from './pages/Matching/RiskPrompt';
import MatchingDataCollection from './pages/Matching/DataCollection';
import MatchingProcessManagement from './pages/Matching/ProcessManagement';
import MatchingReportGeneration from './pages/Matching/ReportGeneration';
import MatchingDepthAnalysis from './pages/Matching/DepthAnalysis';

import InspectionStats from './pages/Inspection/InspectionStats';
import InspectionTracking from './pages/Inspection/InspectionTracking';
import InspectionTraceability from './pages/Inspection/InspectionTraceability';
import InspectionFormat from './pages/Inspection/InspectionFormat';
import InspectionConflict from './pages/Inspection/InspectionConflict';

// 归国报告、合规、协同
import InvestmentAssistant from './pages/Reports/InvestmentAssistant';
import EnterprisePersona from './pages/Reports/EnterprisePersona';
import ItineraryExtraction from './pages/Reports/ItineraryExtraction';
import RiskWarning from './pages/Reports/RiskWarning';
import BureauAssistant from './pages/Reports/BureauAssistant';
import BureauDecision from './pages/Reports/BureauDecision';
import BureauRisk from './pages/Reports/BureauRisk';
import EnterpriseAssistant from './pages/Reports/EnterpriseAssistant';
import EnterpriseItinerary from './pages/Reports/EnterpriseItinerary';
import EnterpriseRisk from './pages/Reports/EnterpriseRisk';

import ComplianceLayout from './pages/Compliance/ComplianceLayout';
import BudgetProcess from './pages/Compliance/BudgetProcess';
import RuleVersions from './pages/Compliance/RuleVersions';
import RuleScope from './pages/Compliance/RuleScope';
import PersonnelLimit from './pages/Compliance/PersonnelLimit';
import ItineraryCheck from './pages/Compliance/ItineraryCheck';
import ActivityCompliance from './pages/Compliance/ActivityCompliance';
import CompletenessCheck from './pages/Compliance/CompletenessCheck';
import Dictionary from './pages/Compliance/Dictionary';
import SecretIdentification from './pages/Compliance/SecretIdentification';

import CollaborationLayout from './pages/Collaboration/CollaborationLayout';
import FinanceSync from './pages/Collaboration/FinanceSync';
import VisaSync from './pages/Collaboration/VisaSync';
import GroupDiscussion from './pages/Collaboration/GroupDiscussion';

import UploadControlCenter from './pages/DataUpload/UploadControlCenter';
import TemplateValidation from './pages/DataUpload/TemplateValidation';
import ErrorRepair from './pages/DataUpload/ErrorRepair';
import ResumableUpload from './pages/DataUpload/ResumableUpload';

import SignatureLayout from './pages/Signature/SignatureLayout';
import ContractSignature from './pages/Signature/ContractSignature';
import ApprovalSignature from './pages/Signature/ApprovalSignature';
import PermissionManagement from './pages/Signature/PermissionManagement';
import AuditEvidence from './pages/Signature/AuditEvidence';

import SystemAdmin from './pages/Admin/SystemAdmin';
import HelpCenter from './pages/Help/HelpCenter';

const Sidebar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [evalOpen, setEvalOpen] = useState(false);
  const [declOpen, setDeclOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [collabOpen, setCollabOpen] = useState(false);
  const [matchingOpen, setMatchingOpen] = useState(false);
  const [commOpen, setCommOpen] = useState(false);
  const [inspOpen, setInspOpen] = useState(false);
  const [signatureOpen, setSignatureOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  
  const location = useLocation();
  
  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const NavItem = ({ to, icon: Icon, children, colorClass = "text-slate-400", exact = false }: any) => (
    <Link to={to} className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all group ${isActive(to, exact) ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-300'}`}>
      <Icon className={`w-5 h-5 ${isActive(to, exact) ? 'text-white' : colorClass}`} />
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );

  const SubItem = ({ to, children }: any) => (
    <Link to={to} className={`block py-1.5 pl-5 pr-2 text-[11px] font-medium transition-all border-l border-slate-700 hover:border-blue-400 ${isActive(to) ? 'text-blue-400 border-blue-500 font-bold bg-slate-800/30' : 'text-slate-400 hover:text-white'}`}>
      {children}
    </Link>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-5 pt-8 pb-3 flex items-center">
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{title}</p>
      <div className="flex-1 h-px bg-slate-800 ml-3"></div>
    </div>
  );

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-20 overflow-y-auto custom-scrollbar">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-2 sticky top-0 bg-slate-900 z-10">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white shadow-lg">OG</div>
        <span className="text-lg font-bold tracking-tight">出国监督管理系统</span>
      </div>

      <nav className="flex-1 px-2 pb-20 space-y-1 mt-4">
        <NavItem to="/dashboard" icon={ChartBarIcon} exact>概览看板</NavItem>

        <SectionHeader title="业务流控" />
        <div>
          <button onClick={() => setEvalOpen(!evalOpen)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors">
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-medium">出访评估</span>
            </div>
            {evalOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
          </button>
          {evalOpen && (
            <div className="pl-11 mt-1 space-y-1">
              <SubItem to="/eval-env">安全政治环境评估</SubItem>
              <SubItem to="/eval-culture">人文经济综合评估</SubItem>
              <SubItem to="/eval-inviter">邀请方综合评估</SubItem>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => setDeclOpen(!declOpen)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-300">
            <div className="flex items-center space-x-3">
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium">申报预审管理</span>
            </div>
            {declOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
          </button>
          {declOpen && (
            <div className="pl-11 mt-1 space-y-1">
              <SubItem to="/policy-interpretation">政策关联解读</SubItem>
              <SubItem to="/review-assistant">审核助手参考</SubItem>
              <SubItem to="/daily-update">任务变更填报</SubItem>
              <SubItem to="/appeal-review">申诉复核管理</SubItem>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => setReportOpen(!reportOpen)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-300">
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">归国报告管理</span>
            </div>
            {reportOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
          </button>
          {reportOpen && (
            <div className="pl-6 mt-1 space-y-3">
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase px-5 py-1">招商引资团组</p>
                <div className="pl-5 space-y-1">
                  <SubItem to="/reports/investment-assistant">报告辅助撰写</SubItem>
                  <SubItem to="/reports/enterprise-persona">意向企业画像</SubItem>
                  <SubItem to="/reports/itinerary-extraction">行程数据提取</SubItem>
                  <SubItem to="/reports/risk-warning">报告风险预警</SubItem>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase px-5 py-1">局级团组管理</p>
                <div className="pl-5 space-y-1">
                  <SubItem to="/reports/bureau-assistant">公文撰写助手</SubItem>
                  <SubItem to="/reports/bureau-decision">决策建议分级</SubItem>
                  <SubItem to="/reports/bureau-risk">局级风险预警</SubItem>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase px-5 py-1">企事业团组</p>
                <div className="pl-5 space-y-1">
                  <SubItem to="/reports/enterprise-assistant">心得感悟润色</SubItem>
                  <SubItem to="/reports/enterprise-itinerary">行程要素提取</SubItem>
                  <SubItem to="/reports/enterprise-risk">企事业风险预警</SubItem>
                </div>
              </div>
            </div>
          )}
        </div>

        <SectionHeader title="成果社区" />
        <NavItem to="/achievement-cockpit" icon={RocketLaunchIcon} colorClass="text-indigo-400">成果数据驾驶舱</NavItem>
        
        <div>
          <button onClick={() => setMatchingOpen(!matchingOpen)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-300">
            <div className="flex items-center space-x-3">
              <ArrowsRightLeftIcon className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-medium">成果撮合</span>
            </div>
            {matchingOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
          </button>
          {matchingOpen && (
            <div className="pl-11 mt-1 space-y-1">
              <SubItem to="/matching/application">申请入口管理</SubItem>
              <SubItem to="/matching/fit-assessment">契合度评估</SubItem>
              <SubItem to="/matching/approval">撮合审批流转</SubItem>
              <SubItem to="/matching/algorithm">算法配置管理</SubItem>
              <SubItem to="/matching/results">匹配结果管理</SubItem>
              <SubItem to="/matching/tracking">进度追踪看板</SubItem>
              <SubItem to="/matching/risk">风险辅助提示</SubItem>
              <SubItem to="/matching/data-collection">进度数据采集</SubItem>
              <SubItem to="/matching/process">可视化全路径</SubItem>
              <SubItem to="/matching/reports">报告自动生成</SubItem>
              <SubItem to="/matching/analysis">深度分析报告</SubItem>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => setCommOpen(!commOpen)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-300">
            <div className="flex items-center space-x-3">
              <AcademicCapIcon className="w-5 h-5 text-sky-400" />
              <span className="text-sm font-medium">成果社区模块</span>
            </div>
            {commOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
          </button>
          {commOpen && (
            <div className="pl-11 mt-1 space-y-1">
              <SubItem to="/community/classification">多维分类体系</SubItem>
              <SubItem to="/community/templates">发布格式管理</SubItem>
              <SubItem to="/community/publishing">内部平台发布</SubItem>
              <SubItem to="/community/recommendations">热点成果推荐</SubItem>
              <SubItem to="/community/discovery">多维语义检索</SubItem>
              <SubItem to="/community/point-rules">积分规则管理</SubItem>
              <SubItem to="/community/point-calculation">积分价值计算</SubItem>
            </div>
          )}
        </div>

        <SectionHeader title="监管审计" />
        <div>
          <button onClick={() => setInspOpen(!inspOpen)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-300">
            <div className="flex items-center space-x-3">
              <MagnifyingGlassCircleIcon className="w-5 h-5 text-rose-400" />
              <span className="text-sm font-medium">出站检查管理</span>
            </div>
            {inspOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
          </button>
          {inspOpen && (
            <div className="pl-11 mt-1 space-y-1">
              <SubItem to="/insp-stats">数据统计分析</SubItem>
              <SubItem to="/insp-tracking">流程实时跟踪</SubItem>
              <SubItem to="/insp-traceability">数据来源追溯</SubItem>
              <SubItem to="/insp-format">合规性自动校验</SubItem>
              <SubItem to="/insp-conflict">跨文档冲突检测</SubItem>
            </div>
          )}
        </div>
        <NavItem to="/compliance" icon={ScaleIcon} colorClass="text-blue-500">合规管理</NavItem>

        <SectionHeader title="系统配置" />
        <NavItem to="/admin/users" icon={UserPlusIcon} colorClass="text-teal-400">用户管理</NavItem>

        <div>
          <button onClick={() => setUploadOpen(!uploadOpen)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-300">
            <div className="flex items-center space-x-3">
              <ArrowUpTrayIcon className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">数据上传管理</span>
            </div>
            {uploadOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
          </button>
          {uploadOpen && (
            <div className="pl-11 mt-1 space-y-1">
              <SubItem to="/upload/control">上传控制中心</SubItem>
              <SubItem to="/upload/validation">模板智能校验</SubItem>
              <SubItem to="/upload/repair">错误数据修复</SubItem>
              <SubItem to="/upload/resumable">断点续传管理</SubItem>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => setCollabOpen(!collabOpen)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-300">
            <div className="flex items-center space-x-3">
              <UserGroupIcon className="w-5 h-5 text-slate-400 group-hover:text-purple-400" />
              <span className="text-sm font-medium">协同模块</span>
            </div>
            {collabOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
          </button>
          {collabOpen && (
            <div className="pl-11 mt-1 space-y-1">
              <SubItem to="/collaboration/finance">财政数据接入</SubItem>
              <SubItem to="/collaboration/visa">签证中心同步</SubItem>
              <SubItem to="/collaboration/discussion">任务群组讨论</SubItem>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => setSignatureOpen(!signatureOpen)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-300">
            <div className="flex items-center space-x-3">
              <FingerPrintIcon className="w-5 h-5 text-slate-400 group-hover:text-teal-400" />
              <span className="text-sm font-medium">电子签章管理</span>
            </div>
            {signatureOpen ? <ChevronDownIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
          </button>
          {signatureOpen && (
            <div className="pl-11 mt-1 space-y-1">
              <SubItem to="/signature/contract">合同电子签章</SubItem>
              <SubItem to="/signature/approval">审批电子签章</SubItem>
              <SubItem to="/signature/permissions">签章权限分级</SubItem>
              <SubItem to="/signature/evidence">签章过程存证</SubItem>
            </div>
          )}
        </div>

        <NavItem to="/admin/api" icon={CodeBracketSquareIcon} colorClass="text-indigo-400">API 平台</NavItem>
        <NavItem to="/admin/system" icon={Cog6ToothIcon}>平台管理</NavItem>
        <NavItem to="/help" icon={QuestionMarkCircleIcon}>帮助中心</NavItem>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all hover:bg-red-500/10 text-slate-400 hover:text-red-400 mt-8"
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
          <span className="text-sm font-medium">退出登录</span>
        </button>
      </nav>

      {/* 侧边栏页脚 */}
      <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-900 sticky bottom-0">
        <div className="flex items-center space-x-3 bg-slate-800 p-3 rounded-xl border border-white/5">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-sm shadow-inner">管</div>
          <div className="overflow-hidden">
            <p className="text-xs font-black text-white truncate">超级管理员</p>
            <p className="text-[10px] text-slate-400 uppercase truncate">OGMS.ADMIN.NODE_04</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ogms_auth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('ogms_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ogms_auth');
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar onLogout={handleLogout} />
          <div className="flex-1 min-w-0 ml-64">
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
               <div className="flex items-center space-x-4">
                 <h2 className="text-lg font-black text-gray-800 tracking-tight">OGMS 出国监督管理综合平台</h2>
                 <div className="flex items-center space-x-2 text-[10px] font-bold">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">政务内网版</span>
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100 flex items-center">
                      <CheckBadgeIcon className="w-3.5 h-3.5 mr-1" />
                      CA 已激活
                    </span>
                 </div>
               </div>
               <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-[9px] text-gray-400 font-black uppercase">系统运行</p>
                    <p className="text-[11px] text-emerald-500 font-black flex items-center justify-end">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                      正常运行中
                    </p>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-gray-500">当前积分:</span>
                    <span className="text-sm font-black text-blue-600">1,280.00</span>
                  </div>
               </div>
            </header>
            <main className="p-8">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/achievement-cockpit" element={<AchievementDataCockpit />} />
                
                {/* 管理类路由拆分 */}
                <Route path="/admin">
                   <Route path="users" element={<UserManagement />} />
                   <Route path="api" element={<ApiPlatform />} />
                   <Route path="system" element={<SystemAdmin />} />
                   <Route index element={<Navigate to="system" replace />} />
                </Route>

                <Route path="/signature" element={<SignatureLayout />}>
                  <Route index element={<Navigate to="contract" replace />} />
                  <Route path="contract" element={<ContractSignature />} />
                  <Route path="approval" element={<ApprovalSignature />} />
                  <Route path="permissions" element={<PermissionManagement />} />
                  <Route path="evidence" element={<AuditEvidence />} />
                </Route>

                <Route path="/upload">
                  <Route index element={<Navigate to="control" replace />} />
                  <Route path="control" element={<UploadControlCenter />} />
                  <Route path="validation" element={<TemplateValidation />} />
                  <Route path="repair" element={<ErrorRepair />} />
                  <Route path="resumable" element={<ResumableUpload />} />
                </Route>

                <Route path="/eval-env" element={<EvaluationEnv />} />
                <Route path="/eval-culture" element={<CultureEconomic />} />
                <Route path="/eval-inviter" element={<InviterAssessment />} />
                
                <Route path="/policy-interpretation" element={<PolicyInterpretation />} />
                <Route path="/review-assistant" element={<ReviewAssistant />} />
                <Route path="/daily-update" element={<DailyUpdate />} />
                <Route path="/appeal-review" element={<AppealReview />} />
                
                <Route path="/community/classification" element={<AchievementClassification />} />
                <Route path="/community/templates" element={<AchievementTemplates />} />
                <Route path="/community/publishing" element={<AchievementPublishing />} />
                <Route path="/community/recommendations" element={<AchievementRecommendations />} />
                <Route path="/community/discovery" element={<AchievementDiscovery />} />
                <Route path="/community/point-rules" element={<AchievementPointRules />} />
                <Route path="/community/point-calculation" element={<AchievementPointCalculation />} />

                <Route path="/matching/application" element={<MatchingApplicationEntry />} />
                <Route path="/matching/fit-assessment" element={<MatchingFitAssessment />} />
                <Route path="/matching/approval" element={<MatchingApproval />} />
                <Route path="/matching/algorithm" element={<MatchingAlgorithm />} />
                <Route path="/matching/results" element={<MatchingResults />} />
                <Route path="/matching/tracking" element={<MatchingProgressTracking />} />
                <Route path="/matching/risk" element={<MatchingRiskPrompt />} />
                <Route path="/matching/data-collection" element={<MatchingDataCollection />} />
                <Route path="/matching/process" element={<MatchingProcessManagement />} />
                <Route path="/matching/reports" element={<MatchingReportGeneration />} />
                <Route path="/matching/analysis" element={<MatchingDepthAnalysis />} />

                <Route path="/insp-stats" element={<InspectionStats />} />
                <Route path="/insp-tracking" element={<InspectionTracking />} />
                <Route path="/insp-traceability" element={<InspectionTraceability />} />
                <Route path="/insp-format" element={<InspectionFormat />} />
                <Route path="/insp-conflict" element={<InspectionConflict />} />

                <Route path="/reports/investment-assistant" element={<InvestmentAssistant />} />
                <Route path="/reports/enterprise-persona" element={<EnterprisePersona />} />
                <Route path="/reports/itinerary-extraction" element={<ItineraryExtraction />} />
                <Route path="/reports/risk-warning" element={<RiskWarning />} />
                <Route path="/reports/bureau-assistant" element={<BureauAssistant />} />
                <Route path="/reports/bureau-decision" element={<BureauDecision />} />
                <Route path="/reports/bureau-risk" element={<BureauRisk />} />
                <Route path="/reports/enterprise-assistant" element={<EnterpriseAssistant />} />
                <Route path="/reports/enterprise-itinerary" element={<EnterpriseItinerary />} />
                <Route path="/reports/enterprise-risk" element={<EnterpriseRisk />} />

                <Route path="/compliance" element={<ComplianceLayout />}>
                  <Route index element={<Navigate to="budget" replace />} />
                  <Route path="budget" element={<BudgetProcess />} />
                  <Route path="versions" element={<RuleVersions />} />
                  <Route path="scope" element={<RuleScope />} />
                  <Route path="personnel" element={<PersonnelLimit />} />
                  <Route path="itinerary" element={<ItineraryCheck />} />
                  <Route path="activity" element={<ActivityCompliance />} />
                  <Route path="completeness" element={<CompletenessCheck />} />
                  <Route path="dictionary" element={<Dictionary />} />
                  <Route path="secret" element={<SecretIdentification />} />
                </Route>

                <Route path="/collaboration" element={<CollaborationLayout />}>
                  <Route index element={<Navigate to="finance" replace />} />
                  <Route path="finance" element={<FinanceSync />} />
                  <Route path="visa" element={<VisaSync />} />
                  <Route path="discussion" element={<GroupDiscussion />} />
                </Route>

                <Route path="/help" element={<HelpCenter />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </Router>
  );
};

export default App;
