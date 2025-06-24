import { useMutation, useQueryClient } from "react-query"
import { reserveSpace, ReserveSpaceReq } from "src/api/reservation/reserveSpace"
import { useLocalization } from "src/providers/localization/useLocalization"
import { notificationStoreActions, useDeskMateStore } from "src/store"

export const useReserveSpaceMutation = () => {
    const queryClient = useQueryClient()
    const { translateText } = useLocalization()
    const { auth } = useDeskMateStore()

    const reserveSpaceMutation = useMutation(
        async (reserveSpaceReq: ReserveSpaceReq) => {
            await reserveSpace(reserveSpaceReq)
            return reserveSpaceReq
        },
        {
            onSuccess: async (reserveSpaceReq) => {
                notificationStoreActions.setNotification(translateText(40), "success")

                await queryClient.invalidateQueries(["getSpaces", reserveSpaceReq.date.format("YYYY-MM-DD")])
                await queryClient.invalidateQueries(["getReservationRequests", auth.id])
                await queryClient.invalidateQueries(["getHomeOfficeRequest", auth.id])
            },

            onError: () => {
                notificationStoreActions.setNotification(translateText(31), "error")
            },
        },
    )

    return {
        mutate: reserveSpaceMutation.mutate,
        mutateAsync: reserveSpaceMutation.mutateAsync,
        isLoading: reserveSpaceMutation.isLoading,
        isError: reserveSpaceMutation.isError,
    }
}
