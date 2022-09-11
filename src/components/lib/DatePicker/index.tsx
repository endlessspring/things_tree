import { Button } from 'antd';
import icons from '../icons';
import { IconsEnum } from '../../../types/icons.enum';
import moment from 'moment/moment';
import React, { useCallback } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';

import './style.scss';
import { DEFAULT_DATE_FORMAT } from '../../../utils';

type Props = {
    onChange?: (value: string) => void;
    onSelect?: () => void;
    value?: string | null;
};

const DatePicker: React.FC<Props> = props => {
    const { onChange } = props;

    const handleTodayClick = useCallback(() => {
        handleChange(moment(new Date()));
    }, []);

    const handleChange = useCallback((moment: moment.Moment | null) => {
        const formattedDate = moment?.format(DEFAULT_DATE_FORMAT);
        if (formattedDate) if (onChange) onChange(formattedDate);
    }, []);

    return (
        <AntdDatePicker
            onChange={handleChange}
            value={props.value ? moment(props.value, DEFAULT_DATE_FORMAT) : null}
            onSelect={props.onSelect}
            bordered={false}
            allowClear={false}
            showToday={false}
            suffixIcon={false}
            superNextIcon={false}
            superPrevIcon={false}
            inputRender={e => <div {...e}>{e.title || 'Введите дату'}</div>}
            renderExtraFooter={() => (
                <div>
                    <Button ghost icon={icons[IconsEnum.STAR]} color={'black'} onClick={handleTodayClick}>
                        Today
                    </Button>
                </div>
            )}
            panelRender={e => (
                <div className="tt-datepicker">
                    <div className="title">When</div>
                    {e}
                </div>
            )}
        />
    );
};

export default DatePicker;

