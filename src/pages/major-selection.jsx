// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Building, Road, Cpu, Mountain, Droplets, BookOpen, Home, Target, Calendar } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
import { MajorCard } from '@/components/MajorCard';
export default function MajorSelectionPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [examCategory, setExamCategory] = useState(null);
  const [majors, setMajors] = useState([]);
  useEffect(() => {
    // 从页面参数获取考试类别信息
    const categoryId = $w.page.dataset.params?.categoryId;
    const categoryName = $w.page.dataset.params?.categoryName;
    if (categoryId && categoryName) {
      setExamCategory({
        id: categoryId,
        name: categoryName
      });
      loadMajors(categoryId);
    } else {
      // 如果没有参数，默认显示一级建造师
      setExamCategory({
        id: 'first-class-builder',
        name: '一级建造师'
      });
      loadMajors('first-class-builder');
    }
  }, [$w.page.dataset.params]);
  const loadMajors = categoryId => {
    // 模拟不同考试类别的专业数据
    const majorsData = {
      'first-class-builder': [{
        id: 'architecture',
        icon: Building,
        title: '建筑工程',
        description: '房屋建筑、装饰装修等工程项目',
        questionCount: 1250
      }, {
        id: 'municipal',
        icon: Road,
        title: '市政公用工程',
        description: '城市道路、桥梁、给排水等市政工程',
        questionCount: 980
      }, {
        id: 'mechanical-electrical',
        icon: Cpu,
        title: '机电工程',
        description: '机械设备、电气、自动化等安装工程',
        questionCount: 890
      }, {
        id: 'highway',
        icon: Road,
        title: '公路工程',
        description: '公路、桥梁、隧道等交通基础设施',
        questionCount: 760
      }, {
        id: 'water-conservancy',
        icon: Droplets,
        title: '水利水电工程',
        description: '水利枢纽、水电站、防洪工程等',
        questionCount: 680
      }, {
        id: 'public-course',
        icon: BookOpen,
        title: '公共课',
        description: '工程经济、法规、项目管理等基础课程',
        questionCount: 1540
      }],
      'second-class-builder': [{
        id: 'architecture-2',
        icon: Building,
        title: '建筑工程',
        description: '二级建造师建筑工程专业',
        questionCount: 950
      }, {
        id: 'municipal-2',
        icon: Road,
        title: '市政工程',
        description: '二级建造师市政工程专业',
        questionCount: 820
      }, {
        id: 'mechanical-electrical-2',
        icon: Cpu,
        title: '机电工程',
        description: '二级建造师机电工程专业',
        questionCount: 780
      }, {
        id: 'public-course-2',
        icon: BookOpen,
        title: '公共课',
        description: '二级建造师公共基础课程',
        questionCount: 1200
      }],
      'cost-engineer': [{
        id: 'installation',
        icon: Cpu,
        title: '安装工程',
        description: '设备安装、电气、管道等造价',
        questionCount: 1100
      }, {
        id: 'civil-engineering',
        icon: Building,
        title: '土木建筑工程',
        description: '建筑、结构、装饰等土建造价',
        questionCount: 1350
      }, {
        id: 'public-course-cost',
        icon: BookOpen,
        title: '公共课',
        description: '造价工程师基础理论课程',
        questionCount: 980
      }],
      'supervising-engineer': [{
        id: 'civil-supervision',
        icon: Building,
        title: '土木建筑工程监理',
        description: '建筑工程施工监理专业',
        questionCount: 1050
      }, {
        id: 'installation-supervision',
        icon: Cpu,
        title: '安装工程监理',
        description: '设备安装工程监理专业',
        questionCount: 890
      }, {
        id: 'public-course-supervision',
        icon: BookOpen,
        title: '公共课',
        description: '监理工程师基础理论课程',
        questionCount: 1120
      }]
    };
    setMajors(majorsData[categoryId] || []);
  };
  const handleMajorPress = majorId => {
    const major = majors.find(m => m.id === majorId);
    $w.utils.navigateTo({
      pageId: 'practice-mode',
      params: {
        categoryId: examCategory.id,
        categoryName: examCategory.name,
        majorId: majorId,
        majorName: major?.title
      }
    });
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
              {examCategory?.name || '专业选择'}
            </h1>
            <p className="text-sm text-gray-600">选择您要学习的专业方向</p>
          </div>
        </div>
      </div>
      
      {/* 专业列表 */}
      <div className="px-6 py-6">
        <div className="space-y-3">
          {majors.map(major => <MajorCard key={major.id} icon={major.icon} title={major.title} description={major.description} questionCount={major.questionCount} onPress={() => handleMajorPress(major.id)} />)}
        </div>
        
        {/* 统计信息 */}
        {majors.length > 0 && <div className="mt-8 bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">总题量统计</p>
                <p className="text-2xl font-bold text-blue-800">
                  {majors.reduce((total, major) => total + major.questionCount, 0).toLocaleString()}
                </p>
                <p className="text-xs text-blue-600">涵盖所有专业方向</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target size={24} className="text-blue-600" />
              </div>
            </div>
          </div>}
      </div>
      
      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}