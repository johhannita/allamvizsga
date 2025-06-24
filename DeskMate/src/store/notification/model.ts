import { AlertColor } from "@mui/material"

export type NotificationStoreSlice = NotificationStoreAction & NotificationStoreState

export type NotificationStoreAction = {
    notificationStoreActions: {
        setNotification: (message: string, variant?: AlertColor) => void
        closeNotification: () => void
    }
}

export type NotificationStoreState = {
    notification: {
        message: string
        variant?: AlertColor
        visible: boolean
    }
}
