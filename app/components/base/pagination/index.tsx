"use client";
import { Pagination as SemiPagination } from "@douyinfe/semi-ui";
import { PaginationProps } from "@douyinfe/semi-ui/lib/es/pagination";
import { useRouter } from "next-nprogress-bar";

const Pagination = (props: PaginationProps) => {
  const router = useRouter();

  return (
    <SemiPagination
      showTotal
      showSizeChanger
      className="mt-5"
      onPageSizeChange={(pageSize) => {
        router.push(`?page=1&page_size=${pageSize}`);
      }}
      onPageChange={(page) => {
        router.push(`?page=${page}&page_size=${props.pageSize}`);
      }}
      {...props}
    ></SemiPagination>
  );
};

export default Pagination;
