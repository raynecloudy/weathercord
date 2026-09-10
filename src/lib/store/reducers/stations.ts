import { Station } from "@/db/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  stations: [] as Station[],
  selected: null as Station | null
};

export const stationSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.stations = action.payload;
    },
    setSelectedStation: (state, action: PayloadAction<string>) => {
      state.selected = state.stations.find(station => station.id === action.payload) ?? null;
    }
  }
});

export const { setStations, setSelectedStation } = stationSlice.actions
export const stationReducer = stationSlice.reducer;
