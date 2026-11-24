import axios from "axios";

const api = axios.create();

let startupRequests = new Set();

export function getPageData(url, config, client = api) {
    const request = client.get(url, config);
    const pending = startupRequests;
    if (pending) {
        pending.add(request);
        const settled = () => pending.delete(request);
        request.then(settled, settled);
    }
    return request;
}

export async function waitForPageData() {
    while (startupRequests?.size) {
        await Promise.allSettled([...startupRequests]);
    }
}

export function finishStartupRequests() {
    startupRequests = null;
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
