// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, User, MessageSquare } from 'lucide-react';

export function TabBar({
  activeTab,
  onTabChange
}) {
  const tabs = [{
    id: 'home',
    icon: Home,
    label: '首页'
  }, {
    id: 'profile',
    icon: User,
    label: '我的'
  }, {
    id: 'feedback',
    icon: MessageSquare,
    label: '反馈'
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-3">
        {tabs.map(tab => {
        const IconComponent = tab.icon;
        return <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'}`}>
              <IconComponent size={20} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>;
      })}
      </div>
    </div>;
}