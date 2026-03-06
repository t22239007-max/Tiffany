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
## 使用说明
每个模块目录下有单独的README说明部署方式和配置参数，所有模块支持定时调度、自定义推送对象。
