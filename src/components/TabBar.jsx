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
    label: '首页',
    icon: Home
  }, {
    id: 'profile',
    label: '我的',
    icon: User
  }, {
    id: 'feedback',
    label: '反馈',
    icon: MessageSquare
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-3">
        {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}>
              <Icon size={20} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>;
      })}
      </div>
    </div>;
}