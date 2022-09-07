import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TasksPanelContext } from "./TasksPanel";
import TasksPanelListTask from "./TasksPanel.list.task";

import "./TasksPanel.list.scss";

type TasksPanelListProps = {};

const TasksPanelList: React.FC<TasksPanelListProps> = observer(() => {
  const { selected_list } = useContext(TasksPanelContext);
  return (
    <div className={"tt-task_list"}>
      {selected_list?.tasks.map((item) => (
        <TasksPanelListTask key={item.id} task={item} />
      ))}
    </div>
  );
});

export default TasksPanelList;
