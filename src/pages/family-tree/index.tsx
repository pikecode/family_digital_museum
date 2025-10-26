import React, { useState } from 'react'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface FamilyMember {
  id: string
  name: string
  nickname: string
  birthYear: string
  relationship: string
  gender: 'male' | 'female'
  avatar?: string
}

interface MemberInfo {
  id: string
  name: string
  nickname: string
  birthYear: string
  deathYear?: string
  relationship: string
  spouse?: string
  avatar?: string
}

export default function FamilyTree() {
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree')
  const [selectedMember, setSelectedMember] = useState<MemberInfo | null>(null)

  // 示例家族数据
  const familyMembers: FamilyMember[] = [
    {
      id: '1',
      name: '李建国',
      nickname: '爷爷',
      birthYear: '1945',
      relationship: 'patriarch',
      gender: 'male'
    },
    {
      id: '2',
      name: '王秀英',
      nickname: '奶奶',
      birthYear: '1950',
      relationship: 'matriarch',
      gender: 'female'
    },
    {
      id: '3',
      name: '李明',
      nickname: '父亲',
      birthYear: '1970',
      relationship: 'father',
      gender: 'male'
    },
    {
      id: '4',
      name: '张丽',
      nickname: '母亲',
      birthYear: '1972',
      relationship: 'mother',
      gender: 'female'
    },
    {
      id: '5',
      name: '李伟',
      nickname: '大伯',
      birthYear: '1968',
      relationship: 'uncle',
      gender: 'male'
    }
  ]

  const handleMemberClick = (member: FamilyMember) => {
    setSelectedMember({
      ...member,
      deathYear: undefined,
      spouse: member.nickname === '爷爷' ? '王秀英' : undefined,
      avatar: `https://via.placeholder.com/60?text=${member.name}`
    })
  }

  const handleAddMember = () => {
    Taro.showModal({
      title: '添加成员',
      content: '选择添加关系',
      cancelText: '取消',
      confirmText: '确定'
    }).then(res => {
      if (res.confirm) {
        Taro.navigateTo({ url: '/pages/family-tree/member-detail' })
      }
    })
  }

  const handleViewMemberDetail = () => {
    if (selectedMember) {
      Taro.navigateTo({
        url: `/pages/family-tree/member-detail?memberId=${selectedMember.id}`
      })
    }
  }

  const handleEditMember = () => {
    Taro.showToast({ title: '编辑功能开发中', icon: 'none' })
  }

  return (
    <View className="family-tree-page">
      {/* 顶部导航栏 */}
      <View className="top-bar">
        <View className="top-left">
          <Text className="back-btn" onClick={() => Taro.navigateBack()}>← 返回</Text>
          <Text className="page-title">家史家树</Text>
        </View>
        <View className="top-right">
          <Button
            className={`view-btn ${viewMode === 'tree' ? 'active' : ''}`}
            onClick={() => setViewMode('tree')}
            size="mini"
          >
            树状图
          </Button>
          <Button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            size="mini"
          >
            列表
          </Button>
        </View>
      </View>

      {/* 主内容区 */}
      <ScrollView className="content-area" scrollY={true}>
        {viewMode === 'tree' ? (
          // 树状图视图
          <View className="tree-view">
            <View className="tree-container">
              {/* 简化的树状图表示 */}
              <View className="tree-node patriarch">
                <View
                  className="node-avatar"
                  onClick={() => handleMemberClick(familyMembers[0])}
                >
                  <Image
                    src="https://via.placeholder.com/60?text=李建国"
                    className="avatar-img"
                  />
                </View>
                <Text className="node-name">李建国</Text>
                <Text className="node-relation">爷爷</Text>
              </View>

              {/* 配偶连接线和配偶节点 */}
              <View className="spouse-group">
                <View className="connection-line horizontal" />
                <View className="tree-node">
                  <View
                    className="node-avatar"
                    onClick={() => handleMemberClick(familyMembers[1])}
                  >
                    <Image
                      src="https://via.placeholder.com/60?text=王秀英"
                      className="avatar-img"
                    />
                  </View>
                  <Text className="node-name">王秀英</Text>
                  <Text className="node-relation">奶奶</Text>
                </View>
              </View>

              {/* 子女分支 */}
              <View className="children-group">
                <View className="vertical-line" />
                <View className="horizontal-line" />

                <View className="tree-node">
                  <View
                    className="node-avatar"
                    onClick={() => handleMemberClick(familyMembers[2])}
                  >
                    <Image
                      src="https://via.placeholder.com/60?text=李明"
                      className="avatar-img"
                    />
                  </View>
                  <Text className="node-name">李明</Text>
                  <Text className="node-relation">父亲</Text>
                </View>

                <View className="tree-node">
                  <View
                    className="node-avatar"
                    onClick={() => handleMemberClick(familyMembers[4])}
                  >
                    <Image
                      src="https://via.placeholder.com/60?text=李伟"
                      className="avatar-img"
                    />
                  </View>
                  <Text className="node-name">李伟</Text>
                  <Text className="node-relation">大伯</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          // 列表视图
          <View className="list-view">
            {familyMembers.map(member => (
              <View
                key={member.id}
                className="list-item"
                onClick={() => handleMemberClick(member)}
              >
                <Image
                  src={`https://via.placeholder.com/50?text=${member.name}`}
                  className="list-avatar"
                />
                <View className="list-content">
                  <Text className="list-name">{member.name}</Text>
                  <Text className="list-relation">{member.nickname} · 生于 {member.birthYear} 年</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 底部信息卡 */}
      {selectedMember && (
        <View className="info-card">
          <View className="card-header">
            <Text className="card-title">成员信息</Text>
          </View>
          <View className="card-content">
            <View className="info-item">
              <Text className="info-label">姓名:</Text>
              <Text className="info-value">{selectedMember.name}</Text>
            </View>
            <View className="info-item">
              <Text className="info-label">称谓:</Text>
              <Text className="info-value">{selectedMember.nickname}</Text>
            </View>
            <View className="info-item">
              <Text className="info-label">生于:</Text>
              <Text className="info-value">{selectedMember.birthYear} 年</Text>
            </View>
            {selectedMember.spouse && (
              <View className="info-item">
                <Text className="info-label">配偶:</Text>
                <Text className="info-value">{selectedMember.spouse}</Text>
              </View>
            )}
          </View>
          <View className="card-actions">
            <Button className="action-btn primary" onClick={handleViewMemberDetail}>
              查看详情
            </Button>
            <Button className="action-btn secondary" onClick={handleEditMember}>
              编辑
            </Button>
          </View>
        </View>
      )}

      {/* 底部悬浮按钮 */}
      <View className="fab-button" onClick={handleAddMember}>
        <Text>+</Text>
      </View>

      {/* 底部留白，避免与导航栏重叠 */}
      <View style={{ height: selectedMember ? '200px' : '110px' }} />
    </View>
  )
}
