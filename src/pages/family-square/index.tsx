import React, { useState } from 'react'
import { View, Text, Image, ScrollView, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface Post {
  id: string
  familyName: string
  familyAvatar: string
  content: string
  images?: string[]
  likes: number
  comments: number
  timestamp: string
  isLiked?: boolean
}

export default function FamilySquare() {
  const [activeTab, setActiveTab] = useState<'recommend' | 'follow'>('recommend')
  const [searchText, setSearchText] = useState('')

  const recommendPosts: Post[] = [
    {
      id: '1',
      familyName: '李家大院',
      familyAvatar: 'https://via.placeholder.com/50?text=李家',
      content: '今天全家聚在一起，围坐一桌，享受美好的晚餐时光。这就是家的温暖。',
      images: ['https://via.placeholder.com/300x400?text=Dinner1', 'https://via.placeholder.com/300x400?text=Dinner2'],
      likes: 156,
      comments: 28,
      timestamp: '2小时前',
      isLiked: false
    },
    {
      id: '2',
      familyName: '王家传承',
      familyAvatar: 'https://via.placeholder.com/50?text=王家',
      content: '分享家族家训：诚信、勤奋、孝道。这是祖先传下来的精神财富，我们要代代相传。',
      likes: 89,
      comments: 12,
      timestamp: '5小时前',
      isLiked: false
    },
    {
      id: '3',
      familyName: '张家文化',
      familyAvatar: 'https://via.placeholder.com/50?text=张家',
      content: '记录孩子们的成长时刻，他们就是家族的未来。',
      images: ['https://via.placeholder.com/300x400?text=Kids'],
      likes: 203,
      comments: 45,
      timestamp: '1天前',
      isLiked: false
    }
  ]

  const followPosts: Post[] = [
    {
      id: '4',
      familyName: '我的家族',
      familyAvatar: 'https://via.placeholder.com/50?text=我的家',
      content: '国庆假期回家了，和父母一起享受天伦之乐。家，是我们永远的港湾。',
      images: ['https://via.placeholder.com/300x400?text=Home'],
      likes: 45,
      comments: 8,
      timestamp: '3小时前',
      isLiked: false
    },
    {
      id: '5',
      familyName: '亲戚朋友家',
      familyAvatar: 'https://via.placeholder.com/50?text=亲戚',
      content: '今年全家在三亚度假，阳光、沙滩、家人，这就是幸福。',
      images: ['https://via.placeholder.com/300x400?text=Beach1', 'https://via.placeholder.com/300x400?text=Beach2', 'https://via.placeholder.com/300x400?text=Beach3'],
      likes: 127,
      comments: 23,
      timestamp: '6小时前',
      isLiked: false
    }
  ]

  const handleLike = (postId: string) => {
    Taro.showToast({ title: '点赞成功', icon: 'success' })
  }

  const handleComment = (postId: string) => {
    Taro.showToast({ title: '评论功能开发中', icon: 'none' })
  }

  const handleFollow = (familyName: string) => {
    Taro.showToast({ title: `已关注${familyName}`, icon: 'success' })
  }

  const handleSearch = () => {
    if (searchText.trim()) {
      Taro.showToast({ title: `搜索: ${searchText}`, icon: 'none' })
    }
  }

  const renderPost = (post: Post) => (
    <View key={post.id} className="post-card">
      {/* 发布者信息 */}
      <View className="post-header">
        <View className="author-info">
          <Image
            src={post.familyAvatar}
            className="author-avatar"
            mode="aspectFill"
          />
          <View className="author-details">
            <Text className="author-name">{post.familyName}</Text>
            <Text className="post-time">{post.timestamp}</Text>
          </View>
        </View>
        <Text className="follow-btn" onClick={() => handleFollow(post.familyName)}>
          关注
        </Text>
      </View>

      {/* 内容 */}
      <View className="post-content">
        <Text className="content-text">{post.content}</Text>
      </View>

      {/* 图片 */}
      {post.images && post.images.length > 0 && (
        <View className="post-images">
          {post.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              className={`post-image ${post.images!.length > 1 ? 'multi' : 'single'}`}
              mode="aspectFill"
            />
          ))}
        </View>
      )}

      {/* 互动按钮 */}
      <View className="post-footer">
        <View className="action-group">
          <View className="action-item" onClick={() => handleLike(post.id)}>
            <Text className="action-icon">👍</Text>
            <Text className="action-count">{post.likes}</Text>
          </View>
          <View className="action-item" onClick={() => handleComment(post.id)}>
            <Text className="action-icon">💬</Text>
            <Text className="action-count">{post.comments}</Text>
          </View>
          <View className="action-item" onClick={() => handleFollow(post.familyName)}>
            <Text className="action-icon">⭐</Text>
            <Text className="action-label">收藏</Text>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View className="family-square-page">
      {/* 顶部导航和搜索 */}
      <View className="square-header">
        <View className="search-box">
          <Input
            className="search-input"
            placeholder="搜索"
            placeholderStyle="color: #999;"
            value={searchText}
            onInput={(e) => setSearchText(e.detail.value)}
            onConfirm={handleSearch}
          />
          <Text className="search-btn" onClick={handleSearch}>🔍</Text>
        </View>
      </View>

      {/* Tab 切换 */}
      <View className="square-tabs">
        <View
          className={`tab ${activeTab === 'recommend' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommend')}
        >
          推荐
        </View>
        <View
          className={`tab ${activeTab === 'follow' ? 'active' : ''}`}
          onClick={() => setActiveTab('follow')}
        >
          关注
        </View>
      </View>

      {/* 内容区域 */}
      <ScrollView scrollY={true} className="square-content">
        {activeTab === 'recommend' ? (
          <View className="posts-list">
            {recommendPosts.map(post => renderPost(post))}
          </View>
        ) : (
          <View className="posts-list">
            {followPosts.map(post => renderPost(post))}
          </View>
        )}
      </ScrollView>

      {/* 底部留白 */}
      <View style={{ height: '110px' }} />
    </View>
  )
}
