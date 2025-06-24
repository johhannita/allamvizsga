import { useMutation, useQueryClient } from "react-query"
import { reserveHomeOffice, ReserveHomeOfficeReq } from "src/api/reservation/reserveHomeOffice"
import { useLocalization } from "src/providers/localization/useLocalization"
import { notificationStoreActions, useDeskMateStore } from "src/store"

export const useReserveHomeOfficeMutation = () => {
    const queryClient = useQueryClient()
    const { translateText } = useLocalization()
    const { auth } = useDeskMateStore()

    const reserveHomeOfficeMutation = useMutation(
        async (reserveHomeOfficeReq: ReserveHomeOfficeReq) => {
            await reserveHomeOffice(reserveHomeOfficeReq)
            return reserveHomeOfficeReq
        },
        {
            onSuccess: async (reserveHomeOfficeReq) => {
                notificationStoreActions.setNotification(translateText(40), "success")

                await queryClient.invalidateQueries(["getSpaces", reserveHomeOfficeReq.date.format("YYYY-MM-DD")])
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
        mutate: reserveHomeOfficeMutation.mutate,
        mutateAsync: reserveHomeOfficeMutation.mutateAsync,
        isLoading: reserveHomeOfficeMutation.isLoading,
        isError: reserveHomeOfficeMutation.isError,
    }
}
