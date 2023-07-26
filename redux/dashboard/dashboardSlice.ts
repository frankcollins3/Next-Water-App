import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface dashboardSliceState {
    CALENDAR_DAY_DRIED_UP: boolean;
    WEATHER_CHANNEL: boolean;
    CALENDAR_SHOW: boolean;
    PROGRESS_SHOW: boolean;
    APIBOTH: boolean;
    CITY_NAME: string;
}

const initialState: dashboardSliceState = {
  // icons
  CALENDAR_DAY_DRIED_UP: false,
  WEATHER_CHANNEL: false,
  CALENDAR_SHOW: false,
  PROGRESS_SHOW: false,
  APIBOTH: false,
  CITY_NAME: '',
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {        
        TOGGLE_CALENDAR_DAY_DRIED_UP: (state) => { state.CALENDAR_DAY_DRIED_UP = !state.CALENDAR_DAY_DRIED_UP; },
        TOGGLE_WEATHER_CHANNEL: (state) => { state.WEATHER_CHANNEL = !state.WEATHER_CHANNEL; },
        TOGGLE_CALENDAR_SHOW: (state) => { state.CALENDAR_SHOW = !state.CALENDAR_SHOW; },
        TOGGLE_PROGRESS_SHOW: (state) => { state.PROGRESS_SHOW = !state.PROGRESS_SHOW; },
        SET_CITY_NAME: (state, action) => { state.CITY_NAME = action.payload },        
      },              
})

export const { 
    TOGGLE_CALENDAR_DAY_DRIED_UP, TOGGLE_WEATHER_CHANNEL, TOGGLE_CALENDAR_SHOW, TOGGLE_PROGRESS_SHOW, SET_CITY_NAME
 } = dashboardSlice.actions

export default dashboardSlice.reducer
export type dashboardState = dashboardSliceState
