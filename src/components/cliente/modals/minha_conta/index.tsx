import { useCallback, useEffect, useRef } from 'react'
import * as S from './styles'
import { Cliente } from '../../../../models/cliente';

const MinhaContaModal = ({ onClose, cliente }: { onClose: () => void; cliente: Cliente | null }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    }, [onClose]);

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      if (modalRef.current) {
        modalRef.current.focus();
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleKeyDown]);

    return (
      <S.ModalOverlay>
        <S.ModalContent ref={modalRef} tabIndex={-1}>
          <S.CloseButton onClick={onClose} aria-label="Fechar modal">
            ×
          </S.CloseButton>
          <h2>Minha Conta</h2>
          <S.ModalBody>
            <p>Nome: {cliente?.user?.nome || 'Usuário'}</p>
            <p>Email: {cliente?.user?.email || 'email@exemplo.com'}</p>
            <p>Telefone: (XX) XXXX-XXXX</p>
            <S.ModalButton>Editar Perfil</S.ModalButton>
          </S.ModalBody>
        </S.ModalContent>
      </S.ModalOverlay>
    );
  };

    export default MinhaContaModal
