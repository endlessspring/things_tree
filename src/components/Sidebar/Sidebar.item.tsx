import classnames from "classnames";

import { IconsEnum } from "../../types/icons.enum";

import "./sidebar.item.scss";
import { observer } from "mobx-react-lite";
import React from "react";

import { Space } from "antd";
import icons from "../lib/icons";

type Props = {
  name: string;
  icon: IconsEnum;
  onClick: () => void;
  selected: boolean;
};

export const SidebarItem: React.FC<Props> = observer(
  ({ name, icon, selected, onClick }) => {
    return (
      <div
        className={classnames({
          "tt-sidebar-item": true,
          "tt-sidebar-item--selected": selected,
        })}
        onClick={onClick}
      >
        <Space>
          <div className="item-icon">{icons[icon]}</div>
          <div className="item-name">{name}</div>
        </Space>
      </div>
    );
  }
);
// TODO написать свитчер для иконок
