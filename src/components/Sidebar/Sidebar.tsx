import React, { createContext } from "react";
import { ListModelType } from "../../models/ListsStore";
import { SidebarFooter } from "./Sidebar.footer";
import { SidebarList } from "./Sidebar.list";

import "./sidebar.scss";
import { observer } from "mobx-react-lite";

export type SidebarProps = {
  selected_list: ListModelType | null;
  lists: ListModelType[];
  onListClick: (id: number) => void;
  onListAdd: () => void;
};

export const SidebarContext = createContext<SidebarProps>({
  selected_list: null,
  lists: [],
  onListClick: () => {},
  onListAdd: () => {},
});

export const Sidebar: React.FC<SidebarProps> = observer((props) => {
  return (
    <SidebarContext.Provider value={props}>
      <div className="tt-sidebar">
        <SidebarList />
        <SidebarFooter />
      </div>
    </SidebarContext.Provider>
  );
});
