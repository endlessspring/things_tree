import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { TasksPanelContext } from "./TasksPanel";

import "./TasksPanel.header.scss";
import icons from "../lib/Icons";
import { IconsEnum } from "../../types/icons.enum";
import { Button, Dropdown, Menu, Select, Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import TTProgress from "../lib/Progress";

type Props = {};

export const TasksPanelHeader: React.FC<Props> = observer(() => {
  const { selected_list } = useContext(TasksPanelContext);
  
  const { t } = useTranslation()

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
          <Space align={"center"}>
            {icons[selected_list?.icon as IconsEnum] || (
              <TTProgress progress={selected_list?.progress} size={30} />
            )}
            <input
              className={"header-title-input"}
              value={selected_list?.name}
              {...register("name", {
                minLength: 3,
                disabled: selected_list?.is_system,
              })}
            />

            {!selected_list?.is_system && (
              <Dropdown
                overlay={
                  <Menu
                    theme={"dark"}
                    items={[
                      {
                        key: 1,
                        label: t("common.deleteList"),
                        onClick: () => selected_list?.remove(),
                      },
                      {
                        key: 2,
                        label: "Завершить проект",
                        onClick: () => selected_list?.remove(),
                      },
                      {
                        key: 3,
                        label: "Добавить теги",
                        onClick: () => console.log('tags'),
                      },
                      {
                        key: 4,
                        label: t('"common.dupliacateList"'),
                        onClick: () => selected_list?.duplicate(),
                      },
                    ]}
                  />
                }
              >
                <Button type={"text"} icon={<EllipsisOutlined />} />
              </Dropdown>
            )}
          </Space>
        </div>
      </form>
    </div>
  );
});
