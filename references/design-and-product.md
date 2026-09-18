# 设计 Skill 与产品官网

- 官方设计 Skill：[Tier0 Design System](https://github.com/FREEZONEX/Tier0-Design-System)。入口为仓库根目录 `SKILL.md`。
- 产品官网：[Tier0](https://www.tier0.app/)。用于核对当前产品介绍、真实功能入口、导航与页脚链接。

## 未安装设计 Skill 时

先检查是否已安装 `tier0-design`。未安装时，从上述官方仓库获取设计 Skill；可以将完整仓库克隆或下载到工作目录，直接读取根目录 SKILL.md 并按相对路径读取资源，不要求用户事先安装才能继续页面工作。需要注册为本机 Skill 时使用当前环境支持的安装方式，保留已有本地修改。

不要只复制 SKILL.md：设计规范依赖 DESIGN.md、foundations、tokens、surfaces、sources、assets、fonts、ui_kits 等目录。字体、Logo、图标与配套资源保留原许可。

制作解决方案官网页使用 `company-website` 路径：读取 DESIGN.md、foundations/README.md、tokens/core.css、tokens/website.css、surfaces/company-website/README.md 和 sources/spec.company-website.*.md。嵌入产品 UI 时结合本内容 Skill 的两张真实截图，按需查产品 UI 规范。

本内容 Skill 通过官方仓库提供设计依赖，不另行维护容易过时的设计系统副本。无法联网且未安装时说明缺项，先完成不依赖品牌资源的内容工作，不手画替代 Logo。

官网和设计库用于产品事实、视觉和资源核对；当前用户确认的内容定位、CTA 和版式要求优先于历史文案。统一产品称呼为 Tier0，Builder、UNS、Agent 为功能。
