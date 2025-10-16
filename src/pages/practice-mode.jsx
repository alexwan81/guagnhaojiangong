// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, Brain, Award, Sparkles } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function PracticeMode(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [examCategory, setExamCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [subjectName, setSubjectName] = useState('');

  // 练习模式数据
  const practiceModes = [{
    id: 'chapter-practice',
    name: '章节练习',
    icon: BookOpen,
    color: 'bg-blue-500',
    description: '按章节系统学习，巩固知识点',
    features: ['按章节划分', '循序渐进', '知识点全覆盖'],
    tag: '系统学习'
  }, {
    id: 'special-practice',
    name: '专项练习',
    icon: Brain,
    color: 'bg-purple-500',
    description: 'AI智能分析错题，强化薄弱环节',
    features: ['AI错题分析', '智能推荐', '针对性训练'],
    tag: 'AI强化'
  }, {
    id: 'past-papers',
    name: '历年真题',
    icon: Award,
    color: 'bg-orange-500',
    description: '历年考试真题模拟，熟悉考试形式',
    features: ['真实考题', '考试模拟', '历年汇总'],
    tag: '真题模拟'
  }];

  // 获取专业名称
  const getSubjectName = (category, subjectId) => {
    const subjectData = {
      'first-grade-constructor': {
        'architecture': '建筑工程',
        'municipal': '市政公用工程',
        'mechanical-electrical': '机电工程',
        'highway': '公路工程',
        'water-conservancy': '水利水电工程',
        'public-course': '公共课'
      },
      'second-grade-constructor': {
        'architecture-2': '建筑工程',
        'municipal-2': '市政公用工程',
        'mechanical-electrical-2': '机电工程'
      },
      'cost-engineer': {
        'cost-installation': '安装工程',
        'cost-construction': '建筑工程'
      },
      'supervising-engineer': {
        'supervising-civil': '土木建筑工程',
        'supervising-transport': '交通运输工程'
      }
    };
    return subjectData[category]?.[subjectId] || '未知专业';
  };

  // 获取考试类别名称
  const getCategoryName = category => {
    const categoryNames = {
      'first-grade-constructor': '一级建造师',
      'second-grade-constructor': '二级建造师',
      'cost-engineer': '造价工程师',
      'supervising-engineer': '注册监理工程师'
    };
    return categoryNames[category] || '未知类别';
  };
  useEffect(() => {
    // 从页面参数获取考试类别和专业
    const category = $w.page.dataset.params?.category;
    const subjectId = $w.page.dataset.params?.subject;
    if (category && subjectId) {
      setExamCategory(category);
      setSubject(subjectId);
      setSubjectName(getSubjectName(category, subjectId));
    } else {
      toast({
        title: '参数错误',
        description: '未找到考试类别或专业参数',
        variant: 'destructive'
      });
      $w.utils.navigateBack();
    }
  }, [$w.page.dataset.params]);
  const handleModeClick = mode => {
    toast({
      title: '选择练习模式',
      description: `已选择${mode.name}模式`
    });

    // 跳转到对应的练习页面
    $w.utils.navigateTo({
      pageId: mode.id === 'chapter-practice' ? 'chapter-list' : 'question-practice',
      params: {
        category: examCategory,
        subject: subject,
        mode: mode.id
      }
    });
  };
  const handleBack = () => {
    $w.utils.navigateBack();
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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-800">
                {getCategoryName(examCategory)} - {subjectName}
              </h1>
              <p className="text-sm text-gray-600">选择练习模式</p>
            </div>
          </div>
        </div>
      </div>

      {/* 练习模式网格 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6">
          {practiceModes.map(mode => {
          const Icon = mode.icon;
          return <div key={mode.id} onClick={() => handleModeClick(mode)} className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-102 hover:shadow-lg">
                <div className="flex items-start">
                  {/* 图标区域 */}
                  <div className={`w-16 h-16 rounded-xl ${mode.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  
                  {/* 内容区域 */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {mode.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${mode.id === 'chapter-practice' ? 'bg-blue-100 text-blue-800' : mode.id === 'special-practice' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                        {mode.tag}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      {mode.description}
                    </p>
                    
                    {/* 特色功能 */}
                    <div className="flex flex-wrap gap-2">
                      {mode.features.map((feature, index) => <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                          <Sparkles size={12} className="mr-1" />
                          {feature}
                        </span>)}
                    </div>
                  </div>
                </div>
              </div>;
        })}
        </div>

        {/* 提示信息 */}
        {practiceModes.length === 0 && <div className="text-center py-12">
            <p className="text-gray-500">暂无练习模式数据</p>
          </div>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}