import React, { useState } from 'react'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Index() {
  const [banners] = useState([
    { id: 1, title: '广告图1', image: 'https://via.placeholder.com/750x300?text=Banner1' },
    { id: 2, title: '广告图2', image: 'https://via.placeholder.com/750x300?text=Banner2' },
    { id: 3, title: '广告图3', image: 'https://via.placeholder.com/750x300?text=Banner3' }
  ])

  const menuItems = [
    { id: 1, title: '上传资料', icon: '📤', path: '/pages/upload-data/index' },
    { id: 2, title: '家史家树', icon: '🌳', path: '/pages/family-tree/index' },
    { id: 3, title: '家规家教', icon: '📖', path: '/pages/family-rules/index' },
    { id: 4, title: '家日家事', icon: '📝', path: '/pages/photo-album/index' },
    { id: 5, title: '身份确认', icon: '✅', path: '/pages/index/index' },
    { id: 6, title: '家庭数据', icon: '📊', path: '/pages/index/index' },
    { id: 7, title: '使用规则', icon: '⚙️', path: '/pages/index/index' },
    { id: 8, title: '非遗传承', icon: '🎭', path: '/pages/index/index' }
  ]

  const recommendFamilies = [
    { id: 1, name: '李家大院', members: '18人', image: 'https://via.placeholder.com/150?text=Family1' },
    { id: 2, name: '王家文化', members: '25人', image: 'https://via.placeholder.com/150?text=Family2' },
    { id: 3, name: '张家传承', members: '20人', image: 'https://via.placeholder.com/150?text=Family3' }
  ]

  const handleMenuClick = (path: string) => {
    Taro.navigateTo({ url: path })
  }

  return (
    <View className="index-page">
      {/* 顶部滚动广告 */}
      <View className="banner-container">
        <Swiper
          className="banner-swiper"
          indicatorDots
          autoplay
          duration={3000}
          interval={5000}
        >
          {banners.map(banner => (
            <SwiperItem key={banner.id}>
              <Image
                src={banner.image}
                className="banner-image"
                mode="aspectFill"
              />
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      {/* 主菜单 - 8个功能模块 */}
      <View className="menu-grid">
        {menuItems.map(item => (
          <View
            key={item.id}
            className="menu-item"
            onClick={() => handleMenuClick(item.path)}
          >
            <View className="menu-icon">{item.icon}</View>
            <Text className="menu-title">{item.title}</Text>
          </View>
        ))}
      </View>

      {/* 推荐家庭 */}
      <View className="recommend-section">
        <View className="section-title">推荐家庭</View>
        <View className="recommend-list">
          {recommendFamilies.map(family => (
            <View key={family.id} className="family-card">
              <Image
                src={family.image}
                className="family-image"
                mode="aspectFill"
              />
              <View className="family-info">
                <Text className="family-name">{family.name}</Text>
                <Text className="family-members">{family.members}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 底部三个功能区 */}
      <View className="bottom-section">
        <View className="bottom-item">
          <Text className="bottom-title">家庭广场</Text>
          <Text className="bottom-desc">分享家族故事</Text>
        </View>
        <View className="bottom-item">
          <Text className="bottom-title">百业联盟</Text>
          <Text className="bottom-desc">行业资源合作</Text>
        </View>
        <View className="bottom-item">
          <Text className="bottom-title">数字交易</Text>
          <Text className="bottom-desc">文化产品交易</Text>
        </View>
      </View>

      {/* 底部留白，避免与导航栏重叠 */}
      <View style={{ height: '110px' }} />
    </View>
  )
}
