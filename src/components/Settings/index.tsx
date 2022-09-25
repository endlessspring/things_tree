import React, { useCallback } from "react";
import { Button, Modal, Switch, Select } from "antd";
import { useStore } from "../../hooks/useStore";
import { LANG_ENUM } from "../../types/lang.enum";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

export default observer(() => {
  const { t } = useTranslation();
  const {
    settingsStore: { setLang, visible, setVisibility, lang },
  } = useStore();

  const handleCancel = () => setVisibility(false);

  const handleLangChange = (lang: LANG_ENUM) => setLang(lang);

  return (
    <Modal
      centered
      open={visible}
      title={t("common.settings")}
      onCancel={handleCancel}
      footer={null}
    >
      <Select value={lang} dropdownMatchSelectWidth onSelect={handleLangChange}>
        {Object.values(LANG_ENUM).map((lang) => (
          <Select.Option value={lang}> {t(`lang.${lang}`)} </Select.Option>
        ))}
      </Select>
    </Modal>
  );
});
