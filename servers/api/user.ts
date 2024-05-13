// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取登录用户信息 GET /user */
export async function getUser(options?: { [key: string]: any }) {
  return request<{ code: number; data: API.UserProfile }>('/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 绑定 POST /user/bind */
export async function postUserBind(
  body: {
    /** email/sms/... */
    type?: string;
    email?: string;
    phone?: string;
    code?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number }>('/user/bind', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    ...(options || {}),
  });
}

/** 退出登录 GET /user/logout */
export async function getUserLogout(options?: { [key: string]: any }) {
  return request<{ code: number }>('/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取登陆用户创建的角色 GET /user/my_role */
export async function getUserMyRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserMyRoleParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data: { list: API.ChatAssistant[]; total: number; current: number; size: number };
  }>('/user/my_role', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 注册 POST /user/register */
export async function postUserRegister(
  body: {
    email: string;
    password: string;
    code: string;
    repass: string;
    invite_code: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number }>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}

/** 收藏角色列表 GET /user/role_like */
export async function getUserRoleLike(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserRoleLikeParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data: { list: API.ChatAssistant[]; total: number; current: number; size: number };
  }>('/user/role_like', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户修改信息 POST /user/update_data */
export async function postUserUpdateData(
  body: {
    avatar?: string;
    nickname?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number }>('/user/update_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    ...(options || {}),
  });
}
