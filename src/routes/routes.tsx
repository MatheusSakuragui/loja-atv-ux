import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Home from "../pages/home";
import Carrinho from "../pages/carrinho";
import Avaliacao from "../pages/avaliacao";
import Monitoramento from "../pages/monitoramento";



const Routes = () => {
    return (
        <Switch>
            <Route path="/cadastro" element={<Cadastro/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/carrinho" element={<Carrinho/>}/>
            <Route path="/avaliacao" element={<Avaliacao/>}/>
            <Route path="/monitoramento" element={<Monitoramento/>}/>
        </Switch>
    )
}

export default Routes