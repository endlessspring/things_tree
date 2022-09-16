import { Sidebar } from "./Sidebar";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import React from "react";

export default observer(() => {
  let { listsStore } = useStore();

  const handleListAdding = () => listsStore.addList();

  const handleListClick = (id: number) => listsStore.setSelected(id);

  return (
    <Sidebar
      selected_list={listsStore.selected_list}
      system_lists={listsStore.system_lists}
      custom_lists={listsStore.custom_lists}
      onListClick={handleListClick}
      onListAdd={handleListAdding}
    />
  );
});
