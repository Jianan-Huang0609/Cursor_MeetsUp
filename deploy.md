# 部署指南

## GitHub Pages 部署

### 方法一：手动部署

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 目录的内容推送到 GitHub Pages 分支：
```bash
# 创建 gh-pages 分支
git checkout -b gh-pages

# 复制构建文件
cp -r dist/* .

# 提交更改
git add .
git commit -m "Deploy to GitHub Pages"

# 推送到远程仓库
git push origin gh-pages
```

3. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支作为源。

### 方法二：使用 GitHub Actions

1. 在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. 推送代码到 main 分支，GitHub Actions 会自动构建并部署。

## Vercel 部署

1. 访问 [Vercel](https://vercel.com)
2. 连接你的 GitHub 仓库
3. 选择项目并点击 "Deploy"
4. Vercel 会自动检测到 Vite 项目并部署

## Netlify 部署

1. 访问 [Netlify](https://netlify.com)
2. 连接你的 GitHub 仓库
3. 设置构建命令：`npm run build`
4. 设置发布目录：`dist`
5. 点击 "Deploy site"

## 本地预览

构建完成后，可以在本地预览生产版本：

```bash
npm run preview
```

访问 `http://localhost:4173` 查看效果。

## 环境变量

如果需要配置环境变量，可以在项目根目录创建 `.env` 文件：

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=Cursor Meetup
```

## 自定义域名

部署完成后，可以在部署平台设置自定义域名：

- **GitHub Pages**: 在仓库设置中添加自定义域名
- **Vercel**: 在项目设置中添加域名
- **Netlify**: 在站点设置中添加自定义域名
