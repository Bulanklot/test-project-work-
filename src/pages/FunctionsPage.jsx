import { Tabs } from "antd";
import { tabItems } from "./TabItems.jsx";
export const FunctionsPage = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontSize: "20px",
        fontWeight: 700,
        minHeight: "100vh",
      }}
    >
      <Tabs className="custom-tabs" defaultActiveKey="1" items={tabItems} />
    </div>
  );
};
