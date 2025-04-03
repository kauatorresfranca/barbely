import styled from 'styled-components';
import { colors } from '../../../styles';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 12px;
    background-color: ${colors.cinzaClaro};
    border-radius: 8px;
    text-align: center;
`;
