import { useState } from 'react'
import * as S from './styles'

// Define interfaces for cost and form data
interface Cost {
    id: number
    description: string
    value: number
    date: string // ISO date string (e.g., '2025-04-01')
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
        date: new Date().toISOString().split('T')[0], // Default to today
        type: 'fixed',
    })
    const [monthFilter, setMonthFilter] = useState<string>('')
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [editingCostId, setEditingCostId] = useState<number | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddOrUpdateCost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (editingCostId) {
            // Update existing cost
            setCosts((prev) =>
                prev.map((cost) =>
                    cost.id === editingCostId
                        ? {
                              ...cost,
                              description: formData.description,
                              value: parseFloat(formData.value),
                              date: formData.date,
                              type: formData.type,
                          }
                        : cost,
                ),
            )
            setEditingCostId(null)
        } else {
            // Add new cost
            const newCost: Cost = {
                id: costs.length + 1,
                description: formData.description,
                value: parseFloat(formData.value),
                date: formData.date,
                type: formData.type,
            }
            setCosts((prev) => [...prev, newCost])
        }
        setFormData({
            description: '',
            value: '',
            date: new Date().toISOString().split('T')[0],
            type: 'fixed',
        })
        setIsFormVisible(false)
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

    const handleDeleteCost = (id: number) => {
        setCosts((prev) => prev.filter((cost) => cost.id !== id))
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
    }

    // Generate month options (e.g., '2025-04' for April 2025)
    const getMonthOptions = () => {
        const months: string[] = []
        const currentDate = new Date()
        for (let i = 0; i < 12; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
            const monthStr = date.toISOString().slice(0, 7) // e.g., '2025-04'
            months.push(monthStr)
        }
        return months
    }

    // Filter costs by selected month
    const filteredCosts = monthFilter
        ? costs.filter((cost) => cost.date.startsWith(monthFilter))
        : costs

    return (
        <S.Container>
            <h2>Custos</h2>
            <p className="subtitle">Adicione aqui todos os custos operacionais da sua barbearia</p>

            <S.ButtonContainer>
                <S.ToggleFormButton onClick={handleToggleForm}>
                    {isFormVisible ? 'Fechar Formulário' : 'Adicionar Custo'}
                </S.ToggleFormButton>
            </S.ButtonContainer>

            {isFormVisible && (
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
                        <S.Select name="type" value={formData.type} onChange={handleInputChange}>
                            <option value="fixed">Fixo</option>
                            <option value="variable">Variável</option>
                        </S.Select>
                    </S.InputGroup>
                    <S.SubmitButton onClick={handleAddOrUpdateCost}>
                        {editingCostId ? 'Atualizar Custo' : 'Adicionar Custo'}
                    </S.SubmitButton>
                </S.Form>
            )}

            <S.FilterGroup>
                <label>Filtrar por mês</label>
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

            <S.CostList>
                {filteredCosts.length === 0 ? (
                    <p>Nenhum custo registrado.</p>
                ) : (
                    filteredCosts.map((cost) => (
                        <S.CostItem key={cost.id}>
                            <S.CostDescription>{cost.description}</S.CostDescription>
                            <S.CostValue>R$ {cost.value.toFixed(2)}</S.CostValue>
                            <S.CostDate>
                                {new Date(cost.date).toLocaleDateString('pt-BR')}
                            </S.CostDate>
                            <S.CostType>{cost.type === 'fixed' ? 'Fixo' : 'Variável'}</S.CostType>
                            <S.ActionButtons>
                                <S.EditButton onClick={() => handleEditCost(cost)}>
                                    Editar
                                </S.EditButton>
                                <S.DeleteButton onClick={() => handleDeleteCost(cost.id)}>
                                    Apagar
                                </S.DeleteButton>
                            </S.ActionButtons>
                        </S.CostItem>
                    ))
                )}
            </S.CostList>
        </S.Container>
    )
}

export default Custos
