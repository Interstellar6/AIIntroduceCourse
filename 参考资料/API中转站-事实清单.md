# API 中转站 / API 代理服务 —— 中文事实清单

> 调研核查日期：**2026-09-18**（下文每条括号内为来源 URL）
> 说明：本文只记录能查到出处的事实。凡是无法从一手来源（官方文档、官方声明、可核实的公开报道）确认的内容，均标注「**未核实**」，不做推测性填充。

---

## 一、「中转站」是什么、如何工作

### 1.1 定义与定位

- 「AI 中转站」是介于用户和 AI 模型厂商官方服务之间的**代理层**，把各家模型厂商的 API 统一整合到一个平台，再提供给用户，相当于用户和大模型之间的「中介」。（国家安全部提示，转载于中国警察网 2026-06-08：https://news.cpd.com.cn/n3569/626/t_1236449.html）
- 科技日报的定义与之一致，并引用中国移动云能力中心大模型高级技术专家季琰的分类，把「AI 中转站」按**合规资质、技术架构、运营模式**分为三类，风险逐级递增（来源同上主题，科技日报 2026-06-15：https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html）：
  1. **云厂商合规聚合型中转站**——官方正规 MaaS 服务，依托头部云厂商算力底座与合规资质，例如中国移动 MoMA、阿里云百炼、火山方舟；
  2. **正规 API 代理中转站**——企业主体批量采购官方 API 额度、合规分销，服务稳定性中等、合规风险较低；
  3. **灰黑产中转站**——搭建共享账号池拆分售卖，通过爬虫、逆向破解海外大模型网页端口等方式，无官方授权，账号极易封禁、并发受限、无售后保障。

### 1.2 统一 base_url + 多供应商转发机制

- 用户只接入中转站一个入口（统一的 `base_url` + 中转站签发的 Key），即可调用国内外多个主流大模型，无需来回切换。（国家安全部提示：https://news.cpd.com.cn/n3569/626/t_1236449.html）
- 技术上的转发链路（以 OpenAI 格式为例）：客户端把请求发到中转站的 OpenAI 兼容端点（`/v1/chat/completions`），中转站按渠道（channel）配置把请求**中继**到上游；上游若是 OpenAI 格式则直接透传，上游若不是 OpenAI 格式，则「**中继并修改请求体和返回体**」做格式改写。（One API 官方 README 的架构图与说明：https://github.com/songquanpeng/one-api）
- 实际配置形态举例（uni-api 官方 README）：上游按 `provider` 配置 `base_url`（如 `https://api.your.com/v1/chat/completions`）与 `api`（上游 Key），用户侧只需要一个 `api_keys` 里配置的 Key 和 `model` 列表；请求先打 `fixed_priority` 的第一个渠道，失败自动重试下一个渠道，并支持加权轮询、随机、按历史成功率排序等调度算法。（https://github.com/yym68686/uni-api）
- 中转站通常还提供：**负载均衡**（多上游渠道/多 Key 轮询）、**失败自动重试**、**渠道冷却**、**令牌（Token）额度与过期时间/IP 白名单/模型白名单**、**用户分组与渠道分组**、**兑换码充值**、**额度明细**。（One API README：https://github.com/songquanpeng/one-api）

### 1.3 计费方式与「倍率（rate multiplier）」概念

- **One API 官方的额度计算公式（一手来源，可直接引用）**：

  > 额度 = 分组倍率 × 模型倍率 × （提示 token 数 + 补全 token 数 × 补全倍率）
  >
  > 其中补全倍率对于 GPT3.5 固定为 1.33，GPT4 为 2，与官方保持一致。「注意，One API 的默认倍率就是官方倍率，是已经调整过的。」

  （One API 官方 README「常见问题」第 1 条：https://github.com/songquanpeng/one-api）
- One API 还支持**为用户分组和渠道分组分别设置不同的倍率**（README 功能第 9 条），这是「倍率」在中转站运营里最直接的落地方式。（同上）
- 第三方技术文章给出的「倍率 / 兑换比例」通俗解释（**属于社区文章，非官方一手来源，仅作概念说明用**）：

  > 实际单价 = 官方单价 × 倍率，兑换比例只决定充值额度怎么换算。
  > 举例，1:10 兑换即 1 元 = 10 额度；0.37 倍率意味着同样的 token 消耗，按官方价的 0.37 倍扣费。

  （腾讯云开发者社区 2026-08-29：https://cloud.tencent.com.cn/developer/article/2734082）
- **常见的充值比例形态（有公开报道的实例）**：某中转站宣传「充值 50 元可兑换 110 万 Token 额度，100 元兑换 250 万，200 元兑换 560 万，充值 500 元可兑换 1700 万，最高兑换比例可达 1:3.4」。（央广网 2026-07-28：https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml）
  - 注：这里的「额度」单位与「元」的换算规则各家不同，报道本身未说明额度单位是美元还是内部积分，**「1:3.4」这类比例的含义未核实**。
- 该腾讯云文章同时提醒两个常见计费套路（**社区观点，非官方结论**）：**Token 注水**（调高倍率多扣费）与**隐藏系统提示词**（后台附加不可见 System Prompt 消耗上下文额度）。同类的「五种坑」说法（模型降级、Token 注水、隐藏系统提示词、数据截留、供应链注入）见垦丁律师事务所文章 2026-05-29：https://kindinglaw.com/news/shownews.php?id=164

### 1.4 One API / New API / uni-api 的定位

| 项目 | 仓库 | 定位（依官方 README） | 许可证 | 是否开源免费 |
|---|---|---|---|---|
| **One API** | https://github.com/songquanpeng/one-api | 「通过标准的 OpenAI API 格式访问所有的大模型，开箱即用」的 LLM API 管理 & 分发系统，可用于 key 管理与二次分发；单可执行文件、Docker 一键部署 | MIT | 是，开源免费 |
| **New API** | https://github.com/QuantumNous/new-api （原 Calcium-Ion/new-api） | 「Next-Generation LLM Gateway and AI Asset Management System」，基于 One API 二次开发；支持把多种大模型**互相转换**为 OpenAI / Claude / Gemini 兼容格式 | AGPLv3（含第 7 条附加条款，需保留署名与项目链接；如组织政策不允许 AGPLv3 可联系 support@quantumnous.com） | 是，开源免费 |
| **uni-api** | https://github.com/yym68686/uni-api | 定位为**个人自用**：README 明确写「For personal use, one/new-api is too complex with many commercial features that individuals don't need」；用单一 API 接口统一调用多个后端服务并统一转成 OpenAI 格式，支持负载均衡 | Apache-2.0 | 是，开源免费 |

补充事实：

