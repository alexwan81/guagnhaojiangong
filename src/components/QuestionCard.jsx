// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Check, X, Clock, BookOpen } from 'lucide-react';

export function QuestionCard({
  question,
  selectedAnswer,
  showAnswer,
  onAnswerSelect
}) {
  const isAnswered = selectedAnswer !== '';
  const isCorrect = isAnswered && selectedAnswer === question.correctAnswer;
  return <div className="bg-white rounded-xl shadow-lg p-6">
      {/* 题目信息 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${question.difficulty === '简单' ? 'bg-green-100 text-green-800' : question.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <Clock size={14} className="mr-1" />
            知识点: {question.knowledgePoint}
          </span>
        </div>
        
        <h2 className="text-lg font-semibold text-gray-800 mb-4 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* 选项 */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
        const isSelected = selectedAnswer === index;
        const isCorrectAnswer = index === question.correctAnswer;
        const showResult = showAnswer;
        return <div key={index} onClick={() => !showAnswer && onAnswerSelect(index)} className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${showResult && isCorrectAnswer ? 'border-green-500 bg-green-50' : showResult && isSelected && !isCorrectAnswer ? 'border-red-500 bg-red-50' : isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}>
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${showResult && isCorrectAnswer ? 'border-green-500 bg-green-500' : showResult && isSelected && !isCorrectAnswer ? 'border-red-500 bg-red-500' : isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                  {showResult && isCorrectAnswer && <Check size={14} className="text-white" />}
                  {showResult && isSelected && !isCorrectAnswer && <X size={14} className="text-white" />}
                  {!showResult && isSelected && <Check size={14} className="text-white" />}
                </div>
                <span className={`text-sm ${showResult && isCorrectAnswer ? 'text-green-800 font-semibold' : ''}`}>
                  {option}
                </span>
              </div>
            </div>;
      })}
      </div>

      {/* 答案解析 */}
      {showAnswer && <div className="border-t pt-4">
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
            <div className="flex items-center mb-2">
              {isCorrect ? <Check size={20} className="text-green-600 mr-2" /> : <X size={20} className="text-red-600 mr-2" />}
              <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '回答正确！' : '回答错误'}
              </span>
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">正确答案：{question.options[question.correctAnswer]}</p>
              <p className="leading-relaxed">{question.explanation}</p>
            </div>
          </div>
        </div>}
    </div>;
}