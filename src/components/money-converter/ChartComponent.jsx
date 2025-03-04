import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeChartCurrency,
  changeCurrency,
  getRates,
  getTimeSeriesRates,
} from "../../store/currencyRates/index.js";
import {chartCurrencySelector, currencySelector, timeSeriesRateSelector} from "../../store/currencyRates/selectors.js";
import { Select, Radio } from "antd";
import { currencyOptions } from "../../services/utils.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const ChartComponent = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState("");
  const selectedCurrency = useSelector(currencySelector);
  const timeSeriesRate = useSelector(timeSeriesRateSelector);
  const chartCurrency = useSelector(chartCurrencySelector);
  const chartSeriesData = Object.entries(timeSeriesRate).map(
    ([date, rate]) => ({
      [date]: rate[chartCurrency],
    }),
  );

  const labels = chartSeriesData.map((el) => {
    return Object.keys(el)[0].replace(/(\d{4})-(\d{2})-(\d{2})/, "$3.$2");
  });
  const rates = chartSeriesData.map((el) => Object.values(el)[0]);

  const timeChange = (value) => {
    const toDay = new Date();
    const findDate = new Date();
    findDate.setDate(toDay.getDate() - value);
    setTime(findDate.toISOString().split("T")[0]);
  };

  const chartData = {
    labels: labels || [],
    datasets: [
      {
        label: `${selectedCurrency} to ${chartCurrency}`,
        data: rates || [], // Значения для граф
        borderColor: "rgb(54, 162, 235, 0.8)", // Цвет линии
        backgroundColor: "rgb(220,10,27)",
        borderWidth: 1,
        pointStyle: "rect",
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Дни",
        },
        font: { size: 16, weight: 100, color: "rgba(0, 0, 0, 0.88)" },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Курс",
        },
        grid: {
          display: false,
        },
        font: { size: 16, weight: 100, color: "rgba(0, 0, 0, 0.88)" },
      },
    },
    plugins: {
      legend: {
        position: "top",
        display: true,
        onClick: () => {},
        labels: {
          boxWidth: 0,
          font: { size: 16, weight: 100, color: "rgba(0, 0, 0, 0.88)" },
        },
        font: { size: 16, weight: 1000, color: "rgba(0, 0, 0, 0.88)" },
      },
      title: {
        display: true,
        text: "курс валют",
        font: { size: 16, weight: 100, color: "rgba(0, 0, 0, 0.88)" },
      },
    },
  };

  useEffect(() => {
    const actualDate = new Date().toISOString().split("T")[0];
    dispatch(
      getTimeSeriesRates({
        startDate: time || actualDate,
        endDate: actualDate,
        baseCurrency: selectedCurrency,
      }),
    );
  }, [dispatch, selectedCurrency, time]);

  const handleSelectChange = (value) => {
    dispatch(changeCurrency(value));
    dispatch(getRates(value));
  };
  const selectChartCurrency = (value) => {
    if(!time){
      timeChange(7);
    }
    dispatch(changeChartCurrency(value));
  };
  const chartCurrencyOptions = currencyOptions.filter(
    (item) => item.value !== selectedCurrency,
  );

  return (
    <div
      style={{
        backgroundColor: "inherit",
        width: "100%",
        height: "calc(100%-400px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div>
            <Select
              value={
                selectedCurrency ? selectedCurrency : "выберите основную валюту"
              }
              style={{ width: 80 }}
              onChange={handleSelectChange}
              options={currencyOptions}
            />
          </div>

          <div style={{ justifySelf: "end", alignSelf: "flex-end" }}>
            <Select
              value={chartCurrency ? chartCurrency : "выбрать валютную пару"}
              style={{ width: 80 }}
              onChange={selectChartCurrency}
              options={chartCurrencyOptions}
            />
          </div>
        </div>

        <Radio.Group
          options={[
            { value: 7, label: "за последние 7 дней" },
            { value: 14, label: "за последние 14 дней" },
            { value: 30, label: "за последний месяц" },
          ]}
          optionType="button"
          buttonStyle="solid"
          defaultValue={7}
          size={"middle"}
          onChange={(ev) => {
            timeChange(ev.target.value);
          }}
        />
      </div>
      <div
        style={{
          fontWeight: "1000",
          fontSize: "16px",
          color: "black",
          maxWidth: "80%",
        }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
