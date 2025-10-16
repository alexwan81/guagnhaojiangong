// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { User, Settings, LogOut, Award, BookOpen, BarChart3 } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function ProfilePage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const handleTabChange = tabId => {
    if (tabId === 'home') {
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    } else if (tabId === 'feedback') {
      $w.utils.navigateTo({
        pageId: 'feedback',
        params: {}
      });
    }
    setActiveTab(tabId);
  };
  const user = $w.auth.currentUser;
  return <div className="min-h-screen bg-gray-50 pb-20">
      {/* 用户信息卡片 */}
      <div className="bg-white px-6 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={32} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.name || '未登录用户'}
            </h2>
            <p className="text-gray-600 text-sm">
              {user?.nickName || '请完善个人信息'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600">收藏</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">错题</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-600">笔记</p>
          </div>
        </div>
      </div>

      {/* 功能列表 */}
      <div className="px-6 mt-6 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">学习数据</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen size={16} className="text-blue-600" />
                </div>
                <span className="text-gray-700">总学习题数</span>
              </div>
              <span className="text-gray-800 font-medium">0</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award size={16} className="text-green-600" />
                </div>
                <span className="text-gray-700">正确率</span>
              </div>
              <span className="text-gray-800 font-medium">0%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <BarChart3 size={16} className="text-purple-600" />
                </div>
                <span className="text-gray-700">学习时长</span>
              </div>
              <span className="text-gray-800 font-medium">0分钟</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">账户设置</h3>
          <div className="space-y-3">
            <button className="flex items-center justify-between w-full py-3">
              <div className="flex items-center space-x-3">
                <Settings size={20} className="text-gray-600" />
                <span className="text-gray-700">账户设置</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <button className="flex items-center justify-between w-full py-3">
              <div className="flex items-center space-x-3">
                <LogOut size={20} className="text-red-600" />
                <span className="text-gray-700">退出登录</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}