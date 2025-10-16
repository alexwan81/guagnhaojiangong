// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, Target, BarChart, Award, Clock } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
import { ChapterItem } from '@/components/ChapterItem';
export default function ChapterPracticePage(props) {
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
  const [chapters, setChapters] = useState([]);
  const [overallProgress, setOverallProgress] = useState({
    completed: 0,
    total: 0,
    percentage: 0
  });
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
    loadChapters();
  }, [$w.page.dataset.params]);
  const loadChapters = () => {
    // 模拟章节数据 - 以一级建造师建筑工程为例
    const chaptersData = [{
      id: 'chapter-1',
      number: '一',
      title: '工程经济',
      completedCount: 20,
      totalCount: 150,
      isCompleted: false
    }, {
      id: 'chapter-2',
      number: '二',
      title: '工程财务',
      completedCount: 5,
      totalCount: 120,
      isCompleted: false
    }, {
      id: 'chapter-3',
      number: '三',
      title: '建设工程估价',
      completedCount: 45,
      totalCount: 200,
      isCompleted: false
    }, {
      id: 'chapter-4',
      number: '四',
      title: '建设工程项目管理',
      completedCount: 80,
      totalCount: 180,
      isCompleted: false
    }, {
      id: 'chapter-5',
      number: '五',
      title: '建设工程法规',
      completedCount: 150,
      totalCount: 150,
      isCompleted: true
    }, {
      id: 'chapter-6',
      number: '六',
      title: '建设工程合同管理',
      completedCount: 30,
      totalCount: 100,
      isCompleted: false
    }, {
      id: 'chapter-7',
      number: '七',
      title: '质量管理',
      completedCount: 0,
      totalCount: 90,
      isCompleted: false
    }, {
      id: 'chapter-8',
      number: '八',
      title: '安全管理',
      completedCount: 10,
      totalCount: 110,
      isCompleted: false
    }];
    setChapters(chaptersData);

    // 计算总体进度
    const totalCompleted = chaptersData.reduce((sum, chapter) => sum + chapter.completedCount, 0);
    const totalQuestions = chaptersData.reduce((sum, chapter) => sum + chapter.totalCount, 0);
    const overallPercentage = totalQuestions > 0 ? totalCompleted / totalQuestions * 100 : 0;
    setOverallProgress({
      completed: totalCompleted,
      total: totalQuestions,
      percentage: overallPercentage
    });
  };
  const handleChapterPress = chapterId => {
    const chapter = chapters.find(c => c.id === chapterId);
    $w.utils.navigateTo({
      pageId: 'question-practice',
      params: {
        categoryName: examInfo.categoryName,
        majorName: examInfo.majorName,
        chapterName: `第${chapter?.number}章 ${chapter?.title}`
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
              {examInfo.majorName}
            </h1>
            <p className="text-sm text-gray-600">{examInfo.categoryName} · 章节练习</p>
          </div>
        </div>
      </div>
      
      {/* 总体进度统计 */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">学习进度总览</h2>
              <p className="text-blue-100 text-sm">当前专业章节完成情况</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Target size={24} />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{overallProgress.completed}</p>
              <p className="text-blue-100 text-sm">已做题</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{overallProgress.total}</p>
              <p className="text-blue-100 text-sm">总题数</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{Math.round(overallProgress.percentage)}%</p>
              <p className="text-blue-100 text-sm">完成度</p>
            </div>
          </div>
          
          <div className="mt-4 w-full bg-white bg-opacity-30 rounded-full h-3">
            <div className="h-3 rounded-full bg-white transition-all duration-300" style={{
            width: `${overallProgress.percentage}%`
          }}></div>
          </div>
        </div>
        
        {/* 章节列表 */}
        <div className="space-y-3">
          {chapters.map(chapter => <ChapterItem key={chapter.id} chapterNumber={chapter.number} title={chapter.title} completedCount={chapter.completedCount} totalCount={chapter.totalCount} isCompleted={chapter.isCompleted} onPress={() => handleChapterPress(chapter.id)} />)}
        </div>
        
        {/* 学习统计 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <BarChart size={16} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">学习统计</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award size={20} className="text-green-600" />
                  </div>
                  <p className="text-blue-700">已学章节</p>
                  <p className="text-lg font-bold text-blue-800">
                    {chapters.filter(c => c.completedCount > 0).length}/{chapters.length}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <p className="text-blue-700">预计耗时</p>
                  <p className="text-lg font-bold text-blue-800">
                    {Math.ceil(overallProgress.total / 30)}小时
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}