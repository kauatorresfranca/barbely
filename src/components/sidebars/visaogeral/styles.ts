import styled from "styled-components";
import { colors } from "../../../../styles";

export const Container = styled.div`
    width: 100%;
    color: #fff;
`

export const Header = styled.div`
    margin-bottom: 20px;

    h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
    }
`

export const FirstLine = styled.div`
    display: flex;
    gap: 20px;
`

export const SecondLine = styled.div`
    display: flex;
    max-height: 358px;
    height: 100%;
    width: 100%;
    margin-top: 40px;
    gap: 20px;
`

export const Card = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background: ${colors.cinzaClaro};
    height: 130px;
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-left: 4px solid ${colors.corPrimaria};

    &#secondline {
        height: 175px;
        width: 100%;
        border: none;
    }

    .valor {
        position: absolute;
        right: 70px;
    }

    i {
        color: ${colors.branco};
        font-size: 28px;
    }

    h3 {
        font-size: 18px;
        margin-bottom: 10px;
        color: ${colors.texto};
    }

    p {
        font-size: 22px;
        font-weight: bold;
        color: ${colors.branco}
    }
`

export const GraficoContainer = styled.div`
    background: ${colors.cinzaClaro};
    border-radius: 8px;
    width: 60.5%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const Services = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 40%;
`
