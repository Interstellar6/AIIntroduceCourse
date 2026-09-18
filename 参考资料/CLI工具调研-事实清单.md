# CLI 工具安装与配置 · 事实清单

**核查日期：2026-09-18**（所有"当前"均以此日期为准）
**核查方式**：优先采用厂商官方文档与官方仓库；无法访问官方源时使用第三方镜像并明确标注。

---

## ⚠️ 三个必须先说明的前提修正

### 前提修正 1：现在是 2026 年 9 月，不是 2025 年末

本次核查时系统日期为 **2026-09-18**。用户提问中的时间锚点"当前（2025 年末）"**已过期约 9 个月**。
证据：npm 上 `@anthropic-ai/claude-code` 最新版为 **2.1.276**；`@openai/codex` 最新版为 **0.155.0**，GitHub release `rust-v0.155.0` 发布于 **2026-09-17**（核查日前一天）。

因此下文所有"仍然有效 / 已废弃"判断，均基于 2026-09-18 的官方文档状态。

### 前提修正 2（最重要）：`wire_api = "chat"` 已经被删除，不再是解决办法

问题 4 预设的"遇到不兼容时的解决办法（`wire_api = "chat"`）"**已经失效**。

官方配置参考对 `model_providers.<id>.wire_api` 的定义是：

> type: `"responses"` — Protocol used by the provider. **`responses` is the only supported value**, and it is the default when omitted.

即：`wire_api` 现在**只接受 `"responses"` 一个值**，省略时默认为 `responses`。官方配置示例中该字段的注释直接写着 `wire_api = "responses" # only supported value`。

更关键的是时间线——OpenAI 官方讨论帖标题即为 **"Deprecating `chat/completions` support in Codex"**（Discussion #7782）。并且 openai/codex 仓库中存在一个 issue：**"feat: re-add Chat Completions API support for non-OpenAI providers"（#31083）** —— 这个 issue 的标题本身就证明：**Chat Completions 支持当前是被移除的状态**，社区正在请求官方加回来。

一个第三方厂商博客（OpenRouter）给出的具体时点是 **2026 年 2 月移除**："Codex used to speak the older `chat/completions` protocol, but OpenAI deprecated that path and removed it in February 2026... A custom provider with `wire_api = "chat"` now fails on startup"。

> **可信度分级**：`wire_api` 只支持 `responses` —— **已由官方配置参考确认（高可信）**。
> "2026 年 2 月移除"的确切月份 —— **仅第三方博客单一来源，标注「未完全核实」**；但"移除"这一事实由官方 issue #31083 的标题与官方配置参考共同佐证。

**实际后果**：只支持 Chat Completions 的中转站，**当前无法通过配置直接给 Codex 用**。可行的替代路径有两条：
1. 中转站自己提供 Responses 端点（越来越多厂商已提供，见下方 cc-switch v3.20.3 发布说明）；
2. 本地起一个代理做 Responses↔Chat 双向转换 —— 这正是 cc-switch 的"本地路由/接管模式"在做的事。

### 前提修正 3：cc-switch 官方文档自身的 Codex 示例是过时的

cc-switch 仓库 `docs/user-manual/en/5-faq/5.1-config-files.md` 中给出的 Codex `config.toml` 示例为：

```toml
# Basic configuration
base_url = "https://api.openai.com/v1"
model = "gpt-4"
```

**这个示例是错的/过时的**：当前官方 Codex 配置参考中**不存在顶层 `base_url` 键**（覆盖内置 openai provider 用的是 `openai_base_url`），且顶层 `base_url` 从未是文档化键。该页面还写 `auth.json` 内容为 `{"OPENAI_API_KEY": "sk-xxx"}`，同样与当前官方认证文档不符。
**结论：cc-switch 文档中"改了哪些文件"的部分可用，但其中具体字段示例不可照抄。**

---

## 1. Claude Code（Anthropic 官方 CLI）

### 1.1 当前推荐安装方式

官方文档把安装方式分为三个 Tab，**Native Install 被明确标注为 "(Recommended)"**：

| 方式 | 命令 | 自动更新 |
|---|---|---|
| **原生安装脚本（推荐）** macOS/Linux/WSL | `curl -fsSL https://claude.ai/install.sh \| bash` | ✅ 后台自动更新 |
| **原生安装脚本** Windows PowerShell | `irm https://claude.ai/install.ps1 \| iex` | ✅ |
| **原生安装脚本** Windows CMD | `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd` | ✅ |
| **Homebrew** | `brew install --cask claude-code` | ❌ 需手动 `brew upgrade` |
| **WinGet** | `winget install Anthropic.ClaudeCode` | ❌ 需手动 `winget upgrade Anthropic.ClaudeCode` |
| **npm（仍可用，但非推荐）** | `npm install -g @anthropic-ai/claude-code` | ❌ |

Homebrew 有两个 cask：`claude-code` 跟踪 **stable** 通道（通常比 latest 晚约一周，跳过有重大回归的版本）；`claude-code@latest` 跟踪 **latest** 通道。

安装指定版本 / 通道（原生安装脚本）：
```bash
curl -fsSL https://claude.ai/install.sh | bash -s stable        # stable 通道
curl -fsSL https://claude.ai/install.sh | bash -s 2.1.89        # 指定版本号
```

Linux 包管理器（**apt / dnf / apk 均已提供签名仓库**，每个仓库有 `stable` 与 `latest` 两个通道）：
```bash
# apt (Debian/Ubuntu) — stable 通道
sudo install -d -m 0755 /etc/apt/keyrings
sudo curl -fsSL https://downloads.claude.ai/keys/claude-code.asc \
  -o /etc/apt/keyrings/claude-code.asc
echo "deb [signed-by=/etc/apt/keyrings/claude-code.asc] https://downloads.claude.ai/claude-code/apt/stable stable main" \
  | sudo tee /etc/apt/sources.list.d/claude-code.list
sudo apt update && sudo apt install claude-code

# dnf (Fedora/RHEL) — 见官方文档完整 repo 配置
# apk (Alpine)   — 见官方文档完整 repo 配置
```
签名密钥指纹：`31DD DE24 DDFA B679 F42D 7BD2 BAA9 29FF 1A7E CACE`（`security@anthropic.com`）。

验证安装：`claude --version`（官方文档示例输出 `2.1.211 (Claude Code)`）、`claude doctor`（只读诊断，含安装健康度、settings 文件校验错误）。

**重要警告（官方原文）**：不要用 `sudo npm install -g`，会导致权限问题与安全风险。

来源：
- https://code.claude.com/docs/en/setup （官方，2026-09-18 核查）

### 1.2 运行时要求（Node 版本）

| 安装方式 | 运行时要求 |
|---|---|
| **原生安装脚本 / Homebrew / WinGet / apt / dnf / apk** | **运行时不需要 Node.js** —— 安装的是原生二进制 |
| **npm 安装** | **Node.js 22 或更高**（自 v2.1.198 起要求） |

