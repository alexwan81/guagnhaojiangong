// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Send, ChevronRight, ChevronLeft } from 'lucide-react';

import { QuestionProgress } from '@/components/QuestionProgress';
import { QuestionContent } from '@/components/QuestionContent';
import { AnswerOptions } from '@/components/AnswerOptions';
import { AnswerFeedback } from '@/components/AnswerFeedback';
export default function QuestionPracticePage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [examInfo, setExamInfo] = useState({
    categoryName: '',
    majorName: '',
    chapterName: ''
  });
  useEffect(() => {
    // 从页面参数获取考试和专业信息
    const categoryName = $w.page.dataset.params?.categoryName;
    const majorName = $w.page.dataset.params?.majorName;
    const chapterName = $w.page.dataset.params?.chapterName;
    if (categoryName && majorName) {
      setExamInfo({
        categoryName,
        majorName,
        chapterName: chapterName || '未知章节'
      });
    }
    loadQuestions();

    // 启动计时器
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [$w.page.dataset.params]);
  const loadQuestions = () => {
    // 模拟题目数据
    const questionsData = [{
      id: 'q1',
      type: 'single',
      content: '根据《建设工程安全生产管理条例》，施工单位应当为施工现场从事危险作业的人员办理什么保险？',
      options: [{
        id: 'a',
        content: '意外伤害保险'
      }, {
        id: 'b',
        content: '养老保险'
      }, {
        id: 'c',
        content: '医疗保险'
      }, {
        id: 'd',
        content: '失业保险'
      }],
      correctAnswer: 'a',
      explanation: '根据《建设工程安全生产管理条例》第三十八条规定，施工单位应当为施工现场从事危险作业的人员办理意外伤害保险。',
      knowledgePoints: ['建设工程安全生产管理条例', '意外伤害保险', '危险作业人员保障']
    }, {
      id: 'q2',
      type: 'multiple',
      content: '下列哪些属于建设工程项目的直接成本？',
      options: [{
        id: 'a',
        content: '人工费'
      }, {
        id: 'b',
        content: '材料费'
      }, {
        id: 'c',
        content: '管理费'
      }, {
        id: 'd',
        content: '机械使用费'
      }],
      correctAnswer: ['a', 'b', 'd'],
      explanation: '直接成本是指直接用于工程实体建设的费用，包括人工费、材料费、机械使用费等。管理费属于间接成本。',
      knowledgePoints: ['建设工程成本构成', '直接成本与间接成本', '成本管理']
    }, {
      id: 'q3',
      type: 'case',
      content: '某建筑工程发生质量事故，造成直接经济损失120万元。根据《生产安全事故报告和调查处理条例》，该事故属于什么等级？',
      material: '某住宅楼工程在施工过程中，由于模板支撑系统失稳，导致局部坍塌，造成直接经济损失120万元，无人员伤亡。',
      correctAnswer: '较大事故',
      explanation: '根据《生产安全事故报告和调查处理条例》第三条，造成直接经济损失100万元以上1000万元以下的事故属于较大事故。',
      knowledgePoints: ['生产安全事故等级划分', '质量事故处理', '建设工程安全管理']
    }];
    setQuestions(questionsData);
  };
  const currentQuestion = questions[currentQuestionIndex];
  const handleAnswerSelect = answers => {
    setSelectedAnswers(answers);
  };
  const handleSubmit = () => {
    if (selectedAnswers.length === 0) {
      toast({
        title: '请选择答案',
        description: '请先选择您的答案后再提交',
        variant: 'destructive'
      });
      return;
    }
    setIsSubmitted(true);

    // 判断答案是否正确
    const isCorrect = checkAnswer(currentQuestion, selectedAnswers);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }
  };
  const checkAnswer = (question, userAnswers) => {
    if (question.type === 'single') {
      return userAnswers[0] === question.correctAnswer;
    } else if (question.type === 'multiple') {
      return userAnswers.length === question.correctAnswer.length && userAnswers.every(answer => question.correctAnswer.includes(answer));
    } else if (question.type === 'case') {
      // 案例题通常需要人工批改，这里简单模拟
      return userAnswers[0] && userAnswers[0].length > 10;
    }
    return false;
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswers([]);
      setIsSubmitted(false);
    } else {
      toast({
        title: '练习完成',
        description: '您已完成所有题目练习'
      });
    }
  };
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswers([]);
      setIsSubmitted(false);
    }
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  return <div className="min-h-screen bg-gray-50 pb-20">
      {/* 进度条和计时器 */}
      <QuestionProgress current={currentQuestionIndex + 1} total={questions.length} elapsedTime={elapsedTime} correctCount={correctCount} wrongCount={wrongCount} />
      
      <div className="px-6 py-6">
        {/* 题目内容 */}
        {currentQuestion && <QuestionContent question={currentQuestion} questionType={currentQuestion.type} questionNumber={currentQuestionIndex + 1} />}
        
        {/* 选项区域 */}
        {currentQuestion && !isSubmitted && <div className="mb-6">
            <AnswerOptions questionType={currentQuestion.type} options={currentQuestion.options} selectedAnswers={selectedAnswers} onAnswerSelect={handleAnswerSelect} isSubmitted={isSubmitted} />
          </div>}
        
        {/* 提交按钮 */}
        {!isSubmitted && <button onClick={handleSubmit} disabled={selectedAnswers.length === 0} className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2">
            <Send size={20} />
            <span>提交答案</span>
          </button>}
        
        {/* 反馈和解析 */}
        {isSubmitted && currentQuestion && <AnswerFeedback isCorrect={checkAnswer(currentQuestion, selectedAnswers)} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.explanation} knowledgePoints={currentQuestion.knowledgePoints} onNextQuestion={handleNextQuestion} onReview={() => {}} />}
        
        {/* 题目导航 */}
        <div className="flex justify-between mt-6">
          <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} className="flex items-center px-4 py-2 text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed">
            <ChevronLeft size={20} className="mr-1" />
            上一题
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1} className="flex items-center px-4 py-2 text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed">
            下一题
            <ChevronRight size={20} className="ml-1" />
          </button>
        </div>
      </div>
    </div>;
}