// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 购买订单账单 GET /bill/order */
export async function getBillOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBillOrderParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: {
      list: {
        id: string;
        user_id: string;
        total_amount: string;
        status: string;
        created_at: string;
        updated_at: any;
        shop_id: string;
        token: any;
      }[];
      total: number;
      current: number;
      size: number;
    };
    message: string;
  }>('/bill/order', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 算力账单 GET /bill/token */
export async function getBillToken(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBillTokenParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data: {
      list: {
        id: string;
        chat_id: string;
        user_id: string;
        amount: number;
        type: 'add' | 'reducing';
        created_at: string;
        desc: string;
        balance?: number;
      }[];
      total: number;
      current: number;
      size: number;
    };
  }>('/bill/token', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取token desc GET /bill/token_desc */
export async function getBillTokenDesc(options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data: string[] }>('/bill/token_desc', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取最近七天的token使用量 GET /bill/week_token */
export async function getBillWeekToken(options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data: { date: string; tokens: number }[] }>(
    '/bill/week_token',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
