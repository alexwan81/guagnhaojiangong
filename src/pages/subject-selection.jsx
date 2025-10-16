// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, Building, Road, Wrench, Droplets, DollarSign, ClipboardCheck, Gavel, Settings, Target, FileText, Calculator, Book } from 'lucide-react';

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

  // 课程数据（包含公共课程和专业课程）
  const courseData = {
    'first-grade-constructor': [{
      id: 'public-economy',
      name: '建设工程经济',
      icon: DollarSign,
      color: 'bg-blue-600',
      description: '公共课程 · 120题',
      type: 'public',
      subtitle: '工程经济、工程财务、建设工程估价'
    }, {
      id: 'public-law',
      name: '建设工程法规',
      icon: Gavel,
      color: 'bg-purple-600',
      description: '公共课程 · 110题',
      type: 'public',
      subtitle: '法律法规、合同管理、施工许可'
    }, {
      id: 'public-management',
      name: '建设工程项目管理',
      icon: Settings,
      color: 'bg-green-600',
      description: '公共课程 · 115题',
      type: 'public',
      subtitle: '组织管理、成本管理、进度管理'
    }, {
      id: 'architecture',
      name: '建筑工程',
      icon: Building,
      color: 'bg-blue-500',
      description: '专业课程 · 160题',
      type: 'professional',
      subtitle: '建筑结构、施工技术、项目管理'
    }, {
      id: 'municipal',
      name: '市政公用工程',
      icon: Road,
      color: 'bg-green-500',
      description: '专业课程 · 150题',
      type: 'professional',
      subtitle: '道路、桥梁、给排水、燃气工程'
    }, {
      id: 'mechanical-electrical',
      name: '机电工程',
      icon: Wrench,
      color: 'bg-purple-500',
      description: '专业课程 · 145题',
      type: 'professional',
      subtitle: '机械设备、电气工程、自动化控制'
    }, {
      id: 'highway',
      name: '公路工程',
      icon: Road,
      color: 'bg-orange-500',
      description: '专业课程 · 140题',
      type: 'professional',
      subtitle: '路基、路面、桥梁、隧道工程'
    }, {
      id: 'water-conservancy',
      name: '水利水电工程',
      icon: Droplets,
      color: 'bg-teal-500',
      description: '专业课程 · 135题',
      type: 'professional',
      subtitle: '水工建筑物、水利工程施工'
    }],
    'second-grade-constructor': [{
      id: 'public-management-2',
      name: '建设工程施工管理',
      icon: Settings,
      color: 'bg-green-600',
      description: '公共课程 · 95题',
      type: 'public',
      subtitle: '施工管理、成本管理、进度管理'
    }, {
      id: 'public-law-2',
      name: '建设工程法规',
      icon: Gavel,
      color: 'bg-purple-600',
      description: '公共课程 · 90题',
      type: 'public',
      subtitle: '法律法规、合同管理、施工许可'
    }, {
      id: 'architecture-2',
      name: '建筑工程',
      icon: Building,
      color: 'bg-blue-500',
      description: '专业课程 · 120题',
      type: 'professional',
      subtitle: '建筑结构、施工技术、项目管理'
    }, {
      id: 'municipal-2',
      name: '市政公用工程',
      icon: Road,
      color: 'bg-green-500',
      description: '专业课程 · 115题',
      type: 'professional',
      subtitle: '道路、桥梁、给排水、燃气工程'
    }, {
      id: 'mechanical-electrical-2',
      name: '机电工程',
      icon: Wrench,
      color: 'bg-purple-500',
      description: '专业课程 · 110题',
      type: 'professional',
      subtitle: '机械设备、电气工程、自动化控制'
    }, {
      id: 'highway-2',
      name: '公路工程',
      icon: Road,
      color: 'bg-orange-500',
      description: '专业课程 · 105题',
      type: 'professional',
      subtitle: '路基、路面、桥梁、隧道工程'
    }, {
      id: 'water-conservancy-2',
      name: '水利水电工程',
      icon: Droplets,
      color: 'bg-teal-500',
      description: '专业课程 · 100题',
      type: 'professional',
      subtitle: '水工建筑物、水利工程施工'
    }],
    'cost-engineer': [{
      id: 'cost-management',
      name: '建设工程造价管理',
      icon: Settings,
      color: 'bg-blue-600',
      description: '公共课程 · 100题',
      type: 'public',
      subtitle: '造价管理、法律法规、项目管理'
    }, {
      id: 'cost-pricing',
      name: '建设工程计价',
      icon: Calculator,
      color: 'bg-orange-600',
      description: '公共课程 · 110题',
      type: 'public',
      subtitle: '造价构成、计价依据、计价方法'
    }, {
      id: 'cost-technology',
      name: '建设工程技术与计量',
      icon: Wrench,
      color: 'bg-orange-500',
      description: '专业课程 · 100题',
      type: 'professional',
      subtitle: '土木建筑工程技术、工程计量'
    }, {
      id: 'cost-case',
      name: '建设工程造价案例分析',
      icon: FileText,
      color: 'bg-red-500',
      description: '专业课程 · 80题',
      type: 'professional',
      subtitle: '投资估算、财务分析、工程结算'
    }],
    'supervising-engineer': [{
      id: 'supervising-theory',
      name: '建设工程监理基本理论与相关法规',
      icon: Book,
      color: 'bg-indigo-600',
      description: '公共课程 · 95题',
      type: 'public',
      subtitle: '监理制度、法律法规、标准规范'
    }, {
      id: 'supervising-contract',
      name: '建设工程合同管理',
      icon: FileText,
      color: 'bg-teal-600',
      description: '公共课程 · 90题',
      type: 'public',
      subtitle: '合同管理、法律制度、示范文本'
    }, {
      id: 'supervising-control',
      name: '建设工程目标控制',
      icon: Target,
      color: 'bg-purple-500',
      description: '专业课程 · 110题',
      type: 'professional',
      subtitle: '质量控制、投资控制、进度控制'
    }, {
      id: 'supervising-case',
      name: '建设工程监理案例分析',
      icon: FileText,
      color: 'bg-indigo-500',
      description: '专业课程 · 70题',
      type: 'professional',
      subtitle: '监理实务、案例分析、问题解决'
    }]
  };

  // 获取课程数据
  const getCoursesByCategory = async categoryCode => {
    try {
      setLoading(true);
      const courses = courseData[categoryCode] || [];
      setCourses(courses);
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取课程数据',
        variant: 'destructive'
      });
      // 使用默认数据
      setCourses(courseData[categoryCode] || []);
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
    // 从页面参数获取考试类别
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
    // 直接跳转到章节练习页面
    $w.utils.navigateTo({
      pageId: 'chapter-list',
      params: {
        category: examCategory,
        subject: course.id,
        courseTitle: course.name,
        courseType: course.type
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
              <p className="text-sm text-gray-600">选择课程</p>
            </div>
          </div>
        </div>
      </div>

      {/* 课程网格 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map(course => {
          const Icon = course.icon;
          return <div key={course.id} onClick={() => handleCourseClick(course)} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-start">
                  <div className={`w-14 h-14 rounded-full ${course.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {course.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.type === 'public' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {course.type === 'public' ? '公共课' : '专业课'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{course.subtitle}</p>
                    <p className="text-sm text-gray-500">{course.description}</p>
                  </div>
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