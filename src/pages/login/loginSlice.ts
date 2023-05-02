import {createSlice} from "@reduxjs/toolkit";

export interface LoginState {
}

const initialState: LoginState = {}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {}
})

export const {} = loginSlice.actions;
export default loginSlice.reducer;