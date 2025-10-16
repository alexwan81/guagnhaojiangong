// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, PlayCircle, CheckCircle, Clock, Target, FileText, BarChart3, Calculator, Settings, Gavel, DollarSign, Building, Road, Truck, Waves, Cog, Star, TrendingUp, AlertCircle } from 'lucide-react';

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

  // 2025年最新教材章节结构（已修正建筑工程章节）
  const chapterData2025 = {
    'first-grade-constructor': {
      'architecture': [{
        id: 'architecture-2025-01',
        title: '第1章 建筑设计',
        subtitle: '建筑构造与结构体系',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 8,
        progress: 65,
        totalQuestions: 180,
        completedQuestions: 117,
        description: '建筑分类、耐火等级、建筑构造要求、结构体系选型'
      }, {
        id: 'architecture-2025-02',
        title: '第2章 建筑结构',
        subtitle: '结构设计基本原理',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 52,
        studyHours: 10,
        progress: 45,
        totalQuestions: 220,
        completedQuestions: 99,
        description: '结构可靠性、极限状态设计、荷载组合、结构构造要求'
      }, {
        id: 'architecture-2025-03',
        title: '第3章 建筑材料',
        subtitle: '常用建筑材料性能',
        chapter: '第3章',
        importance: 'medium',
        knowledgePoints: 38,
        studyHours: 6,
        progress: 78,
        totalQuestions: 150,
        completedQuestions: 117,
        description: '水泥、钢材、混凝土、砌体材料性能与应用'
      }, {
        id: 'architecture-2025-04',
        title: '第4章 地基与基础',
        subtitle: '地基处理与基础施工',
        chapter: '第4章',
        importance: 'high',
        knowledgePoints: 42,
        studyHours: 9,
        progress: 30,
        totalQuestions: 190,
        completedQuestions: 57,
        description: '地基处理方法、基础类型、基坑支护、地下水控制'
      }, {
        id: 'architecture-2025-05',
        title: '第5章 主体结构',
        subtitle: '混凝土结构施工技术',
        chapter: '第5章',
        importance: 'high',
        knowledgePoints: 55,
        studyHours: 12,
        progress: 55,
        totalQuestions: 250,
        completedQuestions: 138,
        description: '模板工程、钢筋工程、混凝土工程、装配式结构'
      }, {
        id: 'architecture-2025-06',
        title: '第6章 防水与装饰',
        subtitle: '防水与装修工程施工',
        chapter: '第6章',
        importance: 'medium',
        knowledgePoints: 48,
        studyHours: 8,
        progress: 40,
        totalQuestions: 200,
        completedQuestions: 80,
        description: '防水材料、防水施工、装饰装修工程施工技术'
      }, {
        id: 'architecture-2025-07',
        title: '第7章 项目组织管理',
        subtitle: '施工项目管理',
        chapter: '第7章',
        importance: 'high',
        knowledgePoints: 50,
        studyHours: 10,
        progress: 25,
        totalQuestions: 220,
        completedQuestions: 55,
        description: '项目管理组织、项目经理责任制、项目目标管理'
      }, {
        id: 'architecture-2025-08',
        title: '第8章 质量与安全管理',
        subtitle: '施工质量与安全管理',
        chapter: '第8章',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 9,
        progress: 35,
        totalQuestions: 210,
        completedQuestions: 74,
        description: '质量管理体系、质量控制要点、安全管理措施'
      }],
      'highway': [{
        id: 'highway-2025-01',
        title: '第1章 路基工程',
        subtitle: '路基施工技术',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 58,
        studyHours: 12,
        progress: 60,
        totalQuestions: 200,
        completedQuestions: 120,
        description: '路基施工准备、填方路基、挖方路基、路基排水'
      }, {
        id: 'highway-2025-02',
        title: '第2章 路面工程',
        subtitle: '路面施工技术',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 52,
        studyHours: 11,
        progress: 75,
        totalQuestions: 220,
        completedQuestions: 165,
        description: '基层施工、沥青路面、水泥混凝土路面、路面排水'
      }, {
        id: 'highway-2025-03',
        title: '第3章 桥梁工程',
        subtitle: '桥梁施工技术',
        chapter: '第3章',
        importance: 'high',
        knowledgePoints: 65,
        studyHours: 14,
        progress: 50,
        totalQuestions: 250,
        completedQuestions: 125,
        description: '桥梁基础、下部结构、上部结构、桥面系施工'
      }],
      'water-conservancy': [{
        id: 'water-2025-01',
        title: '第1章 水工建筑物',
        subtitle: '水工建筑物类型与构造',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 65,
        studyHours: 14,
        progress: 55,
        totalQuestions: 210,
        completedQuestions: 116,
        description: '挡水建筑物、泄水建筑物、输水建筑物、水电站建筑物'
      }, {
        id: 'water-2025-02',
        title: '第2章 水利工程施工',
        subtitle: '水利工程施工技术',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 58,
        studyHours: 12,
        progress: 70,
        totalQuestions: 230,
        completedQuestions: 161,
        description: '施工导流、基坑排水、土石方工程、混凝土工程'
      }]
    },
    'second-grade-constructor': {
      'architecture-2': [{
        id: 'architecture2-2025-01',
        title: '第1章 建筑工程施工技术',
        subtitle: '施工测量与土方工程',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 35,
        studyHours: 7,
        progress: 72,
        totalQuestions: 120,
        completedQuestions: 86,
        description: '施工测量、土方开挖、基坑支护、地基处理'
      }, {
        id: 'architecture2-2025-02',
        title: '第2章 主体结构施工',
        subtitle: '混凝土结构施工',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 10,
        progress: 58,
        totalQuestions: 180,
        completedQuestions: 104,
        description: '模板工程、钢筋工程、混凝土工程、砌体工程'
      }, {
        id: 'architecture2-2025-03',
        title: '第3章 装饰装修工程',
        subtitle: '装饰装修施工技术',
        chapter: '第3章',
        importance: 'medium',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 65,
        totalQuestions: 150,
        completedQuestions: 98,
        description: '抹灰工程、门窗工程、吊顶工程、幕墙工程'
      }],
      'highway-2': [{
        id: 'highway2-2025-01',
        title: '第1章 路基施工技术',
        subtitle: '路基施工与质量控制',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 9,
        progress: 68,
        totalQuestions: 150,
        completedQuestions: 102,
        description: '路基施工准备、填筑施工、压实质量控制、路基排水'
      }, {
        id: 'highway2-2025-02',
        title: '第2章 路面施工技术',
        subtitle: '路面基层与面层施工',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 55,
        totalQuestions: 140,
        completedQuestions: 77,
        description: '基层施工、面层施工、施工质量控制、质量检验'
      }]
    },
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
        title: '第一章 建设工程造价管理',
        subtitle: '相关法律法规',
        chapter: '第2节',
        importance: 'high',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 75,
        totalQuestions: 140,
        completedQuestions: 105,
        description: '建筑法、招标投标法、合同法、价格法'
      }, {
        id: 'cost-civil-2025-03',
        title: '第二章 建设工程计价',
        subtitle: '工程计价方法',
        chapter: '第1节',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 9,
        progress: 70,
        totalQuestions: 160,
        completedQuestions: 112,
        description: '定额计价方法、清单计价方法、计价程序'
      }, {
        id: 'cost-civil-2025-04',
        title: '第二章 建设工程计价',
        subtitle: '工程量清单计价',
        chapter: '第2节',
        importance: 'high',
        knowledgePoints: 52,
        studyHours: 10,
        progress: 65,
        totalQuestions: 180,
        completedQuestions: 117,
        description: '清单编制、计价表格、计价规范'
      }, {
        id: 'cost-civil-2025-05',
        title: '第三章 建设工程技术与计量(土木)',
        subtitle: '工程地质',
        chapter: '第1节',
        importance: 'medium',
        knowledgePoints: 38,
        studyHours: 7,
        progress: 60,
        totalQuestions: 130,
        completedQuestions: 78,
        description: '岩土分类、工程性质、地质勘察'
      }, {
        id: 'cost-civil-2025-06',
        title: '第三章 建设工程技术与计量(土木)',
        subtitle: '工程构造',
        chapter: '第2节',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 8,
        progress: 55,
        totalQuestions: 150,
        completedQuestions: 83,
        description: '工业建筑、民用建筑、道路桥梁构造'
      }, {
        id: 'cost-civil-2025-07',
        title: '第四章 建设工程造价案例分析(土木)',
        subtitle: '投资估算与财务评价',
        chapter: '第1节',
        importance: 'high',
        knowledgePoints: 55,
        studyHours: 12,
        progress: 50,
        totalQuestions: 200,
        completedQuestions: 100,
        description: '投资估算、财务分析、不确定性分析'
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
      }, {
        id: 'cost-transport-2025-02',
        title: '第二章 建设工程计价',
        subtitle: '工程计价方法',
        chapter: '第1节',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 9,
        progress: 72,
        totalQuestions: 160,
        completedQuestions: 115,
        description: '定额计价方法、清单计价方法、计价程序'
      }]
    },
    'supervising-engineer': {
      'civil-supervising': [{
        id: 'supervising-civil-2025-01',
        title: '第一章 建设工程监理基本理论与相关法规',
        subtitle: '建设工程监理制度',
        chapter: '第1节',
        importance: 'high',
        knowledgePoints: 40,
        studyHours: 8,
        progress: 85,
        totalQuestions: 110,
        completedQuestions: 94,
        description: '监理制度产生背景、监理工作性质、监理范围'
      }, {
        id: 'supervising-civil-2025-02',
        title: '第一章 建设工程监理基本理论与相关法规',
        subtitle: '相关法律法规',
        chapter: '第2节',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 9,
        progress: 80,
        totalQuestions: 130,
        completedQuestions: 104,
        description: '建筑法、招标投标法、质量管理条例、安全生产法'
      }, {
        id: 'supervising-civil-2025-03',
        title: '第二章 建设工程合同管理',
        subtitle: '合同管理内容',
        chapter: '第1节',
        importance: 'high',
        knowledgePoints: 50,
        studyHours: 10,
        progress: 75,
        totalQuestions: 140,
        completedQuestions: 105,
        description: '合同管理内容、合同索赔管理、合同争议处理'
      }, {
        id: 'supervising-civil-2025-04',
        title: '第三章 建设工程目标控制',
        subtitle: '建设工程质量控制',
        chapter: '第1节',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 9,
        progress: 70,
        totalQuestions: 150,
        completedQuestions: 105,
        description: '质量控制原理、施工质量控制、质量验收'
      }, {
        id: 'supervising-civil-2025-05',
        title: '第三章 建设工程目标控制',
        subtitle: '建设工程投资控制',
        chapter: '第2节',
        importance: 'medium',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 65,
        totalQuestions: 135,
        completedQuestions: 88,
        description: '投资控制原理、施工阶段投资控制、工程变更控制'
      }, {
        id: 'supervising-civil-2025-06',
        title: '第四章 建设工程监理案例分析',
        subtitle: '监理案例分析',
        chapter: '第1节',
        importance: 'high',
        knowledgePoints: 55,
        studyHours: 12,
        progress: 60,
        totalQuestions: 180,
        completedQuestions: 108,
        description: '监理案例分析方法、典型案例分析、实务操作'
      }]
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
              <p className="text-sm text-gray-600">2025年最新教材</p>
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