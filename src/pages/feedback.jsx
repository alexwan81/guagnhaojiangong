// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Send, MessageCircle, Lightbulb, Bug, AlertCircle, Heart } from 'lucide-react';

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
    description: '遇到功能问题或错误',
    color: 'from-red-500 to-orange-500'
  }, {
    id: 'suggestion',
    label: '功能建议',
    icon: Lightbulb,
    description: '提出改进建议或新功能',
    color: 'from-blue-500 to-cyan-500'
  }, {
    id: 'bug',
    label: 'Bug报告',
    icon: Bug,
    description: '报告程序错误或异常',
    color: 'from-purple-500 to-pink-500'
  }, {
    id: 'other',
    label: '其他反馈',
    icon: MessageCircle,
    description: '其他类型的反馈',
    color: 'from-green-500 to-teal-500'
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: '🎉 提交成功',
        description: '感谢您的宝贵反馈，我们会尽快处理并改进产品',
        className: 'bg-green-500 text-white'
      });
      // 清空表单
      setFormData({
        type: 'problem',
        contact: '',
        description: ''
      });
    } catch (error) {
      toast({
        title: '❌ 提交失败',
        description: '网络错误，请检查网络连接后重试',
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
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-16">
      {/* 头部 */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="max-w-2xl mx-auto px-6 py-5">
          <div className="flex items-center">
            <button onClick={handleBack} className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-105">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <div className="ml-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                意见反馈
              </h1>
              <p className="text-gray-600 text-sm">您的建议让我们变得更好 ❤️</p>
            </div>
          </div>
        </div>
      </div>

      {/* 反馈表单 */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* 反馈类型选择 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <MessageCircle className="mr-3 text-blue-600" size={24} />
            选择反馈类型
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedbackTypes.map(type => {
            const Icon = type.icon;
            const isSelected = formData.type === type.id;
            return <div key={type.id} onClick={() => handleInputChange('type', type.id)} className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : 'hover:ring-1 hover:ring-gray-200'}`}>
                <div className={`rounded-xl p-5 border-2 ${isSelected ? 'border-blue-500 bg-gradient-to-r bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                  <div className="flex items-center mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 bg-gradient-to-r ${type.color}`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>{type.label}</span>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>;
          })}
          </div>
        </div>

        {/* 联系信息 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Heart className="mr-3 text-pink-600" size={24} />
            联系信息
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱或手机号 <span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="请输入您的邮箱或手机号码" value={formData.contact} onChange={e => handleInputChange('contact', e.target.value)} className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.contact ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`} />
              {errors.contact && <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.contact}
                </p>}
              <p className="text-xs text-gray-500 mt-2">便于我们联系您解决问题</p>
            </div>
          </div>
        </div>

        {/* 问题描述 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Lightbulb className="mr-3 text-yellow-600" size={24} />
            问题描述
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细描述 <span className="text-red-500">*</span>
              </label>
              <textarea placeholder="请详细描述您遇到的问题、建议或发现的bug..." value={formData.description} onChange={e => handleInputChange('description', e.target.value)} rows={6} className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`} />
              {errors.description && <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.description}
                </p>}
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">至少10个字符，描述越详细越好</p>
                <span className={`text-xs ${formData.description.length < 10 ? 'text-red-500' : 'text-green-500'}`}>
                  {formData.description.length}/10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-lg font-semibold">
          {isSubmitting ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div> : <Send size={20} className="mr-3" />}
          {isSubmitting ? '提交中...' : '提交反馈'}
        </button>

        {/* 提示信息 */}
        <div className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
              <Heart size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2 text-lg">感谢您的反馈！</h3>
              <p className="text-blue-600">
                您的每一个建议都对我们至关重要。我们会认真阅读每一条反馈，并持续改进产品体验。
                如果问题紧急，您也可以直接联系客服：support@jianong.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}