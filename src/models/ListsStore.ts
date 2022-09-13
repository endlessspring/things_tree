import { DEFAULT_DATE_FORMAT } from './../utils/index';
import moment from 'moment';
import { isLoading } from './shared/isLoading';
import { cast, getRoot, Instance, onPatch, types } from 'mobx-state-tree';
import { IconsEnum } from '../types/icons.enum';
import { DefaultListsEnum } from '../types/defaultLists.enum';
import { TaskModelType } from './TasksStore';
import { RootStoreInstance } from './RootStore';

export type ListModelType = Instance<typeof List>;

export const List = types
    .model({
        id: types.identifierNumber,
        name: types.string,
        is_system: types.optional(types.boolean, false),
        is_loading: isLoading,
        is_today: types.optional(types.boolean, false),
        icon: types.maybeNull(types.enumeration<IconsEnum>([...Object.values(IconsEnum)])),
    })
    .views(self => ({
        get tasks(): TaskModelType[] {
            if (self.is_today) {
                return getRoot<RootStoreInstance>(self).tasksStore.getTasksByDate(moment().format(DEFAULT_DATE_FORMAT));
            }

            return getRoot<RootStoreInstance>(self).tasksStore.getTasksByListId(self.id);
        },
        get progress() {
            const tasks_count = this.tasks.length;
            const completed_tasks_count = this.tasks.filter(task => task.checked).length;

            return (completed_tasks_count / tasks_count) * 100 || null;
        },
    }))
    .actions(self => {
        const fetchUpdateList = (list: ListModelType) => {
            self.is_loading = true;
            self.is_loading = false;
        };

        const addTask = () => {
            const { tasksStore } = getRoot<RootStoreInstance>(self);

            const id = Math.random();

            tasksStore.createTask({
                id,
                title: '',
                list_id: self.id,
                checked: false,
                date: self.is_today ? moment().format(DEFAULT_DATE_FORMAT) : null,
            });

            tasksStore.setSelected(id);
        };
        const setName = (name: string) => (self.name = name);

        return { setName, addTask };
    });

export const ListsStore = types
    .model({
        selected_list: types.maybeNull(types.reference(List)),
        lists: types.optional(types.array(List), []),
        is_loading: isLoading,
    })
    .views(self => ({
        getListById(id: number) {
            return self.lists.find(item => item.id === id) || null;
        },
    }))
    .actions(self => {
        const setLists = (lists: ListModelType[]) => {
            self.lists = cast(lists);
        };

        const addList = () => {
            const new_list = List.create({ id: Math.random(), name: 'Новый список' });
            self.lists.push(new_list);
            return new_list;
        };

        const setSelected = (id: number) => {
            const list = self.getListById(id);
            if (list) {
                self.selected_list = list;
            }
        };

        function afterCreate() {
            void setLists([
                List.create({
                    id: DefaultListsEnum.INBOX,
                    name: 'Inbox',
                    is_system: true,
                    icon: IconsEnum.INBOX,
                }),
                List.create({
                    id: DefaultListsEnum.TODAY,
                    name: 'Today',
                    is_today: true,
                    is_system: true,
                    icon: IconsEnum.STAR,
                }),
                List.create({
                    id: DefaultListsEnum.SOMETIME,
                    name: 'Sometime',
                    is_system: true,
                    icon: IconsEnum.BOX,
                }),
                List.create({
                    id: DefaultListsEnum.ANYTIME,
                    name: 'Anytime',
                    is_system: true,
                    icon: IconsEnum.SNIPPET,
                }),
            ]);

            void setSelected(1);
        }

        onPatch(self, patch => {
            if (patch.path === '/selected_list') {
                getRoot<RootStoreInstance>(self).tasksStore.setSelected(null);
            }
        });

        return { addList, setSelected, afterCreate };
    });
