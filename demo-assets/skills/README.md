# Skill 课堂演示脚本（2 分钟版）

> 对应讲稿：**第八段 · Skill（20.5–22.5 分）** ｜ 对应站内页面：**怎么用 Skill**
> 目标：让学生在 2 分钟里亲眼看到三件事——**skill 长什么样、description 决定它会不会被触发、写完当场就生效。**

---

## 课前准备（1 分钟搞定）

```bash
# 把课堂要演示的 skill 装到 DSH 的用户目录（个人级，所有项目生效）
mkdir -p ~/.dsh/skills
cp -R demo-assets/skills/课堂现场写的/读论文-好描述     ~/.dsh/skills/read-paper
cp -R demo-assets/skills/课堂现场写的/读论文-坏描述     ~/.dsh/skills/read-paper-bad
```

> ⚠️ **DSH 只扫两个目录**：`~/.dsh/skills/`（个人）和 `<项目>/.dsh/skills/`（项目级）。
> 我核对了 DSH 的加载器 `dsh-skill-filesystem`，它扫的是 `.dsh/skills` 和 `.agents/skills`——**没有 `.claude/skills`**。
> 详见下面「关于工具差异」那一节。

**演示前先确认一遍**：开一个新会话，输入 `/`，看菜单里有没有 `read-paper`。有就说明装好了。

---

## 演示一 · 先看一个真实在用的 skill（20 秒）

**打开**：`demo-assets/skills/真实skill示例/1-Cursor内置-shell.md`

**话术**：

> 这不是我编的例子，这是 Cursor 编辑器里**正在用的**一个 skill，一共 **867 字节**，全文就在这里。
> 结构就三块：上面 `---` 里的元信息、一个标题、五条行为要求。**就这么多。**
>
> 看它的 `description`——它写清了「**什么时候**用」：只有用户明确敲 `/shell` 的时候。
> 再看最后一行 `disable-model-invocation: true`。
>
> **为什么要把自己藏起来？** 因为这是一个「直接执行终端命令」的 skill。如果让模型自己决定什么时候用，它可能在你没要求的时候就去跑命令了。所以作者明确关掉了自动触发——**只能人来叫它。**
>
> 这就是 skill 的两条开关：**要么模型自己判断该用了，要么只有你能叫它。**

**落点**：站点「两种触发方式」那一节。

---

## 演示二 · description 的 A/B 对比（40 秒）★ 最有说服力

这两个 skill 的**正文一字不差**，只有 `description` 不一样：

| | description | 结果 |
|---|---|---|
| `read-paper`（好） | 「把一篇 PDF 论文读成结构化阅读笔记。当用户提供论文 PDF、说『读一下这篇论文』『帮我总结这篇 paper』……时使用。」 | **会被自动触发** |
| `read-paper-bad`（坏） | 「帮助处理论文。」 | **永远不触发** |

**现场操作**：

1. 把论文 PDF 放进工作目录（`demo-assets/paper/` 里那个）
2. 输入一句**普通的话**，不要提 skill 名字：
   > 这个目录里有一篇论文的 PDF，帮我读一下。
3. 让它展开工具调用记录，**指出它加载了 `read-paper`**
4. 然后解释：

> 注意我刚才**没有提 skill 的名字**，我只是正常提要求。
> 模型看不到这两个 skill 的正文——它每一轮只能看到**名字和 description 那一句话**。
> 「帮助处理论文」这句话，在它眼里等于什么都没说，所以它永远不会想到去用。
>
> **描述里写「什么时候用」，比写「它是什么」重要得多。**
> 这也是为什么很多人写完了 skill 却发现「它从来不用」——不是 skill 写得不好，是**门牌写得太笼统**。

**落点**：站点「frontmatter 里最重要的就是 description」。

**额外一招**（时间够就做）：把两个 skill 都装上，问「帮我总结一下这篇 paper」。观察模型选了哪个。

---

## 演示三 · 现场写一个，当场生效（40 秒）

**现场把 `交作业自查/SKILL.md` 复制进去**，然后当场敲 `/`：

```bash
cp -R demo-assets/skills/课堂现场写的/交作业自查 ~/.dsh/skills/homework-selfcheck
```

**话术**：

> 现在敲 `/`，菜单里已经多了一个。
> 我刚才做的事情是：**写了一个 Markdown 文件。** 没写代码、没装东西、没改内核。
>
> 这就是上一页说的「一切皆插件」最日常的用法——**你不需要会写代码，写一个 Markdown 文件，就改变了这个 Agent 的行为。**

**落点**：站点「为什么这门课要讲 skill」+ Harness 那页的「一切皆插件」。

---

## 演示四（可选，讲到进阶时用）· 三个真实 skill 各代表一种写法

时间不够就跳过，时间够就投屏这张表：

| 真实 skill | 它的价值 | 看什么 |
|---|---|---|
| `2-飞书妙记-lark-minutes.md` | **description 的范本**：把 5 项能力、输入形态（URL 长什么样）、甚至「优先用我而不是 ffmpeg/whisper」都写进去了 | description 怎么写才算具体 |
| `3-编排型-lark-workflow-standup-report.md` | **一个 skill 调用别的 skill**：它编排 `calendar +agenda` 和 `task +get-my-tasks` 两个能力 | skill 可以组合，不必从零写 |
| `4-大块头-Cloudflare-wrangler.md` | **6785 字节，平时的成本是零**：只有名字和一句话常驻上下文，正文用到才加载 | 「写多长都行」是真的 |

---

## 关于工具差异（这条建议老师自己知道，也值得跟学生说清）

我核对了 DSH 的源码，**站点 Skill 那页混了 Claude Code 和 DSH 的能力**，上课前建议明确一下：

| 特性 | DSH | Claude Code |
|---|---|---|
| `name` / `description` | ✅ | ✅ |
| `disable-model-invocation` | ✅ | ✅ |
| 目录 `~/.dsh/skills/`、`项目/.dsh/skills/` | ✅ | — |
| 目录 `~/.claude/skills/`、`项目/.claude/skills/` | ❌ 不扫 | ✅ |
| `$ARGUMENTS` 传参 | ❌ | ✅ |
| `!`命令`` 注入真实输出 | ❌ | ✅ |
| `context: fork` / `agent:` | ❌ | ✅ |
| `allowed-tools` 预先授权 | ❌ | ✅ |

依据：DSH 的 skill 加载器只扫描 `.dsh/skills` 与 `.agents/skills`；`$ARGUMENTS`、`allowed-tools`、`context`、`agent` 这几个词在 DSH 全部自带包里**没有任何痕迹**（`disable-model-invocation` 有）。

**上课怎么说**：

> 这一页写的路径和进阶用法，**以 Claude Code 为准**。你们第 2 节课先用 DSH，DSH 的 skill 只认 `~/.dsh/skills/`，而且只支持 `name`、`description` 和 `disable-model-invocation` 三个字段——**够用了，前面讲的原理一个都不少。** 第 3 节课装了 Claude Code 之后，那些进阶写法才能用起来。

> 💡 如果老师想把这一页改准确，最小的改法是把「放哪里」那张表加一列「哪个工具」，并在四个进阶用法上标一句「Claude Code 专属，DSH 暂不支持」。

---

## 一句话总结这一段的落点

**skill 不是「更长的提示词」，是一份放在抽屉里的操作手册——平时只有标签露在外面，用到才抽出来。**
