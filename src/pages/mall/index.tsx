import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Mall() {
  return (
    <View className="mall-page">
      <View className="empty-state">
        <Text className="empty-icon">🛍️</Text>
        <Text className="empty-title">商城</Text>
        <Text className="empty-desc">家族文化产品交易中心</Text>
        <Text className="empty-note">功能开发中</Text>
      </View>
      <View style={{ height: '110px' }} />
    </View>
  )
}
