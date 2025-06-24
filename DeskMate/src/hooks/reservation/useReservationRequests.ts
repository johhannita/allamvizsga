import { useQuery } from "react-query"
import { getReservationRequests } from "src/api/reservation/getReservationRequests"
import { ReservationStatus } from "src/models/request"
import { useDeskMateStore } from "src/store"

export const useReservationRequests = (userId?: string) => {
    const { auth } = useDeskMateStore()
    const { data, isLoading, isError } = useQuery(["getReservationRequests", userId || auth.id], () => getReservationRequests(userId || auth.id), {
        refetchOnWindowFocus: false,
        cacheTime: 360000,
        staleTime: 360000,
    })

    let resp
    if (userId) {
        resp = data?.filter((r) => r.status === ReservationStatus.Requested)
    } else {
        resp = data
    }

    return {
        requests: resp || [],
        isLoading,
        isError,
    }
}
