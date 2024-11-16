import { createSlice } from "@reduxjs/toolkit";

const adminSlice  = createSlice({
    name: "admin",
    initialState: {
        workers: [
            { access: 'moderator', login: 'mod', password: '123', name:'Ivan', surname:'Ivanov' },
            { access: 'seniorModerator', login: 'senMod', password: '321', name:'Denis', surname:'Denisov' },
            { access: 'administrator', login: 'admin', password: '111', name:'Timur', surname:'Timurov' }
          ],
          thisEmployee:new Object(),
          thisHistory:[],
          isAuthorized: false,
          applicationsregistration:[],
          myIp:'',
          callBackMess:'',
          statusMessage:''
    },
    reducers: {
        getMyIp: (state, action) =>{
            state.myIp = action.payload;
        },
        thisEmployee: (state, action) =>{
            state.thisEmployee = action.payload;
        }
    }
})

export const {getMyIp, thisEmployee} = adminSlice.actions;

export default adminSlice.reducer;