import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HydroDataInterface } from 'interfaces/interface';

interface MainSliceState {
  // main          
  SHOW_CALENDAR: boolean;                          
  SHOW_HYDRO_SETTINGS: boolean;
  HYDRO_SCHEDULE: any[];
  HYDRO_INTAKE: number;
  HYDRO_DATA: any;
  // HYDRO_DATA: HydroDataInterface,    // to modularize /dashboard -> <Calendar> and </CalendarDetails>

  DATE: string,
  STATUS: any[];
  DISABLED: any[];
  PROGRESS: number;
  REMINDER_CLICK: number;
  REMINDER_CLICK_TOO_EARLY: boolean;
  MAIN_BORDER_HOVER: boolean;
  REMINDER_FINISHED_UPDATE: boolean;

  CURRENT_PAGE: string;
  CURRENT_CYCLE_IS_OVER: boolean;

  AGE: number;
  WEIGHT: number;
  HEIGHT: number;
  START_TIME: number;
  END_TIME: number;
  REMINDER: number;
  UNITS: string;
  LOADING: boolean;
  UPDATE_RESET_HOVER: string;

  INTRO_WATER_DROP_IS_HOVERED: boolean;
}

const initialState: MainSliceState = {
  // main
  SHOW_CALENDAR: false,
  SHOW_HYDRO_SETTINGS: false,
  HYDRO_SCHEDULE: [4, 8, 12, 16],
  
  HYDRO_INTAKE: 0,
  // id |  google_id   |    date    | progress |  weekday  |                status                 | users_id 
  HYDRO_DATA: { id: 0, google_id: '', date: new Date().getDate(), progress: 0, weekday: new Date().getDay(), status: [], users_id: 0, token: 'token-water' },
  DATE: new Date().getDate().toString(),
  STATUS: [],
  DISABLED: [],
  PROGRESS: 0,
  REMINDER_CLICK: 0,
  REMINDER_CLICK_TOO_EARLY: false,
  MAIN_BORDER_HOVER: false,
  REMINDER_FINISHED_UPDATE: false,
  CURRENT_PAGE: '',
  CURRENT_CYCLE_IS_OVER: false,

  AGE: 0,
  WEIGHT: 0,
  HEIGHT: 0,
  START_TIME: 0,
  END_TIME: 0,
  REMINDER: 0,
  UNITS: 'imperial',
  LOADING: false,
  UPDATE_RESET_HOVER: '',
  INTRO_WATER_DROP_IS_HOVERED: false
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    TOGGLE_SHOW_CALENDAR: (state) => { state.SHOW_CALENDAR = !state.SHOW_CALENDAR; },
    TOGGLE_SHOW_HYDRO_SETTINGS: (state) => { state.SHOW_HYDRO_SETTINGS = !state.SHOW_HYDRO_SETTINGS; },
    SET_HYDRO_SCHEDULE: (state, action) => { state.HYDRO_SCHEDULE = action.payload},
    SET_HYDRO_INTAKE: (state, action) => { state.HYDRO_INTAKE = action.payload},
    SET_HYDRO_DATA: (state, action) => { state.HYDRO_DATA = action.payload},
    SET_DATE: (state, action) => { state.DATE = action.payload },
    SET_STATUS: (state, action) => { state.STATUS = action.payload},
    SET_DISABLED: (state, action) => { state.DISABLED = action.payload},
    // SET_PROGRESS: (state, action) => { state.PROGRESS = state.PROGRESS + action.payload},
    SET_PROGRESS: (state, action) => { state.PROGRESS = action.payload},    
    INCREMENT_REMINDER_CLICK: (state) => { state.REMINDER_CLICK = state.REMINDER_CLICK + 1 },    
    TOGGLE_REMINDER_CLICK_TOO_EARLY: (state) => { state.REMINDER_CLICK_TOO_EARLY = !state.REMINDER_CLICK_TOO_EARLY },    
    TOGGLE_MAIN_BORDER_HOVER: (state) => { state.MAIN_BORDER_HOVER = !state.MAIN_BORDER_HOVER },
    TOGGLE_REMINDER_FINISHED_UPDATE: (state) => { state.REMINDER_FINISHED_UPDATE = !state.REMINDER_FINISHED_UPDATE },

    SET_CURRENT_PAGE: (state, action) => { state.CURRENT_PAGE = action.payload; },    
    TOGGLE_CURRENT_CYCLE_IS_OVER: (state) => { state.CURRENT_CYCLE_IS_OVER = !state.CURRENT_CYCLE_IS_OVER; },
    SET_AGE: (state, action) => { state.AGE = action.payload },
    SET_WEIGHT: (state, action) => { state.WEIGHT = action.payload },
    SET_HEIGHT: (state, action) => { state.HEIGHT = action.payload },
    SET_START_TIME: (state, action) => { state.START_TIME = action.payload },
    SET_END_TIME: (state, action) => { state.END_TIME = action.payload },
    SET_REMINDER: (state, action) => { state.REMINDER = action.payload },
    TOGGLE_LOADING: (state) => { state.LOADING = !state.LOADING; },
    SET_UPDATE_RESET_HOVER: (state, action) => { state.UPDATE_RESET_HOVER = action.payload },
    SET_UNITS: (state, action) => { state.UNITS = action.payload },
              
    TOGGLE_INTRO_WATER_DROP_IS_HOVERED: (state) => { state.INTRO_WATER_DROP_IS_HOVERED =  !state.INTRO_WATER_DROP_IS_HOVERED },
  },
});

export const 
{ 
  TOGGLE_SHOW_CALENDAR, TOGGLE_SHOW_HYDRO_SETTINGS, SET_HYDRO_SCHEDULE, SET_HYDRO_DATA, SET_HYDRO_INTAKE, SET_STATUS, SET_DISABLED, SET_PROGRESS,
  INCREMENT_REMINDER_CLICK, TOGGLE_REMINDER_CLICK_TOO_EARLY,
  SET_DATE, TOGGLE_MAIN_BORDER_HOVER, TOGGLE_REMINDER_FINISHED_UPDATE,
  SET_CURRENT_PAGE, TOGGLE_CURRENT_CYCLE_IS_OVER, SET_AGE, SET_WEIGHT, SET_HEIGHT, SET_START_TIME, SET_END_TIME, 
  SET_REMINDER, TOGGLE_LOADING, SET_UPDATE_RESET_HOVER, SET_UNITS, 
  TOGGLE_INTRO_WATER_DROP_IS_HOVERED
} = mainSlice.actions;

export default mainSlice.reducer;
export type MainState = MainSliceState;
