import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firebaseAuth } from '../config/db';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ref, push, get, set } from 'firebase/database';
import { database } from '../config/db';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [interacted, setInteracted] = useState<boolean>(false);
  const [targetInteracted, setTargetInteracted] = useState<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const endTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();

    return () => {
      endTimeRef.current = Date.now();
      const durationInSeconds = Math.floor((endTimeRef.current - startTimeRef.current) / 1000);
      if (durationInSeconds > 0) {
        const durationRef = ref(database, 'monitoracao/tempo/login');
        push(durationRef, durationInSeconds);
      }
    };
  }, []);

  useEffect(() => {
    const contagemRef = ref(database, 'monitoracao/contagem/acesso/login');
    get(contagemRef).then((snapshot) => {
      const data = snapshot.val();
      const contagem = data || 0;
      const novaContagem = contagem + 1;
      set(ref(database, 'monitoracao/contagem/acesso/login'), novaContagem);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log('Usuário logado com sucesso!');
      handleInteract(true)
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);

    }
  };

  const handleInteract = (alvo: boolean) => {
    if (alvo) {
      if (!targetInteracted) {
        const contagemRef = ref(database, 'monitoracao/contagem/interacaoDesejada/login');
        get(contagemRef).then((snapshot) => {
          const data = snapshot.val();
          const contagem = data || 0;
          const novaContagem = contagem + 1;
          set(ref(database, 'monitoracao/contagem/interacaoDesejada/login'), novaContagem);
        });
        setTargetInteracted(true);
      }
    }
    if (!interacted) {
      const contagemRef = ref(database, 'monitoracao/contagem/interacao/login');
      get(contagemRef).then((snapshot) => {
        const data = snapshot.val();
        const contagem = data || 0;
        const novaContagem = contagem + 1;
        set(ref(database, 'monitoracao/contagem/interacao/login'), novaContagem);
      });
      setInteracted(true);
    }
  };


  return (
    <div className="container">
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>
        <Link style={{textAlign:"right", position:"relative"}} onClick={()=>{ handleInteract(true); }} to={"/cadastro"} >Criar uma conta</Link>
      </Form>
    </div>
  );
};

export default Login;
