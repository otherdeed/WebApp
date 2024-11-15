import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [
            { id: 1, message: 'Уведомление 1' },
            { id: 2, message: 'Уведомление 2' },
            { id: 3, message: 'Уведомление 3' },
            { id: 4, message: 'Уведомление 4' },
            { id: 5, message: 'Уведомление 5' },
            { id: 6, message: 'Уведомление 6' }
        ],
    },
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action) => {
            const updatedNotifications = state.notifications.filter(notification => notification.id !== action.payload.id);
            state.notifications = updatedNotifications;
        },
    },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
