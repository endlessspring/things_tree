import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

import "./sidebar.footer.scss";

export const SidebarFooter: React.FC = observer(() => {
  const { onListAdd } = useContext(SidebarContext);

  return (
    <div className="tt-sidebar-footer">
      <button className="footer-button" onClick={onListAdd}>
        Add List
      </button>
    </div>
  );
});
