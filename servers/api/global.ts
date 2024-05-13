// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 图片验证码 GET /captcha/image */
export async function getCaptchaImage(options?: { [key: string]: any }) {
  return request<{ code: number; data: { img: string; key: string }; message: string }>(
    '/captcha/image',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取配置信息 GET /config */
export async function getConfig(options?: { [key: string]: any }) {
  return request<{ code: number; data: API.Config }>('/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 发送邮件 POST /email */
export async function postEmail(
  body: {
    email: string;
    captcha: string;
    scene: 'signup' | 'bind' | 'reset';
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number }>('/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}

/** 密码登录 POST /login */
export async function postLogin(
  body: {
    account: string;
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: { token: string } }>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}

/** 短信登录 POST /login/sms */
export async function postLoginSms(
  body: {
    phone: string;
    code: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: { token: string } }>('/login/sms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}

/** 微信登录 POST /login/wechat */
export async function postLoginWechat(options?: { [key: string]: any }) {
  return request<{ code: number }>('/login/wechat', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 重置密码 POST /pwd_reset */
export async function postPwdReset(
  body: {
    email?: string;
    password?: string;
    code?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number }>('/pwd_reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    ...(options || {}),
  });
}

/** 发送短信 POST /sms */
export async function postSms(
  body: {
    scene: 'bind' | 'login';
    captcha: string;
    phone: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number }>('/sms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}

/** 图片上传 POST /upload/image */
export async function postUploadImage(body: {}, file?: File, options?: { [key: string]: any }) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<{ code: number; data: { url: string }; message: string }>(
    '/upload/image',
    {
      method: 'POST',
      body: formData,
      ...(options || {}),
    },
    {
      deleteContentType: true,
    },
  );
}
