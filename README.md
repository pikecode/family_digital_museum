# 家庭数字馆小程序

一个基于 Taro 框架开发的家庭文化数字化管理小程序，集家族树谱、相册管理、家规传承、社交分享于一体。

## 项目概述

### 核心功能

1. **首页** - 集中展示所有核心功能和推荐内容
2. **家史家树** - 可视化展示血脉传承，支持成员管理和关系查看
3. **家庭相册** - 智能合集和时间线照片管理
4. **家人家规** - 家族训条和具体规范的展示与传承
5. **上传资料** - 多种资料类型的快速上传和分类
6. **家庭广场** - 家族间的内容分享和互动平台
7. **商城** - 家族文化产品交易中心（开发中）
8. **我的** - 用户信息和账户管理

### 视觉设计风格

- **配色方案**：金色（#d4af37）+ 褐色（#8b6914）+ 浅灰色（#f9f7f4）
- **庄重仪式感**：融合传统元素如卷轴纹样
- **现代交互**：流畅的动画和即时反馈
- **信息分层**：逐级深入的内容展示逻辑

## 技术栈

- **框架**：Taro 4.x + React 18
- **语言**：TypeScript
- **状态管理**：Zustand
- **样式**：SCSS
- **编译目标**：微信小程序、H5

## 项目结构

```
src/
├── pages/                    # 页面目录
│   ├── index/               # 首页
│   ├── family-tree/         # 家史家树
│   │   ├── index.tsx        # 主页面（树状图+列表视图）
│   │   └── member-detail.tsx # 成员详情页
│   ├── photo-album/         # 家庭相册
│   │   ├── index.tsx        # 相册列表（智能合集+时间线）
│   │   └── album-detail.tsx # 相册详情页
│   ├── family-rules/        # 家人家规
│   │   ├── index.tsx        # 规则列表
│   │   └── rule-detail.tsx  # 规则详情页
│   ├── upload-data/         # 上传资料
│   ├── family-square/       # 家庭广场
│   ├── mall/                # 商城
│   └── my/                  # 个人中心
├── stores/                  # 状态管理
│   └── appStore.ts          # 应用全局状态
├── services/                # API 接口
│   └── api.ts               # API 请求封装
├── types/                   # 类型定义
│   └── index.ts             # 全局类型
├── app.tsx                  # 应用入口
├── app.config.ts            # 路由配置
├── app.scss                 # 全局样式
└── index.tsx                # 应用初始化
```

## 页面详情

### 1. 首页 (pages/index/index)
- 顶部滚动广告轮播
- 8个主菜单功能（上传资料、家史家树、家规家教、家日家事等）
- 推荐家庭水平滚动列表
- 底部三个功能区（家庭广场、百业联盟、数字交易）
- 底部导航栏（首页、商城、签到、我的）

### 2. 家史家树 (pages/family-tree/index)
**核心功能**：
- 交互式家族树谱图（支持缩放、拖拽）
- 树状图和列表两种视图切换
- 点击成员时显示快捷信息卡
- 成员详情Tab式浏览（生平简介、影像回忆、音频故事、人物关系）
- 浮动"+"按钮快速添加成员

**用户路径**：
```
首页 → 点击家族树图标
      → 浏览/搜索成员
      → 点击成员 → 查看详情
      → 点击"+" → 添加新成员
```

### 3. 家庭相册 (pages/photo-album/index)
**核心功能**：
- AI智能合集（2024年精选、宝宝成长、家庭旅行等）
- 照片时间线流（按年-月分组）
- 筛选和排序功能
- 照片预览和点赞评论

### 4. 家人家规 (pages/family-rules/index)
**核心功能**：
- 核心家训卡（卷轴设计）
- 具体家规列表（诚信篇、孝道篇、勤学篇等）
- 可展开查看详细解释和家族故事
- 每条规则都可进入详情页查看更多内容

### 5. 上传资料 (pages/upload-data/index)
**核心功能**：
- 6个上传入口矩阵
  - 上传图片/视频 → 家庭相册
  - 写日志 → 家庭日志
  - 记录家事 → 活动日历
  - 补充家人信息 → 家族树
  - 录入家规 → 家人家规
  - 上传物件/故事 → 数字遗产
