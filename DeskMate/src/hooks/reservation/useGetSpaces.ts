import { Dayjs } from "dayjs"
import { useQuery } from "react-query"
import { getSpaces } from "src/api/reservation/getSpaces"
import { Space } from "src/models/space"

export const useGetSpaces = (date: Dayjs) => {
    const { data, isLoading, isError } = useQuery<{ spaces: Space[] }, Error>(["getSpaces", date.format("YYYY-MM-DD")], () => getSpaces(date), {
        refetchOnWindowFocus: false,
        cacheTime: 360000,
        staleTime: 360000,
    })

    return {
        spaces: data?.spaces || [],
        isLoading,
        isError,
    }
}
