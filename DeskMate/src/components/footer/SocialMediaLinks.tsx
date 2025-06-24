import { Box, styled } from "@mui/material"
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import XingLogo from "src/assets/icons/logos/xing-logo.svg?react"
import LinkedInLogo from "src/assets/icons/logos/linkedin-logo.svg?react"
import FacebookLogo from "src/assets/icons/logos/facebook-logo.svg?react"
import { SocialMediaLogoTypes } from "src/models/models"

export function SocialMediaLinks() {
    const logos: SocialMediaLogoTypes[] = ["news", "facebook", "instagram", "youtube", "linkedin", "xing"]

    const handleSocialMediaLogo = (logoType: SocialMediaLogoTypes) => {
        switch (logoType) {
            case "news":
                return (
                    <LogoBox key={logoType}>
                        <CampaignOutlinedIcon style={{ color: "white" }} />
                    </LogoBox>
                )
            case "facebook":
                return (
                    <LogoBox key={logoType}>
                        <FacebookLogo height="1em" width="1em" style={{ padding: "0.25em" }} />
                    </LogoBox>
                )
            case "instagram":
                return (
                    <LogoBox key={logoType}>
                        <InstagramIcon style={{ color: "white" }} />
                    </LogoBox>
                )
            case "youtube":
                return (
                    <LogoBox key={logoType}>
                        <YouTubeIcon style={{ color: "white" }} />
                    </LogoBox>
                )
            case "linkedin":
                return (
                    <LogoBox key={logoType}>
                        <LinkedInLogo height="1em" width="1em" style={{ padding: "0.25em" }} />
                    </LogoBox>
                )
            case "xing":
                return (
                    <LogoBox key={logoType}>
                        <XingLogo height="1em" width="1em" style={{ padding: "0.25em" }} />
                    </LogoBox>
                )
            default:
                break
        }
    }

    return (
        <Box paddingRight="8em" display="flex" gap={1}>
            {logos.map((logo) => handleSocialMediaLogo(logo))}
        </Box>
    )
}

const LogoBox = styled(Box)(({ theme }) => ({
    padding: "0.3em",
    border: "1px solid white",
    borderRadius: "1.5em",
    aspectRatio: "1/1",
    height: "1.5em",
    cursor: "pointer",
    "&:hover": {
        boxShadow: `0px 0px 0.25em ${theme.palette.grey[300]}`
    }
}))
