// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, CheckCircle, Circle, TrendingUp, BookOpen } from 'lucide-react';

import { QuestionCard } from '@/components/QuestionCard';
import { QuestionNavigation } from '@/components/QuestionNavigation';
import { ProgressBar } from '@/components/ProgressBar';
import { TabBar } from '@/components/TabBar';
export default function QuestionPractice(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');

  // 2025年建筑工程题目数据
  const architectureQuestions2025 = {
    'chapter-1': [{
      id: 'q1-1',
      question: '下列关于建筑结构体系的说法，正确的是？',
      options: ['框架结构适用于高层建筑', '剪力墙结构适用于大跨度建筑', '筒体结构适用于超高层建筑', '桁架结构适用于住宅建筑'],
      correctAnswer: 2,
      explanation: '筒体结构具有良好的抗侧力性能，特别适用于超高层建筑。框架结构适用于中低层建筑，剪力墙结构适用于住宅等建筑，桁架结构主要用于大跨度公共建筑。',
      difficulty: '中等',
      knowledgePoint: '建筑结构体系'
    }, {
      id: 'q1-2',
      question: '建筑抗震设计中，下列哪项不是抗震设防目标？',
      options: ['小震不坏', '中震可修', '大震不倒', '强震可用'],
      correctAnswer: 3,
      explanation: '我国抗震设防目标为"小震不坏、中震可修、大震不倒"，没有"强震可用"这一目标。',
      difficulty: '简单',
      knowledgePoint: '建筑抗震设计'
    }, {
      id: 'q1-3',
      question: '下列关于建筑构造的说法，错误的是？',
      options: ['伸缩缝是为了防止温度变化引起的裂缝', '沉降缝是为了防止地基不均匀沉降', '防震缝是为了防止地震作用', '施工缝是为了防止混凝土收缩'],
      correctAnswer: 3,
      explanation: '施工缝是由于施工需要而设置的临时缝，不是为了防止混凝土收缩。伸缩缝、沉降缝、防震缝都是永久性构造缝。',
      difficulty: '中等',
      knowledgePoint: '建筑构造'
    }, {
      id: 'q1-4',
      question: '钢筋混凝土梁的截面有效高度是指？',
      options: ['梁的总高度', '梁高减去保护层厚度', '梁高减去保护层厚度和钢筋直径', '梁高减去保护层厚度、钢筋直径和箍筋直径'],
      correctAnswer: 3,
      explanation: '截面有效高度是指受拉钢筋重心至受压区边缘的距离，需要减去保护层厚度、钢筋直径和箍筋直径。',
      difficulty: '较难',
      knowledgePoint: '钢筋混凝土结构'
    }, {
      id: 'q1-5',
      question: '下列哪种基础形式适用于软弱地基？',
      options: ['独立基础', '条形基础', '筏板基础', '桩基础'],
      correctAnswer: 3,
      explanation: '桩基础通过将荷载传递到深层坚实土层，特别适用于软弱地基。其他基础形式适用于承载力较好的地基。',
      difficulty: '中等',
      knowledgePoint: '地基基础'
    }],
    'chapter-2': [{
      id: 'q2-1',
      question: '施工组织设计中，施工总平面图的设计原则不包括？',
      options: ['满足施工需要', '符合环保要求', '追求美观效果', '考虑安全因素'],
      correctAnswer: 2,
      explanation: '施工总平面图的设计原则包括满足施工需要、符合环保要求、考虑安全因素等，美观效果不是主要设计原则。',
      difficulty: '简单',
      knowledgePoint: '施工组织设计'
    }, {
      id: 'q2-2',
      question: '网络计划中，关键工作的特点是？',
      options: ['总时差最大', '自由时差最大', '总时差最小', '持续时间最长'],
      correctAnswer: 2,
      explanation: '关键工作的总时差最小，通常为0。关键工作决定了项目的总工期。',
      difficulty: '中等',
      knowledgePoint: '网络计划技术'
    }, {
      id: 'q2-3',
      question: '下列关于施工进度控制的说法，正确的是？',
      options: ['进度控制只需在施工阶段进行', '进度控制是动态的管理过程', '进度控制不需要考虑资源因素', '进度控制只关注关键线路'],
      correctAnswer: 1,
      explanation: '进度控制是一个动态的管理过程，需要在项目全生命周期内进行，需要综合考虑资源、技术、环境等多种因素。',
      difficulty: '中等',
      knowledgePoint: '施工进度控制'
    }],
    'chapter-3': [{
      id: 'q3-1',
      question: '《建筑法》规定，建筑工程开工前，建设单位应当按照国家有关规定向哪个部门申请领取施工许可证？',
      options: ['城市规划部门', '建设行政主管部门', '土地管理部门', '环境保护部门'],
      correctAnswer: 1,
      explanation: '根据《建筑法》第七条规定，建筑工程开工前，建设单位应当按照国家有关规定向工程所在地县级以上人民政府建设行政主管部门申请领取施工许可证。',
      difficulty: '简单',
      knowledgePoint: '建筑法规'
    }, {
      id: 'q3-2',
      question: '下列关于建设工程质量保修的说法，错误的是？',
      options: ['基础设施工程的保修期为设计文件规定的合理使用年限', '屋面防水工程的保修期为5年', '电气管线工程的保修期为2年', '装修工程的保修期为1年'],
      correctAnswer: 3,
      explanation: '根据《建设工程质量管理条例》，装修工程的保修期为2年，不是1年。其他选项的保修期规定是正确的。',
      difficulty: '中等',
      knowledgePoint: '工程质量保修'
    }]
  };

  // 获取题目数据
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const category = $w.page.dataset.params?.category;
      const subject = $w.page.dataset.params?.subject;
      const chapter = $w.page.dataset.params?.chapter;
      const chapterTitle = $w.page.dataset.params?.chapterTitle;
      if (!category || !subject || !chapter) {
        toast({
          title: '参数错误',
          description: '缺少必要的参数',
          variant: 'destructive'
        });
        return;
      }
      setCategory(category);
      setSubject(subject);
      setChapter(chapter);
      setChapterTitle(chapterTitle);

      // 从数据库获取题目
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'questions',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              $and: [{
                category: {
                  $eq: category
                }
              }, {
                subject: {
                  $eq: subject
                }
              }, {
                chapter: {
                  $eq: chapter
                }
              }]
            }
          },
          orderBy: [{
            order: 'asc'
          }],
          select: {
            $master: true
          }
        }
      });
      if (result.records && result.records.length > 0) {
        setQuestions(result.records);
      } else {
        // 使用默认的2025年建筑工程题目
        const defaultQuestions = architectureQuestions2025[chapter] || [];
        setQuestions(defaultQuestions);
      }
    } catch (error) {
      console.error('获取题目失败:', error);
      // 使用默认题目
      const chapter = $w.page.dataset.params?.chapter;
      const defaultQuestions = architectureQuestions2025[chapter] || [];
      setQuestions(defaultQuestions);
    } finally {
      setLoading(false);
    }
  };

  // 处理答案选择
  const handleAnswerSelect = answerIndex => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);

    // 记录用户答案
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  // 下一题
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowAnswer(false);
    }
  };

  // 上一题
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || '');
      setShowAnswer(!!userAnswers[currentQuestionIndex - 1]);
    }
  };

  // 重置练习
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowAnswer(false);
    setUserAnswers({});
  };

  // 收藏题目
  const handleFavorite = () => {
    toast({
      title: '收藏成功',
      description: '题目已添加到收藏夹',
      className: 'bg-blue-500 text-white'
    });
  };

  // 标记题目
  const handleFlag = () => {
    toast({
      title: '已标记',
      description: '题目已标记，方便后续复习',
      className: 'bg-yellow-500 text-white'
    });
  };

  // 计算答题统计
  const getAnswerStats = () => {
    const total = questions.length;
    const answered = Object.keys(userAnswers).length;
    const correct = Object.entries(userAnswers).filter(([index, answer]) => answer === questions[parseInt(index)].correctAnswer).length;
    return {
      total,
      answered,
      correct
    };
  };
  const stats = getAnswerStats();

  // 返回上一页
  const handleBack = () => {
    $w.utils.navigateBack();
  };

  // 处理底部导航切换
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
    fetchQuestions();
  }, []);
  if (loading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  if (questions.length === 0) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">暂无题目数据</p>
        </div>
      </div>;
  }
  const currentQuestion = questions[currentQuestionIndex];
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="ml-4">
                <h1 className="text-lg font-bold text-gray-800">{chapterTitle}</h1>
                <p className="text-sm text-gray-600">
                  题目 {currentQuestionIndex + 1} / {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="text-sm text-gray-600">正确率</div>
                <div className="text-lg font-bold text-green-600">
                  {stats.answered > 0 ? Math.round(stats.correct / stats.answered * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} chapterTitle={chapterTitle} />
      </div>

      {/* 题目内容 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <QuestionCard question={currentQuestion} selectedAnswer={selectedAnswer} showAnswer={showAnswer} onAnswerSelect={handleAnswerSelect} />
      </div>

      {/* 答题统计 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <p className="text-sm text-gray-600">总题数</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.answered}</div>
              <p className="text-sm text-gray-600">已答</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.correct}</div>
              <p className="text-sm text-gray-600">正确</p>
            </div>
          </div>
        </div>
      </div>

      {/* 导航控制 */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <QuestionNavigation currentIndex={currentQuestionIndex} totalQuestions={questions.length} onPrevious={handlePrevious} onNext={handleNext} onReset={handleReset} onFavorite={handleFavorite} onFlag={handleFlag} showAnswer={showAnswer} />
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}