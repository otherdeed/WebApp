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
        regUser: async (state) => {
            try {
                const response = await fetch("http://localhost:8888/stavropol/php/registration.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(state.registrationData),
                });
        
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
                }
        
                const data = await response.json();
                state.statusMessage = data.message
        
                const blockReg = document.querySelector('.blockReg');
                const textReg = document.querySelector('.textReg');
                const resMess = 'Почта, телефон или имя пользователя уже существуют';
        
                if (data.message !== resMess) {
                    blockReg.classList.add('hidden');
                    textReg.classList.remove('hidden'); 
                    textReg.classList.add('visible');
                }
            } catch (error) {
                state.statusMessage = `Ошибка регистрации: ${error.message}`
            }
        }
    },
    updateFormData: (state, action) => {
        const { name, value } = action.payload;
        state.formData[name] = value;
    },
})

export const { updateFormData, regUser} = registrationSlice.actions;
export default registrationSlice.reducer;
