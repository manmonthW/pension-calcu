# 部署说明

本项目包含两个版本：
1. **Web网页版** - 可部署到Vercel等静态托管平台
2. **微信小程序版** - 需在微信开发者工具中运行

---

## 🌐 Web版部署到Vercel

### 方式一：通过GitHub连接（推荐）

1. 将代码推送到GitHub仓库
2. 访问 [Vercel官网](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的GitHub仓库
5. Vercel会自动检测配置并部署
6. 部署完成后会获得一个访问链接

### 方式二：通过Vercel CLI

```bash
# 安装Vercel CLI
npm install -g vercel

# 在项目根目录运行
vercel

# 按照提示完成部署
```

### 方式三：拖拽部署

1. 访问 [Vercel官网](https://vercel.com)
2. 直接拖拽项目文件夹到浏览器
3. 自动完成部署

---

## 📱 微信小程序版部署

微信小程序需要在微信开发者工具中运行和发布：

### 1. 准备工作

- 注册微信小程序账号：https://mp.weixin.qq.com
- 下载微信开发者工具：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

### 2. 导入项目

1. 打开微信开发者工具
2. 选择"小程序"
3. 点击"导入项目"
4. 选择本项目根目录
5. 填写AppID（可使用测试号）

### 3. 预览测试

- 点击"预览"按钮
- 用手机微信扫码即可在手机上查看

### 4. 上传发布

1. 点击"上传"按钮上传代码
2. 登录微信公众平台后台
3. 进入"版本管理"
4. 提交审核
5. 审核通过后发布

---

## 📁 项目文件说明

### Web版相关文件
- `index.html` / `pension_calc.html` - 网页版主文件
- `vercel.json` - Vercel部署配置
- `package.json` - 项目配置

### 小程序版相关文件
- `app.js` / `app.json` - 小程序全局配置
- `pages/` - 小程序页面目录
- `sitemap.json` - 小程序站点配置

---

## 🔧 本地开发

### Web版
```bash
# 安装serve工具（如果没有）
npm install -g serve

# 启动本地服务器
serve .

# 或使用npm命令
npm run dev
```

### 小程序版
使用微信开发者工具打开项目即可

---

## 📝 注意事项

1. Web版和小程序版功能相同，选择合适的平台部署
2. Vercel部署的是HTML网页版，可通过浏览器访问
3. 微信小程序版只能在微信客户端中使用
4. 建议同时维护两个版本以覆盖更多用户

---

## 🆘 常见问题

**Q: Vercel部署失败怎么办？**
A: 检查vercel.json配置是否正确，确保index.html文件存在

**Q: 微信小程序如何获取AppID？**
A: 需要先在微信公众平台注册小程序账号

**Q: 可以修改计算公式吗？**
A: 可以，修改对应的JavaScript代码即可

---

## 📧 反馈与支持

如有问题，欢迎提Issue或Pull Request。