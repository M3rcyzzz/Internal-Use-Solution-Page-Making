# SEO 与 AI 搜索可读性

原则：帮助人理解具体问题，同时让机器可靠提取同一内容。没有保证被 AI 引用的结构或技巧。以下实施建议应按任务范围应用，不为 SEO 扩写空话。

## 搜索定位

- 一页一个主要意图：如“工厂能源管理系统建设/定制”，受众为能源、设备、生产、数字化团队。
- 选工业软件与业务问题长尾词。各解决方案页围绕具体业务问题选词；Tier0 始终是统一产品，应用构建、UNS 数据组织等是功能，不因 SEO 拆成不同产品。
- 关键词无数据时标为建议，不杜撰搜索量或“最高频”排名。重要时用可用研究工具验证。
- URL 稳定清晰；Title 和 H1 相关但不必相同；Description 写范围与价值，不堆词。H1 默认一个，H2/H3 按内容层次。
- 内链指向Tier0 的相关功能、Docs、实际案例与同类方案；锚文本明确。不要强行塞入不相关模块。

## 人和机器读到相同的有用内容

- 在相关段落开头直接给答案，再给条件和例子；不要强制每页问答体或重复一句“这是什么”。
- 软件全称、缩写、品牌和业务对象首次出现时解释清楚。数据包含单位、周期、分母、来源/示例身份；Agent 输出不能写成无依据结论。
- HTML 中有可选取的关键正文、标题、表格和链接。首屏图不承载全部价值说明；不要依赖点击、滚动或客户端执行后才出现主要文本，优先 SSR/静态输出。
- 信息密度与可视化并存：图说明关系，正常字号短文提供结论与必要前提。不要增加给机器人看的隐藏关键词段落或向抓取器提供另一套正文。
- FAQ 仅在存在真实购买问题时使用；避免已有信息换成问答再说一遍。作者、日期、来源仅填真实信息；不要伪造更新频率或权威背书。

## 技术与双语

- 检查目标页 200、内部可发现链接、robots、meta robots / X-Robots-Tag、CDN/WAF 和索引状态。预览防索引与正式发布配置分开；robots.txt 阻抓不能替代可靠去索引控制。
- 每个可索引语言页 self-canonical；对应语言互相 hreflang，lang 正确；x-default 在有明确默认入口时使用。中文不要 canonical 到英文。
- 中英分别制定主次词、Title、Description、H1 和自然 CTA；不是直接翻译关键词。避免空壳语言页和错误互链。
- 图片有描述内容的 alt、尺寸、合适格式与响应式资源；装饰图空 alt。首屏关键图不盲目 lazy-load；控制图片和字体体积。
- schema 只描述可见且真实内容：WebPage、Organization（优先站点已有）、适用时 Service；有真实文章属性再用 Article。BreadcrumbList 必须反映真实层级，不能为删除的面包屑造结构。没有真实评分、价格、产品功能就不加相应数据。
- 不把 FAQ schema 当作富结果保证；不把 solution 页强行标成在售 SoftwareApplication。
- 交付检查清单与待办可单独文档提供；未经请求不擅自改站点抓取政策或部署。

## AI 抓取政策区别

- Google AI 搜索仍依赖基础 SEO；Google 官方表示不需特殊 AI 文件或特殊 schema。llms.txt 可按项目需求评估，不作为必要条件、排名保证或替代 sitemap/可抓取正文。
- OpenAI 的 OAI-SearchBot（搜索）、GPTBot（可能用于模型训练）、ChatGPT-User（用户触发访问）用途不同。不要把允许搜索抓取等同同意训练；具体配置按网站所有者政策、当前官方说明与所需访问方式核实。
- 抓取许可不保证索引或引用。无需为了此 skill 开放全部机器人，也不自动改变现有 robots / WAF。

## 配置单（新建/实质改写时）

逐语言给出目标/受众/意图、主次关键词、URL、Title、Description、H1、H2–H3 结构、内链及真实目标、CTA、alt 原则、schema 选择、canonical/hreflang、抓取与索引状态、SEO/事实风险和待验证项。小改动仅更新影响范围。

## 官方依据

核对日期：2026-09-18；涉及部署时重新核实可能变化的政策。
- Google AI features and your website：https://developers.google.com/search/docs/appearance/ai-features
- OpenAI crawler documentation：https://developers.openai.com/api/docs/bots
