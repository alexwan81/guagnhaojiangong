// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Building, Road, Wrench, Droplets, Calculator, Gavel, ChevronRight } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);

  // 考试类别数据
  const examCategories = [{
    id: 'first-grade-constructor',
    name: '一级建造师',
    icon: Building,
    color: 'bg-blue-500',
    description: '执业资格考试',
    totalQuestions: 1245
  }, {
    id: 'second-grade-constructor',
    name: '二级建造师',
    icon: Building,
    color: 'bg-green-500',
    description: '执业资格考试',
    totalQuestions: 980
  }, {
    id: 'cost-engineer',
    name: '造价工程师',
    icon: Calculator,
    color: 'bg-orange-500',
    description: '执业资格考试',
    totalQuestions: 890
  }, {
    id: 'supervising-engineer',
    name: '注册监理工程师',
    icon: Gavel,
    color: 'bg-purple-500',
    description: '执业资格考试',
    totalQuestions: 765
  }];

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
    setLoading(false);
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

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}