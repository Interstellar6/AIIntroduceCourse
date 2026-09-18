# DeepSeek 开放平台 & API 中转站 事实清单

**核查日期：2026-09-18（北京时间）**
**核查人：事实核查研究员（AI）**
**重要说明：** 原始需求写的是「2025 年当前状态」，但本次核查的实际日期是 **2026-09-18**。因此本文以 2026-09 的最新官方文档为准。凡涉及 2025 年旧状态的描述（如 `deepseek-chat` / `deepseek-reasoner`）已在文中标注其失效时间。

---

## 一、DeepSeek 开放平台（platform.deepseek.com）

### 1.1 注册、实名认证、充值、发票

| 项目 | 事实 | 来源 |
| --- | --- | --- |
| 注册方式 | 支持手机号 / 邮箱 / Google / 微信登录注册 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 邮箱域名限制 | 部分邮箱域名不支持注册，官方建议用 Gmail / Outlook / Hotmail / Yahoo 等国际通用邮箱 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 微信登录限制 | 因服务限制，微信登录**暂不支持海外 IP** | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| Google 登录限制 | 因服务限制，Google 登录**暂不支持大陆地区 IP** | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 实名认证前置 | **必须先完成实名认证**，才能在「充值」页面在线充值 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 实名认证入口 | 「个人信息」页面 →「实名认证」：<https://platform.deepseek.com/profile> | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 个人认证 vs 企业认证 | 两者在**用户权益和产品功能上目前无差异**，只是所需材料和流程不同 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 个人 → 企业 | 可以变更，路径：「充值」页 →「对公汇款」→「企业实名认证」→「去变更」，不影响余额 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 企业 → 个人 | **不可变更**（企业认证账号不能改回个人或其他企业） | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 实名认证失败 | 常见原因：① 该证件号绑定账号超数量限制 ② 证件号连续输错次数较多，功能被暂时锁定 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 在线充值 | 在「充值」页 <https://platform.deepseek.com/top_up> 使用**支付宝 / 微信**充值；结果在「账单」页 <https://platform.deepseek.com/transactions> 查询 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 对公汇款 | **仅支持企业用户**，且**暂时仅对 +86 手机号注册用户开放**；完成企业实名认证后获取**专属汇款账号**；汇款方开户名称须与开放平台实名认证名称一致；到账后 **10 分钟–1 小时**自动转入账户 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 最低充值额度 | **未核实**。官方 FAQ 与文档中**没有**任何关于最低充值金额的说明；platform.deepseek.com 页面被风控拦截（HTTP 429 Request Blocked），无法直接查看充值页选项 | 本次核查（2026-09-18） |
| 余额有效期 | 充值余额**永久有效，不会过期** | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 退款 | 未消费金额支持退款。在线支付：账单页「退款管理」自助退款；企业对公转账：需填工单申请 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 开票入口 | 「账单」页 →「发票管理」，填写开票金额、抬头等提交；**电子发票自动发送到填写的邮箱** | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 开票口径 | 支持「按消耗金额」或「按充值金额」开票；类型支持**增值税普通发票 / 增值税专用发票** | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 抬头规则 | 个人认证可开个人抬头/公司抬头；**企业认证仅支持开企业认证主体抬头的发票** | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 发票与退款互斥 | **已开票/开票中的金额不支持退款**，需先作废发票 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 票面信息 | 开票主体：**杭州深度求索人工智能基础技术研究有限公司**；项目名称：**信息技术服务\*技术服务费**；税率 **6%** | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 发票作废重开 | 「发票管理」→「开票记录」中可申请作废并重新开具 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 合作协议 | 主要是自助标准化服务；如有备案/入库需求可填「合作协议申请工单」，提供的是**标准化框架协议，不支持条款修改** | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |

> 关于「最低充值额度」：网上有不少二手文章声称「1 元起充」等说法，但**在官方文档中找不到依据**，因此本条标注为「未核实」，不建议在课堂上当成确定事实讲授。

### 1.2 API Key

