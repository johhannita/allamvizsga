import { Box, Link, styled } from "@mui/material"
import CookieIcon from "src/assets/icons/common/cookie.svg?react"
import { useLocalization } from "src/providers/localization/useLocalization"
import { SocialMediaLinks } from "./SocialMediaLinks"

export function Footer() {
    const { translateText } = useLocalization()

    return (
        <StyledFooter>
            <FooterWhitePart>
                <Box sx={{ cursor: "pointer" }}>
                    <CookieIcon height="3em" style={{ margin: ".3em 0 0 3em" }} />
                </Box>
            </FooterWhitePart>
            <FooterGreyPart>
                <Box display="flex" paddingLeft="8em" gap={3}>
                    <Link href="#" underline="hover" color="white" textTransform="uppercase">
                        {translateText(7)}
                    </Link>
                    <Link href="#" underline="hover" color="white" textTransform="uppercase">
                        {translateText(8)}
                    </Link>
                </Box>
                <SocialMediaLinks />
            </FooterGreyPart>
        </StyledFooter>
    )
}

const StyledFooter = styled(Box)({
    height: "6em",
    width: "100%",
    position: "sticky"
})

const FooterWhitePart = styled(Box)({
    height: "2.5em",
    backgroundColor: "white"
})

const FooterGreyPart = styled(Box)(({ theme }) => ({
    height: "4em",
    backgroundColor: theme.palette.grey[500],
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}))
