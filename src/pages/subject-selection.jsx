// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Building, Road, Wrench, Droplets, BookOpen, Ship, Train, Plane, Satellite, Mountain } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function SubjectSelection(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [examCategory, setExamCategory] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 从 exams 集合获取专业数据
  const getSubjectsByCategory = async categoryCode => {
    try {
      setIsLoading(true);
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
        const exam = typeof result.records[0] === 'string' ? JSON.parse(result.records[0]) : result.records[0];
        const allSubjects = [];

        // 提取所有专业
        if (exam.categories && Array.isArray(exam.categories)) {
          exam.categories.forEach(category => {
            if (category.subjects && Array.isArray(category.subjects)) {
              category.subjects.forEach(subject => {
                allSubjects.push({
                  id: subject.id,
                  name: subject.name,
                  questionCount: subject.questionCount || 0,
                  categoryName: category.name
                });
              });
            }
          });
        }

        // 为专业分配图标
        const subjectsWithIcons = allSubjects.map(subject => {
          let icon = BookOpen;
          let color = 'bg-gray-500';

          // 根据专业名称分配图标和颜色
          if (subject.name.includes('建筑工程') || subject.name.includes('土木建筑')) {
            icon = Building;
            color = 'bg-blue-500';
          } else if (subject.name.includes('公路工程') || subject.name.includes('交通运输')) {
            icon = Road;
            color = 'bg-green-500';
          } else if (subject.name.includes('机电工程')) {
            icon = Wrench;
            color = 'bg-purple-500';
          } else if (subject.name.includes('水利水电') || subject.name.includes('水利工程')) {
            icon = Droplets;
            color = 'bg-teal-500';
          } else if (subject.name.includes('市政公用')) {
            icon = Road;
            color = 'bg-orange-500';
          } else if (subject.name.includes('港口与航道')) {
            icon = Ship;
            color = 'bg-indigo-500';
          } else if (subject.name.includes('铁路工程')) {
            icon = Train;
            color = 'bg-red-500';
          } else if (subject.name.includes('民航机场')) {
            icon = Plane;
            color = 'bg-pink-500';
          } else if (subject.name.includes('通信与广电')) {
            icon = Satellite;
            color = 'bg-yellow-500';
          } else if (subject.name.includes('矿业工程')) {
            icon = Mountain;
            color = 'bg-gray-600';
          }
          return {
            ...subject,
            icon,
            color,
            description: `${subject.categoryName} · ${subject.questionCount}题`
          };
        });
        setSubjects(subjectsWithIcons);
      } else {
        // 使用默认数据作为备选
        setDefaultSubjects(categoryCode);
      }
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取专业数据',
        variant: 'destructive'
      });
      setDefaultSubjects(categoryCode);
    } finally {
      setIsLoading(false);
    }
  };

  // 默认专业数据
  const setDefaultSubjects = categoryCode => {
    const defaultData = {
      'yjjzs': [{
        id: 'architecture',
        name: '建筑工程',
        icon: Building,
        color: 'bg-blue-500',
        description: '建筑工程 · 700题'
      }, {
        id: 'municipal',
        name: '市政公用工程',
        icon: Road,
        color: 'bg-green-500',
        description: '市政公用工程 · 720题'
      }, {
        id: 'mechanical-electrical',
        name: '机电工程',
        icon: Wrench,
        color: 'bg-purple-500',
        description: '机电工程 · 690题'
      }, {
        id: 'highway',
        name: '公路工程',
        icon: Road,
        color: 'bg-orange-500',
        description: '公路工程 · 650题'
      }, {
        id: 'water-conservancy',
        name: '水利水电工程',
        icon: Droplets,
        color: 'bg-teal-500',
        description: '水利水电工程 · 680题'
      }, {
        id: 'railway',
        name: '铁路工程',
        icon: Train,
        color: 'bg-red-500',
        description: '铁路工程 · 620题'
      }, {
        id: 'port-waterway',
        name: '港口与航道工程',
        icon: Ship,
        color: 'bg-indigo-500',
        description: '港口与航道工程 · 590题'
      }, {
        id: 'aviation',
        name: '民航机场工程',
        icon: Plane,
        color: 'bg-pink-500',
        description: '民航机场工程 · 580题'
      }, {
        id: 'communication',
        name: '通信与广电工程',
        icon: Satellite,
        color: 'bg-yellow-500',
        description: '通信与广电工程 · 560题'
      }, {
        id: 'mining',
        name: '矿业工程',
        icon: Mountain,
        color: 'bg-gray-600',
        description: '矿业工程 · 610题'
      }],
      'ejjzs': [{
        id: 'architecture-2',
        name: '建筑工程',
        icon: Building,
        color: 'bg-blue-500',
        description: '建筑工程 · 500题'
      }, {
        id: 'municipal-2',
        name: '市政公用工程',
        icon: Road,
        color: 'bg-green-500',
        description: '市政公用工程 · 520题'
      }, {
        id: 'mechanical-electrical-2',
        name: '机电工程',
        icon: Wrench,
        color: 'bg-purple-500',
        description: '机电工程 · 490题'
      }, {
        id: 'highway-2',
        name: '公路工程',
        icon: Road,
        color: 'bg-orange-500',
        description: '公路工程 · 480题'
      }, {
        id: 'water-conservancy-2',
        name: '水利水电工程',
        icon: Droplets,
        color: 'bg-teal-500',
        description: '水利水电工程 · 470题'
      }, {
        id: 'mining-2',
        name: '矿业工程',
        icon: Mountain,
        color: 'bg-gray-600',
        description: '矿业工程 · 460题'
      }],
      'zjgcs': [{
        id: 'cost-construction',
        name: '土木建筑工程',
        icon: Building,
        color: 'bg-blue-500',
        description: '土木建筑工程 · 550题'
      }, {
        id: 'cost-installation',
        name: '安装工程',
        icon: Wrench,
        color: 'bg-purple-500',
        description: '安装工程 · 520题'
      }],
      'jlgcs': [{
        id: 'supervising-civil',
        name: '土木建筑工程',
        icon: Building,
        color: 'bg-blue-500',
        description: '土木建筑工程 · 500题'
      }, {
        id: 'supervising-transport',
        name: '交通运输工程',
        icon: Road,
        color: 'bg-green-500',
        description: '交通运输工程 · 480题'
      }, {
        id: 'supervising-water',
        name: '水利工程',
        icon: Droplets,
        color: 'bg-teal-500',
        description: '水利工程 · 470题'
      }]
    };
    setSubjects(defaultData[categoryCode] || []);
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
    // 从页面参数获取考试类别
    const category = $w.page.dataset.params?.category;
    if (category) {
      setExamCategory(category);
      const categoryCode = getCategoryCode(category);
      getSubjectsByCategory(categoryCode);
    } else {
      toast({
        title: '参数错误',
        description: '未找到考试类别参数',
        variant: 'destructive'
      });
      $w.utils.navigateBack();
    }
  }, [$w.page.dataset.params]);
  const handleSubjectClick = subject => {
    toast({
      title: '选择专业',
      description: `已选择${subject.name}专业`
    });

    // 跳转到练习模式选择页面
    $w.utils.navigateTo({
      pageId: 'practice-mode',
      params: {
        category: examCategory,
        subject: subject.id
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
  if (isLoading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-800">
                {getCategoryName(examCategory)}
              </h1>
              <p className="text-sm text-gray-600">选择专业方向</p>
            </div>
          </div>
        </div>
      </div>

      {/* 专业方向网格 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {subjects.map(subject => {
          const Icon = subject.icon;
          return <div key={subject.id} onClick={() => handleSubjectClick(subject)} className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full ${subject.color} flex items-center justify-center mb-3`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {subject.description}
                  </p>
                </div>
              </div>;
        })}
        </div>

        {/* 提示信息 */}
        {subjects.length === 0 && <div className="text-center py-12">
            <p className="text-gray-500">暂无专业数据</p>
          </div>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}