import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import DashboardIcon from "@mui/icons-material/Dashboard"
import DeskIcon from "@mui/icons-material/Desk"
import HomeIcon from "@mui/icons-material/Home"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import { IconButton, styled } from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useNavigate } from "react-router-dom"
import { Path } from "src/models"
import { ERole } from "src/models/auth"
import { useDeskMateStore } from "src/store"

type MenuProps = {
    open: boolean
    handleMenu: () => void
}
export default function MenuComponent(props: MenuProps) {
    const { open, handleMenu } = props
    const navigate = useNavigate()
    const { selectedRole } = useDeskMateStore()

    const menuItems = Object.values(Path).filter((path) =>
        selectedRole === ERole.Admin ? path === Path.Dashboard || path === Path.UserProfile : path,
    )

    const handleSelect = async (menuItem: Path) => {
        await navigate(`/${menuItem}`)
    }

    const menuItemIcon = (menuItem: Path) => {
        switch (menuItem) {
            case Path.Dashboard:
                return <DashboardIcon />
            case Path.Reservation:
                return <DeskIcon />
            case Path.HomeOffice:
                return <HomeIcon />
            case Path.YearlyOverview:
                return <CalendarMonthIcon />
            case Path.UserProfile:
                return <AccountCircleIcon />
            default:
                return null
        }
    }

    const Header = (
        <DrawerHeader>
            <IconButton color="primary" onClickCapture={handleMenu}>
                <MenuOpenIcon />
            </IconButton>
        </DrawerHeader>
    )

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleMenu}>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item} disablePadding onClick={() => handleSelect(item)}>
                        <ListItemButton>
                            <ListItemIcon>{menuItemIcon(item)}</ListItemIcon>
                            <ListItemText primary={item.charAt(0).toUpperCase() + item.slice(1)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <div>
            <Drawer open={open} variant="persistent" anchor="left" onClose={handleMenu}>
                {Header}
                <Divider />
                {DrawerList}
            </Drawer>
        </div>
    )
}

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}))
