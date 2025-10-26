import React from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function My() {
  const userInfo = {
    avatar: 'https://via.placeholder.com/100?text=我',
    name: '张小明',
    familyRole: '核心成员',
    familyName: '李家大院',
    joinDate: '加入于 2023年5月'
  }

  const menuItems = [
    { title: '我的资料', icon: '👤', action: () => Taro.showToast({ title: '个人资料', icon: 'none' }) },
    { title: '家族设置', icon: '⚙️', action: () => Taro.showToast({ title: '家族设置', icon: 'none' }) },
    { title: '隐私设置', icon: '🔒', action: () => Taro.showToast({ title: '隐私设置', icon: 'none' }) },
    { title: '消息通知', icon: '🔔', action: () => Taro.showToast({ title: '消息通知', icon: 'none' }) },
    { title: '关于我们', icon: 'ℹ️', action: () => Taro.showToast({ title: '关于我们', icon: 'none' }) },
    { title: '反馈建议', icon: '💬', action: () => Taro.showToast({ title: '反馈建议', icon: 'none' }) }
  ]

  return (
    <View className="my-page">
      {/* 用户信息区 */}
      <View className="user-card">
        <Image src={userInfo.avatar} className="user-avatar" mode="aspectFill" />
        <View className="user-info">
          <Text className="user-name">{userInfo.name}</Text>
          <Text className="user-role">{userInfo.familyRole}</Text>
          <Text className="family-name">{userInfo.familyName}</Text>
          <Text className="join-date">{userInfo.joinDate}</Text>
        </View>
      </View>

      {/* 菜单列表 */}
      <View className="menu-list">
        {menuItems.map((item, index) => (
          <View
            key={index}
            className="menu-item"
            onClick={item.action}
          >
            <Text className="menu-icon">{item.icon}</Text>
            <Text className="menu-title">{item.title}</Text>
            <Text className="menu-arrow">›</Text>
          </View>
        ))}
      </View>

      {/* 操作按钮 */}
      <View className="action-buttons">
        <Button className="btn-logout">退出登录</Button>
      </View>

      {/* 底部留白 */}
      <View style={{ height: '110px' }} />
    </View>
  )
}
