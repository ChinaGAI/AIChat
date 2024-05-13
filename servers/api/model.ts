// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 模型列表 GET /model/list */
export async function getModelList(options?: { [key: string]: any }) {
  return request<{ code: number; data: API.ModelPlatform[] }>('/model/list', {
    method: 'GET',
    ...(options || {}),
  });
}
