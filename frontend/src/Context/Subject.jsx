import api from "../api/axios.js"
import { Context } from "./Context.jsx"
import { useContext } from "react"

async function getSubjects(backendUrl) {
    const { setIsLoading } = useContext(Context);

    try {
        setIsLoading(true)
        const response = await api.get(`${backendUrl}/api/subjects`)

        if (response.data.success) {
            return (response.data.subjects)
        }
    } catch (error) {
        console.error("Get Subjects:", error)

        alert(
            error.response?.data?.message || "Get Subjects"
        )
    } finally {
        setIsLoading(false)
    }
}

export default getSubjects;