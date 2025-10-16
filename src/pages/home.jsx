// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { BookOpen, Target, TrendingUp, Users, Award, Clock, Star, ChevronRight, Building, Calculator, Gavel, Settings } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [userStats, setUserStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    studyDays: 0,
    streakDays: 0
  });
  const [recentExams, setRecentExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // 考试类别数据
  const examCategories = [{
    id: 'first-grade-constructor',
    name: '一级建造师',
    icon: Building,
    color: 'bg-blue-500',
    description: '执业资格考试',
    totalQuestions: 1245,
    subjects: ['建筑工程', '市政公用工程', '机电工程', '公路工程', '水利水电工程']
  }, {
    id: 'second-grade-constructor',
    name: '二级建造师',
    icon: Building,
    color: 'bg-green-500',
    description: '执业资格考试',
    totalQuestions: 980,
    subjects: ['建筑工程', '市政公用工程', '机电工程', '公路工程']
  }, {
    id: 'cost-engineer',
    name: '造价工程师',
    icon: Calculator,
    color: 'bg-orange-500',
    description: '执业资格考试',
    totalQuestions: 890,
    subjects: ['土木建筑工程', '安装工程', '交通运输工程', '水利工程']
  }, {
    id: 'supervising-engineer',
    name: '注册监理工程师',
    icon: Gavel,
    color: 'bg-purple-500',
    description: '执业资格考试',
    totalQuestions: 765,
    subjects: ['土木建筑工程', '交通运输工程', '水利工程']
  }];

  // 热门功能
  const popularFeatures = [{
    id: 'daily-practice',
    name: '每日一练',
    icon: Target,
    color: 'bg-blue-500',
    description: '每天10道题，坚持学习'
  }, {
    id: 'mock-exam',
    name: '模拟考试',
    icon: Clock,
    color: 'bg-green-500',
    description: '真实考试环境模拟'
  }, {
    id: 'wrong-questions',
    name: '错题本',
    icon: Star,
    color: 'bg-orange-500',
    description: '重点复习错题'
  }, {
    id: 'favorites',
    name: '收藏夹',
    icon: Star,
    color: 'bg-purple-500',
    description: '收藏重要题目'
  }];

  // 获取用户统计数据
  const fetchUserStats = async () => {
    try {
      setLoading(true);
      // 模拟获取用户数据
      setUserStats({
        totalQuestions: 1250,
        correctAnswers: 987,
        studyDays: 45,
        streakDays: 7
      });

      // 模拟最近考试记录
      setRecentExams([{
        id: 1,
        name: '一级建造师-建筑工程',
        date: '2025-01-15',
        score: 85,
        total: 100
      }, {
        id: 2,
        name: '二级建造师-市政工程',
        date: '2025-01-10',
        score: 78,
        total: 100
      }, {
        id: 3,
        name: '造价工程师-计价',
        date: '2025-01-05',
        score: 92,
        total: 100
      }]);
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取用户统计数据',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // 处理考试类别点击
  const handleCategoryClick = category => {
    $w.utils.navigateTo({
      pageId: 'subject-selection',
      params: {
        category: category.id,
        categoryName: category.name
      }
    });
  };

  // 处理功能点击
  const handleFeatureClick = feature => {
    switch (feature.id) {
      case 'daily-practice':
        $w.utils.navigateTo({
          pageId: 'daily-practice',
          params: {}
        });
        break;
      case 'mock-exam':
        $w.utils.navigateTo({
          pageId: 'mock-exam',
          params: {}
        });
        break;
      case 'wrong-questions':
        $w.utils.navigateTo({
          pageId: 'wrong-questions',
          params: {}
        });
        break;
      case 'favorites':
        $w.utils.navigateTo({
          pageId: 'favorites',
          params: {}
        });
        break;
      default:
        toast({
          title: '功能开发中',
          description: '该功能正在开发中，敬请期待',
          className: 'bg-blue-500 text-white'
        });
    }
  };

  // 计算正确率
  const calculateAccuracy = () => {
    if (userStats.totalQuestions === 0) return 0;
    return Math.round(userStats.correctAnswers / userStats.totalQuestions * 100);
  };

  // 返回上一页
  const handleBack = () => {
    $w.utils.navigateBack();
  };

  // 处理底部导航切换
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    if (tabId !== 'home') {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };
  useEffect(() => {
    fetchUserStats();
  }, []);
  if (loading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">广昊建工</h1>
            <p className="text-gray-600">专业建工考试题库，助您轻松取证</p>
          </div>
        </div>
      </div>

      {/* 用户统计卡片 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">学习统计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.totalQuestions}</div>
              <p className="text-sm text-gray-600">总做题数</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{calculateAccuracy()}%</div>
              <p className="text-sm text-gray-600">正确率</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{userStats.studyDays}</div>
              <p className="text-sm text-gray-600">连续学习</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userStats.streakDays}</div>
              <p className="text-sm text-gray-600">学习天数</p>
            </div>
          </div>
        </div>
      </div>

      {/* 考试类别 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">选择考试类别</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examCategories.map(category => {
          const Icon = category.icon;
          return <div key={category.id} onClick={() => handleCategoryClick(category)} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{category.totalQuestions}道题</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>;
        })}
        </div>
      </div>

      {/* 热门功能 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">热门功能</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularFeatures.map(feature => {
          const Icon = feature.icon;
          return <div key={feature.id} onClick={() => handleFeatureClick(feature)} className="bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-3 mx-auto`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 text-center">{feature.name}</h3>
                <p className="text-xs text-gray-600 text-center mt-1">{feature.description}</p>
              </div>;
        })}
        </div>
      </div>

      {/* 最近考试记录 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">最近考试记录</h2>
        <div className="bg-white rounded-xl shadow-lg">
          {recentExams.map((exam, index) => <div key={exam.id} className={`p-4 ${index !== recentExams.length - 1 ? 'border-b' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{exam.name}</h3>
                  <p className="text-sm text-gray-600">{exam.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{exam.score}</div>
                  <p className="text-sm text-gray-500">/ {exam.total}</p>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}