import React, { useState } from 'react';
import { Agendamento } from '../../../../../models/Agendamento';
import { authFetch } from '../../../../../utils/authFetch';
import api from '../../../../../services/api';
import * as S from './styles';

type DetalhesModalProps = {
    isOpen: boolean;
    onClose: () => void;
    agendamento: Agendamento | null;
    formatarStatus: (status: Agendamento['status']) => string;
};

// Função para formatar o método de pagamento
const formatarMetodoPagamento = (metodo: string | null): string => {
    if (!metodo) {
        return 'Não especificado';
    }

    switch (metodo.toLowerCase()) {
        case 'pix':
            return 'Pix';
        case 'cartao_credito':
            return 'Cartão de Crédito';
        case 'cartao_debito':
            return 'Cartão de Débito';
        case 'dinheiro':
            return 'Dinheiro';
        default:
            return metodo.charAt(0).toUpperCase() + metodo.slice(1).toLowerCase();
    }
};

// Função para obter o ícone do método de pagamento
const getIconePagamento = (metodo: string | null): string => {
    switch (metodo) {
        case 'pix':
            return 'ri-pix-fill pix';
        case 'cartao_credito':
            return 'ri-bank-card-fill card';
        case 'cartao_debito':
            return 'ri-bank-card-fill card';
        case 'dinheiro':
            return 'ri-cash-line cash';
        default:
            return 'ri-question-fill';
    }
};

const DetalhesModal = ({ isOpen, onClose, agendamento }: DetalhesModalProps) => {
    const [status, setStatus] = useState(agendamento?.status || '');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (!isOpen || !agendamento) return null;

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as Agendamento['status'];
        setErrorMessage(null);

        try {
            const token = sessionStorage.getItem('access_token_barbearia');
            const response = await authFetch(`${api.baseURL}/agendamentos/${agendamento.id}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.status === 401) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.');
            }
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao atualizar status: ${errorText}`);
            }

            setStatus(newStatus);
        } catch (err: any) {
            console.error('Erro ao atualizar status:', err);
            setErrorMessage(err.message || 'Ocorreu um erro ao atualizar o status.');
        }
    };

    return (
        <S.Overlay>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Detalhes do Agendamento</h2>
                {errorMessage && <p>{errorMessage}</p>}
                <S.ModalContent>
                    <S.InfoItem>
                        <S.InfoLabel>Cliente</S.InfoLabel>
                        <S.InfoValue>{agendamento.cliente_nome}</S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Serviço</S.InfoLabel>
                        <S.InfoValue>{agendamento.servico_nome}</S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Horário</S.InfoLabel>
                        <S.InfoValue>{agendamento.hora_inicio.slice(0, 5)}</S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Duração</S.InfoLabel>
                        <S.InfoValue>{`${agendamento.servico_duracao} minutos`}</S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Status</S.InfoLabel>
                        <S.InfoValue>
                            <S.Select value={status} onChange={handleStatusChange}>
                                <option value="CONFIRMADO">Confirmado</option>
                                <option value="CONCLUIDO">Concluído</option>
                                <option value="CANCELADO">Cancelado</option>
                                <option value="EXPIRADO">Expirado</option>
                            </S.Select>
                        </S.InfoValue>
                    </S.InfoItem>
                    <S.InfoItem>
                        <S.InfoLabel>Método de Pagamento</S.InfoLabel>
                        <S.InfoValue>
                            <i className={getIconePagamento(agendamento.metodo_pagamento)}></i>{' '}
                            {formatarMetodoPagamento(agendamento.metodo_pagamento)}
                        </S.InfoValue>
                    </S.InfoItem>
                </S.ModalContent>
            </S.Modal>
        </S.Overlay>
    );
};

export default DetalhesModal;
