import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { requestStatus } from "../../services/utils.js";

const initialState = {
  rates: {},
  status: requestStatus.Idle,
  selectedCurrency: "",
  extraCurrency: "",
  lastUpdateTime: "",
  nextUpdateTime: "",
  timeSeriesRate: [],
  chartCurrency: "",
};

export const getRates = createAsyncThunk(
  "getRates",
  async (currency, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}/latest/${currency}`,
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data["error-type"]);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getTimeSeriesRates = createAsyncThunk(
  "getTimeSeriesRates",
  async ({ startDate, endDate, baseCurrency }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.fxfeed.io/v1/timeseries?api_key=${import.meta.env.VITE_TIMESERIES_API_KEY}&start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}`,
      );
      return response.data.rates;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data["message"]);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
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
    changeChartCurrency: (state, action) => {
      state.chartCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTimeSeriesRates.pending, (state) => {
      state.status = requestStatus.Loading;
    });
    builder.addCase(getTimeSeriesRates.fulfilled, (state, action) => {
      state.status = requestStatus.Success;
      state.timeSeriesRate = action.payload;
    });
    builder.addCase(getTimeSeriesRates.rejected, (state, action) => {
      state.status = action.payload;
    });
    builder.addCase(getRates.pending, (state) => {
      state.status = requestStatus.Loading;
    });
    builder.addCase(getRates.fulfilled, (state, action) => {
      const {
        conversion_rates,
        time_last_update_unix,
        time_next_update_unix,
        result,
      } = action.payload;
      state.status = result;
      state.rates = conversion_rates;
      state.lastUpdateTime =
        time_last_update_unix; /* пометка для себя , не забыть что время Unix приходит в секундах */
      state.nextUpdateTime = time_next_update_unix;
    });
    builder.addCase(getRates.rejected, (state, { payload }) => {
      state.status = payload;
    });
  },
});

export const { changeCurrency, changeExtraCurrency, changeChartCurrency } =
  converterSlice.actions;
