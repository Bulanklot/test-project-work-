import { Table, Select, Typography, Flex, Input, Form } from "antd";
import { Preloader } from "../custom-preloader/preloader.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrency,
  changeExtraCurrency,
  currencySelector,
  extraCurrencySelector,
  getRates,
  lastUpdateTimeSelector,
  nextUpdateTimeSelector,
  ratesSelector,
  statusSelector,
} from "../../slices/converterSlice.js";
import {useEffect, useState} from "react";

const { Title, Paragraph } = Typography;

export const ExchangeRatesComponent = () => {
  const dispatch = useDispatch();
  const rates = useSelector(ratesSelector);
  const selectedCurrency = useSelector(currencySelector);
  const extraCurrency = useSelector(extraCurrencySelector);
  const [howMuch,setHowMuch] = useState(1);
  const [inputStatus, setInputStatus] = useState("");
  const loading = useSelector(statusSelector) === "Loading";
  const currencies = ["USD", "EUR", "GBP", "CNY", "JPY", "RUB"];
  const columns = [
    {
      title: "Валюта",
      dataIndex: "currency",
      key: "currency",
      sorter: (value, next) => value.currency.localeCompare(next.currency),
    },
    {
      title: "Курс",
      dataIndex: "rate",
      key: "rate",
      sorter: (value, next) => value.rate - next.rate,
    },
  ];

  const options = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "RUB", label: "RUB" },
    { value: "CNY", label: "CNY" },
    { value: "JPY", label: "JPY" },
  ];

  const handleSelectChange = (value) => {
    dispatch(changeCurrency(value));
    dispatch(getRates(value));
  };

  const currentRates = Object.keys(rates)
    .filter((key) => key !== selectedCurrency)
    .filter((key) => currencies.includes(key))
    .map((key, index) => {
      return {
        currency: key,
        rate: (rates[key]* howMuch).toFixed(2),
        key: index,
      };
    });

  const otherCurrencies = Object.keys(rates)
    .filter((key) => key !== selectedCurrency)
    .filter((key) => !currentRates.includes(key))
    .map((key) => {
      return {
        value: key,
        label: key,
      };
    });

  const handleExtraChange = (value) => {
    dispatch(changeExtraCurrency(value));
  };

  const timeOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const lastUpdateTime = new Date(useSelector(lastUpdateTimeSelector) * 1000)
    .toLocaleString("ru-Ru", timeOptions)
    .replace(",", "");

  const nextUpdateTime = new Date(useSelector(nextUpdateTimeSelector) * 1000)
    .toLocaleString("ru-Ru", timeOptions)
    .replace(",", "");

 const handleInputChange = (ev) => {
  const value = (ev.target.value);
  if(/^\d+$/.test(value) && Number(value) > 0){
    setHowMuch(Number(ev.target.value));
    setInputStatus("success");
  } else {
    setInputStatus("error");
    setHowMuch(1);
  }
};
  return (
    <Flex
      style={{
        padding: "20px",
        height: "100%",
        fontWeight:"600",
        fontSize:"20px"
      }}
      gap={10}
      vertical={true}
      align={"center"}
    >
      <div style={{display: "flex", flexDirection:"row"}}>
      <Form.Item validateStatus={inputStatus === "error" ? "error" : "success"}  help={inputStatus==="error" ? "только цифры, больше 0" : ""}>
      <Input
        type="number"
        placeholder={"введите сумму"}
        defaultValue={1}
        disabled={!selectedCurrency}
        onChange={handleInputChange}
        style={{ width: 150 }}
      />
        </Form.Item>
      <Select
        value={selectedCurrency ? selectedCurrency : "выберите валюту"}
        style={{ width: 150 }}
        onChange={handleSelectChange}
        options={options}
      />
      </div>
      {selectedCurrency ? (
          <Flex  justify={"center"} align={"center"} vertical={true} style={{width:"50%"}}>
            <Title level={3}>{selectedCurrency}</Title>
            <div >
            <Table
              pagination={false}
              columns={columns}
              dataSource={currentRates}
              tableLayout={"fixed"}
              style={{whiteSpace:"nowrap", overflow:"visible"}}
              loading={{
                indicator: <Preloader/>,
                spinning: loading
              }}
          />
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", gap:"20px"}}>
            <Paragraph style={{fontSize: "16px" , fontWeight: "400", color:"grey"}}>Дата последнего обновления : {lastUpdateTime}</Paragraph>
            <Paragraph style={{fontSize:"16px", fontWeight:"400", color:"grey"}}>Дата следующего обновления : {nextUpdateTime}</Paragraph>
              </div>
            </div>
            <Title level={3}>Посмотреть курс с другими валютами </Title>
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              placeholder={"выберите валюту"}
              style={{ width: 200 }}
              onChange={handleExtraChange}
              options={otherCurrencies}
            />
            <Paragraph style={{fontWeight:"600", fontSize:"16px"}}>
              {extraCurrency
                ? `${selectedCurrency} -> ${extraCurrency}: ${(rates[extraCurrency] * howMuch).toFixed(2)}`
                : ""}
            </Paragraph>
          </Flex>
      ) : (
        <Paragraph>валюта не выбрана</Paragraph>
      )}
    </Flex>
  );
};
