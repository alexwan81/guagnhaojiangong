// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, BookOpen, PlayCircle, CheckCircle, Clock, FileText } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function SubchapterList(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [subchapters, setSubchapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterId, setChapterId] = useState('');

  // 第1章 建筑工程设计技术 的5个小节（2025年教材精确版本）
  const subchapterData = {
    'architecture-2025-01': [{
      id: 'architecture-1-1',
      title: '1.1 建筑物的构成与设计要求',
      subtitle: '建筑物分类与设计要求',
      section: '1.1',
      importance: 'high',
      knowledgePoints: 16,
      studyHours: 3.5,
      totalQuestions: 70,
      description: '建筑物分类（民用建筑、工业建筑、农业建筑）、建筑物构成体系（结构体系、围护体系、设备体系）、建筑设计要求（功能、技术、经济、美观、环保）'
    }, {
      id: 'architecture-1-2',
      title: '1.2 建筑构造设计的基本要求',
      subtitle: '建筑构造设计原理',
      section: '1.2',
      importance: 'high',
      knowledgePoints: 15,
      studyHours: 3,
      totalQuestions: 65,
      description: '建筑构造设计原则、建筑构件连接构造、建筑防水构造、建筑保温隔热构造、建筑隔声构造、建筑防火构造要求'
    }, {
      id: 'architecture-1-3',
      title: '1.3 建筑结构体系和设计作用(荷载)',
      subtitle: '结构体系与荷载设计',
      section: '1.3',
      importance: 'high',
      knowledgePoints: 18,
      studyHours: 4,
      totalQuestions: 80,
      description: '建筑结构体系类型（框架结构、剪力墙结构、框架-剪力墙结构、筒体结构等）、设计作用（荷载）分类、荷载组合与计算、结构体系选择原则'
    }, {
      id: 'architecture-1-4',
      title: '1.4 建筑结构设计构造基本要求',
      subtitle: '结构设计构造规范',
      section: '1.4',
      importance: 'high',
      knowledgePoints: 14,
      studyHours: 3,
      totalQuestions: 60,
      description: '混凝土结构构造要求、钢结构构造要求、砌体结构构造要求、结构构件连接构造、结构抗震构造措施、结构耐久性构造要求'
    }, {
      id: 'architecture-1-5',
      title: '1.5 装配式建筑设计基本要求',
      subtitle: '装配式建筑技术规范',
      section: '1.5',
      importance: 'medium',
      knowledgePoints: 12,
      studyHours: 2.5,
      totalQuestions: 50,
      description: '装配式建筑概念与分类、装配式建筑设计原则、预制构件设计、连接节点设计、装配式建筑评价标准、装配式建筑质量控制要求'
    }]
  };
  const getSubchapters = chapterId => {
    try {
      setLoading(true);
      const subchapters = subchapterData[chapterId] || [];
      setSubchapters(subchapters);
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取小节数据',
        variant: 'destructive'
      });
      setSubchapters([]);
    } finally {
      setLoading(false);
    }
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
  const handlePracticeClick = (subchapter, event) => {
    event.stopPropagation();
    $w.utils.navigateTo({
      pageId: 'question-practice',
      params: {
        category: $w.page.dataset.params?.category,
        specialty: $w.page.dataset.params?.specialty,
        chapter: chapterId,
        subchapter: subchapter.id,
        subchapterTitle: subchapter.title
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
    const chapterId = $w.page.dataset.params?.chapter;
    const chapterTitle = $w.page.dataset.params?.chapterTitle;
    if (chapterId) {
      setChapterId(chapterId);
      setChapterTitle(chapterTitle);
      getSubchapters(chapterId);
    } else {
      toast({
        title: '参数错误',
        description: '未找到章节参数',
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
                {chapterTitle}
              </h1>
              <p className="text-sm text-gray-600">
                2025年教材 - 共{subchapters.length}个小节
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 小节列表 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-3">
          {subchapters.map(subchapter => <div key={subchapter.id} className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {subchapter.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(subchapter.importance)}`}>
                      {getImportanceLabel(subchapter.importance)}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    {subchapter.subtitle}
                  </h4>
                  
                  <p className="text-xs text-gray-500 mb-2">
                    {subchapter.description}
                  </p>
                  
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center">
                      <BookOpen size={12} className="mr-1" />
                      {subchapter.knowledgePoints}个知识点
                    </span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {subchapter.studyHours}小时
                    </span>
                    <span className="flex items-center">
                      <FileText size={12} className="mr-1" />
                      {subchapter.totalQuestions}题
                    </span>
                  </div>
                </div>
                
                {/* 练习按钮 */}
                <button onClick={e => handlePracticeClick(subchapter, e)} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap ml-4">
                  <PlayCircle size={16} className="mr-1" />
                  练习
                </button>
              </div>
            </div>)}
        </div>

        {/* 提示信息 */}
        {subchapters.length === 0 && <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen size={48} className="mx-auto mb-2" />
            </div>
            <p className="text-gray-500 text-lg">暂无小节数据</p>
            <p className="text-gray-400 text-sm mt-2">请检查章节选择是否正确</p>
          </div>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}