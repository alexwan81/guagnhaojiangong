// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, PlayCircle, CheckCircle, Clock, Target, FileText, BarChart3, Calculator, Settings, Gavel, DollarSign, Building, Road, Truck, Waves, Cog, Star, TrendingUp, AlertCircle, Users, Shield, Leaf, Package } from 'lucide-react';

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

  // 2025年一级建造师《建筑工程管理与实务》13章完整结构
  const chapterData2025 = {
    'first-grade-constructor': {
      'architecture': [{
        id: 'architecture-2025-01',
        title: '第1章 建筑工程设计技术',
        subtitle: '建筑设计原理与构造要求',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 10,
        progress: 65,
        totalQuestions: 220,
        completedQuestions: 143,
        description: '建筑物分类与构成体系、建筑设计要求、建筑构造、建筑结构体系与应用'
      }, {
        id: 'architecture-2025-02',
        title: '第2章 主要建筑工程材料的性能',
        subtitle: '建筑材料性能与应用',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 78,
        totalQuestions: 180,
        completedQuestions: 140,
        description: '结构工程材料、装饰装修材料、功能材料、建筑钢材、水泥、混凝土性能'
      }, {
        id: 'architecture-2025-03',
        title: '第3章 建筑工程施工技术',
        subtitle: '施工技术与工艺流程',
        chapter: '第3章',
        importance: 'high',
        knowledgePoints: 65,
        studyHours: 15,
        progress: 55,
        totalQuestions: 320,
        completedQuestions: 176,
        description: '施工测量、土石方工程、地基与基础工程、主体结构工程、防水工程、装饰装修工程'
      }, {
        id: 'architecture-2025-04',
        title: '第4章 相关法规',
        subtitle: '建筑工程法律法规',
        chapter: '第4章',
        importance: 'medium',
        knowledgePoints: 38,
        studyHours: 7,
        progress: 45,
        totalQuestions: 150,
        completedQuestions: 68,
        description: '建筑法、招标投标法、合同法、安全生产法、质量管理条例、安全生产管理条例'
      }, {
        id: 'architecture-2025-05',
        title: '第5章 相关标准',
        subtitle: '建筑工程技术标准',
        chapter: '第5章',
        importance: 'medium',
        knowledgePoints: 35,
        studyHours: 6,
        progress: 40,
        totalQuestions: 140,
        completedQuestions: 56,
        description: '建筑设计标准、施工质量标准、安全标准、防火标准、节能标准、环保标准'
      }, {
        id: 'architecture-2025-06',
        title: '第6章 建筑工程企业资质与施工组织',
        subtitle: '企业资质与施工组织设计',
        chapter: '第6章',
        importance: 'high',
        knowledgePoints: 40,
        studyHours: 8,
        progress: 35,
        totalQuestions: 170,
        completedQuestions: 60,
        description: '建筑业企业资质、施工组织设计、施工部署、施工方案、专项施工方案'
      }, {
        id: 'architecture-2025-07',
        title: '第7章 工程招标投标与合同管理',
        subtitle: '招投标与合同管理实务',
        chapter: '第7章',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 9,
        progress: 30,
        totalQuestions: 190,
        completedQuestions: 57,
        description: '工程招标投标、合同管理、工程索赔、工程变更、工程结算'
      }, {
        id: 'architecture-2025-08',
        title: '第8章 施工进度管理',
        subtitle: '进度计划与控制',
        chapter: '第8章',
        importance: 'high',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 25,
        totalQuestions: 180,
        completedQuestions: 45,
        description: '施工进度计划编制、进度控制方法、进度调整、工期优化'
      }, {
        id: 'architecture-2025-09',
        title: '第9章 施工质量管理',
        subtitle: '质量控制与验收',
        chapter: '第9章',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 10,
        progress: 20,
        totalQuestions: 200,
        completedQuestions: 40,
        description: '质量管理体系、施工质量控制、质量验收、质量问题处理'
      }, {
        id: 'architecture-2025-10',
        title: '第10章 施工成本管理',
        subtitle: '成本控制与核算',
        chapter: '第10章',
        importance: 'medium',
        knowledgePoints: 38,
        studyHours: 7,
        progress: 15,
        totalQuestions: 160,
        completedQuestions: 24,
        description: '成本计划、成本控制、成本核算、成本分析、工程价款结算'
      }, {
        id: 'architecture-2025-11',
        title: '第11章 施工安全管理',
        subtitle: '安全生产与应急管理',
        chapter: '第11章',
        importance: 'high',
        knowledgePoints: 44,
        studyHours: 9,
        progress: 10,
        totalQuestions: 185,
        completedQuestions: 19,
        description: '安全生产管理、安全检查、安全隐患治理、应急预案、事故处理'
      }, {
        id: 'architecture-2025-12',
        title: '第12章 绿色建造及施工现场环境管理',
        subtitle: '绿色施工与环境保护',
        chapter: '第12章',
        importance: 'medium',
        knowledgePoints: 35,
        studyHours: 6,
        progress: 5,
        totalQuestions: 145,
        completedQuestions: 7,
        description: '绿色建造技术、施工现场环境保护、节能减排、文明施工'
      }, {
        id: 'architecture-2025-13',
        title: '第13章 施工资源管理',
        subtitle: '材料设备与劳动力管理',
        chapter: '第13章',
        importance: 'medium',
        knowledgePoints: 40,
        studyHours: 7,
        progress: 0,
        totalQuestions: 155,
        completedQuestions: 0,
        description: '材料管理、机械设备管理、劳动力管理、技术管理、资金管理'
      }],
      'highway': [{
        id: 'highway-tech-01',
        title: '第1章 路基工程',
        subtitle: '路基施工技术',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 58,
        studyHours: 12,
        progress: 60,
        totalQuestions: 200,
        completedQuestions: 120,
        description: '路基施工技术准备、原地基处理、挖方路基、填方路基、路基排水'
      }, {
        id: 'highway-tech-02',
        title: '第2章 路面工程',
        subtitle: '路面施工技术',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 52,
        studyHours: 11,
        progress: 75,
        totalQuestions: 220,
        completedQuestions: 165,
        description: '路面基层施工、沥青路面施工、水泥混凝土路面施工、路面排水'
      }, {
        id: 'highway-tech-03',
        title: '第3章 桥梁工程',
        subtitle: '桥梁施工技术',
        chapter: '第3章',
        importance: 'high',
        knowledgePoints: 65,
        studyHours: 14,
        progress: 50,
        totalQuestions: 250,
        completedQuestions: 125,
        description: '桥梁基础、下部结构、上部结构、桥面系施工技术'
      }],
      'water-conservancy': [{
        id: 'water-tech-01',
        title: '第1章 水利水电工程勘测与设计',
        subtitle: '工程勘测与设计',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 55,
        studyHours: 12,
        progress: 55,
        totalQuestions: 210,
        completedQuestions: 116,
        description: '水利水电工程勘测、水利水电工程设计、水工建筑物设计'
      }, {
        id: 'water-tech-02',
        title: '第2章 水利水电工程施工水流控制',
        subtitle: '施工导流与截流',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 10,
        progress: 70,
        totalQuestions: 230,
        completedQuestions: 161,
        description: '施工导流、截流、基坑排水、汛期施工、围堰工程'
      }],
      'highway-2': [{
        id: 'highway2-tech-01',
        title: '第1章 公路工程施工技术',
        subtitle: '路基与路面施工',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 9,
        progress: 68,
        totalQuestions: 150,
        completedQuestions: 102,
        description: '路基施工技术、路面基层施工技术、沥青路面施工技术'
      }, {
        id: 'highway2-tech-02',
        title: '第2章 公路工程施工技术',
        subtitle: '桥涵与隧道施工',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 55,
        totalQuestions: 140,
        completedQuestions: 77,
        description: '桥梁工程施工技术、隧道工程施工技术、交通工程设施施工'
      }],
      'architecture-2': [{
        id: 'architecture2-tech-01',
        title: '第1章 建筑工程施工技术',
        subtitle: '施工技术与测量',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 35,
        studyHours: 7,
        progress: 72,
        totalQuestions: 120,
        completedQuestions: 86,
        description: '建筑工程技术要求、建筑工程专业施工技术、施工测量技术'
      }, {
        id: 'architecture2-tech-02',
        title: '第2章 建筑工程施工技术',
        subtitle: '地基与基础工程',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 40,
        studyHours: 8,
        progress: 58,
        totalQuestions: 140,
        completedQuestions: 81,
        description: '土方工程施工技术、地基与基础工程施工技术、主体结构工程施工技术'
      }],
      'cost-engineer': {
        'civil-engineering': [{
          id: 'cost-civil-2025-01',
          title: '第一章 建设工程造价管理',
          subtitle: '工程造价管理基本制度',
          chapter: '第1节',
          importance: 'high',
          knowledgePoints: 35,
          studyHours: 6,
          progress: 80,
          totalQuestions: 120,
          completedQuestions: 96,
          description: '工程造价管理组织系统、内容、原则'
        }, {
          id: 'cost-civil-2025-02',
          title: '第二章 建设工程计价',
          subtitle: '工程计价方法',
          chapter: '第2节',
          importance: 'high',
          knowledgePoints: 48,
          studyHours: 9,
          progress: 75,
          totalQuestions: 160,
          completedQuestions: 120,
          description: '定额计价方法、清单计价方法、计价程序'
        }],
        'transportation-engineering': [{
          id: 'cost-transport-2025-01',
          title: '第一章 建设工程造价管理',
          subtitle: '工程造价管理基本制度',
          chapter: '第1节',
          importance: 'high',
          knowledgePoints: 35,
          studyHours: 6,
          progress: 78,
          totalQuestions: 120,
          completedQuestions: 94,
          description: '工程造价管理组织系统、内容、原则'
        }]
      },
      'supervising-engineer': {
        'civil-supervising': [{
          id: 'supervising-civil-2025-01',
          title: '第一章 建设工程监理基本理论与相关法规',
          subtitle: '监理制度与法规',
          chapter: '第1节',
          importance: 'high',
          knowledgePoints: 40,
          studyHours: 8,
          progress: 85,
          totalQuestions: 110,
          completedQuestions: 94,
          description: '建设工程监理制度、相关法律法规、工程建设标准'
        }, {
          id: 'supervising-civil-2025-02',
          title: '第二章 建设工程合同管理',
          subtitle: '合同管理实务',
          chapter: '第2节',
          importance: 'high',
          knowledgePoints: 45,
          studyHours: 9,
          progress: 80,
          totalQuestions: 130,
          completedQuestions: 104,
          description: '建设工程合同管理、工程索赔管理、工程变更管理'
        }]
      }
    }
  };

  // 获取章节数据
  const getChaptersBySpecialty = async (category, specialty) => {
    try {
      setLoading(true);
      const chapters = chapterData2025[category]?.[specialty] || [];
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

  // 获取重要程度颜色
  const getImportanceColor = importance => {
    const colors = {
      high: 'text-red-600 bg-red-50',
      medium: 'text-orange-600 bg-orange-50',
      low: 'text-green-600 bg-green-50'
    };
    return colors[importance] || 'text-gray-600 bg-gray-50';
  };

  // 获取重要程度标签
  const getImportanceLabel = importance => {
    const labels = {
      high: '重点',
      medium: '重要',
      low: '一般'
    };
    return labels[importance] || '普通';
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
                {getCategoryName(examCategory)} - 2025年教材章节
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 学习统计卡片 */}
      <div className="max-w-4xl mx-auto px-3 py-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">学习进度</h3>
              <p className="text-sm text-gray-600">2025年最新教材 - 共13章</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(chapters.reduce((sum, ch) => sum + ch.progress, 0) / chapters.length || 0)}%
              </div>
              <p className="text-sm text-gray-600">
                {chapters.reduce((sum, ch) => sum + ch.completedQuestions, 0)} / {chapters.reduce((sum, ch) => sum + ch.totalQuestions, 0)}题
              </p>
            </div>
          </div>
        </div>

        {/* 章节列表 */}
        <div className="space-y-4">
          {chapters.map((chapter, index) => <div key={chapter.id} onClick={() => handleChapterClick(chapter)} className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-blue-600">{chapter.chapter}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(chapter.importance)}`}>
                      {getImportanceLabel(chapter.importance)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {chapter.title}
                  </h3>
                  <h4 className="text-base font-medium text-gray-700 mb-2">
                    {chapter.subtitle}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {chapter.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <BookOpen size={14} className="mr-1" />
                      {chapter.knowledgePoints}个知识点
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {chapter.studyHours}小时
                    </span>
                    <span className="flex items-center">
                      <FileText size={14} className="mr-1" />
                      {chapter.totalQuestions}题
                    </span>
                    <span className="flex items-center">
                      <CheckCircle size={14} className="mr-1" />
                      {chapter.completedQuestions}已做
                    </span>
                  </div>
                </div>
                <div className="ml-4 text-right flex flex-col items-end">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {chapter.progress}%
                  </div>
                  <div className="w-20 h-2 bg-gray-200 rounded-full mb-2">
                    <div className="h-2 bg-blue-600 rounded-full transition-all duration-300" style={{
                  width: `${chapter.progress}%`
                }}></div>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center">
                    <PlayCircle size={14} className="mr-1" />
                    练习
                  </button>
                </div>
              </div>
            </div>)}
        </div>

        {/* 提示信息 */}
        {chapters.length === 0 && <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen size={48} className="mx-auto mb-2" />
            </div>
            <p className="text-gray-500 text-lg">暂无章节数据</p>
            <p className="text-gray-400 text-sm mt-2">请检查课程选择是否正确</p>
          </div>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}