import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface logInOutGoogleSliceState {
    LOGIN_SIGNUP_BTN: boolean;      // logInOutGoogle.tsx -> hand.png.click() -> display [login] [signup] buttons.

}

const initialState: logInOutGoogleState = {
    LOGIN_SIGNUP_BTN: false
}

const logInOutGoogleSlice = createSlice({
    name: 'logInOutGoogle',
    initialState,
    reducers: {
        TOGGLE_LOGIN_SIGNUP_BTN: (state) => {
            state.LOGIN_SIGNUP_BTN = !state.LOGIN_SIGNUP_BTN
        }
    }
})

export const { TOGGLE_LOGIN_SIGNUP_BTN } = logInOutGoogleSlice.actions
export default logInOutGoogleSlice.reducer
export type logInOutGoogleState = logInOutGoogleSliceState