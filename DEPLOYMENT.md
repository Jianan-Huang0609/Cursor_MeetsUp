# GitHub Pages 部署说明

## 部署流程

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

### 自动部署
1. 当代码推送到 `main` 分支时，GitHub Actions 会自动触发构建和部署
2. 构建过程：
   - 安装依赖 (`pnpm install`)
   - 构建项目 (`pnpm run build`)
   - 将 `dist` 目录部署到 GitHub Pages

### 手动部署
如果需要手动触发部署：
1. 推送代码到 `main` 分支
2. 在 GitHub 仓库页面，进入 Actions 标签页
3. 选择 "Deploy to GitHub Pages" 工作流
4. 点击 "Run workflow" 按钮

### 访问地址
部署完成后，可以通过以下地址访问：
- https://jianan-huang0609.github.io/Cursor_MeetsUp/

### 注意事项
- 确保 `vite.config.ts` 中的 `base` 路径正确设置为 `/Cursor_MeetsUp/`
- 所有静态资源路径都会自动添加正确的前缀
- 部署可能需要几分钟时间，可以在 Actions 页面查看进度

### 故障排除
如果部署失败：
1. 检查 Actions 页面的错误日志
2. 确保所有依赖都正确安装
3. 验证构建过程在本地可以正常运行 (`pnpm run build`)
