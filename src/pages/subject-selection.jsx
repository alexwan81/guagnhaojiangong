// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, DollarSign, Gavel, Settings, Building, Road, Wrench, Droplets, Calculator, Book, FileText, Target, Train, Mountain, Factory, Wifi, Ship, Plane, BarChart3, ClipboardCheck, FileCheck, BookOpen, Truck, Waves, Cog } from 'lucide-react';

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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [examCategory, setExamCategory] = useState('');

  // 简化后的专业选择数据（仅显示专业方向）
  const specialtyData = {
    'first-grade-constructor': [{
      id: 'architecture',
      name: '建筑工程',
      icon: Building,
      color: 'bg-blue-500'
    }, {
      id: 'highway',
      name: '公路工程',
      icon: Road,
      color: 'bg-orange-500'
    }, {
      id: 'railway',
      name: '铁路工程',
      icon: Train,
      color: 'bg-red-500'
    }, {
      id: 'aviation',
      name: '民航机场工程',
      icon: Plane,
      color: 'bg-sky-500'
    }, {
      id: 'harbor-waterway',
      name: '港口与航道工程',
      icon: Ship,
      color: 'bg-blue-700'
    }, {
      id: 'water-conservancy',
      name: '水利水电工程',
      icon: Droplets,
      color: 'bg-teal-500'
    }, {
      id: 'municipal',
      name: '市政公用工程',
      icon: Road,
      color: 'bg-green-500'
    }, {
      id: 'communication',
      name: '通信与广电工程',
      icon: Wifi,
      color: 'bg-cyan-500'
    }, {
      id: 'mining',
      name: '矿业工程',
      icon: Mountain,
      color: 'bg-gray-600'
    }, {
      id: 'mechanical-electrical',
      name: '机电工程',
      icon: Wrench,
      color: 'bg-purple-500'
    }],
    'second-grade-constructor': [{
      id: 'architecture-2',
      name: '建筑工程',
      icon: Building,
      color: 'bg-blue-500'
    }, {
      id: 'highway-2',
      name: '公路工程',
      icon: Road,
      color: 'bg-orange-500'
    }, {
      id: 'water-conservancy-2',
      name: '水利水电工程',
      icon: Droplets,
      color: 'bg-teal-500'
    }, {
      id: 'municipal-2',
      name: '市政公用工程',
      icon: Road,
      color: 'bg-green-500'
    }, {
      id: 'mining-2',
      name: '矿业工程',
      icon: Mountain,
      color: 'bg-gray-600'
    }, {
      id: 'mechanical-electrical-2',
      name: '机电工程',
      icon: Wrench,
      color: 'bg-purple-500'
    }],
    'cost-engineer': [{
      id: 'civil-engineering',
      name: '土木建筑工程',
      icon: Building,
      color: 'bg-blue-500'
    }, {
      id: 'transportation-engineering',
      name: '交通运输工程',
      icon: Truck,
      color: 'bg-orange-500'
    }, {
      id: 'water-engineering',
      name: '水利工程',
      icon: Waves,
      color: 'bg-teal-500'
    }, {
      id: 'installation-engineering',
      name: '安装工程',
      icon: Cog,
      color: 'bg-purple-500'
    }],
    'supervising-engineer': [{
      id: 'civil-supervising',
      name: '土木建筑工程',
      icon: Building,
      color: 'bg-blue-500'
    }, {
      id: 'transportation-supervising',
      name: '交通运输工程',
      icon: Truck,
      color: 'bg-orange-500'
    }, {
      id: 'water-supervising',
      name: '水利工程',
      icon: Waves,
      color: 'bg-teal-500'
    }]
  };

  // 获取课程数据
  const getCoursesByCategory = async categoryCode => {
    try {
      setLoading(true);
      const courses = specialtyData[categoryCode] || [];
      setCourses(courses);
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取课程数据',
        variant: 'destructive'
      });
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // 获取考试类别代码映射
  const getCategoryCode = category => {
    const categoryCodes = {
      'first-grade-constructor': 'first-grade-constructor',
      'second-grade-constructor': 'second-grade-constructor',
      'cost-engineer': 'cost-engineer',
      'supervising-engineer': 'supervising-engineer'
    };
    return categoryCodes[category] || '';
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
    const category = $w.page.dataset.params?.category;
    if (category) {
      setExamCategory(category);
      const categoryCode = getCategoryCode(category);
      getCoursesByCategory(categoryCode);
    } else {
      toast({
        title: '参数错误',
        description: '未找到考试类别参数',
        variant: 'destructive'
      });
      $w.utils.navigateBack();
    }
  }, [$w.page.dataset.params]);
  const handleCourseClick = course => {
    // 直接跳转到章节列表页面
    $w.utils.navigateTo({
      pageId: 'chapter-list',
      params: {
        category: examCategory,
        specialty: course.id,
        courseTitle: course.name
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
  if (loading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-lg">
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
      <div className="max-w-4xl mx-auto px-3 py-4">
        <div className="grid grid-cols-2 gap-3">
          {courses.map(course => {
          const Icon = course.icon;
          return <div key={course.id} onClick={() => handleCourseClick(course)} className="bg-white rounded-lg shadow-md p-3 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-full ${course.color} flex items-center justify-center mb-2`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                    {course.name}
                  </h3>
                </div>
              </div>;
        })}
        </div>

        {/* 提示信息 */}
        {courses.length === 0 && <div className="text-center py-12">
            <p className="text-gray-500">暂无课程数据</p>
          </div>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}