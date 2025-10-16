// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, PlayCircle, CheckCircle, Clock, Target, FileText, BarChart3, Calculator, Settings, Gavel, DollarSign, Building, Road, Truck, Waves, Cog } from 'lucide-react';

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
  const [examCategory, setExamCategory] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  // 章节数据结构（按专业和考试类别组织）
  const chapterData = {
    'first-grade-constructor': {
      'architecture': [{
        id: 'architecture-ch1',
        title: '第1章 建筑工程技术',
        description: '建筑结构、建筑材料、施工技术',
        progress: 65,
        totalQuestions: 120,
        completedQuestions: 78
      }, {
        id: 'architecture-ch2',
        title: '第2章 建筑工程项目施工管理',
        description: '进度管理、质量管理、安全管理',
        progress: 45,
        totalQuestions: 150,
        completedQuestions: 68
      }, {
        id: 'architecture-ch3',
        title: '第3章 建筑工程项目施工相关法规与标准',
        description: '建筑法规、技术标准、验收规范',
        progress: 30,
        totalQuestions: 100,
        completedQuestions: 30
      }],
      'highway': [{
        id: 'highway-ch1',
        title: '第1章 公路工程技术',
        description: '路基、路面、桥梁、隧道工程',
        progress: 55,
        totalQuestions: 130,
        completedQuestions: 72
      }, {
        id: 'highway-ch2',
        title: '第2章 公路工程项目施工管理',
        description: '施工组织、质量控制、安全管理',
        progress: 40,
        totalQuestions: 140,
        completedQuestions: 56
      }, {
        id: 'highway-ch3',
        title: '第3章 公路工程项目施工相关法规与标准',
        description: '公路法规、技术标准、验收规范',
        progress: 25,
        totalQuestions: 110,
        completedQuestions: 28
      }],
      'water-conservancy': [{
        id: 'water-ch1',
        title: '第1章 水利水电工程技术',
        description: '水工建筑物、施工技术、水利机械',
        progress: 60,
        totalQuestions: 125,
        completedQuestions: 75
      }, {
        id: 'water-ch2',
        title: '第2章 水利水电工程项目施工管理',
        description: '施工组织、质量控制、安全管理',
        progress: 50,
        totalQuestions: 135,
        completedQuestions: 68
      }, {
        id: 'water-ch3',
        title: '第3章 水利水电工程项目施工相关法规与标准',
        description: '水利法规、技术标准、验收规范',
        progress: 35,
        totalQuestions: 105,
        completedQuestions: 37
      }]
      // 其他专业章节数据...
    },
    'second-grade-constructor': {
      'architecture-2': [{
        id: 'architecture2-ch1',
        title: '第1章 建筑工程施工技术',
        description: '建筑结构、施工技术、质量控制',
        progress: 70,
        totalQuestions: 100,
        completedQuestions: 70
      }, {
        id: 'architecture2-ch2',
        title: '第2章 建筑工程项目施工管理',
        description: '施工管理、安全管理、合同管理',
        progress: 55,
        totalQuestions: 120,
        completedQuestions: 66
      }],
      'highway-2': [{
        id: 'highway2-ch1',
        title: '第1章 公路工程施工技术',
        description: '路基、路面、桥梁施工技术',
        progress: 60,
        totalQuestions: 110,
        completedQuestions: 66
      }, {
        id: 'highway2-ch2',
        title: '第2章 公路工程项目施工管理',
        description: '施工管理、质量控制、安全管理',
        progress: 45,
        totalQuestions: 130,
        completedQuestions: 59
      }]
      // 其他专业章节数据...
    },
    'cost-engineer': {
      'civil-engineering': [{
        id: 'cost-civil-ch1',
        title: '第1章 建设工程造价管理',
        description: '造价管理理论、方法、应用',
        progress: 75,
        totalQuestions: 90,
        completedQuestions: 68
      }, {
        id: 'cost-civil-ch2',
        title: '第2章 建设工程计价',
        description: '计价原理、方法、实务',
        progress: 65,
        totalQuestions: 100,
        completedQuestions: 65
      }, {
        id: 'cost-civil-ch3',
        title: '第3章 建设工程技术与计量(土木)',
        description: '土木工程技术、计量规则',
        progress: 55,
        totalQuestions: 110,
        completedQuestions: 61
      }, {
        id: 'cost-civil-ch4',
        title: '第4章 建设工程造价案例分析(土木)',
        description: '案例分析、实务操作',
        progress: 45,
        totalQuestions: 80,
        completedQuestions: 36
      }],
      'transportation-engineering': [{
        id: 'cost-transport-ch1',
        title: '第1章 建设工程造价管理',
        description: '造价管理理论、方法、应用',
        progress: 70,
        totalQuestions: 90,
        completedQuestions: 63
      }, {
        id: 'cost-transport-ch2',
        title: '第2章 建设工程计价',
        description: '计价原理、方法、实务',
        progress: 60,
        totalQuestions: 100,
        completedQuestions: 60
      }, {
        id: 'cost-transport-ch3',
        title: '第3章 建设工程技术与计量(交通)',
        description: '交通工程技术、计量规则',
        progress: 50,
        totalQuestions: 110,
        completedQuestions: 55
      }, {
        id: 'cost-transport-ch4',
        title: '第4章 建设工程造价案例分析(交通)',
        description: '案例分析、实务操作',
        progress: 40,
        totalQuestions: 80,
        completedQuestions: 32
      }]
      // 其他专业章节数据...
    },
    'supervising-engineer': {
      'civil-supervising': [{
        id: 'supervising-civil-ch1',
        title: '第1章 建设工程监理基本理论与相关法规',
        description: '监理理论、法律法规、标准规范',
        progress: 80,
        totalQuestions: 85,
        completedQuestions: 68
      }, {
        id: 'supervising-civil-ch2',
        title: '第2章 建设工程合同管理',
        description: '合同管理、索赔管理、风险管理',
        progress: 70,
        totalQuestions: 95,
        completedQuestions: 67
      }, {
        id: 'supervising-civil-ch3',
        title: '第3章 建设工程目标控制',
        description: '质量控制、进度控制、投资控制',
        progress: 60,
        totalQuestions: 105,
        completedQuestions: 63
      }, {
        id: 'supervising-civil-ch4',
        title: '第4章 建设工程监理案例分析',
        description: '案例分析、实务操作、综合应用',
        progress: 50,
        totalQuestions: 75,
        completedQuestions: 38
      }],
      'transportation-supervising': [{
        id: 'supervising-transport-ch1',
        title: '第1章 建设工程监理基本理论与相关法规',
        description: '监理理论、法律法规、标准规范',
        progress: 75,
        totalQuestions: 85,
        completedQuestions: 64
      }, {
        id: 'supervising-transport-ch2',
        title: '第2章 建设工程合同管理',
        description: '合同管理、索赔管理、风险管理',
        progress: 65,
        totalQuestions: 95,
        completedQuestions: 62
      }, {
        id: 'supervising-transport-ch3',
        title: '第3章 建设工程目标控制',
        description: '质量控制、进度控制、投资控制',
        progress: 55,
        totalQuestions: 105,
        completedQuestions: 58
      }, {
        id: 'supervising-transport-ch4',
        title: '第4章 建设工程监理案例分析',
        description: '案例分析、实务操作、综合应用',
        progress: 45,
        totalQuestions: 75,
        completedQuestions: 34
      }]
      // 其他专业章节数据...
    }
  };

  // 获取章节数据
  const getChaptersBySpecialty = async (category, specialty) => {
    try {
      setLoading(true);
      const chapters = chapterData[category]?.[specialty] || [];
      setChapters(chapters);
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取章节数据',
        variant: 'destructive'
      });
      setChapters([]);
    } finally {
      setLoading(false);
    }
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
    const courseTitle = $w.page.dataset.params?.courseTitle;
    if (category && specialty) {
      setExamCategory(category);
      setSpecialty(specialty);
      setCourseTitle(courseTitle);
      getChaptersBySpecialty(category, specialty);
    } else {
      toast({
        title: '参数错误',
        description: '未找到课程参数',
        variant: 'destructive'
      });
      $w.utils.navigateBack();
    }
  }, [$w.page.dataset.params]);
  const handleChapterClick = chapter => {
    $w.utils.navigateTo({
      pageId: 'question-practice',
      params: {
        category: examCategory,
        specialty: specialty,
        chapter: chapter.id,
        chapterTitle: chapter.title
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
                {courseTitle}
              </h1>
              <p className="text-sm text-gray-600">
                {getCategoryName(examCategory)} - 章节练习
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 章节列表 */}
      <div className="max-w-4xl mx-auto px-3 py-4">
        <div className="space-y-4">
          {chapters.map(chapter => <div key={chapter.id} onClick={() => handleChapterClick(chapter)} className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {chapter.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FileText size={16} className="mr-1" />
                      {chapter.totalQuestions}题
                    </span>
                    <span className="flex items-center">
                      <CheckCircle size={16} className="mr-1" />
                      {chapter.completedQuestions}已做
                    </span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {chapter.progress}%
                  </div>
                  <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                    <div className="h-2 bg-blue-600 rounded-full" style={{
                  width: `${chapter.progress}%`
                }}></div>
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        {/* 提示信息 */}
        {chapters.length === 0 && <div className="text-center py-12">
            <p className="text-gray-500">暂无章节数据</p>
          </div>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}