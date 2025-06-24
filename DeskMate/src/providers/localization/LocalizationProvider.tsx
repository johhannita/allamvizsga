import { Box, CircularProgress, Typography, useTheme } from "@mui/material"
import { PropsWithChildren, useEffect } from "react"
import { getLanguageIdFromSessionStorage } from "src/helpers/sessionStorage"
import { useOnMount } from "src/hooks/common/useOnMount"
import { useGetSelectedLanguage } from "src/hooks/language/useGetSelectedLanguage"
import { localizationActions, useDeskMateStore } from "src/store"

const initialLanguageId = "4"

export function LocalizationProvider({ children }: PropsWithChildren) {
    const selectedLanguageId = useDeskMateStore((state) => state.localization?.languageId)
    const { selectedLanguage, selectedLanguageIsLoading, selectedLanguageIsError } = useGetSelectedLanguage(selectedLanguageId)
    const localizationLoaded = useDeskMateStore((state) => state.localization?.loaded)
    const localizationError = useDeskMateStore((state) => state.localization.isError)

    const theme = useTheme()

    useOnMount(() => {
        const selectedLanguageId = getLanguageIdFromSessionStorage() || initialLanguageId
        localizationActions.changeLanguage(selectedLanguageId)
    })

    useEffect(() => {
        if (!selectedLanguageIsLoading && !selectedLanguageIsError && selectedLanguage) {
            localizationActions.setLocalizationLoaded()
        }

        if (!selectedLanguageIsError && selectedLanguage) {
            localizationActions.setIsError()
        }
    }, [selectedLanguageIsLoading, selectedLanguageIsError])

    return (
        <>
            {!localizationLoaded && (
                <Box bgcolor={theme.palette.background.paper} height="97vh" display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            )}

            {localizationError && (
                <Box bgcolor={theme.palette.background.paper} height="97vh" display="flex" justifyContent="center" alignItems="center">
                    <Typography fontWeight="700">Oops, sometimes the technology also fails with us.</Typography>
                </Box>
            )}

            {localizationLoaded && !localizationError && children}
        </>
    )
}
