import { Modal, Table, TabPane, Tabs } from "@douyinfe/semi-ui";
import { useState } from "react";
import TokensBill from "./tokens-bill";
import PaymentBill from "./payment-bill";

const BillDetails = () => {
  return (
    <Tabs tabPaneMotion={false}>
      <TabPane tab="算力明细" itemKey="tokens">
        <TokensBill />
      </TabPane>
      <TabPane tab="购买记录" itemKey="payment">
        <PaymentBill />
      </TabPane>
    </Tabs>
  );
};

export default BillDetails;
