import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainSliceState {
  HYDRO_SETTINGS: boolean;
}

const initialState: MainSliceState = {
  HYDRO_SETTINGS: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleHydroSettings: (state) => {
      state.HYDRO_SETTINGS = !state.HYDRO_SETTINGS;
    },
  },
});

export const { toggleHydroSettings } = mainSlice.actions;
export default mainSlice.reducer;
export type MainState = MainSliceState;
