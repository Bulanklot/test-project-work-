import { useState, useEffect } from "react";
import { Table, Select, Typography, Flex } from "antd";
import axios from "axios";
import { Preloader } from "../custom-preloader/preloader.jsx";

export const ExchangeRatesComponent = () => {
  const [rates, setRates] = useState([]);
  const [otherCurrencies, setOtherCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [nextUpdateTime, setNextUpdateTime] = useState("");
  const currencies = ["USD", "EUR", "GBP", "CNY", "JPY", "RUB"];
  const { Title, Paragraph } = Typography;

  const columns = [
    {
      title: "Валюта",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Курс",
      dataIndex: "rate",
      key: "rate",
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
    setSelectedCurrency(value);
  };

  useEffect(() => {
    setLoading(true);
    if (selectedCurrency) {
      axios
        .get(
          `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}/latest/${selectedCurrency}`,
        )
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.conversion_rates;
            const timeOptions = {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            };
            const lastUpdate = new Date(
              response.data.time_last_update_unix * 1000,
            );
            setLastUpdateTime(
              lastUpdate.toLocaleString("ru-Ru", timeOptions).replace(",", " "),
            );
            const nextUpdate = new Date(
              response.data.time_next_update_unix * 1000,
            );
            setNextUpdateTime(
              nextUpdate.toLocaleString("ru-Ru", timeOptions).replace(",", " "),
            );

            setRates(
              Object.keys(data)
                .filter((key) => key !== selectedCurrency)
                .filter((key) => currencies.includes(key))
                .map((key, index) => {
                  return {
                    currency: key,
                    rate: `${data[key]} ${selectedCurrency}`,
                    key: index,
                  };
                }),
            );

            setOtherCurrencies(
              Object.keys(data)
                .filter((key) => !rates.includes(key))
                .map((key) => {
                  return {
                    value: key,
                    label: key,
                  };
                }),
            );
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedCurrency]);

  return (
    <Flex
      style={{
        padding: "20px",
        fontSize: "20px",
        fontWeight: 700,
      }}
      gap={30}
      vertical={true}
      align={"center"}
    >
      <Select
        value={selectedCurrency ? selectedCurrency : "выберите валюту"}
        style={{ width: 200 }}
        onChange={handleSelectChange}
        options={options}
      />
      {selectedCurrency ? (
        !loading ? (
          <Flex gap={20} justify={"center"} align={"center"} vertical={true}>
            <Title level={3}>Выбранная валюта {selectedCurrency}</Title>
            <Paragraph>Дата последнего обновления : {lastUpdateTime}</Paragraph>
            <Paragraph>Дата следующего обновления : {nextUpdateTime}</Paragraph>
            <Table pagination={false} columns={columns} dataSource={rates} />
            <Title level={3}>Посмотреть курс с другими валютами </Title>
            <Select
              placeholder={"выберите валюту"}
              style={{ width: 200 }}
              onChange={handleSelectChange}
              options={otherCurrencies}
            />
          </Flex>
        ) : (
          <Preloader />
        )
      ) : (
        <Paragraph>валюта не выбрана</Paragraph>
      )}
    </Flex>
  );
};
