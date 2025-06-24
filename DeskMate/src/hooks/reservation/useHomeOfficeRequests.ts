import { useQuery } from "react-query"
import { getHomeOfficeRequests } from "src/api/reservation/getHomeOfficeRequests"
import { ReservationStatus } from "src/models/request"
import { useDeskMateStore } from "src/store"

export const useHomeOfficeRequests = (userId?: string) => {
    const { auth } = useDeskMateStore()
    const { data, isLoading, isError } = useQuery(["getHomeOfficeRequest", userId || auth.id], () => getHomeOfficeRequests(userId || auth.id), {
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
