# Cursor Meetup 前端页面需求文档（V1）

> 目标：把你在 Cursor Meetup 的笔记内容转成一个可持续维护的前端页面，适配你给出的线框（左侧纵向时间轴 + 顶部“分享嘉宾”区块 + 中间两栏内容 + 底部照片展区）。本需求文档包含信息架构、组件设计、数据结构、交互细节、样式规范、开发与部署方案，以及基于 PDF 解析出的初始内容映射与填充示例。

---

## 1. 项目背景与目标

- **背景**：聚合与沉淀 Cursor Meetup 的学习要点，形成“可浏览、可检索、可持续补充”的信息页面。
- **目标**：
  1. 用清晰布局承载多位嘉宾的信息与你的个人实践/思考；
  2. 支持后续持续追加内容（新嘉宾、新照片、新实践）；
  3. 为二次分发（小红书/博客/演讲）提供结构化资料来源；
  4. 适配 GitHub Pages 部署，静态可直出，后续可平滑升级为动态站点。

---

## 2. 用户与场景

- **核心用户**：你本人 + 熟悉你项目的同事/朋友；
- **访问场景**：PC 浏览为主，移动端阅读兼顾；
- **关键需求**：快速定位到某位嘉宾 → 查看其要点与你的落地实践 → 预览相关照片与素材。

---

## 3. 信息架构（IA）

### 3.1 顶层结构

- 顶部：站点标题 / 简介（可选）
- **分享嘉宾（横向 List/Chips）**：用于筛选或定位；
- 主体区域：
  - 左侧：**纵向时间轴（Sticky）**；
  - 右侧：两栏布局
    - 左栏：**嘉宾分享的内容（卡片可分页/翻页）**
    - 右栏：**个人实践与思考（合并为尽量一页的 Bullet List）**
- 底部：**照片展示（按嘉宾分相册/可轮播/可懒加载）**

### 3.2 内容分层

- **Event（活动信息）**：时间、地点、流程。
- **Speaker（嘉宾）**：姓名、头衔/身份、摘要、标签。
- **Talk（分享内容）**：一句话总结、关键观点、推荐工作流/工具、Tips、延伸链接。
- **Practice（你的实践/思考）**：行动清单、原则、方法论、落地 Demo。
- **Album（相册）**：嘉宾 N 的照片集合（后续你补齐实际图片）。

---

## 4. 数据结构（建议以 JSON 驱动）

```json
{
  "event": {
    "title": "Cursor Meetup",
    "date": "2025-08-16",
    "place": "浦东软件园-2号楼",
    "agenda": ["六位嘉宾分享（答疑）","抽奖与茶歇","开放麦+1min 投屏"]
  },
  "speakers": [
    {
      "id": "guest-1",
      "name": "Kiro",
      "role": "AWS 产品经理",
      "summary": "Cursor 擅长单节点任务；长开发与难项目需按软件全生命周期优化执行。",
      "tags": ["软件生命周期","版本管理","团队协作"],
      "talk": {
        "one_liner": "以 SDLC 管理 Cursor 项目：需求→架构→开发→测试→发布→版本→维护",
        "highlights": [
          "用 chatbox 多轮澄清需求与坑位",
          "版本更新入库为“记忆”，打标签并 push 到 Git",
          "子模块 MVP + 分步测试 + 版本管理"
        ],
        "tips": [
          "将大版本更新转成 Cursor 可用的记忆块",
          "定期交流/组队编程，复用函数"
        ]
      },
      "practice": [
        "为每个模块建立可回滚的版本记忆",
        "先顶层框架→分模块→测试用例→再合并"
      ],
      "albumId": "album-guest-1"
    }
  ],
  "albums": [
    { "id": "album-guest-1", "title": "嘉宾1", "images": [] },
    { "id": "album-guest-2", "title": "嘉宾2", "images": [] },
    { "id": "album-guest-3", "title": "嘉宾3", "images": [] }
  ]
}
```

> 说明：你后续只需在 `albums[*].images` 中追加图片 URL（或相对路径，如 `assets/guest-1/001.jpg`）。

---

## 5. 页面与组件设计

### 5.1 布局与核心组件

- **Layout**：

  - `SidebarTimeline`（左侧 Sticky 时间轴）：
    - 显示活动日期点与嘉宾锚点；
    - 点击某点 → 滚动到对应嘉宾区；
  - `HeaderChips`（顶部分享嘉宾）：
    - 横向滚动 Chips；点击 Chip → 过滤/定位；
  - `ContentGrid`（右侧两栏）：
    - 左列：`TalkCards` 支持分页（每页 1–3 张卡片）；
    - 右列：`PracticeBoard` 将你的要点合并为一页 Bullet；
  - `PhotoGallery`（底部）：
    - 相册 Tabs（嘉宾1/2/3…）+ 每个相册内部轮播（Carousel）或瀑布流（Masonry）；

