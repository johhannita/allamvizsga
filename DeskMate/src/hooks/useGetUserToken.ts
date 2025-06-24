import { useQuery } from "react-query"
import { getUserToken } from "src/api/getToken"

export const useGetUserToken = (email: string, password: string) => {
    const { data, isLoading, isError } = useQuery(["getUserToken"], () => getUserToken(email, password), {
        refetchOnWindowFocus: false,
        enabled: !!email.length && !!password.length,
        cacheTime: 360000,
        staleTime: 360000,
    })

    return {
        token: data,
        tokenIsLoading: isLoading,
        tokenIsError: isError,
    }
}
