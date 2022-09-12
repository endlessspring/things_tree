import { IconsEnum } from "../../types/icons.enum";
import {
  CalendarOutlined,
  CodeSandboxOutlined,
  InboxOutlined,
  SnippetsOutlined,
  StarOutlined,
} from "@ant-design/icons";
import React from "react";

export default {
  [IconsEnum.INBOX]: <InboxOutlined />,
  [IconsEnum.STAR]: <StarOutlined />,
  [IconsEnum.BOX]: <CodeSandboxOutlined />,
  [IconsEnum.SNIPPET]: <SnippetsOutlined />,
  [IconsEnum.CALENDAR]: <CalendarOutlined />,
};