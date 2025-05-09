import styled from 'styled-components'
import { motion } from 'framer-motion'

export const ToastContainer = styled(motion.div)`
    position: fixed;
    top: 25%; /* Posição mais alta da tela */
    left: 50%;
    transform: translateX(-50%); /* Centraliza horizontalmente */
    background: #333;
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    pointer-events: none;
`
