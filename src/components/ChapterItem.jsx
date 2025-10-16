// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { CheckCircle, PlayCircle } from 'lucide-react';

export function ChapterItem({
  chapterNumber,
  title,
  completedCount,
  totalCount,
  isCompleted,
  onPress
}) {
  const progress = totalCount > 0 ? completedCount / totalCount * 100 : 0;
  return <button onClick={onPress} className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left w-full">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        {isCompleted ? <CheckCircle size={20} className="text-green-600" /> : <PlayCircle size={20} className="text-blue-600" />}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-800">
            第{chapterNumber}章 {title}
          </h3>
          <span className="text-sm text-gray-500">
            {completedCount}/{totalCount}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="h-2 rounded-full bg-blue-600 transition-all duration-300" style={{
          width: `${progress}%`
        }}></div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">
            {isCompleted ? '已完成' : '进行中'}
          </span>
          <span className="text-xs text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </button>;
}