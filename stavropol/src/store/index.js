import {configureStore} from '@reduxjs/toolkit'
import notificationSlice from './client/notificationSlice'
import registrationSlice from './client/registrationSlice'
import adminSlice from './admin/adminSlice'
import telegramDataSlice from './client/telegramDataSlice'
export default configureStore({
    reducer: {
        notifications: notificationSlice,
        registration: registrationSlice,
        admin: adminSlice,
        telegramDataSlice:  telegramDataSlice
    }
})