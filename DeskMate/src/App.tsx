import { QueryClient, QueryClientProvider } from "react-query"
import { TokenProvider } from "./components/main/TokenProvider"
import { LocalizationProvider } from "./providers/localization/LocalizationProvider"
import { ThemeProvider } from "./providers/theme/ThemeProvider"

export function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <LocalizationProvider>
                    <TokenProvider />
                </LocalizationProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
