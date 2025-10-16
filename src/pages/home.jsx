// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Building, Road, Wrench, Droplets, Calculator, Gavel, ChevronRight } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('home');

  // 考试类别数据（简化版）
  const examCategories = [{
    id: 'first-grade-constructor',
    name: '一级建造师',
    icon: Building,
    color: 'from-blue-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
    borderColor: 'border-blue-200'
  }, {
    id: 'second-grade-constructor',
    name: '二级建造师',
    icon: Building,
    color: 'from-green-500 to-green-600',
    gradient: 'bg-gradient-to-br from-green-50 to-green-100',
    borderColor: 'border-green-200'
  }, {
    id: 'cost-engineer',
    name: '造价工程师',
    icon: Calculator,
    color: 'from-orange-500 to-orange-600',
    gradient: 'bg-gradient-to-br from-orange-50 to-orange-100',
    borderColor: 'border-orange-200'
  }, {
    id: 'supervising-engineer',
    name: '注册监理工程师',
    icon: Gavel,
    color: 'from-purple-500 to-purple-600',
    gradient: 'bg-gradient-to-br from-purple-50 to-purple-100',
    borderColor: 'border-purple-200'
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
  return <div style={style} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-20">
      {/* 品牌区域 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-90"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-3">广昊建工</h1>
            <p className="text-blue-100 text-lg">专业建工考试题库</p>
          </div>
        </div>
        {/* 装饰性波浪 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* 考试类别 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">选择考试类别</h2>
          <p className="text-gray-600">开始您的学习之旅</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examCategories.map((category, index) => {
          const Icon = category.icon;
          return <div key={category.id} onClick={() => handleCategoryClick(category)} className={`relative overflow-hidden rounded-2xl border-2 ${category.borderColor} ${category.gradient} p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 group`} style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>开始学习</span>
                    <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}