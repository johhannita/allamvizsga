import { useQuery } from "react-query"
import { getAvailableLanguages } from "../../api/language/getAvailableLanguages"

export const useGetAvailableLanguages = () => {
    const { data, isLoading, isError } = useQuery(["availableLanguages"], () => getAvailableLanguages(), {
        refetchOnWindowFocus: false,
        cacheTime: 360000,
        staleTime: 360000,
    })

    return {
        availableLanguages: data,
        availableLanguagesIsLoading: isLoading,
        availableLanguagesIsError: isError,
    }
}
