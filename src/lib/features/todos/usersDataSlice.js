import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: '',
    email: ''
};

const usersDataSlice = createSlice({
    name: 'usersData',
    initialState,
    reducers: {
        setRole(state, action) {
            state.role = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        }
    }
});

export const { setRole, setEmail } = usersDataSlice.actions;

export default usersDataSlice.reducer;