关键细节（官方原文）：npm 包安装的也是**同一个原生二进制**——npm 通过 per-platform optional dependency（如 `@anthropic-ai/claude-code-darwin-arm64`）拉取二进制，postinstall 步骤做链接。**装出来的 `claude` 二进制本身不调用 Node**。所以在旧 Node 上 npm 只打印 `EBADENGINE` 警告，安装仍会完成，`claude` 仍能运行。

npm registry 独立验证（2026-09-18）：`@anthropic-ai/claude-code` 最新版 `2.1.276`，`engines.node = ">=22.0.0"`，与文档一致。

支持的 npm 安装平台：`darwin-arm64`、`darwin-x64`、`linux-x64`、`linux-arm64`、`linux-x64-musl`、`linux-arm64-musl`、`win32-x64`、`win32-arm64`。

npm 升级方式：`npm install -g @anthropic-ai/claude-code@latest`。**避免 `npm update -g`**（它遵守原始安装的 semver 范围，可能不会升到最新版）。

系统要求：macOS 13.0+ / Windows 10 1809+ 或 Server 2019+ / Ubuntu 20.04+ / Debian 10+ / Alpine 3.19+；4GB+ RAM；x64 或 ARM64；需要联网。

来源：
- https://code.claude.com/docs/en/setup
- https://registry.npmjs.org/@anthropic-ai/claude-code/latest （registry 直接查询）

### 1.3 配置文件位置

| 文件 | 作用范围 |
|---|---|
| `~/.claude/settings.json`（Windows：`%USERPROFILE%\.claude\settings.json`） | 你自己，所有项目 |
| `.claude/settings.json` | 项目内所有人（**提交到版本控制**） |
| `.claude/settings.local.json` | 你自己，仅本项目（**不应提交**） |
| Managed settings | 组织内所有人（管理员部署） |

`~/.claude.json` 也是真实存在的状态/配置文件（官方卸载文档明确要求删除它：`rm -rf ~/.claude` 与 `rm ~/.claude.json`）。按 cc-switch 文档，MCP server 配置写在 `~/.claude.json` 的 `mcpServers` 字段中。

**优先级**：settings 文件中的 `env` 值 **优先于 shell 中导出的同名变量**（Claude Code 会把 `env` 条目写入进程环境，替换掉从 shell 继承的值）。settings 文件之间遵循 settings 优先级，managed settings 覆盖 user/project。

`env` 块写法：
```json ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://llm-gateway.example.com",
    "ANTHROPIC_AUTH_TOKEN": "sk-gateway-key"
  }
}
```

来源：https://code.claude.com/docs/en/settings 、https://code.claude.com/docs/en/env-vars

### 1.4 第三方 base_url 与 API Key：三个变量的区别（官方表格原文要点）

| 变量 | 作用（官方定义） |
|---|---|
| `ANTHROPIC_API_KEY` | API key，以 **`X-Api-Key` header** 发送。设置后**会覆盖**你已登录的 Claude Pro/Max/Team/Enterprise 订阅。非交互模式（`-p`）下始终使用该 key；交互模式下会先提示你批准一次。 |
| `ANTHROPIC_AUTH_TOKEN` | 自定义 **`Authorization` header** 的值（你设置的值会被加上 `Bearer ` 前缀）。 |
| `ANTHROPIC_BASE_URL` | 覆盖 API 端点，把请求路由到代理或网关。 |

**如何选（官方给出的决策规则）**：
- 网关方说"bearer token"或"Authorization header" → 用 `ANTHROPIC_AUTH_TOKEN`
- 网关方说"API key"或"x-api-key" → 用 `ANTHROPIC_API_KEY`
- **不知道用哪个时，先用 `ANTHROPIC_AUTH_TOKEN`**
- 凭据会轮换或来自 vault → 用 `apiKeyHelper`

**header 映射（官方明确）**：`ANTHROPIC_AUTH_TOKEN` → `Authorization: Bearer`；`ANTHROPIC_API_KEY` → `x-api-key`；`apiKeyHelper` → **两个 header 都发**。凭据放错变量的后果是以网关不读的 header 到达，请求 **401**。

**与已有登录的冲突**：
- 网关凭据变量优先于已保存的 claude.ai 登录或 Console key。
- `ANTHROPIC_AUTH_TOKEN` **立即**生效；`ANTHROPIC_API_KEY` 在交互模式下需要你批准一次。
- 两者同时存在会触发启动警告（`auth may not work as expected`）。

**重要的连带禁用（2026 年新行为）**：
- 当 `ANTHROPIC_AUTH_TOKEN` / `ANTHROPIC_API_KEY` / `apiKeyHelper` 生效时，**Remote Control 与语音听写不可用**（它们依赖 claude.ai 身份）。
- 自 **v2.1.196** 起，`ANTHROPIC_BASE_URL` 指向非 `api.anthropic.com` 主机时，**Remote Control 也会被禁用**（v2.1.196 之前不会）。
- `ANTHROPIC_BASE_URL` 指向非第一方主机时，**MCP tool search 默认被禁用**，需设 `ENABLE_TOOL_SEARCH=true`（前提是你的代理会转发 `tool_reference` 块）。

**验证连接（官方推荐的 curl 测试）**：
```bash
curl -X POST "$ANTHROPIC_BASE_URL/v1/messages" \
  -H "Authorization: Bearer $ANTHROPIC_AUTH_TOKEN" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-sonnet-4-6", "max_tokens": 1, "messages": [{"role": "user", "content": "."}]}'
```
返回以 `{"id":"msg_` 开头且含 `"content":[...]` 即成功。**即使报错"未知模型"也证明 URL 与凭据可用**（网关已先完成鉴权）。`401` 表示凭据被拒 —— 若你是猜的变量，换另一个再试。

会话内确认：`/status`，看 `Anthropic base URL` 行与 `Auth token` / `API key` 行。

来源：https://code.claude.com/docs/en/llm-gateway-connect 、https://code.claude.com/docs/en/env-vars

### 1.5 绕过登录 / 跳过引导 —— **未核实**

**结论：`CLAUDE_CODE_SKIP_ONBOARDING` 与 `~/.claude.json` 中的 `hasCompletedOnboarding` 均无法证实当前有效，标注「未核实」。**

核查过程与依据：
1. 官方环境变量参考页（`https://code.claude.com/docs/en/env-vars`，完整抓取并全文检索）中 **检索 "onboard" 无任何匹配**，检索 `CLAUDE_CODE_SKIP_ONBOARDING`、`hasCompletedOnboarding`、`CLAUDE_CODE_SKIP` **均无匹配**。
2. 官方文档中不存在任何"跳过登录/跳过引导"的受支持开关。相反，官方明确说明：
   - Claude Code **要求** Pro / Max / Team / Enterprise / Console 账户（免费 claude.ai 计划不含 Claude Code 访问权）。
   - 一个常见故障模式被官方记录："Claude Code asks you to log in even though the curl test succeeds" —— 官方给出的解决方案**不是**跳过引导，而是**把 `ANTHROPIC_AUTH_TOKEN` 设置在 Claude Code 于首次运行向导之前就能读到的地方**（shell export、`~/.claude/settings.json` 的 `env` 块，或 managed settings）。

