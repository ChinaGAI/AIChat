"use server";

export type CacheState = {
  requestCache: Record<string, any>;
};

export const initialCacheState: CacheState = {
  requestCache: {},
};
