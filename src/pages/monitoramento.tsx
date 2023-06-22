import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Table, Navbar, Nav, Badge, Button } from 'react-bootstrap';
import { ref, onValue, onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database';

import { database, firebaseAuth } from '../config/db';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Monitoramento: React.FC = () => {
    const [temposCadastro, setTemposCadastro] = useState<number[]>([]);
    const [temposLogin, setTemposLogin] = useState<number[]>([]);
    const [temposHome, setTemposHome] = useState<number[]>([]);
    const [temposCarrinho, setTemposCarrinho] = useState<number[]>([]);
    const [temposAvaliacao, setTemposAvaliacao] = useState<number[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
    const [contagemHome, setContagemHome] = useState<number>(0);
    const [contagemCadastro, setContagemCadastro] = useState<number>(0);
    const [contagemLogin, setContagemLogin] = useState<number>(0);
    const [contagemCarrinho, setContagemCarrinho] = useState<number>(0);
    const [contagemAvaliacao, setContagemAvaliacao] = useState<number>(0);
    const [contagemInteracaoHome, setContagemInteracaoHome] = useState<number>(0);
    const [contagemInteracaoCadastro, setContagemInteracaoCadastro] = useState<number>(0);
    const [contagemInteracaoLogin, setContagemInteracaoLogin] = useState<number>(0);
    const [contagemInteracaoCarrinho, setContagemInteracaoCarrinho] = useState<number>(0);
    const [contagemInteracaoAvaliacao, setContagemInteracaoAvaliacao] = useState<number>(0);
    const [contagemInteracaoDesejadaHome, setContagemInteracaoDesejadaHome] = useState<number>(0);
    const [contagemInteracaoDesejadaCadastro, setContagemInteracaoDesejadaCadastro] = useState<number>(0);
    const [contagemInteracaoDesejadaLogin, setContagemInteracaoDesejadaLogin] = useState<number>(0);
    const [contagemInteracaoDesejadaCarrinho, setContagemInteracaoDesejadaCarrinho] = useState<number>(0);
    const [contagemInteracaoDesejadaAvaliacao, setContagemInteracaoDesejadaAvaliacao] = useState<number>(0);
    const [npsMessage, setNPSMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {

        const temposCadastroRef = ref(database, 'monitoracao/tempo/cadastro');
        onValue(temposCadastroRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tempos: number[] = Object.values(data);
                setTemposCadastro(tempos);
            } else {
                setTemposCadastro([]);
            }
        });

        const temposLoginRef = ref(database, 'monitoracao/tempo/login');
        onValue(temposLoginRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tempos: number[] = Object.values(data);
                setTemposLogin(tempos);
            } else {
                setTemposLogin([]);
            }
        });

        const temposHomeRef = ref(database, 'monitoracao/tempo/home');
        onValue(temposHomeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tempos: number[] = Object.values(data);
                setTemposHome(tempos);
            } else {
                setTemposHome([]);
            }
        });

        const temposCarrinhoRef = ref(database, 'monitoracao/tempo/carrinho');
        onValue(temposCarrinhoRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tempos: number[] = Object.values(data);
                setTemposCarrinho(tempos);
            } else {
                setTemposCarrinho([]);
            }
        });

        const temposAvaliacaoRef = ref(database, 'monitoracao/tempo/avaliacao');
        onValue(temposAvaliacaoRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tempos: number[] = Object.values(data);
                setTemposAvaliacao(tempos);
            } else {
                setTemposAvaliacao([]);
            }
        });

        const avaliacaoRef = ref(database, 'avaliacoes');
        onValue(avaliacaoRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const avaliacoesData: any[] = Object.values(data);
                setAvaliacoes(avaliacoesData);
            } else {
                setAvaliacoes([]);
            }
        });


        const contagemHomeRef = ref(database, 'monitoracao/contagem/acesso/home');
        onValue(contagemHomeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                console.log(data)
                setContagemHome(data);
            } else {
                setContagemHome(0);
            }
        });

        const contagemCadastroRef = ref(database, 'monitoracao/contagem/acesso/cadastro');
        onValue(contagemCadastroRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemCadastro(data);
            } else {
                setContagemCadastro(0);
            }
        });

        const contagemLoginRef = ref(database, 'monitoracao/contagem/acesso/login');
        onValue(contagemLoginRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemLogin(data);
            } else {
                setContagemLogin(0);
            }
        });

        const contagemCarrinhoRef = ref(database, 'monitoracao/contagem/acesso/carrinho');
        onValue(contagemCarrinhoRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemCarrinho(data);
            } else {
                setContagemCarrinho(0);
            }
        });

        const contagemAvaliacaoRef = ref(database, 'monitoracao/contagem/acesso/avaliacao');
        onValue(contagemAvaliacaoRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemAvaliacao(data);
            } else {
                setContagemAvaliacao(0);
            }
        });

        const contagemInteracaoHomeRef = ref(database, 'monitoracao/contagem/interacao/home');
        onValue(contagemInteracaoHomeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                console.log(data)
                setContagemInteracaoHome(data);
            } else {
                setContagemInteracaoHome(0);
            }
        });

        const contagemInteracaoCadastroRef = ref(database, 'monitoracao/contagem/interacao/cadastro');
        onValue(contagemInteracaoCadastroRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemInteracaoCadastro(data);
            } else {
                setContagemInteracaoCadastro(0);
            }
        });

        const contagemInteracaoLoginRef = ref(database, 'monitoracao/contagem/interacao/login');
        onValue(contagemInteracaoLoginRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemInteracaoLogin(data);
            } else {
                setContagemInteracaoLogin(0);
            }
        });

        const contagemInteracaoCarrinhoRef = ref(database, 'monitoracao/contagem/interacao/carrinho');
        onValue(contagemInteracaoCarrinhoRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemInteracaoCarrinho(data);
            } else {
                setContagemInteracaoCarrinho(0);
            }
        });

        const contagemInteracaoAvaliacaoRef = ref(database, 'monitoracao/contagem/interacao/avaliacao');
        onValue(contagemInteracaoAvaliacaoRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemInteracaoAvaliacao(data);
            } else {
                setContagemInteracaoAvaliacao(0);
            }
        });

        const contagemInteracaoDesejadaHomeRef = ref(database, 'monitoracao/contagem/interacaoDesejada/home');
        onValue(contagemInteracaoDesejadaHomeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                console.log(data)
                setContagemInteracaoDesejadaHome(data);
            } else {
                setContagemInteracaoDesejadaHome(0);
            }
        });

        const contagemInteracaoDesejadaCadastroRef = ref(database, 'monitoracao/contagem/interacaoDesejada/cadastro');
        onValue(contagemInteracaoDesejadaCadastroRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemInteracaoDesejadaCadastro(data);
            } else {
                setContagemInteracaoDesejadaCadastro(0);
            }
        });

        const contagemInteracaoDesejadaLoginRef = ref(database, 'monitoracao/contagem/interacaoDesejada/login');
        onValue(contagemInteracaoDesejadaLoginRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemInteracaoDesejadaLogin(data);
            } else {
                setContagemInteracaoDesejadaLogin(0);
            }
        });

        const contagemInteracaoDesejadaCarrinhoRef = ref(database, 'monitoracao/contagem/interacaoDesejada/carrinho');
        onValue(contagemInteracaoDesejadaCarrinhoRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemInteracaoDesejadaCarrinho(data);
            } else {
                setContagemInteracaoDesejadaCarrinho(0);
            }
        });

        const contagemInteracaoDesejadaAvaliacaoRef = ref(database, 'monitoracao/contagem/interacaoDesejada/avaliacao');
        onValue(contagemInteracaoDesejadaAvaliacaoRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setContagemInteracaoDesejadaAvaliacao(data);
            } else {
                setContagemInteracaoDesejadaAvaliacao(0);
            }
        });

    }, []);

    const calcularMediaTempo = (tempos: number[]) => {
        const total = tempos.reduce((sum, tempo) => sum + tempo, 0);
        return tempos.length > 0 ? total / tempos.length : 0;
    };

    const calcularNPS = (avaliacoes: any[]) => {
        const promoters = avaliacoes.filter((avaliacao) => avaliacao >= 9);
        const detractors = avaliacoes.filter((avaliacao) => avaliacao <= 6);
        const nps = ((promoters.length - detractors.length) / avaliacoes.length) * 100;
        return Math.round(nps);
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

    const getNPSClass = (nps: number) => {
        if (nps >= 75) {
            return 'nps-good';
        } else if (nps >= 50) {
            return 'nps-average';
        } else {
            return 'nps-below-average';
        }
    };

    const getNPSMessage = (nps: number) => {
        if (nps >= 75) {
            return 'Seu NPS é Excelente!';
        } else if (nps >= 50) {
            return 'Seu NPS é Bom!';
        } else {
            return 'Seu NPS é Ruim!';
        }
    };

    const conversionCalculate = (acessosComInteracaoDesejada: number, acessoTotal: number) => {
        if (acessosComInteracaoDesejada > 0) {
            let resultado = acessosComInteracaoDesejada / acessoTotal;
            return resultado  * 100
        }
        return 0
    }

    const rejectionCalculate = (acessosComInteracao: number, acessoTotal: number) => {
        if (acessoTotal > 0) {
            let resultado = (acessoTotal - acessosComInteracao) / acessoTotal;
            return resultado * 100
        }
        return 0
    }


    return (
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand onClick={() => navigate('/home')}>Lojinha</Navbar.Brand>
            <Navbar.Text>
              <Nav.Link onClick={() => navigate('/carrinho')}>
                Carrinho
              </Nav.Link>
            </Navbar.Text>
            <Navbar.Collapse className="justify-content-end">
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <h1>Monitoramento</h1>
            <h2>Tempo de execução</h2>
            <Tabs defaultActiveKey="cadastro" id="monitoramento-tabs">
              <Tab eventKey="cadastro" title="Cadastro">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tempo (s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {temposCadastro.map((tempo, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{tempo.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Média de tempo: {calcularMediaTempo(temposCadastro).toFixed(2)} segundos
                </p>
              </Tab>
              <Tab eventKey="login" title="Login">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tempo (s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {temposLogin.map((tempo, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{tempo.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Média de tempo: {calcularMediaTempo(temposLogin).toFixed(2)} segundos
                </p>
              </Tab>
              <Tab eventKey="home" title="Home">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tempo (s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {temposHome.map((tempo, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{tempo.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Média de tempo: {calcularMediaTempo(temposHome).toFixed(2)} segundos
                </p>
              </Tab>
              <Tab eventKey="carrinho" title="Carrinho">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tempo (s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {temposCarrinho.map((tempo, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{tempo.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Média de tempo: {calcularMediaTempo(temposCarrinho).toFixed(2)} segundos
                </p>
              </Tab>
              <Tab eventKey="avaliacao" title="Avaliação">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tempo (s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {temposAvaliacao.map((tempo, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{tempo.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Média de tempo: {calcularMediaTempo(temposAvaliacao).toFixed(2)} segundos
                </p>
              </Tab>
            </Tabs>
            <h2>Acessos</h2>
            <Tabs defaultActiveKey="cadastro" id="monitoramento-tabs-contagem">
              <Tab eventKey="cadastro" title="Cadastro">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Acessos totais</th>
                      <th>Acesso com Interações</th>
                      <th>Acesso com Interações Desejadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{contagemCadastro}</td>
                      <td>{contagemInteracaoCadastro}</td>
                      <td>{contagemInteracaoDesejadaCadastro}</td>
                    </tr>
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de conversão: {conversionCalculate(contagemInteracaoDesejadaCadastro, contagemCadastro).toFixed(2)}%
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de rejeição: {rejectionCalculate(contagemInteracaoCadastro, contagemCadastro).toFixed(2)}%
                </p>
              </Tab>
              <Tab eventKey="login" title="Login">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Acessos totais</th>
                      <th>Acesso com Interações</th>
                      <th>Acesso com Interações Desejadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{contagemLogin}</td>
                      <td>{contagemInteracaoLogin}</td>
                      <td>{contagemInteracaoDesejadaLogin}</td>
                    </tr>
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de conversão: {conversionCalculate(contagemInteracaoDesejadaLogin, contagemLogin).toFixed(2)}%
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de rejeição: {rejectionCalculate(contagemInteracaoLogin, contagemLogin).toFixed(2)}%
                </p>
              </Tab>
              <Tab eventKey="home" title="Home">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Acessos totais</th>
                      <th>Acesso com Interações</th>
                      <th>Acesso com Interações Desejadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{contagemHome}</td>
                      <td>{contagemInteracaoHome}</td>
                      <td>{contagemInteracaoDesejadaHome}</td>
                    </tr>
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de conversão: {conversionCalculate(contagemInteracaoDesejadaHome, contagemHome).toFixed(2)}%
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de rejeição: {rejectionCalculate(contagemInteracaoHome, contagemHome).toFixed(2)}%
                </p>
              </Tab>
              <Tab eventKey="carrinho" title="Carrinho">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Acessos totais</th>
                      <th>Acesso com Interações</th>
                      <th>Acesso com Interações Desejadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{contagemCarrinho}</td>
                      <td>{contagemInteracaoCarrinho}</td>
                      <td>{contagemInteracaoDesejadaCarrinho}</td>
                    </tr>
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de conversão: {conversionCalculate(contagemInteracaoDesejadaCarrinho, contagemCarrinho).toFixed(2)}%
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de rejeição: {rejectionCalculate(contagemInteracaoCarrinho, contagemCarrinho).toFixed(2)}%
                </p>
              </Tab>
              <Tab eventKey="avaliacao" title="Avaliação">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Acessos totais</th>
                      <th>Acesso com Interações</th>
                      <th>Acesso com Interações Desejadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{contagemAvaliacao}</td>
                      <td>{contagemInteracaoAvaliacao}</td>
                      <td>{contagemInteracaoDesejadaAvaliacao}</td>
                    </tr>
                  </tbody>
                </Table>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de conversão: {conversionCalculate(contagemInteracaoDesejadaAvaliacao, contagemAvaliacao).toFixed(2)}%
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  Taxa de rejeição: {rejectionCalculate(contagemInteracaoAvaliacao, contagemAvaliacao).toFixed(2)}%
                </p>
              </Tab>
            </Tabs>
      
      
            <h2>NPS do sistema</h2>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {avaliacoes.map((avaliacao, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{avaliacao.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p style={{ fontWeight: 'bold' }}>NPS: {calcularNPS(avaliacoes).toFixed(2)}</p>
            <p className={`nps ${getNPSClass(calcularNPS(avaliacoes))}`}> {getNPSMessage(calcularNPS(avaliacoes))} </p>
          </div>
        </>
      );
      
};

export default Monitoramento;
