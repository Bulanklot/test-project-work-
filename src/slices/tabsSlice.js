import { createSlice } from "@reduxjs/toolkit";

/* Пробовал сделать через Редакс , но пока что не могу выявить ошибку */

const initialState = {
  datesList: [],
  convertedDatesList: [],
};

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
   reducers: {
   addToDatesList: (state, { payload }) => {
      state.datesList.push(payload);
    },

    convertDates: (state) => {
      const convertDate = (date) => {
        const days = date.split(" ")[0].split(".")[1];
        const months = date.split(" ")[0].split(".")[0];
        const years = date.split(" ")[0].split(".")[2];
        const hours = date.split(" ")[1];
        const gmt = date.split(" ")[2];
        const timezoneOffset = parseInt(
          gmt.replace("(", "").replace("GMT", "").replace(")", ""),
          10,
        );
        const formattedDate = days + "." + months + "." + years + " " + hours;
        return (
          new Date(formattedDate).getTime() - timezoneOffset * 60 * 60 * 1000
        );
      };

      state.convertedDatesList = state.datesList.map((item, index) => ({
        index: index,
        value: convertDate(item),
      }));
      console.log(state.convertedDatesList);
    },
    sortDates: (state, action) => {
      const sortOrder = action.payload;
      const compareFn =
        sortOrder === "asc"
          ? (a, b) => b.value - a.value
          : (a, b) => a.value - b.value;
      state.convertedDatesList.sort(compareFn);
      state.datesList = state.convertedDatesList.map(
        (el) => state.datesList[el.index]);
    },
  },
  selectors: {
    selectDatesList: (state) => state.datesList,
    convertedDates: (state) => state.convertedDatesList,
  },
});

export const { addToDatesList, convertDates, sortDates } = dataSlice.actions;
export const { selectDatesList,convertedDates } = dataSlice.selectors;
