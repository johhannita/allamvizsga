import { useCallback, useMemo } from "react"
import { setLanguageIdToSessionStorage } from "src/helpers/sessionStorage"
import { useGetAvailableLanguages } from "src/hooks/language/useGetAvailableLanguages"
import { useGetSelectedLanguage } from "src/hooks/language/useGetSelectedLanguage"
import { localizationActions, useDeskMateStore } from "src/store"
import { ILocalizationContext } from "./localizationModels"

export function useLocalization() {
    const selectedLanguageId = useDeskMateStore((state) => state.localization.languageId)
    const { availableLanguages } = useGetAvailableLanguages()
    const { selectedLanguage } = useGetSelectedLanguage(selectedLanguageId)

    const changeLanguage = useCallback((languageId: string) => {
        setLanguageIdToSessionStorage(languageId)
        localizationActions.changeLanguage(languageId)
    }, [])

    const translateText = useCallback((key: number | string) => selectedLanguage?.translation?.[key] ?? `#${key} not found!`, [selectedLanguage])

    const localizationContext = useMemo(() => {
        const context: ILocalizationContext = {
            language: selectedLanguage?.language,
            languageId: selectedLanguage?.id,
            translateText,
            changeLanguage,
            availableLanguages,
        }
        return context
    }, [changeLanguage, translateText, selectedLanguage, availableLanguages])

    return localizationContext
}
