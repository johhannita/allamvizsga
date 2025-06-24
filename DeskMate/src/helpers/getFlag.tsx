import DEflag from "src/assets/icons/flags/de.svg?react"
import ENflag from "src/assets/icons/flags/en.svg?react"
import DAflag from "src/assets/icons/flags/da.svg?react"
import ELflag from "src/assets/icons/flags/el.svg?react"
import ESflag from "src/assets/icons/flags/es.svg?react"
import FIflag from "src/assets/icons/flags/fi.svg?react"
import FRflag from "src/assets/icons/flags/fr.svg?react"
import HRflag from "src/assets/icons/flags/hr.svg?react"
import ITflag from "src/assets/icons/flags/it.svg?react"
import NLflag from "src/assets/icons/flags/nl.svg?react"
import PTflag from "src/assets/icons/flags/pt.svg?react"

const flagStyle = {
    height: "1em",
    paddingRight: "0.25em",
    alignSelf: "center",
}

export const getFlag = (languageId: number) => {
    switch (languageId) {
        case 1:
            return <DEflag style={flagStyle} />
        case 4:
            return <ENflag style={flagStyle} />
        case 6:
            return <FRflag style={flagStyle} />
        case 7:
            return <ITflag style={flagStyle} />
        case 8:
            return <ESflag style={flagStyle} />
        case 9:
            return <NLflag style={flagStyle} />
        case 10:
            return <DAflag style={flagStyle} />
        case 13:
            return <FIflag style={flagStyle} />
        case 15:
            return <PTflag style={flagStyle} />
        case 20:
            return <ELflag style={flagStyle} />
        case 24:
            return <HRflag style={flagStyle} />
        default:
            break
    }
}