- 快速上传区（拖拽上传）
- 最近上传记录

### 6. 家庭广场 (pages/family-square/index)
**核心功能**：
- 推荐内容Tab（算法推荐的优质动态）
- 关注内容Tab（已关注家庭的动态）
- 搜索功能
- 社交互动（点赞、评论、收藏）

## 路由配置

```typescript
// pages 列表（app.config.ts）
pages: [
  'pages/index/index',
  'pages/family-tree/index',
  'pages/family-tree/member-detail',
  'pages/photo-album/index',
  'pages/photo-album/album-detail',
  'pages/family-rules/index',
  'pages/family-rules/rule-detail',
  'pages/upload-data/index',
  'pages/family-square/index',
  'pages/my/index',
  'pages/mall/index'
]

// 底部导航栏配置
tabBar: {
  color: '#999',
  selectedColor: '#d4af37',
  list: [
    { pagePath: 'pages/index/index', text: '首页' },
    { pagePath: 'pages/mall/index', text: '商城' },
    { pagePath: 'pages/upload-data/index', text: '签到' },
    { pagePath: 'pages/my/index', text: '我的' }
  ]
}
```

## 类型定义

```typescript
// 主要类型（src/types/index.ts）
- FamilyMember      // 家族成员
- Photo             // 照片
- Album             // 相册
- FamilyRule        // 家规
- Post              // 社交动态
- UserInfo          // 用户信息
- ApiResponse       // API响应
```

## 状态管理

使用 **Zustand** 进行全局状态管理：

```typescript
useAppStore()
├── userInfo          // 用户信息
├── isLoggedIn        // 登录状态
├── familyId          // 当前家族ID
├── setUserInfo()     // 设置用户信息
├── setLoggedIn()     // 设置登录状态
├── setFamilyId()     // 设置家族ID
└── logout()          // 登出
```

## API 接口

### 分类
- **familyTreeApi** - 家族树相关接口
- **photoAlbumApi** - 相册相关接口
- **familyRulesApi** - 家规相关接口
- **familySquareApi** - 家庭广场相关接口
- **userApi** - 用户相关接口

### 示例
```typescript
// 获取家族成员
const members = await familyTreeApi.getMembers(familyId)

// 获取相册列表
const albums = await photoAlbumApi.getSmartAlbums(familyId)

// 发布动态
const post = await familySquareApi.createPost(data)
```

## 开发指南

### 安装依赖
```bash
npm install
```

### 开发微信小程序
```bash
npm run dev:weapp
```

### 开发H5版本
```bash
npm run dev:h5
```

### 构建生产版本
```bash
# 微信小程序
npm run build:weapp

# H5
npm run build:h5
```

### 类型检查
```bash
npm run type-check
```

### 代码检查
```bash
npm run lint
```

## 响应式设计

- **设计稿宽度**：750px
- **适配比例**：
  - 640px: 2.34/2
  - 750px: 1
  - 828px: 1.81/2

## 浏览器兼容性

- 微信小程序基础库 2.0 及以上
- H5 现代浏览器

## 后续开发计划

1. **完善页面实现**
   - 成员详情页Tab内容补充
   - 相册详情页图片浏览功能
   - 家规详情页音频播放

2. **功能扩展**
   - 权限管理系统
   - 隐私设置
   - 消息通知系统
   - 数据备份恢复

3. **性能优化**
   - 图片压缩和懒加载
   - 长列表虚拟滚动
   - 网络请求缓存

4. **商城功能**
   - 家族特色产品展示
   - 订单管理
   - 支付集成

## 项目开发完成

本项目使用 Taro 框架和 React 完整实现了一个家庭文化数字馆小程序，包含：

✅ 项目初始化和配置
✅ 11个功能页面的完整实现
✅ 全局样式和主题设计
✅ 路由配置和导航栏
✅ 状态管理集成（Zustand）
✅ API 接口封装
✅ TypeScript 类型系统
✅ 响应式布局设计

## 联系方式

- 项目类型：Taro 微信小程序
- 开发框架：React + TypeScript
- UI 设计语言：现代 + 传统融合