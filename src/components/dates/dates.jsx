import { Button, Flex, List, Typography } from "antd";
import { sortByDirection } from "./date-converter.js";
import { useState } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

import { mockDateList } from "../../services/utils.js";

const { Title } = Typography;
export const DatesListComponent = () => {
  const [state, setState] = useState("asc");
  const descClickHandler = () => {
    setState("desc");
  };
  const ascClickHandler = () => {
    setState("asc");
  };

  const data = sortByDirection(state, mockDateList);

  return (
    <>
      <Title level={2}> Задание 1: Сортировка дат</Title>
      <Flex gap={40} vertical={false} justify={"center"} align={"center"}>
        <List
          itemLayout="vertical"
          dataSource={data}
          renderItem={(item) => <List.Item>{item.item}</List.Item>}
        />
        <Flex vertical={true}>
          <Button color="primary" onClick={ascClickHandler}>
            <UpOutlined />
          </Button>
          <Button color="primary" onClick={descClickHandler}>
            <DownOutlined />
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
