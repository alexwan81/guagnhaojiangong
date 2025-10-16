// @ts-ignore;
import React from 'react';

export function MajorCard({
  icon: Icon,
  title,
  description,
  questionCount,
  onPress
}) {
  return <button onClick={onPress} className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left w-full">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <Icon size={24} className="text-blue-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {questionCount} 题
          </span>
        </div>
      </div>
    </button>;
}