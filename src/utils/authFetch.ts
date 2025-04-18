export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const isClienteRequest = url.includes('/api/clientes/') || url.includes('/api/agendamentos/')
    const tokenKey = isClienteRequest ? 'access_token_cliente' : 'access_token_barbearia'
    const refreshKey = isClienteRequest ? 'refresh_token_cliente' : 'refresh_token_barbearia'

    const accessToken = sessionStorage.getItem(tokenKey)
    const refreshToken = sessionStorage.getItem(refreshKey)

    if (!accessToken) {
        console.error(`Token de acesso (${tokenKey}) não encontrado.`)
        const redirectPath = isClienteRequest ? '/barbearia/login' : '/barbearia/admin/login'
        window.location.href = redirectPath
        throw new Error('Token de acesso não encontrado.')
    }

    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
    }

    let response = await fetch(url, { ...options, headers })

    if (response.status === 401 && refreshToken) {
        console.warn(`Token expirado (${tokenKey}), tentando renovar...`)
        const refreshResponse = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        })

        if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json()
            sessionStorage.setItem(tokenKey, refreshData.access)
            sessionStorage.setItem(refreshKey, refreshData.refresh || refreshToken) // Atualiza refresh se fornecido

            // Refaz a requisição com o novo token
            const retryHeaders = {
                ...options.headers,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshData.access}`,
            }

            response = await fetch(url, { ...options, headers: retryHeaders })
        } else {
            console.error('Erro ao renovar token:', await refreshResponse.text())
            sessionStorage.removeItem(tokenKey)
            sessionStorage.removeItem(refreshKey)
            const redirectPath = isClienteRequest ? '/barbearia/login' : '/barbearia/admin/login'
            window.location.href = redirectPath
            throw new Error('Erro ao renovar token.')
        }
    }

    return response
}