- One API 官方 README 明确提示合规边界：「本项目为开源项目，使用者必须在遵循 OpenAI 的使用条款以及**法律法规**的情况下使用，不得用于非法用途」；并援引《生成式人工智能服务管理暂行办法》：「**请勿对中国地区公众提供一切未经备案的生成式人工智能服务**」。同时 README 末尾声明「依据 MIT 协议，使用者需自行承担使用本项目的风险与责任，本开源项目开发者与此无关」。（https://github.com/songquanpeng/one-api）
- New API README 同样明确声明用途限定：「This project is intended solely for lawful and authorized AI API gateway, organization-level authentication, multi-model management, usage analytics, cost accounting, and private deployment scenarios.」并要求用户自行完成备案、许可、内容安全、实名、日志留存、税务与上游授权等义务。（https://github.com/QuantumNous/new-api）
- One API README 把「众多第三方代理服务」列为一个功能项（功能第 2 条，链接到 https://iamazing.cn/page/openai-api-third-party-services），即该项目本身**也被设计用于对接各类第三方代理/中转服务**——所以「开源项目本身」与「用它搭起来的中转站是否合规」是两件事，不能混为一谈。
- One API 的初始管理员账号密码默认是 `root` / `123456`，README 有醒目警告要求务必修改；这本身就说明**自建中转站的默认部署态存在明显安全风险**。（https://github.com/songquanpeng/one-api）
- uni-api README 致谢了一位报告安全问题的用户（@ryougishiki214），问题在 v1.5.1 修复。（https://github.com/yym68686/uni-api）

### 1.5 为什么中转站能同时提供 OpenAI 格式（/v1/chat/completions）和 Anthropic 格式（/v1/messages）

- **技术上靠「协议转换层」。** New API README 把「Format Conversion（格式转换）」列为核心能力，明确写出：
  - `OpenAI Compatible ⇄ Claude Messages`
  - `OpenAI Compatible → Google Gemini`
  - `Google Gemini → OpenAI Compatible`
  - `OpenAI Compatible ⇄ OpenAI Responses`（开发中）

  （https://github.com/QuantumNous/new-api）
- New API 同时暴露两套端点：`/v1/chat/completions`（OpenAI 格式）与 Claude `Messages` 格式端点（官方文档：https://docs.newapi.pro/en/docs/api/ai-model/chat/create-message）。
- uni-api README 明确列出同时支持的接口集合：`/v1/chat/completions`、`/v1/responses`、`/v1/images/generations`、`/v1/embeddings`、`/v1/audio/transcriptions`、`/v1/audio/speech`、`/v1/moderations`、`/v1/models`，并在内部支持 `engine: gpt | claude | gemini | openrouter` 强制指定消息格式；README 的 FAQ 也提到 `/v1/messages` 会沿用同一套路由图。（https://github.com/yym68686/uni-api）
- **一句话总结（可作为讲课结论）**：端点格式是「外壳」，上游是什么模型是「内核」；中转站在中间做请求体/返回体的**双向改写**，所以才能对外同时伪装成 OpenAI 和 Anthropic 两套协议。（依据同上的 New API / One API / uni-api 官方 README）
- **讲课注意**：能说 OpenAI 格式 ≠ 能完整支持 Anthropic 格式的所有特性。Anthropic Messages 协议涉及 extended thinking、`cache_control` 提示缓存、`tool_use` / `server_tool_use`、context management 等大量字段；格式转换层对未支持字段的处理通常是**丢弃或降级**（One API README 在「模型映射」条目下就提示：设置之后请求体会被重新构造而非直接透传，「会导致部分还未正式支持的字段无法传递成功」）。因此 Claude Code 这类强依赖 Anthropic 原生字段的工具，在中转站上「能连上」不等于「功能完整」。（https://github.com/songquanpeng/one-api）

---

## 二、常见风险（均有公开出处）

### 2.1 跑路 / 卷款跑路

- **官方口径**：科技日报引述专家指出，灰黑产中转站的盈利套路包括「低价蓄水吸纳用户充值后**直接关站跑路、收割用户资金**」。（科技日报 2026-06-15：https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html）
- **公开社区案例 1**：V2EX 帖子《中转站疑似跑路》（2026-05-14）。发帖人称某中转站 5 月 8 日注册，赠送的 20 美元还没用完就突然打不开，之后提示账号不存在；发帖人强调「还好只是白嫖没有花钱」。跟帖中有人表示「最近注册了几个中转站，基本都没了，什么额度回收了」，也有人评论「中转站和机场类似，都有跑路风险」「所有中转都是靠各种方法白嫖的，一旦白嫖路子少了，自然就要跑路」。（https://global.v2ex.co/t/1212741）
  - 注意：该帖**未点名具体站点**，属于个人陈述，无法独立核实。
- **公开社区案例 2**：V2EX 帖子《之前买的 88code 中转站现在退款困难，怎么维权？》（2026-02-02）。发帖人称去年国庆花 298 元买半年会员、双 12 又囤了套餐，后因「A 社加大封号力度」导致对方成本覆盖不了，服务一直停摆；申请退款后客服先说一周退，后来「据说客服工资都发不出来了」。跟帖建议报警，也有人认为金额太小警方不会管。（https://global.v2ex.co/t/1190270）
  - 注意：单方陈述，**未核实**该站点的实际情况与最终结果。
- **央广网报道**：2026 年 5 月已有部分中转站「停摆」；报道称一些从业者转向合规平台或停业。（央广网 2026-07-28：https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml）

### 2.2 API Key 泄露、日志留存（中转站能看到你的全部对话内容）

- **这是从架构上就无法避免的**：垦丁律所文章指出，中转网关在「鉴权·计费·路由」层能够完整读取用户的请求明文，并在返回路径中完整读取模型的输出——**无论平台如何宣称「不记录日志」，技术上对全部输入输出都拥有完全的数据可见性**；同时能识别用户请求模式（高频生成、批量下载、敏感内容生成），具备高度行为可追溯性。（垦丁律师事务所 2026-05-29：https://kindinglaw.com/news/shownews.php?id=164）
- 国家安全部提示：「AI 中转站作为第三方端口，会**将用户提交的数据留存至服务器**。部分『AI 中转站』缺乏正规数据加密与管控机制，有的甚至私自截留用户数据，**倒卖给其他大模型厂商用于系统训练**，造成用户隐私泄露。」（中国警察网转载国家安全部提示 2026-06-08：https://news.cpd.com.cn/n3569/626/t_1236449.html）
- 国家安全部同时提示另两类技术风险：「**恶意植入，远程控制**」——部分中转站暗藏后门，可能向用户设备植入恶意代码，窃取账号密钥、云端凭证，甚至植入远程控制程序。（同上）
- **真实法律后果的一手描述（律师文章）**：一位中转站站长「默认全量记录用户的请求日志，包括对话内容、代码片段和账号信息」，后有「数据公司」按条收购日志用于模型训练，他陆续**出售了几十万条日志，违法所得只有几万元**，但日志中包含姓名、电话、住址、身份证号等可识别信息。（上海曼昆律师事务所 2026-09-07：https://www.mankunlaw.com/insights/ai-api-relay-data-export-criminal-risk/）
  - 注：该文声明「案例改编自公开裁判文书及公开报道，人物均为化名，部分细节已作文学化处理」，**具体个案细节未核实**；但其援引的法条与司法解释是准确的。
