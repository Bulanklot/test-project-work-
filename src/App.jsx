import { Layout, Menu, Button, Drawer } from "antd";
import "./App.css";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { FunctionsPage } from "./pages/FunctionsPage.jsx";
import { ConverterPage } from "./pages/ConverterPage.jsx";
import { Preloader } from "./components/custom-preloader/Preloader.jsx";
import { menuItems } from "./pages/TabItems.jsx";

const { Header, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const onChange = (key) => {
    setCurrentTab(key);
    setCollapsed(false);
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "#001529",
          padding: "0 16px",
        }}
      >
        <Button
          type="text"
          icon={!collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "18px",
            color: "white",
          }}
        />
      </Header>
      <Drawer
        open={collapsed}
        placement="left"
        styles={{
          mask: { background: "transparent" },
          header: { background: "#001529", color: "white" },
          body: { background: "#001529", padding: 0 },
        }}
        width={"10%"}
        mask={true}
        closable={false}
        title="Menu"
        onClose={() => setCollapsed(false)}
        extra={
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "18px",
              color: "white",
            }}
          />
        }
      >
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => onChange(key)}
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Drawer>
      <Layout>
        <Content className="content">
          {currentTab === "1" ? (
            <FunctionsPage />
          ) : currentTab === "2" ? (
            <ConverterPage />
          ) : currentTab === "3" ? (
            <div
              style={{
                width: "100%",
                minHeight: " 95vh",
                background: "rgb(52 34 161)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Preloader />
            </div>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
