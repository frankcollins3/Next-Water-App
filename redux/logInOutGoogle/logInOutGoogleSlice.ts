import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersLoginInterface } from 'utility/interfaceNtypes';

interface logInOutGoogleSliceState {
  // main
  HYDRO_SETTINGS: boolean;
  
  // login
  CURRENT_USER: any;
  ALL_USERS: any[];
  ALL_USERNAMES: any[];
  ALL_EMAILS: any[];
  PARENT_CONFIRM: boolean;
  LOG_IN_OUT_TYPE: string;
  LOGIN_SIGNUP_BTN: boolean;
  LOG_IN_OUT_FLASH_MSG: string;
  DISPLAY_FORM: string;
  PASSWORD_SHOW: boolean;
  LOGIN_PASSWORD_SHOW: boolean;
  LOGIN_PASSWORD_SHOW_CLICK: boolean;
  PASSWORD_SHOW_CLICK: boolean;
  GOOGLEID_INPUT: string;
  GOOGLE_IMG_URL: string;
  NON_GOOGLE_IMG_URL: string;
  USER_SELECT_IMG_URL: string;
  USERNAME_INPUT_HOVER: boolean;
  EMAIL_INPUT_HOVER: boolean;
  AGE_INPUT_HOVER: boolean;
  PASSWORD_INPUT_HOVER: boolean;
  EMAIL_OR_USERNAME_LOGIN_INPUT: string;
  PASSWORD_LOGIN_INPUT: string;
  LOGIN_MSG: string;
  INCORRECT_LOGIN_ATTEMPT: number;

  USERNAME_INPUT: string;
  EMAIL_INPUT: string;
  PASSWORD_INPUT: string;
  AGE_INPUT: string;
  INPUT_FOCUS: string;
  LOGIN_INPUT_FOCUS: string;
  LET_USER_REMEMBER_ME: boolean;
  IS_LOGGED_IN_USER: UsersLoginInterface;
  INPUT_DBL_CLICK: boolean;
  SUBMIT_INPUT_DATA: boolean,
  GOOGLE_LINK_ACCT_SCREEN: boolean;

  // * * * I C O N S 
  // ICON_NOT_INPUT
  
}

const initialState: logInOutGoogleSliceState = {
  // main
  HYDRO_SETTINGS: false,
  
  // login
  LOGIN_SIGNUP_BTN: false,

  CURRENT_USER: { id: 0, googleId: '', username: '', email: '', age: '' },
  ALL_USERS: [],
  ALL_USERNAMES: [],
  ALL_EMAILS: [],
  PARENT_CONFIRM: false,

  LOG_IN_OUT_TYPE: 'LOGIN',       // LogInOutGoogle.tsx [login] [signup] clck either one to select this state.
  LOG_IN_OUT_FLASH_MSG: '',
  DISPLAY_FORM: "",               // click hand.png to toggle the       [login] [signup]    buttons from appearing.
  PASSWORD_INPUT: "* * *",   
  PASSWORD_SHOW: false,
  LOGIN_PASSWORD_SHOW: false,
  PASSWORD_SHOW_CLICK: false,
  LOGIN_PASSWORD_SHOW_CLICK: false,
  GOOGLEID_INPUT: '',    
  GOOGLE_IMG_URL: '',
  NON_GOOGLE_IMG_URL: '',
  USER_SELECT_IMG_URL: '',

  USERNAME_INPUT_HOVER: false,
  EMAIL_INPUT_HOVER: false,
  AGE_INPUT_HOVER: false,
  PASSWORD_INPUT_HOVER: false,
  EMAIL_OR_USERNAME_LOGIN_INPUT: '@',
  PASSWORD_LOGIN_INPUT: '* * *',
  LOGIN_MSG: '',
  INCORRECT_LOGIN_ATTEMPT: 0,
  USERNAME_INPUT: "",
  EMAIL_INPUT: "",
  AGE_INPUT: "",
  INPUT_FOCUS: "",               // click on an input and it will hide 
  LOGIN_INPUT_FOCUS: "",
  LET_USER_REMEMBER_ME: false,
  IS_LOGGED_IN_USER: { id: 0, google_id: '', icon: '', username: '', password: '', email: '', age: 0, token: ''},
  // id: number, google_id: string, icon: string, username: string, password: string, email: string, age: number, token: string/
  INPUT_DBL_CLICK: false,
  SUBMIT_INPUT_DATA: false,     // form data complete, validated in LoginoutGoogle.tsx with $('.submit-faucet).click()4
  GOOGLE_LINK_ACCT_SCREEN: false,
  // end of login/signup state

  // * * * I C O N S


};