- **可作为讲课锚点的法条**：出售或提供公民个人信息，依据法释〔2017〕10 号，一般公民个人信息**5000 条以上**或**违法所得 5000 元以上**可能达到刑事入罪标准；行踪轨迹、通信内容、征信信息、财产信息等特定类型**500 条以上**也可能达到入罪标准。对话日志通常动辄数万条，触线并不困难。（同上）
- **对比参照（正面样本）**：OpenRouter 官方 FAQ 说明——「We log basic request metadata (timestamps, model used, token counts). Prompt and completion are **not logged by default**. We do **zero logging** of your prompts/completions, even if an error occurs, unless you opt-in to logging them.」平台另有一个「opt-in 记录 prompt 与 completion 换取 1% 费用折扣」的可选设置。（https://openrouter.ai/docs/faq）
  - 讲课提醒：这是**正规平台的公开承诺**，但仍应告诉学生「承诺 ≠ 可验证」，敏感内容先脱敏仍是第一原则（这也正是国家安全部的建议）。

### 2.3 封号、账号被封、余额无法提现

- 中宣口径：「灰黑产中转站……账号极易封禁、并发受限、无售后保障，存在侵权违规、数据窃取、服务骤停等多重隐患，不适合商业项目、涉密业务落地使用。」（科技日报 2026-06-15：https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html）
- 国家安全部建议的处置动作：「使用中如遇到**异常扣费、无故封号、数据异常**等问题，应立即停止使用、修改密钥、查杀病毒、留存证据，避免风险持续扩大。」（中国警察网 2026-06-08：https://news.cpd.com.cn/n3569/626/t_1236449.html）
- 上游封杀导致的连锁反应：V2EX 88code 案例中，发帖人把服务停摆归因于「A 社加大封号力度」导致中转站成本覆盖不了。（https://global.v2ex.co/t/1190270）
- 关于**余额能否提现**：本次调研**未找到任何中转站官方公开的、可核实的「余额可提现」条款**；相反，公开报道与社区讨论反映的是「充值后无法退款」的情形（见 2.1 的 88code 案例）。
  - **正面参照**：OpenRouter 官方 FAQ 有明确的退款政策——未使用 Credits 可在交易处理完成后 **24 小时内**申请退款，超过 24 小时未申请则不可退；**平台手续费不退**；**加密货币支付一律不可退**。此外按条款 OpenRouter 保留在购买一年后使未使用 credits 过期的权利。（https://openrouter.ai/docs/faq）
  - 也就是说：**「有明确书面退款条款」本身就是正规平台与灰产中转站的区分标志之一。**

### 2.4 合规与法律风险

#### （1）监管层面的官方表态

- **国家安全部专项风险提示**（2026-06-08，国家安全部微信公众号发布），列出的四类风险：
  1. **数据裸奔，隐私泄露**——数据留存服务器，可能被截留、倒卖用于训练；
  2. **模型缩水，结果失真**——用低配模型冒充高端模型，缩减算力、关闭校验，输出偏差大；
  3. **恶意植入，远程控制**——暗藏后门，窃取密钥、植入远控；
  4. **数据出境，失管失控**——未取得数据出境合规资质、未履行安全评估法定流程，擅自把用户输入数据传输至境外服务器，「可能造成个人隐私、商业机密乃至**国家秘密**外泄」。

  （https://news.cpd.com.cn/n3569/626/t_1236449.html）
- 国家安全部给出的使用建议：**选用正规平台**（官方直连、正规授权、安全合规，不用「三无」平台）；**加强安全防范**（敏感数据提前脱敏、做好密钥管理、定期更换凭证、关闭协同操作与数据共享等非必要功能）；**及时处置异常**；**举报可疑线索**（12339）。（同上）
- 同一时期，国家安全部还提示「用户选择官方直连、正规授权、安全合规平台……不使用无明确来源、无运营资质、无安全保障的『三无』平台」。（转述见央广网 2026-07-28：https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml）
- **专项行动**：2026 年 4 月，中央网信办部署「清朗·整治 AI 应用乱象」专项行动，重点包括「未按规定进行大模型备案登记、AI 数据安全、内容滥用」等问题。（转述见央广网 2026-07-28：同上）
- **第二阶段进展（一手来源）**：中央网信办 2026-09-02 通报，「清朗·整治 AI 应用乱象」专项行动第二阶段，截至目前「累计清理违法违规信息 **561 万余条**，查处账号 **4.9 万余个**，处置违规网站、应用程序等 **2400 余个**」。（新华网转中国网信网 2026-09-02：https://www.news.cn/politics/20260902/564dc9a913c94b22996f783a02abcaf2/c.html）
  - 注意：该通报的典型案例聚焦 AI 生成虚假信息、AI 假冒仿冒、侵害未成年人权益等，**未点名「API 中转站」**；把两者直接划等号是不准确的（见第四节讲课提醒）。

#### （2）法律定性（律师文章，属专业解读而非判决）

垦丁律所文章（2026-05-29，https://kindinglaw.com/news/shownews.php?id=164）梳理的刑事与行政路径：

- **非法经营罪**（《刑法》第 225 条）：核心入罪路径是未持 ICP 证擅自经营**跨境增值电信服务**。文章援引《最高人民检察院、公安部关于公安机关管辖的刑事案件立案追诉标准的规定（二）》第七十九条，个人非法经营数额 **5 万元以上**或违法所得 **1 万元以上**即应予立案追诉。
- **侵犯公民个人信息罪**（《刑法》第 253 条之一）：私自存储、转售用户 Prompt、合同文本、代码等含个人信息内容。
- **提供侵入、非法控制计算机信息系统程序、工具罪**（《刑法》第 285 条第三款）：若接口工具用于绕过官方 API 安全认证。
- **帮助信息网络犯罪活动罪**（《刑法》第 287 条之二）：中转接口被用于诈骗话术、伪造证件等非法活动，且「明知或应知」。
- **行政处罚**：文章称依《电信条例》第 70 条，未持 ICP 证擅自经营增值电信服务可没收违法所得并处 3–5 倍罚款，无违法所得则处 10 万至 100 万元罚款，情节严重可责令停业；数据合规方面可依《数据安全法》《个人信息保护法》处 5 万至 50 万元罚款，情节严重可达 100 万至 1000 万元。
  - **注意**：以上具体罚则数额来自律所文章，本次调研**未逐条比对法条原文**，建议讲课前自行核对现行法条，或直接说「可被行政处罚」而不背具体数字。
