# Cursor Meetup 前端页面

> 聚合与沉淀 Cursor Meetup 的学习要点，形成"可浏览、可检索、可持续补充"的信息页面。

## 项目特色

- 🎯 **清晰布局**：左侧时间轴 + 顶部嘉宾选择 + 两栏内容 + 底部照片展区
- 🔍 **智能筛选**：支持按嘉宾过滤和快速定位
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🎨 **现代 UI**：基于 Tailwind CSS 和 Framer Motion 的优雅界面
- 📊 **数据驱动**：JSON 数据源，易于维护和扩展
- 🖼️ **照片管理**：按嘉宾分相册，支持预览和轮播

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看效果。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # React 组件
│   ├── SidebarTimeline.tsx    # 左侧时间轴
│   ├── HeaderChips.tsx        # 顶部分享嘉宾
│   ├── TalkCards.tsx          # 演讲卡片
│   ├── PracticeBoard.tsx      # 实践面板
│   └── PhotoGallery.tsx       # 照片画廊
├── data/
│   └── meetup.json            # 活动数据
├── lib/
│   ├── types.ts               # TypeScript 类型定义
│   └── utils.ts               # 工具函数
└── App.tsx                    # 主应用组件
```

## 数据格式

项目使用 JSON 数据源，包含以下结构：

- **Event**: 活动基本信息
- **Speakers**: 嘉宾信息和演讲内容
- **Albums**: 照片相册

详细的数据结构请参考 `src/lib/types.ts`。

## 功能特性

### 左侧时间轴
- 显示活动日期和嘉宾信息
- 点击快速定位到对应内容
- 滚动时自动高亮当前区域

### 顶部分享嘉宾
- 支持定位模式和过滤模式
- 点击嘉宾快速跳转或筛选内容
- 响应式设计，移动端友好

### 演讲卡片
- 分页显示嘉宾演讲内容
- 支持键盘快捷键翻页（←/→）
- 包含一句话总结、关键观点和 Tips

### 实践面板
- 合并所有嘉宾的实践要点
- 支持复制和导出 Markdown
- 实时统计信息

### 照片画廊
- 按嘉宾分相册展示
- 支持图片预览和轮播
- 键盘导航（Esc 关闭，←/→ 切换）

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **UI 组件**: Radix UI

## 部署

### GitHub Pages

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 目录内容推送到 GitHub Pages 分支

### Vercel

1. 连接 GitHub 仓库
2. 自动部署，无需额外配置

## 自定义配置

### 添加新嘉宾

1. 在 `src/data/meetup.json` 中添加嘉宾信息
2. 在 `public/assets/` 下创建对应的照片目录
3. 更新相册数据

### 修改样式

项目使用 Tailwind CSS，可以通过修改 `tailwind.config.js` 和 `src/index.css` 来自定义样式。

### 添加新功能

所有组件都是模块化设计，可以轻松添加新功能或修改现有功能。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
