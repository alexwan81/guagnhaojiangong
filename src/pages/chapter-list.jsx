// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, PlayCircle, CheckCircle, Clock, FileText } from 'lucide-react';

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
        chapter: '1',
        importance: 'high',
        knowledgePoints: 52,
        studyHours: 11,
        totalQuestions: 240,
        description: '建筑物分类与构成体系、建筑设计要求、建筑构造、建筑结构体系与应用、建筑抗震设计构造要求'
      }, {
        id: 'architecture-2025-02',
        title: '第2章 主要建筑工程材料的性能',
        subtitle: '建筑材料性能与应用',
        chapter: '2',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 9,
        totalQuestions: 200,
        description: '结构工程材料（水泥、钢材、混凝土）、装饰装修材料、功能材料、建筑钢材性能、水泥性能与应用'
      }, {
        id: 'architecture-2025-03',
        title: '第3章 建筑工程施工技术',
        subtitle: '施工技术与工艺流程',
        chapter: '3',
        importance: 'high',
        knowledgePoints: 68,
        studyHours: 16,
        totalQuestions: 340,
        description: '施工测量、土石方工程施工、地基与基础工程施工、主体结构工程施工、防水工程施工、装饰装修工程施工'
      }, {
        id: 'architecture-2025-04',
        title: '第4章 相关法规',
        subtitle: '建筑工程法律法规',
        chapter: '4',
        importance: 'medium',
        knowledgePoints: 42,
        studyHours: 8,
        totalQuestions: 160,
        description: '建筑法、招标投标法、合同法、安全生产法、质量管理条例、安全生产管理条例、环保法规'
      }, {
        id: 'architecture-2025-05',
        title: '第5章 相关标准',
        subtitle: '建筑工程技术标准',
        chapter: '5',
        importance: 'medium',
        knowledgePoints: 38,
        studyHours: 7,
        totalQuestions: 150,
        description: '建筑设计标准、施工质量标准、安全标准、防火标准、节能标准、环保标准、验收规范'
      }, {
        id: 'architecture-2025-06',
        title: '第6章 建筑工程企业资质与施工组织',
        subtitle: '企业资质与施工组织设计',
        chapter: '6',
        importance: 'high',
        knowledgePoints: 45,
        studyHours: 9,
        totalQuestions: 180,
        description: '建筑业企业资质标准、施工组织设计编制、施工部署、施工方案、专项施工方案编制'
      }, {
        id: 'architecture-2025-07',
        title: '第7章 工程招标投标与合同管理',
        subtitle: '招投标与合同管理实务',
        chapter: '7',
        importance: 'high',
        knowledgePoints: 50,
        studyHours: 10,
        totalQuestions: 200,
        description: '工程招标投标程序、合同管理、工程索赔、工程变更管理、工程结算、合同争议处理'
      }, {
        id: 'architecture-2025-08',
        title: '第8章 施工进度管理',
        subtitle: '进度计划与控制',
        chapter: '8',
        importance: 'high',
        knowledgePoints: 46,
        studyHours: 9,
        totalQuestions: 190,
        description: '施工进度计划编制、施工进度控制方法、进度调整、工期优化、进度延误处理'
      }, {
        id: 'architecture-2025-09',
        title: '第9章 施工质量管理',
        subtitle: '质量控制与验收',
        chapter: '9',
        importance: 'high',
        knowledgePoints: 52,
        studyHours: 11,
        totalQuestions: 220,
        description: '质量管理体系建立、施工质量控制要点、质量验收程序、质量问题处理、质量事故处理'
      }, {
        id: 'architecture-2025-10',
        title: '第10章 施工成本管理',
        subtitle: '成本控制与核算',
        chapter: '10',
        importance: 'medium',
        knowledgePoints: 42,
        studyHours: 8,
        totalQuestions: 170,
        description: '成本计划编制、成本控制方法、成本核算分析、工程价款结算、竣工结算'
      }, {
        id: 'architecture-2025-11',
        title: '第11章 施工安全管理',
        subtitle: '安全生产与应急管理',
        chapter: '11',
        importance: 'high',
        knowledgePoints: 48,
        studyHours: 10,
        totalQuestions: 200,
        description: '安全生产管理体系、安全检查与隐患排查、应急预案制定、事故报告与处理、安全教育培训'
      }, {
        id: 'architecture-2025-12',
        title: '第12章 绿色建造及施工现场环境管理',
        subtitle: '绿色施工与环境保护',
        chapter: '12',
        importance: 'medium',
        knowledgePoints: 38,
        studyHours: 7,
        totalQuestions: 155,
        description: '绿色建造技术、施工现场环境保护措施、节能减排技术、文明施工管理、环境监测'
      }, {
        id: 'architecture-2025-13',
        title: '第13章 施工资源管理',
        subtitle: '材料设备与劳动力管理',
        chapter: '13',
        importance: 'medium',
        knowledgePoints: 44,
        studyHours: 8,
        totalQuestions: 180,
        description: '材料采购与现场管理、施工机械设备管理、劳动力配置与管理、技术管理、资金管理'
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
  const getCategoryName = category => {
    const categoryNames = {
      'first-grade-constructor': '一级建造师',
      'second-grade-constructor': '二级建造师',
      'cost-engineer': '造价工程师',
      'supervising-engineer': '注册监理工程师'
    };
    return categoryNames[category] || '未知类别';
  };
  const getImportanceColor = importance => {
    const colors = {
      high: 'text-red-600 bg-red-50',
      medium: 'text-orange-600 bg-orange-50',
      low: 'text-green-600 bg-green-50'
    };
    return colors[importance] || 'text-gray-600 bg-gray-50';
  };
  const getImportanceLabel = importance => {
    const labels = {
      high: '重点',
      medium: '重要',
      low: '一般'
    };
    return labels[importance] || '普通';
  };
  const handlePracticeClick = (chapter, event) => {
    event.stopPropagation();
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

      {/* 章节列表 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-3">
          {chapters.map(chapter => <div key={chapter.id} className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* 章节序号 */}
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{chapter.chapter}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {chapter.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(chapter.importance)}`}>
                        {getImportanceLabel(chapter.importance)}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      {chapter.subtitle}
                    </h4>
                    
                    <p className="text-xs text-gray-500 mb-2">
                      {chapter.description}
                    </p>
                    
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <BookOpen size={12} className="mr-1" />
                        {chapter.knowledgePoints}个知识点
                      </span>
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {chapter.studyHours}小时
                      </span>
                      <span className="flex items-center">
                        <FileText size={12} className="mr-1" />
                        {chapter.totalQuestions}题
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* 练习按钮 */}
                <button onClick={e => handlePracticeClick(chapter, e)} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap">
                  <PlayCircle size={16} className="mr-1" />
                  练习
                </button>
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