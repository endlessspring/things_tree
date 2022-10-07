import {Instance, types} from "mobx-state-tree";
import {ListsStore} from "./ListsStore";
import {TasksStore} from "./TasksStore";
import {THEMES_ENUM} from "../types/themes.enum";
import {LANG_ENUM} from "../types/lang.enum";
import i18next from "i18next";

export const SettingsStore = types
    .model({
        visible: types.optional(types.boolean, false),
        theme: types.optional(
            types.enumeration(Object.values(THEMES_ENUM)),
            THEMES_ENUM.LIGHT
        ),
        lang: types.optional(
            types.enumeration(Object.values(LANG_ENUM)),
            LANG_ENUM.EN
        ),
    })
    .actions((self) => {
        const setLang = (value: LANG_ENUM) => {
            void i18next.changeLanguage(value);
            self.lang = value;
        };

        const setTheme = (theme: THEMES_ENUM) => {
            self.theme = theme
        }

        const setVisibility = (value: boolean) => {
            self.visible = value;
        };

        return {setLang, setTheme, setVisibility};
    });
