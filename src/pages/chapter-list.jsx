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
          title: '极速刷题 建筑构造设计的基本要求',
          knowledgePoints: 15,
          totalQuestions: 65
        }, {
          id: '1-3',
          title: '1.3 建筑结构体系和设计作用（荷载）',
          knowledgePoints: 18,
          totalQuestions: 80
        }, {
          id: '极速刷题',
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
极速刷题 }, {
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
          title: '3.6 装饰装修工程施工',
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
          id: '4-2',
          title: '4.2 安全生产及施工现场管理相关规定',
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
          totalQuestions: 40
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
          id: '6-极速刷题',
          title: '6.5 施工临时用电',
          knowledgePoints: 8,
          totalQuestions: 30
        }, {
          id: '6-6',
          title: '6.6 施工临时用水',
          knowledgePoints: 8,
          totalQuestions: 30
        }, {
          id: '6-7',
          title: '6.7 施工检验与试验',
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
        title: '第7章 工程招标投标与合同管理',