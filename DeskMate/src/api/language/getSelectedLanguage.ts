import deLanguage from "src/assets/languages/1.json"
import daLanguage from "src/assets/languages/10.json"
import fiLanguage from "src/assets/languages/13.json"
import ptLanguage from "src/assets/languages/15.json"
import elLanguage from "src/assets/languages/20.json"
import hrLanguage from "src/assets/languages/24.json"
import enLanguage from "src/assets/languages/4.json"
import frLanguage from "src/assets/languages/6.json"
import itLanguage from "src/assets/languages/7.json"
import esLanguage from "src/assets/languages/8.json"
import nlLanguage from "src/assets/languages/9.json"
import { LocalizationConfig } from "../../providers/localization/localizationModels"

export const getSelectedLanguage = (languageId: string): LocalizationConfig | undefined => {
    switch (languageId) {
        case "1":
            return deLanguage
        case "4":
            return enLanguage
        case "6":
            return frLanguage
        case "7":
            return itLanguage
        case "8":
            return esLanguage
        case "9":
            return nlLanguage
        case "10":
            return daLanguage
        case "13":
            return fiLanguage
        case "15":
            return ptLanguage
        case "20":
            return elLanguage
        case "24":
            return hrLanguage
        default:
            return undefined
    }
}
