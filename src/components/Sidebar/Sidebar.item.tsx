import classnames from 'classnames';

import { IconsEnum } from '../../types/icons.enum';

import './sidebar.item.scss';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { Progress, Space } from 'antd';
import icons from '../lib/Icons';

type Props = {
    name: string;
    icon: IconsEnum;
    onClick: () => void;
    selected: boolean;
    progress: number;
};

export const SidebarItem: React.FC<Props> = observer(({ name, icon, selected, onClick, progress }) => {
    return (
        <div
            className={classnames({
                'tt-sidebar-item': true,
                'tt-sidebar-item--selected': selected,
            })}
            onClick={onClick}
        >
            <Space>
                <div className="item-icon">
                    {icons[icon] || (
                        <Progress
                            type="circle"
                            percent={progress}
                            width={15}
                            size={'default'}
                            strokeLinecap={'round'}
                            strokeColor={'#1890ff'}
                            trailColor={'lightgray'}
                            showInfo={false}
                            strokeWidth={15}
                            
                        />
                    )}
                </div>
                <div className="item-name">{name}</div>
            </Space>
        </div>
    );
});
// TODO написать свитчер для иконок

