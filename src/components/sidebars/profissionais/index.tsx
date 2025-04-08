import * as S from './styles'

const OverView = () => {

    return (
        <S.Container>
            <h2>Profissionais</h2>
            <S.ServiceHeader>
                <button>+ Novo Profissional</button>
            </S.ServiceHeader>
            <S.Head>
                <p>Nome</p>
                <p>Cargo</p>
                <i className="ri-tools-line"></i>
            </S.Head>
            <S.List>
                    <S.ListItem>
                        <p>Alex Santos</p>
                        <p>Barbeiro</p>
                        <S.IconsGroup>
                            <i className="ri-edit-2-line edit"></i>
                            <i className="ri-delete-bin-line delete"></i>
                        </S.IconsGroup>
                    </S.ListItem>
                    <S.ListItem>
                        <p>welignton</p>
                        <p>Barbeiro</p>
                        <S.IconsGroup>
                            <i className="ri-edit-2-line edit"></i>
                            <i className="ri-delete-bin-line delete"></i>
                        </S.IconsGroup>
                    </S.ListItem>
                    <S.ListItem>
                        <p>Tayná</p>
                        <p>Faxineira</p>
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