- 该文有一段值得直接引用的结论：「**调用 OpenAI、Claude 等未在中国境内备案的境外模型，向境内公众提供服务，无法通过任何形式的备案或登记，属于违法经营**——这是目前监管口径下的明确结论，不存在灰色地带。」
  - **注意**：这是**律所的观点表达**，不是监管机关的原文。讲课时应表述为「律师界的普遍解读」，不要直接说成「监管明文规定」。
- 文章还提到「2025 年 7 月生效的《生成式人工智能服务管理暂行办法》第 17 条明确禁止调用未备案的境外模型」——**此条我未核实**（该办法实际公布于 2023 年 7 月、2023 年 8 月 15 日施行，文中「2025 年 7 月生效」的说法可疑），讲课时**不要沿用**。

曼昆律所文章（2026-09-07，https://www.mankunlaw.com/insights/ai-api-relay-data-export-criminal-risk/）补充的三层数据出境红线：

- 第一层：数据出境不是「技术转发」而是法律行为。如果数据从经营者控制的服务器传输至境外，经营者就可能被认定为**数据处理者**并承担责任；「我只是管道」的解释**不能当然排除法律责任**。
- 第二层：「规模较小即可豁免」是危险误区。数量标准只决定是否需要履行安全评估/标准合同备案等**特定程序**，并不意味着可以不履行《个人信息保护法》第 55 条的影响评估义务、第 59 条受托处理义务等。
- 第三层：刑事责任可能从**出境数据含个人信息并被出售**（第 253 条之一）、**拒不整改且造成严重后果**（第 286 条之一拒不履行信息网络安全管理义务罪）、**为其他违法犯罪链条提供数据或技术支持**三个环节引爆。
- 该文还点出一个容易被忽略的连带责任：**收购用户对话日志的 AI 公司、数据标注公司**若明知来源违法仍收购使用，可能被认定为侵犯公民个人信息犯罪链条中的非法获取方，甚至共同犯罪。

#### （3）上游条款与跨境风险

- 垦丁律所文章提到：OpenAI、Anthropic 等主流服务商的使用条款均明确禁止「逆向工程、反编译」「修改、复制、出租、出售或分发服务」，并禁止「共享 API 密钥」及「通过自动化脚本访问服务」；美国 CFAA（18 U.S.C. § 1030）、FTC 欺诈性商业行为、欧盟 GDPR/DSA/NIS2、日本《不正竞争防止法》《个人信息保护法》《电气通信事业法》均可能触及。
  - **注意**：这些域外法分析出自律所文章，**具体条号与金额未逐条核实**，讲课只宜作为「方向性提示」。
- **账号池模式的现实压力（有报道佐证）**：央广网报道称，某个「1 元兑换数百万 Token」的中转站站长因「反向代理 + 账号池」模式被上海警方以涉嫌非法经营罪刑事拘留，后变更为取保候审；报道还引述业内人士称，Claude 账号出现「一号难求、一号一卖」的情况，账号随时面临封禁。垦丁律所文章给出的时间点是 2026 年 5 月、刑拘 37 天后取保候审、截至 2026-05-15 仍在补充侦查阶段。（央广网 2026-07-28：https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml ；垦丁律所 2026-05-29：https://kindinglaw.com/news/shownews.php?id=164）
  - **重要限定**：垦丁律所文章自己写明——「在现有的公开检索结果中……**尚未发现与『AI 中转站』业务模式完全一致且已作出终审判决的公开案例**，这使得本案的未来走向更具指标性意义。」讲课时不要把它说成「已有生效判决」。

### 2.5 是否存在真实公开案例

**有的，但性质要区分清楚：**

| 类型 | 实例 | 来源 | 可核实程度 |
|---|---|---|---|
| 官方风险提示（不是案例，但是权威定性） | 国家安全部「AI 中转站」专项风险提示，2026-06-08 | https://news.cpd.com.cn/n3569/626/t_1236449.html | 高（官方发布） |
| 官方媒体报道（含从业者访谈、模式描述） | 科技日报《如何甄别靠谱的「AI 中转站」》2026-06-15 | https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html | 高 |
| 官方媒体报道（含具体低价/返利数字、站长被刑拘描述） | 央广网《「Token 中转站」：AI 风口下的风险生意》2026-07-28 | https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml | 高（报道本身可信；其中的个案细节为转述） |
| 律所案例分析（刑事案件，未终审） | 垦丁律所：上海首起 AI 中转站非法经营案，2026-05 刑拘后取保候审 | https://kindinglaw.com/news/shownews.php?id=164 | 中（律所单方披露，明确说明尚无终审判决） |
| 律所案例分析（数据出境刑拘，文学化改编） | 曼昆律所《AI 中转站数据出境违规：刑拘背后的数据安全法红线》2026-09-07 | https://www.mankunlaw.com/insights/ai-api-relay-data-export-criminal-risk/ | 中（文章自述为改编） |
| 用户社区跑路贴 | V2EX《中转站疑似跑路》2026-05-14；《88code 中转站退款困难》2026-02-02 | https://global.v2ex.co/t/1212741 ；https://global.v2ex.co/t/1190270 | 低（个人单方陈述，未点名或无法独立核实） |
| 监管专项整治通报（**未点名中转站**） | 中央网信办「清朗·整治 AI 应用乱象」第二阶段，2026-09-02 | https://www.news.cn/politics/20260902/564dc9a913c94b22996f783a02abcaf2/c.html | 高（官方通报） |

- **结论**：关于「跑路」有**可信的官方媒体描述**（科技日报、央广网）与**用户社区实例**，但本次调研**没有找到任何一起有名有姓、有生效裁判文书可查的中转站跑路案**。讲课时应当区分「监管与媒体确认这是普遍存在的风险模式」和「某一个具体站点被判了」——后者**未核实**。

### 2.6 给学生讲课时应如何提示风险（可直接用作讲课要点）

