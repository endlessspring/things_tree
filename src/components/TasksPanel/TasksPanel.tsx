import React from "react";
import { ListModelType } from "../../models/ListsStore";
import { observer } from "mobx-react-lite";
import { TasksPanelHeader } from "./TasksPanel.header";
import TasksPanelList from "./TasksPanel.list";

import "./TasksPanel.scss";

import { PlusOutlined } from "@ant-design/icons";

export type TasksPanelProps = {
  selected_list?: ListModelType | null;
};

export const TasksPanelContext = React.createContext<TasksPanelProps>({
  selected_list: null,
});

export const TasksPanel: React.FC<TasksPanelProps> = observer((props) => {
  return (
    <TasksPanelContext.Provider value={props}>
      <div className="tt-tasks_panel">
        <TasksPanelHeader />
        <TasksPanelList />
        <button
          className={"tt-add-button"}
          onClick={props.selected_list?.addTask}
        >
          <PlusOutlined/>
        </button>
      </div>
    </TasksPanelContext.Provider>
  );
});
