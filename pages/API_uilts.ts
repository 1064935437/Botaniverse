import util from '@ohos.util';

export interface XunfeiAPIConfig {
  hostUrl: string;
  appId: string;
  apiKey: string;
  apiSecret: string;
}

// 生成RFC1123格式的日期
export function getDate(): string {
  return new Date().toUTCString();
}





// 修改 ArrayBuffer 转 Base64 函数
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer);
  const textDecoder = new util.TextDecoder();
  const binaryString = textDecoder.decode(uint8Array);
  let base64 = '';
  try {
    base64 = globalThis.btoa(binaryString);
  } catch (e) {
    // 如果 btoa 不可用，使用自定义的 base64 编码实现
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    for (let i = 0; i < uint8Array.length; i += 3) {
      const chunk = (uint8Array[i] << 16) | (uint8Array[i + 1] << 8) | uint8Array[i + 2];
      result += chars[(chunk >> 18) & 63];
      result += chars[(chunk >> 12) & 63];
      result += chars[(chunk >> 6) & 63];
      result += chars[chunk & 63];
    }
    const paddingLength = uint8Array.length % 3;
    if (paddingLength > 0) {
      result = result.slice(0, result.length - (3 - paddingLength));
      while (result.length % 4 !== 0) {
        result += '=';
      }
    }
    base64 = result;
  }
  return base64;
}

// 更新请求体构建函数
export function buildRequestBody(messages: Array<{role: string, content: string}>) {
  return {
    header: {
      app_id: config.appId
    },
    parameter: {
      chat: {
        domain: "general",    // 通用大模型
        temperature: 0.5,     // 温度值
        max_tokens: 4096,     // 最大生成长度
        top_k: 4,            // 从k个候选中随机选择
        chat_id: undefined    // 对话id，首次不用传递
      }
    },
    payload: {
      message: {
        text: messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      }
    }
  };
}

// 更新响应解析函数
export function parseResponse(response: any) {
  if (response?.header?.code !== 0) {
    throw new Error(`请求失败: ${response?.header?.message || '未知错误'}`);
  }

  const text = response?.payload?.choices?.text?.[0];
  if (!text) {
    throw new Error('响应格式错误');
  }

  return {
    content: text.content,
    role: text.role,
    status: response.header.status
  };
}

// 更新配置
const config: XunfeiAPIConfig = {
  hostUrl: 'spark-api.xf-yun.com',
  appId: '',  // 在讯飞开放平台获取
  apiKey: '', // 在讯飞开放平台获取
  apiSecret: '' // 在讯飞开放平台获取
};
