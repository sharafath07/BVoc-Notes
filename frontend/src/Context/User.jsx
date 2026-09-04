import api from "../api/axios.js"

async function getUsers(backendUrl) {

    try {
        const response = await api.get(`${backendUrl}/api/users`)

        if (response.data.success) {
            return (response.data.users)
        }
    } catch (error) {
        console.error("Get Users:", error)

        alert(
            error.response?.data?.message || "Get Users"
        )
    }
}

export default getUsers;