因此：**给第三方 base_url + key 场景，"绕过登录"的正确当前做法是设置 `ANTHROPIC_AUTH_TOKEN`（或 `ANTHROPIC_API_KEY`），而不是找引导跳过开关。** 这两个环境变量名属于社区流传的历史做法，官方文档当前不提供，是否仍生效**未核实**，不建议依赖。

来源：https://code.claude.com/docs/en/env-vars 、https://code.claude.com/docs/en/llm-gateway-connect （2026-09-18 全文检索）

---

## 2. Codex CLI（OpenAI 官方 CLI）

### 2.1 当前推荐安装方式

官方 README 给出的安装命令（**原生安装脚本为当前主推**）：

```bash
# macOS / Linux（原生安装脚本）
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"

# npm
npm install -g @openai/codex

# Homebrew
brew install --cask codex
```

脚本默认从 `https://releases.openai.com/codex` 下载，**失败时回退到 GitHub Releases**。强制走 GitHub Releases：
```bash
curl -fsSL https://chatgpt.com/codex/install.sh | CODEX_INSTALLER_USE_RELEASES_OPENAI_COM=false sh
```

GitHub Release 直接下载的资产名：
- macOS Apple Silicon/arm64：`codex-aarch64-apple-darwin.tar.gz`
- macOS x86_64：`codex-x86_64-apple-darwin.tar.gz`
- Linux x86_64：`codex-x86_64-unknown-linux-musl.tar.gz`
- Linux arm64：`codex-aarch64-unknown-linux-musl.tar.gz`

**版本（2026-09-18 实测）**：
- npm `@openai/codex` 最新版 **0.155.0**，`engines.node = ">=16"`
- GitHub release 最新 tag **`rust-v0.155.0`**，发布 **2026-09-17**

注意 npm 包要求 `node >=16`，远低于 Claude Code 的 `>=22`。

来源：
- https://raw.githubusercontent.com/openai/codex/main/README.md （官方仓库，2026-09-18 抓取）
- https://registry.npmjs.org/@openai/codex/latest
- GitHub API `releases/latest`

### 2.2 配置文件位置与格式

- **用户级配置**：`~/.codex/config.toml`（准确说：`$CODEX_HOME/config.toml`，`CODEX_HOME` 默认 `~/.codex`）
- **项目级配置**：`.codex/config.toml`（**仅在项目被信任时加载**；从项目根走到当前工作目录，多个文件时离 cwd 最近的优先）
- **凭证**：`~/.codex/auth.json`（文件存储时）或 OS 凭证库
- **会话历史**：`~/.codex/history.jsonl`
- **profile 文件**：`$CODEX_HOME/profile-name.config.toml`

**项目级配置的限制（重要）**：以下键写在项目级 `.codex/config.toml` 中会被**忽略并打印启动警告**：
`openai_base_url`、`chatgpt_base_url`、`apps_mcp_product_sku`、**`model_provider`**、**`model_providers`**、`notify`、`profile`、`profiles`、`experimental_realtime_ws_base_url`、`otel`。
→ **供应商配置必须放用户级 `~/.codex/config.toml`**，这是最常见的踩坑点。

配置覆盖优先级：`~/.codex/config.toml` → `--profile` 指定的 profile 文件 → 项目级 → CLI `-c key=value`。

单次运行覆盖：`-c` / `--config`（值按 TOML 解析，不是 JSON）：
```bash
codex --config model='"gpt-5.4"'
codex --config sandbox_workspace_write.network_access=true
```

**已废弃的配置写法（重要）**：
- **Codex 0.134.0 起，`--profile` 不再读取 `config.toml` 中的 `[profiles.profile-name]` 表，顶层 `profile = "profile-name"` 选择器也不再支持。** 必须迁移到独立文件 `~/.codex/profile-name.config.toml`。
- `experimental_instructions_file` **已弃用**，改名 `model_instructions_file`。

来源：官方配置参考（镜像）— 见下方镜像说明

### 2.3 自定义 model_provider / base_url / env_key / wire_api

**保留的 provider ID**：`openai`、`ollama`、`lmstudio`（以及内置的 `amazon-bedrock`）**不可被覆盖**。想接自定义供应商必须用新 ID。

**关键更正**：要覆盖**内置 openai provider** 的 base_url，**不要**创建 `[model_providers.openai]`（不允许），而是使用顶层 `openai_base_url`：
```toml
openai_base_url = "https://us.api.openai.com/v1"
```

**`model_providers.<id>` 完整支持的字段（官方配置参考）**：

| 键 | 类型 | 说明 |
|---|---|---|
| `name` | string | 显示名 |
| `base_url` | string | API base URL |
| `env_key` | string | 提供 API key 的环境变量名 |
| `env_key_instructions` | string | key 的可选设置指引 |
| `experimental_bearer_token` | string | 直接 bearer token（**不推荐**，官方建议用 `env_key`） |
| `requires_openai_auth` | boolean | 该 provider 使用 OpenAI 认证（默认 false）。**为 true 时 Codex 忽略 `env_key`** |
| **`wire_api`** | **`"responses"`** | **只支持 `responses`，省略即默认** |
| `query_params` | map | 附加 query 参数 |
| `http_headers` | map | 静态 header |
| `env_http_headers` | map | 从环境变量取值的 header |
| `request_max_retries` | number | 默认 4 |
| `stream_max_retries` | number | 默认 5 |
| `stream_idle_timeout_ms` | number | 默认 300000 |
| `supports_websockets` | boolean | 是否支持 Responses API WebSocket 传输 |
| `auth.command` / `auth.args` / `auth.timeout_ms` / `auth.refresh_interval_ms` / `auth.cwd` | | 命令式 bearer token 认证。**不可与 `env_key`、`experimental_bearer_token`、`requires_openai_auth` 同时使用** |

### 2.4 完整可用的 config.toml 例子

以下示例基于官方文档的官方示例结构改写，**只使用当前受支持的键**（已剔除 `wire_api = "chat"`）：

```toml
# ~/.codex/config.toml
# 注意：TOML 根键必须写在所有 table 之前

model = "gpt-5.5"
model_provider = "myrelay"          # 指向下面定义的 provider id

# ---- 自定义供应商：第三方中转站（必须是 Responses 端点）----
[model_providers.myrelay]
name = "My Relay"
base_url = "https://relay.example.com/v1"
wire_api = "responses"              # 唯一支持的值；本行可省略
env_key = "MY_RELAY_API_KEY"        # 从该环境变量读取 API key
env_key_instructions = "export MY_RELAY_API_KEY=sk-xxx"

# ---- 备选方案 A：命令式取 token（凭据会轮换/来自 vault 时用）----
# [model_providers.myrelay.auth]
# command = "/usr/local/bin/fetch-codex-token"
# args = ["--audience", "codex"]
# timeout_ms = 5000
# refresh_interval_ms = 300000

# ---- 备选方案 B：只覆盖内置 openai provider 的 base_url ----
# （不要创建 [model_providers.openai]，不允许覆盖内置 ID）
# openai_base_url = "https://us.api.openai.com/v1"

# ---- 审批与沙箱 ----
approval_policy = "on-request"       # untrusted | on-request | never | { granular = {...} }
sandbox_mode = "workspace-write"     # read-only | workspace-write | danger-full-access
# approvals_reviewer = "user"        # user | auto_review

[sandbox_workspace_write]
writable_roots = ["/Users/me/.pyenv/shims"]
network_access = false               # 沙箱内是否允许出网
exclude_tmpdir_env_var = false
exclude_slash_tmp = false

# ---- 凭据存储位置 ----
cli_auth_credentials_store = "file"  # file | keyring | auto
```

