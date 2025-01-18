import  { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import axios from "axios";

export const ExchangeRatesComponent = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const currencies = ["USD", "EUR", "GBP", "CNY", "JPY", "RUB"];
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
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}/latest/RUB`,
      )
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.conversion_rates;
          setRates(
            Object.keys(data)
              .filter((key) => currencies.includes(key))
              .map((key, index) => {
                return { currency: key, rate: data[key], key: index };
              }),
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
        setLoading(false);
    })
  }, []);

  return (<div style = {{padding: '20px', fontSize: '20px', fontWeight: 700, fontStyle: 'italic'}}>
    {!loading ? <Table columns={columns} dataSource={rates} /> : <Spin tip = "loading"/>}
  </div>)
};
