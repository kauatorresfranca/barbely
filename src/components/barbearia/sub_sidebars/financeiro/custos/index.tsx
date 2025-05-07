import { useState, useEffect } from 'react'
import * as S from './styles'
import api from '../../../../../services/api'

interface Cost {
    id: number
    description: string
    value: number
    date: string
    type: 'fixed' | 'variable'
}

interface FormData {
    description: string
    value: string
    date: string
    type: 'fixed' | 'variable'
}

const Custos = () => {
    const [costs, setCosts] = useState<Cost[]>([])
    const [formData, setFormData] = useState<FormData>({
        description: '',
        value: '',
        date: new Date().toISOString().split('T')[0],
        type: 'fixed',
    })
    const [monthFilter, setMonthFilter] = useState<string>('')
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [editingCostId, setEditingCostId] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCosts = async () => {
            setIsLoading(true)
            setError(null)
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                setError('Você precisa estar logado como barbearia.')
                setIsLoading(false)
                return
            }
            try {
                const response = await fetch(`${api.baseURL}/custos/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                console.log('Resposta de /api/custos/:', data)
                if (response.ok) {
                    // Mapear campos do backend para o formato esperado pelo frontend
                    const mappedCosts = data.map((cost: any, index: number) => {
                        const mappedCost = {
                            id: cost.id,
                            description: cost.descricao || 'Sem descrição',
                            value: parseFloat(cost.valor) || 0,
                            date: cost.data || new Date().toISOString().split('T')[0],
                            type: (cost.tipo as 'fixed' | 'variable') || 'fixed',
                        }
                        console.log(`Custo mapeado [${index}]:`, mappedCost)
                        return mappedCost
                    })
                    // Validar dados
                    const validatedCosts = mappedCosts.filter((cost: Cost, index: number) => {
                        const isValid = cost.id && !isNaN(cost.value)
                        if (!isValid) {
                            console.log(`Custo inválido [${index}]:`, cost)
                        }
                        return isValid
                    })
                    console.log('Custos validados:', validatedCosts)
                    setCosts(validatedCosts)
                    if (data.length > 0 && validatedCosts.length === 0) {
                        setError('Os custos retornados contêm dados inválidos.')
                    }
                } else {
                    setError(data.error || 'Erro ao buscar custos.')
                    console.error('Erro ao buscar custos:', data.error)
                }
            } catch (err: unknown) {
                const errorMessage =
                    err instanceof Error ? err.message : 'Erro de conexão com o servidor.'
                setError(errorMessage)
                console.error('Erro ao buscar custos:', err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCosts()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddOrUpdateCost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setError(null)
        const token = sessionStorage.getItem('access_token_barbearia')
        if (!token) {
            setError('Você precisa estar logado como barbearia.')
            return
        }
        const payload = {
            descricao: formData.description,
            valor: parseFloat(formData.value) || 0,
            data: formData.date,
            tipo: formData.type,
        }

        try {
            let response
            if (editingCostId) {
                response = await fetch(`${api.baseURL}/custos/${editingCostId}/`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
            } else {
                response = await fetch(`${api.baseURL}/custos/`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
            }

            const data = await response.json()
            console.log('Resposta de POST/PUT /api/custos/:', data)
            if (response.ok) {
                // Mapear o custo retornado
                const mappedCost = {
                    id: data.id,
                    description: data.descricao || 'Sem descrição',
                    value: parseFloat(data.valor) || 0,
                    date: data.data || new Date().toISOString().split('T')[0],
                    type: (data.tipo as 'fixed' | 'variable') || 'fixed',
                }
                console.log('Custo mapeado (POST/PUT):', mappedCost)
                if (editingCostId) {
                    setCosts((prev) =>
                        prev.map((cost) => (cost.id === editingCostId ? mappedCost : cost)),
                    )
                } else {
                    setCosts((prev) => [...prev, mappedCost])
                }
                setFormData({
                    description: '',
                    value: '',
                    date: new Date().toISOString().split('T')[0],
                    type: 'fixed',
                })
                setEditingCostId(null)
                setIsFormVisible(false)
            } else {
                setError(data.error || 'Erro ao salvar custo.')
                console.error('Erro ao salvar custo:', data.error)
            }
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : 'Erro de conexão com o servidor.'
            setError(errorMessage)
            console.error('Erro ao salvar custo:', err)
        }
    }

    const handleEditCost = (cost: Cost) => {
        setFormData({
            description: cost.description,
            value: cost.value.toString(),
            date: cost.date,
            type: cost.type,
        })
        setEditingCostId(cost.id)
        setIsFormVisible(true)
    }

    const handleDeleteCost = async (id: number) => {
        setError(null)
        const token = sessionStorage.getItem('access_token_barbearia')
        if (!token) {
            setError('Você precisa estar logado como barbearia.')
            return
        }
        try {
            const response = await fetch(`${api.baseURL}/custos/${id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                setCosts((prev) => prev.filter((cost) => cost.id !== id))
            } else {
                const data = await response.json()
                setError(data.error || 'Erro ao deletar custo.')
                console.error('Erro ao deletar custo:', data.error)
            }
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : 'Erro de conexão com o servidor.'
            setError(errorMessage)
            console.error('Erro ao deletar custo:', err)
        }
    }

    const handleToggleForm = () => {
        setIsFormVisible((prev) => !prev)
        setEditingCostId(null)
        setFormData({
            description: '',
            value: '',
            date: new Date().toISOString().split('T')[0],
            type: 'fixed',
        })
        setError(null)
    }

    const handleCloseModal = () => {
        setIsFormVisible(false)
        setEditingCostId(null)
        setFormData({
            description: '',
            value: '',
            date: new Date().toISOString().split('T')[0],
            type: 'fixed',
        })
        setError(null)
    }

    const getMonthOptions = () => {
        const months: string[] = []
        const currentDate = new Date()
        for (let i = 0; i < 12; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
            const monthStr = date.toISOString().slice(0, 7)
            months.push(monthStr)
        }
        return months
    }

    const filteredCosts = monthFilter
        ? costs.filter((cost) => cost.date.startsWith(monthFilter))
        : costs

    return (
        <S.Container>
            <h2>Custos</h2>
            <p className="subtitle">Adicione aqui todos os custos operacionais da sua barbearia</p>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            {isFormVisible && (
                <S.ModalOverlay>
                    <S.ModalContent>
                        <S.ModalHeader>
                            <h3>{editingCostId ? 'Editar Custo' : 'Adicionar Custo'}</h3>
                            <S.CloseButton onClick={handleCloseModal}>×</S.CloseButton>
                        </S.ModalHeader>
                        <S.Form>
                            <S.InputGroup>
                                <label>Descrição</label>
                                <S.Input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Ex.: Aluguel, Conta de luz"
                                />
                            </S.InputGroup>
                            <S.InputGroup>
                                <label>Valor (R$)</label>
                                <S.Input
                                    type="number"
                                    name="value"
                                    value={formData.value}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                />
                            </S.InputGroup>
                            <S.InputGroup>
                                <label>Data</label>
                                <S.Input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                />
                            </S.InputGroup>
                            <S.InputGroup>
                                <label>Tipo</label>
                                <S.Select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                >
                                    <option value="fixed">Fixo</option>
                                    <option value="variable">Variável</option>
                                </S.Select>
                            </S.InputGroup>
                            <S.SubmitButton onClick={handleAddOrUpdateCost}>
                                {editingCostId ? 'Atualizar Custo' : 'Adicionar Custo'}
                            </S.SubmitButton>
                        </S.Form>
                    </S.ModalContent>
                </S.ModalOverlay>
            )}

            <S.HeaderCostGroup>
                <S.FilterGroup>
                    <S.Select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
                        <option value="">Todos os meses</option>
                        {getMonthOptions().map((month) => (
                            <option key={month} value={month}>
                                {new Date(month + '-01').toLocaleString('pt-BR', {
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </option>
                        ))}
                    </S.Select>
                </S.FilterGroup>
                <S.ButtonContainer>
                    <S.ToggleFormButton onClick={handleToggleForm}>+ Novo Custo</S.ToggleFormButton>
                </S.ButtonContainer>
            </S.HeaderCostGroup>
            {isLoading ? (
                <p>Carregando custos...</p>
            ) : (
                <S.CostList>
                    {filteredCosts.length === 0 ? (
                        <p>Nenhum custo registrado.</p>
                    ) : (
                        <>
                            <S.CostHeader>
                                <p>Descrição</p>
                                <p>Valor</p>
                                <p>Data</p>
                                <p>Fixo/Variável</p>
                                <p>Ações</p>
                            </S.CostHeader>
                            {filteredCosts.map((cost) => (
                                <S.CostItem key={cost.id}>
                                    <S.CostDescription>{cost.description}</S.CostDescription>
                                    <S.CostValue>
                                        R$ {cost.value != null ? cost.value.toFixed(2) : 'N/A'}
                                    </S.CostValue>
                                    <S.CostDate>
                                        {new Date(cost.date).toLocaleDateString('pt-BR')}
                                    </S.CostDate>
                                    <S.CostType>
                                        {cost.type === 'fixed' ? 'Fixo' : 'Variável'}
                                    </S.CostType>
                                    <S.ActionButtons>
                                        <S.EditButton onClick={() => handleEditCost(cost)}>
                                            Editar
                                        </S.EditButton>
                                        <S.DeleteButton onClick={() => handleDeleteCost(cost.id)}>
                                            Apagar
                                        </S.DeleteButton>
                                    </S.ActionButtons>
                                </S.CostItem>
                            ))}
                        </>
                    )}
                </S.CostList>
            )}
        </S.Container>
    )
}

export default Custos
