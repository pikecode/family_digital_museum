import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './album-detail.scss'

export default function AlbumDetail() {
  return (
    <View className="album-detail-page">
      <View className="header">
        <Text onClick={() => Taro.navigateBack()} className="back-btn">← 返回</Text>
      </View>
      <View className="content">
        <Text>相册详情页面</Text>
      </View>
    </View>
  )
}
