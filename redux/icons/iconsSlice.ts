import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface iconSliceState {
    // * * * I C O N S 
    ICON_NOT_INPUT: boolean;
    SPIN_BOTTLE_IMG: string;
    NON_GOOGLE_IMG_URL: string;
    SPIN_BOTTLE_SHOW_INPUT: boolean;
    SELECT_ICON_SCREEN: boolean;
    SHOW_WEB_ICONS: boolean;
    SELECTED_WEB_ICONS: boolean;
    IMG_SCRAPE_LOADING: boolean;
}

const initialState: iconSliceState = {
  // icons
  ICON_NOT_INPUT: false,
  SPIN_BOTTLE_IMG: '',
  NON_GOOGLE_IMG_URL: '',
  SPIN_BOTTLE_SHOW_INPUT: false,
  SELECT_ICON_SCREEN: false,
  SHOW_WEB_ICONS: false,
  SELECTED_WEB_ICONS: false,
  IMG_SCRAPE_LOADING: false
  // * * * I C O N S
};

const iconSlice = createSlice({
    name: 'icon',
    initialState,
    reducers: {
        // login data

        // I C O N S ! ! ! 
        SET_NON_GOOGLE_IMG_URL: (state, action) => { state.NON_GOOGLE_IMG_URL = action.payload; },
        TOGGLE_SPIN_BOTTLE_SHOW_INPUT: (state) => { state.SPIN_BOTTLE_SHOW_INPUT = !state.SPIN_BOTTLE_SHOW_INPUT },
        TOGGLE_SELECT_ICON_SCREEN: (state) => { state.SELECT_ICON_SCREEN = !state.SELECT_ICON_SCREEN },
        TOGGLE_SHOW_WEB_ICONS: (state) => { state.SHOW_WEB_ICONS = !state.SHOW_WEB_ICONS },
        TOGGLE_SELECTED_WEB_ICONS: (state) => { state.SELECTED_WEB_ICONS = !state.SELECTED_WEB_ICONS },
        TOGGLE_IMG_SCRAPE_LOADING: (state) => { state.IMG_SCRAPE_LOADING = !state.IMG_SCRAPE_LOADING },
        
      },              
})

export const { 
    SET_NON_GOOGLE_IMG_URL, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, TOGGLE_SELECT_ICON_SCREEN, TOGGLE_SHOW_WEB_ICONS, TOGGLE_SELECTED_WEB_ICONS, TOGGLE_IMG_SCRAPE_LOADING
 } = iconSlice.actions

export default iconSlice.reducer
export type iconState = iconSliceState