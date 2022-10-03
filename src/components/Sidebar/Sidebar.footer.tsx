import {observer} from "mobx-react-lite";
import React from "react";
import {useContext} from "react";
import {SidebarContext} from "./Sidebar";

import {PlusOutlined} from "@ant-design/icons";
import {Button, Space} from "antd";
import icons from "../lib/Icons";
import {IconsEnum} from "../../types/icons.enum";

import "./sidebar.footer.scss";
import {useTranslation} from "react-i18next";

export const SidebarFooter: React.FC = observer(() => {
    const {t} = useTranslation()

    const {onListAdd, onSettingsOpen} = useContext(SidebarContext);

    return (
        <div className="tt-sidebar-footer">
            <button className="footer-add-button" onClick={onListAdd}>
                <Space align={"center"}>
                    <PlusOutlined/>
                    {t('sidebar.addList')}
                </Space>
            </button>
            <button onClick={onSettingsOpen}>{icons[IconsEnum.SETTINGS]}</button>
        </div>
    );
});
