import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { AuthStoreSlice, createAuthStoreSlice } from "./auth"
import { createLocalizationSlice, LocalizationSlice } from "./localization"
import { createNotificationStoreSlice, NotificationStoreSlice } from "./notification"

export type MainStore = AuthStoreSlice & LocalizationSlice & NotificationStoreSlice

export const useDeskMateStore = create<MainStore>()(
    devtools(
        (...a) => ({
            ...createAuthStoreSlice(...a),
            ...createLocalizationSlice(...a),
            ...createNotificationStoreSlice(...a),
        }),
        { name: "Desk Mate Store" },
    ),
)

export const { authStoreActions, localizationActions, notificationStoreActions } = useDeskMateStore.getState()
