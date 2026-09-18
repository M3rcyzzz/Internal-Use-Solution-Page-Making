# Builder 与 UNS 界面参考

用户于 2026-09-18 提供并指定用于后续解决方案页的真实产品截图。制作或修改 Builder、UNS 模块时，先查看以下图片；新的用户截图优先。

- [Builder 原图](../assets/product-reference/builder.png)：左侧产品导航，App / Builder 顶栏，标题“Turn your ideas into applications”，需求输入框、项目选择、发送按钮、分类入口和模板区。
- [UNS 原图](../assets/product-reference/uns.png)：左侧产品导航，Namespace 树，中间 Canvas / UNS Info，右侧 Agent Chat / Card List、Scheduled Tasks、Skills 和输入区。树形层级展示 Plant / Workshop / Line / Equipment，其下为 Metric / State。

用户要求直接使用时，使用原图；要求模拟界面并输入方案需求时，以原图为结构和视觉依据制作可编辑 HTML，提示词、项目名替换为当前方案，保留原生产品界面特征。不要自行设计一个普通聊天框代替 Builder，也不要用 JSON 代码框替代实际 Namespace 界面。

截图作为界面证据，不是 JSON Schema 或导入格式规范。生成数据模型时遵守 [UNS 建模格式](uns-modeling.md)，不从截图推断字段契约。UNS 中的 No data、连接提示和测试项目不能改成已接入当前方案或已有业务结果。

保留原始文件。截图中的账号、头像、工作区和测试项目名不作为方案的业务内容；对外发布时根据当前授权范围处理这些信息，不能从引用截图推导公开发布授权。

## 方案页的重点呈现

- 应用构建模块以当前方案的应用效果截图作为底层主图，将包含需求的 Builder 输入框缩小叠放在右下角，直观呈现需求与生成结果的关系。输入文字仍须可读；省略无关侧栏、模板区，保留必要产品识别与项目选择。移动端根据宽度调整叠放比例，避免遮住主图关键内容。
- UNS Agent 用图形化对话展示具体交互，例如业务提问、数据定位、趋势卡片、添加到 Canvas、定时任务确认。避免仅列问题；示意结果不能冒充真实查询结果。

- Agent 回答区沿用截图中的产品形式：Chat / Card List 标签、正文回答、Source 路径、卡片预览及底部 Scheduled Tasks / Skills 输入区；Thinking 与步骤状态按篇幅省略；不要改成通用聊天气泡来代替产品回答结构。

- Agent 产品交互图控制在一个版块内：保留提问、回答、来源、卡片和输入区，通过紧凑间距、短步骤与适当卡片高度控制长度，避免纵向拉成多个屏幕。

- 单版块精简优先减少内容而非仅缩小字号：一次提问、一句回答、一个趋势卡片和输入区即可。删去重复路径、步骤状态和重复完成说明，保留产品辨识度与可读性。
