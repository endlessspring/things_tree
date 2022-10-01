import { observer } from "mobx-react-lite";
import React, { useCallback, useContext } from "react";
import { IconsEnum } from "../../types/icons.enum";
import { SidebarContext } from "./Sidebar";
import { SidebarItem } from "./Sidebar.item";

import "./sidebar.list.scss";
import { ListModelType } from "../../models/ListsStore";
import classnames from "classnames";

type Props = {
  lists: ListModelType[];
  className?: string;
};

export const SidebarList: React.FC<Props> = observer(({ lists, className }) => {
  const { selected_list, onListClick } = useContext(SidebarContext);

  const handleListClick = useCallback(
    (id: number) => () => {
      onListClick(id);
    },
    []
  );

  return (
    <div
      className={classnames({
        "tt-sidebar-list": true,
        [className as string]: !!className,
      })}
    >
      {lists.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon as IconsEnum}
          name={item.name}
          onClick={handleListClick(item.id)}
          selected={selected_list?.id === item.id}
          progress={item.progress || 0}
        />
      ))}
    </div>
  );
});
