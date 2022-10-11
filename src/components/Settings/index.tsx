import React from "react";
import { Modal, Select } from "antd";
import { useStore } from "../../hooks/useStore";
import { LANG_ENUM } from "../../types/lang.enum";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { THEMES_ENUM } from "../../types/themes.enum";

export default observer(() => {
  const { t } = useTranslation();
  const {
    settingsStore: { setLang, visible, setVisibility, lang, theme, setTheme }
  } = useStore();

  const handleCancel = () => setVisibility(false);

  return (
    <Modal
      centered
      open={visible}
      title={t("common.settings")}
      onCancel={handleCancel}
      footer={null}
    >
      <Select value={lang} dropdownMatchSelectWidth onSelect={setLang}>
        {Object.values(LANG_ENUM).map((lang) => (
          <Select.Option value={lang}> {t(`lang.${lang}`)} </Select.Option>
        ))}
      </Select>

      <Select value={theme} dropdownMatchSelectWidth onSelect={setTheme}>
        {Object.values(THEMES_ENUM).map((theme) => (
          <Select.Option value={theme}> {t(`theme.${theme}`)} </Select.Option>
        ))}
      </Select>

    </Modal>
  );
});
