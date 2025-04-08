import GraficoVendas from "../../gradico_vendas";
import * as S from "./styles";

const Overview = () => {
    const hoje = new Date().toISOString().split("T")[0]
    const novaData = new Date();
    novaData.setDate(novaData.getDate() - 7);

    const UmaSemanaAtrás = novaData.toISOString().split("T")[0];

    return (
        <S.Container>
            <S.Header>
                <h2>Visão Geral</h2>
            </S.Header>
            <S.Filtro>
                <S.InputsContainer>
                    <S.InputGroup>
                        <p>Inicio</p>
                        <input type="date" defaultValue={UmaSemanaAtrás}/>
                    </S.InputGroup>
                    <S.InputGroup>
                        <p>Fim</p>
                        <input type="date" defaultValue={hoje}/>
                    </S.InputGroup>
                </S.InputsContainer>
                <button>Filtrar</button>
            </S.Filtro>
            <S.FirstLine>
                <S.Card>
                    <i className="ri-line-chart-line"></i>
                    <div className="valor">
                        <h3>Faturamento</h3>
                        <p>R$ 13.403,00</p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-refund-2-line"></i>
                    <div className="valor">
                        <h3>Total de Custos</h3>
                        <p>R$ 573,00</p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-coins-fill"></i>
                    <div className="valor">
                        <h3>Total de Lucro</h3>
                        <p>R$ 12.500,00</p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-user-follow-fill"></i>
                    <div className="valor">
                        <h3>Clientes Atendidos</h3>
                        <p>157</p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-swap-line"></i>
                    <div className="valor">
                        <h3>Ticket Médio</h3>
                        <p>R$ 37,50</p>
                    </div>
                </S.Card>
            </S.FirstLine>
            <S.SecondLine>
                <S.GraficoContainer>
                    <GraficoVendas />
                </S.GraficoContainer>
                <S.Services>
                    <S.Card id="secondline">
                            <i className="ri-calendar-schedule-line"></i>
                            <div className="valor">
                                <h3>Agendametos</h3>
                                <p>24</p>
                            </div>
                    </S.Card>
                    <S.Card id="secondline">
                        <i className="ri-user-add-line"></i>
                        <div className="valor">
                            <h3>Clientes Novos</h3>
                            <p>7</p>
                        </div>
                    </S.Card>
                </S.Services>
            </S.SecondLine>
        </S.Container>
    );
};

export default Overview;
