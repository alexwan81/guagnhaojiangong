// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ArrowLeft, ArrowRight, RotateCcw, Flag, Star } from 'lucide-react';

export function QuestionNavigation({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onReset,
  onFavorite,
  onFlag,
  showAnswer
}) {
  return <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between">
        {/* 左侧工具栏 */}
        <div className="flex items-center space-x-2">
          <button onClick={onFavorite} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="收藏题目">
            <Star size={20} className="text-gray-600" />
          </button>
          <button onClick={onFlag} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="标记题目">
            <Flag size={20} className="text-gray-600" />
          </button>
          <button onClick={onReset} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="重新开始">
            <RotateCcw size={20} className="text-gray-600" />
          </button>
        </div>

        {/* 中间进度 */}
        <div className="text-center">
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* 右侧导航 */}
        <div className="flex items-center space-x-2">
          <button onClick={onPrevious} disabled={currentIndex === 0} className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            上一题
          </button>
          <button onClick={onNext} disabled={currentIndex === totalQuestions - 1} className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            下一题
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>;
}