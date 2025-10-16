// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Building, Road, Wrench, Droplets, BookOpen } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function SubjectSelection(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [examCategory, setExamCategory] = useState('');
  const [subjects, setSubjects] = useState([]);

  // 根据考试类别获取对应的专业方向
  const getSubjectsByCategory = category => {
    const subjectData = {
      'first-grade-constructor': [{
        id: 'architecture',
        name: '建筑工程',
        icon: Building,
        color: 'bg-blue-500',
        description: '房屋建筑、装饰装修等'
      }, {
        id: 'municipal',
        name: '市政公用工程',
        icon: Road,
        color: 'bg-green-500',
        description: '城市道路、桥梁、给排水等'
      }, {
        id: 'mechanical-electrical',
        name: '机电工程',
        icon: Wrench,
        color: 'bg-purple-500',
        description: '机械设备、电气安装等'
      }, {
        id: 'highway',
        name: '公路工程',
        icon: Road,
        color: 'bg-orange-500',
        description: '公路、隧道、路基等'
      }, {
        id: 'water-conservancy',
        name: '水利水电工程',
        icon: Droplets,
        color: 'bg-teal-500',
        description: '水利工程、水电工程等'
      }, {
        id: 'public-course',
        name: '公共课',
        icon: BookOpen,
        color: 'bg-gray-500',
        description: '工程经济、法规、管理等'
      }],
      'second-grade-constructor': [{
        id: 'architecture-2',
        name: '建筑工程',
        icon: Building,
        color: 'bg-blue-500',
        description: '二级建造师建筑工程专业'
      }, {
        id: 'municipal-2',
        name: '市政公用工程',
        icon: Road,
        color: 'bg-green-500',
        description: '二级建造师市政工程专业'
      }, {
        id: 'mechanical-electrical-2',
        name: '机电工程',
        icon: Wrench,
        color: 'bg-purple-500',
        description: '二级建造师机电工程专业'
      }],
      'cost-engineer': [{
        id: 'cost-installation',
        name: '安装工程',
        icon: Wrench,
        color: 'bg-purple-500',
        description: '安装工程造价专业'
      }, {
        id: 'cost-construction',
        name: '建筑工程',
        icon: Building,
        color: 'bg-blue-500',
        description: '建筑工程造价专业'
      }],
      'supervising-engineer': [{
        id: 'supervising-civil',
        name: '土木建筑工程',
        icon: Building,
        color: 'bg-blue-500',
        description: '土木建筑监理专业'
      }, {
        id: 'supervising-transport',
        name: '交通运输工程',
        icon: Road,
        color: 'bg-green-500',
        description: '交通运输监理专业'
      }]
    };
    return subjectData[category] || [];
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
    // 从页面参数获取考试类别
    const category = $w.page.dataset.params?.category;
    if (category) {
      setExamCategory(category);
      setSubjects(getSubjectsByCategory(category));
    } else {
      toast({
        title: '参数错误',
        description: '未找到考试类别参数',
        variant: 'destructive'
      });
      $w.utils.navigateBack();
    }
  }, [$w.page.dataset.params]);
  const handleSubjectClick = subject => {
    toast({
      title: '选择专业',
      description: `已选择${subject.name}专业`
    });

    // 跳转到练习模式选择页面
    $w.utils.navigateTo({
      pageId: 'practice-mode',
      params: {
        category: examCategory,
        subject: subject.id
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
                {getCategoryName(examCategory)}
              </h1>
              <p className="text-sm text-gray-600">选择专业方向</p>
            </div>
          </div>
        </div>
      </div>

      {/* 专业方向网格 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {subjects.map(subject => {
          const Icon = subject.icon;
          return <div key={subject.id} onClick={() => handleSubjectClick(subject)} className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full ${subject.color} flex items-center justify-center mb-3`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {subject.description}
                  </p>
                </div>
              </div>;
        })}
        </div>

        {/* 提示信息 */}
        {subjects.length === 0 && <div className="text-center py-12">
            <p className="text-gray-500">暂无专业数据</p>
          </div>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}