对应的 shell 环境变量：
```bash
export MY_RELAY_API_KEY="sk-xxx"
codex
```

**关于 `env_key` 的一个实测坑（来自 OpenRouter 官方博客）**：用纯 `env_key` 时 Codex 不会去拉取该供应商的模型目录，非 OpenAI 模型会出现 "Unknown model … fallback metadata" 警告并按假设的默认值运行。改用**命令式 `auth` 块**可以触发模型目录刷新。这是第三方来源的单一报告，标注**「未完全核实」**，但与官方文档中 `auth` 块的存在与用途一致。

### 2.5 认证方式：ChatGPT 登录 vs API Key

官方认证文档明确：Codex 支持**两种**登录方式（CLI 与 IDE 扩展都支持，Codex cloud 只支持 ChatGPT 登录）：
1. **Sign in with ChatGPT** —— 订阅访问（Plus/Pro/Business/Edu/Enterprise）
2. **Sign in with an API key** —— 按量计费

**CLI 在没有有效 session 时，ChatGPT 登录是默认认证路径。**

**切到纯 API Key 模式（官方 CLI 参考确认的 flag）**：

```bash
# 方式 1：把 key 通过 stdin 管道传入（推荐 —— Codex 出于安全不接受 key 作为命令行参数）
printenv OPENAI_API_KEY | codex login --with-api-key
echo "sk-proj-..." | codex login --with-api-key

# 方式 2：直接用环境变量
export OPENAI_API_KEY="sk-proj-..."
codex "explain this code"

# 方式 3：项目内 .env 文件
# .env:  OPENAI_API_KEY=sk-proj-...

# 查看当前认证状态
codex login status
# ChatGPT: "Logged in using ChatGPT"
# API key: "Logged in using an API key - sk-proj-***ABCDE"（部分掩码）
# 未登录:  "Not logged in"

# 登出（同时清除 API key 与 ChatGPT 两种凭证）
codex logout
```

**强制锁定登录方式（托管环境）**：
```toml
forced_login_method = "chatgpt"   # 或 "api"
forced_chatgpt_workspace_id = "00000000-0000-0000-0000-000000000000"
```
凭据与限制不匹配时 Codex 会登出并退出。

**headless / SSH 环境**：
```bash
codex login --device-auth        # device code 流程（beta），首选
# Fallback：把 ~/.codex/auth.json 从有浏览器的机器复制过去（该文件含 access token，视同密码）
# Fallback：ssh -L 1455:localhost:1455 user@remote 后正常 codex login
```

**自定义 CA**（企业 TLS 代理）：设 `CODEX_CA_CERTIFICATE` 指向 PEM bundle；未设置时回退 `SSL_CERT_FILE`。

来源：
- 官方 auth.md（镜像）+ 官方 CLI reference（镜像）+ mintlify 社区镜像交叉验证 `--with-api-key`

### 2.6 sandbox / approval 模式配置项与取值

**`approval_policy`** 取值（官方配置参考）：
```
untrusted | on-request | never | { granular = { sandbox_approval = bool, rules = bool,
                                               mcp_elicitations = bool, request_permissions = bool,
                                               skill_approval = bool } }
```
含义（官方示例注释）：
- `untrusted` — 只有已知安全的只读命令自动运行，其他都要审批
- `on-request` — 由模型决定何时询问（**默认**）
- `never` — 从不提示（有风险）
- `{ granular = {...} }` — 允许或自动拒绝特定类别的提示

**`on-failure` 已弃用**（官方原文）："`on-failure` is deprecated; use `on-request` for interactive runs or `never` for non-interactive runs."

**`sandbox_mode`** 取值：
```
read-only | workspace-write | danger-full-access
```
⚠️ 注意：官方配置示例中 `sandbox_mode` 的注释默认值写的是 **`read-only`（默认）**，而官方示例文件里显式写了 `sandbox_mode = "read-only"`。

**`sandbox_workspace_write.*`**（仅当 `sandbox_mode = "workspace-write"` 时生效）：
- `writable_roots` — 额外可写根（array<string>，默认 `[]`）
- `network_access` — 沙箱内是否允许出网（boolean，默认 `false`）
- `exclude_tmpdir_env_var` — 从可写根排除 `$TMPDIR`（默认 `false`）
- `exclude_slash_tmp` — 从可写根排除 `/tmp`（默认 `false`）

**其他相关键**：
- `approvals_reviewer = "user" | "auto_review"`（默认 `user`；`auto_review` 走 reviewer 子代理）
- `allow_login_shell`（boolean，默认 `true`；设 `false` 拒绝 `login = true` 请求）
- `windows.sandbox = "unelevated" | "elevated"`（仅原生 Windows）
- `default_permissions` — 命名权限 profile，内置 `:read-only` | `:workspace` | `:danger-full-access`
- 管理员侧 `requirements.toml` 用 `allowed_sandbox_modes`、`allowed_approval_policies` 约束取值

**对应 CLI flag（官方 CLI 参考）**：
```bash
--sandbox, -s       read-only | workspace-write | danger-full-access
--ask-for-approval, -a   untrusted | on-request | never
--dangerously-bypass-approvals-and-sandbox, --yolo   # 无审批无沙箱，仅限已加固环境
--add-dir <path>    # 授予额外目录写权限（推荐用它而非 danger-full-access）
```

**已废弃的 CLI flag**：`--full-auto` 是**已弃用的兼容 flag**，官方建议改用 `--sandbox workspace-write`；使用时会打印警告。

**官方推荐的低摩擦组合**：`--sandbox workspace-write --ask-for-approval on-request`
**官方 CI 组合建议**：`--json` 搭配 `--output-last-message`

来源：官方 config-reference / config-advanced / cli-reference / config-sample（均经镜像获取，见下方镜像说明）

### 2.7 关于本次 Codex 部分的来源可信度声明

`developers.openai.com` 对本工具的抓取返回 **HTTP 403**，无法直连。因此 Codex 相关事实取自一个**第三方文档镜像仓库**（`crasuna/openai-dev-docs-cn-mirror`），该仓库把官方 `developers.openai.com/codex/*.md` 抓取为本地 Markdown，并在每页头部附带**官方来源 URL、抓取时间（2026-06-27）与 SHA-256 checksum**。

