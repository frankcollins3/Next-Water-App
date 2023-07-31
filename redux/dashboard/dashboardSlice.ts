import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface dashboardSliceState {
    CALENDAR_DAY_DRIED_UP: boolean;
    WEATHER_CHANNEL: boolean;
    CALENDAR_SHOW: boolean;
    PROGRESS_SHOW: boolean;
    APIBOTH: boolean;
    CITY_NAME: string;
    SELECTED_DAY: any
}

const initialState: dashboardSliceState = {
  // icons
  CALENDAR_DAY_DRIED_UP: false,
  WEATHER_CHANNEL: false,
  CALENDAR_SHOW: false,
  PROGRESS_SHOW: false,
  APIBOTH: false,
  CITY_NAME: '',
  SELECTED_DAY: {}
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
        SET_SELECTED_DAY: (state, action) => { state.SELECTED_DAY = action.payload}
      },              
})

export const { 
    TOGGLE_CALENDAR_DAY_DRIED_UP, TOGGLE_WEATHER_CHANNEL, TOGGLE_CALENDAR_SHOW, TOGGLE_PROGRESS_SHOW, SET_CITY_NAME, SET_SELECTED_DAY
 } = dashboardSlice.actions

export default dashboardSlice.reducer
export type dashboardState = dashboardSliceState
