import api from "../api/axios.js"

async function getResources(backendUrl) {

    try {
        const response = await api.get(`${backendUrl}/api/resources`)

        if (response.data.success) {
            return (response.data.resources);
        }
    } catch (error) {
        console.error("Get Resources:", error)

        alert(
            error.response?.data?.message || "Get Resources"
        )
    }
}

export default getResources;