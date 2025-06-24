import { useQuery } from "react-query"
import { getAllReservations } from "src/api/reservation/getAllReservations"

export const useGetAllReservations = () => {
    const { data, isLoading, isError } = useQuery(["getAllReservations"], () => getAllReservations(), {
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
