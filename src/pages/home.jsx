// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { BookOpen, Clock, Target, TrendingUp, Users, Award, Calendar, ChevronRight } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function Home(props) {
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
  const [userStats, setUserStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    studyDays: 0,
    currentStreak: 0
  });

  // 加载课程信息
  const loadCourses = async () => {
    try {
      setLoading(true);
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'construction_courses',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              status: {
                $eq: 'active'
              }
            }
          },
          select: {
            $master: true
          },
          orderBy: [{
            createdAt: 'desc'
          }]
        }
      });
      setCourses(result.records || []);
    } catch (error) {
      console.error('加载课程信息失败:', error);
      toast({
        title: '加载失败',
        description: '无法获取课程信息',
        variant: 'destructive'
      });
      // 使用默认数据
      setCourses([{
        courseId: 'JZ-01',
        courseName: '一级建造师建筑工程',
        courseCode: 'JZ-01',
        description: '2025年一级建造师《建筑工程管理与实务》考试课程，包含13章完整内容',
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop',
        category: 'first-grade-constructor',
        specialty: 'architecture',
        total_chapters: 13,
        total_questions: 850,
        study_hours: 120,
        year: '2025',
        status: 'active'
      }]);
    } finally {
      setLoading(false);
    }
  };
  const handleCourseClick = course => {
    $w.utils.navigateTo({
      pageId: 'subject-selection',
      params: {
        courseId: course.courseId,
        courseName: course.courseName,
        courseCode: course.courseCode,
        category: course.category,
        specialty: course.specialty
      }
    });
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
  useEffect(() => {
    loadCourses();
    // 模拟用户统计数据
    setUserStats({
      totalQuestions: 1250,
      correctAnswers: 987,
      studyDays: 45,
      currentStreak: 7
    });
  }, []);
  if (loading) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-16">
      {/* 顶部课程信息区域 */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">我的课程</h1>
          
          {/* 课程卡片 */}
          {courses.map(course => <div key={course.courseId} className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-start space-x-4">
                {/* 课程封面图 */}
                <div className="flex-shrink-0">
                  <img src={course.coverImage} alt={course.courseName} className="w-20 h-20 rounded-lg object-cover" />
                </div>
                
                {/* 课程信息 */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm bg-white/20 px-2 py-1 rounded">{course.courseCode}</span>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded">{course.year}年教材</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>
                  <p className="text-white/80 text-sm mb-3">{course.description}</p>
                  
                  {/* 课程统计 */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold">{course.total_chapters}</div>
                      <div className="text-xs text-white/70">章节数</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{course.total_questions}</div>
                      <div className="text-xs text-white/70">总题数</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{course.study_hours}h</div>
                      <div className="text-xs text-white/70">建议时长</div>
                    </div>
                  </div>
                </div>
                
                {/* 进入按钮 */}
                <button onClick={() => handleCourseClick(course)} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                  <span>开始学习</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>)}
        </div>
      </div>

      {/* 学习统计区域 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">学习统计</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Target size={20} className="text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{userStats.totalQuestions}</div>
                <div className="text-sm text-gray-600">总做题数</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{Math.round(userStats.correctAnswers / userStats.totalQuestions * 100)}%</div>
                <div className="text-sm text-gray-600">正确率</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Calendar size={20} className="text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{userStats.studyDays}</div>
                <div className="text-sm text-gray-600">学习天数</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Award size={20} className="text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{userStats.currentStreak}</div>
                <div className="text-sm text-gray-600">连续学习</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 快捷功能区域 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">快捷功能</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen size={20} className="text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-800">错题本</div>
                <div className="text-sm text-gray-600">查看错题</div>
              </div>
            </div>
          </button>
          
          <button className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Clock size={20} className="text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-800">每日一练</div>
                <div className="text-sm text-gray-600">坚持练习</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}