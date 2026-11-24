import { getPageData } from "../api/axios.js";

async function getUsers(backendUrl) {
    const { data } = await getPageData(`${backendUrl}/api/users`);
    if (!data.success) {
        throw new Error(data.message || "Could not load users.");
    }
    return data.users;
}

export default getUsers;
