import { useQuery } from "react-query"
import { getHomeOfficeRequests } from "src/api/reservation/getHomeOfficeRequests"
import { useDeskMateStore } from "src/store"

export const useHomeOfficeRequests = () => {
    const { auth } = useDeskMateStore()
    const { data, isLoading, isError } = useQuery(["getHomeOfficeRequest", auth.id], () => getHomeOfficeRequests(auth.id), {
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