1. **架构即风险，不是「这家不老实」**：中转站位于你和模型之间，在技术上必然能完整读取你的输入与输出。「不记录日志」是承诺，不是架构保证。（依据：垦丁律所技术链路分析 https://kindinglaw.com/news/shownews.php?id=164 ；国家安全部提示 https://news.cpd.com.cn/n3569/626/t_1236449.html）
2. **绝不发送敏感内容**：把「脱敏」设为硬规则——姓名、身份证、电话、住址、病历、合同、公司内部文件、源代码、`.env`、数据库结构、密钥都不得直接粘贴。这也是国家安全部的官方建议。（https://news.cpd.com.cn/n3569/626/t_1236449.html）
3. **小额试、不囤货**：社区里吃亏的几乎都是「囤了套餐」。腾讯云社区文章给出的工程化建议是「先测后充，小额起步；确认模型真、速度稳、计费清楚，再逐步放量」。（https://cloud.tencent.com.cn/developer/article/2734082 ；88code 案例 https://global.v2ex.co/t/1190270）
4. **默认假定充值款极可能追不回**：正规平台像 OpenRouter 才有写明「24 小时内可申请退未使用额度、手续费不退、加密支付不退」的条款（https://openrouter.ai/docs/faq）；多数小站没有任何书面退款条款。
5. **算清真实单价再谈便宜**：把「兑换比例 × 倍率」自己算一遍，不要只看「1:10」「0.37 倍」这类营销话术。（https://cloud.tencent.com.cn/developer/article/2734082）
6. **不要用在中转站上跑生产/涉密/校企合作项目**：科技日报引述的建议是「整体商用场景**严禁**选用灰产中转站，从源头规避法律与业务风险」。（https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html）
7. **区分「技术中立」与「用途合规」**：One API / New API / uni-api 都是合法开源软件，用来做**企业内部网关、多模型管理、用量核算**完全正当；但**向境内公众转售未经备案的境外模型服务**是另一回事。New API README 自己就把「当作为公共生成式 AI 服务或 API 转售服务运营时，用户应先完成备案、许可、内容安全、实名、日志留存、税务、支付与上游授权义务」写成 WARNING。（https://github.com/QuantumNous/new-api ；https://github.com/songquanpeng/one-api）
8. **遇到异常的标准动作**：立刻停用 → 改密钥 → 查杀病毒 → 留存证据（国家安全部给出的处置顺序）。（https://news.cpd.com.cn/n3569/626/t_1236449.html）
9. **投诉与举报渠道**：涉危害国家安全的可疑线索可通过 12339 电话、www.12339.gov.cn、国家安全部微信公众号或当地国家安全机关举报。（同上）

---

## 三、主流正规选择（截至 2026-09-18）

> 本节所有 `base_url` 均取自各厂商**官方文档**，并标注文档更新/核查情况。

### 3.1 OpenRouter

| 项目 | 内容 | 来源 |
|---|---|---|
| OpenAI 兼容 base_url | `https://openrouter.ai/api/v1` | https://openrouter.ai/docs/quickstart.md |
| Anthropic 兼容端点 | **支持**。OpenAPI 规范中确有 `POST /messages`（Anthropic Messages 格式，tag 为 `Anthropic Messages`，summary「Create a message」，描述「Creates a message using the Anthropic Messages API format. Supports text, images, PDFs, tools, and extended thinking.」），server 为 `https://openrouter.ai/api/v1`。即 Anthropic 兼容 base_url 为 `https://openrouter.ai/api/v1`，对话端点为 `https://openrouter.ai/api/v1/messages`。 | https://openrouter.ai/docs/api/api-reference/anthropic-messages/create-a-message.md |
| 计费与手续费 | 官方 FAQ：购买 Credits 时收 **5.5%（最低 $0.80）**（Stripe）；加密货币支付收 **5%**（Coinbase）。**推理价格不做加价**（"we do charge a fee when purchasing credits"、"no markup on inference pricing"）。 | https://openrouter.ai/docs/faq |
| BYOK（自带上游 Key） | 有按「list-price inference cost」计的免费额度：Pay-as-you-go 每月 **$25,000** 免 BYOK 费，Enterprise 每月 **$200,000**；超出部分收 **5%** 费用。 | 同上 |
| 免费额度 | 新用户有少量免费额度；免费模型在**未充值**时限 **50 次/天**，已购买 **≥10 credits** 时 **1000 次/天**。（FAQ 中这些阈值以模板变量形式出现在文档源码里：`FREE_MODEL_NO_CREDITS_RPD = 50`、`FREE_MODEL_HAS_CREDITS_RPD = 1000`、`FREE_MODEL_CREDITS_THRESHOLD = 10`） | 同上 |
| 数据日志 | 默认**不记录** prompt/completion；可 opt-in 换取 1% 折扣。 | 同上 |
| 退款 | 交易后 **24 小时内**可申请退未使用 Credits；平台手续费不退；加密货币支付一律不退；条款保留购买一年后使未使用 credits 过期的权利。 | 同上 |
| 是否官方 | OpenRouter 是**独立的第三方聚合平台**，不是任何模型厂商的官方服务；但它自己就是一个合规经营的聚合层（"OpenRouter is a proxy that sends your requests to the model provider"）。它**不是**「官方 API」，讲课时不要称它「官方」。 | 同上 |

- 补充：OpenRouter 官方 FAQ 说明其会做模型 fallback、provider 路由、支持 text/images/PDF，且「OpenRouter is a drop-in replacement for OpenAI」。（https://openrouter.ai/docs/faq）

### 3.2 硅基流动 SiliconFlow

| 项目 | 内容 | 来源 |
|---|---|---|
| OpenAI 兼容 base_url | 官方 OpenAPI 规范中 servers 为 `https://api.siliconflow.com/v1` | https://docs.siliconflow.com/cn/api-reference/chat-completions/chat-completions.md |
| Anthropic 兼容端点 | **支持**。官方 API 手册有「创建对话请求（Anthropic）」页面，cURL 示例为 `POST https://api.siliconflow.com/v1/messages` | https://docs.siliconflow.com/cn/api-reference/chat-completions/messages |
| Claude Code 接入 | **官方文档明确有**：「在 Claude Code 中使用」专页，手动配置示例为 `export ANTHROPIC_BASE_URL="https://api.siliconflow.com/"`、`ANTHROPIC_MODEL`、`ANTHROPIC_API_KEY` | https://docs.siliconflow.com/cn/usercases/use-siliconcloud-in-ClaudeCode |
| 中国站域名 | **部分未核实**。官方文档中展示的是 `.com` 域名；社区与中国站控制台普遍使用 `https://api.siliconflow.cn/v1`，但本次调研**未在官方文档中找到 `.cn` 作为 API base_url 的明确写法**。讲课时建议以控制台实际给出的地址为准。 | — |
| 免费额度 | **未核实**。本次调研**未找到硅基流动官方文档中关于新用户赠送额度的明确说明**（第三方页面声称有赠送，但未经官方来源确认，故不引用具体数字）。 | — |

