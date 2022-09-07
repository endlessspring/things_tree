import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { TasksPanel } from "./TasksPanel";
import {DefaultListsEnum} from "../../types/defaultLists.enum";

export default observer(() => {
  const { listsStore } = useStore();

  return <TasksPanel selected_list={listsStore.selected_list} />;
});
