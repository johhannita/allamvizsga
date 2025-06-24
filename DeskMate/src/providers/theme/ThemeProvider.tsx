import {
    Components,
    createTheme,
    ThemeProvider as MuiThemeProvider,
    PaletteOptions,
    SimplePaletteColorOptions,
    Theme,
    TypeBackground,
} from "@mui/material"
import { TypographyOptions } from "@mui/material/styles/createTypography"
import { Children, PropsWithChildren } from "react"

type ThemeProviderProps = PropsWithChildren

type IPaletteOptions = PaletteOptions & {
    primary: SimplePaletteColorOptions
    secondary: SimplePaletteColorOptions
    error: SimplePaletteColorOptions
    warning: SimplePaletteColorOptions
    info: SimplePaletteColorOptions
    success: SimplePaletteColorOptions
    selected: SimplePaletteColorOptions
    background: TypeBackground & { main: string }
}
declare module "@mui/material/styles" {
    interface Theme {
        palette: {
            primary: {
                light: string
                main: string
                dark: string
            }
            secondary: {
                main: string
                light: string
            }
            success: {
                main: string
                dark: string
            }
            error: {
                main: string
                dark: string
            }
            warning: {
                main: string
                dark: string
            }
            info: {
                main: string
            }
            grey: {
                "50": string
                "100": string
                "200": string
                "300": string
                "400": string
                "500": string
                "600": string
                "700": string
                "800": string
                "900": string
            }
            text: {
                primary: string
                secondary: string
                disabled: string
            }
            background: {
                main: string
                default: string
                paper: string
            }
            selected: {
                light: string
                main: string
            }
        }
    }
}

export function ThemeProvider(props: ThemeProviderProps) {
    const palette: IPaletteOptions = {
        primary: {
            light: "#b2dbfb",
            main: "#2196f3",
            dark: "#0D47A1",
        },
        secondary: {
            main: "#7DDA58",
            light: "#ADED94",
        },
        success: {
            main: "#8FF18F",
            dark: "#338015",
        },
        error: {
            main: "#f44336",
            dark: "#BE2F25",
        },
        warning: {
            main: "#ffeb3b",
        },
        info: {
            main: "#f3ae21",
            dark: "#918410",
        },
        grey: {
            "50": "#E0E0E0",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#D3D3D3",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#838385",
            "700": "#646567",
            "800": "#424242",
            "900": "#212121",
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba((0, 0, 0, 0.38)",
        },
        background: {
            main: "#f6f6f6",
            default: "#2c63c9",
            paper: "#ffffff",
        },
        selected: {
            light: "#eeeeee",
            main: "#a6a6a6",
        },
    }

    const typography: TypographyOptions = {
        fontFamily: "Open sans, sans-serif",
        fontSize: 14,
        fontWeightLight: "300",
        fontWeightMedium: "400",
        fontWeightBold: "700",
        subtitle1: {
            fontWeight: "400",
            fontSize: "1rem",
            lineHeight: 1.75,
        },
    }
    const components: Components<Omit<Theme, "components">> = {
        // Name of the component
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        width: ".5em",
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: palette.grey?.[300],
                        minHeight: 24,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    lineHeight: "1.2",
                    textTransform: "none",
                    boxShadow: "none",
                    backgroundColor: palette.grey?.[300],
                    color: palette.text?.primary,
                    ":hover": { backgroundColor: palette.primary.light, boxShadow: "none" },
                },
                text: {
                    textTransform: "none",
                    color: palette.text?.primary,
                    backgroundColor: "transparent",
                    ":hover": { backgroundColor: "transparent" },
                },
                sizeSmall: {
                    fontSize: "0.875rem",
                    padding: "0.3em",
                },
                sizeMedium: {
                    fontSize: "1rem",
                    padding: "6px",
                },
                sizeLarge: {
                    fontSize: "1.125rem",
                    padding: "0.5em",
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    padding: 8,
                    "& .MuiSwitch-track": {
                        borderRadius: 3,
                        border: 1,
                        "&:before, &:after": {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 16,
                            height: 16,
                        },
                        "&:before": {
                            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"></polyline></svg>')`,
                            left: 12,
                        },
                        "&:after": {
                            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="8" cy="8" r="4"></circle></svg> ')`,
                            right: 12,
                        },
                    },
                    "& .MuiSwitch-thumb": {
                        boxShadow: "none",
                        width: 16,
                        height: 16,
                        margin: 2,
                        borderRadius: 3,
                        color: palette.background.paper,
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                colorSecondary: {
                    color: palette.background.paper,
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: palette.grey?.[800],
                    fontSize: typography.subtitle1?.fontSize,
                    maxWidth: "none",
                    transform: "translate(10px, -20px)",
                },
                arrow: {
                    color: palette.grey?.[800],
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: "3px",
                    height: "fit-content",
                    ":hover": { backgroundColor: palette.grey?.[600] },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    padding: "1em",
                },
            },
        },
        // MuiFormControl: {
        //     styleOverrides: {
        //         root: {
        //             "& fieldset": { border: `1px solid ${palette.grey?.[400]}` },
        //         },
        //     },
        // },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    marginTop: "3em",
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    "&:focus": { backgroundColor: "unset" },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: typography.fontFamily,
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: "unset",
                },
            },
        },
    }

    const constellationTheme = createTheme({ palette, typography, components })

    return <MuiThemeProvider theme={constellationTheme}>{props.children ? Children.toArray(props.children) : null}</MuiThemeProvider>
}
