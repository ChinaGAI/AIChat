// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 删除会话 DELETE /chat */
export async function deleteChat(
  body: {
    chat_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number }>('/chat', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}

/** 新建 发送信息 POST /chat_new/message */
export async function postChatNewMessage(
  body: {
    role_id?: string;
    model_id?: string;
    client_id?: string;
    content?: string;
    use_context?: number;
    is_temp?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: { chat: API.Chat; prompt_token: number } }>(
    '/chat_new/message',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
      ...(options || {}),
    },
  );
}

/** 获取会话信息 GET /chat/detail */
export async function getChatDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatDetailParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.Chat }>('/chat/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取对话历史 GET /chat/history */
export async function getChatHistory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.ChatMessage[] }>('/chat/history', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取会话列表 GET /chat/list */
export async function getChatList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data: { list: API.Chat[]; total: number; current: number; size: number };
  }>('/chat/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 调用现有 发送信息 POST /chat/message */
export async function postChatMessage(
  body: {
    chat_id: string;
    client_id: string;
    content: string;
    is_retry?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: { prompt_token: number; reply_token: number } }>(
    '/chat/message',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      ...(options || {}),
    },
  );
}

/** 暂停输出 POST /chat/stop */
export async function postChatStop(
  body: {
    stop_id?: string;
    index?: number;
    last_msg?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: number }>('/chat/stop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    ...(options || {}),
  });
}
