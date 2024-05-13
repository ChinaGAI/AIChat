// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取角色信息 GET /role */
export async function getRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.ChatAssistant; message: string }>('/role', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户修改角色 PUT /role */
export async function putRole(
  body: {
    icon?: string;
    name?: string;
    tag_id?: string;
    desc?: string;
    context?: string;
    hello_msg?: string;
    suggestions?: string;
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: string; message: string }>('/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    ...(options || {}),
  });
}

/** 创建角色 POST /role */
export async function postRole(
  body: {
    icon?: string;
    name?: string;
    tag_id?: string;
    desc?: string;
    context?: string;
    hello_msg?: string;
    suggestions?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: { id: string }; message: string }>('/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /role */
export async function deleteRole(
  body: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: string; message: string }>('/role', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}

/** 获取角色标签 GET /role_tag/list */
export async function getRoleTagList(options?: { [key: string]: any }) {
  return request<{ code: number; data: API.AssistantTag[] }>('/role_tag/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新用户收藏角色 POST /role/like */
export async function postRoleLike(
  body: {
    role_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number }>('/role/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}

/** 获取角色列表 GET /role/list */
export async function getRoleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.ChatAssistant[]; total: number; current: number; size: number };
    message: string;
  }>('/role/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
