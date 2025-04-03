import styled from 'styled-components';

export const Container = styled.div`
    color: #333;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Balance = styled.h2`
    margin: 16px 0;
    color: #28a745;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

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
