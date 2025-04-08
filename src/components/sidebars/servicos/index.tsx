import * as S from './styles'

const OverView = () => {

    return (
        <S.Container>
            <h2>Serviços</h2>
            <S.ServiceHeader>
                <button>+ Novo Serviço</button>
            </S.ServiceHeader>
            <S.Head>
                <p>Nome</p>
                <p>Valor</p>
                <i className="ri-tools-line"></i>
            </S.Head>
            <S.List>
                    <S.ListItem>
                        <p>Cabelo</p>
                        <p>R$ {`35,00`}</p>
                        <S.IconsGroup>
                            <i className="ri-edit-2-line edit"></i>
                            <i className="ri-delete-bin-line delete"></i>
                        </S.IconsGroup>
                    </S.ListItem>
                    <S.ListItem>
                        <p>Cabelo + Barba</p>
                        <p>R$ {`45,00`}</p>
                        <S.IconsGroup>
                            <i className="ri-edit-2-line edit"></i>
                            <i className="ri-delete-bin-line delete"></i>
                        </S.IconsGroup>
                    </S.ListItem>
                    <S.ListItem>
                        <p>Barba</p>
                        <p>R$ {`15,00`}</p>
                        <S.IconsGroup>
                            <i className="ri-edit-2-line edit"></i>
                            <i className="ri-delete-bin-line delete"></i>
                        </S.IconsGroup>
                    </S.ListItem>
            </S.List>
        </S.Container>
    )
}

export default OverView