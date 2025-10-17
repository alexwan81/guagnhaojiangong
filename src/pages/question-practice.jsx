// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Clock, BookOpen } from 'lucide-react';

// @ts-ignore;
import { QuestionCard } from '@/components/QuestionCard';
// @ts-ignore;
import { QuestionNavigation } from '@/components/QuestionNavigation';
// @ts-ignore;
import { ProgressBar } from '@/components/ProgressBar';
export default function QuestionPractice(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [examCategory, setExamCategory] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [chapter, setChapter] = useState('');
  const [subchapter, setSubchapter] = useState('');
  const [subchapterTitle, setSubchapterTitle] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef(null);

  // 模拟题目数据
  const mockQuestions = [{
    id: 'q1',
    question: '下列关于建筑结构体系的说法，正确的是？',
    options: ['框架结构适用于高层建筑', '剪力墙结构适用于大跨度建筑', '框架-剪力墙结构结合了两种结构的优点', '筒体结构不适用于超高层建筑'],
    correctAnswer: 2,
    explanation: '框架-剪力墙结构结合了框架结构的灵活性和剪力墙结构的抗侧力能力，适用于中高层建筑。'
  }, {
    id: 'q2',
    question: '建筑荷载分为哪几类？',
    options: ['永久荷载、可变荷载、偶然荷载', '静荷载、动荷载', '垂直荷载、水平荷载', '重力荷载、风荷载、地震荷载'],
    correctAnswer: 0,
    explanation: '根据《建筑结构荷载规范》，建筑荷载分为永久荷载、可变荷载和偶然荷载三类。'
  }, {
    id: 'q3',
    question: '装配式建筑的优点包括？',
    options: ['施工速度快', '质量控制好', '环境影响小', '以上都是'],
    correctAnswer: 3,
    explanation: '装配式建筑具有施工速度快、质量控制好、环境影响小、节约劳动力等多重优点。'
  }];

  // 获取题目数据
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      setQuestions(mockQuestions);
    } catch (error) {
      toast({
        title: '获取题目失败',
        description: '无法加载题目数据，请重试',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  const handleSubmit = () => {
    setShowResults(true);
    clearInterval(timerRef.current);

    // 通知父页面该小节已完成
    if (window.opener) {
      window.opener.postMessage({
        type: 'subchapterCompleted',
        subchapterId: subchapter
      }, '*');
    } else if (window.parent) {
      window.parent.postMessage({
        type: 'subchapterCompleted',
        subchapterId: subchapter
      }, '*');
    }

    // 保存到本地存储
    const key = `completed_${examCategory}_${specialty}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    if (!existing.includes(subchapter)) {
      existing.push(subchapter);
      localStorage.setItem(key, JSON.stringify(existing));
    }
  };
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeElapsed(0);
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round(correct / questions.length * 100)
    };
  };
  useEffect(() => {
    const category = $w.page.dataset.params?.category;
    const specialty = $w.page.dataset.params?.specialty;
    const chapter = $w.page.dataset.params?.chapter;
    const subchapter = $w.page.dataset.params?.subchapter;
    const subchapterTitle = $w.page.dataset.params?.subchapterTitle;
    if (category && specialty && chapter && subchapter) {
      setExamCategory(category);
      setSpecialty(specialty);
      setChapter(chapter);
      setSubchapter(subchapter);
      setSubchapterTitle(subchapterTitle);
      fetchQuestions();
    } else {
      toast({
        title: '参数错误',
        description: '缺少必要的练习参数',
        variant: 'destructive'
      });
    }
  }, [$w.page.dataset.params]);
  useEffect(() => {
    if (!showResults) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [showResults]);
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  if (loading) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }
  if (showResults) {
    const score = calculateScore();
    return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">练习完成</h1>
              <p className="text-gray-600">{subchapterTitle}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {score.percentage}%
                </div>
                <p className="text-gray-600">
                  答对 {score.correct} / {score.total} 题
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  用时：{formatTime(timeElapsed)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
              const userAnswer = userAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              return <div key={question.id} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => <div key={optIndex} className={`p-2 rounded text-sm ${optIndex === question.correctAnswer ? 'bg-green-100 text-green-800' : optIndex === userAnswer ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'}`}>
                          {option}
                        </div>)}
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                      <p className="font-medium text-blue-800">解析：</p>
                      <p className="text-blue-700">{question.explanation}</p>
                    </div>
                  </div>;
            })}
            </div>

            <div className="flex space-x-4 mt-6">
              <button onClick={handleRestart} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <RotateCcw size={18} className="mr-2" />
                重新练习
              </button>
              <button onClick={handleBack} className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
                返回章节
              </button>
            </div>
          </div>
        </div>
      </div>;
  }
  if (questions.length === 0) {
    return <div style={style} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">暂无题目</p>
        </div>
      </div>;
  }
  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length * 100;
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 头部 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="text-center flex-1">
              <h1 className="text-lg font-bold text-gray-800">{subchapterTitle}</h1>
              <p className="text-sm text-gray-600">
                题目 {currentQuestionIndex + 1} / {questions.length}
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <Clock size={16} className="inline mr-1" />
              {formatTime(timeElapsed)}
            </div>
          </div>
        </div>

        {/* 进度条 */}
        <ProgressBar progress={progress} className="mb-4" />

        {/* 题目卡片 */}
        <QuestionCard question={currentQuestion} questionNumber={currentQuestionIndex + 1} totalQuestions={questions.length} userAnswer={userAnswers[currentQuestion.id]} onAnswerSelect={handleAnswerSelect} />

        {/* 导航 */}
        <QuestionNavigation currentQuestion={currentQuestionIndex + 1} totalQuestions={questions.length} onPrevious={handlePreviousQuestion} onNext={handleNextQuestion} onSubmit={handleSubmit} canGoPrevious={currentQuestionIndex > 0} canGoNext={currentQuestionIndex < questions.length - 1} hasAnswered={userAnswers[currentQuestion.id] !== undefined} />
      </div>
    </div>;
}