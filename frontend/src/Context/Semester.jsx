import api from "../api/axios.js"
import { Context } from "./Context.jsx"
import { useContext } from "react"

async function getSemesters(backendUrl) {
    const { setIsLoading } = useContext(Context);

    try {
        setIsLoading(true);
        const response = await api.get(`${backendUrl}/api/semesters`)

        if (response.data.success) {
            return (response.data.semesters)
        }
    } catch (error) {
        console.error("Get Semesters:", error)

        alert(
            error.response?.data?.message || "Get Semesters"
        )
    } finally {
        setIsLoading(false);
    }
}

export default getSemesters;