import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

import "./sidebar.footer.scss";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import icons from "../lib/Icons";
import { IconsEnum } from "../../types/icons.enum";

export const SidebarFooter: React.FC = observer(() => {
  const { onListAdd, onSettingsOpen } = useContext(SidebarContext);

  return (
    <div className="tt-sidebar-footer">
      <button className="footer-add-button" onClick={onListAdd}>
        <Space align={"center"}>
          <PlusOutlined />
          Add List
        </Space>
      </button>
      <button onClick={onSettingsOpen}>{icons[IconsEnum.SETTINGS]}</button>
    </div>
  );
});
