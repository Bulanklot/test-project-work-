import { Table, Select, Typography, Flex, Input, Form, Alert } from "antd";
import { Preloader } from "../custom-preloader/Preloader.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  currencySelector,
  extraCurrencySelector,
  lastUpdateTimeSelector,
  nextUpdateTimeSelector,
  ratesSelector,
  statusSelector,
} from "../../store/currencyRates/selectors.js";
import {changeCurrency, changeExtraCurrency, getRates} from "../../store/currencyRates/index.js";
import { useState } from "react";
import { currencyOptions,} from "../../services/utils.js";
import { TableChart } from "./TableChart.jsx";

const { Title, Paragraph } = Typography;

export const ExchangeRatesComponent = () => {
  const dispatch = useDispatch();
  const rates = useSelector(ratesSelector);
  const selectedCurrency = useSelector(currencySelector);
  const extraCurrency = useSelector(extraCurrencySelector);
  const [howMuch, setHowMuch] = useState(1);
  const [inputStatus, setInputStatus] = useState("");
  const status = useSelector(statusSelector);
  const loading = status === "Loading";
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

  const handleSelectChange = (value) => {
    dispatch(changeCurrency(value));
    dispatch(getRates(value));
    // dispatch(getTimeSeriesRates({startDate:"2025-02-01", endDate:"2025-02-25", baseCurrency: value,currentCurrency: 'RUB'}));
  };

  const currentRates = Object.keys(rates)
    .filter((key) => key !== selectedCurrency)
    .filter((key) => currencies.includes(key))
    .map((key, index) => {
      return {
        currency: key,
        rate: (rates[key] * howMuch).toFixed(2),
        key: index,
      };
    });

  const { labels, data } = currentRates.reduce(
    (acc, item) => {
      acc.labels.push(item.currency);
      acc.data.push(item.rate);
      return acc;
    },
    { labels: [], data: [] },
  );

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
    const value = ev.target.value;
    if (/^\d+$/.test(value) && Number(value) > 0) {
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
        fontWeight: "600",
        fontSize: "20px",
        minHeight: "90vh",
      }}
      gap={10}
      vertical={true}
      align={"center"}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "2%" }}>
        <Form.Item
          validateStatus={inputStatus === "error" ? "error" : "success"}
          help={
            inputStatus === "error" ? (
              <span
                style={{ position: "absolute", width: "200px", left: "-12px" }}
              >
                только цифры, больше 0{" "}
              </span>
            ) : (
              ""
            )
          }
        >
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
          options={currencyOptions}
          disabled={inputStatus === "error"}
        />
      </div>
      {selectedCurrency ? (
        <Flex
          justify={"center"}
          align={"center"}
          vertical={true}
          style={{ width: "100%" }}
        >
          <Title level={3}>{selectedCurrency}</Title>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginBottom: "10px",
              }}
            >
              <div style={{ position: "relative" }}>
                {status?.result === "error" && (
                  <Alert
                    message={status["error-type"] || status}
                    type="error"
                    showIcon
                    closable
                    style={{
                      width: "80%",
                      justifySelf: "center",
                      position: "absolute",
                      zIndex: "1",
                      right: "90px",
                      top: "60px",
                    }}
                  />
                )}
                <Table
                  pagination={false}
                  columns={columns}
                  dataSource={currentRates}
                  tableLayout={"fixed"}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "visible",
                    height: "100%",
                    width: "80%",
                    justifySelf: "center",
                  }}
                  loading={{
                    indicator: <Preloader />,
                    spinning: loading,
                  }}
                />
              </div>
              <div style={{ width: "80%", justifySelf: "center" }}>
                <TableChart labels={labels} rate={data} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                justifyContent: "space-between",
              }}
            >
              <Paragraph
                style={{ fontSize: "16px", fontWeight: "400", color: "grey" }}
              >
                Дата последнего обновления : {lastUpdateTime}
              </Paragraph>
              <Paragraph
                style={{ fontSize: "16px", fontWeight: "400", color: "grey" }}
              >
                Дата следующего обновления : {nextUpdateTime}
              </Paragraph>
            </div>
          </div>
          <Title level={3}>Посмотреть курс с другими валютами </Title>
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder={"выберите валюту"}
            style={{ width: 200 }}
            onChange={handleExtraChange}
            options={otherCurrencies}
          />
          <Paragraph style={{ fontWeight: "600", fontSize: "16px" }}>
            {extraCurrency
              ? `${selectedCurrency} -> ${extraCurrency}: ${(rates[extraCurrency] * howMuch).toFixed(2)}`
              : ""}
          </Paragraph>
        </Flex>
      ) : (
        <Preloader></Preloader>
      )}
    </Flex>
  );
};
