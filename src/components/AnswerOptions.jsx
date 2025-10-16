// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Checkbox, RadioGroup, RadioGroupItem } from '@/components/ui';

export function AnswerOptions({
  questionType,
  options,
  selectedAnswers,
  onAnswerSelect,
  isSubmitted
}) {
  if (questionType === 'single') {
    return <RadioGroup value={selectedAnswers[0] || ''} onValueChange={value => onAnswerSelect([value])} className="space-y-3">
        {options.map((option, index) => <div key={option.id} className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
            <RadioGroupItem value={option.id} id={`option-${option.id}`} />
            <label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
              <span className="font-medium text-gray-600 mr-2">{String.fromCharCode(65 + index)}.</span>
              <span className="text-gray-800">{option.content}</span>
            </label>
          </div>)}
      </RadioGroup>;
  } else if (questionType === 'multiple') {
    return <div className="space-y-3">
        {options.map((option, index) => <div key={option.id} className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
            <Checkbox id={`option-${option.id}`} checked={selectedAnswers.includes(option.id)} onCheckedChange={checked => {
          const newAnswers = checked ? [...selectedAnswers, option.id] : selectedAnswers.filter(id => id !== option.id);
          onAnswerSelect(newAnswers);
        }} />
            <label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
              <span className="font-medium text-gray-600 mr-2">{String.fromCharCode(65 + index)}.</span>
              <span className="text-gray-800">{option.content}</span>
            </label>
          </div>)}
      </div>;
  } else if (questionType === 'case') {
    return <div className="space-y-4">
        <textarea value={selectedAnswers[0] || ''} onChange={e => onAnswerSelect([e.target.value])} placeholder="请输入您的答案..." className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" disabled={isSubmitted} />
        {isSubmitted && selectedAnswers[0] && <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">您的答案：{selectedAnswers[0]}</p>
          </div>}
      </div>;
  }
  return null;
}