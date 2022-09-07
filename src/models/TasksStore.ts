import {
  cast,
  getRoot,
  Instance,
  SnapshotIn,
  SnapshotOrInstance,
  types,
} from "mobx-state-tree";
import { RootStoreInstance } from "./RootStore";

export type TaskModelType = Instance<typeof Task>;

export const Task = types
  .model({
    id: types.identifierNumber,
    title: types.maybeNull(types.string),
    checked: types.optional(types.boolean, false),
    list_id: types.number,
  })
  .views((self) => ({
    get is_selected(): boolean {
      const { tasksStore } = getRoot<RootStoreInstance>(self);
      return tasksStore?.selected_task?.id === self.id;
    },
    get list(): any {
      const { listsStore } = getRoot<RootStoreInstance>(self);
      return listsStore.getListById(self.list_id);
    },
  }))
  .actions((self) => {
    const update = (task: SnapshotOrInstance<typeof self>) => {
      self.title = task.title || null;
      self.checked = task.checked || false;
      self.list_id = task.list_id || self.list_id;
    };

    const select = () => {
      getRoot<RootStoreInstance>(self).tasksStore?.setSelected(self.id);
    };

    const remove = () => {
      getRoot<RootStoreInstance>(self).tasksStore?.deleteTask(self.id);
    };

    const unselect = () => {
      getRoot<RootStoreInstance>(self).tasksStore?.setSelected(null);
    };

    return { update, select, remove, unselect };
  });

export const TasksStore = types
  .model({
    selected_task: types.maybeNull(types.safeReference(Task)),
    tasks: types.optional(types.array(Task), []),
  })
  .views((self) => ({
    getTasksByListId(list_id: number) {
      return self.tasks.filter((item) => item.list_id === list_id);
    },
    getTaskById(id: number | null) {
      return self.tasks.find((item) => item.id === id) || null;
    },
  }))
  .actions((self) => {
    const setSelected = (id: number | null) => {
      self.selected_task = self.getTaskById(id);
    };

    const createTask = (task: SnapshotIn<TaskModelType>) => {
      self.tasks.push(cast(task));
    };

    const deleteTask = (id: number) => {
      self.tasks = cast(self.tasks.filter((task) => task.id !== id));
    };

    return { createTask, deleteTask, setSelected };
  });
