import api from "../api/axios.js"
import { Context } from "./Context.jsx"
import { useContext } from "react"

async function getUsers(backendUrl) {
    const { setIsLoading } = useContext(Context);

    try {
        setIsLoading(true)
        const response = await api.get(`${backendUrl}/api/users`)

        if (response.data.success) {
            return (response.data.users)
        }
    } catch (error) {
        console.error("Get Users:", error)

        alert(
            error.response?.data?.message || "Get Users"
        )
    } finally {
        setIsLoading(false)
    }
}

export default getUsers;