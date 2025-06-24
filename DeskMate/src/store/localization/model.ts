export type LocalizationSlice = LocalizationAction & LocalizationState

export type LocalizationAction = {
    localizationActions: {
        changeLanguage: (languageId: string) => void
        setLocalizationLoaded: () => void
        setIsError: () => void
    }
}

export type LocalizationState = {
    localization: {
        loaded: boolean
        languageId?: string | undefined
        isError?: boolean
    }
}
