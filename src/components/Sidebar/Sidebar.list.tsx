import { observer } from "mobx-react-lite";
import React, { useCallback, useContext } from "react";
import { IconsEnum } from "../../types/icons.enum";
import { SidebarContext } from "./Sidebar";
import { SidebarItem } from "./Sidebar.item";

import "./sidebar.list.scss";

export const SidebarList: React.FC = observer(() => {
  const { selected_list, lists, onListClick } = useContext(SidebarContext);

  const handleListClick = useCallback(
    (id: number) => () => {
      onListClick(id);
    },
    []
  );

  return (
    <div className="tt-sidebar-list">
      {lists.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon as IconsEnum}
          name={item.name}
          onClick={handleListClick(item.id)}
          selected={selected_list?.id === item.id}
        />
      ))}
    </div>
  );
});
