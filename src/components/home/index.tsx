import * as S from './styles'

import logo from '../../assets/images/logo.png'
import bannerImg from '../../assets/images/bb.avif' // coloque uma imagem de banner aqui

const Home = () => {
    return (
        <S.Container className="container">
            <S.Header>
                <img src={logo} alt="Logo" />
                <div>
                    <S.Button to="/login">Login</S.Button>
                    <S.Button to="/cadastro">Cadastro</S.Button>
                </div>
            </S.Header>

            <S.BannerSection>
                <div>
                    <h1>Transforme sua barbearia com a gente</h1>
                    <p>Agendamento fácil, rápido e eficiente — direto do seu celular.</p>
                    <S.Button to="/cadastro">Comece Agora</S.Button>
                </div>
                <img src={bannerImg} alt="Banner" />
            </S.BannerSection>

            <S.FeaturesSection>
                <h2>Por que escolher nossa plataforma?</h2>
                <ul>
                    <li>✔️ Gerencie seus agendamentos em tempo real</li>
                    <li>✔️ Interface intuitiva para você e seus clientes</li>
                    <li>✔️ Notificações automáticas por e-mail</li>
                    <li>✔️ Controle total da sua agenda e serviços</li>
                </ul>
            </S.FeaturesSection>

            <S.Footer>
                <p>&copy; {new Date().getFullYear()} Barberly. Todos os direitos reservados.</p>
            </S.Footer>
        </S.Container>
    )
}

export default Home
