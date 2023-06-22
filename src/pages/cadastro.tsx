import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../config/db';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, push, get, set } from 'firebase/database';
import { database } from '../config/db';

const Cadastro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [interacted, setInteracted] = useState<boolean>(false);
  const [targetInteracted, setTargetInteracted] = useState<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const endTimeRef = useRef<number>(0);
  
  useEffect(() => {
    const contagemRef = ref(database, 'monitoracao/contagem/acesso/cadastro');
    get(contagemRef).then((snapshot) => {
      const data = snapshot.val();
      const contagem = data || 0;
      const novaContagem = contagem + 1;
      set(ref(database, 'monitoracao/contagem/acesso/cadastro'), novaContagem);
    });
  }, []);

  useEffect(() => {
    startTimeRef.current = Date.now();
    return () => {
      endTimeRef.current = Date.now();
      const durationInSeconds = Math.floor((endTimeRef.current - startTimeRef.current) / 1000);
      if (durationInSeconds > 0) {
        const durationRef = ref(database, 'monitoracao/tempo/cadastro');
        push(durationRef, durationInSeconds);
      }
    };
  }, []);

  const handleInteract = (alvo: boolean) => {
    if (alvo) {
      if (!targetInteracted) {
        const contagemRef = ref(database, 'monitoracao/contagem/interacaoDesejada/cadastro');
        get(contagemRef).then((snapshot) => {
          const data = snapshot.val();
          const contagem = data || 0;
        const novaContagem = contagem + 1;
        set(ref(database, 'monitoracao/contagem/interacaoDesejada/cadastro'), novaContagem);
      });
      setTargetInteracted(true);
    }
  }
  if (!interacted) {
    const contagemRef = ref(database, 'monitoracao/contagem/interacao/cadastro');
    get(contagemRef).then((snapshot) => {
      const data = snapshot.val();
      const contagem = data || 0;
      const novaContagem = contagem + 1;
      set(ref(database, 'monitoracao/contagem/interacao/cadastro'), novaContagem);
    });
    setInteracted(true);
  }
};

  const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      console.log('Usuário cadastrado com sucesso!');
      handleInteract(true)
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro</h1>
      <Form onSubmit={handleCadastro}>
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
          Cadastrar
        </Button>
      </Form>
    </div>
  );
};

export default Cadastro;
