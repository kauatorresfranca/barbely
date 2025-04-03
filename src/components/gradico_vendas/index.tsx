import { colors } from '../../../styles';
import * as S from './styles'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
    { dia: '01/04', valor: 250 },
    { dia: '02/04', valor: 300 },
    { dia: '03/04', valor: 150 },
    { dia: '04/04', valor: 500 },
    { dia: '05/04', valor: 600 },
];

const GraficoVendas = () => {
    return (
        <S.Container>
                <h2>Total de vendas</h2>
                <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    {/* Eixo X e Y */}
                    <XAxis dataKey="dia" stroke={colors.branco} />
                    <YAxis stroke={colors.branco} />
                    
                    {/* Grid do gráfico */}
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.texto} />
                    
                    {/* Linha personalizada */}
                    <Line type="monotone" dataKey="valor" stroke={colors.corPrimaria} strokeWidth={3} dot={{ r: 6, fill: colors.corPrimaria }} />
                    
                    {/* Tooltip ao passar o mouse */}
                    <Tooltip contentStyle={{ backgroundColor: colors.cinzaEscuro, borderRadius: "5px" }} />
                </LineChart>
            </ResponsiveContainer>
        </S.Container>
    );
};

export default GraficoVendas;
