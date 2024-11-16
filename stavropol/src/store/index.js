import {configureStore} from '@reduxjs/toolkit'
import notificationSlice from './client/notificationSlice'
import registrationSlice from './client/registrationSlice'
import adminSlice from './admin/adminSlice'
export default configureStore({
    reducer: {
        notifications: notificationSlice,
        registration: registrationSlice,
        admin: adminSlice
    }
})