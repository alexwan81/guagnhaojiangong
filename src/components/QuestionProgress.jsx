// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export function QuestionProgress({
  current,
  total,
  elapsedTime,
  correctCount,
  wrongCount
}) {
  const progress = total > 0 ? current / total * 100 : 0;
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  return <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock size={18} className="text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-800">{formatTime(elapsedTime)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <CheckCircle size={16} className="text-green-600 mr-1" />
              <span className="text-xs text-gray-600">{correctCount}</span>
            </div>
            <div className="flex items-center">
              <XCircle size={16} className="text-red-600 mr-1" />
              <span className="text-xs text-gray-600">{wrongCount}</span>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-800">
          {current}/{total}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="h-2 rounded-full bg-blue-600 transition-all duration-300" style={{
        width: `${progress}%`
      }}></div>
      </div>
    </div>;
}