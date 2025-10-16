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

  // 2025年一级建造师《建筑工程管理与实务》最新教材章节
  const chapterData2025 = {
    'first-grade-constructor': {
      'architecture': [{
        id: 'architecture-tech-01',
        title: '1A411000 建筑设计',
        subtitle: '建筑设计与构造',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 8,
        progress: 65,
        totalQuestions: 180,
        completedQuestions: 117,
        description: '建筑物分类与构成体系、建筑设计要求、建筑构造'
      }, {
        id: 'architecture-tech-02',
        title: '1A412000 建筑构造',
        subtitle: '建筑结构构造与设计原理',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 52,
        studyHours: 10,
        progress: 45,
        totalQuestions: 220,
        completedQuestions: 99,
        description: '结构可靠性要求、结构设计、结构构造'
      }, {
        id: 'architecture-tech-03',
        title: '1A413000 建筑材料',
        subtitle: '常用建筑结构材料',
        chapter: '第3章',
        importance: 'medium',
        knowledgePoints: 38,
        studyHours: 6,
        progress: 78,
        totalQuestions: 150,
        completedQuestions: 117,
        description: '水泥、钢材、混凝土、砌体材料性能与应用'
      }, {
        id: 'architecture-tech-04',
        title: '1A414000 建筑工程施工技术',
        subtitle: '施工测量与土方工程',
        chapter: '第4章',
        importance: 'high',
        knowledgePoints: 55,
        studyHours: 12,
        progress: 30,
        totalQuestions: 250,
        completedQuestions: 75,
        description: '施工测量、土石方工程施工、地基与基础工程施工'
      }, {
        id: 'architecture-tech-05',
        title: '1A414000 建筑工程施工技术',
        subtitle: '主体结构工程施工',
        chapter: '第5章',
        importance: 'high',
        knowledgePoints: 60,
        studyHours: 14,
        progress: 55,
        totalQuestions: 280,
        completedQuestions: 154,
        description: '混凝土结构、砌体结构、钢结构、装配式结构施工'
      }, {
        id: 'architecture-tech-06',
        title: '1A414000 建筑工程施工技术',
        subtitle: '防水与装饰装修工程',
        chapter: '第6章',
        importance: 'medium',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 40,
        totalQuestions: 180,
        completedQuestions: 72,
        description: '防水工程施工、装饰装修工程施工、季节性施工技术'
      }, {
        id: 'architecture-manage-01',
        title: '1A421000 项目组织管理',
        subtitle: '项目管理规划与组织',
        chapter: '第7章',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 10,
        progress: 25,
        totalQuestions: 200,
        completedQuestions: 50,
        description: '项目管理规划、项目管理组织、项目经理责任制'
      }, {
        id: 'architecture-manage-02',
        title: '1A422000 项目施工进度管理',
        subtitle: '施工进度计划与控制',
        chapter: '第8章',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 9,
        progress: 35,
        totalQuestions: 190,
        completedQuestions: 67,
        description: '施工进度计划编制、施工进度控制、施工进度调整'
      }, {
        id: 'architecture-manage-03',
        title: '1A423000 项目施工质量管理',
        subtitle: '施工质量控制与验收',
        chapter: '第9章',
        importance: 'high',
        knowledgePoints: 52,
        studyHours: 11,
        progress: 30,
        totalQuestions: 220,
        completedQuestions: 66,
        description: '项目质量计划、施工质量检查与检验、质量验收'
      }, {
        id: 'architecture-manage-04',
        title: '1A424000 项目施工安全管理',
        subtitle: '施工安全管理与应急预案',
        chapter: '第10章',
        importance: 'high',
        knowledgePoints: 50,
        studyHours: 10,
        progress: 20,
        totalQuestions: 210,
        completedQuestions: 42,
        description: '工程安全生产管理计划、工程安全生产检查、应急预案'
      }, {
        id: 'architecture-manage-05',
        title: '1A425000 项目合同与成本管理',
        subtitle: '合同管理与成本控制',
        chapter: '第11章',
        importance: 'medium',
        knowledgePoints: 46,
        studyHours: 9,
        progress: 15,
        totalQuestions: 195,
        completedQuestions: 29,
        description: '施工合同管理、工程量清单计价规范应用、工程造价管理'
      }, {
        id: 'architecture-regulation-01',
        title: '1A431000 建筑工程相关法规',
        subtitle: '建筑法规与标准',
        chapter: '第12章',
        importance: 'medium',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 10,
        totalQuestions: 170,
        completedQuestions: 17,
        description: '建筑工程建设相关法规、施工安全生产及施工现场管理相关法规'
      }, {
        id: 'architecture-regulation-02',
        title: '1A432000 建筑工程相关技术标准',
        subtitle: '技术标准与规范',
        chapter: '第13章',
        importance: 'medium',
        knowledgePoints: 38,
        studyHours: 7,
        progress: 5,
        totalQuestions: 150,
        completedQuestions: 8,
        description: '安全防火及室内环境污染控制、地基基础工程、主体结构工程相关标准'
      }],
      'highway': [{
        id: 'highway-tech-01',
        title: '1B411000 路基工程',
        subtitle: '路基施工技术',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 58,
        studyHours: 12,
        progress: 60,
        totalQuestions: 200,
        completedQuestions: 120,
        description: '路基施工技术准备、原地基处理要求、挖方路基施工、填方路基施工'
      }, {
        id: 'highway-tech-02',
        title: '1B412000 路面工程',
        subtitle: '路面施工技术',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 52,
        studyHours: 11,
        progress: 75,
        totalQuestions: 220,
        completedQuestions: 165,
        description: '路面基层施工、沥青路面施工、水泥混凝土路面施工、中央分隔带施工'
      }, {
        id: 'highway-tech-03',
        title: '1B413000 桥梁工程',
        subtitle: '桥梁施工技术',
        chapter: '第3章',
        importance: 'high',
        knowledgePoints: 65,
        studyHours: 14,
        progress: 50,
        totalQuestions: 250,
        completedQuestions: 125,
        description: '桥梁基础、下部结构、上部结构、桥面系施工技术'
      }, {
        id: 'highway-manage-01',
        title: '1B420000 公路工程项目施工管理',
        subtitle: '公路工程施工管理',
        chapter: '第4章',
        importance: 'high',
        knowledgePoints: 70,
        studyHours: 15,
        progress: 35,
        totalQuestions: 280,
        completedQuestions: 98,
        description: '公路工程施工组织设计、进度管理、质量管理、安全管理、合同管理'
      }, {
        id: 'highway-regulation-01',
        title: '1B430000 公路工程项目施工相关法规与标准',
        subtitle: '公路工程法规与标准',
        chapter: '第5章',
        importance: 'medium',
        knowledgePoints: 45,
        studyHours: 9,
        progress: 20,
        totalQuestions: 180,
        completedQuestions: 36,
        description: '公路建设管理法规、公路施工安全生产相关规定、公路工程质量管理相关规定'
      }],
      'water-conservancy': [{
        id: 'water-tech-01',
        title: '1F411000 水利水电工程勘测与设计',
        subtitle: '工程勘测与设计',
        chapter: '第1章',
        importance: 'high',
        knowledgePoints: 55,
        studyHours: 12,
        progress: 55,
        totalQuestions: 210,
        completedQuestions: 116,
        description: '水利水电工程勘测、水利水电工程设计'
      }, {
        id: 'water-tech-02',
        title: '1F412000 水利水电工程施工水流控制',
        subtitle: '施工导流与截流',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 10,
        progress: 70,
        totalQuestions: 230,
        completedQuestions: 161,
        description: '施工导流、截流、基坑排水、汛期施工'
      }, {
        id: 'water-tech-03',
        title: '1F413000 地基处理工程',
        subtitle: '地基处理技术',
        chapter: '第3章',
        importance: 'high',
        knowledgePoints: 50,
        studyHours: 11,
        progress: 45,
        totalQuestions: 220,
        completedQuestions: 99,
        description: '地基处理、灌浆技术、防渗墙施工'
      }, {
        id: 'water-manage-01',
        title: '1F420000 水利水电工程项目施工管理',
        subtitle: '水利水电工程施工管理',
        chapter: '第4章',
        importance: 'high',
        knowledgePoints: 65,
        studyHours: 14,
        progress: 30,
        totalQuestions: 260,
        completedQuestions: 78,
        description: '水利水电工程施工组织设计、进度管理、质量管理、安全管理、合同管理'
      }, {
        id: 'water-regulation-01',
        title: '1F430000 水利水电工程项目施工相关法规与标准',
        subtitle: '水利水电工程法规与标准',
        chapter: '第5章',
        importance: 'medium',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 15,
        totalQuestions: 170,
        completedQuestions: 26,
        description: '水利水电工程建设法规、水利水电工程施工安全生产相关规定'
      }],
      'highway-2': [{
        id: 'highway2-tech-01',
        title: '2B310000 公路工程施工技术',
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
        title: '2B310000 公路工程施工技术',
        subtitle: '桥涵与隧道施工',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 42,
        studyHours: 8,
        progress: 55,
        totalQuestions: 140,
        completedQuestions: 77,
        description: '桥梁工程施工技术、隧道工程施工技术、交通工程设施施工'
      }, {
        id: 'highway2-manage-01',
        title: '2B320000 公路工程项目施工管理',
        subtitle: '公路工程施工管理',
        chapter: '第3章',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 10,
        progress: 40,
        totalQuestions: 160,
        completedQuestions: 64,
        description: '公路工程施工组织设计、进度管理、质量管理、安全管理、合同管理'
      }],
      'architecture-2': [{
        id: 'architecture2-tech-01',
        title: '2A310000 建筑工程施工技术',
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
        title: '2A310000 建筑工程施工技术',
        subtitle: '地基与基础工程',
        chapter: '第2章',
        importance: 'high',
        knowledgePoints: 40,
        studyHours: 8,
        progress: 58,
        totalQuestions: 140,
        completedQuestions: 81,
        description: '土方工程施工技术、地基与基础工程施工技术、主体结构工程施工技术'
      }, {
        id: 'architecture2-manage-01',
        title: '2A320000 建筑工程项目施工管理',
        subtitle: '施工项目管理',
        chapter: '第3章',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 9,
        progress: 65,
        totalQuestions: 160,
        completedQuestions: 104,
        description: '单位工程施工组织设计、建筑工程施工进度管理、质量管理、安全管理'
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
      }, {
        id: 'cost-civil-2025-03',
        title: '第三章 建设工程技术与计量(土木)',
        subtitle: '土木工程技术',
        chapter: '第3节',
        importance: 'high',
        knowledgePoints: 55,
        studyHours: 11,
        progress: 70,
        totalQuestions: 190,
        completedQuestions: 133,
        description: '工程地质、工程构造、工程施工技术'
      }, {
        id: 'cost-civil-2025-04',
        title: '第四章 建设工程造价案例分析(土木)',
        subtitle: '土木工程造价案例分析',
        chapter: '第4节',
        importance: 'high',
        knowledgePoints: 50,
        studyHours: 12,
        progress: 65,
        totalQuestions: 200,
        completedQuestions: 130,
        description: '投资估算、财务分析、工程计量与计价、合同价款管理'
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
        chapter: '第2节',
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
      }, {
        id: 'supervising-civil-2025-03',
        title: '第三章 建设工程目标控制',
        subtitle: '质量、投资、进度控制',
        chapter: '第3节',
        importance: 'high',
        knowledgePoints: 50,
        studyHours: 10,
        progress: 75,
        totalQuestions: 140,
        completedQuestions: 105,
        description: '建设工程质量控制、投资控制、进度控制'
      }, {
        id: 'supervising-civil-2025-04',
        title: '第四章 建设工程监理案例分析',
        subtitle: '监理案例分析',
        chapter: '第4节',
        importance: 'high',
        knowledgePoints: 55,
        studyHours: 12,
        progress: 70,
        totalQuestions: 180,
        completedQuestions: 126,
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