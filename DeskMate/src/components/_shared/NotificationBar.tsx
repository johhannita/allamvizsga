import { Alert, Snackbar } from "@mui/material"
import { notificationStoreActions, useDeskMateStore } from "src/store"

export function NotificationBar() {
    const { notification } = useDeskMateStore()
    const { visible, message, variant } = notification
    return (
        <Snackbar
            open={visible}
            autoHideDuration={4000}
            onClose={notificationStoreActions.closeNotification}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert severity={variant} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    )
}
