"use client";
import AppList from "@/app/components/apps/app-list";
import AppsSkeleton from "@/app/components/apps/app-list/skeleton";
import AppSearch from "@/app/components/apps/app-search";
import TagLink from "@/app/components/apps/tag-link";
import SemiIcon, { SemiIconName } from "@/app/components/base/icons/semi-icon";
import { getRoleList, getRoleTagList } from "@/servers/api/role";
import { getUserRoleLike } from "@/servers/api/user";
import { useChatStore } from "@/stores/chat";
import { IconGridView, IconLikeHeart } from "@douyinfe/semi-icons";
import { Empty, Pagination, Spin } from "@douyinfe/semi-ui";
import { usePagination, useRequest } from "ahooks";
import { produce } from "immer";
import Image from "next/image";
import { useEffect } from "react";

interface Props {
  searchParams: {
    tag?: string;
    keyword?: string;
    favorite?: string;
  };
}

const Apps = ({ searchParams: { tag, keyword, favorite } }: Props) => {
  const isFavorite = favorite === "1";

  const { data: tags } = useRequest(() => getRoleTagList({ cache: true }));

  const { data, pagination, loading } = usePagination(
    async ({ current, pageSize }) => {
      const params = {
        page: current,
        page_size: pageSize,
      };
      return isFavorite
        ? getUserRoleLike(params, { cache: true })
        : getRoleList(
            { ...params, tag_id: tag, search: keyword },
            { cache: true }
          );
    },
    {
      defaultPageSize: 24,
      refreshDeps: [tag, keyword, isFavorite],
    }
  );

  const { list, total } = data ?? {};
  const { pageSize, current, onChange } = pagination;

  return (
    <div className="flex h-[calc(100vh-3.5rem)] bg-gray-100">
      <div className="w-56 border-r p-4 hidden md:block">
        <div className="text-text-2 text-xs mb-2">探索</div>
        <TagLink active={!tag && !isFavorite} href={`/apps`}>
          <IconGridView />
          所有
        </TagLink>
        <TagLink href={`/apps?favorite=1`} active={isFavorite}>
          <IconLikeHeart />
          我的收藏
        </TagLink>

        <div className="text-text-2 text-xs mb-2">助手分类</div>
        {tags?.map((item) => (
          <TagLink
            active={tag === item.id}
            key={item.id}
            href={`/apps?tag=${item.id}`}
          >
            <SemiIcon name={item.icon as SemiIconName} />
            {item.name}
          </TagLink>
        ))}
      </div>
      <div className="p-5 flex-1 overflow-y-auto">
        <AppSearch />
        <AppsSkeleton loading={loading && !list?.length}>
          <Spin spinning={loading && !!list?.length}>
            {!loading && !list?.length ? (
              <Empty
                image={
                  <Image
                    src="/images/result-empty.svg"
                    width={250}
                    height={250}
                    alt="empty"
                  />
                }
                description={
                  keyword ? `未找到 “${keyword}” 相关的助手` : "暂无助手"
                }
              />
            ) : (
              <>
                <AppList apps={list} />
                <Pagination
                  showTotal
                  showSizeChanger
                  className="mt-5"
                  total={total}
                  currentPage={current}
                  pageSize={pageSize}
                  onChange={onChange}
                />
              </>
            )}
          </Spin>
        </AppsSkeleton>
      </div>
    </div>
  );
};

export default Apps;
