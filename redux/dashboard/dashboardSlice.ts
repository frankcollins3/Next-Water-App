import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface dashboardSliceState {
    CALENDAR_DAY_DRIED_UP: boolean;
    WEATHER_CHANNEL: boolean;
    CALENDAR_SHOW: boolean;
    PROGRESS_SHOW: boolean;
    APIBOTH: boolean;
    CITY_NAME: string;
    SELECTED_DAY: any
    NO_SELECTED_DAY: boolean;
    RAINY_DATA_INPUT_VAL: string;
    WW_LOCATION: string,
    WW_CITY: string,
    WW_STATE: string,
    WW_COUNTRY: string,
    WW_ZIPCODE: string|number,
    WW_WRONG_LOC: boolean;
    WW_CURRENT_CONDITIONS: string;
}

const initialState: dashboardSliceState = {
  // icons
  CALENDAR_DAY_DRIED_UP: false,
  WEATHER_CHANNEL: false,
  CALENDAR_SHOW: false,
  PROGRESS_SHOW: false,
  APIBOTH: false,
  CITY_NAME: '',
  SELECTED_DAY: {},
  NO_SELECTED_DAY: true,
  RAINY_DATA_INPUT_VAL: 'Drop City',
  WW_LOCATION: '',
  WW_CITY: '',
  WW_STATE: '',
  WW_COUNTRY: '',
  WW_ZIPCODE: '',
  WW_WRONG_LOC: false,
  WW_CURRENT_CONDITIONS: '',
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
        SET_SELECTED_DAY: (state, action) => { state.SELECTED_DAY = action.payload},
        TOGGLE_NO_SELECTED_DAY: (state) => { state.NO_SELECTED_DAY = !state.NO_SELECTED_DAY; },
        SET_RAINY_DATA_INPUT_VAL: (state, action) => { state.RAINY_DATA_INPUT_VAL = action.payload },
        SET_WW_LOCATION: (state, action) => { state.WW_LOCATION = action.payload },
        SET_WW_CITY: (state, action) => { state.WW_CITY = action.payload },
        SET_WW_ZIPCODE: (state, action) => { state.WW_ZIPCODE = action.payload },
        SET_WW_STATE: (state, action) => { state.WW_STATE = action.payload },
        SET_WW_COUNTRY: (state, action) => { state.WW_COUNTRY = action.payload },
        SET_WW_CURRENT_CONDITIONS: (state, action) => { state.WW_CURRENT_CONDITIONS = action.payload },
        TOGGLE_WW_WRONG_LOC: (state) => { state.WW_WRONG_LOC = !state.WW_WRONG_LOC; },        
        TGGLE_WW_WRONG_LOC: (state) => { state.WW_WRONG_LOC = !state.WW_WRONG_LOC; },        
      },              
})

export const { 
    TOGGLE_CALENDAR_DAY_DRIED_UP, TOGGLE_WEATHER_CHANNEL, TOGGLE_CALENDAR_SHOW, TOGGLE_PROGRESS_SHOW, SET_CITY_NAME, 
    SET_SELECTED_DAY, TOGGLE_NO_SELECTED_DAY, 
    SET_WW_LOCATION, SET_WW_CITY, SET_WW_ZIPCODE, SET_WW_STATE, SET_WW_COUNTRY, SET_WW_CURRENT_CONDITIONS,
     TOGGLE_WW_WRONG_LOC, SET_RAINY_DATA_INPUT_VAL,
 } = dashboardSlice.actions

export default dashboardSlice.reducer
export type dashboardState = dashboardSliceState