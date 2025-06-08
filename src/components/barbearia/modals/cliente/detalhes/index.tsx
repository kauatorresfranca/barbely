import React, { useState, useEffect, useRef } from 'react';
import { Cliente } from '../../../../../models/cliente';
import { authFetch } from '../../../../../utils/authFetch';
import * as S from './styles';
import api from '../../../../../services/api';
import { IMaskInput } from 'react-imask';

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

interface DetalhesProps {
  cliente: Cliente | null;
  onClose: () => void;
  onDelete?: (cliente: Cliente) => void;
}

const Detalhes: React.FC<DetalhesProps> = ({ cliente, onClose, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState(cliente?.user?.nome || '');
  const [telefone, setTelefone] = useState(cliente?.user?.telefone || '');
  const [email, setEmail] = useState(cliente?.user?.email || '');
  const [imagem, setImagem] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cliente?.fotoPerfil) {
      const fotoPerfil = cliente.fotoPerfil;
      const isFullUrl = fotoPerfil.startsWith('http') || fotoPerfil.startsWith('https');
      const imageUrl = isFullUrl ? fotoPerfil : `${api.baseURL}${fotoPerfil}`;
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  }, [cliente]);

  const handleEdit = () => {
    setIsEditing(true);
    setErrorMessage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNome(cliente?.user?.nome || '');
    setTelefone(cliente?.user?.telefone || '');
    setEmail(cliente?.user?.email || '');
    setImagem(null);
    if (cliente?.fotoPerfil) {
      const fotoPerfil = cliente.fotoPerfil;
      const isFullUrl = fotoPerfil.startsWith('http') || fotoPerfil.startsWith('https');
      const imageUrl = isFullUrl ? fotoPerfil : `${api.baseURL}${fotoPerfil}`;
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
    setErrorMessage(null);
  };

  const handleImageClick = () => {
    if (!isEditing) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('A imagem não pode exceder 5MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrorMessage('O arquivo deve ser uma imagem válida.');
        return;
      }
      setImagem(file);
      setPreview(URL.createObjectURL(file));
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente || !cliente.barbearia) {
      setErrorMessage('Cliente ou barbearia inválidos.');
      return;
    }

    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      setErrorMessage('O telefone deve estar no formato (XX) XXXXX-XXXX.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Email inválido.');
      return;
    }

    try {
      const token = sessionStorage.getItem('access_token_barbearia');
      const formData = new FormData();
      if (nome !== cliente.user?.nome) formData.append('user.nome', nome);
      if (email !== cliente.user?.email) formData.append('user.email', email);
      if (telefone !== cliente.user?.telefone) formData.append('user.telefone', telefone);
      formData.append('barbearia', cliente.barbearia.toString());
      if (imagem) formData.append('imagem', imagem);

      const response = await authFetch(`${api.baseURL}/clientes/${cliente.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes('cliente user with this email already exists')) {
          throw new Error('Este email já está em uso. Por favor, escolha outro.');
        }
        if (errorText.includes('Cliente user with this telefone already exists')) {
          throw new Error('Este telefone já está em uso. Por favor, escolha outro.');
        }
        throw new Error(`Erro ao atualizar cliente: ${errorText}`);
      }

      const updatedCliente = await response.json();
      if (cliente && cliente.user) {
        cliente.user.nome = updatedCliente.user.nome;
        cliente.user.telefone = updatedCliente.user.telefone;
        cliente.user.email = updatedCliente.user.email;
        cliente.fotoPerfil = updatedCliente.fotoPerfil;
      }
      setPreview(updatedCliente.fotoPerfil ? `${api.baseURL}${updatedCliente.fotoPerfil}` : null);
      setErrorMessage(null);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Erro ao atualizar cliente:', {
        message: err.message || 'Erro desconhecido',
        response: err.response ? await err.response.text() : 'Sem resposta',
        status: err.response?.status,
      });
      setErrorMessage(err.message || 'Ocorreu um erro ao atualizar o cliente.');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const calculateEndTime = (startTime: string, durationMinutes: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0);
    startDate.setMinutes(startDate.getMinutes() + durationMinutes);
    return `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`;
  };

  const getDayOfWeek = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return `${daysOfWeek[date.getDay()]}, ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  };

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  if (!cliente || !cliente.user) return null;

  // Ordenar histórico do mais novo para o mais antigo
  const sortedHistorico = [...(cliente.historico || [])].sort((a, b) => {
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  });

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Modal>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        <h2>Detalhes do Cliente</h2>
        {isEditing ? (
          <S.EditModal onSubmit={handleSubmit}>
            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
            <S.InputGroup>
              <label htmlFor="imagem_cliente">Foto do Cliente</label>
              <div
                onClick={handleImageClick}
                style={{ cursor: isEditing ? 'pointer' : 'default', marginBottom: '16px', textAlign: 'center' }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Prévia da imagem"
                    onError={() => console.error('Erro ao carregar prévia:', preview)}
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                ) : (
                  <i className="ri-user-3-fill"></i>
                )}
              </div>
              <input
                type="file"
                id="imagem_cliente"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="nome_cliente">Nome do Cliente</label>
              <input
                type="text"
                id="nome_cliente"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do Cliente"
                required
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="telefone_cliente">Telefone</label>
              <IMaskInput
                mask="(00) 00000-0000"
                type="text"
                id="telefone_cliente"
                value={telefone}
                onAccept={(value) => setTelefone(value)}
                placeholder="(00) 00000-0000"
                required
              />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="email_cliente">Email</label>
              <input
                type="email"
                id="email_cliente"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </S.InputGroup>
            <S.ButtonGroup>
              <S.CancelButton type="button" onClick={handleCancel}>
                Cancelar
              </S.CancelButton>
              <S.Button type="submit">Salvar</S.Button>
            </S.ButtonGroup>
          </S.EditModal>
        ) : (
          <>
            <S.ClientInfo>
              <S.ClienteImage>
                {preview ? (
                  <img
                    src={preview}
                    alt="Foto do cliente"
                    onError={() => console.error('Erro ao carregar imagem:', preview)}
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                ) : (
                  <i className="ri-user-3-fill"></i>
                )}
              </S.ClienteImage>
              <div>
                <h3>{cliente.user?.nome}</h3>
                <p>Status do cliente: <span>{cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></p>
                <p>ID do cliente: {cliente.id}</p>
                <p>Cliente desde: {new Date(cliente.user.date_joined).toLocaleDateString('pt-BR')}</p>
              </div>
            </S.ClientInfo>
            <S.InfoSection>
              <h3>Informações</h3>
              <p>
                <i className="ri-user-line"></i> Nome: <strong>{cliente.user.nome}</strong>
              </p>
              <p>
                <i className="ri-phone-line"></i> Celular: <strong>{cliente.user.telefone || 'Telefone indisponível'}</strong>
              </p>
              <p>
                <i className="ri-mail-line"></i> Email: <strong>{cliente.user.email}</strong>
              </p>
              <S.Button onClick={handleEdit}>Editar dados do cliente</S.Button>
            </S.InfoSection>
            <S.StatsSection>
              <h3>Estatísticas do cliente</h3>
              {cliente.estatisticas ? (
                <S.StatsList>
                  <S.StatsItem>
                    <h4>Total de Agendamentos:</h4> <p>{cliente.estatisticas.total_agendamentos || 0}</p>
                  </S.StatsItem>
                  <S.StatsItem>
                    <h4>Serviço Mais Frequente:</h4> <p>{cliente.estatisticas.servico_mais_frequente || 'Nenhum'}</p>
                  </S.StatsItem>
                  <S.StatsItem>
                    <h4>Gasto Total:</h4> <p>{cliente.estatisticas.gasto_total || 'R$ 0,00'}</p>
                  </S.StatsItem>
                </S.StatsList>
              ) : (
                <p className='empty'>Nenhuma estatística disponível.</p>
              )}
            </S.StatsSection>
            <S.HistorySection>
              <h3>Histórico</h3>
              {sortedHistorico && sortedHistorico.length > 0 ? (
                <S.HistoryList>
                  {sortedHistorico.slice(0, visibleItems).map((agendamento) => (
                    <S.HistoryContainer key={agendamento.id}>
                      <i className="ri-history-fill"></i>
                      <S.HistoryContent>
                        <div>
                          <h4>{getDayOfWeek(agendamento.data)}</h4>
                          <p className="horario">
                            {agendamento.hora_inicio.slice(0, 5)} - {calculateEndTime(agendamento.hora_inicio, agendamento.servico_duracao)}
                          </p>
                        </div>
                        <S.HistoryInfos>
                          <S.Info>
                            <h4>Barbeiro</h4>
                            <p>{agendamento.funcionario_nome || 'Sem preferência'}</p>
                          </S.Info>
                          <S.Info>
                            <h4>Serviço</h4>
                            <p>{agendamento.servico_nome || 'Não especificado'}</p>
                          </S.Info>
                          <S.Info>
                            <h4>Preço</h4>
                            <p>{agendamento.preco_total || 'Não especificado'}</p>
                          </S.Info>
                          <S.Info>
                            <h4>Método de Pagamento</h4>
                            <p>
                              <i className={getIconePagamento(agendamento.metodo_pagamento)}></i>{' '}
                              {formatarMetodoPagamento(agendamento.metodo_pagamento)}
                            </p>
                          </S.Info>
                        </S.HistoryInfos>
                      </S.HistoryContent>
                    </S.HistoryContainer>
                  ))}
                  {sortedHistorico.length > 3 && visibleItems < sortedHistorico.length && (
                    <S.ShowMoreButton onClick={handleShowMore}>
                      Visualizar Mais
                    </S.ShowMoreButton>
                  )}
                </S.HistoryList>
              ) : (
                <p className='empty'>Nenhum agendamento encontrado.</p>
              )}
            </S.HistorySection>
            <S.ClienteDeleteSection>
              <h3>Excluir cliente</h3>
              <p>
                Esta ação é irreversível e apagará todos os dados do cliente relacionados à sua
                barbearia, como valores recebidos e históricos de atendimento.
              </p>
              {onDelete && (
                <S.DeleteButton onClick={() => onDelete(cliente)} style={{ marginTop: '10px' }}>
                  <i className="ri-delete-bin-line"></i> Excluir cliente
                </S.DeleteButton>
              )}
            </S.ClienteDeleteSection>
          </>
        )}
      </S.Modal>
    </S.Overlay>
  );
};

export default Detalhes;
