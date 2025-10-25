/**
 * maifriend-finder
 * 用于寻找群里的中二或者舞萌吃
 * 
 * @author reiz
 * @version 1.0.0
 * @sdk Enhanced SDK v3.0
 */

import { EnhancedPluginBase } from '../../core/plugin-system/plugin-sdk-enhanced.js';

export default class MaifriendFinder extends EnhancedPluginBase {
  constructor(pluginInfo, context) {
    super(pluginInfo, context);
    
    // 定义数据模型
    this.User = this.storage.model('User', {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      points: { type: Number, default: 0 },
      lastActive: { type: Date, required: false }
    });
    
  }

  async onLoad() {
    await super.onLoad();
    this.logger.info('maifriend-finder 正在加载...');
    
    // 注册指令
    this.registerCommands();
    
    // 注册事件
    this.registerEvents();
    
    this.logger.info('maifriend-finder 加载完成');
  }
  
  registerCommands() {
    
    // 示例指令 - 包含错误处理
    this.registerCommand('hello', async (event) => {
      // 使用CQ码
      const message = `${this.CQ.at(event.user_id)} 你好！欢迎使用maifriend-finder！`;
      await this.replyToEvent(event, message);
    });
    
    // CQ码处理示例
    this.registerCommand('sendimg', async (event) => {
      const imageUrl = 'https://example.com/image.jpg';
      const message = `看这张图片：${this.CQ.image(imageUrl)}`;
      await this.replyToEvent(event, message);
    });
    
    this.logger.info('已注册指令');
    
  }
  
  /**
   * 注册单个指令（包含自动错误处理）
   */
  registerCommand(command, handler) {
    const cmd = command.startsWith('/') ? command.substring(1) : command;
    
    const wrappedHandler = async (event) => {
      try {
        await handler.call(this, event);
      } catch (error) {
        this.recordError('command', cmd, error);
        const errorMsg = `⚠️ 执行指令 /${cmd} 时出错：${error.message}`;
        await this.replyToEvent(event, errorMsg, false).catch(() => {});
      }
    };
    
    const commandInfo = {
      plugin: this.info.id,
      command: cmd,
      description: `${command} 指令`,
      usage: `/${cmd}`,
      type: 'custom',
      category: 'utility',
      executionCount: 0,
      registeredAt: Date.now(),
      handler: wrappedHandler
    };
    
    this.context.commandRegistry?.register(commandInfo);
    this.registeredCommands.set(cmd, commandInfo);
  }
  
  registerEvents() {
    
    // 示例: 带过滤器的事件处理
    this.onEvent('message')
      .filter(event => event.message_type === 'group')
      .filter(event => event.raw_message && event.raw_message.includes('关键词'))
      .handle(async (event) => {
        try {
          await this.handleKeyword(event);
        } catch (error) {
          this.recordError('event', 'handleKeyword', error);
        }
      });
    
    // CQ码处理示例: 检测图片消息
    this.onEvent('message')
      .filter(event => this.hasImage(event.raw_message))
      .handle(async (event) => {
        try {
          const images = this.extractImages(event.raw_message);
          this.logger.info(`收到 ${images.length} 张图片`);
          // 处理图片...
        } catch (error) {
          this.recordError('event', 'imageHandler', error);
        }
      });
    
    this.logger.info('已注册事件处理');
    
  }
  
  async handleKeyword(event) {
    // 处理包含关键词的消息
    this.logger.info('检测到关键词');
    
    // 提取纯文本（去除CQ码）
    const text = this.extractText(event.raw_message);
    this.logger.info(`消息内容: ${text}`);
    
  }
  
  
  /**
   * 回复消息
   */
  async replyToEvent(event, message, throwError = true) {
    try {
      if (event.message_type === 'group') {
        await this.callApi('send_group_msg', {
          group_id: event.group_id,
          message: message
        });
      } else {
        await this.callApi('send_private_msg', {
          user_id: event.user_id,
          message: message
        });
      }
    } catch (error) {
      this.logger.error('发送消息失败', error);
      this.recordError('api', 'replyToEvent', error);
      
      if (throwError) {
        throw error;
      }
    }
  }
  async onEnable() {
    await super.onEnable();
    this.logger.info('maifriend-finder 已启用');
  }

  async onDisable() {
    await super.onDisable();
    this.logger.info('maifriend-finder 已禁用');
  }

  async onUnload() {
    await super.onUnload();
    this.logger.info('maifriend-finder 已卸载');
  }
}
