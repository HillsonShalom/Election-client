import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, colorsState } from "../../types/reduxTypes";
import { ColorsDict } from "../../types/getDTOs";
import { CustomStates } from "../../types/states.enum";

const baseUrl = "http://192.168.20.64:5959/";

const initialState: colorsState = {
  error: null,
  status: DataStatus.IDLE,
  colors: {},
};

export const fetchColors = createAsyncThunk(
  "colors/getList",
  async (_, thunkApi) => {
    try {
      const fetchdata = await fetch(baseUrl + "api/states/colors");
      if (fetchdata.status != 200) {
        thunkApi.rejectWithValue("Can't get the list, please try again");
      }
      const colorsDict = (await fetchdata.json()) as ColorsDict;

      const custom: CustomStates = {};
      for (const key in colorsDict) {
        custom[key as keyof CustomStates] = {fill: colorsDict[key] } ;
      }

      return thunkApi.fulfillWithValue(custom);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<colorsState>) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.colors = {};
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.error = null;
        state.colors = action.payload as unknown as CustomStates;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error as string;
        state.colors = {};
      });
  },
});

export default colorsSlice;
