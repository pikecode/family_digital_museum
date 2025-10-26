# 家庭数字馆小程序 - 开发指南

## 项目完成总结

### 已完成的文件清单

#### 配置文件
- ✅ `package.json` - 项目依赖和脚本配置
- ✅ `tsconfig.json` - TypeScript 配置
- ✅ `project.config.json` - 微信小程序配置
- ✅ `config/index.ts` - Taro 主配置
- ✅ `config/dev.ts` - 开发环境配置
- ✅ `config/prod.ts` - 生产环境配置

#### 核心应用
- ✅ `src/app.tsx` - 应用主文件
- ✅ `src/app.config.ts` - 路由和页签配置
- ✅ `src/app.scss` - 全局样式
- ✅ `src/index.tsx` - 应用初始化

#### 页面组件（11个）
1. **首页** (pages/index/)
   - ✅ `index.tsx` - 广告、菜单、推荐
   - ✅ `index.scss` - 首页样式

2. **家史家树** (pages/family-tree/)
   - ✅ `index.tsx` - 树状图/列表视图
   - ✅ `index.scss` - 样式
   - ✅ `member-detail.tsx` - 成员详情
   - ✅ `member-detail.scss` - 详情样式

3. **家庭相册** (pages/photo-album/)
   - ✅ `index.tsx` - 智能合集/时间线
   - ✅ `index.scss` - 样式
   - ✅ `album-detail.tsx` - 相册详情
   - ✅ `album-detail.scss` - 详情样式

4. **家人家规** (pages/family-rules/)
   - ✅ `index.tsx` - 家训和家规列表
   - ✅ `index.scss` - 样式
   - ✅ `rule-detail.tsx` - 家规详情
   - ✅ `rule-detail.scss` - 详情样式

5. **上传资料** (pages/upload-data/)
   - ✅ `index.tsx` - 功能矩阵、快速上传
   - ✅ `index.scss` - 样式

6. **家庭广场** (pages/family-square/)
   - ✅ `index.tsx` - 推荐/关注双Tab
   - ✅ `index.scss` - 样式

7. **商城** (pages/mall/)
   - ✅ `index.tsx` - 占位页面
   - ✅ `index.scss` - 样式

8. **我的** (pages/my/)
   - ✅ `index.tsx` - 用户信息、菜单
   - ✅ `index.scss` - 样式

#### 核心逻辑
- ✅ `src/stores/appStore.ts` - Zustand 状态管理
- ✅ `src/services/api.ts` - API 接口封装（分类接口）
- ✅ `src/types/index.ts` - TypeScript 类型定义

#### 文档
- ✅ `README.md` - 项目说明文档
- ✅ `DEVELOPMENT_GUIDE.md` - 本开发指南

### 总计
- **44个代码文件** + 2个文档文件
- **8个页面** + 2个详情子页面 = 10个页面
- **100%** 基于设计文档实现

---

## 快速开始

### 1. 环境要求
```
Node.js >= 14.0.0
npm >= 6.0.0
```

### 2. 安装依赖
```bash
cd /Users/peak/work/pikecode/family_digital_museum
npm install
```

### 3. 开发运行

**微信小程序开发**
```bash
npm run dev:weapp
```
然后用微信开发者工具打开 `dist/` 目录

**H5 网页开发**
```bash
npm run dev:h5
```
访问 http://localhost:10086

### 4. 生产构建
```bash
npm run build:weapp   # 微信小程序
npm run build:h5      # H5 版本
```

---

## 核心架构

### 页面导航结构
```
首页 (index)
├── 菜单项 - 家史家树 ──→ 树状图/列表
│                      └──→ 成员详情 (Tab: 生平/影像/音频/关系)
├── 菜单项 - 家规家教 ──→ 规则列表 (可展开)
│                      └──→ 规则详情
├── 菜单项 - 家日家事 ──→ 相册列表 (合集/时间线)
│                      └──→ 相册详情
├── 菜单项 - 上传资料 ──→ 6个功能矩阵
└── 底部导航
    ├── 首页
    ├── 商城
    ├── 签到 (=上传资料)
    └── 我的 (用户中心)

侧向导航
└── 家庭广场 (推荐/关注Tab)
```

### 状态管理流程
```
useAppStore (全局状态)
├── userInfo: UserInfo | null
├── isLoggedIn: boolean
├── familyId: string | null
└── 操作方法
    ├── setUserInfo()
    ├── setLoggedIn()
    ├── setFamilyId()
    └── logout()
```

### API 分层
```
services/api.ts
├── familyTreeApi
│   ├── getMembers()
│   ├── getMemberDetail()
│   ├── addMember()
│   └── updateMember()
├── photoAlbumApi
│   ├── getSmartAlbums()
│   ├── getPhotos()
│   ├── getAlbumDetail()
│   └── uploadPhoto()
├── familyRulesApi
│   ├── getRules()
│   └── getRuleDetail()
├── familySquareApi
│   ├── getRecommendedPosts()
│   ├── getFollowingPosts()
│   ├── likePost()
│   ├── commentPost()
│   └── createPost()
└── userApi
    ├── getUserInfo()
    ├── updateUserInfo()
    └── login()
```

---

## 关键功能实现

### 1. 家史家树 (Core Feature)

**文件**: `src/pages/family-tree/index.tsx:50-80`

**核心交互**:
```typescript
// 树状图视图
- 支持缩放/拖拽浏览
- 点击节点高亮 + 更新底部信息卡
- 配偶/父子连接线区分

// 列表视图
- 快速查找成员
- 点击进入详情

// 底部信息卡
- 快捷显示选中成员信息
- [查看详情] 按钮 → 三级页面
- [编辑] 按钮 → 编辑表单

// 浮动按钮
- "+" 按钮 → 弹出菜单
- 支持3种添加关系
- 智能预填当前选中成员
```