const logInOutGoogleSlice = createSlice({
    name: 'logInOutGoogle',
    initialState,
    reducers: {
        // login data
        TOGGLE_LOGIN_SIGNUP_BTN: (state) => { state.LOGIN_SIGNUP_BTN = !state.LOGIN_SIGNUP_BTN },
        TOGGLE_INPUT_FOCUS: (state, action) => { state.INPUT_FOCUS = action.payload},
        TOGGLE_LOGIN_INPUT_FOCUS: (state, action) => { state.LOGIN_INPUT_FOCUS = action.payload},

        
        SET_USERNAME_INPUT: (state, action) => { state.USERNAME_INPUT = action.payload; },
        SET_PASSWORD_INPUT: (state, action) => { state.PASSWORD_INPUT = action.payload; },
        SET_EMAIL_INPUT: (state, action) => { state.EMAIL_INPUT = action.payload; },
        SET_AGE_INPUT: (state, action) => { state.AGE_INPUT = action.payload; },
        TOGGLE_SHOW_FORM: (state, action) => { state.DISPLAY_FORM = action.payload },
        SET_LOGIN_MSG: (state, action) => { state.LOGIN_MSG = action.payload },
        TOGGLE_PASSWORD_SHOW_CLICK: (state) => { state.PASSWORD_SHOW_CLICK = !state.PASSWORD_SHOW_CLICK },
        TOGGLE_LOGIN_PASSWORD_SHOW_CLICK: (state) => { state.LOGIN_PASSWORD_SHOW_CLICK = !state.LOGIN_PASSWORD_SHOW_CLICK },
        TOGGLE_LET_USER_REMEMBER_ME: (state) => { state.LET_USER_REMEMBER_ME = !state.LET_USER_REMEMBER_ME },
        SET_IS_LOGGED_IN_USER: (state, action) => { state.IS_LOGGED_IN_USER = action.payload },

        TOGGLE_PARENT_CONFIRM: (state) => { state.PARENT_CONFIRM = !state.PARENT_CONFIRM },
        INCREMENT_INCORRECT_LOGIN_ATTEMPT: (state) => { state.INCORRECT_LOGIN_ATTEMPT = state.INCORRECT_LOGIN_ATTEMPT + 1 },
        RESET_INCORRECT_LOGIN_ATTEMPT: (state) => { state.INCORRECT_LOGIN_ATTEMPT = 0 },
        SET_EMAIL_OR_USERNAME_LOGIN_INPUT: (state, action) => { state.EMAIL_OR_USERNAME_LOGIN_INPUT = action.payload },
        SET_PASSWORD_LOGIN_INPUT: (state, action) => { state.PASSWORD_LOGIN_INPUT = action.payload },
        SET_ALL_USERNAMES: (state, action) => { state.ALL_USERNAMES = action.payload },
        SET_ALL_EMAILS: (state, action) => { state.ALL_EMAILS = action.payload },
        TOGGLE_SUBMIT_INPUT_DATA: (state) => { state.SUBMIT_INPUT_DATA = !state.SUBMIT_INPUT_DATA },
        SET_CURRENT_USER: (state, action) => { state.CURRENT_USER = action.payload },      
        SET_NON_GOOGLE_IMG_URL: (state, action) => { state.NON_GOOGLE_IMG_URL = action.payload },      
        // I C O N S ! ! ! 
        
      },        

      
})

export const { 
    TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_INPUT_FOCUS, TOGGLE_LOGIN_INPUT_FOCUS, TOGGLE_SHOW_FORM, SET_LOGIN_MSG, TOGGLE_LET_USER_REMEMBER_ME, SET_IS_LOGGED_IN_USER, 
    SET_USERNAME_INPUT, SET_PASSWORD_INPUT, SET_EMAIL_INPUT, SET_AGE_INPUT, SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT, INCREMENT_INCORRECT_LOGIN_ATTEMPT,
    TOGGLE_PASSWORD_SHOW_CLICK, TOGGLE_LOGIN_PASSWORD_SHOW_CLICK, TOGGLE_PARENT_CONFIRM, RESET_INCORRECT_LOGIN_ATTEMPT, SET_ALL_USERNAMES,
     SET_ALL_EMAILS, TOGGLE_SUBMIT_INPUT_DATA, SET_CURRENT_USER, SET_NON_GOOGLE_IMG_URL
 } = logInOutGoogleSlice.actions

export default logInOutGoogleSlice.reducer
export type logInOutGoogleState = logInOutGoogleSliceState