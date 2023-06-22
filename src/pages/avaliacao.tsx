import React, { useState, useEffect, useRef } from 'react';
import { ref, push, get, set } from 'firebase/database';
import { database, firebaseAuth } from '../config/db';
import { Badge, Button, Form, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Avaliacao: React.FC = () => {
  const [avaliacao, setAvaliacao] = useState<number>(0);
  const navigate = useNavigate();
  const [interacted, setInteracted] = useState<boolean>(false);
  const [targetInteracted, setTargetInteracted] = useState<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const endTimeRef = useRef<number>(0);
  useEffect(() => {
    const contagemRef = ref(database, 'monitoracao/contagem/acesso/avaliacao');
    get(contagemRef).then((snapshot) => {
      const data = snapshot.val();
      const contagem = data || 0;
      const novaContagem = contagem + 1;
      set(ref(database, 'monitoracao/contagem/acesso/avaliacao'), novaContagem);
    });
  }, []);
  useEffect(() => {
    startTimeRef.current = Date.now();


    return () => {
      endTimeRef.current = Date.now();
      const durationInSeconds = Math.floor((endTimeRef.current - startTimeRef.current) / 1000);
      if (durationInSeconds > 0) {
        const durationRef = ref(database, 'monitoracao/tempo/avaliacao');
        push(durationRef, durationInSeconds);
      }
    };
  }, []);
  
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
        if (!targetInteracted) {
          const contagemRef = ref(database, 'monitoracao/contagem/interacaoDesejada/avaliacao');
          get(contagemRef).then((snapshot) => {
            const data = snapshot.val();
            const contagem = data || 0;
          const novaContagem = contagem + 1;
          set(ref(database, 'monitoracao/contagem/interacaoDesejada/avaliacao'), novaContagem);
        });
        setTargetInteracted(true);
      }
    }
    if (!interacted) {
      const contagemRef = ref(database, 'monitoracao/contagem/interacao/avaliacao');
      get(contagemRef).then((snapshot) => {
        const data = snapshot.val();
        const contagem = data || 0;
        const novaContagem = contagem + 1;
        set(ref(database, 'monitoracao/contagem/interacao/avaliacao'), novaContagem);
      });
      setInteracted(true);
    }
  };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      const avaliacoesRef = ref(database, 'avaliacoes');
      push(avaliacoesRef, avaliacao);
      handleInteract(true);
      navigate('/home');
    };


  return (
    <>
       <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => { handleInteract(false); navigate('/home') }}>Lojinha</Navbar.Brand>
        <Navbar.Text>
          <Nav.Link onClick={() => { handleInteract(false); navigate('/carrinho') }}>
            Carrinho <Badge>0</Badge>
          </Nav.Link>
        </Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center">Avaliação</h1>
        <Form onSubmit={handleSubmit} className="text-center">
          <Form.Label className="mb-3">
            De 0 a 10 o quanto você recomendaria a loja para amigos e familiares?
          </Form.Label>
          <br></br>
          <div className="btn-group" role="group">
            {Array.from({ length: 11 }, (_, index) => (
              <Button
                key={index}
                variant={avaliacao === index ? 'primary' : 'outline-primary'}
                onClick={() => setAvaliacao(index)}
              >
                {index}
              </Button>
            ))}
          </div>
          <br></br>
          <Button  type="submit" className="btn btn-primary mt-3">
            Enviar
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Avaliacao;
