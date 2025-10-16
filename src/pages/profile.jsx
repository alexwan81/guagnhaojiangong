// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Settings, HelpCircle, Info, LogOut, Award, Clock, CheckCircle, User, Star } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function Profile(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: '',
    avatarUrl: '',
    studyStats: {
      totalQuestions: 0,
      completedQuestions: 0,
      correctRate: 0,
      studyTime: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // 模拟获取用户数据
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      // 使用当前登录用户信息
      const currentUser = $w.auth.currentUser;
      const userName = currentUser?.nickName || currentUser?.name || '用户';
      const userAvatar = currentUser?.avatarUrl || '';

      // 模拟学习统计数据（实际项目中应该从数据库获取）
      const mockStats = {
        totalQuestions: 1250,
        completedQuestions: 856,
        correctRate: 78,
        studyTime: 36 // 小时
      };
      setUserData({
        name: userName,
        avatarUrl: userAvatar,
        studyStats: mockStats
      });
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取用户数据',
        variant: 'destructive'
      });
      // 使用默认数据
      setUserData({
        name: '用户',
        avatarUrl: '',
        studyStats: {
          totalQuestions: 0,
          completedQuestions: 0,
          correctRate: 0,
          studyTime: 0
        }
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleLogout = () => {
    toast({
      title: '退出登录',
      description: '您已成功退出登录'
    });
    // 实际项目中这里应该调用退出登录的API
    // 暂时跳转到首页
    $w.utils.redirectTo({
      pageId: 'home',
      params: {}
    });
  };
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    if (tabId !== 'profile') {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };
  const handleFunctionClick = functionName => {
    toast({
      title: '功能跳转',
      description: `即将进入${functionName}页面`
    });
    // 这里可以添加具体功能的跳转逻辑
  };
  if (isLoading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            个人中心
          </h1>
        </div>
      </div>

      {/* 用户信息 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              {userData.avatarUrl ? <img src={userData.avatarUrl} alt={userData.name} className="w-16 h-16 rounded-full" /> : <User size={32} className="text-blue-600" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
              <p className="text-gray-600">建工考试学习者</p>
            </div>
          </div>
        </div>

        {/* 学习统计 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">学习统计</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CheckCircle size={20} className="text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">已完成</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{userData.studyStats.completedQuestions}</div>
              <div className="text-xs text-gray-500">总题数: {userData.studyStats.totalQuestions}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Award size={20} className="text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">正确率</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{userData.studyStats.correctRate}%</div>
              <div className="text-xs text-gray-500">答题准确率</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Clock size={20} className="text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">学习时长</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{userData.studyStats.studyTime}h</div>
              <div className="text-xs text-gray-500">累计学习</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Star size={20} className="text-orange-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">学习等级</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">Lv.2</div>
              <div className="text-xs text-gray-500">继续加油！</div>
            </div>
          </div>
        </div>

        {/* 功能导航 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">功能设置</h3>
          <div className="space-y-3">
            <div onClick={() => handleFunctionClick('设置')} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
              <Settings size={20} className="text-gray-600 mr-3" />
              <span className="text-gray-700">应用设置</span>
            </div>
            <div onClick={() => handleFunctionClick('帮助')} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
              <HelpCircle size={20} className="text-gray-600 mr-3" />
              <span className="text-gray-700">帮助中心</span>
            </div>
            <div onClick={() => handleFunctionClick('关于')} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
              <Info size={20} className="text-gray-600 mr-3" />
              <span className="text-gray-700">关于我们</span>
            </div>
          </div>
        </div>

        {/* 退出登录 */}
        <div className="mt-6">
          <button onClick={handleLogout} className="w-full bg-red-50 text-red-600 px-6 py-3 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center">
            <LogOut size={18} className="mr-2" />
            退出登录
          </button>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}