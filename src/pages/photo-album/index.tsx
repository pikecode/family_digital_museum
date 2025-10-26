import React, { useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface Album {
  id: string
  title: string
  cover: string
  photoCount: number
  description: string
}

interface PhotoItem {
  id: string
  image: string
  date: string
  likes: number
  comments: number
}

export default function PhotoAlbum() {
  const [viewMode, setViewMode] = useState<'albums' | 'timeline'>('albums')

  const smartAlbums: Album[] = [
    {
      id: '1',
      title: '2024年精选',
      cover: 'https://via.placeholder.com/180?text=2024',
      photoCount: 42,
      description: '今年最精彩的时刻'
    },
    {
      id: '2',
      title: '家庭出游',
      cover: 'https://via.placeholder.com/180?text=Travel',
      photoCount: 28,
      description: '2024年家庭旅行汇总'
    },
    {
      id: '3',
      title: '生日派对',
      cover: 'https://via.placeholder.com/180?text=Birthday',
      photoCount: 15,
      description: '爷爷80岁寿宴'
    },
    {
      id: '4',
      title: '日常美食',
      cover: 'https://via.placeholder.com/180?text=Food',
      photoCount: 56,
      description: '家庭美食记录'
    },
    {
      id: '5',
      title: '孩子成长',
      cover: 'https://via.placeholder.com/180?text=Kids',
      photoCount: 73,
      description: '小明的童年时光'
    },
    {
      id: '6',
      title: '四季风景',
      cover: 'https://via.placeholder.com/180?text=Nature',
      photoCount: 34,
      description: '家乡四季变化'
    }
  ]

  const timelinePhotos: PhotoItem[] = [
    {
      id: '1',
      image: 'https://via.placeholder.com/300x400?text=Photo1',
      date: '2024年10月',
      likes: 12,
      comments: 3
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/300x400?text=Photo2',
      date: '2024年09月',
      likes: 8,
      comments: 1
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/300x400?text=Photo3',
      date: '2024年09月',
      likes: 15,
      comments: 5
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/300x400?text=Photo4',
      date: '2024年08月',
      likes: 20,
      comments: 7
    }
  ]

  const handleAlbumClick = (album: Album) => {
    Taro.navigateTo({
      url: `/pages/photo-album/album-detail?albumId=${album.id}&title=${album.title}`
    })
  }

  const handlePhotoClick = (photo: PhotoItem) => {
    Taro.previewImage({
      urls: [photo.image],
      showmenu: true
    })
  }

  const handleFilter = () => {
    Taro.showActionSheet({
      itemList: ['按时间排序', '按点赞数排序', '按评论数排序'],
      success: (res) => {
        const actions = ['时间', '点赞', '评论']
        Taro.showToast({ title: `已按${actions[res.tapIndex]}排序`, icon: 'none' })
      }
    })
  }

  return (
    <View className="photo-album-page">
      {/* 顶部导航 */}
      <View className="album-header">
        <View className="header-left">
          <Text className="back-btn" onClick={() => Taro.navigateBack()}>← 返回</Text>
          <Text className="page-title">家庭相册</Text>
        </View>
        <View className="header-right">
          <Text className="filter-btn" onClick={handleFilter}>筛选</Text>
        </View>
      </View>

      {/* 视图切换 */}
      <View className="view-tabs">
        <View
          className={`tab ${viewMode === 'albums' ? 'active' : ''}`}
          onClick={() => setViewMode('albums')}
        >
          智能合集
        </View>
        <View
          className={`tab ${viewMode === 'timeline' ? 'active' : ''}`}
          onClick={() => setViewMode('timeline')}
        >
          时间线
        </View>
      </View>

      <ScrollView scrollY={true} className="album-content">
        {viewMode === 'albums' ? (
          // 智能合集视图
          <View className="smart-albums">
            <View className="albums-grid">
              {smartAlbums.map(album => (
                <View
                  key={album.id}
                  className="album-card"
                  onClick={() => handleAlbumClick(album)}
                >
                  <Image
                    src={album.cover}
                    className="album-cover"
                    mode="aspectFill"
                  />
                  <View className="album-overlay">
                    <View className="album-info">
                      <Text className="album-title">{album.title}</Text>
                      <Text className="album-count">{album.photoCount} 张照片</Text>
                    </View>
                  </View>
                  <View className="album-desc">
                    <Text>{album.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          // 时间线视图
          <View className="timeline-view">
            {timelinePhotos.map(photo => (
              <View key={photo.id} className="timeline-item">
                <View className="timeline-marker">{photo.date}</View>
                <Image
                  src={photo.image}
                  className="timeline-image"
                  mode="aspectFill"
                  onClick={() => handlePhotoClick(photo)}
                />
                <View className="timeline-actions">
                  <View className="action-item">
                    <Text className="action-icon">👍</Text>
                    <Text>{photo.likes}</Text>
                  </View>
                  <View className="action-item">
                    <Text className="action-icon">💬</Text>
                    <Text>{photo.comments}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 底部留白 */}
      <View style={{ height: '110px' }} />
    </View>
  )
}
