import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../helpers/api";

export const fetchData = createAsyncThunk(
  "dogs/fetchData", //Thunk
  async () => {
    try {
      const res1 = await axios.get(`${BASE_URL}v1/breeds`);
      const data1 = await res1.data;

      const res2 = await axios.get("dogs");
      const data2 = await res2.data;

      const fData = data1.concat(data2);

      return fData;
    } catch (error) {
      console.log(error);
    }
  }
);

const fetchSlice = createSlice({
  name: "dogs",
  initialState: {
    data: [],
    dataContainer: [],
    pagination: 1,
    pageNumber: 1,
  },
  reducers: {
    filterDogsByBreed(state, { payload }) {
      state.data = state.dataContainer.filter((item) =>
        item.name.toLowerCase().includes(payload.toLowerCase())
      );
    },
    filterDogsbyTemp(state, { payload }) {
      state.data = state.dataContainer.filter((item) =>
        item.temperament !== undefined
          ? item.temperament.includes(payload)
          : null
      );
    },
    filterDogsByName(state, { payload }) {
      if (payload === "asc") {
        state.data = state.data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }

      if (payload === "desc") {
        state.data = state.data
          .sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          })
          .reverse();
      }
    },
    filterDogsByWeigth(state, { payload }) {
      if (payload === "low") {
        state.data = state.data
          .filter((item) => item.name !== "Olde English Bulldogge")
          .sort(
            (a, b) =>
              a.weight.hasOwnProperty("metric") &&
              !a.weight.metric.includes("NaN") &&
              a.weight.metric.slice(0, 2).trim() -
                b.weight.metric.slice(0, 2).trim()
          );
      }

      if (payload === "high") {
        state.data = state.data.sort(
          (a, b) =>
            a.weight.hasOwnProperty("metric") &&
            !a.weight.metric.includes("NaN") &&
            b.weight.metric.slice(0, 2).trim() -
              a.weight.metric.slice(0, 2).trim()
        );
      }
    },
    incrementPagination(state) {
      state.pagination = state.pagination + 1;
    },
    decrementPagination(state) {
      state.pagination = state.pagination - 1;
    },
    incrementPageNumber(state) {
      state.pageNumber = state.pageNumber + 1;
    },
    decrementPageNumber(state) {
      state.pageNumber = state.pageNumber - 1;
    },
    reloadPage(state) {
      state.data = state.dataContainer;
      state.pagination = 1;
      state.pageNumber = 1;
    },
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.status = "pending";
    },
    [fetchData.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.dataContainer = payload;
      state.status = "success";
    },
    [fetchData.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export const fetchActions = fetchSlice.actions;
export default fetchSlice.reducer;
