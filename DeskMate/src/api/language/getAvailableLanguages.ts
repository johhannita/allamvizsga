import languages from "src/assets/languages/language.json"
import { AvailableLanguages } from "../../providers/localization/localizationModels"

export const getAvailableLanguages = () => {
    return languages as AvailableLanguages
}
