import api from "../api/axios.js"
import { Context } from "./Context.jsx"
import { useContext } from "react"

async function getPrograms(backendUrl) {
    const { setIsLoading } = useContext(Context);

    try {
        setIsLoading(true)
        const response = await api.get(`${backendUrl}/api/programs`)

        if (response.data.success) {
            return (response.data.programs)
        }
    } catch (error) {
        console.error("Get programs:", error)

        alert(
            error.response?.data?.message || "Get programs"
        )
    } finally {
        setIsLoading(false)
    }
}

export default getPrograms;