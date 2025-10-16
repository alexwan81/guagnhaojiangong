// @ts-ignore;
import React from 'react';

export function ExamCategoryCard({
  icon: Icon,
  title,
  description,
  onPress
}) {
  return <button onClick={onPress} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <Icon size={32} className="text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </button>;
}