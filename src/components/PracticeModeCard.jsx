// @ts-ignore;
import React from 'react';

export function PracticeModeCard({
  icon: Icon,
  title,
  description,
  features,
  isRecommended,
  onPress
}) {
  return <button onClick={onPress} className="flex flex-col p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left w-full">
      {isRecommended && <div className="self-start mb-3">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          推荐
        </span>
      </div>}
      <div className="flex items-start">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <Icon size={24} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="space-y-1">
            {features.map((feature, index) => <div key={index} className="flex items-center">
                <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">{feature}</span>
              </div>)}
          </div>
        </div>
      </div>
    </button>;
}