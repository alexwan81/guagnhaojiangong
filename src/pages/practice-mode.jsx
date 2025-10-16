// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, Brain, Calendar, Target, BarChart } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
import { PracticeModeCard } from '@/components/PracticeModeCard';
export default function PracticeModePage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [examInfo, setExamInfo] = useState({
    categoryName: '',
    majorName: ''
  });
  const [practiceModes, setPracticeModes] = useState([]);
  useEffect(() => {
    // 从页面参数获取考试和专业信息
    const categoryName = $w.page.dataset.params?.categoryName;
    const majorName = $w.page.dataset.params?.majorName;
    if (categoryName && majorName) {
      setExamInfo({
        categoryName,
        majorName
      });
    } else {
      // 如果没有参数，设置默认值
      setExamInfo({
        categoryName: '一级建造师',
        majorName: '建筑工程'
      });
    }
    loadPracticeModes();
  }, [$w.page.dataset.params]);
  const loadPracticeModes = () => {
    const modes = [{
      id: 'chapter-practice',
      icon: BookOpen,
      title: '章节练习',
      description: '按知识点章节进行系统学习',
      features: ['按章节顺序练习', '知识点全覆盖', '进度实时跟踪', '错题自动收录'],
      isRecommended: false
    }, {
      id: 'special-practice',
      icon: Brain,
      title: '专项练习',
      description: 'AI智能错题强化训练',
      features: ['AI智能错题分析', '个性化推荐练习', '薄弱知识点强化', '学习效果可视化'],
      isRecommended: true
    }, {
      id: 'past-papers',
      icon: Calendar,
      title: '历年真题',
      description: '真实考试真题模拟练习',
      features: ['历年考试真题', '真实考试环境模拟', '得分排名统计', '考试趋势分析'],
      isRecommended: false
    }];
    setPracticeModes(modes);
  };
  const handleModePress = modeId => {
    const mode = practiceModes.find(m => m.id === modeId);
    if (modeId === 'chapter-practice') {
      $w.utils.navigateTo({
        pageId: 'chapter-practice',
        params: {
          categoryName: examInfo.categoryName,
          majorName: examInfo.majorName,
          modeId: modeId,
          modeName: mode?.title
        }
      });
    } else {
      toast({
        title: '模式选择',
        description: `即将进入${mode?.title}模式`
      });
    }
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const handleTabChange = tabId => {
    if (tabId === 'home') {
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    } else if (tabId === 'profile') {
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
      {/* 头部导航 */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-3 p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {examInfo.majorName}
            </h1>
            <p className="text-sm text-gray-600">{examInfo.categoryName} · 练习模式</p>
          </div>
        </div>
      </div>
      
      {/* 模式选择说明 */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">选择适合您的练习模式</h2>
              <p className="text-blue-100 text-sm">根据学习阶段和目标选择最佳练习方式</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Target size={24} />
            </div>
          </div>
        </div>
        
        {/* 练习模式列表 */}
        <div className="space-y-4">
          {practiceModes.map(mode => <PracticeModeCard key={mode.id} icon={mode.icon} title={mode.title} description={mode.description} features={mode.features} isRecommended={mode.isRecommended} onPress={() => handleModePress(mode.id)} />)}
        </div>
        
        {/* 学习建议 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <BarChart size={16} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">学习建议</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• 初学者建议从<strong>章节练习</strong>开始，系统学习知识点</p>
                <p>• 有一定基础后使用<strong>专项练习</strong>强化薄弱环节</p>
                <p>• 考前冲刺阶段多做<strong>历年真题</strong>，熟悉考试形式</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}