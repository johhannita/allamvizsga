import { Box } from "@mui/material"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { Path } from "src/models"
import { ERole } from "src/models/auth"
import { useDeskMateStore } from "src/store"
import { NotificationBar } from "../_shared/NotificationBar"
import { DashBoard } from "../dashboard/DashBoard"
import { Header } from "../header/Header"
import { HomeOfficeComponent } from "../home-office/HomeOfficeComponent"
import { Profile } from "../profile/Profile"
import { ReservationComponent } from "../reservation/ReservationComponent"
import { YearlyOverviewComponent } from "../yearly-overview/YearlyOverviewComponent"

type Props = { element?: React.ReactElement; requiredRole: ERole }

function ProtectedRoute({ element, requiredRole }: Props) {
    const { selectedRole } = useDeskMateStore()

    if (selectedRole === ERole.Undefined) {
        return undefined
    }

    if (requiredRole !== selectedRole) {
        return <Navigate to="/" />
    }
    return element ?? <Outlet />
}
export function Main() {
    return (
        <>
            <NotificationBar />
            <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
                <Header />
                <Routes>
                    <Route index element={<DashBoard />} />
                    <Route path={Path.Dashboard} element={<DashBoard />} />
                    <Route path={Path.Reservation} element={<ProtectedRoute element={<ReservationComponent />} requiredRole={ERole.User} />} />
                    <Route path={Path.HomeOffice} element={<ProtectedRoute element={<HomeOfficeComponent />} requiredRole={ERole.User} />} />
                    <Route path={Path.YearlyOverview} element={<ProtectedRoute element={<YearlyOverviewComponent />} requiredRole={ERole.User} />} />
                    <Route path={Path.UserProfile} element={<Profile />} />
                </Routes>
            </Box>
        </>
    )
}
