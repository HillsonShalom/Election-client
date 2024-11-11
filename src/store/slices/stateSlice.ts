import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataStatus, stateState } from "../../types/reduxTypes";
import { IResults, IStatesDetails, StateModel } from "../../types/getDTOs";

const baseUrl = "http://192.168.20.64:5959/"

const initialState: stateState = {
    error: null,
    status: DataStatus.IDLE,
    state: []
}


export const fetchStates = createAsyncThunk(
    "states/getList",
    async (_, thunkApi) => {
      try {
        const resDetails = await fetch(baseUrl + "api/states");
        if (resDetails.status != 200) {
          thunkApi.rejectWithValue("Can't get the list, please try again");
        }
        const dataDetails = await resDetails.json() as IStatesDetails[];

        const resResults = await fetch(baseUrl + "api");
        if (resResults.status != 200) {
            thunkApi.rejectWithValue("Can't get the list, please try again");
        }
        const dataResults = await resResults.json() as IResults[];
        const data: StateModel[] = dataDetails.map(d => {
            return {...d, results: dataResults.find(r => r.stateCode === d.code) || {}} as StateModel
        })
        return thunkApi.fulfillWithValue(data);
      } catch (err) {
        const error = err as Error
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );
  
  const stateSlice = createSlice({
    name: "states",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<stateState>) => {
      builder
        .addCase(fetchStates.pending, (state) => {
          state.status = DataStatus.LOADING;
          state.error = null;
          state.state = [];
        })
        .addCase(fetchStates.fulfilled, (state, action) => {
          state.status = DataStatus.SUCCESS;
          state.error = null;
          state.state = action.payload as unknown as StateModel[];
        })
        .addCase(fetchStates.rejected, (state, action) => {
          state.status = DataStatus.FAILED;
          state.error = action.error as string;
          state.state = [];
        });
    },
  });
  
  export default stateSlice;