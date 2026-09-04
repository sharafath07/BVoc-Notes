import api from "../api/axios.js"

async function getSemesters(backendUrl) {

    try {
        const response = await api.get(`${backendUrl}/api/semesters`)

        if (response.data.success) {
            return (response.data.semesters)
        }
    } catch (error) {
        console.error("Get Semesters:", error)

        alert(
            error.response?.data?.message || "Get Semesters"
        )
    }
}

export default getSemesters;