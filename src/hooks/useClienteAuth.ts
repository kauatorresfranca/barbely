import { useEffect, useState } from 'react'
import { Cliente } from '../models/cliente'
import { authFetch } from '../utils/authFetch'
import api from '../services/api'

export const useCliente = () => {
    const [cliente, setCliente] = useState<Cliente | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchCliente = async () => {
        try {
            const token = sessionStorage.getItem('access_token_cliente')
            if (!token) {
                setCliente(null)
                setLoading(false)
                return
            }

            const response = await authFetch(`${api.baseURL}/clientes/user-info/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error('Erro ao buscar dados do cliente.')
            }

            const data = await response.json()
            setCliente(data)
        } catch (err) {
            console.error(err)
            sessionStorage.removeItem('access_token_cliente')
            sessionStorage.removeItem('refresh_token_cliente')
            setCliente(null)
        } finally {
            setLoading(false)
        }
    }

    const updateCliente = (updatedCliente: Cliente) => {
        console.log('Atualizando cliente:', updatedCliente)
        setCliente(updatedCliente)
    }

    useEffect(() => {
        fetchCliente()
    }, [])

    return { cliente, loading, updateCliente }
}
