import React, { useState } from 'react'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './member-detail.scss'

export default function MemberDetail() {
  const [activeTab, setActiveTab] = useState<'biography' | 'photos' | 'audio' | 'relations'>('biography')

  const memberData = {
    id: '1',
    name: '李建国',
    nickname: '爷爷',
    birthYear: '1945',
    deathYear: '2020',
    birthPlace: '山东济南',
    occupation: '教师',
    avatar: 'https://via.placeholder.com/200?text=李建国',
    biography: '李建国，1945年生于山东济南。早年务农，后考入师范学院学习教育，从事教育工作四十余年。为人正直，孝顺父母，教子有方。在家族中被尊称为"老家主"，是传承家族文化的重要人物。',
    spouse: '王秀英',
    children: ['李明', '李伟', '李娜']
  }

  const photoAlbum = [
    { id: 1, title: '年轻时代', image: 'https://via.placeholder.com/150?text=Photo1' },
    { id: 2, title: '工作时期', image: 'https://via.placeholder.com/150?text=Photo2' },
    { id: 3, title: '全家福', image: 'https://via.placeholder.com/150?text=Photo3' },
    { id: 4, title: '晚年生活', image: 'https://via.placeholder.com/150?text=Photo4' }
  ]

  const audioStories = [
    { id: 1, title: '口述历史：我的教师生涯', duration: '12:34', date: '2023-05-15' },
    { id: 2, title: '家族故事：父亲的教诲', duration: '8:45', date: '2023-06-20' },
    { id: 3, title: '人生感悟：什么是家', duration: '15:20', date: '2023-07-10' }
  ]

  const relations = {
    father: '李忠',
    mother: '王桂英',
    spouse: '王秀英',
    children: ['李明', '李伟', '李娜'],
    grandchildren: ['李强', '李小美']
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handlePlayAudio = (story: any) => {
    Taro.showToast({ title: `播放: ${story.title}`, icon: 'none' })
  }

  return (
    <View className="member-detail-page">
      {/* 顶部导航 */}
      <View className="detail-header">
        <Text className="back-btn" onClick={handleBack}>← 返回</Text>
      </View>

      <ScrollView scrollY={true} className="detail-content">
        {/* 成员大头照和基本信息 */}
        <View className="member-header">
          <Image
            src={memberData.avatar}
            className="member-avatar"
            mode="aspectFill"
          />
          <View className="member-title">
            <Text className="member-name">{memberData.name}</Text>
            <Text className="member-nickname">{memberData.nickname}</Text>
          </View>
          <View className="member-dates">
            <Text className="date-item">{memberData.birthYear}年生</Text>
            {memberData.deathYear && (
              <Text className="date-item">卒于{memberData.deathYear}年</Text>
            )}
          </View>
          <View className="member-basic-info">
            <View className="info-line">
              <Text className="info-label">籍贯:</Text>
              <Text className="info-value">{memberData.birthPlace}</Text>
            </View>
            <View className="info-line">
              <Text className="info-label">职业:</Text>
              <Text className="info-value">{memberData.occupation}</Text>
            </View>
            {memberData.spouse && (
              <View className="info-line">
                <Text className="info-label">配偶:</Text>
                <Text className="info-value">{memberData.spouse}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Tab 导航 */}
        <View className="tab-nav">
          <View
            className={`tab-item ${activeTab === 'biography' ? 'active' : ''}`}
            onClick={() => setActiveTab('biography')}
          >
            生平简介
          </View>
          <View
            className={`tab-item ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            影像回忆
          </View>
          <View
            className={`tab-item ${activeTab === 'audio' ? 'active' : ''}`}
            onClick={() => setActiveTab('audio')}
          >
            音频故事
          </View>
          <View
            className={`tab-item ${activeTab === 'relations' ? 'active' : ''}`}
            onClick={() => setActiveTab('relations')}
          >
            人物关系
          </View>
        </View>

        {/* Tab 内容 */}
        <View className="tab-content">
          {/* 生平简介 */}
          {activeTab === 'biography' && (
            <View className="bio-section">
              <Text className="bio-text">{memberData.biography}</Text>
            </View>
          )}

          {/* 影像回忆 */}
          {activeTab === 'photos' && (
            <View className="photos-section">
              <View className="photo-grid">
                {photoAlbum.map(photo => (
                  <View key={photo.id} className="photo-item">
                    <Image
                      src={photo.image}
                      className="photo-image"
                      mode="aspectFill"
                    />
                    <Text className="photo-title">{photo.title}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* 音频故事 */}
          {activeTab === 'audio' && (
            <View className="audio-section">
              {audioStories.map(story => (
                <View key={story.id} className="audio-item">
                  <View className="audio-icon">🎵</View>
                  <View className="audio-info">
                    <Text className="audio-title">{story.title}</Text>
                    <Text className="audio-meta">{story.duration} · {story.date}</Text>
                  </View>
                  <Button
                    className="play-btn"
                    onClick={() => handlePlayAudio(story)}
                  >
                    ▶
                  </Button>
                </View>
              ))}
            </View>
          )}

          {/* 人物关系 */}
          {activeTab === 'relations' && (
            <View className="relations-section">
              {relations.father && (
                <View className="relation-item">
                  <Text className="relation-label">父亲:</Text>
                  <Text className="relation-value">{relations.father}</Text>
                </View>
              )}
              {relations.mother && (
                <View className="relation-item">
                  <Text className="relation-label">母亲:</Text>
                  <Text className="relation-value">{relations.mother}</Text>
                </View>
              )}
              {relations.spouse && (
                <View className="relation-item">
                  <Text className="relation-label">配偶:</Text>
                  <Text className="relation-value">{relations.spouse}</Text>
                </View>
              )}
              {relations.children.length > 0 && (
                <View className="relation-item">
                  <Text className="relation-label">子女:</Text>
                  <Text className="relation-value">{relations.children.join('、')}</Text>
                </View>
              )}
              {relations.grandchildren.length > 0 && (
                <View className="relation-item">
                  <Text className="relation-label">孙辈:</Text>
                  <Text className="relation-value">{relations.grandchildren.join('、')}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* 底部留白 */}
      <View style={{ height: '110px' }} />
    </View>
  )
}
