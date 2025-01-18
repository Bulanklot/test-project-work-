import { tabItems } from "./pages/tab-items.jsx";

import { Layout, Tabs } from "antd";
import "./App.css";

const { Header, Footer, Content } = Layout;

function App() {

  return (
    <Layout>
      <Header className="header">Test Work</Header>
      <Content className="content">
        <Tabs
          className="custom-tabs"
          defaultActiveKey="1"
          items={tabItems}
        />
      </Content>
    </Layout>
  );
}

export default App;
