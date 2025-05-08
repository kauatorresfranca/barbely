import api from '../services/api'

export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const isClienteRequest =
        (url.includes('/api/clientes/') &&
            !url.includes('/api/clientes/barbearia/') &&
            !(
                ['PUT', 'DELETE'].includes(options.method || '') &&
                url.match(/\/api\/clientes\/\d+\/$/)
            ) &&
            !(options.method === 'POST' && url.match(/\/api\/clientes\/$/))) ||
        url.includes('/api/agendamentos/horarios-disponiveis/') ||
        url.includes('/api/agendamentos/criar/')

    const tokenKey = isClienteRequest ? 'access_token_cliente' : 'access_token_barbearia'
    const refreshKey = isClienteRequest ? 'refresh_token_cliente' : 'refresh_token_barbearia'

    let accessToken = sessionStorage.getItem(tokenKey)
    const refreshToken = sessionStorage.getItem(refreshKey)

    console.log(
        `authFetch: URL=${url}, method=${options.method}, tokenKey=${tokenKey}, accessToken=${
            accessToken ? '[presente]' : 'null'
        }`,
    )

    const fullUrl = url.startsWith('http')
        ? url
        : `${api.baseURL}${url.startsWith('/') ? url : `/${url}`}`

    if (url.includes('/api/agendamentos/horarios-disponiveis/') && !accessToken) {
        return fetch(fullUrl, options)
    }

    if (!accessToken) {
        console.error(`Token de acesso (${tokenKey}) não encontrado.`)
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

    let response = await fetch(fullUrl, { ...options, headers })

    if (response.status === 401 && refreshToken) {
        console.warn(`Token expirado (${tokenKey}), tentando renovar...`)
        const refreshResponse = await fetch(`${api.baseURL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        })

        if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json()
            accessToken = refreshData.access // Atualizar o accessToken localmente
            sessionStorage.setItem(tokenKey, refreshData.access)
            if (refreshData.refresh) {
                sessionStorage.setItem(refreshKey, refreshData.refresh)
            }

            console.log(`Novo accessToken gerado: ${accessToken}`) // Log para depuração

            const retryHeaders =
                options.body instanceof FormData
                    ? { Authorization: `Bearer ${accessToken}`, ...options.headers }
                    : {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${accessToken}`,
                          ...options.headers,
                      }

            response = await fetch(fullUrl, { ...options, headers: retryHeaders })
        } else {
            console.error('Erro ao renovar token:', await refreshResponse.text())
            sessionStorage.removeItem(tokenKey)
            sessionStorage.removeItem(refreshKey)
            if (isClienteRequest) {
                sessionStorage.removeItem('cliente')
            } else {
                sessionStorage.removeItem('barbearia')
                sessionStorage.removeItem('barbearia_token')
            }
            throw new Error('Falha ao renovar token.')
        }
    }

    return response
}
