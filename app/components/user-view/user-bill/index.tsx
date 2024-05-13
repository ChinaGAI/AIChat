import { Progress } from "@douyinfe/semi-ui";
import PlansModal from "./plans-modal";
import UsageChart from "./usage-chart";
import { useGlobalStore } from "@/stores";
import numeral from "numeral";

const UserBill = () => {
  const { userProfile } = useGlobalStore();

  const usedTokens = userProfile!.all_tokens - userProfile!.tokens;

  return (
    <>
      <div className="rounded-xl select-none bg-fill-0 mb-5">
        <div className="flex justify-between px-6 py-5 items-center">
          <div>
            <div className="leading-[18px] text-xs font-normal text-text-2">
              当前余额
            </div>
            <div className="text-text-0 leading-[125%] text-lg font-semibold mt-1 uppercase">
              {numeral(userProfile?.tokens).format("0.[00]ac")} 算力
            </div>
          </div>
          <PlansModal />
        </div>
        <div className="rounded-xl bg-white px-6 py-3 shadow">
          <div className="py-3">
            <div className="flex justify-between h-5 items-center">
              <div className="flex items-center">
                <div className="mx-1 leading-5 text-sm font-medium text-text-1">
                  累计使用情况
                </div>
              </div>
              <div className="flex items-center leading-[18px] text-[13px] font-normal">
                <div className="text-text-2 uppercase">
                  {numeral(usedTokens).format("0.[00]ac")} 算力
                </div>
                <div className="mx-1 text-gray-300">/</div>
                <div className="text-text-2 uppercase">
                  {numeral(userProfile?.all_tokens).format("0.[00]ac")} 算力
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Progress
                percent={
                  numeral(
                    (100 * usedTokens) / userProfile!.all_tokens
                  ).value() ?? 0
                }
                aria-label="usage"
                className="h-2"
                stroke="var(--semi-color-primary)"
              />
            </div>
          </div>
        </div>
      </div>
      <UsageChart />
    </>
  );
};

export default UserBill;
