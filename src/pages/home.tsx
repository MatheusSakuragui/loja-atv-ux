import React, { useEffect, useState, useRef } from 'react';
import { Badge, Button, Card, Nav, Navbar } from 'react-bootstrap';
import { database, firebaseAuth } from '../config/db';
import { uid } from '../util/authCred';
import { ref, set, onValue, push, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

interface Product {
  preco: number;
  nome: string;
}

const Home: React.FC = () => {
  const [carrinho, setCarrinho] = useState<Product[]>([]);
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [carrinhoCount, setCarrinhoCount] = useState<number>(0);
  const [interacted, setInteracted] = useState<boolean>(false);
  const [targetInteracted, setTargetInteracted] = useState<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const endTimeRef = useRef<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const productsRef = ref(database, 'produtos');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProdutos(productList);
        console.log(productList);
      }
    });

    startTimeRef.current = Date.now();


    // Cleanup function when component unmounts
    return () => {
      endTimeRef.current = Date.now();
      console.log(startTimeRef.current, endTimeRef.current);
      // Calculate and save the duration in seconds
      const durationInSeconds = Math.floor((endTimeRef.current - startTimeRef.current) / 1000);
      console.log(durationInSeconds);
      if (durationInSeconds > 0 && interacted) {
        const durationRef = ref(database, 'monitoracao/tempo/home');
        push(durationRef, durationInSeconds);
      }
    };
  }, [interacted]);

  useEffect(() => {
    const carrinhoRef = ref(database, `carrinho/${uid}`);
    onValue(carrinhoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const carrinhoList: Product[] = Object.values(data);
        console.log(carrinhoList);
        setCarrinhoCount(carrinhoList.length);
      } else {
        setCarrinhoCount(0);
      }
    });
  }, []);

  useEffect(() => {
    const contagemRef = ref(database, 'monitoracao/contagem/acesso/home');
    get(contagemRef).then((snapshot) => {
      const data = snapshot.val();
      const contagem = data || 0;
      const novaContagem = contagem + 1;
      set(ref(database, 'monitoracao/contagem/acesso/home'), novaContagem);
    });
  }, []);

  const adicionarAoCarrinho = (product: Product) => {
    setCarrinho([...carrinho, product]);
    if (uid) {
      const carrinhoRef = ref(database, `carrinho/${uid}`);
      set(carrinhoRef, [...carrinho, product]);
    }
  };

  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log('Erro ao fazer logout:', error);
      });
  };

  const handleInteract = (alvo: boolean) => {
    if (alvo) {
      if(!targetInteracted){
        const contagemRef = ref(database, 'monitoracao/contagem/interacaoDesejada/home');
        get(contagemRef).then((snapshot) => {
          const data = snapshot.val();
          const contagem = data || 0;
          const novaContagem = contagem + 1;
          set(ref(database, 'monitoracao/contagem/interacaoDesejada/home'), novaContagem);
        });
        setTargetInteracted(true)
      }
    }
    if (!interacted) {
      const contagemRef = ref(database, 'monitoracao/contagem/interacao/home');
      get(contagemRef).then((snapshot) => {
        const data = snapshot.val();
        const contagem = data || 0;
        const novaContagem = contagem + 1;
        set(ref(database, 'monitoracao/contagem/interacao/home'), novaContagem);
      });
      setInteracted(true)
    }
  };


  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => { handleInteract(false); navigate('/home'); }}>Lojinha</Navbar.Brand>
        <Navbar.Text>
          <Nav.Link onClick={() => { handleInteract(true); navigate('/carrinho'); }}>
            Carrinho <Badge>{carrinhoCount}</Badge>
          </Nav.Link>
        </Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={() => { handleInteract(false); handleLogout(); }}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4">
        <h1>Produtos</h1>

        <div className="row">
          {produtos.map((product) => (
            <div key={product.nome} className="col-md-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{product.nome}</Card.Title>
                  <Card.Text>Valor: R${product.preco}</Card.Text>
                  <Button onClick={() => { adicionarAoCarrinho(product); handleInteract(true); }}>
                    Adicionar ao Carrinho
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default Home;
