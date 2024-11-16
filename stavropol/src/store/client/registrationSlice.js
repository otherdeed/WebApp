import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
    name: "registration",
    initialState: {
        isRegistrationOpen: false,
        registrationData: {
            name: "",
            email: "",
            phone: "",
            username: "",
            tgId: "",
        },
        statusMessage: "",
    },
    reducers:{
        updateFormData: (state, action) => {
            const { name, value } = action.payload;
            state.registrationData[name] = value;
        },
        setStatusMessage: (state, action) => {
            state.statusMessage = action.payload;
        },  
    },
})

export const { updateFormData, setStatusMessage} = registrationSlice.actions;
export default registrationSlice.reducer;
