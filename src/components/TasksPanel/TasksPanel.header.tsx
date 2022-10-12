import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider} from "react-hook-form";

import { TasksPanelContext } from "./TasksPanel";

import "./TasksPanel.header.scss";
import icons from "../lib/Icons";
import { IconsEnum } from "../../types/icons.enum";
import { Button, Dropdown, Menu, Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import TTProgress from "../lib/Progress";

type Props = {};

export const TasksPanelHeader: React.FC<Props> = observer(() => {
  const { selected_list } = useContext(TasksPanelContext);

  const { t } = useTranslation();

  const { register, handleSubmit, setValue } = useForm({
    mode: "all",
    defaultValues: { name: selected_list?.name || '', description: "",  }
   });

  useEffect(() => { 
    setValue('name', selected_list?.name || '') 
  }, [selected_list?.id])

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
                        label: t('common.completeProject'),
                        onClick: () => selected_list?.remove(),
                      },
                      {
                        key: 3,
                        label: t("common.addTags"),
                        onClick: () => console.log("tags"),
                      },
                      {
                        key: 4,
                        label: t("common.duplicateList"),
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
