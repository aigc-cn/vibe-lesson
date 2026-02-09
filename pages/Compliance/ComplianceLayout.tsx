
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  CurrencyYenIcon, 
  ClockIcon, 
  GlobeAltIcon, 
  UsersIcon, 
  CalendarDaysIcon, 
  SparklesIcon, 
  CheckBadgeIcon, 
  BookOpenIcon, 
  ShieldExclamationIcon 
} from '@heroicons/react/24/outline';

const ComplianceLayout: React.FC = () => {
  const menuItems = [
    { name: '预算审批流程', path: 'budget', icon: <CurrencyYenIcon className="w-5 h-5" /> },
    { name: '规则版本迭代记录', path: 'versions', icon: <ClockIcon className="w-5 h-5" /> },
    { name: '规则适用范围设置', path: 'scope', icon: <GlobeAltIcon className="w-5 h-5" /> },
    { name: '人数上限动态调整', path: 'personnel', icon: <UsersIcon className="w-5 h-5" /> },
    { name: '行程天数合规校验', path: 'itinerary', icon: <CalendarDaysIcon className="w-5 h-5" /> },
    { name: '境外活动合规', path: 'activity', icon: <SparklesIcon className="w-5 h-5" /> },
    { name: '内容完整性检查项', path: 'completeness', icon: <CheckBadgeIcon className="w-5 h-5" /> },
    { name: '表述规范性字典', path: 'dictionary', icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: '涉密内容自动识别', path: 'secret', icon: <ShieldExclamationIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex gap-8 animate-in fade-in duration-500">
      {/* 子导航侧边栏 */}
      <aside className="w-64 flex-shrink-0">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sticky top-24">
          <h3 className="px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">合规子功能</h3>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* 内容区域 */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default ComplianceLayout;
