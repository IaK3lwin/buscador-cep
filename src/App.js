//imports
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import './style/style.css'
import api from './services/api'

function App() {   

    // cep /json/

    const [input, setinput] = useState('')
    const [data, setData] = useState({})


    async function click() {

        //validando o input
        if (input == '')
        {

            alert('preencha com um CEP')
            setinput('')
            return
        }

        try 
        {
            const response = await api.get(`${input}/json/`)
            setData(response.data)
            setinput('')

        } catch(e)
        {
            alert('CEP inserido é inválido')
            setinput('')
        }

    }

  return (
    <div className="Container">
        <h1 className="Title" >Busque seu cep</h1>
        
        <div className="ContainerInput">
            <input
                type="text"
                placeholder="Digite seu cep.."
                value={input}
                //    ao mudar o input, atribu o valor para input
                onChange={ (e) => setinput(e.target.value) }

            />
            <button className="ButtonSearch" onClick={click}>
                <FiSearch size={25} color={25} />
            </button>
        </div>

        
        {Object.keys(data).length > 0 && ( //faz com que só redenrize se o data estiver com tamanho

                <main className='Main'>
            
                    <h2>CEP: {data.cep} </h2>
                    <span> Rua {data.complemento} </span>
                    
                    <span> Bairro {data.bairro}</span>
                    <span> {data.localidade} - {data.uf} </span>

                </main>
            )}

    </div>
  );
}

export default App;
