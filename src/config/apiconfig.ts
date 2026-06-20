const url = import.meta.env.VITE_API_URL
export const apiUrl = url ? `${url}/api/v1` : "/api/v1"
