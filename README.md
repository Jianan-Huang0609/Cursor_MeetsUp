# Cursor Meetup 前端页面

> 基于 React + TypeScript + Tailwind CSS 的 Cursor Meetup 分享会记录页面

## 🚀 快速开始

### 本地开发
```bash
npm install
npm run dev
```

### 构建部署
```bash
npm run build
npm run preview
```

## 📝 GitHub Pages 部署说明

### 重要：启用 GitHub Pages

1. 访问仓库设置：https://github.com/Jianan-Huang0609/Cursor_MeetsUp/settings/pages

2. 在 "Source" 部分：
   - 选择 "GitHub Actions" 作为部署源
   - 或者选择 "Deploy from a branch"
   - 如果选择分支部署，选择 `main` 分支，文件夹选择 `/docs` 或 `/dist`

3. 保存设置

### 当前状态
- ✅ 代码已推送到 GitHub
- ✅ GitHub Actions 工作流已配置
- ⚠️ 需要手动启用 GitHub Pages

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router (HashRouter)
- **部署**: GitHub Pages + GitHub Actions

## 📁 项目结构

```
src/
├── components/     # React 组件
├── data/          # 数据文件
├── lib/           # 工具函数和类型定义
└── App.tsx        # 主应用组件
```

## 🔧 开发说明

### 添加新嘉宾
在 `src/data/meetup.json` 中添加新的 speaker 对象和对应的 album。

### 样式修改
使用 Tailwind CSS 类名，配置文件在 `tailwind.config.js`。

## 🌐 访问地址

部署完成后访问：https://jianan-huang0609.github.io/Cursor_MeetsUp/

## 📞 问题反馈

如果页面无法访问，请检查：
1. GitHub Pages 是否已启用
2. GitHub Actions 是否成功运行
3. 浏览器控制台是否有错误信息
