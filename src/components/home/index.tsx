import * as S from "./styles"
import logo from "../../assets/images/logo.png"

const Home = () => {

    return (
    <S.Container>
        <S.Header>
            <img src={logo}/>
            <div>
                <S.Button to='/login'>Login</S.Button>
                <S.Button to='/cadastro'>Cadastro</S.Button>
            </div>
        </S.Header>
    </S.Container>
    )
}

export default Home