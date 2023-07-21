import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    loggedIn: false,
    username: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialStateValue,
    reducers: {
        setLogin: (state, action) => {
            state.loggedIn = action.payload.auth;
            state.username = action.payload.user;
            localStorage.setItem("access-token", action.payload.accessToken);
            localStorage.setItem("refresh-token", action.payload.refreshToken);
        },
        setLogout: (state) => {
            state.loggedIn = false;
            state.username = false;
            window.localStorage.removeItem("refresh-token");
            window.localStorage.removeItem("access-token");
        },
        refreshLogin: (state, action) => {
            state.loggedIn = action.payload.auth;
            localStorage.setItem("access-token", action.payload.token);
        }
    }
});

export const { setLogin, setLogout, refreshLogin } = userSlice.actions;

export default userSlice.reducer;