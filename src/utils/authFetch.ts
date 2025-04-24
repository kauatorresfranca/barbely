export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Identify client requests
    const isClienteRequest =
        (url.includes('/api/clientes/') && !url.includes('/api/clientes/barbearia/')) ||
        url.includes('/api/agendamentos/horarios-disponiveis/') ||
        url.includes('/api/agendamentos/criar/')

    const tokenKey = isClienteRequest ? 'access_token_cliente' : 'access_token_barbearia'
    const refreshKey = isClienteRequest ? 'refresh_token_cliente' : 'refresh_token_barbearia'

    const accessToken = sessionStorage.getItem(tokenKey)
    const refreshToken = sessionStorage.getItem(refreshKey)

    console.log(
        `authFetch: URL=${url}, tokenKey=${tokenKey}, accessToken=${
            accessToken ? '[presente]' : 'null'
        }`,
    )

    // Skip token check for horarios-disponiveis (allow unauthenticated)
    if (url.includes('/api/agendamentos/horarios-disponiveis/') && !accessToken) {
        return fetch(url, options)
    }

    if (!accessToken) {
        console.error(`Token de acesso (${tokenKey}) não encontrado.`)
        const slug = sessionStorage.getItem('barbearia_slug') || 'default-slug'
        window.location.href = isClienteRequest ? '/clientes/login' : `/barbearia/${slug}/login`
        throw new Error('Token de acesso não encontrado.')
    }

    const headers =
        options.body instanceof FormData
            ? { Authorization: `Bearer ${accessToken}`, ...options.headers }
            : {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                  ...options.headers,
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
            sessionStorage.setItem(refreshKey, refreshData.refresh || refreshToken)

            const retryHeaders =
                options.body instanceof FormData
                    ? { Authorization: `Bearer ${refreshData.access}`, ...options.headers }
                    : {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${refreshData.access}`,
                          ...options.headers,
                      }

            response = await fetch(url, { ...options, headers: retryHeaders })
        } else {
            console.error('Erro ao renovar token:', await refreshResponse.text())
            const slug = sessionStorage.getItem('barbearia_slug') || 'default-slug'
            window.location.href = isClienteRequest ? '/clientes/login' : `/barbearia/${slug}/login`
            throw new Error('Erro ao renovar token.')
        }
    }

    return response
}
