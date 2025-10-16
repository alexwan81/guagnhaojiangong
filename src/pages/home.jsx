// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Building, Construction, DollarSign, Eye, BookOpen, Award, BarChart3, Users } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
import { ExamCategoryCard } from '@/components/ExamCategoryCard';
export default function HomePage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const examCategories = [{
    id: 'first-class-builder',
    icon: Building,
    title: '一级建造师',
    description: '国家级执业资格考试，涵盖建筑工程管理'
  }, {
    id: 'second-class-builder',
    icon: Construction,
    title: '二级建造师',
    description: '省级执业资格考试，工程项目管理'
  }, {
    id: 'cost-engineer',
    icon: DollarSign,
    title: '造价工程师',
    description: '工程造价管理与咨询专业资格'
  }, {
    id: 'supervising-engineer',
    icon: Eye,
    title: '注册监理工程师',
    description: '工程监理专业技术资格认证'
  }];
  const handleCategoryPress = categoryId => {
    const category = examCategories.find(cat => cat.id === categoryId);
    $w.utils.navigateTo({
      pageId: 'major-selection',
      params: {
        categoryId: categoryId,
        categoryName: category?.title
      }
    });
  };
  const handleTabChange = tabId => {
    if (tabId === 'profile') {
      $w.utils.navigateTo({
        pageId: 'profile',
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
  return <div className="min-h-screen bg-gray-50 pb-20">
      {/* 头部 */}
      <div className="bg-blue-600 text-white px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">建工考试题库</h1>
            <p className="text-blue-100 mt-1">专业备考，助您成功</p>
          </div>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <BookOpen size={24} />
          </div>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">今日学习</p>
              <p className="text-xl font-semibold">0/30 题</p>
            </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
              开始学习
            </button>
          </div>
        </div>
      </div>

      {/* 考试类别网格 */}
      <div className="px-6 -mt-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">考试类别</h2>
          <div className="grid grid-cols-2 gap-4">
            {examCategories.map(category => <ExamCategoryCard key={category.id} icon={category.icon} title={category.title} description={category.description} onPress={() => handleCategoryPress(category.id)} />)}
          </div>
        </div>
      </div>

      {/* 学习数据统计 */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">学习统计</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award size={24} className="text-green-600" />
              </div>
              <p className="text-sm text-gray-600">已通过</p>
              <p className="text-lg font-semibold text-gray-800">0</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BarChart3 size={24} className="text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">正确率</p>
              <p className="text-lg font-semibold text-gray-800">0%</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users size={24} className="text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">排名</p>
              <p className="text-lg font-semibold text-gray-800">-</p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}