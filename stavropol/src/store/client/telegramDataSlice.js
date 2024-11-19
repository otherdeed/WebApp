import { createSlice } from '@reduxjs/toolkit';

const telegramDataSlice = createSlice({
    name: 'telegramDataSlice',
    initialState: {
        tgDataUser:{
            userID:'',
            platform: '',
            userName: '',
            user: '',
            chatId: '',
        }
    },
    reducers: {
        addDataUser:  (state, action) => {
            state.tgDataUser  = {
                ...action.payload
            };
        }

    },
});

export const {addDataUser} = telegramDataSlice.actions;

export default telegramDataSlice.reducer;
