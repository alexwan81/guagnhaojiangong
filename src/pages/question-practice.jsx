// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 获取题目数据
  const getQuestions = async (category, subject, chapter, mode) => {
    try {
      setIsLoading(true);
      let query = {};

      // 根据模式构建查询条件
      if (mode === 'chapter-practice' && chapter) {
        query.chapterId = chapter;
      } else if (mode === 'special-practice') {
        // AI错题强化 - 这里可以添加错题筛选逻辑
        query.difficulty = {
          $gte: 3
        }; // 难度较高的题目
      } else if (mode === 'past-papers') {
        // 历年真题
        query.source = '历年真题';
      }
      if (subject) {
        query.subjectId = subject;
      }
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'questions',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              $and: Object.keys(query).map(key => ({
                [key]: typeof query[key] === 'object' ? query[key] : {
                  $eq: query[key]
                }
              }))
            }
          },
          select: {
            $master: true
          },
          pageSize: 50,
          pageNumber: 1
        }
      });
      if (result.records && result.records.length > 0) {
        // 解析JSON字符串
        const parsedQuestions = result.records.map(record => {
          try {
            return typeof record === 'string' ? JSON.parse(record) : record;
          } catch {
            return record;
          }
        });
        setQuestions(parsedQuestions);
      } else {
        // 使用示例题目数据
        setQuestions([{
          _id: 'q_001',
          question: '关于建设工程项目管理的说法，正确的是？',
          type: 'single',
          options: ['A. 项目管理的核心任务是项目的目标控制', 'B. 项目管理的核心任务是项目的组织协调', 'C. 项目管理的核心任务是项目的风险管理', 'D. 项目管理的核心任务是项目的投资控制'],
          answer: 'A',
          analysis: '项目管理的核心任务是项目的目标控制，包括进度、质量、成本等目标。',
          difficulty: 2,
          chapterId: 'chapter_001'
        }, {
          _id: 'q_002',
          question: '下列哪些属于建设工程项目的特征？',
          type: 'multi',
          options: ['A. 一次性', 'B. 独特性', 'C. 目标的明确性', 'D. 组织的临时性'],
          answer: 'A,B,C,D',
          analysis: '建设工程项目具有一次性、独特性、目标的明确性、组织的临时性等特征。',
          difficulty: 3,
          chapterId: 'chapter_001'
        }]);
      }
    } catch (error) {
      toast({
        title: '数据加载失败',
        description: '无法获取题目数据',
        variant: 'destructive'
      });
      // 使用默认题目数据
      setQuestions([{
        _id: 'q_001',
        question: '关于建设工程项目管理的说法，正确的是？',
        type: 'single',
        options: ['A. 项目管理的核心任务是项目的目标控制', 'B. 项目管理的核心任务是项目的组织协调', 'C. 项目管理的核心任务是项目的风险管理', 'D. 项目管理的核心任务是项目的投资控制'],
        answer: 'A',
        analysis: '项目管理的核心任务是项目的目标控制，包括进度、质量、成本等目标。',
        difficulty: 2,
        chapterId: 'chapter_001'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 计时器
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 初始化
  useEffect(() => {
    const category = $w.page.dataset.params?.category;
    const subject = $w.page.dataset.params?.subject;
    const chapter = $w.page.dataset.params?.chapter;
    const mode = $w.page.dataset.params?.mode;
    if (category && subject) {
      getQuestions(category, subject, chapter, mode);
    } else {
      toast({
        title: '参数错误',
        description: '未找到必要的参数',
        variant: 'destructive'
      });
      $w.utils.navigateBack();
    }
  }, [$w.page.dataset.params]);
  const handleAnswerSelect = answer => {
    const currentQ = questions[currentQuestion];
    if (currentQ.type === 'single') {
      setUserAnswers(prev => ({
        ...prev,
        [currentQ._id]: answer
      }));
    } else if (currentQ.type === 'multi') {
      const currentAnswers = prev[currentQ._id] || [];
      if (currentAnswers.includes(answer)) {
        setUserAnswers(prev => ({
          ...prev,
          [currentQ._id]: currentAnswers.filter(a => a !== answer)
        }));
      } else {
        setUserAnswers(prev => ({
          ...prev,
          [currentQ._id]: [...currentAnswers, answer]
        }));
      }
    }
  };
  const handleSubmit = () => {
    if (!userAnswers[questions[currentQuestion]._id]) {
      toast({
        title: '请选择答案',
        description: '请先选择一个答案再提交',
        variant: 'destructive'
      });
      return;
    }
    setShowAnalysis(true);
  };
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowAnalysis(false);
    } else {
      toast({
        title: '已完成',
        description: '已经是最后一题了'
      });
    }
  };
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowAnalysis(false);
    }
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

  // 格式化时间
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 检查答案是否正确
  const isAnswerCorrect = () => {
    const currentQ = questions[currentQuestion];
    const userAnswer = userAnswers[currentQ._id];
    if (!userAnswer) return false;
    if (currentQ.type === 'single') {
      return userAnswer === currentQ.answer;
    } else if (currentQ.type === 'multi') {
      const correctAnswers = currentQ.answer.split(',');
      return userAnswer.length === correctAnswers.length && userAnswer.every(answer => correctAnswers.includes(answer));
    }
    return false;
  };
  if (isLoading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  if (questions.length === 0) {
    return <div style={style} className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center">
              <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-800">答题练习</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <AlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">暂无题目数据</p>
        </div>
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>;
  }
  const currentQ = questions[currentQuestion];
  const userAnswer = userAnswers[currentQ._id];
  const isCorrect = showAnalysis ? isAnswerCorrect() : null;
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 头部 - 进度和计时器 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-800">答题练习</h1>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span>第 {currentQuestion + 1} 题 / 共 {questions.length} 题</span>
                </div>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
              <Clock size={16} className="text-blue-600 mr-2" />
              <span className="text-blue-600 font-medium">{formatTime(timeElapsed)}</span>
            </div>
          </div>

          {/* 进度条 */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{
            width: `${(currentQuestion + 1) / questions.length * 100}%`
          }} />
          </div>
        </div>
      </div>

      {/* 题目内容 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className={`w-8 h-8 rounded-full ${currentQ.difficulty >= 3 ? 'bg-red-100 text-red-600' : currentQ.difficulty >= 2 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'} flex items-center justify-center mr-3`}>
              <span className="text-sm font-bold">{currentQ.difficulty >= 3 ? '难' : currentQ.difficulty >= 2 ? '中' : '易'}</span>
            </div>
            <span className="text-sm text-gray-500 capitalize">{currentQ.type === 'single' ? '单选题' : currentQ.type === 'multi' ? '多选题' : '案例题'}</span>
          </div>

          <h2 className="text-lg font-medium text-gray-800 mb-6 leading-relaxed">
            {currentQ.question}
          </h2>

          {/* 选项区域 */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
            const optionKey = option.split('.')[0];
            const isSelected = userAnswer && (currentQ.type === 'single' ? userAnswer === optionKey : currentQ.type === 'multi' ? userAnswer.includes(optionKey) : false);
            const isCorrectOption = showAnalysis && currentQ.answer.includes(optionKey);
            const isWrongSelected = showAnalysis && isSelected && !isCorrectOption;
            let bgColor = 'bg-white';
            let borderColor = 'border-gray-300';
            let textColor = 'text-gray-800';
            if (showAnalysis) {
              if (isCorrectOption) {
                bgColor = 'bg-green-50';
                borderColor = 'border-green-300';
                textColor = 'text-green-800';
              } else if (isWrongSelected) {
                bgColor = 'bg-red-50';
                borderColor = 'border-red-300';
                textColor = 'text-red-800';
              }
            } else if (isSelected) {
              bgColor = 'bg-blue-50';
              borderColor = 'border-blue-300';
              textColor = 'text-blue-800';
            }
            return <div key={index} onClick={() => !showAnalysis && handleAnswerSelect(optionKey)} className={`border rounded-lg p-4 cursor-pointer transition-all ${bgColor} ${borderColor} ${textColor} ${!showAnalysis && 'hover:border-blue-400 hover:bg-blue-50'}`}>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                    {isSelected && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <span className="flex-1">{option}</span>
                  {showAnalysis && isCorrectOption && <CheckCircle size={20} className="text-green-500 ml-2" />}
                  {showAnalysis && isWrongSelected && <XCircle size={20} className="text-red-500 ml-2" />}
                </div>
              </div>;
          })}
          </div>
        </div>

        {/* 解析区域 */}
        {showAnalysis && <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <BookOpen size={20} className="text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">题目解析</h3>
            </div>
            
            <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center">
                {isCorrect ? <CheckCircle size={20} className="text-green-500 mr-2" /> : <XCircle size={20} className="text-red-500 mr-2" />}
                <span className={isCorrect ? 'text-green-800 font-medium' : 'text-red-800 font-medium'}>
                  {isCorrect ? '回答正确！' : '回答错误'}
                </span>
              </div>
              {!isCorrect && <p className="text-red-600 mt-2 text-sm">正确答案: {currentQ.answer}</p>}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">解析：</h4>
              <p className="text-gray-600 leading-relaxed">{currentQ.analysis}</p>
            </div>
          </div>}

        {/* 操作按钮 */}
        <div className="flex justify-between items-center">
          <button onClick={handlePrevQuestion} disabled={currentQuestion === 0} className={`flex items-center px-4 py-2 rounded-lg ${currentQuestion === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <ChevronLeft size={16} className="mr-1" />
            上一题
          </button>

          {!showAnalysis ? <button onClick={handleSubmit} disabled={!userAnswer} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
              提交答案
            </button> : <button onClick={handleNextQuestion} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              下一题
            </button>}

          <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1} className={`flex items-center px-4 py-2 rounded-lg ${currentQuestion === questions.length - 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            下一题
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}