- **TalkCards（卡片）**

  - 结构：标题（嘉宾名+一句话总结）/ 关键观点列表 / Tips / 推荐流程图（可选）；
  - 翻页：上一页/下一页按钮或分页指示点；

- **PracticeBoard（右侧合并区）**

  - 结构：你的行动项（Action Items）、原则（Principles）、落地 Demo/链接；
  - 提供导出 Markdown/复制按钮；

- **PhotoGallery**

  - 支持按嘉宾分组；
  - 图片懒加载、点击放大、键盘左右切换；

### 5.2 交互细节

- 左侧时间轴 **始终吸附（sticky）**；向下滚动时高亮当前区块。
- 顶部嘉宾 Chips 提供 **Filter 模式**（过滤页面内容）与 **Jump 模式**（滚动定位）二选一开关（默认 Jump）。
- 卡片区域支持键盘快捷键 `←/→` 翻页。
- 照片支持 `Esc` 关闭预览、`←/→` 切换。

### 5.3 响应式

- ≥1280px：三栏视觉（左侧细窄时间轴 + 右侧两栏内容）。
- 768–1279px：时间轴缩为点状；右侧降为单列：Talk 在上、Practice 折叠/展开。
- <768px：顶部 Chips + 单列纵向；照片轮播全宽；底部返回顶部按钮。

---

## 6. 技术栈与样式

- **技术栈**：Vite + React + TypeScript + TailwindCSS；
- **UI 组件**：shadcn/ui（Card, Tabs, Badge, Button, Dialog, Carousel）+ lucide-react 图标；
- **动效**：Framer Motion（淡入/滑动/翻页）；
- **图片**：`<img loading="lazy">`，必要时用 `react-photo-view`/自研 Lightbox。
- **字体**：系统字体或 Inter；中文使用本地系统字体（苹方/思源黑体）。

---

## 7. 目录结构（建议）

```
/ (repo root)
├─ index.html
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ components/
│  │  ├─ SidebarTimeline.tsx
│  │  ├─ HeaderChips.tsx
│  │  ├─ TalkCards.tsx
│  │  ├─ PracticeBoard.tsx
│  │  └─ PhotoGallery.tsx
│  ├─ data/
│  │  └─ meetup.json
│  ├─ lib/
│  │  └─ types.ts
│  └─ styles/
│     └─ globals.css
├─ public/
│  └─ assets/
│     ├─ guest-1/
│     ├─ guest-2/
│     └─ guest-3/
└─ README.md
```

---

## 8. 初始内容映射（基于 PDF 摘要 → 数据填充）

> 为了让你直接开工，下面把每位嘉宾的核心信息转成“**一句话总结 / 关键观点 / Tips / 你的实践**”四段结构。你可直接粘到 `meetup.json` 中。

### 嘉宾1：Kiro（AWS 产品经理）

- **一句话总结**：Cursor 擅长单节点任务；长开发与难项目需按 **软件全生命周期（SDLC）** 管理（需求→架构→开发→测试→发布→版本→维护）。
- **关键观点**：多轮与 ChatBox 明确需求与坑；版本更新转成可追踪的“记忆”；子模块 MVP、分步测试、团队分享。
- **Tips**：大版本打标签 + Git push；优先复用函数；把“版本更新”沉淀为 Cursor 记忆条目。
- **你的实践**：为每个模块建立 **可回滚的版本记忆**；先顶层框架→分模块→测试用例→再合并。

### 嘉宾2：湾区程序员回归（AI 解决方案创始人）

- **一句话总结**：以工程化与业务结合的视角给出大量 VB 建议；强调 **V0 / Bolt 与 Cursor IDE** 的组合以降低沟通成本。
- **关键观点**：把需求定义成 **Swagger** 先生成后端框架→让 Cursor 读取生成 `cursor.rules`；分模块完成 + 先用测试文件验收后再封装；提前规划可复用函数。
- **Tips**：`rules` 很重要；“先顶层需求框架→分步测试→技术栈选择→模块封装→部署与版本管理”。
- **你的实践**：在 RA 工具链里建立 **Swagger→后端框架→rules** 的流水线；把复用函数沉淀到工具库。

### 嘉宾3：全栈哥（小红书：来点AI）

- **一句话总结**：系统讲解了 **Cursor Memories** 的机制与魔改建议；支持“个人能力偏好 + 项目进度记忆”。
- **关键观点**：记忆来自“用户主动要求 + AI 后台观察”；建议把记忆**云端共享**给团队；结合 Git 记录大小版本。
- **Tips**：在 GPT-5 子项目 setting 中固化“个人项目与问题方向”，让后续新知识点贴合你的主线。
- **你的实践**：把“RAifry / 全栈工具箱 / 旅行站点”等主项目设为长期记忆域；版本更新写入 `rules` 便于回滚。

