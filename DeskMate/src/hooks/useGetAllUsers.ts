import { useQuery } from "react-query"
import { getAllUsers } from "src/api/getAllUsers"
import { UserData } from "src/models/user"

export type GroupedUsers = {
    team: string
    users: UserData[]
}

export const useGetAllUsers = () => {
    const { data, isLoading, isError } = useQuery(["getAllUsers"], () => getAllUsers(), {
        refetchOnWindowFocus: false,
        cacheTime: 360000,
        staleTime: 360000,
    })

    const grouped: GroupedUsers[] =
        data?.reduce<GroupedUsers[]>((acc, user) => {
            const team = user.team || ""

            // try to find an existing bucket
            const bucket = acc.find((b) => b.team === team)
            if (bucket) {
                bucket.users.push(user)
            } else {
                // create a new one
                acc.push({ team, users: [user] })
            }

            return acc
        }, []) ?? []

    return {
        usersList: grouped || [],
        isLoading,
        isError,
    }
}
