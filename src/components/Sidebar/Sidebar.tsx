import React, { createContext } from "react";
import { ListModelType } from "../../models/ListsStore";
import { SidebarFooter } from "./Sidebar.footer";
import { SidebarList } from "./Sidebar.list";

import "./sidebar.scss";
import { observer } from "mobx-react-lite";
import { List } from "antd";

export type SidebarProps = {
  selected_list?: ListModelType | null;
  system_lists: ListModelType[];
  custom_lists: ListModelType[];
  onListClick: (id: number) => void;
  onListAdd: () => void;
};

export const SidebarContext = createContext<SidebarProps>({
  selected_list: null,
  system_lists: [],
  custom_lists: [],
  onListClick: () => {},
  onListAdd: () => {},
});

export const Sidebar: React.FC<SidebarProps> = observer((props) => {
  return (
    <SidebarContext.Provider value={props}>
      <div className="tt-sidebar">
        <div className="tt-sidebar-lists">
          <SidebarList className={'list-system'} lists={props.system_lists} />
          <SidebarList lists={props.custom_lists} />
        </div>
        <SidebarFooter />
      </div>
    </SidebarContext.Provider>
  );
});
