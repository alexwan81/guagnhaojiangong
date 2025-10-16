// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Clock } from 'lucide-react';

export function ProgressBar({
  current,
  total,
  chapterTitle
}) {
  const progress = total > 0 ? current / total * 100 : 0;
  return <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span className="font-medium">{chapterTitle}</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{
        width: `${progress}%`
      }}></div>
      </div>
    </div>;
}