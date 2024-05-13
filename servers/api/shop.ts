// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 商品展示 GET /shop */
export async function getShop(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: {
      id: string;
      title: string;
      tokens: number;
      price: string;
      desc: any;
      origin_price: any;
    }[];
  }>('/shop', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 支付宝支付 GET /shop/alipay */
export async function getShopAlipay(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShopAlipayParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: string; message: string }>('/shop/alipay', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 请求支付 POST /shop/pay */
export async function postShopPay(
  body: {
    pay_type: string;
    shop_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: { order_id: string }; message: string }>('/shop/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}

/** 用户确认支付 POST /shop/pay_confirm */
export async function postShopPayConfirm(
  body: {
    order_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: { status: string; order_id: string }; message: string }>(
    '/shop/pay_confirm',
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

/** 微信支付 POST /shop/wxpay */
export async function postShopWxpay(
  body: {
    order_id: string;
    h5: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: { url: string }; message: string }>('/shop/wxpay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    ...(options || {}),
  });
}
