import { getPageData } from "../api/axios.js"

async function getPrograms(backendUrl) {

    try {
        const response = await getPageData(`${backendUrl}/api/programs`)

        if (response.data.success) {
            return (response.data.programs)
        }
    } catch (error) {
        console.error("Get programs:", error)

        alert(
            error.response?.data?.message || "Get programs Failed"
        )
    }
}

export default getPrograms;
