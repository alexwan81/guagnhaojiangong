// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, CheckCircle, Play } from 'lucide-react';

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
  const [examCategory, setExamCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [chapters, setChapters] = useState([]);
  const [totalProgress, setTotalProgress] = useState({
    completed: 0,
    total: 0
  });

  // 从 exams 集合获取章节数据
  const getChaptersBySubject = async (categoryCode, subjectId) => {
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'exams',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              $and: [{
                code: {
                  $eq: categoryCode
                }
              }]
            }
          },
          select: {
            $master: true
          }
        }
      });
      if (result.records && result.records.length > 0) {
        const exam = result.records[0];
        // 查找对应的专业和章节
        for (const category of exam.categories || []) {
          const foundSubject = category.subjects.find(s => s.id === subjectId);
          if (foundSubject) {
            // 模拟学习进度数据（实际项目中应该从用户学习记录中获取）
            const chaptersWithProgress = (foundSubject.chapters || []).map((chapter, index) => ({
              ...chapter,
              completed: Math.floor(Math.random() * chapter.questionCount),
              // 模拟已完成题目数
              order: index + 1
            }));

            // 计算总进度
            const totalCompleted = chaptersWithProgress.reduce((sum, chap) => sum + chap.completed, 0);
            const totalQuestions = chaptersWithProgress.reduce((sum, chap) => sum + chap.questionCount, 0);
            setChapters(chaptersWithProgress);
            setTotalProgress({
              completed: totalCompleted,
              total: totalQuestions
            });
            return;
          }
        }
      }

      // 如果没有找到数据，使用默认章节数据
      const defaultChapters = [{
        id: 'chapter_1',
        name: '建设工程经济',
        questionCount: 150,
        completed: 20,
        order: 1
      }, {
        id: 'chapter_2',
        name: '建设工程法规及相关知识',
        questionCount: 200,
        completed: 35,
        order: 2
      }, {
        id: 'chapter_3',
        name: '建设工程项目管理',
        questionCount: 180,
        completed: 12,
        order: 3
      }, {
        id: 'chapter_4',
        name: '专业工程管理与实务',
        questionCount: 250,
        completed: 5,
        order: 4
      }];
      const totalCompleted = defaultChapters.reduce((sum, chap) => sum + chap.completed, 0);
      const totalQuestions = defaultChapters.reduce((sum, chap) => sum + chap.questionCount, 0);
      setChapters(defaultChapters);
      setTotalProgress({
        completed: totalCompleted,
        total: totalQuestions
      });
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取章节数据',
        variant: 'destructive'
      });
    }
  };

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

  // 获取考试类别代码映射
  const getCategoryCode = category => {
    const categoryCodes = {
      'first-grade-constructor': 'yjjzs',
      'second-grade-constructor': 'ejjzs',
      'cost-engineer': 'zjgcs',
      'supervising-engineer': 'jlgcs'
    };
    return categoryCodes[category] || '';
  };
  useEffect(() => {
    // 从页面参数获取考试类别和专业
    const category = $w.page.dataset.params?.category;
    const subjectId = $w.page.dataset.params?.subject;
    if (category && subjectId) {
      setExamCategory(category);
      setSubject(subjectId);
      setSubjectName(getSubjectName(category, subjectId));

      // 获取章节数据
      const categoryCode = getCategoryCode(category);
      getChaptersBySubject(categoryCode, subjectId);
    } else {
      toast({
        title: '参数错误',
        description: '未找到考试类别或专业参数',
        variant: 'destructive'
      });
      $w.utils.navigateBack();
    }
  }, [$w.page.dataset.params]);
  const handleChapterClick = chapter => {
    toast({
      title: '开始练习',
      description: `进入${chapter.name}章节`
    });

    // 跳转到章节练习页面
    $w.utils.navigateTo({
      pageId: 'question-practice',
      params: {
        category: examCategory,
        subject: subject,
        chapter: chapter.id,
        mode: 'chapter-practice'
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

  // 计算进度百分比
  const calculateProgress = (completed, total) => {
    if (total === 0) return 0;
    return Math.round(completed / total * 100);
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-bold text-gray-800">
                {subjectName}
              </h1>
              <p className="text-sm text-gray-600">章节练习</p>
            </div>
          </div>
        </div>
      </div>

      {/* 总体进度 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BookOpen size={20} className="text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">总体进度</span>
            </div>
            <span className="text-sm text-gray-500">
              {totalProgress.completed}/{totalProgress.total}题
            </span>
          </div>
          
          {/* 进度条 */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{
            width: `${calculateProgress(totalProgress.completed, totalProgress.total)}%`
          }} />
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {calculateProgress(totalProgress.completed, totalProgress.total)}% 已完成
            </span>
            <span className="text-xs text-blue-600 font-medium">
              继续努力！
            </span>
          </div>
        </div>
      </div>

      {/* 章节列表 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">章节列表</h2>
        
        <div className="space-y-3">
          {chapters.map(chapter => {
          const progressPercent = calculateProgress(chapter.completed, chapter.questionCount);
          return <div key={chapter.id} onClick={() => handleChapterClick(chapter)} className="bg-white rounded-xl shadow-sm p-4 cursor-pointer transition-transform hover:scale-102 hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-blue-600">{chapter.order}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-800">
                        {chapter.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {chapter.completed}/{chapter.questionCount}题
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {progressPercent === 100 ? <CheckCircle size={20} className="text-green-500" /> : <Play size={20} className="text-blue-500" />}
                  </div>
                </div>
                
                {/* 章节进度条 */}
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${progressPercent === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{
                width: `${progressPercent}%`
              }} />
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {progressPercent}% 完成
                  </span>
                  <span className="text-xs text-blue-600 font-medium">
                    {progressPercent === 100 ? '已完成' : '继续练习'}
                  </span>
                </div>
              </div>;
        })}
        </div>

        {/* 空状态 */}
        {chapters.length === 0 && <div className="text-center py-12">
            <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">暂无章节数据</p>
          </div>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}