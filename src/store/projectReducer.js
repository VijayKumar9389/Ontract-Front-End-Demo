import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    project: '',
    isOpen: false,
}

export const projectSlice = createSlice({
    name: 'project',
    initialState: initialStateValue,
    reducers: {
        setOpen: (state) => {
            state.isOpen = !state.isOpen;
        },
    }
});

export const { setOpen } = projectSlice.actions;

export default projectSlice.reducer;