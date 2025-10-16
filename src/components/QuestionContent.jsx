// @ts-ignore;
import React from 'react';

export function QuestionContent({
  question,
  questionType,
  questionNumber
}) {
  const getTypeLabel = type => {
    const labels = {
      'single': '单选题',
      'multiple': '多选题',
      'case': '案例分析题'
    };
    return labels[type] || '未知题型';
  };
  const getTypeColor = type => {
    const colors = {
      'single': 'bg-blue-100 text-blue-800',
      'multiple': 'bg-purple-100 text-purple-800',
      'case': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };
  return <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(questionType)}`}>
          {getTypeLabel(questionType)}
        </span>
        <span className="text-sm text-gray-500">第 {questionNumber} 题</span>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <div className="text-lg font-medium text-gray-800 mb-4 leading-relaxed">
          {question?.content}
        </div>
        
        {question?.imageUrl && <div className="mb-4">
            <img src={question.imageUrl} alt="题目图片" className="rounded-lg max-w-full" />
          </div>}
        
        {question?.material && <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-gray-700 mb-2">案例材料：</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{question.material}</p>
          </div>}
      </div>
    </div>;
}