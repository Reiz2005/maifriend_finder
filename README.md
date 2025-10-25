# maifriend-finder

用于寻找群里的中二或者舞萌吃

## 📋 插件信息

- **ID**: `maifriend-finder`
- **版本**: 1.0.0
- **作者**: reiz
- **分类**: utility
- **SDK**: Enhanced SDK

## ✨ 特性

- ORM数据模型
- 事件过滤器
- 并发控制
- 适合复杂插件

## 🚀 功能

- ✅ 指令处理
- ✅ 事件监听
- ✅ 数据存储
- ✅ CQ码处理（图片、@、表情等）

## 📦 安装

1. 将插件复制到 `server/plugins/maifriend-finder/`
2. 在Web管理界面扫描插件
3. 启用插件
4. 开始使用

## 🔧 配置

编辑 `plugin.json` 的 `config` 部分来配置插件。

## 📖 使用方法


### 指令

- `/hello` - 发送问候
- `/sendimg` - 发送图片示例


### 事件

插件会自动监听并处理相关事件。


### CQ码支持

插件支持处理QQ消息中的各种富媒体内容：

**解析消息：**
```javascript
// 解析消息段
const segments = this.parseMessage(event.raw_message);

// 提取纯文本
const text = this.extractText(event.raw_message);

// 提取图片
const images = this.extractImages(event.raw_message);

// 检查是否包含@
if (this.hasAt(event.raw_message)) {
  // 处理@消息
}
```

**构建CQ码：**
```javascript
// @某人
this.CQ.at(user_id)

// 发送图片
this.CQ.image(url)

// 发送表情
this.CQ.face(id)

// 回复消息
this.CQ.reply(message_id)
```

更多CQ码用法参见：[CQ码处理指南](../../文档/server/文档-server-插件错误记录指南.md)


## 🛠 开发

### 添加新功能


参考现有代码结构添加新的功能。


### 调试

启用调试模式：在 `plugin.json` 中设置 `"debug": true`

## 📝 更新日志

### v1.0.0 (2025-10-25)
- 初始版本
- 支持指令处理
- 支持事件监听
- 

## 📄 许可证

MIT

## 👨‍💻 作者

reiz
