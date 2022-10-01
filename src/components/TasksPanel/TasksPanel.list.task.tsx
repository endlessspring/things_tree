import React from "react";
import { observer } from "mobx-react-lite";
import { TaskModelType } from "../../models/TasksStore";
import classNames from "classnames";

import { useForm, Controller } from "react-hook-form";
import { getSnapshot } from "mobx-state-tree";
import { Button, Select, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useStore } from "../../hooks/useStore";
import DatePicker from "../lib/DatePicker";

import "./TasksPanel.list.task.scss";

type TasksPanelListTaskProps = { task: TaskModelType };

const TasksPanelListTask: React.FC<TasksPanelListTaskProps> = observer(
  ({ task }) => {
    const { register, handleSubmit, control } = useForm({
      defaultValues: { ...getSnapshot(task) },
    });

    const store = useStore();

    const submit = handleSubmit((data) => {
      task.update(data);
    });

    const handleKeyboardKey: React.KeyboardEventHandler = (e) => {
      if (e.code === "Enter") {
        submit();
        task.list?.addTask();
      }
    };

    return (
      <div
        className={classNames({
          "tt-task_list-task": true,
          "tt-task_list-task--selected": task.is_selected,
        })}
      >
        <div className="task-header">
          <Controller
            name={"checked"}
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  submit();
                }}
                className={"task-checkbox"}
              />
            )}
          />
          {task.date && <div className="task-header-date">{task.date}</div>}
          <input
            className={"task-title"}
            placeholder="Новая задача"
            autoComplete="off"
            onClick={task.select}
            onKeyUp={handleKeyboardKey}
            autoFocus
            {...register("title", { onBlur: submit })}
          />
        </div>
        <div className="task-content">
          <div className="task-body">
            <textarea name="" id="" placeholder="Заметка" />
          </div>
          <div className="task-footer">
            <div>
              <Controller
                name={"list_id"}
                control={control}
                render={({ field }) => {
                  submit();
                  return (
                    <Select
                      {...field}
                      dropdownMatchSelectWidth={false}
                      removeIcon
                      bordered={false}
                    >
                      {store.listsStore.lists.map((list) => (
                        <Select.Option key={list.id} value={list.id}>
                          {list.name}
                        </Select.Option>
                      ))}
                    </Select>
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name={"date"}
                control={control}
                render={({ field }) => {
                  submit();
                  return (
                    <DatePicker onChange={field.onChange} value={field.value} />
                  );
                }}
              />
              <Button
                onClick={task.remove}
                type={"text"}
                icon={<DeleteOutlined />}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default TasksPanelListTask;
