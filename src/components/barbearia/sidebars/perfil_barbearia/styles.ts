import styled from 'styled-components'
import { breakpoints, colors } from '../../../../../styles'

export const Container = styled.div`
    transition: 0.3s ease-in-out;

    .subtitle {
        margin-top: 6px;
        margin-bottom: 16px;
        color: ${colors.texto};
        font-size: 14px;
    }

    @media (max-width: ${breakpoints.tablet}) {
        .subtitle {
            font-size: 12px;
        }
    }
`

export const PerfilBarbearia = styled.div`
    display: flex;
    gap: 40px;

    @media (max-width: ${breakpoints.tablet}) {
        flex-direction: column;
    }
`

export const SiderBarPerfil = styled.div`
    display: flex;
    flex-direction: column;
`

export const Tab = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 58px;
    width: 320px;
    padding: 12px;
    margin-bottom: 12px;
    border: 2px solid ${colors.cinzaTransparent};
    border-radius: 10px;
    background-color: ${colors.cinzaClaro};
    cursor: pointer;
    transition: 0.3s ease-in-out;

    h3 {
        color: ${colors.texto};
        font-size: 16px;
        font-weight: 500;
    }

    .icon_left {
        margin-right: 6px;
        font-size: 20px;
    }

    .icon_right {
        position: absolute;
        right: 8px;
        font-size: 20px;
        color: ${colors.texto};
    }

    &:hover {
        border: 2px solid ${colors.branco};
    }

    &.active {
        border: 2px solid ${colors.corPrimaria};

        h3 {
            color: ${colors.corPrimaria};
        }

        .icon_right {
            position: absolute;
            right: 8px;
            color: ${colors.corPrimaria};
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`
