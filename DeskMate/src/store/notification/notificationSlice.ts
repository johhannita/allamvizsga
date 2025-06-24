import { AlertColor } from "@mui/material"
import { StateCreator } from "zustand"
import { NotificationStoreSlice, NotificationStoreState } from "./model"

const initialState: NotificationStoreState = {
    notification: {
        message: "",
        variant: undefined,
        visible: false,
    },
}

export const createNotificationStoreSlice: StateCreator<NotificationStoreSlice> = (set) => ({
    ...initialState,
    notificationStoreActions: {
        setNotification: (message: string, variant?: AlertColor) => set((state) => setNotification(state, message, variant)),
        closeNotification: () => set((state) => closeNotification(state)),
    },
})

function setNotification(state: NotificationStoreSlice, message: string, variant?: AlertColor): NotificationStoreSlice {
    return {
        ...state,
        notification: {
            message,
            variant: variant || "info",
            visible: true,
        },
    }
}

function closeNotification(state: NotificationStoreSlice): NotificationStoreSlice {
    return {
        ...state,
        notification: {
            message: "",
            variant: undefined,
            visible: false,
        },
    }
}
