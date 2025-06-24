import MenuIcon from "@mui/icons-material/Menu"
import { IconButton, Stack, styled, Toolbar, Typography } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { useState } from "react"
import { LanguagePicker } from "./components/LanguagePicker"
import MenuComponent from "./components/MenuComponent"
import { RoleSwitch } from "./components/RoleSwitch"

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    const openMenu = () => {
        setMenuOpen(true)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <AppBar position="relative" open={menuOpen} sx={{ backgroundColor: "white" }}>
            <StyledToolbar variant="dense">
                <Stack direction="row" gap={1} alignItems="center">
                    <IconButton onClick={openMenu} sx={[menuOpen && { display: "none" }]}>
                        <MenuIcon color="primary" />
                    </IconButton>
                    <Typography variant="h3" color="primary">
                        Desk Mate
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <RoleSwitch />
                    <LanguagePicker />
                </Stack>
            </StyledToolbar>
            <MenuComponent open={menuOpen} handleMenu={closeMenu} />
        </AppBar>
    )
}

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}))

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
})