- **可信度**：内容与官方结构、字段命名、弃用说明高度自洽，且多处（`wire_api` 仅 `responses`、`on-failure` 弃用、reserved provider ID）与官方 `openai/codex` 仓库 README、官方 Discussion #7782、官方 issue #31083 相互印证。**判定为高可信，但严格意义上仍属镜像而非原始页面。**
- **已知时效缺口**：抓取时间为 **2026-06-27**，距核查日约 2.5 个月。若 2026-07 至 09 间官方新增了字段，本清单无法覆盖。
- 独立交叉验证了 `--with-api-key`、`--device-auth`、`codex login status` 等命令，另通过 `mintlify.wiki/openai/codex`（社区镜像）确认。
- ⚠️ **`mintlify.wiki/openai/codex` 的部分内容已过时且不可信**：其"Using other AI providers"章节称 Codex 支持 `codex --provider azure`、配置写在 `~/.codex/config.yaml`、且"supports other AI providers that implement the **OpenAI Chat Completions API**"。**这三项都与当前官方事实矛盾**（当前用 `config.toml` 的 `[model_providers]`、无 `config.yaml`、只支持 Responses）。该页仅可用于交叉验证 login 相关命令。

镜像地址：`https://raw.githubusercontent.com/crasuna/openai-dev-docs-cn-mirror/main/`
对应文件：`sources/en/codex/config-reference.md`、`sources/en/codex/config-advanced.md`、`sources/en/codex/auth.md`、`docs/mirror/codex/config-sample.md`、`docs/mirror/codex/cli/reference.md`

---

## 3. cc-switch

### 3.1 它是什么 / 作者 / 仓库

- **仓库**：https://github.com/farion1231/cc-switch
- **作者**：**@farion1231**（GitHub 显示 License 为 MIT © **Jason Young**）
- **唯一官方网站**：**https://ccswitch.io**（官方在 release notes 中专门发"唯一官方渠道声明"，提醒：任何向你收费、要求充值或索取登录凭据的"CC Switch"网站或客户端均为假冒；作者不会向用户收费）
- **技术栈**：Tauri 2 + Rust 后端 + React 18 / TypeScript 前端；数据存 SQLite（SSOT）
- **解决的问题**（官方 README 原文）：各 AI 编程 CLI 各有自己的配置格式，切换 API 供应商意味着手工编辑 JSON / TOML / `.env` 文件，且没有统一方式跨工具管理 MCP 与 Skills。cc-switch 用一个桌面 App 提供可视化界面：一键导入供应商、即时切换，内置 50+ 供应商预设，统一 MCP / Skills 管理，系统托盘快速切换，SQLite 原子写入保护配置不被写坏。

### 3.2 支持管理哪些 CLI

**官方 README 当前（2026-09-18）声明为 9 个工具**：

> Claude Code、Claude Desktop、Codex、Gemini CLI、Grok Build、OpenCode、OpenClaw、Hermes、MiniMax Code

（注意：仓库的 GitHub About 描述与实际 README 略有出入——About 写的是 "Claude Code, Codex, OpenCode, OpenClaw, Grok Build & Hermes Agent"，**没有列出 Claude Desktop / Gemini CLI / MiniMax Code**。以 README 的 9 个工具列表为准，并注明此处存在官方自述不一致。）

**Gemini CLI 在支持列表内**（问题中的猜测正确）。此外还有多个第三方 CLI 在列，比用户问题预期的更多。

**注意 cc-switch 文档站的一处不一致**：其 installation 页写"The CLI tools that CC Switch manages — **Claude Code, Codex, and Gemini CLI** — require Node.js 18 LTS or higher" —— 这个三元组列表已落后于 README 的九工具列表；另需注意**当前 Claude Code 的 npm 包要求 Node 22+**（见 1.2），该页的"Node 18"说法对 Claude Code 而言已过时。

### 3.3 安装方式与当前最新版本

**当前最新版本：`v3.20.3`，发布日期 2026-09-11**（GitHub API `releases/latest` 实测，2026-09-18）。

| 平台 | 方式 | 命令 / 文件 |
|---|---|---|
| **macOS（推荐）** | Homebrew | `brew tap farion1231/ccswitch` 然后 `brew install --cask cc-switch`；升级 `brew upgrade --cask cc-switch` |
| **macOS（手动）** | DMG | `CC-Switch-v3.20.3-macOS.dmg`（推荐）或 `.zip` / `.tar.gz` |
| **Windows** | MSI 安装包 | `CC-Switch-v3.20.3-Windows.msi`（arm64 版为 `...-Windows-arm64.msi`） |
| **Windows** | 便携版 ZIP | `CC-Switch-v3.20.3-Windows-Portable.zip`，解压后运行 `CC-Switch.exe` |
| **Arch Linux** | AUR | `paru -S cc-switch-bin`（安装文档另给出 `paru -S cc-s`，两者不一致，**以 AUR 实际包名为准，标「未完全核实」**） |
| **Linux** | DEB / RPM / AppImage | `...-Linux-x86_64.deb` / `.rpm` / `.AppImage`（并有 arm64 版本） |

**不是 npm 包。** 无 npm 安装方式。macOS 版**已由 Apple 签名与公证**，可直接打开，无 Gatekeeper 警告。**Flatpak 不在官方 release 中**（可从 `.deb` 自行构建）。

**Homebrew 命令的一处官方不一致**：README 只写 `brew install --cask cc-switch`（未提 tap），而 docs 站的 installation 页要求先 `brew tap farion1231/ccswitch`。**稳妥做法是先 tap 再 install。**

**系统要求**：Windows 10+ / macOS 12 (Monterey)+ / Ubuntu 22.04+ · Debian 11+ · Fedora 34+。

**Linux Wayland + NVIDIA 已知问题**：AppImage 强制 `GDK_BACKEND=x11`（XWayland），在较新的 Wayland+NVIDIA 环境下可能导致内容区无法点击、resize 时黑屏。逃生开关：
```bash
CC_SWITCH_GDK_BACKEND=wayland ./CC-Switch-*.AppImage
```

Release 资产清单（v3.20.3 实测）：Linux arm64/x86_64 的 AppImage/deb/rpm、`macOS.dmg`、`macOS.tar.gz`、`macOS.zip`、Windows arm64/x86_64 的 msi 与 Portable.zip，以及 `latest.json`。多数资产附带 `.sig` 签名。

### 3.4 基本使用流程

**添加供应商**：
1. 点击 **Add Provider**
2. 选择内置预设，或创建自定义配置
3. 填入：**名称、base_url、API key、（Codex 卡还需 model id / 上游格式）**
4. 保存

**切换**：
- 主界面：选中供应商 → 点 **Enable**
- 系统托盘：直接点供应商名（即时生效）

**生效方式**：多数工具需**重启终端或对应 CLI**；**例外是 Claude Code，支持热切换供应商数据、无需重启**（官方 FAQ 明确）。

