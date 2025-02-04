import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { requestStatus } from "../services/utils.js";

const initialState = {
  rates: {},
  status: requestStatus.Idle,
  currentRates: [],
  selectedCurrency: "",
  extraCurrency: "",
  lastUpdateTime: "",
  nextUpdateTime: "",
};

export const getRates = createAsyncThunk("getRates", async (currency) => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}/latest/${currency}`,
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
});
/* К сожалению не нашёл в апи запросы по измениям одной валюты в течение одного месяца по дням,
 есть исторические данные касательно курса, но они платные */
export const converterSlice = createSlice({
  name: "converterSlice",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    changeExtraCurrency: (state, action) => {
      state.extraCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRates.pending, (state) => {
      state.status = requestStatus.Loading;
    });
    builder.addCase(getRates.fulfilled, (state, action) => {
      const { conversion_rates, time_last_update_unix, time_next_update_unix } =
        action.payload;
      state.status = requestStatus.Success;
      state.rates = conversion_rates;
      state.lastUpdateTime =
        time_last_update_unix; /* пометка для себя , не забыть что время Unix приходит в секундах */
      state.nextUpdateTime = time_next_update_unix;
    });
    builder.addCase(getRates.rejected, (state) => {
      state.status = requestStatus.Error;
    });
  },
  selectors: {
    ratesSelector: (state) => state.rates,
    currentRatesSelector: (state) => state.currentRates,
    lastUpdateTimeSelector: (state) => state.lastUpdateTime,
    nextUpdateTimeSelector: (state) => state.nextUpdateTime,
    currencySelector: (state) => state.selectedCurrency,
    statusSelector: (state) => state.status,
    extraCurrencySelector: (state) => state.extraCurrency,
  },
});

export const { changeCurrency, changeExtraCurrency, convertToCurrentRates } =
  converterSlice.actions;
export const {
  ratesSelector,
  lastUpdateTimeSelector,
  nextUpdateTimeSelector,
  currencySelector,
  statusSelector,
  extraCurrencySelector,
} = converterSlice.selectors;