### 3.3 火山引擎方舟 Volcengine Ark

| 项目 | 内容 | 来源 |
|---|---|---|
| 标准 API base_url | `https://ark.cn-beijing.volces.com/api/v3`（OpenAI 兼容）。间接佐证：uni-api 官方 README 中豆包渠道配置为 `base_url: https://ark.cn-beijing.volces.com/api/v3/responses` | https://github.com/yym68686/uni-api |
| Coding Plan 的 Anthropic 兼容端点 | **有**：`https://ark.cn-beijing.volces.com/api/coding`（兼容 Anthropic 接口协议工具）；OpenAI 协议为 `https://ark.cn-beijing.volces.com/api/coding/v3` | 火山引擎官方文章 2026-04-09：https://www.volcengine.com/article/38136 |
| Claude Code 接入 | **官方文档明确有**：火山方舟文档中心存在「Coding Plan 个人版 → 接入 AI 工具 → Claude Code」专页（最近更新 2026.09.08），以及 Agent Plan 个人版的同类页面 | https://docs.volcengine.com/docs/ark/coding-plan-personal-ai-claude-code |
| 关键注意 | 官方文章警告：**请勿使用普通 API 的 Base URL**，否则「将无法消耗 Coding Plan 套餐额度，还会产生额外费用」；且 Coding Plan 额度**仅在 AI 编程工具中生效**，「若在非 AI 编程工具中使用可能被识别为违规，导致订阅停用或账号封禁」 | https://www.volcengine.com/article/38136 |
| 标准 API 的 Anthropic 兼容端点 | **未核实**。本次调研确认了 Coding Plan 走 `/api/coding` 提供 Anthropic 协议，但**标准按量计费 API（/api/v3）是否提供 Anthropic 兼容端点，未核实**。方舟文档中心存在「创建 Message」页面（https://ark.volcengine.com/region:cn-beijing/docs/82379/2655179），但其正文为 JS 渲染，本次未取到内容。 | — |
| 免费额度/赠送 | **未核实**。文档树中有「活动及公告」分类，但具体赠送额度本次未取到可靠一手说明。 | — |

### 3.4 阿里云百炼 DashScope / Model Studio

| 项目 | 内容 | 来源 |
|---|---|---|
| OpenAI 兼容 base_url | `https://dashscope.aliyuncs.com/compatible-mode/v1`（北京）等；**本次调研未直接取到该页原文**，仅从 Claude Code 页面确认了 Anthropic 侧地址。**标注为未完全核实**。 | — |
| Anthropic 兼容端点 | **有，且官方文档写得非常具体**。按量计费：`https://dashscope.aliyuncs.com/apps/anthropic`；Coding Plan：`https://coding.dashscope.aliyuncs.com/apps/anthropic`（国际站为 `https://coding-intl.dashscope.aliyuncs.com/apps/anthropic`）；Token Plan 团队版：`https://token-plan.cn-beijing.maas.aliyuncs.com/apps/anthropic`；Token Plan 个人版：`https://token-plan.ap-southeast-1.maas.aliyuncs.com/apps/anthropic`；按地域可用 `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/apps/anthropic`（北京）/ `ap-southeast-1`（新加坡）/ `us-east-1`（弗吉尼亚） | https://www.alibabacloud.com/help/zh/model-studio/claude-code （更新于 Sep 16, 2026） |
| Claude Code 接入 | **官方文档明确有**：整页《大模型服务平台百炼：Claude Code》，包含安装、`~/.claude/settings.json` 配置、`hasCompletedOnboarding` 跳过登录、模型映射、CC Switch、IDE 插件、错误码排查 | 同上 |
| 官方文档中的重要事实（可直接引用） | ①百炼的 Anthropic 兼容端点（以 `/apps/anthropic` 结尾）**仅提供对话端点 `/v1/messages`，不提供模型列表端点**（`/v1/models` 返回 404）——这解释了为什么 CC Switch 探测模型列表会报「未找到可用的模型列表端点」且「该提示不影响 Claude Code 正常使用」。②**API Key 类型必须与 base_url 配套**，否则返回 401 `invalid_api_key`。③配置写到 `~/.claude/settings.json` 后需**新开终端窗口**才生效。④`ANTHROPIC_BASE_URL` 以 `/apps/anthropic` 结尾时**不要额外添加 `/v1`**。⑤可用 `CLAUDE_CODE_MAX_CONTEXT_TOKENS` 或模型名加 `[1m]` 后缀扩展到 1M 上下文。 | 同上 |
| 免费额度 | **新加坡地域专属**：每个模型通常 **100 万 Token**（输入+输出共用），有效期 **90 天**，从「开通百炼 / 模型发布 / 模型申请通过」三者中较晚者起算；**其他地域无免费额度**；不同模型（含同一模型的不同快照版本）额度独立、不互通；可开启「免费额度用完即停」（额度耗尽返回 HTTP 403，错误码 `AllocationQuota.FreeTierOnly`）；另有 OAuth 认证的独立免费额度，**每天 2000 次调用**。文档更新于 Sep 11, 2026。 | https://www.alibabacloud.com/help/zh/model-studio/new-free-quota |

### 3.5 智谱 BigModel（GLM）

| 项目 | 内容 | 来源 |
|---|---|---|
| Anthropic 兼容 base_url | `https://open.bigmodel.cn/api/anthropic`（官方「Claude API 兼容」文档明确写：「替换您访问的 **base_url** 为 `https://open.bigmodel.cn/api/anthropic`」） | https://docs.bigmodel.cn/cn/guide/develop/claude/introduction |
| OpenAI 兼容 base_url | 平台通用 OpenAI 兼容端点见官方「OpenAI API 兼容」文档；GLM Coding Plan 的 OpenAI Chat Completion 协议 base_url 为 `https://open.bigmodel.cn/api/coding/paas/v4`，OpenAI Response 协议为 `https://open.bigmodel.cn/api/v1` | https://docs.bigmodel.cn/cn/coding-plan/quick-start |
| Claude Code 接入 | **官方文档明确有**：Claude API 兼容文档说明「现有 Claude 应用如 **Claude Code** 等可以快速迁移到智谱平台」；Coding Plan 快速开始页把 Claude Code 列为官方支持工具之一 | 同上两处 |
| Coding Plan 限制 | 「GLM Coding Plan **仅限在官方支持的指定工具与产品环境**中使用」（官方原话） | https://docs.bigmodel.cn/cn/coding-plan/quick-start |
| 免费额度 | **部分未核实**。官方快速开始页提到「个人版套餐（**或领取体验卡**）的用户」，说明存在体验类免费额度，但**具体额度与时长未核实**。 | 同上 |

