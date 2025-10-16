// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Building, ClipboardList, Calculator, HardHat } from 'lucide-react';

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
  const examCategories = [{
    id: 'first-grade-constructor',
    name: '一级建造师',
    icon: Building,
    color: 'bg-blue-500',
    description: '国家级执业资格考试'
  }, {
    id: 'second-grade-constructor',
    name: '二级建造师',
    icon: ClipboardList,
    color: 'bg-green-500',
    description: '省级执业资格考试'
  }, {
    id: 'cost-engineer',
    name: '造价工程师',
    icon: Calculator,
    color: 'bg-purple-500',
    description: '工程造价专业资格'
  }, {
    id: 'supervising-engineer',
    name: '注册监理工程师',
    icon: HardHat,
    color: 'bg-orange-500',
    description: '工程监理执业资格'
  }];
  const handleExamCategoryClick = category => {
    toast({
      title: '即将跳转',
      description: `正在进入${category.name}题库页面`
    });

    // 实际项目中这里应该跳转到对应的题库页面
    $w.utils.navigateTo({
      pageId: 'exam-list',
      params: {
        category: category.id
      }
    });
  };
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    if (tabId !== 'home') {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            建工考试题库
          </h1>
          <p className="text-gray-600 text-center mt-1">
            专业建筑行业资格考试学习平台
          </p>
        </div>
      </div>

      {/* 考试类别网格 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          选择考试类别
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {examCategories.map(category => {
          const Icon = category.icon;
          return <div key={category.id} onClick={() => handleExamCategoryClick(category)} className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {category.description}
                  </p>
                </div>
              </div>;
        })}
        </div>

        {/* 统计信息 */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            学习统计
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">5000+</div>
              <div className="text-sm text-gray-600">题库总量</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">10000+</div>
              <div className="text-sm text-gray-600">注册用户</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">通过率</div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}