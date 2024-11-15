import {configureStore} from '@reduxjs/toolkit'
import notificationSlice from './notificationSlice'
import registrationSlice from './registrationSlice'
export default configureStore({
    reducer: {
        notifications: notificationSlice,
        registration: registrationSlice,
    }
})