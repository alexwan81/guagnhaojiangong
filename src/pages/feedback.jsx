// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { MessageSquare, Send, Mail, Phone } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function FeedbackPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('feedback');
  const [feedback, setFeedback] = useState('');
  const [contact, setContact] = useState('');
  const handleTabChange = tabId => {
    if (tabId === 'home') {
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    } else if (tabId === 'profile') {
      $w.utils.navigateTo({
        pageId: 'profile',
        params: {}
      });
    }
    setActiveTab(tabId);
  };
  const handleSubmit = () => {
    if (!feedback.trim()) {
      toast({
        title: '提交失败',
        description: '请填写反馈内容',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: '提交成功',
      description: '感谢您的反馈，我们会尽快处理'
    });
    setFeedback('');
    setContact('');
  };
  return <div className="min-h-screen bg-gray-50 pb-20">
      {/* 头部 */}
      <div className="bg-white px-6 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <MessageSquare size={24} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">意见反馈</h1>
            <p className="text-gray-600 text-sm">您的建议帮助我们做得更好</p>
          </div>
        </div>
      </div>

      {/* 反馈表单 */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                反馈内容
              </label>
              <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="请描述您遇到的问题或建议..." className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                联系方式（选填）
              </label>
              <input type="text" value={contact} onChange={e => setContact(e.target.value)} placeholder="邮箱或手机号" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Send size={18} />
              <span>提交反馈</span>
            </button>
          </div>
        </div>
      </div>

      {/* 联系信息 */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">联系我们</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-gray-600" />
              <span className="text-gray-700">support@construction-exam.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-gray-600" />
              <span className="text-gray-700">400-123-4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}