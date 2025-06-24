import { Dayjs } from "dayjs"
import { useQuery } from "react-query"
import { getYearlyOverview } from "src/api/reservation/getYearlyOverview"
import { useDeskMateStore } from "src/store"

export const useGetYearlyOverview = (year: Dayjs) => {
    const { auth } = useDeskMateStore()
    const { data, isLoading, isError } = useQuery(["getYearlyOverview", auth.id], () => getYearlyOverview(auth.id, year), {
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
