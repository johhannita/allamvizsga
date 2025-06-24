import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { getFlag } from "src/helpers/getFlag"
import { useLocalization } from "src/providers/localization/useLocalization"

export function LanguagePicker() {
    const { availableLanguages, changeLanguage, languageId } = useLocalization()

    const handleChange = (event: SelectChangeEvent) => {
        changeLanguage(event.target.value)
    }

    return (
        <Select
            value={languageId}
            onChange={handleChange}
            variant="standard"
            IconComponent={KeyboardArrowDownIcon}
            SelectDisplayProps={{
                style: { display: "flex", width: "fit-content" },
            }}
        >
            {Object.keys(availableLanguages ?? {}).map((id) => {
                return (
                    <MenuItem key={id} value={id}>
                        {getFlag(parseInt(id))}
                        {availableLanguages?.[id]}
                    </MenuItem>
                )
            })}
        </Select>
    )
}
