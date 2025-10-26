# 快速开始指南

## 问题修复

已修复 npm 依赖错误，使用正确的 Taro 4 官方依赖：
- ✅ `@tarojs/cli` - Taro 命令行工具
- ✅ `@tarojs/helper` - Taro 辅助工具
- ✅ `@tarojs/plugin-platform-weapp` - 微信小程序编译插件
- ✅ `@tarojs/plugin-platform-h5` - H5 编译插件

注：webpack 和 babel 由 Taro 自动管理，无需显式安装

## 安装步骤

### 1. 清理旧依赖（如果之前执行过 npm install）
```bash
rm -rf node_modules
rm package-lock.json
```

### 2. 重新安装依赖
```bash
npm install
```

这会自动安装 package.json 中的所有依赖，包括修复后的插件。

### 3. 验证安装成功
```bash
npm list @tarojs/plugin-platform-weapp
```

如果能看到版本号，说明安装成功。

---

## 开发运行

### 开发微信小程序
```bash
npm run dev:weapp
```

输出：
```
✔ Taro build success!
√ dist 文件夹生成成功
```

然后用 **微信开发者工具** 打开 `dist/` 文件夹：
1. 打开微信开发者工具
2. 点击 "导入项目"
3. 选择你的 `family_digital_museum` 项目根目录
4. 确保 "appid" 是有效的（可用测试号）

### 开发 H5 网页版本
```bash
npm run dev:h5
```

输出：
```
  Taro build success!
  ✔ H5 server running at http://localhost:10086/
```

在浏览器中访问：http://localhost:10086

---

## 项目构建

### 构建微信小程序
```bash
npm run build:weapp
```

生成的文件位于 `dist/` 目录，可用微信开发者工具上传。

### 构建 H5 网页版本
```bash
npm run build:h5
```

生成的文件位于 `dist/` 目录，可部署到 Web 服务器。

---

## 常见问题

### Q: 执行 npm run dev:weapp 报错找不到插件
**A**: 已修复依赖包，请按以下步骤操作：
```bash
rm -rf node_modules package-lock.json
npm install
```
如果仍然报错，尝试清理 npm 缓存：
```bash
npm cache clean --force
npm install
```

### Q: 微信开发者工具打开后显示"项目配置错误"
**A**: 检查以下内容：
1. 确保已在 dist 文件夹找到 `app.json` 文件
2. 检查 `project.config.json` 中的 appid 是否正确
3. 可以使用测试号 (微信开发者工具会自动配置)

### Q: H5 开发时样式加载不出来
**A**: 这是正常的，可能需要硬刷新浏览器：`Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac)

### Q: 修改了代码但页面没有更新
**A**:
- 微信小程序：等待编译完成（下方编译器会显示 ✔）
- H5：浏览器会自动热更新，如果没有可尝试硬刷新

---

## 项目文件说明

```
family_digital_museum/
├── config/                 # Taro 编译配置
├── src/
│   ├── pages/             # 8个页面，每个都包含 .tsx 和 .scss 文件
│   ├── stores/            # Zustand 全局状态管理
│   ├── services/          # API 接口调用
│   ├── types/             # TypeScript 类型定义
│   ├── app.tsx            # 应用主文件
│   ├── app.config.ts      # 页面和导航栏配置
│   └── app.scss           # 全局样式
├── package.json           # 依赖管理
├── tsconfig.json          # TypeScript 配置
├── babel.config.js        # Babel 配置 ✨ 新增
├── .eslintrc.js           # ESLint 配置 ✨ 新增
├── .gitignore             # Git 忽略文件 ✨ 新增
├── project.config.json    # 微信小程序配置
├── README.md              # 项目说明
├── DEVELOPMENT_GUIDE.md   # 开发指南
└── QUICK_START.md         # 本文件
```

---

## 下一步开发

1. **修改小程序信息**
   - 编辑 `project.config.json` 中的 `projectname` 和 `appid`
   - 编辑 `src/app.config.ts` 中的 `navigationBarTitleText`

2. **连接后端 API**
   - 在 `src/services/api.ts` 中修改 `API_BASE_URL`
   - 实现各个接口的真实请求

3. **定制样式和交互**
   - 修改 `src/app.scss` 中的色彩变量
   - 在各个页面的 `.scss` 文件中调整样式

4. **添加用户认证**
   - 在 `src/stores/appStore.ts` 中完善登录状态管理
   - 在 `src/services/api.ts` 中实现登录接口

---

## 有用的命令

```bash
# 代码质量检查
npm run lint

# TypeScript 类型检查
npm run type-check

# 清理编译输出
rm -rf dist

# 更新依赖
npm update

# 检查安全漏洞
npm audit
```

---

## 调试技巧

### 微信小程序调试
- 在微信开发者工具中使用 "Console" 标签查看日志
- 使用 "Storage" 标签查看本地存储数据
- 使用 "Network" 标签监控网络请求

### H5 调试
- 按 F12 或右键 → 检查元素打开浏览器开发者工具
- 在 Console 标签中查看日志
- 在 Sources 标签中设置断点调试

---

## 需要帮助？

- 查看 [Taro 官方文档](https://docs.taro.zone/)
- 查看 [React 文档](https://react.dev/)
- 查看 `DEVELOPMENT_GUIDE.md` 获取更详细的开发指南

---

**祝开发愉快！** 🚀
