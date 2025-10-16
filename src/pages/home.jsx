// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Building, Calculator, Gavel, ChevronRight } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('home');

  // 考试类别数据（紧凑版）
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
      {/* 品牌区域 - 减小高度 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-90"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1">广昊建工</h1>
            <p className="text-blue-100 text-sm">专业建工考试题库</p>
          </div>
        </div>
        {/* 简化波浪 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-6 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* 考试类别 - 减小间距和尺寸 */}
      <div className="max-w-4xl mx-auto px-3 py-4">
        <div className="grid grid-cols-2 gap-3">
          {examCategories.map((category, index) => {
          const Icon = category.icon;
          return <div key={category.id} onClick={() => handleCategoryClick(category)} className={`relative overflow-hidden rounded-xl border ${category.borderColor} ${category.gradient} p-3 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group`} style={{
            animationDelay: `${index * 50}ms`
          }}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 leading-tight">{category.name}</h3>
                  <ChevronRight size={14} className="mt-1 text-gray-500 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>;
        })}
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}