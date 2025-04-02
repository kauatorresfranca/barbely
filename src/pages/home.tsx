// components/Home.tsx
import { useBarbearias } from '../hooks/useBarbearias'
import HomePage from '../components/home'

const Home = () => {
    const barbearias = useBarbearias()
    
    return (
        <>
        <div>
            <HomePage />
            {barbearias.map(barbearia => (
                <ul key={barbearia.id}>
                    <li>noma da barbearia: {barbearia.nome_barbearia}</li>
                    <li>email da barbearia: {barbearia.email}</li>
                    <li>proprietario da barbearia: {barbearia.nome_proprietario}</li>
                </ul>
            ))}
        </div>
        </>
        
    )
}

export default Home
