import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TaskModelType } from "../../models/TasksStore";
import classNames from "classnames";

import "./TasksPanel.list.task.scss";
import { useForm, Controller } from "react-hook-form";
import { getSnapshot } from "mobx-state-tree";
import { Button, DatePicker, Select, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useStore } from "../../hooks/useStore";

type TasksPanelListTaskProps = { task: TaskModelType };

const TasksPanelListTask: React.FC<TasksPanelListTaskProps> = observer(
  ({ task }) => {
    const { register, handleSubmit, control } = useForm({
      defaultValues: getSnapshot(task),
    });

    const store = useStore();
    const submit = () => {
      handleSubmit((data) => {
        task.update(data);
      })();
    };

    const handleKeyboardKey: React.KeyboardEventHandler = (e) => {
      if (e.code === "Enter") {
        submit();
        task.list?.addTask();
      }
    };

    return (
      <div
        onClick={task.select}
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
          <input
            className="task-title"
            placeholder="Новая задача"
            onKeyUp={handleKeyboardKey}
            autoFocus
            {...register("title", { onBlur: submit })}
          />
        </div>
        <div className="task-body">
          <textarea name="" id="" placeholder="Заметка" />
        </div>
        <div className="task-footer">
          <div>
            <Controller
              name={"list_id"}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onSelect={submit}
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
              )}
            />
          </div>
          <div>
            <DatePicker bordered={false} showToday={false} />
            <Button
              onClick={task.remove}
              type={"text"}
              icon={<DeleteOutlined />}
            />
          </div>
        </div>
      </div>
    );
  }
);
export default TasksPanelListTask;
