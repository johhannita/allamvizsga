import { useQuery } from "react-query"
import { getReservationRequests } from "src/api/reservation/getReservationRequests"
import { useDeskMateStore } from "src/store"

export const useReservationRequests = () => {
    const { auth } = useDeskMateStore()
    const { data, isLoading, isError } = useQuery(["getReservationRequests", auth.id], () => getReservationRequests(auth.id), {
        refetchOnWindowFocus: false,
        cacheTime: 360000,
        staleTime: 360000,
    })

    return {
        requests: data || [],
        isLoading,
        isError,
    }
}
