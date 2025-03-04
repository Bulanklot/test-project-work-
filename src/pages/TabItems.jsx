import { FunctionsPage } from "./FunctionsPage.jsx";
import { ExchangeRatesComponent } from "../components/money-converter/ExchangeRatesComponent.jsx";
import { DatesListComponent } from "../components/dates/DatesListComponent.jsx";
import { CustomForComponent } from "../components/custom-for/CustomForComponent.jsx";
import { ChartComponent } from "../components/money-converter/ChartComponent.jsx";
import {
  FunctionOutlined,
  SwapOutlined,
  TableOutlined,
} from "@ant-design/icons";

export const tabItems = [
  {
    key: "1",
    label: "сортировка дат",
    children: <DatesListComponent />,
  },
  {
    key: "2",
    label: "custom for",
    children: <CustomForComponent />,
  },
];

export const converterTabItems = [
  {
    key: "1",
    label: "конвертер",
    children: <ExchangeRatesComponent />,
  },
  {
    key: "2",
    label: "график",
    children: <ChartComponent />,
  },
];

export const menuItems = [
  {
    key: "1",
    icon: <FunctionOutlined />,
    label: "функции",
  },
  {
    key: "2",
    icon: <SwapOutlined />,
    label: "конвертер",
  },
  {
    key: "3",
    icon: <TableOutlined />,
    label: "таблица",
  }
];
