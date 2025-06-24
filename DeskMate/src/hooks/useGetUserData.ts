import { useQuery } from "react-query"
import { getUserData } from "src/api/getUserData"

export const useGetUserData = (userId?: string) => {
    const { data, isLoading, isError } = useQuery(["getUserData", userId], () => getUserData(userId || ""), {
        enabled: !!userId,
        refetchOnWindowFocus: false,
        cacheTime: 360000,
        staleTime: 360000,
    })

    return {
        userData: data,
        isLoading,
        isError,
    }
}
