# Tiffany Workflow Repository
## 项目说明
自动化工作流集合，包含多个可复用的业务模块，支持自动推送、定时任务、用户交互等场景。
## 目录结构
```
├── workflows/               # 核心工作流模块
│   ├── app_rank_scraper/    # 六国APP榜单抓取+自动推送
│   ├── ai_intelligence_radar/ # 全球AI情报12小时自动更新
│   ├── ad_policy_monitor/   # 全球广告平台政策监测
│   ├── fortune_generator/   # 专属定制运势生成
│   └── shortcut_reply/      # 数字快捷指令响应
├── common/                  # 公共工具模块（P0新增，所有模块复用）
│   ├── config.js            # 统一配置/密钥管理
│   ├── http.js              # 带重试的HTTP请求工具
│   ├── logger.js            # 统一日志工具
│   ├── file.js              # 统一文件读写工具
│   └── message.js           # 统一消息推送工具
├── prompts/                 # Prompt资产目录（P0新增，统一分类管理）
│   ├── fortune_prompts.js   # 运势生成类prompt
│   ├── report_prompts.js    # 报告生成类prompt
│   └── chat_prompts.js      # 聊天互动类prompt
├── .github/workflows/       # CI/CD配置（P1新增，自动校验）
│   └── ci-check.yml         # PR自动语法/格式校验
├── docs/                    # 文档目录
├── config/                  # 配置模板目录
└── README.md
```
## 模块说明
### 1. app_rank_scraper
定时抓取美国、加拿大、澳大利亚、巴西、墨西哥、印尼六国的工具/图书/浏览器类APP榜单Top10，自动推送，包含下载量、ECPM、点击率等全字段数据。
### 2. ai_intelligence_radar
12小时自动同步全球AI圈新闻、研究突破、开源项目、产业动态，生成结构化简报。
### 3. ad_policy_monitor
实时监测Google/Meta/TikTok等20+全球主流广告平台政策变动，高优先级变更自动告警。
### 4. fortune_generator
用户触发888指令后，根据生日、性别、地区生成专属定制运势，支持自定义风格。
### 5. shortcut_reply
统一处理用户数字快捷指令，自动映射对应功能，支持群聊/私聊@触发。
## 开发规范
1. 所有通用逻辑优先复用`common`目录下的工具，禁止重复造轮子
2. 所有prompt资产统一放到`prompts`目录分类管理，禁止硬编码在业务代码里
3. 所有密钥/配置从环境变量读取，禁止硬编码在代码里
4. 所有变更通过新分支+PR提交，禁止直接修改main分支
5. PR会自动触发CI校验，通过后才能合并

## 使用说明
每个模块目录下有单独的README说明部署方式和配置参数，所有模块支持定时调度、自定义推送对象，公共工具直接引用即可。
