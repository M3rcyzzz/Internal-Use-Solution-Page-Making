# 固定组件与自动验收

用途：将已确认的 Builder、UNS Agent、服务模式稳定复用到方案页。使用标准库 Python 3，无需安装第三方包。这里的脚本不发布页面、不访问网络、不改现有页面。

## 固定模块与生成范围

每页必须有数据采集与 UNS（`#namespace`）、Builder（`#builder`）、UNS Agent（`#uns-agent`）三大业务模块，并保留服务模式（`#delivery`）。数据采集与 UNS 按 [场景规则](data-acquisition.md) 制作；现有生成器只生成下列 Builder、Agent、服务模式片段，不能将生成片段本身视为完整页面。

## 生成三个模块

- 模板：[Builder](../assets/components/builder.html)、[Agent](../assets/components/agent.html)。保留 EAM 的底图与右下 Prompt 构图、产品式 Agent 对话层级。
- 样式与交互：[components.css](../assets/components/components.css)、[components.js](../assets/components/components.js)。样式作用于组件，字体沿用官网 token；复制 Prompt 不执行应用生成，Agent 为不发送请求的展示界面。
- 服务模式直接从原有 EMS 固定模块生成，只开放原先允许的业务替换项，中文通用文案与按钮不变。英文固定文案由生成器统一维护。
- 输入示例：[中文](../assets/components/example.zh-CN.json)、[英文](../assets/components/example.en.json)。它们是配置示例，不证明示例 UNS 工单主题已在实际 EAM 中存在。

```sh
python3 /path/to/skill/scripts/render_components.py config.json --output output/components.html
```

把三个 section 合入现有页面的 main，加载生成的两个 CSS 与一个 JS。输出是片段，不是整站；继续使用现有官网导航、页脚、token 和真实品牌资产。图片/Logo 的相对路径以最终页面目录为准，素材由页面制作者提供。已有同名模块先替换，不能叠加重复 ID。生成器默认拒绝覆盖已存在的输出，确认替换时用 `--force`。

配置包含：

- `language`（zh-CN / en）、`app`、真实 `logo` 路径。
- `builder`：heading、intro、prompt；image 的 path、alt、width、height、language、kind。kind 为 localized 时记录原图 source。
- `agent`：heading、intro、scenario、question、answer、followup；sources 为 UNS 主题及 fields；field_refs 用 `主题路径#字段` 明确本次分析所用字段。生成时检查这些字段已声明，不推断数据内容。
- `agent.data_status`：illustrative 或 verified；verified 要提供 evidence 来源说明，仍需人工核实。示例会显示“分析示意”。
- `agent.result`：table（title、columns、rows）或 list（title、items）。表格单元格使用字符串，单位随值写明。趋势等其他表达可沿用已批准的 EAM 产品卡片，用可编辑图表实现并单独验收；不要把需要趋势的问题强行变成列表。
- `delivery`：scope、organize、integration、customize 四项业务文案；应用名称由 app 填入。不能借此改写通用服务模式。

输入文本统一转义，资源只接受相对路径或 HTTPS，避免把配置文本当 HTML 执行。语言、数值、数据事实与翻译质量仍由制作者负责。

## 静态验收

```sh
python3 /path/to/skill/scripts/check_solution.py index.html en.html --manifest screenshots.json --forbid WMS --output audit.json
```

`--forbid` 仅填写当前页面不应出现的旧项目名，例如制作 EAM 时检查误留 WMS；合法业务比较或真实界面名称不要误禁。中文或英文单页可单独运行，缺少语言切换只给提醒。

截图清单结构：

```json
{"images":[
  {"path":"assets/dashboard.png","language":"zh-CN","kind":"original"},
  {"path":"assets/dashboard.en.png","language":"en","kind":"localized","source":"assets/dashboard.png"}
]}
```

图片路径按各页面目录解析，双语页面同目录时可共用清单。所有非 Tier0 品牌图片均需登记；图片内语言只能由清单声明及人工视觉核对，脚本不执行 OCR。独立 HTML 的内嵌图片应在打包前对源页面验收，打包后另查资源内嵌和语言互链。

脚本检查：

- 四个必有区域的存在；数据采集来源与 UNS 模型是否有可读内容；应用效果图和 Prompt、Agent 问答/Source/结果。采集来源标记使用 `data-uns-source`，模型标记使用 `data-uns-model`，兼容现有 EAM 类名；关联是否合理及协议是否适用仍需人工核对。
- 服务模块两栏各三个列表项、固定按钮与链接。精确样式及所有通用文字的保真依靠生成器和视觉验收，脚本不把结构一致等同像素一致。
- 单个 H1、Title/Description、重复 ID、本地资源（含 CSS 引用）与锚点、双语互链。
- 英文中残留的中文文本/替代文本（允许“中文”切换入口）、未替换标记、指定旧项目名。
- 图片语言与来源清单、缺少尺寸、过长段落提醒。

返回码 0 表示静态硬检查通过，1 表示发现错误；报告分别列出 errors、warnings、manual_required。不得把 `static_status: pass` 说成“全部验收通过”。外链、站点根路径、实际像素、图片翻译正确性、移动端溢出、交互、业务事实和真实 UNS 查询均不由此脚本证明。浏览器不可用时保留未验证项，不绕过安全策略。

## 修改脚本后验证

```sh
python3 /path/to/skill/scripts/test_components.py
```

包含正常双语页面与缺模块、缺图、错语言、旧项目名、占位符、服务按钮变更、重复 ID、断锚点、CSS 依赖、字段映射缺失、注入文本、覆盖保护等正反用例。再用当前真实交付页面检查一次，修正真实遗漏或记录旧页面的迁移项。
