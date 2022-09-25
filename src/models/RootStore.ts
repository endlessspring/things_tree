import { Instance, types } from "mobx-state-tree";
import { ListsStore } from "./ListsStore";
import { TasksStore } from "./TasksStore";
import { SettingsStore } from "./SettingsStore";

export type RootStoreInstance = Instance<typeof RootStore>;

const RootStore = types.model({
  listsStore: types.optional(ListsStore, {}),
  tasksStore: types.optional(TasksStore, {}),
  settingsStore: types.optional(SettingsStore, {}),
});

export default RootStore.create();