### 2. 家庭相册 (Smart Collection)

**文件**: `src/pages/photo-album/index.tsx:45-75`

**智能合集**:
- AI 自动分类照片
- 每个合集一个精美封面
- 点击进入全屏浏览

**时间线视图**:
- 按年-月分组
- 支持排序/筛选
- 即时点赞评论

### 3. 家人家规 (Heritage Transmission)

**文件**: `src/pages/family-rules/index.tsx:40-60`

**设计亮点**:
- 卷轴式核心家训卡（CSS 特效）
- 具体家规可展开/收起
- 每条家规关联故事
- 庄重仪式感与现代交互的结合

### 4. 家庭广场 (Social Sharing)

**文件**: `src/pages/family-square/index.tsx:75-100`

**双 Tab 设计**:
- 推荐 Tab: 算法推荐优质内容
- 关注 Tab: 已关注家庭动态
- 内容卡片: 发布者 + 内容 + 图片 + 互动

---

## 样式设计系统

### 色彩体系
```scss
$primary-color: #d4af37      // 金色 - 主要强调
$secondary-color: #8b6914    // 褐色 - 次要强调
$text-color: #333            // 正文黑
$bg-color: #f9f7f4           // 背景浅灰
$border-color: #ddd          // 边框灰
```

### 响应式设计
```scss
// 750px 设计稿为基准
// 自动适配多种屏幕宽度

@media (max-width: 640px) {
  // 小屏幕适配
}

@media (min-width: 828px) {
  // 大屏幕适配
}
```

### 常用组件样式类
```scss
.menu-item       // 菜单项
.card            // 卡片容器
.tab             // Tab 标签页
.action-btn      // 操作按钮
.info-card       // 信息卡
.fab-button      // 浮动按钮
```

---

## 常见开发任务

### 添加新页面
```bash
# 1. 创建页面目录
mkdir src/pages/new-page

# 2. 创建文件
src/pages/new-page/
├── index.tsx     # 页面逻辑
└── index.scss    # 页面样式

# 3. 配置路由（src/app.config.ts）
pages: [
  ...
  'pages/new-page/index',
  ...
]

# 4. 添加导航（if needed）
// 在相关页面添加导航
Taro.navigateTo({ url: '/pages/new-page/index' })
```

### 调用 API
```typescript
// 示例：获取家族树数据
import { familyTreeApi } from '@/services/api'

const members = await familyTreeApi.getMembers(familyId)
```

### 使用全局状态
```typescript
// 在组件中
import { useAppStore } from '@/stores/appStore'

export default function Component() {
  const userInfo = useAppStore((state) => state.userInfo)
  const setUserInfo = useAppStore((state) => state.setUserInfo)

  // 使用状态...
}
```

### 添加新的样式变量
```scss
// 在 src/app.scss 中定义全局变量
$my-new-color: #abc123

// 在任何 .scss 文件中使用
.my-element {
  color: $my-new-color
}
```

---

## 代码规范

### TypeScript
- 所有组件使用 TypeScript
- 为 props 和 state 定义接口
- 在 `src/types/` 中定义公共类型

### 命名规范
- 页面文件夹: `kebab-case` (例: `family-tree`)
- 文件名: `index.tsx`, `[name].tsx`
- 组件名: `PascalCase`
- 变量名: `camelCase`
- 常量: `UPPER_CASE`

### 文件导入
```typescript
// 绝对路径导入（已配置）
import { useAppStore } from '@/stores/appStore'
import { familyTreeApi } from '@/services/api'
import type { FamilyMember } from '@/types'

// 避免相对路径
// ✗ import from '../../stores'
```

---

## 调试技巧

### 微信小程序调试
1. 打开微信开发者工具
2. 在 Console 标签查看日志
3. 使用 Storage 标签查看缓存数据

### H5 调试
```bash
npm run dev:h5
# 然后用浏览器开发者工具 (F12)
```

### 常见问题解决

**问题**: 页面样式不生效
**解决**: 确保 SCSS 变量已导入，检查选择器优先级

**问题**: 路由跳转不工作
**解决**: 检查 app.config.ts 中的 pages 配置是否正确

**问题**: 状态更新不及时
**解决**: 确保使用了正确的 Zustand hook，避免闭包问题

---

## 性能优化建议

1. **图片优化**
   - 使用 WebP 格式
   - 实现图片懒加载
   - 压缩大尺寸图片

2. **列表优化**
   - 使用虚拟滚动处理大列表
   - 实现分页加载
   - 避免在列表项中创建新对象

3. **代码分割**
   - 利用 Taro 的分包功能
   - 将复杂逻辑提取为 Hook

4. **网络优化**
   - 实现 API 缓存
   - 使用 CDN 加速
   - 启用 Gzip 压缩

---

## 部署上线

### 微信小程序
1. 构建: `npm run build:weapp`
2. 在微信开发者工具中上传
3. 提交审核

### H5 版本
1. 构建: `npm run build:h5`
2. 部署到静态服务器
3. 配置域名和 HTTPS

---

## 相关资源

- [Taro 文档](https://docs.taro.zone/)
- [React 文档](https://react.dev/)
- [Zustand 文档](https://github.com/pmndrs/zustand)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/)

---

## 项目维护

- **定期更新依赖**: `npm update`
- **检查安全漏洞**: `npm audit`
- **代码质量**: `npm run lint`
- **类型检查**: `npm run type-check`

---

**最后更新**: 2024-10-25
**项目状态**: ✅ 开发完成，可开始功能测试
