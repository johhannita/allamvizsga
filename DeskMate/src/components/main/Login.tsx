import { Alert, Box, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserToken } from "src/api/getToken"
import iconLogo from "src/assets/icons/logos/icon-logo.png"
import { isValidEmail } from "src/helpers/isValidEmail"
import { setUserToLocalStorage } from "src/helpers/sessionStorage"
import { useLocalization } from "src/providers/localization/useLocalization"
import { authStoreActions, notificationStoreActions } from "src/store"
import { FilledButton } from "../_shared/styledComponents"

export function Login() {
    const { translateText } = useLocalization()
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleCredentialChange = (value: string, isEmail = false) => {
        setCredentials((prev) => ({
            ...prev,
            ...(isEmail ? { email: value } : { password: value }),
        }))
    }

    const loginEnabled = isValidEmail(credentials.email) && !!credentials.password

    const handleLogin = async () => {
        if (credentials?.email && credentials.password) {
            try {
                const resp = await getUserToken(credentials.email, credentials.password)
                authStoreActions.setUser(resp)
                authStoreActions.setUserLoaded()
                notificationStoreActions.setNotification(translateText(39), "success")
                setUserToLocalStorage(resp)
                await navigate("/")
            } catch (e) {
                setError(true)
                // eslint-disable-next-line no-console
                console.error(e)
            }
        }
    }

    return (
        <Box height="100vh" width="100vw" display="flex" alignItems="center" justifyContent="center">
            <Stack
                sx={{
                    width: "30%",
                    height: "60%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "5em",
                    padding: "2em",
                }}
            >
                <Typography variant="h4" fontWeight={700}>
                    {translateText(30)}
                </Typography>
                <img src={iconLogo} height="40%" alt="icon-logo" style={{ margin: "2em 0" }} />
                {error && <Alert severity="error">{translateText(31)}</Alert>}
                <Box display="flex" flexDirection="column" width="40%">
                    <Typography variant="overline">{translateText(28)}</Typography>
                    <TextField
                        value={credentials?.email}
                        onChange={(e) => handleCredentialChange(e.target.value, true)}
                        variant="outlined"
                        type="email"
                    />
                    <Typography variant="overline">{translateText(29)}</Typography>
                    <TextField
                        value={credentials?.password}
                        onChange={(e) => handleCredentialChange(e.target.value)}
                        variant="outlined"
                        type="password"
                    />
                    <FilledButton onClick={() => handleLogin()} disabled={!loginEnabled}>
                        {translateText(27)}
                    </FilledButton>
                </Box>
            </Stack>
        </Box>
    )
}