### 3.6 月之暗面 Kimi（Moonshot）

| 项目 | 内容 | 来源 |
|---|---|---|
| 服务地址 | `https://api.moonshot.cn`（中国站）；国际站为 `https://api.moonshot.ai` | https://platform.kimi.com/docs/api/overview.md ；https://platform.kimi.ai/docs/api/overview |
| OpenAI Chat Completions | `https://api.moonshot.cn/v1` → `/chat/completions` | https://platform.kimi.com/docs/api/overview.md |
| OpenAI Responses | `https://api.moonshot.cn/v1` → `/responses` | 同上 |
| **Anthropic Messages** | `https://api.moonshot.cn/anthropic` → `/messages`（官方表格明确：可用 SDK/工具为「**Anthropic 官方 SDK、Claude Code 等工具**」）；端点一览中写作 `/anthropic/v1/messages` | 同上 |
| Claude Code 接入 | **官方文档明确列出** Claude Code 支持 | 同上 |
| 免费额度 | **未核实**。本次调研未取到官方关于新用户赠送额度的明确说明。 | — |

### 3.7 MiniMax

| 项目 | 内容 | 来源 |
|---|---|---|
| Anthropic 兼容端点 | `https://api.minimax.cn/anthropic/v1/messages`（官方 Messages API 文档的 cURL 示例） | https://platform.minimax.cn/docs/api-reference/text-chat-anthropic |
| Claude Code 接入 | **官方文档明确有**：MiniMax 开放平台文档中心有「在 AI 编程工具里使用 M3 → Claude Code」专页，含一键配置向导 `npx -y mmx-cli@latest agent setup`、手动编辑 `~/.claude/settings.json`、cc-switch 三种方式 | https://platform.minimaxi.com/docs/token-plan/claude-code |
| 官方文档里的一个实用细节 | 配置前需清除 `ANTHROPIC_AUTH_TOKEN`、`ANTHROPIC_BASE_URL` 环境变量（若在 `~/.bashrc`/`~/.zshrc` 中永久导出需同步删除），否则会干扰 MiniMax API 使用——讲课时可作为「环境变量优先级」的案例 | 同上 |
| 其他 base_url | MiniMax 的 OpenAI 兼容端点与 Token Plan 定价细节**本次未取到完整原文，未核实**。 | — |
| 免费额度 | **未核实**。 | — |

### 3.8 哪些厂商官方文档明确写了「Claude Code 接入」或 Anthropic 兼容端点

**明确写了（本清单中已逐条核实到官方文档页面）：**

1. **Anthropic 兼容端点 + Claude Code 接入页**：阿里云百炼（https://www.alibabacloud.com/help/zh/model-studio/claude-code）、智谱 BigModel（https://docs.bigmodel.cn/cn/guide/develop/claude/introduction 与 https://docs.bigmodel.cn/cn/coding-plan/quick-start）、Kimi（https://platform.kimi.com/docs/api/overview.md）、MiniMax（https://platform.minimaxi.com/docs/token-plan/claude-code）、硅基流动（https://docs.siliconflow.com/cn/usercases/use-siliconcloud-in-ClaudeCode）、火山方舟 Coding Plan（https://docs.volcengine.com/docs/ark/coding-plan-personal-ai-claude-code 与 https://www.volcengine.com/article/38136）
2. **Anthropic Messages 端点（官方 OpenAPI 规范）**：OpenRouter（https://openrouter.ai/docs/api/api-reference/anthropic-messages/create-a-message.md）

**未核实 / 未找到明确官方说明：**

- 火山方舟**标准按量 API**（非 Coding Plan）的 Anthropic 兼容端点
- 硅基流动中国站 `.cn` 域名的官方 base_url 写法
- 阿里云百炼 OpenAI 兼容 base_url 的官方原文（本次仅间接确认）
- 各家的免费额度：硅基流动、Kimi、MiniMax、火山方舟

---

## 四、给学生讲课时容易讲错 / 需要提醒的点

> 这一节专门列「容易翻车」的地方。前文已出现的依据不再重复标注链接。

**1. 不要把「中转站」和「开源网关软件」混为一谈。**
One API / New API / uni-api 是合法的开源软件，企业内部做多模型网关、用量核算、Key 管理完全正当。风险在于**用它向境内公众转售未经备案的境外模型服务**。New API 的 README 自己就把这层义务写成了 WARNING。「软件开源」不等于「拿它做生意就合法」。

**2. 「倍率」不是「折扣」，讲的时候要算一遍。**
One API 官方公式是 `额度 = 分组倍率 × 模型倍率 ×（提示 token + 补全 token × 补全倍率）`。营销话术常把「兑换比例」和「倍率」拆开说，让人只看到「1:10 很便宜」。正确讲法是：**真实单价 = 官方单价 × 倍率**，兑换比例只决定充值怎么换算。让学生自己拿一个模型算一遍最有效。

**3. 「能连上 Claude Code」≠「完整支持 Anthropic 协议」。**
格式转换层对未实现的字段会丢弃或重构。One API README 明确提示模型映射会导致请求体被重新构造、部分字段传不过去。Anthropic 侧的 extended thinking、`cache_control`、`tool_use`、context management 等字段支持度必须逐项验证，不能只看「/v1/messages 返回了 200」。
（另一个具体佐证：阿里云百炼官方文档说明其 `/apps/anthropic` 端点**只提供 `/v1/messages`，不提供 `/v1/models`**——说明「兼容」是有限度的兼容。）

**4. 「国家安全部提示」和「清朗专项行动通报」要分开讲，不要张冠李戴。**
国家安全部 2026-06-08 的提示**确实**是针对「AI 中转站」的。但 2026-09-02 中央网信办「清朗·整治 AI 应用乱象」第二阶段的通报，典型案例全部是 AI 造谣、AI 换脸假冒、侵害未成年人等，**通报里没有点名「API 中转站」**。把两者说成「监管已经点名打击中转站」是不准确的。正确的表述是：2026 年 4 月中央网信办启动该专项行动，重点包含「未按规定进行大模型备案登记、AI 数据安全、内容滥用」等问题；AI 中转站处在这些监管焦点的交叉地带。

**5. 区分「律所解读」与「生效判决」。**
垦丁律所与曼昆律所的文章是很好的讲课素材，但必须说明：
- 垦丁律所**自己写了**「尚未发现与『AI 中转站』业务模式完全一致且已作出终审判决的公开案例」；
- 曼昆律所的案例**自述为「改编自公开裁判文书及公开报道，人物均为化名，部分细节已作文学化处理」**。
不要把这些说成「已经有判例了」。
另外，垦丁律所文中「2025 年 7 月生效的《生成式人工智能服务管理暂行办法》第 17 条」这一表述**我未核实且存疑**（该办法一般认为是 2023 年公布、2023 年 8 月 15 日施行），**讲课时不要沿用这个时间点**。