| 项目 | 事实 | 来源 |
| --- | --- | --- |
| 创建入口 | <https://platform.deepseek.com/api_keys>（控制台「API keys」页面） | [官方文档](https://api-docs.deepseek.com/zh-cn/) |
| Key 格式前缀 | **以 `sk-` 开头** | [官方文档 · 接入 Codex](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/codex) —— 原文：「首次运行会提示输入 API Key（以 `sk-` 开头，在 DeepSeek Platform 获取）」 |
| Key 泄露处理 | 官方建议**立即删除泄漏的 Key**：进入「API keys」页 → 选中该 Key → 点「回收箱」图标 → 确认框点「删除」→ 看到「API Key 已删除」提示即已**立即失效**（无法再查看或修改）→ 之后尽快创建新 Key 并替换到应用中 | [官方 FAQ · 若发现 API key 泄漏怎么办](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 官方安全提醒 | 「请妥善保存您的 API key，**不要与他人共享**，或将其**暴露在浏览器或其他客户端代码**中」 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 分 Key 看用量 | 「用量信息」页 <https://platform.deepseek.com/usage> 可按时间维度 + 指定 API Key 筛选，或点「导出」下载 CSV（`amount` 文件含分 Key 明细） | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| Key 与限流的关系 | 并发限制**以账号粒度计，与 API Key 无关**（多个 Key 不会叠加额度） | [官方文档 · 限速与隔离](https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit) |

### 1.3 当前模型列表、上下文长度与价格（截至 2026-09-18）

**当前官方 API 只接受两个模型名**（API Reference 中 `model` 字段的枚举值就这两个）：

| 模型名 | 底层模型版本 | 上下文长度 | 最大输出 | 并发限制 |
| --- | --- | --- | --- | --- |
| `deepseek-flash` | DeepSeek-V4.1-Flash | **1M** | **384K**（最大） | 2500 |
| `deepseek-v4-pro` | DeepSeek-V4-Pro-0813 | **1M** | **384K**（最大） | 500 |

来源：[官方模型与价格页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)、[API Reference](https://api-docs.deepseek.com/zh-cn/api/create-chat-completion)

**价格（人民币 / 百万 tokens，官方中文页）**

| 计费项 | deepseek-flash 空闲 | deepseek-flash 高峰 | deepseek-v4-pro 空闲 | deepseek-v4-pro 高峰 |
| --- | --- | --- | --- | --- |
| 输入（**缓存命中**） | 0.02 元 | 0.04 元 | 0.15 元 | 0.30 元 |
| 输入（**缓存未命中**） | 1 元 | 2 元 | 4.5 元 | 9.0 元 |
| 输出 | 4 元 | 8 元 | 13.5 元 | 27.0 元 |

来源：[官方模型与价格页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)（2026-09-18 抓取）

**峰谷时段定义（北京时间）**：高峰 = 周一至周五 **9:00–12:00、14:00–18:00**；其余为空闲时段，**空闲价为高峰价的一半**。
来源：[官方模型与价格页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)

**美元价（官方英文页换算口径，同一时间点）**：flash 缓存命中 空闲 $0.003 / 高峰 $0.006，缓存未命中 空闲 $0.15 / 高峰 $0.30，输出 空闲 $0.6 / 高峰 $1.2；v4-pro 缓存命中 空闲 $0.022 / 高峰 $0.044，缓存未命中 空闲 $0.66 / 高峰 $1.32，输出 空闲 $1.98 / 高峰 $3.96。
来源：[官方英文价格页](https://api-docs.deepseek.com/quick_start/pricing)

**扣费规则**：费用 = token 消耗量 × 单价；从**充值余额或赠送余额**中扣减，**两者同时存在时优先扣减赠送余额**。
来源：[官方模型与价格页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)

#### 关于 `deepseek-chat` / `deepseek-reasoner`（重要变更）

- 官方更新日志明确记载：旧模型名 **`deepseek-chat` 与 `deepseek-reasoner` 已于 2026-07-24 停止使用**。2026-04-24 的公告原文是：「旧有的 API 接口的两个模型名 `deepseek-chat` 与 `deepseek-reasoner` 将于三个月后（2026-07-24）停止使用」。
  来源：[官方更新日志](https://api-docs.deepseek.com/zh-cn/updates)
- 当前 API Reference 中 `model` 字段的可选值**只有** `deepseek-flash`、`deepseek-v4-pro`，已无 `deepseek-chat` / `deepseek-reasoner`。
  来源：[API Reference](https://api-docs.deepseek.com/zh-cn/api/create-chat-completion)
- **本文并未验证**在 2026-07-24 之后调用 `deepseek-chat` 会返回什么具体错误码（需要有效 API Key 才能测试），因此该细节标注为「未核实」。

#### 关于旧模型名 `deepseek-v4-flash` / `deepseek-v4-flash-vision-exp`

官方说明：这两个旧名字**仍可调用**，但对应模型已下线，请求会由 **DeepSeek-V4.1-Flash** 提供服务，并按 Flash 价格计费。
来源：[官方文档](https://api-docs.deepseek.com/zh-cn/)、[更新日志](https://api-docs.deepseek.com/zh-cn/updates)

#### 一处官方文档内部矛盾（讲课需注意）

- V4.1 Flash 发布公告（2026-09-10）称：**2026-09-14 12:00 之后，`deepseek-v4-pro` 的请求将全部路由到 V4.1 Flash**，并按 V4.1 Flash 单价计费。
  来源：[官方新闻 2026-09-10](https://api-docs.deepseek.com/zh-cn/news/news260910)
- 但**当前**模型与价格页（2026-09-18 抓取）的脚注 (2) 写的是：**「我们决定在 2026 年 9 月 14 日之后继续提供 DeepSeek V4 Pro 的 API 调用服务，计费方式保持不变」**，且该页仍列出 v4-pro 的独立价格。
  来源：[官方模型与价格页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)
- 结论：两处口径不一致，价格页脚注应为更新后的最新口径，但**建议以实际账单为准**，并标注此处存在官方口径冲突。

### 1.4 OpenAI 兼容 base_url：到底写哪个？

| 用途 | base_url | 来源 |
| --- | --- | --- |
| **OpenAI 格式（官方当前唯一记载）** | `https://api.deepseek.com` | [官方文档](https://api-docs.deepseek.com/zh-cn/) |
| Anthropic 格式 | `https://api.deepseek.com/anthropic` | [官方文档](https://api-docs.deepseek.com/zh-cn/)、[Anthropic API 指南](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) |
| Responses API（Codex 用） | `https://api.deepseek.com` | [Responses API 指南](https://api-docs.deepseek.com/zh-cn/guides/responses_api) |
| Beta 功能（对话前缀续写等） | `https://api.deepseek.com/beta`（官方要求：使用 `prefix` 参数必须设置此 base_url） | [API Reference](https://api-docs.deepseek.com/zh-cn/api/create-chat-completion) |

**关键事实：**

- 官方当前所有文档与 curl 示例一律使用 **`https://api.deepseek.com`**，拼接的路径是 `https://api.deepseek.com/chat/completions`（**没有 `/v1`**）。官方从未在当前文档中把 `https://api.deepseek.com/v1` 列为推荐写法。
  来源：[官方文档](https://api-docs.deepseek.com/zh-cn/)（curl 示例）、[官方文档 · 接入 Codex](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/codex)
- **`/v1` 是否仍可用：未核实。** 本次实测（2026-09-18，用无效 Key `sk-invalidtestkey000` 发 POST）显示：`/chat/completions`、`/v1/chat/completions`、`/anthropic/v1/messages`、`/v1/messages`、`/models`、`/v1/models` **全部返回 HTTP 401（认证失败）**。但**对照实验**显示，一个**刻意编造的假路径** `/definitely-not-a-real-path-xyz/chat/completions` **同样返回 401**。说明服务端**先校验认证、后做路由**，因此这个实验**不能证明** `/v1` 前缀是有效路由。要确认必须用**有效 Key** 实测，本次无有效 Key，故标注「未核实」。
- 两者差异（在 `/v1` 仍可用这一前提下）：`/v1` 只是 OpenAI SDK 生态的路径前缀兼容写法，**与模型版本无关**（这是 DeepSeek 长期以来的口径）。但**当前官方文档已不再提及 `/v1`**。
- 实践建议：**写 `https://api.deepseek.com`**。用 OpenAI SDK 时，官方给的写法是把它当 `base_url`，SDK 会自动拼 `/chat/completions`。

### 1.5 DeepSeek 是否提供 Anthropic 兼容端点？

**提供。** 官方有专门的「使用 Anthropic API」文档页。

| 项目 | 事实 | 来源 |
| --- | --- | --- |
| Anthropic base_url | **`https://api.deepseek.com/anthropic`** | [Anthropic API 指南](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) |
| 认证头 | `x-api-key` 完全支持；`anthropic-version` 被**忽略**；`anthropic-beta` 在 `/messages` 上被忽略（Files API 端点必须携带 `files-api-2025-04-14`） | [Anthropic API 指南](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) |
| 环境变量 | `ANTHROPIC_BASE_URL` + `ANTHROPIC_API_KEY`（Claude Code 场景官方用 `ANTHROPIC_AUTH_TOKEN`） | [Anthropic API 指南](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api)、[接入 Claude Code](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code) |
| 模型名映射 | `claude-opus*` → `deepseek-v4-pro`；`claude-haiku*` / `claude-sonnet*` → `deepseek-flash`；传入不支持的模型名会**自动映射到 `deepseek-flash`** | [Anthropic API 指南](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) |
| 计费 | `claude-opus` 映射到的 `deepseek-v4-pro` **按 V4 Pro 价格计费** | [Anthropic API 指南](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) |
| 不完全兼容的地方 | `top_k` 忽略；非思考模式下 `top_p` 恒为 1.0；`cache_control` 忽略；`document` / `redacted_thinking` / `mcp_tool_use` / `code_execution_tool_result` 等类型**不支持**；`mcp_servers`、`container`、`service_tier` 忽略 | [Anthropic API 指南](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) |
| 额外用途 | 通过模型名映射，可绕过新版 **Claude Desktop APP** developer 模式对模型名的限制，只改 base_url 和 api_key 即可接入 | [Anthropic API 指南](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) |

### 1.6 官方是否提供 Codex / Claude Code 接入文档？

**提供，而且是官方文档中的正式章节「接入 Agent 工具」。**

官方列出的 Agent 接入页面（中文文档导航可见）：DeepSeek Harness、Claude Code、Codex、OpenCode、OpenClaw、Hermes、Reasonix、WorkBuddy/CodeBuddy、Qoder。
来源：[接入 Claude Code 页面导航](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)

| 工具 | 官方文档链接 | 关键配置 |
| --- | --- | --- |
| **Claude Code** | <https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code> | `ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic`；`ANTHROPIC_AUTH_TOKEN=<你的 Key>`；`ANTHROPIC_MODEL=deepseek-flash[1m]`；另有 `CLAUDE_CODE_SUBAGENT_MODEL`、`CLAUDE_CODE_EFFORT_LEVEL=max`、`CLAUDE_CODE_AUTO_COMPACT_WINDOW=786432` |
| **Codex** | <https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/codex> | Codex 走 **Responses API**（DeepSeek 原生支持）；官方提供一键脚本 `bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup.sh)`（Windows 用 `.ps1`）；脚本会备份 `~/.codex/config.toml`、写 `~/.codex/models.json`、新增 `[model_providers.deepseek]`；菜单第 9 项可恢复默认配置 |
| 汇总页 | <https://api-docs.deepseek.com/zh-cn/guides/coding_agents> | 「接入 Agent 工具」总览（Claude Code / OpenCode / OpenClaw 等） |
| DeepSeek Harness | <https://deepseek-harness.github.io/deepseek-harness/guide/quickstart> | DeepSeek 自家的 Harness 开发者预览版（官方文档「接入 Agent 工具」入口指向此页） |

补充事实：
- Claude Code 中 DeepSeek **原生支持 Web Search 功能**；官方提示该功能会产生**额外的模型 Token 费用**（搜索内容需要额外的模型请求来总结）。
  来源：[接入 Claude Code](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)
- Codex 各形态（Codex CLI、ChatGPT 桌面端、VS Code 的 Codex 插件）**共用同一份 `~/.codex` 配置**，配一次即可全形态使用。
  来源：[接入 Codex](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/codex)

### 1.7 免费额度与限流（RPM / TPM）

| 项目 | 事实 | 来源 |
| --- | --- | --- |
| 免费额度 | **未核实 / 官方文档未记载。** 官方 FAQ、定价页、更新日志中**均未**出现新用户免费额度或固定赠送额度的说明。定价页扣费规则中只提到「赠送余额」（优先扣减），但**未说明当前是否有赠送、赠送多少** | 本次核查（2026-09-18）；[官方模型与价格页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing) |
| 限流类型 | 官方**限速页面明确写的是「并发限制」（concurrency）**，不是 RPM/TPM：`deepseek-flash` **2500**，`deepseek-v4-pro` **500** | [限速与隔离](https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit) |
| 并发定义 | 一个请求**从发出到模型响应完成之前**记为一个并发 | [限速与隔离](https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit) |
| 并发粒度 | **以账号粒度计，与 API Key 无关**；超过则返回 **HTTP 429** | [限速与隔离](https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit) |
| 官方唯一提到 RPM/TPM 的地方 | 错误码页对 **429** 的描述是「请求速率（**TPM 或 RPM**）达到上限」。**注意：这与限速页只讲并发的口径不一致** | [错误码](https://api-docs.deepseek.com/zh-cn/quick_start/error_codes) |
| 扩容 | 可提交「账号扩容申请工单」，按实际业务需求匹配并发量，**扩容不增加额外费用** | [限速与隔离](https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit)、[官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| 无分级套餐 | 官方明确「目前实行统一的 API 收费标准，**暂无分级套餐**」 | [官方 FAQ](https://static.deepseek.com/faq/index.html?lang=zh#/category/4) |
| user_id 隔离 | 可传 `user_id`（正则 `[a-zA-Z0-9\-_]+`，最长 512）实现内容安全隔离、KVCache 隔离、调度隔离；**不要放用户隐私信息**。普通用户所有 `user_id` 合并计算并发；扩容用户则同时受账号总并发 + 单 `user_id` 并发限制 | [限速与隔离](https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit) |

### 1.8 上下文缓存（与「缓存命中价」直接相关）

- 硬盘缓存**对所有用户默认开启**，无需改代码。
- 命中要求**完整匹配「缓存前缀单元」**；落盘时机有三类：请求的用户输入结束位置与模型输出结束位置、公共前缀检测、按固定 token 间隔截取。
- 返回值中的 `usage.prompt_cache_hit_tokens` / `usage.prompt_cache_miss_tokens` 反映命中情况。
- 缓存是「尽力而为」，**不保证 100% 命中**；缓存构建耗时秒级，不再使用后会自动清空（一般几小时到几天）。
- 缓存命中也**不影响输出的随机性**（输出仍受 temperature 影响）。

来源：[上下文硬盘缓存](https://api-docs.deepseek.com/zh-cn/guides/kv_cache)

### 1.9 其他常见错误码

| 错误码 | 含义 | 官方解决办法 |
| --- | --- | --- |
| 400 | 请求体格式错误 | 按错误提示修改请求体 |
| 401 | API key 错误，认证失败 | 检查 Key；没有则去 platform.deepseek.com/api_keys 创建 |
| **402** | **余额不足** | 确认余额并前往充值页充值 |
| 422 | 请求体参数错误 | 按提示修改参数 |
| 429 | 请求速率（TPM 或 RPM）达上限 / 并发超限 | 合理规划请求速率 |
| 500 | 服务器内部故障 | 等待重试 |
| 503 | 服务器繁忙（负载过高） | 稍后重试 |

来源：[错误码](https://api-docs.deepseek.com/zh-cn/quick_start/error_codes)

另：**请求保活机制**——请求发出后若需等待，非流式请求持续返回空行、流式请求持续返回 SSE `: keep-alive` 注释；**若 10 分钟后仍未开始推理，服务器会关闭连接**。
来源：[限速与隔离](https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit)

---

## 二、API「中转站」（中转 / 代理服务）

> 本节所有 `base_url` 均取自各厂商**官方文档**；核查日期 **2026-09-18**。

### 2.1 「中转站」是什么、按合规性分几类

- 「AI 中转站」是介于用户和模型厂商官方服务之间的**代理层**，把各家模型厂商的 API 整合到一个平台再提供给用户，相当于用户和大模型之间的「中介」（国家安全部风险提示，中国警察网转载，2026-06-08）：<https://news.cpd.com.cn/n3569/626/t_1236449.html>
- 科技日报引述中国移动云能力中心大模型高级技术专家季琰的分类，按**合规资质、技术架构、运营模式**分三类，风险逐级递增（科技日报 2026-06-15）：<https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html>
  1. **云厂商合规聚合型**——官方正规 MaaS 服务，如中国移动 MoMA、阿里云百炼、火山方舟；
  2. **正规 API 代理中转站**——企业主体批量采购官方 API 额度、合规分销，稳定性中等、合规风险较低；
  3. **灰黑产中转站**——共享账号池拆分售卖、爬虫/逆向破解海外大模型网页端口，无官方授权，账号极易封禁、并发受限、无售后保障。

### 2.2 统一 base_url + 多供应商转发机制

- 用户只接入一个入口（统一 `base_url` + 中转站签发的 Key）即可调用多个模型，无需切换来源：<https://news.cpd.com.cn/n3569/626/t_1236449.html>
- 转发链路：客户端请求 OpenAI 兼容端点（`/v1/chat/completions`），中转站按**渠道（channel）**配置中继到上游；上游是 OpenAI 格式则直接透传，否则「**中继并修改请求体和返回体**」做格式改写（One API 官方 README）：<https://github.com/songquanpeng/one-api>
- 实际配置形态（uni-api 官方 README）：上游按 `provider` 配 `base_url` 与 `api`，用户侧只需一个 Key 与 `model` 列表；默认 `fixed_priority`，失败自动重试下一渠道，支持加权轮询 / 随机 / 按历史成功率排序：<https://github.com/yym68686/uni-api>
- 常见能力：负载均衡、失败自动重试、渠道冷却、令牌（Token）额度 / 过期时间 / IP 白名单 / 模型白名单、用户分组与渠道分组、兑换码充值、额度明细：<https://github.com/songquanpeng/one-api>

### 2.3 计费方式与「倍率（rate multiplier）」

- **One API 官方额度公式（一手来源，可直接引用）**：
  > 额度 = 分组倍率 × 模型倍率 ×（提示 token 数 + 补全 token 数 × 补全倍率）
  > 「注意，One API 的默认倍率就是官方倍率，是已经调整过的。」

  补全倍率对 GPT3.5 固定 1.33、GPT4 为 2。<https://github.com/songquanpeng/one-api>
- One API 支持为**用户分组和渠道分组分别设置不同倍率**：<https://github.com/songquanpeng/one-api>
- 通俗解释（**社区文章，非官方一手来源，仅供概念说明**）：实际单价 = 官方单价 × 倍率，兑换比例只决定充值额度怎么换算。举例，1:10 兑换即 1 元 = 10 额度；0.37 倍率意味着同样 token 消耗按官方价的 0.37 倍扣费（腾讯云开发者社区 2026-08-29）：<https://cloud.tencent.com.cn/developer/article/2734082>
- **有公开报道的充值比例实例**：某中转站宣传「充值 50 元可兑换 110 万 Token 额度，100 元兑换 250 万，200 元兑换 560 万，500 元可兑换 1700 万，最高兑换比例可达 1:3.4」（央广网 2026-07-28）：<https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml>
  - 报道未说明「额度」单位是美元还是内部积分，**「1:3.4」的确切含义未核实**。
- 常见计费套路（**社区 / 律所观点，非官方结论**）：**模型降级**（以次充好）、**Token 注水**（后台调高倍率多扣费）、**隐藏系统提示词**、**数据截留**、**供应链注入**：<https://cloud.tencent.com.cn/developer/article/2734082>、<https://kindinglaw.com/news/shownews.php?id=164>

### 2.4 One API / New API / uni-api 的定位

| 项目 | 仓库 | 定位（依官方 README） | 许可证 | 开源免费 |
| --- | --- | --- | --- | --- |
| **One API** | <https://github.com/songquanpeng/one-api> | 「通过标准的 OpenAI API 格式访问所有的大模型，开箱即用」；LLM API 管理 & 分发系统，可用于 key 管理与二次分发；单可执行文件、Docker 一键部署 | MIT | 是 |
| **New API** | <https://github.com/QuantumNous/new-api> | 「Next-Generation LLM Gateway and AI Asset Management System」，基于 One API 二次开发；支持把多种大模型**互相转换**为 OpenAI / Claude / Gemini 兼容格式 | AGPLv3（含第 7 条附加条款，须保留署名与项目链接） | 是 |
| **uni-api** | <https://github.com/yym68686/uni-api> | 定位**个人自用**：README 写「For personal use, one/new-api is too complex with many commercial features that individuals don't need」；单一接口统一调用多个后端并统一转成 OpenAI 格式 | Apache-2.0 | 是 |

- One API README 明确提示合规边界：使用须遵循法律法规，不得用于非法用途；并援引《生成式人工智能服务管理暂行办法》「**请勿对中国地区公众提供一切未经备案的生成式人工智能服务**」；末尾声明「依据 MIT 协议，使用者需自行承担使用本项目的风险与责任，本开源项目开发者与此无关」：<https://github.com/songquanpeng/one-api>
- New API README 声明用途限定：「intended solely for lawful and authorized AI API gateway, organization-level authentication, multi-model management, usage analytics, cost accounting, and private deployment scenarios」，并要求用户自行完成备案、许可、内容安全、实名、日志留存、税务与上游授权义务：<https://github.com/QuantumNous/new-api>
- One API README 把「众多第三方代理服务」列为功能项，即该项目本身**也被设计用于对接各类第三方代理 / 中转服务**——「开源项目本身」与「用它搭的中转站是否合规」是两件事。
- One API 初始管理员默认密码 `123456`，README 有醒目警告务必修改——说明**自建中转站的默认部署态本身有安全风险**。
- New API README 提到的信任伙伴包括 Cherry Studio、北大（bda.pku.edu.cn）、UCloud、阿里云、IO.NET 等（说明该类开源网关在正经场景中被广泛使用）。

### 2.5 为什么能同时提供 OpenAI 格式（/v1/chat/completions）和 Anthropic 格式（/v1/messages）

- **技术上靠「协议转换层」。** New API README 把 **Format Conversion** 列为核心能力，明确写出：`OpenAI Compatible ⇄ Claude Messages`、`OpenAI Compatible → Google Gemini`、`Google Gemini → OpenAI Compatible`、`OpenAI Compatible ⇄ OpenAI Responses`（开发中）：<https://github.com/QuantumNous/new-api>
- New API 同时暴露 `/v1/chat/completions`（OpenAI 格式）与 Claude `Messages` 格式端点：<https://docs.newapi.pro/en/docs/api/ai-model/chat/create-message>
- uni-api README 列出同时支持的端点集合：`/v1/chat/completions`、`/v1/responses`、`/v1/images/generations`、`/v1/embeddings`、`/v1/audio/transcriptions`、`/v1/audio/speech`、`/v1/moderations`、`/v1/models`；内部支持 `engine: gpt | claude | gemini | openrouter` 强制指定消息格式；FAQ 提到 `/v1/messages` 沿用同一套路由图：<https://github.com/yym68686/uni-api>
- **一句话结论（讲课用）**：端点格式是「外壳」，上游是什么模型是「内核」；中转站在中间做请求体 / 返回体的**双向改写**，所以能对外同时伪装成 OpenAI 和 Anthropic 两套协议。
- **讲课注意**：能说 OpenAI 格式 ≠ 完整支持 Anthropic 所有特性。One API README 在「模型映射」条目就提示：设置后请求体会被重新构造而非直接透传，「会导致部分还未正式支持的字段无法传递成功」。因此「`/v1/messages` 返回 200」不等于功能完整。

### 2.6 常见风险

#### （1）跑路 / 卷款跑路

- **官方口径**：科技日报引述专家指出，灰黑产中转站盈利套路包括「低价蓄水吸纳用户充值后**直接关站跑路、收割用户资金**」：<https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html>
- **公开社区案例 1**：V2EX《中转站疑似跑路》（2026-05-14）。某中转站 5 月 8 日注册，赠送的 20 美元未用完就突然打不开，之后提示账号不存在。跟帖有「最近注册了几个中转站，基本都没了」「中转站和机场类似，都有跑路风险」：<https://global.v2ex.co/t/1212741>
  - 该帖**未点名具体站点**，属个人陈述，无法独立核实。
- **公开社区案例 2**：V2EX《之前买的 88code 中转站现在退款困难，怎么维权？》（2026-02-02）。发帖人称花 298 元买半年会员、双 12 又囤套餐，后因「A 社加大封号力度」成本覆盖不了，服务停摆；申请退款后客服先说一周退，后来「据说客服工资都发不出来了」：<https://global.v2ex.co/t/1190270>
  - 单方陈述，**该站点实际情况与最终结果未核实**。
- 央广网报道：2026 年 5 月已有部分中转站「停摆」，一些从业者转向合规平台：<https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml>

#### （2）API Key 泄露、日志留存（中转站能看到你的全部对话）

- **架构上无法避免**：垦丁律所指出，中转网关在「鉴权·计费·路由」层能完整读取用户请求明文，并在返回路径完整读取模型输出——**无论平台如何宣称「不记录日志」，技术上对全部输入输出都拥有完全的数据可见性**；并能识别请求模式（高频生成、批量下载、敏感内容生成），具备高度行为可追溯性：<https://kindinglaw.com/news/shownews.php?id=164>
- 国家安全部：「AI 中转站作为第三方端口，会**将用户提交的数据留存至服务器**。部分缺乏正规数据加密与管控机制，有的甚至私自截留用户数据，**倒卖给其他大模型厂商用于系统训练**」：<https://news.cpd.com.cn/n3569/626/t_1236449.html>
- 国家安全部另提示「**恶意植入，远程控制**」——部分中转站暗藏后门，可能向用户设备植入恶意代码，窃取账号密钥、云端凭证，甚至植入远控程序：同上
- **真实法律后果描述（律师文章）**：某站长「默认全量记录用户的请求日志，包括对话内容、代码片段和账号信息」，后有「数据公司」按条收购日志用于模型训练，他陆续**出售了几十万条日志，违法所得只有几万元**（上海曼昆律师事务所 2026-09-07）：<https://www.mankunlaw.com/insights/ai-api-relay-data-export-criminal-risk/>
  - 该文声明「案例改编自公开裁判文书及公开报道，人物均为化名，部分细节已作文学化处理」，**个案细节未核实**。
- **可作讲课锚点的法条**：出售或提供公民个人信息，依法释〔2017〕10 号，一般公民个人信息 **5000 条以上**或**违法所得 5000 元以上**可能达刑事入罪标准；行踪轨迹、通信内容、征信信息、财产信息等 **500 条以上**也可能入罪。对话日志动辄数万条，触线不难：同上
- **正面参照**：OpenRouter 官方 FAQ 原文——「We log basic request metadata (timestamps, model used, token counts). Prompt and completion are **not logged by default**. We do **zero logging** of your prompts/completions, even if an error occurs, unless you opt-in to logging them.」另有 opt-in 记录换取 **1% 费用折扣**的设置：<https://openrouter.ai/docs/faq>（本次已逐字核对页面原文，2026-09-18）
  - 但「承诺 ≠ 可验证」，敏感内容先脱敏仍是第一原则（这也正是国家安全部的建议）。

#### （3）封号、余额无法提现

- 「灰黑产中转站……账号极易封禁、并发受限、无售后保障，存在侵权违规、数据窃取、服务骤停等多重隐患，不适合商业项目、涉密业务落地使用」：<https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html>
- 国家安全部建议处置动作：「使用中如遇到**异常扣费、无故封号、数据异常**等问题，应立即停止使用、修改密钥、查杀病毒、留存证据」：<https://news.cpd.com.cn/n3569/626/t_1236449.html>
- 上游封杀连锁反应：88code 案例中，发帖人把停摆归因于「A 社加大封号力度」：<https://global.v2ex.co/t/1190270>
- **关于余额能否提现**：本次调研**未找到任何中转站官方公开的、可核实的「余额可提现」条款**；公开报道与社区讨论反映的是「充值后无法退款」。
  - **正面参照**：OpenRouter 官方 FAQ 有明确退款政策——未使用 Credits 可在交易处理完成后 **24 小时内**申请退款，超时不可退；**加密货币支付不退**；并保留购买一年后使未使用 credits 过期的权利：<https://openrouter.ai/docs/faq>（本次已核对页面原文）
  - 即：**「有明确书面退款条款」本身就是正规平台与灰产中转站的区分标志之一。**

#### （4）合规与法律风险

**监管层面的官方表态**

- **国家安全部专项风险提示**（2026-06-08，国家安全部微信公众号发布），四类风险：① **数据裸奔，隐私泄露**；② **模型缩水，结果失真**（低配模型冒充高端模型）；③ **恶意植入，远程控制**；④ **数据出境，失管失控**（未取得数据出境合规资质、未履行安全评估法定流程，擅自把用户输入数据传输至境外服务器，「可能造成个人隐私、商业机密乃至**国家秘密**外泄」）：<https://news.cpd.com.cn/n3569/626/t_1236449.html>
- 官方使用建议：**选用正规平台**（官方直连、正规授权、安全合规，不用「三无」平台）；**加强安全防范**（敏感数据提前脱敏、密钥管理、定期更换凭证、关闭协同操作与数据共享等非必要功能）；**及时处置异常**；**举报可疑线索**（12339）：同上
- **专项行动**：2026 年 4 月，中央网信办部署「清朗·整治 AI 应用乱象」专项行动，重点包括「未按规定进行大模型备案登记、AI 数据安全、内容滥用」等问题（转述见央广网 2026-07-28）：<https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml>
- **第二阶段进展**：2026-09-02 通报，累计清理违法违规信息 **561 万余条**，查处账号 **4.9 万余个**，处置违规网站、应用程序等 **2400 余个**（新华网转中国网信网）：<https://www.news.cn/politics/20260902/564dc9a913c94b22996f783a02abcaf2/c.html>
  - **重要限定**：该通报的典型案例聚焦 AI 生成虚假信息、AI 假冒仿冒、侵害未成年人权益等，**未点名「API 中转站」**。

**法律定性（律师文章，属专业解读而非判决）**

- 垦丁律所（2026-05-29）梳理的路径：<https://kindinglaw.com/news/shownews.php?id=164>
  - **非法经营罪**（《刑法》第 225 条）：核心入罪路径是未持 ICP 证擅自经营**跨境增值电信服务**。援引《最高人民检察院、公安部关于公安机关管辖的刑事案件立案追诉标准的规定（二）》第七十九条——个人非法经营数额 **5 万元以上**或违法所得 **1 万元以上**即应予立案追诉。
  - **侵犯公民个人信息罪**（第 253 条之一）；**提供侵入、非法控制计算机信息系统程序、工具罪**（第 285 条第三款）；**帮助信息网络犯罪活动罪**（第 287 条之二）。
  - **行政处罚**：文章称依《电信条例》第 70 条可没收违法所得并处 3–5 倍罚款，无违法所得处 10 万至 100 万元罚款；数据合规可处 5 万至 50 万元罚款，情节严重可达 100 万至 1000 万元。
    - **注意**：具体罚则数额来自律所文章，本次**未逐条比对法条原文**，讲课时建议只说「可被行政处罚」而不背数字。
  - 该文结论：「**调用 OpenAI、Claude 等未在中国境内备案的境外模型，向境内公众提供服务，无法通过任何形式的备案或登记，属于违法经营**——不存在灰色地带。」
    - **这是律所观点表达，不是监管原文**，讲课应表述为「律师界的普遍解读」。
  - 该文称「2025 年 7 月生效的《生成式人工智能服务管理暂行办法》第 17 条明确禁止调用未备案的境外模型」——**此条本次核查未获证实且存疑**（该办法一般认为是 2023 年公布、2023-08-15 施行），**讲课不要沿用这个时间点**。
- 曼昆律所（2026-09-07）的三层数据出境红线：<https://www.mankunlaw.com/insights/ai-api-relay-data-export-criminal-risk/>
  - 第一层：数据出境不是「技术转发」而是法律行为。数据从经营者控制的服务器传输至境外，经营者可能被认定为**数据处理者**并担责；「我只是管道」**不能当然排除法律责任**。
  - 第二层：「规模较小即可豁免」是危险误区。数量标准只决定是否需要履行安全评估 / 标准合同备案等**特定程序**，不意味着可不履行《个人信息保护法》第 55 条影响评估义务、第 59 条受托处理义务。
  - 第三层：刑事责任可能从**出境数据含个人信息并被出售**（第 253 条之一）、**拒不整改且造成严重后果**（第 286 条之一拒不履行信息网络安全管理义务罪）、**为其他违法犯罪链条提供数据或技术支持**三个环节引爆。
  - 连带责任提醒：**收购用户对话日志的 AI 公司、数据标注公司**若明知来源违法仍收购使用，可能被认定为侵犯公民个人信息犯罪链条中的非法获取方，甚至共同犯罪。

**上游条款与跨境风险**

- 垦丁律所提到：OpenAI、Anthropic 等使用条款均明确禁止「逆向工程、反编译」「修改、复制、出租、出售或分发服务」，禁止「共享 API 密钥」及「通过自动化脚本访问服务」；美国 CFAA（18 U.S.C. § 1030）、FTC 欺诈性商业行为、欧盟 GDPR/DSA/NIS2、日本《不正竞争防止法》《个人信息保护法》《电气通信事业法》均可能触及。
  - **这些域外法分析出自律所文章，具体条号与金额未逐条核实**，只宜作方向性提示。
- **账号池模式的现实压力（有报道佐证）**：央广网报道称，某「1 元兑换数百万 Token」的中转站站长因「反向代理 + 账号池」模式被上海警方以涉嫌非法经营罪刑事拘留，后变更为取保候审；报道还引述业内人士称 Claude 账号出现「一号难求、一号一卖」：<https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml>；垦丁律所给出的时间点是 2026 年 5 月、刑拘 37 天后取保候审、截至 2026-05-15 仍在补充侦查阶段：<https://kindinglaw.com/news/shownews.php?id=164>
  - **重要限定**：垦丁律所自己写明——「在现有的公开检索结果中……**尚未发现与『AI 中转站』业务模式完全一致且已作出终审判决的公开案例**。」

### 2.7 公开案例一览（可核实程度标注）

| 类型 | 实例 | 来源 | 可核实程度 |
| --- | --- | --- | --- |
| 官方风险提示（权威定性，非案例） | 国家安全部「AI 中转站」专项风险提示，2026-06-08 | <https://news.cpd.com.cn/n3569/626/t_1236449.html> | 高 |
| 官方媒体报道（含从业者访谈、模式描述） | 科技日报《如何甄别靠谱的「AI 中转站」》2026-06-15 | <https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html> | 高 |
| 官方媒体报道（含具体低价/返利数字、站长被刑拘描述） | 央广网《「Token 中转站」：AI 风口下的风险生意》2026-07-28 | <https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml> | 高（个案细节为转述） |
| 律所案例分析（刑事案件，**未终审**） | 垦丁律所：上海首起 AI 中转站非法经营案，2026-05 刑拘后取保候审 | <https://kindinglaw.com/news/shownews.php?id=164> | 中（作者明确说明尚无终审判决） |
| 律所案例分析（数据出境，自述为文学化改编） | 曼昆律所《AI 中转站数据出境违规》，2026-09-07 | <https://www.mankunlaw.com/insights/ai-api-relay-data-export-criminal-risk/> | 中 |
| 用户社区跑路贴 | V2EX《中转站疑似跑路》2026-05-14；《88code 退款困难》2026-02-02 | <https://global.v2ex.co/t/1212741>；<https://global.v2ex.co/t/1190270> | 低（个人单方陈述） |
| 监管专项整治通报（**未点名中转站**） | 中央网信办「清朗·整治 AI 应用乱象」第二阶段，2026-09-02 | <https://www.news.cn/politics/20260902/564dc9a913c94b22996f783a02abcaf2/c.html> | 高 |

- **结论**：关于「跑路」有**可信的官方媒体描述**与**用户社区实例**，但本次调研**没有找到任何一起有名有姓、有生效裁判文书可查的中转站跑路案**。讲课时应区分「监管与媒体确认这是普遍存在的风险模式」与「某一个具体站点被判了」——后者**未核实**。

### 2.8 主流正规选择的 base_url 与 Anthropic 端点

#### OpenRouter

| 项目 | 内容 | 来源 |
| --- | --- | --- |
| OpenAI 兼容 base_url | `https://openrouter.ai/api/v1` | <https://openrouter.ai/docs/quickstart> |
| Anthropic 兼容端点 | **支持**。OpenAPI 规范中确有 `POST /messages`（tag `Anthropic Messages`，描述「Creates a message using the Anthropic Messages API format. Supports text, images, PDFs, tools, and extended thinking.」），server 为 `https://openrouter.ai/api/v1`。即 Anthropic 兼容 base_url 为 `https://openrouter.ai/api/v1`，对话端点为 `https://openrouter.ai/api/v1/messages` | <https://openrouter.ai/docs/api/api-reference/anthropic-messages/create-a-message.md>（本次已核对，2026-09-18） |
| 计费与手续费 | 购买 Credits 收 **5.5%（最低 $0.80）**（Stripe）；加密货币支付收 **5%**（Coinbase）。**推理价格不做加价** | <https://openrouter.ai/docs/faq>（数字取自该官方页面内嵌常量 `getTotalFeeString('stripe') = '5.5% ($0.80 minimum)'`、`('coinbase') = '5%'`，本次已从页面源码核对） |
| BYOK | 按 list-price inference cost 计免费额度：Pay-as-you-go 每月 **$25,000**，Enterprise **$200,000**；超出收 **5%** | 同上（官方页面内嵌常量 `BYOK_PAYG_MONTHLY_LIST_PRICE_THRESHOLD_USD=$25,000`、`BYOK_ENTERPRISE_...=$200,000`、`BYOK_FEE_PERCENTAGE=5`） |
| 免费模型额度 | 未充值时 **50 次/天**，已购 **≥10 credits** 时 **1000 次/天** | 同上（官方页面内嵌常量 `FREE_MODEL_NO_CREDITS_RPD=50`、`FREE_MODEL_HAS_CREDITS_RPD=1e3`、`FREE_MODEL_CREDITS_THRESHOLD=10`） |
| 数据日志 | 默认**不记录** prompt/completion；可 opt-in 换取 1% 折扣 | 同上（已逐字核对原文） |
| 退款 | 交易后 **24 小时内**可申请退未使用 Credits；加密货币不退；保留购买一年后使未使用 credits 过期的权利 | 同上（已逐字核对原文） |
| 是否官方 | OpenRouter 是**独立的第三方聚合平台**，不是任何模型厂商的官方服务。**不要称它「官方 API」** | 同上 |

#### 硅基流动 SiliconFlow

| 项目 | 内容 | 来源 |
| --- | --- | --- |
| OpenAI 兼容 base_url | 官方 OpenAPI 规范 servers 为 `https://api.siliconflow.com/v1` | <https://docs.siliconflow.com/cn/api-reference/chat-completions/chat-completions.md> |
| Anthropic 兼容端点 | **支持**。官方 API 手册有「创建对话请求（Anthropic）」页，cURL 为 `POST https://api.siliconflow.com/v1/messages` | <https://docs.siliconflow.com/cn/api-reference/chat-completions/messages> |
| Claude Code 接入 | **官方文档明确有**：「在 Claude Code 中使用」专页，手动配置为 `export ANTHROPIC_BASE_URL="https://api.siliconflow.com/"`、`ANTHROPIC_MODEL`、`ANTHROPIC_API_KEY` | <https://docs.siliconflow.com/cn/usercases/use-siliconcloud-in-ClaudeCode>（本次已逐字核对，2026-09-18） |
| 中国站域名 | **部分未核实**。官方文档展示的是 `.com` 域名；社区与中国站控制台普遍用 `https://api.siliconflow.cn/v1`，但本次**未在官方文档中找到 `.cn` 作为 API base_url 的明确写法**。建议以控制台实际地址为准 | — |
| 免费额度 | **未核实**。本次未找到官方文档关于新用户赠送额度的明确说明 | — |

#### 火山引擎方舟 Volcengine Ark

| 项目 | 内容 | 来源 |
| --- | --- | --- |
| 标准 API base_url | `https://ark.cn-beijing.volces.com/api/v3`（OpenAI 兼容）。间接佐证：uni-api README 中豆包渠道为 `base_url: https://ark.cn-beijing.volces.com/api/v3/responses` | <https://github.com/yym68686/uni-api> |
| Coding Plan 的 Anthropic 兼容端点 | **有**：`https://ark.cn-beijing.volces.com/api/coding`（兼容 Anthropic 接口协议工具）；OpenAI 协议为 `https://ark.cn-beijing.volces.com/api/coding/v3` | 火山引擎官方文章 2026-04-09：<https://www.volcengine.com/article/38136> |
| Claude Code 接入 | **官方文档明确有**：「Coding Plan 个人版 → 接入 AI 工具 → Claude Code」专页（最近更新 2026.09.08） | <https://docs.volcengine.com/docs/ark/coding-plan-personal-ai-claude-code> |
| 关键注意 | 官方警告：**请勿使用普通 API 的 Base URL**，否则「将无法消耗 Coding Plan 套餐额度，还会产生额外费用」；Coding Plan 额度**仅在 AI 编程工具中生效**，「若在非 AI 编程工具中使用可能被识别为违规，导致订阅停用或账号封禁」 | <https://www.volcengine.com/article/38136> |
| 标准 API 的 Anthropic 兼容端点 | **未核实**。标准按量计费 API（/api/v3）是否提供 Anthropic 兼容端点未确认 | — |
| 免费额度 | **未核实** | — |

#### 阿里云百炼 DashScope / Model Studio

| 项目 | 内容 | 来源 |
| --- | --- | --- |
| OpenAI 兼容 base_url | `https://dashscope.aliyuncs.com/compatible-mode/v1` —— **本次未直接取到该页原文，标注为未完全核实** | — |
| Anthropic 兼容端点 | **有，且官方文档写得很具体**。按量计费：`https://dashscope.aliyuncs.com/apps/anthropic`；Coding Plan：`https://coding.dashscope.aliyuncs.com/apps/anthropic`（国际站 `https://coding-intl.dashscope.aliyuncs.com/apps/anthropic`）；Token Plan 团队版：`https://token-plan.cn-beijing.maas.aliyuncs.com/apps/anthropic`；Token Plan 个人版：`https://token-plan.ap-southeast-1.maas.aliyuncs.com/apps/anthropic`；按地域可用 `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/apps/anthropic`（北京）/ `ap-southeast-1`（新加坡）/ `us-east-1`（弗吉尼亚） | <https://www.alibabacloud.com/help/zh/model-studio/claude-code>（更新于 2026-09-16） |
| Claude Code 接入 | **官方文档明确有**：整页《大模型服务平台百炼：Claude Code》，含安装、`~/.claude/settings.json` 配置、`hasCompletedOnboarding` 跳过登录、模型映射、CC Switch、IDE 插件、错误码排查 | 同上 |
| 官方文档中的重要事实（可直接引用） | ① 百炼的 Anthropic 兼容端点（以 `/apps/anthropic` 结尾）**仅提供对话端点 `/v1/messages`，不提供模型列表端点**（`/v1/models` 返回 404）——这解释了 CC Switch 探测模型列表报「未找到可用的模型列表端点」且**该提示不影响正常使用**；② **API Key 类型必须与 base_url 配套**，否则返回 401 `invalid_api_key`；③ 写入 `~/.claude/settings.json` 后需**新开终端窗口**才生效；④ `ANTHROPIC_BASE_URL` 以 `/apps/anthropic` 结尾时**不要额外加 `/v1`**；⑤ 可用 `CLAUDE_CODE_MAX_CONTEXT_TOKENS` 或模型名加 `[1m]` 后缀扩展到 1M 上下文 | 同上 |
| 免费额度 | **新加坡地域专属**：每个模型通常 **100 万 Token**（输入+输出共用），有效期 **90 天**，从「开通百炼 / 模型发布 / 模型申请通过」较晚者起算；**其他地域无免费额度**；不同模型（含快照版本）额度独立不互通；可开启「免费额度用完即停」（耗尽返回 HTTP 403，错误码 `AllocationQuota.FreeTierOnly`）；另有 OAuth 认证独立免费额度，**每天 2000 次调用**。文档更新于 2026-09-11 | <https://www.alibabacloud.com/help/zh/model-studio/new-free-quota> |

#### 智谱 BigModel（GLM）

| 项目 | 内容 | 来源 |
| --- | --- | --- |
| Anthropic 兼容 base_url | `https://open.bigmodel.cn/api/anthropic`（官方「Claude API 兼容」文档明确：「替换您访问的 **base_url** 为 `https://open.bigmodel.cn/api/anthropic`」） | <https://docs.bigmodel.cn/cn/guide/develop/claude/introduction> |
| OpenAI 兼容 base_url | GLM Coding Plan：Chat Completion 协议为 `https://open.bigmodel.cn/api/coding/paas/v4`，Response 协议为 `https://open.bigmodel.cn/api/v1` | <https://docs.bigmodel.cn/cn/coding-plan/quick-start> |
| Claude Code 接入 | **官方文档明确有**：Claude API 兼容文档说明「现有 Claude 应用如 **Claude Code** 等可以快速迁移到智谱平台」；Coding Plan 快速开始把 Claude Code 列为官方支持工具 | 同上两处 |
| Coding Plan 限制 | 「GLM Coding Plan **仅限在官方支持的指定工具与产品环境**中使用」（官方原话） | <https://docs.bigmodel.cn/cn/coding-plan/quick-start> |
| 免费额度 | **部分未核实**。官方快速开始页提到「个人版套餐（**或领取体验卡**）的用户」，说明存在体验类免费额度，但**具体额度与时长未核实** | 同上 |

#### 月之暗面 Kimi（Moonshot）

| 项目 | 内容 | 来源 |
| --- | --- | --- |
| 服务地址 | `https://api.moonshot.cn`（中国站）；国际站 `https://api.moonshot.ai` | <https://platform.kimi.com/docs/api/overview.md>；<https://platform.kimi.ai/docs/api/overview> |
| OpenAI Chat Completions | `https://api.moonshot.cn/v1` → `/chat/completions` | <https://platform.kimi.com/docs/api/overview.md> |
| OpenAI Responses | `https://api.moonshot.cn/v1` → `/responses` | 同上 |
| **Anthropic Messages** | `https://api.moonshot.cn/anthropic` → `/messages`（官方表格明确 SDK/工具为「**Anthropic 官方 SDK、Claude Code 等工具**」）；端点一览写作 `/anthropic/v1/messages` | 同上 |
| Claude Code 接入 | **官方文档明确列出** Claude Code 支持 | 同上 |
| 免费额度 | **未核实** | — |

#### MiniMax

| 项目 | 内容 | 来源 |
| --- | --- | --- |
| Anthropic 兼容端点 | `https://api.minimax.cn/anthropic/v1/messages`（官方 Messages API 文档 cURL 示例） | <https://platform.minimax.cn/docs/api-reference/text-chat-anthropic> |
| Claude Code 接入 | **官方文档明确有**：「在 AI 编程工具里使用 M3 → Claude Code」专页，含一键配置向导 `npx -y mmx-cli@latest agent setup`、手动编辑 `~/.claude/settings.json`、cc-switch 三种方式 | <https://platform.minimaxi.com/docs/token-plan/claude-code> |
| 官方文档中的实用细节 | 配置前需清除 `ANTHROPIC_AUTH_TOKEN`、`ANTHROPIC_BASE_URL` 环境变量（若在 `~/.bashrc`/`~/.zshrc` 永久导出需同步删除），否则会干扰 MiniMax API 使用——可作「环境变量优先级」的教学案例 | 同上 |
| 其他 base_url / 免费额度 | **未核实** | — |

#### 小结：哪些厂商官方文档明确写了「Claude Code 接入」或 Anthropic 兼容端点

**明确写了（已核实到官方文档页面）**
1. **Anthropic 兼容端点 + Claude Code 接入页**：阿里云百炼、智谱 BigModel、Kimi、MiniMax、硅基流动、火山方舟 Coding Plan
2. **Anthropic Messages 端点（官方 OpenAPI 规范）**：OpenRouter

**未核实 / 未找到明确官方说明**
- 火山方舟**标准按量 API**（非 Coding Plan）的 Anthropic 兼容端点
- 硅基流动中国站 `.cn` 域名的官方 base_url 写法
- 阿里云百炼 OpenAI 兼容 base_url 的官方原文（仅间接确认）
- 各家的免费额度：硅基流动、Kimi、MiniMax、火山方舟

---

## 三、给学生讲课时容易讲错 / 需要提醒的点

### A. 关于 DeepSeek 开放平台

**1. `deepseek-chat` / `deepseek-reasoner` 已经不能用，这是最容易被讲错的一条。**
2025 年几乎所有教程、SDK 和培训机构材料里写的都是这两个模型名，但官方更新日志明确记载它们**已于 2026-07-24 停止使用**。当前 API 的 `model` 字段只有两个合法值：`deepseek-flash` 和 `deepseek-v4-pro`。
（<https://api-docs.deepseek.com/zh-cn/updates>、<https://api-docs.deepseek.com/zh-cn/api/create-chat-completion>）
→ 讲课前务必先确认自己手上的示例代码是不是 2025 年的老版本。

**2. 模型名不等于模型版本，且有历史包袱。**
`deepseek-flash` 现在指向 DeepSeek-V4.1-Flash；旧名字 `deepseek-v4-flash`、`deepseek-v4-flash-vision-exp` **仍能调用但模型已下线**，会被路由到 V4.1 Flash 并按 Flash 计费。学生看到「能调通」就以为模型还在，是常见误解。

**3. 官方文档自己有两处口径不一致，讲课时要说明「以实际为准」。**
- V4.1 Flash 发布公告说 2026-09-14 12:00 后 `deepseek-v4-pro` 全部路由到 V4.1 Flash；但当前定价页脚注说「9 月 14 日之后继续提供 V4 Pro 服务，计费方式不变」。两处冲突。
- 限速页只讲**并发限制**，错误码页的 429 却写「请求速率（**TPM 或 RPM**）达到上限」。
→ 正确教法：**官方文档会有内部不同步**，遇到计费/限流问题以控制台实际用量和账单为准。

**4. 「限流」不要讲成 RPM/TPM。**
DeepSeek 官方限速页明确写的是**并发限制**（flash 2500 / v4-pro 500），且**以账号粒度计、与 API Key 无关**——学生常以为「多建几个 Key 就能绕过限额」，这是错的。官方唯一提 RPM/TPM 的地方是错误码页对 429 的泛化描述。
（<https://api-docs.deepseek.com/zh-cn/quick_start/rate_limit>、<https://api-docs.deepseek.com/zh-cn/quick_start/error_codes>）

**5. base_url 不要凭印象写 `/v1`。**
官方当前所有文档和 curl 示例都用 `https://api.deepseek.com`，`/chat/completions` 直接拼在后面。历史上（V3.1 时代）官方文档确实写过「出于与 OpenAI 兼容考虑，您也可以将 base_url 设置为 `https://api.deepseek.com/v1`……此处 v1 与模型版本无关」，但现在这句已从官方文档移除。**是否仍可用，本次未核实**（用无效 Key 探测无法区分，因为假路径也返回 401）。教学生：**按当前官方文档写不带 `/v1` 的版本**。
（历史出处见第三方镜像 <https://deepseek.apifox.cn/>；当前官方页 <https://api-docs.deepseek.com/zh-cn/> 已无此段）

**6. 最低充值额度和免费额度，官方文档都没有写。**
网上「1 元起充」「新用户送 XX 万 tokens」的说法均**未核实**。定价页扣费规则只提到「赠送余额」这一概念（且优先扣减），但没有说明当前是否有赠送、送多少。讲课时不要给具体数字。

**7. 峰谷定价很容易被忽略，但它是真金白银。**
高峰时段是**北京时间周一至周五 9:00–12:00、14:00–18:00**，其余时间**价格减半**。缓存命中价与未命中价差 50 倍（flash：0.02 vs 1 元/百万 tokens）。学生做批量实验应该避开高峰、并理解「缓存命中」是省钱关键。

**8. Anthropic 端点是真的，而且和 Claude Code 配合得很好。**
`https://api.deepseek.com/anthropic` 是官方正式支持的。模型名会被自动映射（`claude-opus*` → `deepseek-v4-pro`，`claude-sonnet*`/`claude-haiku*` → `deepseek-flash`），按映射后的 DeepSeek 模型计费。但要讲清楚**这是「兼容子集」不是「完全等价」**：`top_k`、`cache_control`、`document` 类型、`mcp_servers`、`mcp_tool_use` 等都不支持或被忽略。
（<https://api-docs.deepseek.com/zh-cn/guides/anthropic_api>）

**9. Key 泄露的正确处置顺序：先删 Key，再建新 Key。**
具体路径是「API keys 页 → 选中 Key → 回收箱图标 → 确认删除」，删除后**立即失效**。不要教学生「先改代码再删 Key」——那段时间 Key 仍然有效。
另外「不要共享 Key」和「不要暴露在浏览器/客户端代码中」是官方原文，不是附加建议。
（<https://static.deepseek.com/faq/index.html?lang=zh#/category/4>）

**10. 发票有两条容易踩的规则**：企业认证**只能开企业主体抬头**；**已开票金额不能退款**，要先作废发票。学生如果是给社团/公司报销，这两条一定要提前说。
（<https://static.deepseek.com/faq/index.html?lang=zh#/category/4>）

### B. 关于中转站

**1. 不要把「中转站」和「开源网关软件」混为一谈。**
One API / New API / uni-api 是合法开源软件，企业内部做多模型网关、用量核算、Key 管理完全正当。风险在于**用它向境内公众转售未经备案的境外模型服务**。New API 的 README 自己就把这层义务写成了 WARNING。「软件开源」不等于「拿它做生意就合法」。

**2. 「倍率」不是「折扣」，讲的时候要算一遍。**
官方公式是 `额度 = 分组倍率 × 模型倍率 ×（提示 token + 补全 token × 补全倍率）`。营销话术常把「兑换比例」和「倍率」拆开说，让人只看到「1:10 很便宜」。正确讲法：**真实单价 = 官方单价 × 倍率**，兑换比例只决定充值怎么换算。让学生自己拿一个模型算一遍最有效。

**3. 「能连上 Claude Code」≠「完整支持 Anthropic 协议」。**
格式转换层对未实现的字段会丢弃或重构。One API README 明确提示模型映射会导致请求体被重新构造、部分字段传不过去。Anthropic 侧的 extended thinking、`cache_control`、`tool_use` 等字段支持度必须逐项验证，不能只看「`/v1/messages` 返回 200」。
（佐证：阿里云百炼官方文档说明其 `/apps/anthropic` 端点**只提供 `/v1/messages`，不提供 `/v1/models`**——说明「兼容」是有限度的兼容。）

**4. 「国家安全部提示」和「清朗专项行动通报」要分开讲，不要张冠李戴。**
国家安全部 2026-06-08 的提示**确实**针对「AI 中转站」。但 2026-09-02 中央网信办「清朗·整治 AI 应用乱象」第二阶段的通报，典型案例全部是 AI 造谣、AI 换脸假冒、侵害未成年人等，**通报里没有点名「API 中转站」**。把两者说成「监管已经点名打击中转站」不准确。正确表述是：2026 年 4 月中央网信办启动该专项行动，重点包含「未按规定进行大模型备案登记、AI 数据安全、内容滥用」等问题；AI 中转站处在这几个监管焦点的交叉地带。

**5. 区分「律所解读」与「生效判决」。**
- 垦丁律所**自己写了**「尚未发现与『AI 中转站』业务模式完全一致且已作出终审判决的公开案例」；
- 曼昆律所的案例**自述为「改编自公开裁判文书及公开报道，人物均为化名，部分细节已作文学化处理」**。

不要说成「已经有判例了」。另外垦丁律所文中「2025 年 7 月生效的《生成式人工智能服务管理暂行办法》第 17 条」这一表述**本次核查未获证实且存疑**（该办法一般认为是 2023 年公布、2023-08-15 施行），**讲课不要沿用这个时间点**。

**6. 「中转站一定便宜」是不成立的。**
科技日报引述的甄别标准第三条就是「远离**远低于行业均价的低价引流、无限量套餐陷阱**」。低价往往对应：共享账号池、模型降级、Token 注水、上下文被砍、随时跑路。低价不是优点，是需要解释的现象。

**7. 「OpenRouter 是官方的」是错的。**
OpenRouter 是独立的第三方聚合平台，不是 OpenAI、Anthropic 或任何模型厂商的官方服务。它正规，但「正规的第三方代理」与「官方 API」仍是两回事。反过来说，中转站也**不必然**非法——科技日报三分类里第二类「正规 API 代理中转站」就是合法形态。

**8. 「官方直连就一定安全」也不完全对。**
数据出境、内容安全、备案是**使用者自己**的义务。New API README 明确把备案、许可、内容安全、实名、日志留存、税务、上游授权写成使用者义务。用官方 API 调用未备案的境外模型对外提供服务，问题依然存在（此点属律所解读，讲课应注明「律师界普遍解读」）。

**9. 环境变量优先级是个真实的坑，值得单独讲。**
MiniMax 官方文档要求配置前清除 `ANTHROPIC_AUTH_TOKEN` / `ANTHROPIC_BASE_URL`（包括从 `.bashrc` / `.zshrc` 里删掉永久导出）；阿里云百炼文档说明 API Key 类型必须与 `base_url` 配套否则 401。学生配不通这类问题，八成是环境变量残留或 Key/base_url 不匹配，而不是「中转站坏了」。

**10. 教学生「先看条款再充钱」。**
OpenRouter 有白纸黑字的 24 小时退款窗口与「加密支付不退」；多数小站什么都没有。一条可教的经验规则：**没有公开退款条款的平台，默认按「钱要不回来」处理，充值金额就是你的最大可承受损失。**

**11. 别把「日志留存」当成平台的「可选功能」。**
这是架构决定的：网关必须能读到明文才能计费与路由。正确的推论不是「找一家承诺不记录日志的」，而是「**任何中转站都不该收到不该外传的内容**」。国家安全部的官方建议也是先脱敏、再使用。

**12. 区分「学生的合法用途」与「商业转售」。**
学生自己做课程项目、跑实验，用官方免费额度或正规聚合平台通常足够，**根本不需要碰中转站**。真正会把学生带进坑的诱因，是「便宜到离谱」和「额度看起来用不完」。讲课的价值就在这两点上泼冷水。

---

## 四、核查方法与局限

1. **核查日期**：2026-09-18（北京时间）。原始需求写的是「2025 年当前状态」，但实际核查时点为 2026-09-18，本文以最新状态为准，并对 2025 年的旧状态标注了失效时间。
2. **一手来源优先**：DeepSeek 部分全部取自 `api-docs.deepseek.com`（官方文档）与 `static.deepseek.com/faq` 的**官方 JS bundle 内嵌数据**（FAQ 页面是 SPA，本次直接从官方 CDN 的 `main.981f46ab01.js` 中解析出官方 FAQ 原文，非第三方转述）。
3. **未能核实的原因说明**：
   - `platform.deepseek.com` 所有页面被风控拦截（HTTP 429 `Error - Request Blocked`），**无法直接查看充值页的具体金额选项**，因此「最低充值额度」标注为未核实。
   - 无有效 API Key，无法对 `/v1` 是否仍可用做有效验证（对照实验证明假路径同样返回 401，说明认证先于路由）。
   - 部分厂商文档页（火山方舟等）为 JS 渲染，抓不到正文。
   - Wayback Machine 本次不可达，无法调取官方文档的历史存档。
4. **未做任何事实编造**：所有 URL 均为本次实际抓取到的地址；所有数字均标注了出处与性质（官方 / 官方媒体 / 律所 / 社区）；凡不确定处均明确标注「未核实」。
5. **发现的可疑引用**（已在正文标出，共 3 处）：
   - 垦丁律所称《生成式人工智能服务管理暂行办法》「2025 年 7 月生效」——**存疑**，建议不沿用。
   - DeepSeek 定价页脚注与 V4.1 Flash 发布公告关于 `deepseek-v4-pro` 路由/计费的口径冲突。
   - DeepSeek 限速页（并发）与错误码页（TPM/RPM）的口径不一致。
