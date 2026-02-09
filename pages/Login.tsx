
import React, { useState } from 'react';
import { 
  LockClosedIcon, 
  UserIcon, 
  ShieldCheckIcon, 
  KeyIcon, 
  GlobeAltIcon, 
  FingerPrintIcon,
  // Added missing ChevronRightIcon import
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [method, setMethod] = useState<'password' | 'oauth'>('password');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl overflow-hidden border border-white/20">
          <div className="p-10 text-center border-b border-gray-100">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
               <span className="text-2xl font-black text-white">OG</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">出国监督管理系统</h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">OGMS 综合业务门户 v4.2.0</p>
          </div>

          <div className="p-8">
            {/* 登录方式切换 */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
               <button 
                 onClick={() => setMethod('password')}
                 className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${method === 'password' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
               >
                 账号密码登录
               </button>
               <button 
                 onClick={() => setMethod('oauth')}
                 className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${method === 'oauth' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
               >
                 OAuth 统一认证
               </button>
            </div>

            {method === 'password' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username / ID</label>
                  <div className="relative">
                    <UserIcon className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                    <input 
                      type="text" 
                      placeholder="请输入用户名/警号" 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 font-medium"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                    <input 
                      type="password" 
                      placeholder="请输入登录密码" 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 font-medium"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                   <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600 border-gray-300 w-4 h-4" />
                      <span className="text-xs text-gray-400 font-bold">记住我</span>
                   </label>
                   <button type="button" className="text-xs text-blue-600 font-bold hover:underline">忘记密码?</button>
                </div>
                <button 
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>进入系统</span>
                      <ShieldCheckIcon className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <button 
                  onClick={handleSubmit}
                  className="w-full py-4 px-6 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4">
                     <div className="p-2 bg-white/10 rounded-lg group-hover:bg-blue-600 transition-colors">
                        <GlobeAltIcon className="w-5 h-5" />
                     </div>
                     <div className="text-left">
                        <p className="text-xs">政务服务网</p>
                        <p className="text-[10px] text-slate-400">统一单点登录认证 (SSO)</p>
                     </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-white" />
                </button>
                
                <button 
                  onClick={handleSubmit}
                  className="w-full py-4 px-6 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4">
                     <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <FingerPrintIcon className="w-5 h-5" />
                     </div>
                     <div className="text-left">
                        <p className="text-xs">移动政务终端</p>
                        <p className="text-[10px] text-gray-400">扫描二维码授权登录</p>
                     </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-600" />
                </button>

                <div className="pt-6 text-center">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">或者使用内部域账号</p>
                   <button onClick={() => setMethod('password')} className="text-xs font-bold text-blue-600 hover:underline">返回账号登录</button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center text-slate-500">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">Technical Support</p>
           <p className="text-[10px] font-medium">大数据中心网络安全处 联调测试环境</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
