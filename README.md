# 人工智能导论 · 如何用 AI

「人工智能导论」第 1–3 节课的配套资料：**一节课讲原理，两节课动手装**。做完之后，你手上会有一个能读写文件、能跑命令、能自己发现错误并修正的 AI。

## 🌐 在线看

**<https://interstellar6.github.io/AIIntroduceCourse/>**

手机、平板、电脑都能打开。建议先看首页的「这份手册怎么用」。

> 想离线看也行：把整个仓库下载下来，双击 `index.html` 就能用——**所有页面都不依赖网络、不加载任何外部资源**。

---

## 📖 内容结构

| 部分 | 讲什么 |
|---|---|
| **开始** | 这份手册怎么用 · [先说说 vibe coding](c-vibe.html) |
| **原理**（第 1 节课） | [模型与 Agent](c-agent.html) · [怎么跟 Agent 说话](c-prompt.html) · [会话与上下文](c-session.html) · [三种经典范式](c-paradigms.html) · [Agent 循环](c-loop.html) · [Harness](c-harness.html) · [怎么用 Skill](c-skills.html) · [工具地图](c-tools.html) |
| **动手**（第 2–3 节课） | 买 API → 装 Node → 装 DeepSeek Harness / Claude Code / Codex / cc-switch |
| **其他** | [想用别的模型](relay.html) · [四个练习任务](tasks.html) |
| **帮助** | [排错 · 术语 · 命令速查](help.html) |

每个工具都有 **macOS / Windows 两套命令**，页面右上角可以一键切换，不用自己猜哪条命令该改。

---

## ✏️ 四个练习任务

做完之后，把简要成果写成一个 Issue 交上来：

**👉 [点这里提交作业](https://github.com/Interstellar6/AIIntroduceCourse/issues/new)**

标题写 `作业 · 你的姓名`，正文按 [任务页](tasks.html) 里的模板填。两三百字就够，重点写**你遇到了什么坑、怎么解决的**。

| 任务 | 一句话 |
|---|---|
| 一 | 让 AI 教你用**终端**，五个基本操作手敲一遍 |
| 二 | 让 AI 教你用 **Git**，完成一次「改坏 → 救回来」 |
| 三 | 做一个**贪吃蛇**，能在自己电脑上跑起来 |
| 四 | 读懂 **Transformer 论文**，用你自己的话讲出来 |

---

## 📁 仓库里还有什么

```
.
├── index.html … help.html     文档站（在线看的就是这些）
├── assets/                    样式与脚本
├── slides/                    课堂用的幻灯片（39+23+18+4 页，带讲稿备注）
├── 参考资料/                   事实核查材料（带逐条来源链接与「未核实」标注）
└── 备课说明.md                 教师备课说明
```

`slides/` 和 `参考资料/` 是给老师备课用的，学生不需要看。

---

## ⚠️ 关于资料的真实性

文档里的事实（模型名字、接口地址、安装命令、价格）核对日期是 **2026 年 9 月 18 日**。

这个领域半年前的材料就可能失效——网上现在还有大量教程在用已经停用的模型名。**如果你发现哪一步和官方文档对不上，以官方文档为准，不要以这份手册为准。**

最典型的一条：`deepseek-chat` 和 `deepseek-reasoner` 这两个模型名已经在 2026 年 7 月 24 日停止使用，现在要用 `deepseek-flash` 或 `deepseek-v4-pro`。

---

## 📄 License

[Apache-2.0](LICENSE)