**回到官方登录**：添加一个 **"Official Login" 预设** → 重启 CLI → 走它的登录/OAuth 流程。之后即可在官方与第三方供应商间自由切换。**Codex 支持在不同官方供应商间切换**（便于在多个 Plus/Team 账号间切换）。

### 3.5 它改了哪些文件

**cc-switch 自身的数据**（全部在 `~/.cc-switch/`，可在设置里改位置以便云同步）：
```
~/.cc-switch/
├── cc-switch.db      # SQLite 数据库（SSOT：providers / mcp_servers / prompts / skills / ...
│                     #   以及 proxy_config、proxy_request_logs、provider_health、model_pricing 等表）
├── settings.json     # 设备级设置（语言、主题、窗口行为、各 CLI 的 configDir 覆盖）
├── skills/           # Skill 的 SSOT 目录
├── skill-backups/    # 卸载 Skill 时自动创建，保留最近 20 份
└── backups/          # 数据库备份，导入配置前自动创建，保留最近 10 份
```
卸载 App 时要同时删除配置数据须删 `~/.cc-switch/`。**v3.7.0 起从 JSON 文件迁移到 SQLite**（首次启动自动迁移，显示通知，旧配置文件保留为备份）。

**它写入目标 CLI 的以下文件**：

| CLI | 配置目录 | 被写入的关键文件 |
|---|---|---|
| **Claude Code** | `~/.claude/` | **`settings.json`** —— 最关键，供应商写入 `env.ANTHROPIC_API_KEY` / `env.ANTHROPIC_BASE_URL` / `env.ANTHROPIC_AUTH_TOKEN`；另涉及 `CLAUDE.md`（系统提示词）、`skills/`；MCP 配置在 **`~/.claude.json`** 的 `mcpServers` |
| **Codex** | `~/.codex/` | **`config.toml`**（主配置 + MCP）、**`auth.json`**（认证）、`AGENTS.md`（系统提示词） |
| **Gemini CLI** | `~/.gemini/` | **`.env`**（API Key：`GEMINI_API_KEY` / `GOOGLE_GEMINI_BASE_URL` / `GEMINI_MODEL`）、**`settings.json`**（主配置 + MCP）、`GEMINI.md` |
| **OpenCode** | `~/.config/opencode/` | `opencode.json`、`AGENTS.md`、`skills/` |
| **Hermes** | `~/.hermes/` | `config.yaml`（MCP 写入 `mcp_servers`，可编辑供应商写入 `custom_providers`，切换时更新 `model.provider` / `model.default`）、`.env`、`SOUL.md`、`memories/`、`state.db` |
| **OpenClaw** | `~/.openclaw/` | `openclaw.json`（JSON5 格式，写入 `models.providers` / `env` / `agents.defaults`）、`skills/` |

**修改配置的优先级模型（官方原文）**：
1. **cc-switch 数据库** —— 单一真源（SSOT）
2. **实时配置文件** —— 切换供应商时写入
3. **回填机制** —— 编辑当前供应商时从实时文件读回

**设计原则**：最小侵入——即使卸载 App，你的 CLI 工具仍能正常工作。系统**始终保留一个活跃配置**（因为删光配置会让对应 CLI 不可用）。「切换供应商时保留官方登录」默认开启。

### 3.6 cc-switch 与本次 Codex Chat/Responses 问题的直接关联

cc-switch v3.20.3 的发布说明**直接印证了本清单的前提修正 2**，并给出了当前生态的实际状态（2026-09-11，即核查前 7 天）：

> "Codex 也早已以 **Responses 为唯一原生协议**。"

发布说明描述的当前局面：
- **已原生支持 Responses、Codex 直连厂商端点**的官方预设：**DeepSeek、智谱 GLM、千问、MiniMax、小米 MiMo、LongCat、Kimi**，以及**火山豆包、腾讯混元**。本版把 Kimi 两条预设从 `openai_chat` 改为 `openai_responses`（原生 `/v1/responses` 直连，不再需要本地路由做格式转换）。
- **仍只提供 Chat Completions、需要经 cc-switch 本地路由做 Responses→Chat 转换**的端点：**百度千帆、腾讯 Token Plan、QwenCloud For Coding、StepFun、百灵、ModelScope，以及各聚合平台**。
- **升级提醒（官方原文）**：如果你现有的 Codex 卡片还是早先添加的 Chat 格式，**重新添加一次预设，或在编辑页把「上游格式」改成 Responses**，即可直连。

⇒ **这就是"中转站只支持 chat completions"问题在 2026 年 9 月的真实解法**：不是改 `wire_api`（那个值已被删除），而是**要么换用提供 Responses 端点的上游，要么让 cc-switch 这类工具在本地起代理做协议转换**。

**cc-switch 本地代理的能力**（README）：本地代理支持热切换、**格式转换**、自动故障转移、熔断、供应商健康监控、请求整流；「应用级接管」可对 Claude / Codex / Gemini / Grok Build 独立代理，粒度到单个供应商。

⚠️ **但要注意其自身文档中 Codex `config.toml` 的示例字段是过时的**（见前提修正 3）。

来源：
- https://github.com/farion1231/cc-switch （README，官方）
- https://raw.githubusercontent.com/farion1231/cc-switch/main/docs/user-manual/en/5-faq/5.1-config-files.md （官方用户手册）
- GitHub API `repos/farion1231/cc-switch/releases/latest`
- https://github.com/farion1231/cc-switch/releases.atom （v3.20.3 发布说明全文）
- https://mintlify.wiki/farion1231/cc-switch/installation （文档站镜像）

---

## 4. OpenAI Responses API vs Chat Completions

### 4.1 两者区别（基于 OpenAI 官方迁移工具包）

OpenAI 官方仓库 `openai/completions-responses-migration-pack` 的 README 给出的对比：

| 能力 | Responses API | Chat Completions |
|---|---|---|
| **有状态会话** | 可选 `store: true` + `previous_response_id`，无需重发完整历史 | 需自行重发完整历史 |
| **加密推理** | 支持保留 reasoning items 的同时保持应用无状态 | 不保留推理结构 |
| **内置工具** | 可直接添加 `web_search_preview`、`file_search` 或自定义函数 | 需自行编排 |
| **输入形态** | 可传单个字符串 `input` 或 items 数组；用 `instructions` 做系统级指引 | `messages` 数组 + `role: system` |
| **事件模型** | 事件驱动，发出**语义化事件**（如特定文本增量），而非改写单个 `content` 字符串 | 流式增量累积到 `content` 字符串 |
| **推理质量/成本** | 官方称推理质量更好、缓存利用率更高 | — |

**官方对 GPT-5 的明确立场**（README 原文）：GPT-5 在 Responses 上表现最好；迁移可解锁更好的推理与现代特性（工具调用、可操控性、元提示），且延迟与成本更低。**GPT-5 把工具编排作为其推理的一部分；旧端点不保留这个结构，会导致重复工具调用与行为退化。**

