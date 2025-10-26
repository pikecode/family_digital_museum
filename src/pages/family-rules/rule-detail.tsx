import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './rule-detail.scss'

export default function RuleDetail() {
  return (
    <View className="rule-detail-page">
      <View className="header">
        <Text onClick={() => Taro.navigateBack()} className="back-btn">← 返回</Text>
      </View>
      <View className="content">
        <Text>家规详情页面</Text>
      </View>
    </View>
  )
}
