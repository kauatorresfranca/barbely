// components/Home.tsx
import Formulario from '../components/formulario';
import { useBarbearias } from '../hooks/useBarbearias';

const Home = () => {
    const barbearias = useBarbearias();

    return (
        <div>
            <h1>Lista de Barbearias</h1>
                {barbearias.map(barbearia => (
                    <ul key={barbearia.id}>
                        <li>nome da barbearia: {barbearia.nome}</li>
                        <li>email da barbearia: {barbearia.email}</li>
                    </ul>
                ))}
                <Formulario/>
        </div>
    );
};

export default Home;
