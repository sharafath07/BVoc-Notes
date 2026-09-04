import api from "../api/axios.js"

async function getSubjects(backendUrl) {

    try {
        const response = await api.get(`${backendUrl}/api/subjects`)

        if (response.data.success) {
            return (response.data.subjects)
        }
    } catch (error) {
        console.error("Get Subjects:", error)

        alert(
            error.response?.data?.message || "Get Subjects"
        )
    }
}

export default getSubjects;