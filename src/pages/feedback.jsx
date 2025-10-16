// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Send, MessageCircle, Lightbulb, Bug, AlertCircle } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function Feedback(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('feedback');
  const [formData, setFormData] = useState({
    type: 'problem',
    contact: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // 反馈类型选项
  const feedbackTypes = [{
    id: 'problem',
    label: '问题反馈',
    icon: AlertCircle,
    description: '遇到功能问题或错误'
  }, {
    id: 'suggestion',
    label: '功能建议',
    icon: Lightbulb,
    description: '提出改进建议或新功能'
  }, {
    id: 'bug',
    label: 'Bug报告',
    icon: Bug,
    description: '报告程序错误或异常'
  }, {
    id: 'other',
    label: '其他反馈',
    icon: MessageCircle,
    description: '其他类型的反馈'
  }];
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // 清除该字段的错误信息
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.contact.trim()) {
      newErrors.contact = '请输入联系方式';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact) && !/^1[3-9]\d{9}$/.test(formData.contact)) {
      newErrors.contact = '请输入有效的邮箱或手机号';
    }
    if (!formData.description.trim()) {
      newErrors.description = '请输入问题描述';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = '描述至少需要10个字符';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      // 模拟提交反馈（实际项目中应该调用API）
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: '提交成功',
        description: '感谢您的反馈，我们会尽快处理'
      });
      // 清空表单
      setFormData({
        type: 'problem',
        contact: '',
        description: ''
      });
    } catch (error) {
      toast({
        title: '提交失败',
        description: '网络错误，请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    if (tabId !== 'feedback') {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 头部 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-800">意见反馈</h1>
              <p className="text-sm text-gray-600">帮助我们改进产品</p>
            </div>
          </div>
        </div>
      </div>

      {/* 反馈表单 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">反馈类型</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {feedbackTypes.map(type => {
            const Icon = type.icon;
            const isSelected = formData.type === type.id;
            return <div key={type.id} onClick={() => handleInputChange('type', type.id)} className={`border rounded-lg p-3 cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}>
                <div className="flex items-center mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${isSelected ? 'bg-blue-500' : 'bg-gray-100'}`}>
                    <Icon size={16} className={isSelected ? 'text-white' : 'text-gray-600'} />
                  </div>
                  <span className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>{type.label}</span>
                </div>
                <p className="text-xs text-gray-500">{type.description}</p>
              </div>;
          })}
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-4">联系信息</h2>
          <div className="mb-6">
            <input type="text" placeholder="请输入邮箱或手机号" value={formData.contact} onChange={e => handleInputChange('contact', e.target.value)} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contact ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
            <p className="text-xs text-gray-500 mt-1">便于我们联系您解决问题</p>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-4">问题描述</h2>
          <div className="mb-6">
            <textarea placeholder="请详细描述您遇到的问题或建议..." value={formData.description} onChange={e => handleInputChange('description', e.target.value)} rows={5} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            <p className="text-xs text-gray-500 mt-1">至少10个字符，描述越详细越好</p>
          </div>

          <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center">
            {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div> : <Send size={18} className="mr-2" />}
            {isSubmitting ? '提交中...' : '提交反馈'}
          </button>
        </div>

        {/* 提示信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <Lightbulb size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">反馈提示</h3>
              <p className="text-blue-600 text-sm">
                您的反馈对我们非常重要！请尽可能详细地描述问题，包括操作步骤、页面截图等信息，这样我们能更快地为您解决问题。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}