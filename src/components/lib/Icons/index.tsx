import { IconsEnum } from "../../../types/icons.enum";
import {
  SettingOutlined,
  CalendarOutlined,
  CodeSandboxOutlined,
  InboxOutlined,
  SnippetsOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import React from "react";

import "./style.scss";

export default {
  [IconsEnum.INBOX]: <InboxOutlined style={{ color: "rgb(29, 174, 248)" }} />,
  [IconsEnum.STAR]: <StarTwoTone color="yellow" twoToneColor={"orange"} />,
  [IconsEnum.BOX]: (
    <CodeSandboxOutlined style={{ color: "rgb(200, 187, 123)" }} />
  ),
  [IconsEnum.SNIPPET]: (
    <SnippetsOutlined style={{ color: "rgb(55, 165, 155)" }} />
  ),
  [IconsEnum.CALENDAR]: <CalendarOutlined />,
  [IconsEnum.SETTINGS]: <SettingOutlined />,
};
