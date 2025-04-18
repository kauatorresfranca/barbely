import { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

import { Barbearia } from '../../../../models/Barbearia'

import * as S from './styles'

const CompartilharBarbearia = () => {
    const [barbearia, setBarbearia] = useState<Barbearia | null>(null)

    useEffect(() => {
        const dataStorage = sessionStorage.getItem('barbearia')

        if (dataStorage) {
            const barbeariaLogada = JSON.parse(dataStorage) as Barbearia
            setBarbearia(barbeariaLogada)
        }
    }, [])

    const copiarLink = () => {
        navigator.clipboard.writeText(`http://localhost:5173/barbearia/${barbearia?.slug}`)
        alert('Link copiado!')
    }

    const linkCompleto = `http://localhost:5173/barbearia/${barbearia?.slug}`

    return (
        <>
            {barbearia && (
                <S.Container>
                    <h2>Compartilhe o link da sua barbearia !</h2>
                    <p>
                        O link é uma forma fácil de você compartilhar com seus clientes o perfil da
                        sua barbearia, Clientes podem visualizar horários disponíveis, agendar
                        serviços e receber lembretes automáticos.
                    </p>
                    <QRCodeCanvas value={linkCompleto} size={170} />
                    <div className="link">
                        <i className="ri-link-m"></i>
                        <p className="linktext">{linkCompleto}</p>
                    </div>
                    <S.Button onClick={copiarLink}>Copiar link</S.Button>
                    <S.ToBarberClientLink to={`/barbearia/${barbearia.slug}`}>
                        Ver barbearia
                    </S.ToBarberClientLink>
                </S.Container>
            )}
        </>
    )
}

export default CompartilharBarbearia
