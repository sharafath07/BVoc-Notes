import { getPageData } from "../api/axios.js"
import axios from "axios";

async function getResources(backendUrl) {
    const { data } = await getPageData(`${backendUrl}/api/resources`);
    return data.resources;
}

export async function getResourceAvailability(backendUrl, signal) {
    const { data } = await getPageData(`${backendUrl}/api/resources/availability`, { signal }, axios);
    return data.availability;
}

export async function getResourceCards(backendUrl, subjectId, type, signal) {
    const { data } = await axios.get(`${backendUrl}/api/resources`, {
        params: { subjectId, type, view: "cards" },
        signal,
    });
    return data.resources;
}

export default getResources;
