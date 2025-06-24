import { Dayjs } from "dayjs"
import { useMutation, useQueryClient } from "react-query"
import { modifyReservationStatus, ModifyReservationStatusReq } from "src/api/reservation/modifyReservationStatus"
import { useLocalization } from "src/providers/localization/useLocalization"
import { notificationStoreActions, useDeskMateStore } from "src/store"

export const useModifyReservationStatusMutation = (reqDate: Dayjs) => {
    const queryClient = useQueryClient()
    const { translateText } = useLocalization()
    const { auth } = useDeskMateStore()

    const modifyReservationStatusMutation = useMutation(
        async (modifyStatusReq: ModifyReservationStatusReq) => {
            await modifyReservationStatus(modifyStatusReq)
            return modifyStatusReq
        },
        {
            onSuccess: async () => {
                notificationStoreActions.setNotification(translateText(40), "success")
                await queryClient.invalidateQueries(["getSpaces", reqDate.format("YYYY-MM-DD")])
                await queryClient.invalidateQueries(["getReservationRequests", auth.id])
                await queryClient.invalidateQueries(["getHomeOfficeRequest", auth.id])
                await queryClient.invalidateQueries(["getAllReservations"])
            },

            onError: () => {
                notificationStoreActions.setNotification(translateText(31), "error")
            },
        },
    )

    return {
        mutate: modifyReservationStatusMutation.mutate,
        mutateAsync: modifyReservationStatusMutation.mutateAsync,
        isLoading: modifyReservationStatusMutation.isLoading,
        isError: modifyReservationStatusMutation.isError,
    }
}
