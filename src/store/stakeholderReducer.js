import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    value: 0,
    contacted: null,
    attempted: null,
    province: "",
    city: "",
    search: {
        type: 0,
        txt: ''
    },
    stakeholder: 0
}

export const stakeholderSlice = createSlice({
    name: 'stakeholderFilter',
    initialState: initialStateValue,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
        setProvince: (state, action) => {
            state.province = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setSearch: (state, action) => {
            state.search.txt = action.payload;
        },
        setSearchType: (state, action) => {
            state.search.type = action.payload;
        },
        setStakeholderType: (state, action) => {
            state.stakeholder = action.payload;
        },
        setAttempted: (state, action) => {
            state.attempted = action.payload;
        },
        setContacted: (state, action) => {
            state.contacted = action.payload;
        },
        clearSearch: (state) => {
            state.search.txt = '';
        },
        changeLocation: (state, action) => {
            state.location = action.payload;
            window.scrollTo(0, 0);
        },
        clearLocation: (state) => {
            state.location = { province: "", city: "", cityList: [] };
            window.scrollTo(0, 0);
        },
        clear: (state) => {
            return initialStateValue;
        },
        export: (state, action) => {
            
        }
    }
});

export const { setValue, clear, setAttempted, setContacted, setProvince, setCity, setSearchType, setStakeholderType, setSearch, changeLocation, clearSearch, clearLocation } = stakeholderSlice.actions;

export default stakeholderSlice.reducer;