### 嘉宾4：孟健（MCP 爱好者，全栈全周期）

- **一句话总结**：建议以 **Discover-Design-Build-Deploy-Support&Scale** 的全生命周期方法管理 Cursor 项目；MCP 能打通多数据源与工具。
- **关键观点**：推荐 **飞书 MCP / MCP Hub**；实践包括 Files 新建、GitHub 访问、Push/Pull、Browser MCP。
- **你的实践**：把“飞书文档/知识库”接入 MCP；建立标准化的 **PR / Review / 发布** 流程。

### 嘉宾5：Tina Huang（Refiy 创始人）

- **一句话总结**：此刻是最好的创业时代；**信息差与效率**可被 AI 拉平；当实现边界趋近于 0，**品味为王**。
- **关键观点**：个人影响力与背书、品味、执行力是关键。
- **你的实践**：把“审美/品味”显式化：建立 UI 评审清单与示例库（优选 shadcn/ui + 业界优秀案例）。

> 以上映射为首批填充建议；后续你可继续扩展嘉宾 6 等内容。

---

## 9. 照片整理与命名规范

- 目录：`public/assets/guest-N/`；
- 命名：`guest-N_YYYYMMDD_XX.jpg`；
- JSON：在 `albums` 对应对象的 `images` 数组追加路径；
- 说明：若暂缺图片，可用占位图（例如 `placeholder.svg`）。

---

## 10. 可访问性与性能

- 图片 `alt` 文本必填；
- 颜色对比 ≥ 4.5:1；
- 关键内容 SSR/静态直出；
- 懒加载与分页避免一次性渲染过多卡片；
- 站内键盘导航（时间轴/卡片/相册）。

---

## 11. 开发任务拆解（Cursor 指令友好）

1. 初始化项目与依赖：Vite + React + TS + Tailwind + shadcn/ui + Framer Motion；
2. 建立 `meetup.json` 与 `types.ts`；
3. 完成 Layout 与 `SidebarTimeline`（含锚点滚动）；
4. 完成 `HeaderChips`（过滤/定位模式开关）；
5. 完成 `TalkCards`（分页 + 键盘翻页 + 动效）；
6. 完成 `PracticeBoard`（导出/复制）；
7. 完成 `PhotoGallery`（Tabs + Carousel/Masonry + 预览）；
8. 响应式与无障碍优化；
9. 接入实际照片；
10. `README` 编写与 GitHub Pages 部署。

---

## 12. 骨架代码生成提示（给 Cursor 的“单条指令”示例）

> 你可直接把下面这段作为 Cursor 的任务描述粘贴到 `TODO.md` 或 Cursor Prompt 中：

```
请在本仓库用 Vite + React + TypeScript + Tailwind + shadcn/ui + Framer Motion 实现一个单页：
- 左侧 sticky 时间轴（点击滚动到嘉宾区）；
- 顶部嘉宾 Chips（默认 Jump，支持切换到 Filter 模式）；
- 右侧两栏：
  - 左列 TalkCards：从 /src/data/meetup.json 读取数据，分页翻页（键盘 ←/→ 可用）；
  - 右列 PracticeBoard：合并所有 practice 为一页，支持复制/导出 Markdown；
- 底部 PhotoGallery：按嘉宾分相册 Tabs，内部 Carousel + Lightbox 预览；
- 移动端合并为单列；
- 目录结构按需求文档第 7 节；
- 预置 demo 数据与占位图片；
- 提供 README：本地启动、打包、GH Pages 部署流程。
```

---

## 13. 部署与后续

- **部署**：GitHub Pages（或 Vercel）；
- **持续维护**：新增嘉宾时只需在 `meetup.json` 追加对象与相册；
- **后续升级**：
  - 加入搜索（Fuse.js）；
  - 将数据迁移到云端（Supabase/Firebase），支持登录与多人协作；
  - 照片 EXIF 解析（自动按时间轴排序）。

---

## 14. 里程碑

- M1：静态页面与数据驱动渲染完成（1–2 天）
- M2：动效/无障碍/图片预览完成（+1 天）
- M3：接入真实照片与 README（+0.5 天）

---

**附：你提供的线框要点转译**

- 左侧纵向时间轴可滚动；
- 顶部“分享嘉宾”标题区；
- 中部：左列（卡片翻页的嘉宾内容），右列（你的实践与思考，尽量单页）；
- 底部：照片展区（可翻/可合辑）。