**字段级迁移映射（官方 README 的 "What gets changed"）**：
```
端点：   /v1/completions  →  /v1/responses
字段：   prompt            →  input
字段：   max_tokens        →  max_output_tokens
SDK：    改为 OpenAI client 的 client.responses.create(...)
工具：   function-calling  →  tools（JSON Schema）+ tool_choice
多轮：   调用方改为把先前的轮次显式作为 input items 传入
流式：   仅在原本使用的地方保留
```

**官方迁移工具包本身**（可作为参考实现）：
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/openai/completions-responses-migration-pack/main/scripts/completions-to-responses-upgrade.sh)"
```
它由 Codex CLI 驱动，会：检测仓库中的旧 Completions 用法 → 提出并应用改动 → 更新 import/init 与请求/响应形状 → 跑测试/lint → 建分支、可选开 PR。其 `-a/--approval` 支持 `untrusted | on-failure | on-request | never`（注意该脚本仍接受已弃用的 `on-failure`）。

来源：
- https://raw.githubusercontent.com/openai/completions-responses-migration-pack/main/README.md （OpenAI 官方仓库）

### 4.2 为什么 Codex 默认用 responses

**因为 Responses 现在不只是默认，而是唯一选项。**（见前提修正 2）

官方配置参考对 `wire_api` 的定义已经把取值收窄为单一值 `"responses"`，并注明它是省略时的默认值。这解释了"为什么默认"：
1. GPT-5 系列的推理/工具编排结构只在 Responses 上完整保留（官方迁移包 README）；
2. Codex 自身的功能（如 `reasoning.encrypted_content`、`reasoning.summary`、托管 web_search、回放 reasoning 项、WebSocket 传输）都构建在 Responses 之上。

补充旁证：cc-switch v3.20.3 发布说明提到，Codex 侧新特性如 `model_providers.<id>.supports_websockets`（"Whether that provider supports the **Responses API WebSocket transport**"）也只在 Responses 语境下存在。

### 4.3 为什么很多中转站只支持 chat completions

- Chat Completions 是多年的事实标准接口，绝大多数聚合/中转平台的适配层都是围绕它写的；
- 大量开源模型服务端的 OpenAI 兼容层只实现了 `/v1/chat/completions`。

**但据 cc-switch v3.20.3（2026-09-11）观察，局面正在快速改变**：主流开源模型的官方 API 如今大多已原生提供 Responses 端点。DeepSeek、智谱 GLM、千问、MiniMax、小米 MiMo、LongCat、Kimi、火山豆包、腾讯混元均已直连；**仍只提供 Chat Completions 的主要是百度千帆、腾讯 Token Plan、QwenCloud For Coding、StepFun、百灵、ModelScope 与各聚合平台**。

（注：cc-switch 是利益相关方之一，其"主流模型都已支持"的判断可能偏乐观；但"哪些厂商已支持 / 未支持"的具体名单是可核对的。）

### 4.4 遇到不兼容时的报错

**报错 1（配置层面的确定性报错）**：如果你的 `config.toml` 里还留着旧配置
```toml
wire_api = "chat"
```
**Codex 现在会在启动时直接失败**。第三方来源（OpenRouter 博客）的表述是 "A custom provider with `wire_api = \"chat\"` now fails on startup"。

**报错 2（历史弃用警告，可作为旧版本识别标志）**：较早的 Codex 版本会打印
```
Support for the "chat" wire API is deprecated and will soon be removed.
Update your model provider definition in config.toml to use wire_api = "responses".
```
（此警告文本由第三方项目 janhq/jan 的 issue #7413 记录，属第三方来源。）

**报错 3（把 Chat 端点当 Responses 用时）**：cc-switch 发布说明记录了一个典型错误：把智谱 GLM 的 **Chat 端点**当成 Codex 直连目标时，报 **HTTP 400 `unknown variant custom`** —— 原因是 Chat 端点那个严格旧网关不接受 Responses 风格的请求体。同理，若 base_url 指向原生 Responses 端点却用 Chat 格式，也会失败。

### 4.5 当前（2026-09-18）的解决办法

**❌ 已废止**：`wire_api = "chat"`（该取值已被官方删除，写它会启动失败）

**✅ 办法 1：换用原生提供 Responses 端点的上游。** 这是官方与 cc-switch 都推荐的方向。配置只需 `base_url` + `env_key`（`wire_api = "responses"` 可省略）。可直接直连的厂商包括 DeepSeek、智谱 GLM、千问、MiniMax、小米 MiMo、LongCat、Kimi、火山豆包、腾讯混元等。

**✅ 办法 2：本地起协议转换代理。** 用 cc-switch 的「本地路由 / 接管模式」，它会在 Codex 与只支持 Chat 的上游之间做 Responses↔Chat 双向流式转换。代价是多一层翻译就多一处出错点（cc-switch 自己的 v3.20.3 发布说明就承认，本版修的两个 bug 正是这类转换缺陷：#7280 长任务在一句进度汇报后戛然而止、#7287 Claude Desktop 模型探针误报）。

**⚠️ 办法 3（未核实）**：等待/推动官方按 issue #31083 重新加回 Chat Completions 支持。该 issue 存在但**尚无已发布的重新支持**；截至核查日，官方配置参考中 `wire_api` 仍只接受 `responses`。

**✅ 附带排查要点**：
- 供应商必须定义在**用户级** `~/.codex/config.toml`；写在项目级 `.codex/config.toml` 会被忽略并警告。
- 用纯 `env_key` 时非 OpenAI 模型会显示 "Unknown model … fallback metadata" 警告 —— 改用命令式 `auth` 块可触发模型目录刷新（第三方单一来源，未完全核实）。
- 若报模型未找到，先确认 `model` 的 slug 是否与上游目录完全一致（含厂商前缀）。

---

## 5. 速查：哪些命令当前有效，哪些已废弃

### ✅ 当前（2026-09-18）有效

**Claude Code**
```bash
curl -fsSL https://claude.ai/install.sh | bash          # 推荐安装
brew install --cask claude-code                          # Homebrew stable
winget install Anthropic.ClaudeCode                      # Windows
npm install -g @anthropic-ai/claude-code                 # 仍可用（Node ≥22）
claude --version
claude doctor
claude update
export ANTHROPIC_BASE_URL=https://gateway.example.com
export ANTHROPIC_AUTH_TOKEN=sk-xxx                       # 不确定用哪个时优先它
```

**Codex CLI**
```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh      # 推荐安装
npm install -g @openai/codex                              # Node ≥16
brew install --cask codex
codex login                                               # ChatGPT OAuth（默认路径）
codex login --device-auth                                 # headless
printenv OPENAI_API_KEY | codex login --with-api-key       # 纯 API Key 模式
codex login status
codex logout
codex exec --json -o out.txt "..."                        # CI
codex --sandbox workspace-write --ask-for-approval on-request
codex --profile <name>                                    # 读 $CODEX_HOME/<name>.config.toml
```

**config.toml**
```toml
wire_api = "responses"                  # 唯一支持值（可省略）
approval_policy = "on-request"          # untrusted | on-request | never | { granular = {...} }
sandbox_mode = "workspace-write"        # read-only | workspace-write | danger-full-access
model_instructions_file = "..."         # 新名
openai_base_url = "..."                 # 覆盖内置 openai provider 的正确方式
```

