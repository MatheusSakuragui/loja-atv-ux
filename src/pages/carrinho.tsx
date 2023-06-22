import React, { useEffect, useState, useRef } from 'react';
import { Badge, Button, Card, Nav, Navbar } from 'react-bootstrap';
import { database, firebaseAuth } from '../config/db';
import { uid } from '../util/authCred';
import { ref, set, onValue, remove, update, push, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

interface Product {
  id: string;
  preco: number;
  nome: string;
}

const Carrinho: React.FC = () => {
  const [carrinho, setCarrinho] = useState<Product[]>([]);
  const [totalCompra, setTotalCompra] = useState<number>(0);
  const [interacted, setInteracted] = useState<boolean>(false);
  const [targetInteracted, setTargetInteracted] = useState<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const endTimeRef = useRef<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const contagemRef = ref(database, 'monitoracao/contagem/acesso/carrinho');
    get(contagemRef).then((snapshot) => {
      const data = snapshot.val();
      const contagem = data || 0;
      const novaContagem = contagem + 1;
      set(ref(database, 'monitoracao/contagem/acesso/carrinho'), novaContagem);
    });
  }, []);
  useEffect(() => {
    const carrinhoRef = ref(database, `carrinho/${uid}`);
    onValue(carrinhoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const carrinhoList: Product[] = Object.values(data);
        setCarrinho(carrinhoList);
        calcularTotalCompra(carrinhoList);
      } else {
        setCarrinho([]);
        setTotalCompra(0);
      }
    });


    startTimeRef.current = Date.now();

    return () => {
      endTimeRef.current = Date.now();
      console.log(startTimeRef.current, endTimeRef.current);
      const durationInSeconds = Math.floor((endTimeRef.current - startTimeRef.current) / 1000);
      console.log(durationInSeconds);
      if (durationInSeconds > 0) {
        const durationRef = ref(database, 'monitoracao/tempo/carrinho');
        push(durationRef, durationInSeconds);
      }
    };
  }, []);

  const calcularTotalCompra = (carrinhoList: Product[]) => {
    const total = carrinhoList.reduce((sum, product) => sum + product.preco, 0);
    setTotalCompra(total);
  };

  const comprar = () => {
    if (uid) {
      const carrinhoRef = ref(database, `carrinho/${uid}`);
      set(carrinhoRef, null);
    }

    navigate('/avaliacao');
  };
  const handleInteract = (alvo: boolean) => {
    if (alvo) {
      if (!targetInteracted) {
        const contagemRef = ref(database, 'monitoracao/contagem/interacaoDesejada/carrinho');
        get(contagemRef).then((snapshot) => {
          const data = snapshot.val();
          const contagem = data || 0;
          const novaContagem = contagem + 1;
          set(ref(database, 'monitoracao/contagem/interacaoDesejada/carrinho'), novaContagem);
        });
        setTargetInteracted(true)
      }
    }
    if (!interacted) {
      const contagemRef = ref(database, 'monitoracao/contagem/interacao/carrinho');
      get(contagemRef).then((snapshot) => {
        const data = snapshot.val();
        const contagem = data || 0;
        const novaContagem = contagem + 1;
        set(ref(database, 'monitoracao/contagem/interacao/carrinho'), novaContagem);
      });
      setInteracted(true)
    }
  };
  const removerDoCarrinho = (productId: string) => {
    const novoCarrinho = carrinho.filter((item) => item.id !== productId);
    setCarrinho(novoCarrinho);
    calcularTotalCompra(novoCarrinho);

    if (uid) {
      const carrinhoRef = ref(database, `carrinho/${uid}`);
      set(carrinhoRef, novoCarrinho);
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

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => { handleInteract(false); navigate('/home') }}>Lojinha</Navbar.Brand>
        <Navbar.Text>
          <Nav.Link onClick={() => { handleInteract(false); navigate('/carrinho') }}>
            Carrinho <Badge>{carrinho.length}</Badge>
          </Nav.Link>
        </Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4">
        <h1>Carrinho</h1>

        {carrinho.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {carrinho.map((product) => (
                <Card key={product.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{product.nome}</Card.Title>
                    <Card.Text>Valor: R${product.preco}</Card.Text>
                    <Button variant="danger" onClick={() => { handleInteract(false); removerDoCarrinho(product.id) }}>
                      Remover do Carrinho
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <div className="col-md-4">
              <Card>
                <Card.Body>
                  <Card.Title>Resumo da Compra</Card.Title>
                  <Card.Text>Total: R${totalCompra}</Card.Text>
                  <Button variant="success" onClick={() => { handleInteract(true); comprar() }}>
                    Comprar
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Carrinho;
