// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, DollarSign, Gavel, Settings, Building, Road, Wrench, Droplets, Calculator, Book, FileText, Target, Train, Mountain, Factory, Wifi, Ship, Plane, TrendingUp, BarChart3, ClipboardCheck, Scale, FileCheck, BookOpen, Award, HardHat, Truck, Waves, Cog } from 'lucide-react';

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

  // 官方标准的课程/科目数据
  const courseData = {
    'first-grade-constructor': [
    // 公共课
    {
      id: 'public-economy',
      name: '建设工程经济',
      icon: DollarSign,
      color: 'bg-blue-600'
    }, {
      id: 'public-law',
      name: '建设工程法规',
      icon: Gavel,
      color: 'bg-purple-600'
    }, {
      id: 'public-management',
      name: '建设工程项目管理',
      icon: Settings,
      color: 'bg-green-600'
    },
    // 专业课（10个官方专业）
    {
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
    'second-grade-constructor': [
    // 公共课
    {
      id: 'public-management-2',
      name: '建设工程施工管理',
      icon: Settings,
      color: 'bg-green-600'
    }, {
      id: 'public-law-2',
      name: '建设工程法规',
      icon: Gavel,
      color: 'bg-purple-600'
    },
    // 专业课（6个官方专业）
    {
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
    'cost-engineer': [
    // 造价工程师4个专业方向
    {
      id: 'civil-engineering',
      name: '土木建筑工程',
      icon: Building,
      color: 'bg-blue-600',
      description: '房屋建筑、市政基础设施等'
    }, {
      id: 'transportation-engineering',
      name: '交通运输工程',
      icon: Truck,
      color: 'bg-orange-600',
      description: '公路、铁路、水运等'
    }, {
      id: 'water-engineering',
      name: '水利工程',
      icon: Waves,
      color: 'bg-teal-600',
      description: '水利水电、水资源等'
    }, {
      id: 'installation-engineering',
      name: '安装工程',
      icon: Cog,
      color: 'bg-purple-600',
      description: '机电设备、管道安装等'
    }],
    'supervising-engineer': [
    // 监理工程师4个考试科目
    {
      id: 'supervising-theory',
      name: '建设工程监理基本理论与相关法规',
      icon: BookOpen,
      color: 'bg-indigo-600'
    }, {
      id: 'supervising-contract',
      name: '建设工程合同管理',
      icon: FileCheck,
      color: 'bg-teal-600'
    }, {
      id: 'supervising-control',
      name: '建设工程目标控制',
      icon: Target,
      color: 'bg-purple-500'
    }, {
      id: 'supervising-case',
      name: '建设工程监理案例分析',
      icon: ClipboardCheck,
      color: 'bg-indigo-500'
    }]
  };

  // 造价工程师各专业的考试科目
  const costEngineerSubjects = {
    'civil-engineering': [{
      id: 'cost-management-civil',
      name: '建设工程造价管理',
      icon: BarChart3,
      color: 'bg-blue-600'
    }, {
      id: 'cost-pricing-civil',
      name: '建设工程计价',
      icon: Calculator,
      color: 'bg-orange-600'
    }, {
      id: 'cost-technology-civil',
      name: '建设工程技术与计量(土木)',
      icon: Building,
      color: 'bg-green-600'
    }, {
      id: 'cost-case-civil',
      name: '建设工程造价案例分析(土木)',
      icon: FileText,
      color: 'bg-red-500'
    }],
    'transportation-engineering': [{
      id: 'cost-management-transport',
      name: '建设工程造价管理',
      icon: BarChart3,
      color: 'bg-blue-600'
    }, {
      id: 'cost-pricing-transport',
      name: '建设工程计价',
      icon: Calculator,
      color: 'bg-orange-600'
    }, {
      id: 'cost-technology-transport',
      name: '建设工程技术与计量(交通)',
      icon: Truck,
      color: 'bg-green-600'
    }, {
      id: 'cost-case-transport',
      name: '建设工程造价案例分析(交通)',
      icon: FileText,
      color: 'bg-red-500'
    }],
    'water-engineering': [{
      id: 'cost-management-water',
      name: '建设工程造价管理',
      icon: BarChart3,
      color: 'bg-blue-600'
    }, {
      id: 'cost-pricing-water',
      name: '建设工程计价',
      icon: Calculator,
      color: 'bg-orange-600'
    }, {
      id: 'cost-technology-water',
      name: '建设工程技术与计量(水利)',
      icon: Waves,
      color: 'bg-green-600'
    }, {
      id: 'cost-case-water',
      name: '建设工程造价案例分析(水利)',
      icon: FileText,
      color: 'bg-red-500'
    }],
    'installation-engineering': [{
      id: 'cost-management-install',
      name: '建设工程造价管理',
      icon: BarChart3,
      color: 'bg-blue-600'
    }, {
      id: 'cost-pricing-install',
      name: '建设工程计价',
      icon: Calculator,
      color: 'bg-orange-600'
    }, {
      id: 'cost-technology-install',
      name: '建设工程技术与计量(安装)',
      icon: Cog,
      color: 'bg-green-600'
    }, {
      id: 'cost-case-install',
      name: '建设工程造价案例分析(安装)',
      icon: FileText,
      color: 'bg-red-500'
    }]
  };

  // 获取课程数据
  const getCoursesByCategory = async categoryCode => {
    try {
      setLoading(true);
      let courses = [];
      if (categoryCode === 'cost-engineer') {
        // 造价工程师显示专业选择
        courses = courseData[categoryCode] || [];
      } else if (categoryCode === 'supervising-engineer') {
        // 监理工程师显示考试科目
        courses = courseData[categoryCode] || [];
      } else {
        // 建造师显示专业课程
        courses = courseData[categoryCode] || [];
      }
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
    const specialty = $w.page.dataset.params?.specialty;
    if (category) {
      setExamCategory(category);
      if (category === 'cost-engineer' && specialty) {
        // 如果已选择造价工程师专业，显示该专业的科目
        const subjects = costEngineerSubjects[specialty] || [];
        setCourses(subjects);
      } else {
        // 否则显示专业/科目列表
        const categoryCode = getCategoryCode(category);
        getCoursesByCategory(categoryCode);
      }
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
    if (examCategory === 'cost-engineer' && course.description) {
      // 造价工程师专业选择，跳转到该专业的科目
      $w.utils.navigateTo({
        pageId: 'subject-selection',
        params: {
          category: examCategory,
          specialty: course.id
        }
      });
    } else {
      // 其他情况直接进入章节列表
      $w.utils.navigateTo({
        pageId: 'chapter-list',
        params: {
          category: examCategory,
          subject: course.id,
          courseTitle: course.name,
          ...(course.specialty && {
            specialty: course.specialty
          })
        }
      });
    }
  };
  const handleBack = () => {
    const specialty = $w.page.dataset.params?.specialty;
    if (specialty) {
      // 如果是造价工程师的科目页面，返回专业选择
      $w.utils.navigateTo({
        pageId: 'subject-selection',
        params: {
          category: examCategory
        }
      });
    } else {
      $w.utils.navigateBack();
    }
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

  // 获取页面标题
  const getPageTitle = () => {
    const specialty = $w.page.dataset.params?.specialty;
    if (examCategory === 'cost-engineer' && specialty) {
      const specialtyNames = {
        'civil-engineering': '土木建筑工程',
        'transportation-engineering': '交通运输工程',
        'water-engineering': '水利工程',
        'installation-engineering': '安装工程'
      };
      return specialtyNames[specialty] || '造价工程师';
    }
    return getCategoryName(examCategory);
  };
  if (loading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  const specialty = $w.page.dataset.params?.specialty;
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
                {getPageTitle()}
              </h1>
              <p className="text-sm text-gray-600">
                {examCategory === 'cost-engineer' && !specialty ? '选择专业方向' : '选择课程'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 课程网格 - 紧凑双列布局 */}
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
                  {course.description && <p className="text-xs text-gray-600 mt-1">{course.description}</p>}
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