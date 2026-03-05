# 🎮 游戏与 AI 新闻监控器

一个响应式网站，实时展示游戏和人工智能领域的最新新闻。

## ✨ 功能特色

- **实时新闻展示**：支持按类别筛选（游戏或 AI）
- **响应式设计**：适配桌面、平板、手机所有设备
- **自动更新**：通过 GitHub Actions 每日自动更新
- **现代化界面**：流畅动画，直观交互
- **多语言支持**：提供中英文版说明文档

## 🚀 使用方法

### 本地部署

1. 克隆仓库
   ```bash
   git clone https://github.com/ppqing/tricks.git
   cd tricks
   ```

2. 运行新闻抓取脚本
   ```bash
   python3 fetch_news.py
   ```

3. 打开网站
   - 本地浏览器直接打开 `index.html`
   - 或使用 Python 本地服务器：
     ```bash
     python3 -m http.server 8000
     访问 http://localhost:8000
     ```

### 在线访问

- **GitHub Pages**：https://ppqing.github.io/tricks/
- **GitHub 仓库**：https://github.com/ppqing/tricks

### 自动更新

项目配置了 GitHub Actions 工作流：
- 每天 09:00 UTC 自动运行
- 更新新闻数据 (`news-data.json`)
- 自动提交更新到仓库

## 📁 项目结构

| 文件 | 作用 |
|------|------|
| `index.html` | 主要 HTML 页面 |
| `styles.css` | 样式表（包含响应式设计） |
| `script.js` | JavaScript 交互逻辑 |
| `fetch_news.py` | Python 新闻抓取脚本 |
| `news-data.json` | 新闻数据（自动生成） |
| `.github/workflows/update-news.yml` | GitHub Actions 工作流 |
| `README.md` | 英文说明文档 |
| `README_ZH.md` | 本中文说明文档 |

## 🛠️ 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **后端脚本**：Python 3.11+
- **自动部署**：GitHub Actions, GitHub Pages
- **数据格式**：JSON

## 📊 新闻源

当前使用样本数据，可轻松扩展以下真实新闻源：

### 游戏新闻源
- **Steam 新闻 RSS**
- **游戏媒体 API**（IGN、GameSpot、Polygon）
- **Reddit 游戏板块**（通过 Reddit API）
- **Twitter/X** 游戏相关账号

### AI 新闻源
- **ArXiv** 最新论文摘要
- **AI 研究机构博客**（OpenAI、DeepMind、Meta AI）
- **技术媒体**（TechCrunch、MIT Technology Review）
- **Hacker News** AI 相关话题

### 扩展方法
编辑 `fetch_news.py` 中的以下函数：
- `fetch_real_news()`：添加实际的 API 调用
- `SAMPLE_ARTICLES`：替换为真实数据抓取逻辑

## ⚙️ 配置与定制

### 修改新闻类别
1. 编辑 `fetch_news.py` 中的 `SAMPLE_ARTICLES` 数组
2. 调整 `index.html` 中的分类标签
3. 更新 `script.js` 中的分类筛选逻辑

### 修改样式主题
编辑 `styles.css` 和 `index.html` 中的 CSS 变量：
```css
:root {
  --primary-color: #4361ee;    /* 主色调 */
  --game-color: #ff6b6b;       /* 游戏新闻色 */
  --ai-color: #4cc9f0;         /* AI 新闻色 */
}
```

### 调整更新频率
编辑 `.github/workflows/update-news.yml` 中的 cron 表达式：
```yaml
# 目前设置为每天 09:00 UTC
schedule:
  - cron: '0 9 * * *'
```

## 📈 未来扩展计划

1. **真实新闻源集成**：接入第三方新闻 API
2. **多语言支持**：新闻内容多语言翻译
3. **用户交互功能**：收藏、分享、评论
4. **邮件订阅**：每日新闻摘要推送
5. **移动应用**：iOS/Android 应用版本
6. **数据分析**：新闻趋势可视化图表

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'Add your feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🌐 在线演示

访问 [https://ppqing.github.io/tricks/](https://ppqing.github.io/tricks/) 查看在线演示。

## 📧 联系方式

如有问题或建议，请：
- 提交 [GitHub Issue](https://github.com/ppqing/tricks/issues)
- 联系项目维护者

---

## 🕐 最后更新

本网站最后更新时间：2026年3月5日 21:03 (UTC+8)

---

_由 OpenAI 辅助开发，使用 ❤️ 构建_