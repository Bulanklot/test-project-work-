const converterState = (store) => store.converterSlice;
export const ratesSelector = (state) => converterState(state).rates;
export const lastUpdateTimeSelector = (state) => converterState(state).lastUpdateTime;
export const nextUpdateTimeSelector = (state) => converterState(state).nextUpdateTime;
export const currencySelector = (state) => converterState(state).selectedCurrency;
export const statusSelector = (state) => converterState(state).status;
export const extraCurrencySelector = (state) => converterState(state).extraCurrency;
export const timeSeriesRateSelector = (state) => converterState(state).timeSeriesRate;
export const chartCurrencySelector = (state) => converterState(state).chartCurrency;