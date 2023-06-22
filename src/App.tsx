
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes/>
    </BrowserRouter>
  );
}

export default App;
