import { Tabs } from "antd";
import React from "react";
import Projects from "./Projects";

function Profile() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Projects" key="1">
        <Projects />
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Profile;