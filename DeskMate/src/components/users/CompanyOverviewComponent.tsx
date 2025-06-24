import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useGetAllUsers } from "src/hooks/useGetAllUsers"
import { UserData } from "src/models/user"
import { useLocalization } from "src/providers/localization/useLocalization"
import { ElementWrapper } from "../_shared/ElementWrapper"
import { Loader } from "../_shared/Loader"
import { LoadingError } from "../_shared/LoadingError"
import { ModuleWrapper } from "../_shared/ModuleWrapper"

export function CompanyOverviewComponent() {
    const { translateText } = useLocalization()
    const navigate = useNavigate()
    const { usersList, isLoading, isError } = useGetAllUsers()

    const handleClick = async (user: UserData) => {
        await navigate(`${user.id}`)
    }

    return (
        <ModuleWrapper title={translateText(50)}>
            <ElementWrapper width="95%" overflow="scroll">
                {isLoading && <Loader />}
                {isError && <LoadingError />}
                {!isLoading &&
                    !isError &&
                    usersList?.map((group) => (
                        <Accordion key={group.team}>
                            <AccordionSummary>
                                <Typography variant="h6" gutterBottom>
                                    {group.team.toUpperCase()}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    {group.users.map((user) => (
                                        <Box onClick={() => handleClick(user)} key={user.id} pl={2} mb={1} sx={{ ":hover": { cursor: "pointer" } }}>
                                            <Typography variant="body1">
                                                {user.firstName} {user.lastName} &nbsp;
                                                <Typography component="span" variant="caption" color="textSecondary">
                                                    ({user.email})
                                                </Typography>
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
            </ElementWrapper>
        </ModuleWrapper>
    )
}
