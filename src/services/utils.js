export const mockDateList = [
    "04.03.2024 10:00 (GMT+3)",
    "04.04.2024 10:00 (GMT+3)",
    "17.06.2023 13:00 (GMT+3)",
    "18.07.2023 13:00 (GMT+1)",
    "18.07.2023 13:00 (GMT+7)",
    "23.07.2021 23:50 (GMT+1)",
    "24.07.2021 00:45 (GMT+3)",
    "04.08.2024 10:00 (GMT+3)",
    "06.04.2024 03:00 (GMT+4)",
];

export const currencyList = ["USD", "EUR", "GBP", "CNY", "JPY", "RUB"];

export const requestStatus = {
    Idle: "Idle",
    Loading: "Loading",
    Success: "Success",
    Error: "Error",
};

export const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "RUB", label: "RUB" },
    { value: "CNY", label: "CNY" },
    { value: "JPY", label: "JPY" },
];
export  function dateUtility(value){
    const toDay = new Date();
    const findDate = new Date()
    findDate.setDate(toDay.getDate()-value);
    const data =  findDate.toISOString().split('T')[0];
    return data;
}
