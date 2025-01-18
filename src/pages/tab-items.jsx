
import {FunctionsPage} from "./functions-page.jsx";
import {ExchangeRatesComponent} from "../components/money-converter/money-converter.jsx";


export const tabItems = [
    {
        key: '1',
        label: 'Функции',
        children: <FunctionsPage/>
    },
    {
        key: '2',
        label: 'Конвертер',
        children: <ExchangeRatesComponent/>
        /* Не делал отдельную страницу для курсов валют , потому что сделал в одном компоненте */
    },
    {
        key: '3',
        label: 'Таблица',
        children: 'Content of Tab Pane 3',
    },
];