import { LineConfig } from "@ant-design/plots";
import { Spin } from "@douyinfe/semi-ui";
import dynamic from "next/dynamic";
import { useGlobalStore } from "@/stores";
import { useRequest } from "ahooks";
import { getBillWeekToken } from "@/servers/api/bill";
import numeral from "numeral";

const Line = dynamic(
  () => import("@ant-design/plots").then(({ Line }) => Line),
  { ssr: false }
);

const UsageChart = () => {
  const { isDark } = useGlobalStore();
  const themeColor = isDark ? "#FFFFFF" : "#000000";
  const colors = {
    tickStroke: themeColor,
    labelFill: themeColor,
    lineStroke: themeColor,
  };

  const { data = [], loading } = useRequest(getBillWeekToken);

  const domainMax = Math.max(...data.map((item) => item.tokens)) || 1000;

  const config: LineConfig = {
    data,
    xField: "date",
    yField: "tokens",
    shapeField: "smooth",
    style: { lineWidth: 2 },
    tooltip: {
      name: "消耗算力",
      channel: "y",
      valueFormatter: (value) => numeral(value).format("0.[00]ac"),
    },
    scale: {
      y: {
        type: "linear",
        domainMax,
      },
    },
    axis: {
      x: {
        ...colors,
        line: true,
        range: [0, 1],
      },
      y: {
        ...colors,
      },
    },
  };
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-lg font-bold text-text-0">使用情况</span>
          <span className="text-xs ml-1 text-text-2">仅展示近7天数据</span>
        </div>
      </div>
      <Spin spinning={loading}>
        <div className="h-[480px] w-full">
          <Line {...config} />
        </div>
      </Spin>
    </>
  );
};

export default UsageChart;
