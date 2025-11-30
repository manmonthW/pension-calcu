# 养老金计算器

一个专业的养老金计算器，支持两种退休方案的对比分析。

**支持双平台：**
- 🌐 **Web网页版** - 可部署到Vercel等平台，浏览器直接访问
- 📱 **微信小程序版** - 在微信中使用，体验更佳

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/pension-calculator-miniprogram)

## 功能特性

- 📊 支持两种退休方案对比分析
- 💰 详细的基础养老金和个人账户养老金计算
- 📈 智能回本周期分析
- 🧠 AI建议和风险评估
- 📱 移动端优化的用户界面

## 计算功能

### 基本参数
- 当前年龄和缴费年限
- 缴费指数和个人账户余额
- 城市信息和计发基数

### 方案对比
- **方案1**：正常退休
- **方案2**：延迟退休

### 延迟期间考虑
- 失业金收入
- 灵活缴费成本
- 4050补贴政策
- 个人账户积累

## 技术栈

- HTML + CSS + JavaScript（Web版）
- 微信小程序原生开发（WXML + WXSS）
- 响应式设计，适配各种手机屏幕

## 快速开始

### Web版本

#### 部署到Vercel（推荐）
1. Fork本仓库
2. 在Vercel中导入项目
3. 自动部署完成，获得访问链接

#### 本地运行
```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/pension-calculator-miniprogram.git

# 进入目录
cd pension-calculator-miniprogram

# 启动本地服务器
npx serve .
# 或
npm run dev
```

### 微信小程序版本

1. 在微信开发者工具中导入项目
2. 配置appid（可使用测试号）
3. 点击预览，用手机微信扫码体验

详细部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 项目结构

```
├── index.html          # Web版主页面
├── pension_calc.html   # Web版计算器（同上）
├── vercel.json         # Vercel部署配置
├── package.json        # 项目配置
├── DEPLOYMENT.md       # 部署说明文档
├── app.js              # 小程序入口文件
├── app.json            # 小程序配置
├── sitemap.json        # 小程序站点地图
└── pages/
    └── index/          # 小程序主页面
        ├── index.js    # 页面逻辑
        ├── index.json  # 页面配置
        ├── index.wxml  # 页面结构
        └── index.wxss  # 页面样式
```

## 计算说明

本计算器基于国家养老保险政策制作，包含：
- 基础养老金 = (当地平均工资 + 个人平均缴费工资) ÷ 2 × 缴费年限 × 1%
- 个人账户养老金 = 个人账户余额 ÷ 计发月数

计发月数根据退休年龄自动获取，符合国家标准。

## 免责声明

本计算器仅供参考，实际养老金数额以当地社保部门核算为准。政策如有调整，请以最新政策为准。

## 开源协议

MIT License