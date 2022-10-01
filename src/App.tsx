import React from "react";
import Sidebar from "./components/Sidebar";
// @ts-ignore
import TasksPanel from "./components/TasksPanel";
import "./App.scss";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Settings from "./components/Settings";
import { createI18n } from "./i18n";

createI18n();

function App() {
  return (
    <div className="App">
      <Layout>
        <Layout.Sider>
          <Sidebar />
        </Layout.Sider>
        <Layout.Content>
          <TasksPanel />
        </Layout.Content>
      </Layout>
      <Settings />
    </div>
  );
}

export default App;
