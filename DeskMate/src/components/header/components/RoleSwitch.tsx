import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import PersonIcon from "@mui/icons-material/Person"
import { styled, Switch } from "@mui/material"
import { ERole } from "src/models/auth"
import { authStoreActions, useDeskMateStore } from "src/store"

export function RoleSwitch() {
    const { selectedRole } = useDeskMateStore()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            authStoreActions.setSelectedRole(ERole.Admin)
            window.location.reload()
        } else {
            authStoreActions.setSelectedRole(ERole.User)
        }
    }
    return (
        <StyledSwitch
            checked={selectedRole === ERole.Admin}
            onChange={onChange}
            size="medium"
            icon={<PersonIcon />}
            checkedIcon={<AdminPanelSettingsIcon />}
        />
    )
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
    width: 80,
    height: 45,
    marginRight: "1em",
    "& .MuiSwitch-switchBase": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        height: 45,
        width: 45,
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
        },
        "&.Mui-checked": {
            color: "white",
            justifyContent: "flex-end",
            transform: "translateX(35px)",
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
            },
            "& + .MuiSwitch-track": {
                backgroundColor: "black",
                opacity: "0.1",
            },
        },
        "& + .MuiSwitch-track": {
            opacity: "0.1",
            borderRadius: 10,
        },
    },
}))

const setUrl = (svg: string) => {
    return `url('data:image/svg+xml;base64,${btoa(svg)}')`
}
