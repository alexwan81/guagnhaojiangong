// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, CheckCircle, Circle, Clock, Target, TrendingUp, Users, Award, Building, ClipboardCheck, Scale, Package, Tool, Shield, DollarSign, FileText, Book, Calculator, Gavel, Users2, Settings } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function ChapterList(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [chapters, setChapters] = useState([]);
  const [publicChapters, setPublicChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');

  // 公共课程数据
  const publicCoursesData = {
    'first-grade-constructor': [{
      id: 'public-1',
      title: '建设工程经济',
      subtitle: '工程经济、工程财务、建设工程估价',
      icon: 'DollarSign',
      color: 'bg-blue-600',
      totalQuestions: 120,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '3小时',
      type: 'public'
    }, {
      id: 'public-2',
      title: '建设工程法规及相关知识',
      subtitle: '建设工程基本法律知识、施工许可、发承包、合同、环保等',
      icon: 'Gavel',
      color: 'bg-purple-600',
      totalQuestions: 110,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '2.5小时',
      type: 'public'
    }, {
      id: 'public-3',
      title: '建设工程项目管理',
      subtitle: '组织管理、成本管理、进度管理、质量管理、安全管理等',
      icon: 'Settings',
      color: 'bg-green-600',
      totalQuestions: 115,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '2.5小时',
      type: 'public'
    }],
    'second-grade-constructor': [{
      id: 'public-2-1',
      title: '建设工程施工管理',
      subtitle: '施工管理、成本管理、进度管理、质量管理、安全管理等',
      icon: 'Settings',
      color: 'bg-green-600',
      totalQuestions: 95,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '2小时',
      type: 'public'
    }, {
      id: 'public-2-2',
      title: '建设工程法规及相关知识',
      subtitle: '建设工程基本法律知识、施工许可、发承包、合同等',
      icon: 'Gavel',
      color: 'bg-purple-600',
      totalQuestions: 90,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '2小时',
      type: 'public'
    }],
    'cost-engineer': [{
      id: 'cost-public-1',
      title: '建设工程造价管理',
      subtitle: '工程造价管理及其基本制度、相关法律法规、工程项目管理等',
      icon: 'Settings',
      color: 'bg-blue-600',
      totalQuestions: 100,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '2.5小时',
      type: 'public'
    }, {
      id: 'cost-public-2',
      title: '建设工程计价',
      subtitle: '建设工程造价构成、计价依据、计价方法等',
      icon: 'Calculator',
      color: 'bg-orange-600',
      totalQuestions: 110,
      completedQuestions: 0,
      difficulty: '较难',
      estimatedTime: '3小时',
      type: 'public'
    }],
    'supervising-engineer': [{
      id: 'supervising-public-1',
      title: '建设工程监理基本理论与相关法规',
      subtitle: '建设工程监理制度、相关法律法规、标准规范等',
      icon: 'Book',
      color: 'bg-indigo-600',
      totalQuestions: 95,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '2小时',
      type: 'public'
    }, {
      id: 'supervising-public-2',
      title: '建设工程合同管理',
      subtitle: '建设工程合同管理、合同法律制度、合同示范文本等',
      icon: 'FileText',
      color: 'bg-teal-600',
      totalQuestions: 90,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '2小时',
      type: 'public'
    }]
  };

  // 2025年各专业课程数据
  const professionalCoursesData = {
    'first-grade-constructor': [{
      id: 'professional-1',
      title: '专业工程管理与实务',
      subtitle: '建筑工程技术、施工管理、相关法规与标准',
      icon: 'Building',
      color: 'bg-blue-500',
      totalQuestions: 160,
      completedQuestions: 0,
      difficulty: '较难',
      estimatedTime: '4小时',
      type: 'professional'
    }],
    'second-grade-constructor': [{
      id: 'professional-2',
      title: '专业工程管理与实务',
      subtitle: '建筑工程技术、施工管理、相关法规与标准',
      icon: 'Building',
      color: 'bg-blue-500',
      totalQuestions: 120,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '3小时',
      type: 'professional'
    }],
    'cost-engineer': [{
      id: 'cost-professional-1',
      title: '建设工程技术与计量',
      subtitle: '土木建筑工程技术、工程计量等',
      icon: 'Tool',
      color: 'bg-orange-500',
      totalQuestions: 100,
      completedQuestions: 0,
      difficulty: '较难',
      estimatedTime: '2.5小时',
      type: 'professional'
    }, {
      id: 'cost-professional-2',
      title: '建设工程造价案例分析',
      subtitle: '建设项目投资估算、财务分析、工程结算等',
      icon: 'Calculator',
      color: 'bg-red-500',
      totalQuestions: 80,
      completedQuestions: 0,
      difficulty: '难',
      estimatedTime: '3小时',
      type: 'professional'
    }],
    'supervising-engineer': [{
      id: 'supervising-professional-1',
      title: '建设工程目标控制',
      subtitle: '质量控制、投资控制、进度控制',
      icon: 'Target',
      color: 'bg-purple-500',
      totalQuestions: 110,
      completedQuestions: 0,
      difficulty: '中等',
      estimatedTime: '2.5小时',
      type: 'professional'
    }, {
      id: 'supervising-professional-2',
      title: '建设工程监理案例分析',
      subtitle: '监理实务、案例分析、问题解决',
      icon: 'FileText',
      color: 'bg-indigo-500',
      totalQuestions: 70,
      completedQuestions: 0,
      difficulty: '较难',
      estimatedTime: '2小时',
      type: 'professional'
    }]
  };

  // 获取章节数据
  const fetchChapters = async () => {
    try {
      setLoading(true);
      const category = $w.page.dataset.params?.category;
      const subject = $w.page.dataset.params?.subject;
      if (!category || !subject) {
        toast({
          title: '参数错误',
          description: '缺少考试类别或专业参数',
          variant: 'destructive'
        });
        return;
      }
      setCategory(category);
      setSubject(subject);

      // 获取公共课程
      const publicCourses = publicCoursesData[category] || [];
      setPublicChapters(publicCourses);

      // 获取专业课程
      const professionalCourses = professionalCoursesData[category] || [];

      // 合并公共课程和专业课程
      const allChapters = [...publicCourses, ...professionalCourses];
      setChapters(allChapters);
    } catch (error) {
      console.error('获取章节数据失败:', error);
      // 使用默认数据
      const publicCourses = publicCoursesData[category] || [];
      const professionalCourses = professionalCoursesData[category] || [];
      const allChapters = [...publicCourses, ...professionalCourses];
      setChapters(allChapters);
      setPublicChapters(publicCourses);
    } finally {
      setLoading(false);
    }
  };

  // 获取图标组件
  const getIconComponent = iconName => {
    const icons = {
      Building: Building,
      ClipboardCheck: ClipboardCheck,
      Scale: Scale,
      Package: Package,
      Tool: Tool,
      Shield: Shield,
      DollarSign: DollarSign,
      FileText: FileText,
      BookOpen: BookOpen,
      Book: Book,
      Calculator: Calculator,
      Gavel: Gavel,
      Settings: Settings,
      Target: Target
    };
    return icons[iconName] || BookOpen;
  };

  // 计算进度百分比
  const calculateProgress = (completed, total) => {
    if (total === 0) return 0;
    return Math.round(completed / total * 100);
  };

  // 获取进度条颜色
  const getProgressColor = progress => {
    if (progress === 0) return 'bg-gray-200';
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
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

  // 处理章节点击
  const handleChapterClick = chapter => {
    $w.utils.navigateTo({
      pageId: 'question-practice',
      params: {
        category: category,
        subject: subject,
        chapter: chapter.id,
        chapterTitle: chapter.title,
        chapterType: chapter.type
      }
    });
  };

  // 返回上一页
  const handleBack = () => {
    $w.utils.navigateBack();
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
  useEffect(() => {
    fetchChapters();
  }, []);
  if (loading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }

  // 计算总体进度
  const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.totalQuestions, 0);
  const completedQuestions = chapters.reduce((sum, chapter) => sum + chapter.completedQuestions, 0);
  const overallProgress = calculateProgress(completedQuestions, totalQuestions);

  // 分离公共课程和专业课程
  const publicCourses = chapters.filter(chapter => chapter.type === 'public');
  const professionalCourses = chapters.filter(chapter => chapter.type === 'professional');
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-800">{getCategoryName(category)}</h1>
              <p className="text-sm text-gray-600">章节练习</p>
            </div>
          </div>
        </div>
      </div>

      {/* 总体进度卡片 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">学习进度</h2>
              <p className="text-sm text-gray-600">已完成 {completedQuestions} / {totalQuestions} 题</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
              <p className="text-sm text-gray-600">总体完成度</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className={`${getProgressColor(overallProgress)} h-3 rounded-full transition-all duration-300`} style={{
            width: `${overallProgress}%`
          }}></div>
          </div>
        </div>

        {/* 公共课程 */}
        {publicCourses.length > 0 && <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen size={24} className="mr-2 text-blue-600" />
              公共课程
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">必考</span>
            </h2>
            <div className="space-y-4">
              {publicCourses.map((chapter, index) => {
            const Icon = getIconComponent(chapter.icon);
            const progress = calculateProgress(chapter.completedQuestions, chapter.totalQuestions);
            return <div key={chapter.id} onClick={() => handleChapterClick(chapter)} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-l-4 border-blue-500">
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-lg ${chapter.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            {chapter.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{chapter.subtitle}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Target size={14} className="mr-1" />
                              {chapter.totalQuestions}题
                            </span>
                            <span className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {chapter.estimatedTime}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${chapter.difficulty === '简单' ? 'bg-green-100 text-green-800' : chapter.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {chapter.difficulty}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{progress}%</div>
                          <p className="text-xs text-gray-500">完成度</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">
                            {chapter.completedQuestions} / {chapter.totalQuestions} 题已完成
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${getProgressColor(progress)} h-2 rounded-full transition-all duration-300`} style={{
                        width: `${progress}%`
                      }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>;
          })}
            </div>
          </div>}

        {/* 专业课程 */}
        {professionalCourses.length > 0 && <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Building size={24} className="mr-2 text-purple-600" />
              专业课程
              <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">专业</span>
            </h2>
            <div className="space-y-4">
              {professionalCourses.map((chapter, index) => {
            const Icon = getIconComponent(chapter.icon);
            const progress = calculateProgress(chapter.completedQuestions, chapter.totalQuestions);
            return <div key={chapter.id} onClick={() => handleChapterClick(chapter)} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-l-4 border-purple-500">
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-lg ${chapter.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            {chapter.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{chapter.subtitle}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Target size={14} className="mr-1" />
                              {chapter.totalQuestions}题
                            </span>
                            <span className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {chapter.estimatedTime}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${chapter.difficulty === '简单' ? 'bg-green-100 text-green-800' : chapter.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {chapter.difficulty}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{progress}%</div>
                          <p className="text-xs text-gray-500">完成度</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">
                            {chapter.completedQuestions} / {chapter.totalQuestions} 题已完成
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${getProgressColor(progress)} h-2 rounded-full transition-all duration-300`} style={{
                        width: `${progress}%`
                      }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>;
          })}
            </div>
          </div>}

        {/* 学习统计 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-green-600" />
            学习统计
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{chapters.length}</div>
              <p className="text-sm text-gray-600">总课程</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalQuestions}</div>
              <p className="text-sm text-gray-600">总题目</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{publicCourses.length}</div>
              <p className="text-sm text-gray-600">公共课</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{professionalCourses.length}</div>
              <p className="text-sm text-gray-600">专业课</p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}