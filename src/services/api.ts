console.log('VITE_API_URL carregado:', import.meta.env.VITE_API_URL)
const api = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
}

export default api
