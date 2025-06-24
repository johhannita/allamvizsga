export type Translations = Record<string, string>

export type LocalizationConfig = {
    language: string
    id: string
    translation: Translations
}

export interface ILocalizationContext {
    language: string | undefined
    languageId: string | undefined
    translateText(key: number | string): string
    changeLanguage(locale: string): void
    availableLanguages: AvailableLanguages | undefined
}

export type AvailableLanguages = Translations
