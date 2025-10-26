import React from 'react'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface UploadOption {
  id: string
  title: string
  icon: string
  description: string
  action: () => void
}

export default function UploadData() {
  const uploadOptions: UploadOption[] = [
    {
      id: '1',
      title: '上传图片/视频',
      icon: '🖼️',
      description: '存入家庭相册',
      action: () => handleUpload('image')
    },
    {
      id: '2',
      title: '写一篇日志',
      icon: '📝',
      description: '存入家庭日志',
      action: () => handleUpload('diary')
    },
    {
      id: '3',
      title: '记录一条家事',
      icon: '📅',
      description: '存入活动日历',
      action: () => handleUpload('event')
    },
    {
      id: '4',
      title: '补充家人信息',
      icon: '👥',
      description: '存入家族树',
      action: () => handleUpload('member')
    },
    {
      id: '5',
      title: '录入一条家规',
      icon: '📖',
      description: '存入家人家规',
      action: () => handleUpload('rule')
    },
    {
      id: '6',
      title: '上传老物件/故事',
      icon: '🎁',
      description: '存入数字遗产',
      action: () => handleUpload('heritage')
    }
  ]

  const handleUpload = (type: string) => {
    const titles: Record<string, string> = {
      image: '选择图片或视频',
      diary: '编写日志',
      event: '记录家事',
      member: '添加家人',
      rule: '录入家规',
      heritage: '上传文物故事'
    }

    Taro.showActionSheet({
      itemList: type === 'image' ? ['拍照', '从相册选择'] : ['新建', '编辑草稿'],
      success: (res) => {
        Taro.showToast({
          title: `${titles[type]} - ${type === 'image' ? (res.tapIndex === 0 ? '拍照' : '选择') : '新建'}`,
          icon: 'none'
        })
      }
    })
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className="upload-page">
      {/* 顶部导航 */}
      <View className="upload-header">
        <Text className="back-btn" onClick={handleBack}>← 返回</Text>
        <Text className="page-title">上传资料</Text>
      </View>

      <ScrollView scrollY={true} className="upload-content">
        {/* 说明文字 */}
        <View className="upload-intro">
          <Text>选择资料类型，将其整理到相应的家族档案中</Text>
        </View>

        {/* 功能网格 */}
        <View className="upload-grid">
          {uploadOptions.map(option => (
            <View
              key={option.id}
              className="upload-item"
              onClick={option.action}
            >
              <View className="item-icon">{option.icon}</View>
              <Text className="item-title">{option.title}</Text>
              <Text className="item-desc">{option.description}</Text>
            </View>
          ))}
        </View>

        {/* 快速上传区 */}
        <View className="quick-upload">
          <View className="section-title">快速上传</View>
          <View className="upload-area">
            <Text className="upload-hint">点击选择文件或直接拖拽上传</Text>
            <Button className="browse-btn" onClick={() => handleUpload('image')}>
              选择文件
            </Button>
            <Text className="upload-note">支持图片、视频、文档等多种格式</Text>
          </View>
        </View>

        {/* 最近上传 */}
        <View className="recent-uploads">
          <View className="section-title">最近上传</View>
          <View className="upload-list">
            <View className="upload-record">
              <View className="record-icon">🖼️</View>
              <View className="record-info">
                <Text className="record-name">家庭出游照片</Text>
                <Text className="record-time">2024年10月20日</Text>
              </View>
              <Text className="record-status">已保存</Text>
            </View>
            <View className="upload-record">
              <View className="record-icon">📝</View>
              <View className="record-info">
                <Text className="record-name">国庆节游记</Text>
                <Text className="record-time">2024年10月15日</Text>
              </View>
              <Text className="record-status">已发布</Text>
            </View>
            <View className="upload-record">
              <View className="record-icon">👥</View>
              <View className="record-info">
                <Text className="record-name">新生儿信息</Text>
                <Text className="record-time">2024年10月10日</Text>
              </View>
              <Text className="record-status">已保存</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 底部留白 */}
      <View style={{ height: '110px' }} />
    </View>
  )
}
