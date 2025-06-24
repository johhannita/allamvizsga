import { useQuery } from "react-query"
import { getSelectedLanguage } from "../../api/language/getSelectedLanguage"

export const useGetSelectedLanguage = (languageId?: string) => {
    const { data, isLoading, isError } = useQuery(`selectedLanguage_${languageId!}`, () => getSelectedLanguage(languageId!), {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        enabled: !!languageId,
        cacheTime: 60000,
        staleTime: 60000,
    })

    return {
        selectedLanguage: data,
        selectedLanguageIsLoading: isLoading,
        selectedLanguageIsError: isError,
    }
}
