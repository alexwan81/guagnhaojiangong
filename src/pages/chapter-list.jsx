// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, CheckCircle, Circle, Clock, Target, TrendingUp, Users, Award } from 'lucide-react';

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
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');

  // 2025年建筑工程教材章节结构
  const architectureChapters2025 = [{
    id: 'chapter-1',
    title: '建筑工程技术',
    subtitle: '建筑结构与构造',
    icon: 'Building',
    color: 'bg-blue-500',
    totalQuestions: 85,
    completedQuestions: 0,
    difficulty: '中等',
    estimatedTime: '2小时'
  }, {
    id: 'chapter-2',
    title: '建筑工程项目施工管理',
    subtitle: '施工组织与进度管理',
    icon: 'Clipboard',
    color: 'bg-green-500',
    totalQuestions: 120,
    completedQuestions: 0,
    difficulty: '较难',
    estimatedTime: '3小时'
  }, {
    id: 'chapter-3',
    title: '建筑工程项目施工相关法规与标准',
    subtitle: '法律法规与标准规范',
    icon: 'Scale',
    color: 'bg-purple-500',
    totalQuestions: 95,
    completedQuestions: 0,
    difficulty: '中等',
    estimatedTime: '2.5小时'
  }, {
    id: 'chapter-4',
    title: '建筑工程材料',
    subtitle: '材料性能与应用',
    icon: 'Package',
    color: 'bg-orange-500',
    totalQuestions: 75,
    completedQuestions: 0,
    difficulty: '简单',
    estimatedTime: '1.5小时'
  }, {
    id: 'chapter-5',
    title: '建筑工程施工技术',
    subtitle: '施工方法与工艺',
    icon: 'Tool',
    color: 'bg-red-500',
    totalQuestions: 110,
    completedQuestions: 0,
    difficulty: '较难',
    estimatedTime: '2.5小时'
  }, {
    id: 'chapter-6',
    title: '建筑工程项目管理',
    subtitle: '质量、安全与环境管理',
    icon: 'Shield',
    color: 'bg-indigo-500',
    totalQuestions: 90,
    completedQuestions: 0,
    difficulty: '中等',
    estimatedTime: '2小时'
  }, {
    id: 'chapter-7',
    title: '建筑工程经济',
    subtitle: '工程经济与项目管理',
    icon: 'DollarSign',
    color: 'bg-teal-500',
    totalQuestions: 80,
    completedQuestions: 0,
    difficulty: '中等',
    estimatedTime: '2小时'
  }, {
    id: 'chapter-8',
    title: '建筑工程法规',
    subtitle: '建筑法规与合同管理',
    icon: 'FileText',
    color: 'bg-pink-500',
    totalQuestions: 85,
    completedQuestions: 0,
    difficulty: '中等',
    estimatedTime: '2小时'
  }];

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

      // 从数据库获取章节数据
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'chapters',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              $and: [{
                category: {
                  $eq: category
                }
              }, {
                subject: {
                  $eq: subject
                }
              }]
            }
          },
          orderBy: [{
            order: 'asc'
          }],
          select: {
            $master: true
          }
        }
      });
      if (result.records && result.records.length > 0) {
        // 处理数据库返回的章节数据
        const dbChapters = result.records.map(chapter => ({
          id: chapter.id,
          title: chapter.title,
          subtitle: chapter.subtitle || '',
          icon: chapter.icon || 'BookOpen',
          color: chapter.color || 'bg-blue-500',
          totalQuestions: chapter.totalQuestions || 0,
          completedQuestions: chapter.completedQuestions || 0,
          difficulty: chapter.difficulty || '中等',
          estimatedTime: chapter.estimatedTime || '2小时'
        }));
        setChapters(dbChapters);
      } else {
        // 使用默认的2025年建筑工程章节数据
        setChapters(architectureChapters2025);
      }
    } catch (error) {
      console.error('获取章节数据失败:', error);
      // 使用默认数据
      setChapters(architectureChapters2025);
    } finally {
      setLoading(false);
    }
  };

  // 获取图标组件
  const getIconComponent = iconName => {
    const icons = {
      Building: Building,
      Clipboard: ClipboardCheck,
      Scale: BookOpen,
      Package: BookOpen,
      Tool: BookOpen,
      Shield: BookOpen,
      DollarSign: BookOpen,
      FileText: BookOpen,
      BookOpen: BookOpen
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

  // 处理章节点击
  const handleChapterClick = chapter => {
    $w.utils.navigateTo({
      pageId: 'question-practice',
      params: {
        category: category,
        subject: subject,
        chapter: chapter.id,
        chapterTitle: chapter.title
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
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-800">2025年建筑工程</h1>
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

        {/* 章节列表 */}
        <div className="space-y-4">
          {chapters.map((chapter, index) => {
          const Icon = getIconComponent(chapter.icon);
          const progress = calculateProgress(chapter.completedQuestions, chapter.totalQuestions);
          return <div key={chapter.id} onClick={() => handleChapterClick(chapter)} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-lg ${chapter.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        第{index + 1}章：{chapter.title}
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

        {/* 学习统计 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-green-600" />
            学习统计
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{chapters.length}</div>
              <p className="text-sm text-gray-600">总章节数</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalQuestions}</div>
              <p className="text-sm text-gray-600">总题目数</p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}