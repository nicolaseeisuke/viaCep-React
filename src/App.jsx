import './App.css';
import { useForm } from 'react-hook-form';


function App() {

  const {register, handleSubmit, setValue, setFocus} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    const URL = `https://viacep.com.br/ws/${cep}/json/`


    try {
      fetch(URL).then(response => response.json()).then(data => {
        // register({ name: 'address', value: data.logradouro });
        setValue('address', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('uf', data.uf);
        setFocus('addressNumber');
      });
    } catch (error) {
      console.log(error.message);
    }
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        CEP:
        <input type="text" {...register("cep")} onBlur={checkCEP} />
      </label>
      <label>
        Rua:
        <input type="text" {...register("address" )}/>
      </label>
      <label>
        Número:
        <input type="text" {...register("addressNumber" )}/>
      </label>
      <label>
        Bairro:
        <input type="text" {...register("neighborhood" )}/>
      </label>
      <label>
        Cidade:
        <input type="text" {...register("city" )}/>
      </label>
      <label>
        Estado:
        <input type="text" {...register("uf" )}/>
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;