**cc-switch**
```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
brew upgrade --cask cc-switch
```

### ❌ 已废弃 / 已失效 / 不可信

| 项目 | 状态 | 替代 |
|---|---|---|
| **Codex `wire_api = "chat"`** | **已删除（唯一支持值现为 `responses`）** | 换 Responses 上游，或用本地代理转换 |
| Codex `approval_policy = "on-failure"` | **已弃用** | `on-request`（交互）/ `never`（非交互） |
| Codex `--full-auto` flag | **已弃用的兼容 flag**，使用会打印警告 | `--sandbox workspace-write` |
| Codex `[profiles.<name>]` 表 + 顶层 `profile = "..."` | **0.134.0 起不再支持** | `$CODEX_HOME/<name>.config.toml` + `--profile` |
| Codex `experimental_instructions_file` | **已弃用** | `model_instructions_file` |
| Codex `[model_providers.openai]` 覆盖 base_url | **不允许**（内置 ID 保留） | 顶层 `openai_base_url` |
| Codex 项目级 `.codex/config.toml` 写 `model_provider(s)` | **被忽略 + 启动警告** | 移到用户级 `~/.codex/config.toml` |
| Claude Code `~/.codex/config.yaml`（mintlify 社区镜像所述） | **不适用** —— 该镜像此段内容已过时且与官方矛盾 | `~/.codex/config.toml` |
| `codex --provider azure` / `codex --provider <name>` | **未在官方当前 CLI 参考中出现**；仅社区镜像声称 | `[model_providers.<id>]` + `model_provider` |
| `CLAUDE_CODE_SKIP_ONBOARDING` | **未核实**（官方环境变量参考中无任何 "onboard" 匹配） | 设 `ANTHROPIC_AUTH_TOKEN` 使其在首次运行向导前可读 |
| `~/.claude.json` 的 `hasCompletedOnboarding` | **未核实**（同上） | 同上 |
| cc-switch 用户手册中的 Codex `config.toml` 示例（顶层 `base_url` / `model = "gpt-4"`） | **已过时** | 参照本文 2.4 的示例 |
| cc-switch installation 页"Claude Code 需 Node 18" | **已过时** | Claude Code npm 包现需 Node ≥22 |
| Claude Code `npm` 作为**推荐**安装方式 | **不再是推荐**（原生安装脚本才是 Recommended） | `curl -fsSL https://claude.ai/install.sh \| bash` |

---

## 6. 未核实项汇总

以下条目在本次核查中**未能找到官方权威来源**，标记「未核实」，不应作为操作依据：

1. **`CLAUDE_CODE_SKIP_ONBOARDING` 环境变量是否存在/仍生效** —— 官方 env-vars 页全文检索无匹配。
2. **`~/.claude.json` 中 `hasCompletedOnboarding` 字段是否存在/仍生效** —— 同上。
3. **Codex 移除 chat/completions 的确切月份（"2026 年 2 月"）** —— 仅 OpenRouter 博客单一第三方来源。移除这一**事实**已确认，**月份**未核实。
4. **`env_key` 导致 Codex 不拉取模型目录、命令式 `auth` 才触发刷新** —— 仅 OpenRouter 博客单一第三方来源。
5. **cc-switch Arch Linux AUR 包名** —— 官方两处文档给出 `cc-s` 与 `cc-switch-bin` 两个不同名称。
6. **cc-switch 当前支持的 CLI 数量** —— README 说 9 个工具，GitHub About 描述只列 6 个（无 Claude Desktop / Gemini CLI / MiniMax Code）。
7. **cc-switch `brew install --cask cc-switch` 是否必须先 tap** —— README 未提 tap，docs 站要求先 tap。
8. **Codex 官方文档 2026-07 至 2026-09 间的新增字段** —— 镜像抓取时间为 2026-06-27，存在约 2.5 个月的时效缺口。

---

## 7. 来源清单

**官方一手来源（本次成功直连）**
- Claude Code 安装：https://code.claude.com/docs/en/setup
- Claude Code 环境变量：https://code.claude.com/docs/en/env-vars
- Claude Code settings：https://code.claude.com/docs/en/settings
- Claude Code 网关连接：https://code.claude.com/docs/en/llm-gateway-connect
- Claude Code 网关总览：https://code.claude.com/docs/en/llm-gateway
- Claude Code npm registry：https://registry.npmjs.org/@anthropic-ai/claude-code/latest
- Codex 仓库 README：https://raw.githubusercontent.com/openai/codex/main/README.md
- Codex 仓库 config.md（现为指向官网的存根）：https://raw.githubusercontent.com/openai/codex/main/docs/config.md
- Codex npm registry：https://registry.npmjs.org/@openai/codex/latest
- OpenAI Responses 迁移工具包：https://raw.githubusercontent.com/openai/completions-responses-migration-pack/main/README.md
- OpenAI 官方讨论（弃用 chat/completions）：https://github.com/openai/codex/discussions/7782
- OpenAI 官方 issue（请求加回 Chat Completions）：https://github.com/openai/codex/issues/31083
- cc-switch README：https://raw.githubusercontent.com/farion1231/cc-switch/main/README.md
- cc-switch 配置文件手册：https://raw.githubusercontent.com/farion1231/cc-switch/main/docs/user-manual/en/5-faq/5.1-config-files.md
- cc-switch v3.20.3 release notes：https://github.com/farion1231/cc-switch/releases.atom
- GitHub API latest release：https://api.github.com/repos/farion1231/cc-switch/releases/latest

**官方文档镜像（developers.openai.com 直连返回 403，经镜像获取，镜像标注官方来源与 checksum）**
- 配置参考：https://raw.githubusercontent.com/crasuna/openai-dev-docs-cn-mirror/main/sources/en/codex/config-reference.md
- 高级配置：https://raw.githubusercontent.com/crasuna/openai-dev-docs-cn-mirror/main/sources/en/codex/config-advanced.md
- 认证：https://raw.githubusercontent.com/crasuna/openai-dev-docs-cn-mirror/main/sources/en/codex/auth.md
- 配置示例：https://raw.githubusercontent.com/crasuna/openai-dev-docs-cn-mirror/main/docs/mirror/codex/config-sample.md
- CLI 参考：https://raw.githubusercontent.com/crasuna/openai-dev-docs-cn-mirror/main/docs/mirror/codex/cli/reference.md

**第三方来源（仅用于交叉验证或在正文中明确标注）**
- OpenRouter 博客（Codex + OpenRouter 配置、chat/completions 移除时点）：https://openrouter.ai/blog/tutorials/codex-cli-openrouter/
- cc-switch 文档站镜像：https://mintlify.wiki/farion1231/cc-switch/installation
- Codex 社区文档镜像（**部分内容已过时，仅用于验证 login 命令**）：https://mintlify.wiki/openai/codex/authentication
- janhq/jan 记录 Codex chat wire API 弃用警告：https://github.com/janhq/jan/issues/7413
