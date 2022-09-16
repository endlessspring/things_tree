import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

import "./sidebar.footer.scss";
import { PlusOutlined } from "@ant-design/icons";
import { Space } from "antd";

export const SidebarFooter: React.FC = observer(() => {
  const { onListAdd } = useContext(SidebarContext);

  return (
    <div className="tt-sidebar-footer">
      <button className="footer-button" onClick={onListAdd}>
        <Space align={"center"}>
          <PlusOutlined />
          Add List
        </Space>
      </button>
    </div>
  );
});
