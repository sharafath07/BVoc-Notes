import api from "../api/axios.js"
import { Context } from "./Context.jsx"
import { useContext } from "react"

async function getResources(backendUrl) {
    const { setIsLoading } = useContext(Context);

    try {
        setIsLoading(true)
        const response = await api.get(`${backendUrl}/api/resources`)

        if (response.data.success) {
            return (response.data.resources);
        }
    } catch (error) {
        console.error("Get Resources:", error)

        alert(
            error.response?.data?.message || "Get Resources"
        )
    } finally {
        setIsLoading(false)
    }
}

export default getResources;