**6. 「中转站一定便宜」是不成立的。**
科技日报引述的甄别标准第三条就是「远离**远低于行业均价的低价引流、无限量套餐陷阱**」。低价往往对应：共享账号池、模型降级、Token 注水、上下文被砍、随时跑路。低价不是优点，是需要解释的现象。

**7. 「OpenRouter 是官方的」是错的。**
OpenRouter 是独立的第三方聚合平台，不是 OpenAI、Anthropic 或任何模型厂商的官方服务。它正规，但「正规的第三方代理」和「官方 API」仍然是两回事。反过来说，中转站也**不必然**非法——科技日报的三分类里第二类「正规 API 代理中转站」就是合法形态（企业主体批量采购官方额度、合规分销）。

**8. 「官方直连就一定安全」也不完全对。**
数据出境、内容安全、备案是**使用者自己**的义务。New API README 明确把备案、许可、内容安全、实名、日志留存、税务、上游授权写成使用者义务。用官方 API 调用未备案的境外模型对外提供服务，问题依然存在（这属于律所解读，讲课时注明「律师界普遍解读」）。

**9. 环境变量优先级是个真实的坑，值得单独讲。**
MiniMax 官方文档要求配置前清除 `ANTHROPIC_AUTH_TOKEN`/`ANTHROPIC_BASE_URL`（包括从 `.bashrc`/`.zshrc` 里删掉永久导出）；阿里云百炼文档说明 API Key 类型必须与 `base_url` 配套否则 401。学生配不通这类问题，八成是环境变量残留或 Key/base_url 不匹配，而不是「中转站坏了」。

**10. 「余额能不能退」要教学生**先看条款再充钱**。**
OpenRouter 有白纸黑字的 24 小时退款窗口与「加密支付不退」；多数小站什么都没有。一条可教的经验规则：**没有公开退款条款的平台，默认按「钱要不回来」处理，充值金额就是你的最大可承受损失。**

**11. 别把「日志留存」当成平台的「可选功能」。**
这是架构决定的：网关必须能读到明文才能计费与路由。所以正确的推论不是「找一家承诺不记录日志的」，而是「**任何中转站都不该收到不该外传的内容**」。国家安全部的官方建议也是先脱敏、再使用。

**12. 最后一条，也是最容易被忽略的：区分「学生的合法用途」与「商业转售」。**
学生自己做课程项目、跑实验，用官方免费额度或正规聚合平台通常足够，**根本不需要碰中转站**。真正会把学生带进坑的诱因，是「便宜到离谱」和「额度看起来用不完」。讲课的价值就在这两点上泼冷水。

---

## 附：本次调研的主要来源清单（核查日期均为 2026-09-18）

**官方 / 政府来源**
- 国家安全部风险提示（中国警察网转载，2026-06-08）：https://news.cpd.com.cn/n3569/626/t_1236449.html
- 中央网信办「清朗·整治 AI 应用乱象」第二阶段通报（新华网转中国网信网，2026-09-02）：https://www.news.cn/politics/20260902/564dc9a913c94b22996f783a02abcaf2/c.html
- 阿里云百炼 Claude Code 文档（2026-09-16 更新）：https://www.alibabacloud.com/help/zh/model-studio/claude-code
- 阿里云百炼新人免费额度文档（2026-09-11 更新）：https://www.alibabacloud.com/help/zh/model-studio/new-free-quota
- 智谱 Claude API 兼容文档：https://docs.bigmodel.cn/cn/guide/develop/claude/introduction
- 智谱 GLM Coding Plan 快速开始：https://docs.bigmodel.cn/cn/coding-plan/quick-start
- Kimi API 概述（中国站）：https://platform.kimi.com/docs/api/overview.md
- Kimi API 概述（国际站）：https://platform.kimi.ai/docs/api/overview
- MiniMax Messages API（Anthropic）：https://platform.minimax.cn/docs/api-reference/text-chat-anthropic
- MiniMax Claude Code 接入：https://platform.minimaxi.com/docs/token-plan/claude-code
- 硅基流动 Claude Code 使用文档：https://docs.siliconflow.com/cn/usercases/use-siliconcloud-in-ClaudeCode
- 硅基流动 Anthropic 对话请求文档：https://docs.siliconflow.com/cn/api-reference/chat-completions/messages
- 硅基流动 OpenAI 对话请求文档（含 servers 定义）：https://docs.siliconflow.com/cn/api-reference/chat-completions/chat-completions.md
- 火山方舟 Coding Plan Claude Code 文档：https://docs.volcengine.com/docs/ark/coding-plan-personal-ai-claude-code
- 火山引擎官方文章《方舟 Coding Plan：API 与 REST 接口配置指南》（2026-04-09）：https://www.volcengine.com/article/38136
- OpenRouter 官方 FAQ：https://openrouter.ai/docs/faq
- OpenRouter Quickstart：https://openrouter.ai/docs/quickstart.md
- OpenRouter Anthropic Messages API 参考：https://openrouter.ai/docs/api/api-reference/anthropic-messages/create-a-message.md

**开源项目官方仓库**
- One API：https://github.com/songquanpeng/one-api
- New API：https://github.com/QuantumNous/new-api
- uni-api：https://github.com/yym68686/uni-api

**媒体报道**
- 科技日报《热点回应丨如何甄别靠谱的「AI 中转站」》（2026-06-15）：https://www.stdaily.com/web/gdxw/2026-06/15/content_532141.html
- 央广网《「Token 中转站」：AI 风口下的风险生意》（2026-07-28）：https://www.cnr.cn/mspd/msyx/20260728/t20260728_527733647.shtml

**法律与社区分析（非官方，需标注性质）**
- 垦丁律师事务所《AI 中转站站长被上海警方抓捕，灰色赛道的合规警示》（2026-05-29）：https://kindinglaw.com/news/shownews.php?id=164
- 上海曼昆律师事务所《AI 中转站数据出境违规：刑拘背后的数据安全法红线》（2026-09-07）：https://www.mankunlaw.com/insights/ai-api-relay-data-export-criminal-risk/
- 腾讯云开发者社区《大模型 API 中转站避坑：满血验证、倍率换算与降智识别》（2026-08-29）：https://cloud.tencent.com.cn/developer/article/2734082
- V2EX《中转站疑似跑路》（2026-05-14）：https://global.v2ex.co/t/1212741
- V2EX《之前买的 88code 中转站现在退款困难，怎么维权？》（2026-02-02）：https://global.v2ex.co/t/1190270
