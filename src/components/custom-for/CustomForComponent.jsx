import { Button, Flex, Input, Modal, Typography } from "antd";
import { useState } from "react";
import {customForFunc, evenNumbers} from "./custom-for-func.js";

const { Paragraph, Title } = Typography;
const { TextArea } = Input;
export const CustomForComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    const numberValue = value.replace(/[^0-9. ,]|/g, "");
    setInputValue(numberValue);
  };
  const handleSubmit = () => {
    if (inputValue) {
      const numberArray = inputValue.split(/[, .]/).map(Number);
      let resultArray = [];
      customForFunc(
       numberArray,
       evenNumbers,
          0,
          resultArray
      );
      setResult(resultArray.toString());
      setVisible(true);
    } else {
      alert("введите значения");
    }
  };

  return (
    <>
      <Title level={2}> Задание 2: For или While с помощью If </Title>
      <Flex gap={16} align={"center"} justify={"center"}>
        <TextArea
          placeholder="введите значения"
          value={inputValue}
          onChange={handleChange}
          allowClear
          style={{ width: 600, resize: "none" }}
        />
        <Button
          style={{ alignSelf: "end" }}
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Modal
          title="результат"
          open={visible}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <Paragraph>{result}</Paragraph>
        </Modal>
      </Flex>
    </>
  );
};
