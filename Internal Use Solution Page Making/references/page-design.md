# 页面视觉与交付

来源：用户在 EMS 官网落地稿中的明确选择。是后续方案页的默认基线，可被新的用户要求覆盖。

## 页面框架

- 顶部白底导航、细底边。左侧官方黑色 logo；中间 Product / Solution / Docs / Resource / Pricing，随后 Discord、GitHub 图标；右侧 FREE TRIAL、绿色 LOG IN、语言入口。
- 使用真实可验证的官网链接，优先复用项目已有公共 header/footer。不要复制旧稿里临时指向首页的占位链接。未知链接记录在交付说明中，不制造可点击的假功能。
- 第一屏直接进入 Hero：桌面左标题、右产品图，移动端合理堆叠。主标题说明具体应用和场景。不要再加 Home / Solution / Energy Management 或 Energy management · EMS。
- Hero 与适当关键节点放 Apply for Trial / Talk to team。页首导航仍保持 FREE TRIAL / LOG IN。避免每段一个 CTA。
- 白底、大留白、清楚层级、适中字体粗细。使用 design skill 的官方资产和 token；禁止用文字、CSS、AI 重画 logo。Tier0 可作为正文产品名出现。

## 页脚

- 近黑底，左侧官方白色 logo。其下订阅区文字：STAY UP TO DATE WITH PRODUCT UPDATES, LEARNING RESOURCES, AND MORE.
- 商务邮箱输入框配 Subscribe；其下 Join Discord、Talk to Team 和 LinkedIn / GitHub / Facebook / X / YouTube 社交入口，底部 Privacy Policy。
- 竖向分隔后，右侧三列目录：Tier0、Solutions、Resources。
- Tier0 列区分 Tier0 Builder 与 Tier0 Platform，列 App Builder、Unified Namespace、App Library、Advanced Analytics、Data Collection 等实际入口。
- Solutions 列按 By Use Case / By Capability 分组，并有 Docs；Resources 列列 Blogs / Events / Downloads，并有 Pricing。具体目录跟随已核实官网结构，不把旧页面名称当永久清单。
- 移动端可堆叠或折叠，文字、输入与按钮可操作。预览订阅未接后台时不能假报订阅成功；使用清楚的预览行为并在交付说明中记录。

## 视觉证据

- 原始截图保留原文件；裁去浏览器栏、通知、无关项目名和系统截图小缩略图等噪声，不编造产品结果。只有相关截图才能用作功能证据。
- UNS 示例用可编辑树：Factory / Workshop / Line / Equipment，节点下 Metric / State；结合该方案所需单位、时间和对象。它是模拟数据模型，不声称实际项目已连通。
- Builder 可用 HTML 对话框重现相关 prompt。Agent 用简短问题、数据表或图、可执行下一步展示。原生 HTML/SVG 用于图形与文字；栅格图片用于真实界面与照片。
- 保留语义正文、表格标题和必要可访问文本。不要为了视觉简洁把关键语义只藏在 alt 或 aria-label 中。
- 尽量一个模块一个问题。没有内容增量就删掉副标题、小字和重复引导。

## 设计交付

- 如用户需要上线效果图，默认交付响应式 HTML、对应素材、源稿与 SEO 说明；复用现有技术栈，不擅自换平台。
- 双语默认独立可链接 URL，语言切换到对应页面。原产品 UI 的语言可保留，不伪造翻译过的“真实截图”。
- 向设计团队交付时包含：中英稿、源 HTML/组件、真实原图、官方 logo、字体及许可（允许分发时）、素材映射、未接入功能和待核实链接说明。
- 核实实际像素和导出尺寸。放大图片明确叫放大版；要清楚文字优先矢量排版加原图，不反复让图像模型重绘产品小字。
