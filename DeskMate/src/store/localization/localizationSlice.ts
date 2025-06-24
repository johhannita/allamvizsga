import { StateCreator } from "zustand"
import { LocalizationSlice, LocalizationState } from "./model"

const initialState: LocalizationState = {
    localization: {
        loaded: false,
        isError: true,
    },
}

export const createLocalizationSlice: StateCreator<LocalizationSlice> = (set) => ({
    ...initialState,
    localizationActions: {
        changeLanguage: (languageId: string) => set((state) => changeLanguage(state, languageId)),
        setLocalizationLoaded: () => set((state) => setLocalizationLoaded(state)),
        setIsError: () => set((state) => setIsError(state)),
    },
})

function changeLanguage(state: LocalizationSlice, languageId: string): LocalizationSlice {
    return {
        ...state,
        localization: {
            ...state.localization,
            languageId,
        },
    }
}
function setLocalizationLoaded(state: LocalizationSlice): LocalizationSlice {
    return {
        ...state,
        localization: {
            ...state.localization,
            loaded: true,
        },
    }
}

function setIsError(state: LocalizationSlice): LocalizationSlice {
    return {
        ...state,
        localization: {
            ...state.localization,
            isError: false,
        },
    }
}
