// utils/authFetch.ts
export async function authFetch(url: string, options: RequestInit = {}) {
    const accessToken = sessionStorage.getItem("access_token");
    const refreshToken = sessionStorage.getItem("refresh_token");

    // Adiciona o token atual no header
    const authHeaders = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers: authHeaders });

    // Se o token estiver expirado, tenta renovar
    if (response.status === 401 && refreshToken) {
        const refreshResponse = await fetch("http://localhost:8000/api/token/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            sessionStorage.setItem("access_token", refreshData.access);

            // Refaz a requisição original com o novo token
            const retryHeaders = {
                ...options.headers,
                Authorization: `Bearer ${refreshData.access}`,
                "Content-Type": "application/json",
            };

            return await fetch(url, { ...options, headers: retryHeaders });
        } else {
            // Refresh inválido, força logout
            sessionStorage.clear();
            window.location.href = "/login";
        }
    }

    return response;
}
