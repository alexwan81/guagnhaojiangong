// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { CheckCircle, XCircle, Lightbulb, BookOpen } from 'lucide-react';

export function AnswerFeedback({
  isCorrect,
  correctAnswer,
  explanation,
  knowledgePoints,
  onNextQuestion,
  onReview
}) {
  return <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className={`flex items-center justify-center mb-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
        {isCorrect ? <CheckCircle size={32} className="text-green-600 mr-3" /> : <XCircle size={32} className="text-red-600 mr-3" />}
        <span className={`text-lg font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
          {isCorrect ? '回答正确！' : '回答错误'}
        </span>
      </div>
      
      {!isCorrect && correctAnswer && <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Lightbulb size={18} className="text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">正确答案</span>
          </div>
          <p className="text-blue-700">{correctAnswer}</p>
        </div>}
      
      {explanation && <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <BookOpen size={18} className="text-gray-600 mr-2" />
            <span className="font-medium text-gray-800">解析</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{explanation}</p>
        </div>}
      
      {knowledgePoints && knowledgePoints.length > 0 && <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Lightbulb size={18} className="text-purple-600 mr-2" />
            <span className="font-medium text-purple-800">相关知识点</span>
          </div>
          <div className="space-y-1">
            {knowledgePoints.map((point, index) => <div key={index} className="flex items-start">
                <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 mr-2"></div>
                <span className="text-sm text-purple-700">{point}</span>
              </div>)}
          </div>
        </div>}
      
      <div className="flex space-x-3">
        <button onClick={onReview} className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          查看解析
        </button>
        <button onClick={onNextQuestion} className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          下一题
        </button>
      </div>
    </div>;
}