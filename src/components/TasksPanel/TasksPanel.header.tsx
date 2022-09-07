import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TasksPanelContext } from "./TasksPanel";
import { useForm } from "react-hook-form";

import "./TasksPanel.header.scss";
import icons from "../lib/icons";
import { IconsEnum } from "../../types/icons.enum";
import { Space } from "antd";

type Props = {};

export const TasksPanelHeader: React.FC<Props> = observer(() => {
  const { selected_list } = useContext(TasksPanelContext);

  const { register, handleSubmit } = useForm({
    mode: "all",
    defaultValues: { name: "", description: "" },
  });

  const handleChange = handleSubmit(
    (data) => {
      selected_list?.setName(data.name);
    },
    (errors) => {
      console.log(errors);
    }
  );

  return (
    <div className={"tt-tasks_panel-header"}>
      <form onChange={handleChange}>
        <div style={{ fontSize: 20, display: "flex", alignItems: "center" }}>
          <Space>
            {icons[selected_list?.icon as IconsEnum]}
            <input
              className={"header-title-input"}
              value={selected_list?.name}
              {...register("name", {
                minLength: 3,
                disabled: selected_list?.is_system,
              })}
            />
          </Space>
        </div>
      </form>
    </div>
  );
});
