import styled from 'styled-components';
import { colors } from '../../../../styles';

export const Container = styled.div`
    display: block;
    background-color: ${colors.cinzaClaro};
    color: #333;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 120px;
    margin-left: 300px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;

    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ccc;
    }

    th {
        background-color: #007bff;
        color: #fff;
    }
`;

export const Button = styled.button<{ delete?: boolean }>`
    padding: 8px 12px;
    margin: 4px;
    border: none;
    border-radius: 4px;
    background-color: ${({ delete: isDelete }) => (isDelete ? '#dc3545' : '#28a745')};
    color: #fff;
    cursor: pointer;

    &:hover {
        background-color: ${({ delete: isDelete }) => (isDelete ? '#c82333' : '#218838')};
    }
`;
