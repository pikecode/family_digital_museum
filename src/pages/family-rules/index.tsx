import React, { useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface Rule {
  id: string
  title: string
  content: string
  category: string
  story?: string
}

export default function FamilyRules() {
  const rules: Rule[] = [
    {
      id: '1',
      title: '诚信为本',
      category: '诚信篇',
      content: '待人接物讲究真诚，不欺瞒，不虚伪。商业往来中尤其要守诺言，信誉是生命。',
      story: '曾祖父做生意从不失约，邻里都信任他。'
    },
    {
      id: '2',
      title: '孝道第一',
      category: '孝道篇',
      content: '尊敬父母，孝敬长辈。父母在，不远游；父母之年，不可不知。',
      story: '祖父照顾父亲数十年，从无怨言。'
    },
    {
      id: '3',
      title: '勤奋好学',
      category: '勤学篇',
      content: '学无止境，知识改变命运。鼓励子女读书成才，终身学习。',
      story: '全家人养成了每天阅读的习惯。'
    }
  ]

  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleDetail = (ruleId: string) => {
    Taro.navigateTo({
      url: `/pages/family-rules/rule-detail?ruleId=${ruleId}`
    })
  }

  return (
    <View className="family-rules-page">
      {/* 顶部导航 */}
      <View className="rules-header">
        <Text className="back-btn" onClick={() => Taro.navigateBack()}>← 返回</Text>
        <Text className="page-title">家人家规</Text>
      </View>

      <ScrollView scrollY={true} className="rules-content">
        {/* 核心家训卡 */}
        <View className="core-rule">
          <View className="rule-scroll-frame">
            <Text className="rule-text">
              诚心待人，孝心敬亲，恒心学习，信心做事
            </Text>
          </View>
          <Text className="rule-desc">核心家训 · 代代相传</Text>
        </View>

        {/* 具体家规列表 */}
        <View className="rules-list">
          {rules.map(rule => (
            <View key={rule.id} className="rule-item">
              <View
                className="rule-header"
                onClick={() => handleExpand(rule.id)}
              >
                <View className="rule-title">
                  <Text className="category-badge">{rule.category}</Text>
                  <Text className="title">{rule.title}</Text>
                </View>
                <Text className={`expand-icon ${expandedId === rule.id ? 'expanded' : ''}`}>
                  ▼
                </Text>
              </View>

              {expandedId === rule.id && (
                <View className="rule-body">
                  <Text className="rule-content">{rule.content}</Text>
                  {rule.story && (
                    <View className="rule-story">
                      <Text className="story-label">📖 家族故事</Text>
                      <Text className="story-text">{rule.story}</Text>
                    </View>
                  )}
                  <View className="rule-actions">
                    <Text
                      className="action-link"
                      onClick={() => handleDetail(rule.id)}
                    >
                      查看详情 →
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 底部留白 */}
      <View style={{ height: '110px' }} />
    </View>
  )
}
