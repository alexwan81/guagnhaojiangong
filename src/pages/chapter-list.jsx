// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, PlayCircle, BookOpen, FileText } from 'lucide-react';

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
        subchapters: [{
          id: '1-1',
          title: '1.1 建筑物的构成与设计要求',
          knowledgePoints: 16,
          totalQuestions: 70
        }, {
          id: '1-2',
          title: '1.2 建筑构造设计的基本要求',
          knowledgePoints: 15,
          totalQuestions: 65
        }, {
          id: '1-3',
          title: '1.3 建筑结构体系和设计作用（荷载）',
          knowledgePoints: 18,
          totalQuestions: 80
        }, {
          id: '1-4',
          title: '1.4 建筑结构设计构造基本要求',
          knowledgePoints: 14,
          totalQuestions: 60
        }, {
          id: '1-5',
          title: '1.5 装配式建筑设计基本要求',
          knowledgePoints: 12,
          totalQuestions: 50
        }]
      }, {
        id: 'architecture-2025-02',
        title: '第2章 主要建筑工程材料的性能与应用',
        subchapters: [{
          id: '2-1',
          title: '2.1 结构工程材料',
          knowledgePoints: 14,
          totalQuestions: 60
        }, {
          id: '2-2',
          title: '2.2 装饰装修工程材料',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '2-3',
          title: '2.3 建筑功能材料',
          knowledgePoints: 10,
          totalQuestions: 40
        }]
      }, {
        id: 'architecture-2025-03',
        title: '第3章 建筑工程施工技术',
        subchapters: [{
          id: '3-1',
          title: '3.1 施工测量',
          knowledgePoints: 10,
          totalQuestions: 40
        }, {
          id: '3-2',
          title: '3.2 土石方工程施工',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '3-3',
          title: '3.3 地基与基础工程施工',
          knowledgePoints: 14,
          totalQuestions: 60
        }, {
          id: '3-4',
          title: '3.4 主体结构工程施工',
          knowledgePoints: 16,
          totalQuestions: 70
        }, {
          id: '3-5',
          title: '3.5 屋面与防水工程施工',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '3-6',
          title: '极速刷题',
          knowledgePoints: 14,
          totalQuestions: 60
        }, {
          id: '3-7',
          title: '3.7 智能建造新技术',
          knowledgePoints: 10,
          totalQuestions: 40
        }, {
          id: '3-8',
          title: '3.8 季节性施工技术',
          knowledgePoints: 8,
          totalQuestions: 30
        }]
      }, {
        id: 'architecture-2025-04',
        title: '第4章 相关法规',
        subchapters: [{
          id: '4-1',
          title: '4.1 建筑工程建设相关规定',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '极速刷题',
          title: '极速刷题',
          knowledgePoints: 14,
          totalQuestions: 60
        }]
      }, {
        id: 'architecture-2025-05',
        title: '第5章 相关标准',
        subchapters: [{
          id: '5-1',
          title: '5.1 建筑设计及质量控制相关规定',
          knowledgePoints: 10,
          totalQuestions: 极速刷题
        }, {
          id: '5-2',
          title: '5.2 地基基础工程相关规定',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '5-3',
          title: '5.3 主体结构工程相关规定',
          knowledgePoints: 14,
          totalQuestions: 60
        }, {
          id: '5-4',
          title: '5.4 装饰装修与屋面工程相关规定',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '5-5',
          title: '5.5 绿色建造的相关规定',
          knowledgePoints: 10,
          totalQuestions: 40
        }]
      }, {
        id: 'architecture-2025-06',
        title: '第6章 建筑工程企业资质与施工组织',
        subchapters: [{
          id: '6-1',
          title: '6.1 建筑工程企业资质',
          knowledgePoints: 8,
          totalQuestions: 30
        }, {
          id: '6-2',
          title: '6.2 施工项目管理机构',
          knowledgePoints: 10,
          totalQuestions: 40
        }, {
          id: '6-3',
          title: '6.3 施工组织设计',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '6-4',
          title: '6.4 施工平面布置',
          knowledgePoints: 10,
          totalQuestions: 40
        }, {
          id: '6-5',
          title: '6.5 极速刷题',
          knowledgePoints: 8,
          totalQuestions: 30
        }, {
          id: '6-6',
          title: '6.6 施工临时用水',
          knowledgePoints: 8,
          totalQuestions: 30
        }, {
          id: '6-极速刷题',
          title: '极速刷题',
          knowledgePoints: 10,
          totalQuestions: 40
        }, {
          id: '6-8',
          title: '6.8 工程施工资料',
          knowledgePoints: 12,
          totalQuestions: 50
        }]
      }, {
        id: 'architecture-2025-07',
        title: '第7章 工程招标投标与极速刷题',
        subchapters: [{
          id: '7-1',
          title: '7.1 工程招标投标',
          knowledgePoints: 14,
          totalQuestions: 60
        }, {
          id: '7-2',
          title: '7.2 工程合同管理',
          knowledgePoints: 16,
          totalQuestions: 70
        }]
      }, {
        id: 'architecture-2025-08',
        title: '第8章 施工进度管理',
        subchapters: [{
          id: '8-1',
          title: '8.1 施工进度控制方法应用',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '8-2',
          title: '8.2 施工进度计划编制与控制',
          knowledgePoints: 14,
          totalQuestions: 60
        }]
      }, {
        id: 'architecture-2025-09',
        title: '第9章 施工质量管理',
        subchapters: [{
          id: '9-1',
          title: '9.1 项目质量计划管理',
          knowledgePoints: 10,
          totalQuestions: 40
        }, {
          id: '9-2',
          title: '9.2 项目施工质量检查与检验',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '9-3',
          title: '9.3 工程质量通病防治',
          knowledgePoints: 14,
          totalQuestions: 极速刷题
        }, {
          id: '9-4',
          title: '9.4 工程质量验收管理',
          knowledgePoints: 16,
          totalQuestions: 70
        }]
      }, {
        id: 'architecture-2025-10',
        title: '第10章 施工成本管理',
        subchapters: [{
          id: '10-1',
          title: '10.1 施工成本计划及分解',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '10-2',
          title: '10.2 施工成本分析与控制',
          knowledgePoints: 14,
          totalQuestions: 60
        }, {
          id: '10-3',
          title: '10.3 施工成本管理绩效评价与考核',
          knowledgePoints: 10,
          totalQuestions: 40
        }]
      }, {
        id: 'architecture-2025-11',
        title: '第11章 施工安全管理',
        subchapters: [{
          id: '11-1',
          title: '11.1 施工安全生产管理计划',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '11-2',
          title: '11.2 施工安全生产检查',
          knowledgePoints: 14,
          totalQuestions: 60
        }, {
          id: '11-3',
          title: '11.3 施工安全生产管理要点',
          knowledgePoints: 16,
          totalQuestions: 70
        }, {
          id: '11-4',
          title: '11.4 常见施工生产安全事故及预防',
          knowledgePoints: 18,
          totalQuestions: 80
        }]
      }, {
        id: 'architecture-2025-12',
        title: '第12章 绿色建造及施工现场环境管理',
        subchapters: [{
          id: '12-1',
          title: '12.1 绿色建造及信息化技术应用管理',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '12-2',
          title: '12.2 绿色施工及环境保护',
          knowledgePoints: 极速刷题,
          totalQuestions: 60
        }, {
          id: '12-3',
          title: '12.3 施工现场消防',
          knowledgePoints: 10,
          totalQuestions: 极速刷题
        }]
      }, {
        id: 'architecture-2025-13',
        title: '第13章 施工资源管理',
        subchapters: [{
          id: '13-1',
          title: '13.极速刷题 材料与成品管理',
          knowledgePoints: 12,
          totalQuestions: 50
        }, {
          id: '13-2',
          title: '13.2 机械设备管理',
          knowledgePoints: 14,
          totalQuestions: 60
        }, {
          id: '13-3',
          title: '13.3 劳动用工管理',
          knowledgePoints: 16,
          totalQuestions: 70
        }]
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
      '极速刷题': '造价工程师',
      'supervising-engineer': '注册监理工程师'
    };
    return categoryNames[category] || '未知类别';
  };
  const handleStudyClick = (chapterId, subchapterId, subchapterTitle, event) => {
    event.stopPropagation();
    $w.utils.navigateTo({
      pageId: 'question-practice',
      params: {
        category: examCategory,
        specialty: specialty,
        chapter: chapterId,
        subchapter: subchapterId,
        subchapterTitle: subchapterTitle
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
      get极速刷题(category, specialty);
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
              <极速刷题 className="text-sm text-gray-600">
                {getCategoryName(examCategory)} - 2025年教材章节
              </极速刷题>
            </div>
          </div>
        </div>
      </div>

      {/* 章节卡片列表 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-4">
          {chapters.map(chapter => <div key={chapter.id} className="bg-white rounded-lg shadow-md p-4">
              {/* 章节标题 */}
              <h2 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">
                {chapter.title}
              </h2>
              
              {/* 小节列表 */}
              <div className="space-y-3">
                {chapter.subchapters.map(subchapter => <div key={subchapter.id} className="py-2">
                    {/* 第一行：小节名称 */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-blue-600">
                          {subchapter.title.split(' ')[0]}
                        </span>
                        <span className="text-sm text-gray-800 font-medium">
                          {subchapter.title.split(' ').slice(1).join(' ')}
                        </span>
                      </div>
                      
                      {/* 学习按钮 */}
                      <button onClick={e => handleStudyClick(chapter.id, subchapter.id, subchapter.title, e)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap">
                        <PlayCircle size={14} className="mr-1" />
                        学习
                      </button>
                    </div>
                    
                    {/* 第二行：知识点数量和题目数量 */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500 pl-6">
                      <div className="flex items-center space-x-1">
                        <BookOpen size={12} className="text-gray-400" />
                        <span>{subchapter.knowledgePoints}个知识点</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText size={12} className="text-gray-400" />
                        <span>{subchapter.totalQuestions}题</span>
                      </div>
                    </div>
                  </div>)}
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