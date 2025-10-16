// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, DollarSign, Gavel, Settings, Building, Road, Wrench, Droplets, Calculator, Book, FileText, Target, HardHat, Ruler, Zap, Shield, Clock, Users, BarChart3, TrendingUp, Award, Briefcase, Lightbulb, Package, Truck, Factory, Home, TreePine, Mountain, Waves, Wind, Sun, Leaf, Recycle, Anchor, Ship, Plane, Train, Car, Bus, Bike, MapPin, Navigation, Globe, Wifi, Battery, Plug, Power, Energy, Solar, Fire, Water, Earth, Tree, Flower, Growth, Farm, Garden, Park, Forest, Bridge, Tunnel, Railway, Station, Airport, Terminal, Warehouse, Office, Shop, School, Hospital, Hotel, Restaurant, Bank, Market, Mall, Center, Plaza, Stadium, Pool, Gym, Spa, Resort, Laboratory, Workshop, Studio, Gallery, Museum, Library, University, Academy, Institute, Mill, Refinery, Brewery, Distillery, Winery, Bakery, Kitchen, Cafe, Bar, Theater, Cinema, Stage, Platform, Stand, Box, Booth, Stall, Kiosk, Cart, Table, Chair, Bench, Sofa, Bed, Pillow, Curtain, Carpet, Floor, Wall, Door, Window, Gate, Fence, Roof, Lawn, Grass, Weed, Bush, Wood, Timber, Board, Plank, Beam, Post, Pole, Stick, Rod, Bar, Wire, Cable, Rope, String, Thread, Fabric, Cloth, Leather, Skin, Metal, Steel, Iron, Copper, Bronze, Brass, Aluminum, Silver, Gold, Platinum, Tin, Lead, Zinc, Nickel, Chrome, Titanium, Mercury, Carbon, Silicon, Sulfur, Phosphorus, Nitrogen, Oxygen, Hydrogen, Helium, Neon, Argon, Krypton, Xenon, Radon, Uranium, Plutonium, Thorium, Radium, Polonium, Bismuth, Antimony, Arsenic, Selenium, Tellurium, Iodine, Bromine, Chlorine, Fluorine, Boron, Gallium, Indium, Thallium, Astatine, Francium, Actinium, Protactinium, Neptunium, Americium, Curium, Berkelium, Californium, Einsteinium, Fermium, Mendelevium, Nobelium, Lawrencium, Rutherfordium, Dubnium, Seaborgium, Bohrium, Hassium, Meitnerium, Darmstadtium, Roentgenium, Copernicium, Nihonium, Flerovium, Moscovium, Livermorium, Tennessine, Oganesson } from 'lucide-react';

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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [examCategory, setExamCategory] = useState('');

  // 完整的课程数据
  const courseData = {
    'first-grade-constructor': [
      { id: 'public-economy', name: '建设工程经济', icon: DollarSign, color: 'bg-blue-600' },
      { id: 'public-law', name: '建设工程法规', icon: Gavel, color: 'bg-purple-600' },
      { id: 'public-management', name: '建设工程项目管理', icon: Settings, color: 'bg-green-600' },
      { id: 'architecture', name: '建筑工程', icon: Building, color: 'bg-blue-500' },
      { id: 'municipal', name: '市政公用工程', icon: Road, color: 'bg-green-500' },
      { id: 'mechanical-electrical', name: '机电工程', icon: Wrench, color: 'bg-purple-500' },
      { id: 'highway', name: '公路工程', icon: Road, color: 'bg-orange-500' },
      { id: 'water-conservancy', name: '水利水电工程', icon: Droplets, color: 'bg-teal-500' },
      { id: 'railway', name: '铁路工程', icon: Train, color: 'bg-red-500' },
      { id: 'mining', name: '矿业工程', icon: Mountain, color: 'bg-gray-600' },
      { id: 'metallurgy', name: '冶金工程', icon: Factory, color: 'bg-orange-600' },
      { id: 'petrochemical', name: '石油化工工程', icon: Factory, color: 'bg-indigo-600' },
      { id: 'communication', name: '通信与广电工程', icon: Wifi, color: 'bg-cyan-500' },
      { id: 'harbor-waterway', name: '港口与航道工程', icon: Ship, color: 'bg-blue-700' },
      { id: 'aviation', name: '民航机场工程', icon: Plane, color: 'bg-sky-500' }
    ],
    'second-grade-constructor': [
      { id: 'public-management-2', name: '建设工程施工管理', icon: Settings, color: 'bg-green-600' },
      { id: 'public-law-2', name: '建设工程法规', icon: Gavel, color: 'bg-purple-600' },
      { id: 'architecture-2', name: '建筑工程', icon: Building, color: 'bg-blue-500' },
      { id: 'municipal-2', name: '市政公用工程', icon: Road, color: 'bg-green-500' },
      { id: 'mechanical-electrical-2', name: '机电工程', icon: Wrench, color: 'bg-purple-500' },
      { id: 'highway-2', name: '公路工程', icon: Road, color: 'bg-orange-500' },
      { id: 'water-conservancy-2', name: '水利水电工程', icon: Droplets, color: 'bg-teal-500' },
      { id: 'mining-2', name: '矿业工程', icon: Mountain, color: 'bg-gray-600' },
      { id: 'metallurgy-2', name: '冶金工程', icon: Factory, color: 'bg-orange-600' },
      { id: 'petrochemical-2', name: '石油化工工程', icon: Factory, color: 'bg-indigo-600' },
      { id: 'communication-2', name: '通信与广电工程', icon: Wifi, color: 'bg-cyan-500' }
    ],
    'cost-engineer': [
      { id: 'cost-management', name: '建设工程造价管理', icon: Settings, color: 'bg-blue-600' },
      { id: 'cost-pricing', name: '建设工程计价', icon: Calculator, color: 'bg-orange-600' },
      { id: 'cost-technology', name: '建设工程技术与计量', icon: Wrench, color: 'bg-orange-500' },
      { id: 'cost-case', name: '建设工程造价案例分析', icon: FileText, color: 'bg-red-500' },
      { id: 'cost-installation', name: '安装工程', icon: Wrench, color: 'bg-purple-500' },
      { id: 'cost-transportation', name: '交通运输工程', icon: Road, color: 'bg-green-500' },
      { id: 'cost-water-conservancy', name: '水利工程', icon: Droplets, color: 'bg-teal-500' }
    ],
    'supervising-engineer': [
      { id: 'supervising-theory', name: '建设工程监理基本理论与相关法规', icon: Book, color: 'bg-indigo-600' },
      { id: 'supervising-contract', name: '建设工程合同管理', icon: FileText, color: 'bg-teal-600' },
      { id: 'supervising-control', name: '建设工程目标控制', icon: Target, color: 'bg-purple-500' },
      { id: 'supervising-case', name: '建设工程监理案例分析', icon: FileText, color: 'bg-indigo-500' },
      { id: 'supervising-architecture', name: '土木建筑工程', icon: Building, color: 'bg-blue-500' },
      { id: 'supervising-transportation', name: '交通运输工程', icon: Road, color: 'bg-green-500' },
      { id: 'supervising-water-conservancy', name: '水利工程', icon: Droplets, color: 'bg-teal-500' }
    ]
  };

  // 获取课程数据
  const getCoursesByCategory = async categoryCode => {
    try {
      setLoading(true);
      const courses = courseData[categoryCode] || [];
      setCourses(courses);
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取课程数据',
        variant: 'destructive'
      });
      setCourses(courseData[categoryCode] || []);
    } finally {
      setLoading(false);
    }
  };

  // 获取考试类别代码映射
  const getCategoryCode = category => {
    const categoryCodes = {
      'first-grade-constructor': 'first-grade-constructor',
      'second-grade-constructor': 'second-grade-constructor',
      'cost-engineer': 'cost-engineer',
      'supervising-engineer': 'supervising-engineer'
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
    const category = $w.page.dataset.params?.category;
    if (category) {
      setExamCategory(category);
      const categoryCode = getCategoryCode(category);
      getCoursesByCategory(categoryCode);
    } else {
      toast({
        title: '参数错误',
        description: '未找到考试类别参数',
        variant: 'destructive'
      });
      $w.utils.navigateBack();
    }
  }, [$w.page.dataset.params]);

  const handleCourseClick = course => {
    $w.utils.navigateTo({
      pageId: 'chapter-list',
      params: {
        category: examCategory,
        subject: course.id,
        courseTitle: course.name
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
    return (
      <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={handleBack} 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-800">
                {getCategoryName(examCategory)}
              </h1>
              <p className="text-sm text-gray-600">选择课程</p>
            </div>
          </div>
        </div>
      </div>

      {/* 课程网格 - 紧凑布局 */}
      <div className="max-w-4xl mx-auto px-3 py-4">
        <div className="grid grid-cols-2 gap-3">
          {courses.map(course => {
            const Icon = course.icon;
            return (
              <div 
                key={course.id} 
                onClick={() => handleCourseClick(course)} 
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full ${course.color} flex items-center justify-center mb-2`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                    {course.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* 提示信息 */}
        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无课程数据</p>
          </div>
        )}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}