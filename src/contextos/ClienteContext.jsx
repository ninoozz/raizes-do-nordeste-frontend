import { createContext, useContext, useState } from 'react'

const ClienteContext = createContext(null)

const semConsentimento = { promocoes: false, ofertas: false }

const contaDeTeste = {
  nome: 'José Ricardo',
  email: 'cliente@raizes.com',
  senha: '1234',
  celular: '(81) 99999-0000',
  aceitouTermosEm: '02/10/2026 08:14',
  pontos: 320,
  historico: [
    { id: 1, descricao: 'Pedido #1031', pontos: 42, data: '28/10/2026' },
    { id: 2, descricao: 'Pedido #1017', pontos: 158, data: '15/10/2026' },
    { id: 3, descricao: 'Pedido #0994', pontos: 120, data: '02/10/2026' },
  ],
  consentimentos: semConsentimento,
}

export function ClienteProvider({ children }) {
  const [contas, setContas] = useState([contaDeTeste])
  const [emailLogado, setEmailLogado] = useState(null)

  const conta = contas.find((c) => c.email === emailLogado)
  const cliente = conta
    ? { nome: conta.nome, email: conta.email, celular: conta.celular, aceitouTermosEm: conta.aceitouTermosEm }
    : null

  function alterarConta(alterar) {
    setContas((lista) => lista.map((c) => (c.email === emailLogado ? alterar(c) : c)))
  }

  function cadastrar({ nome, email, celular, senha }, consentimentos) {
    const emailLimpo = email.trim().toLowerCase()
    if (contas.some((c) => c.email === emailLimpo)) return 'Já existe uma conta com esse e-mail.'

    setContas([
      ...contas,
      {
        nome,
        email: emailLimpo,
        senha,
        celular,
        aceitouTermosEm: new Date().toLocaleString('pt-BR'),
        pontos: 0,
        historico: [],
        consentimentos,
      },
    ])
    setEmailLogado(emailLimpo)
  }

  function entrar(email, senha) {
    const encontrada = contas.find((c) => c.email === email.trim().toLowerCase() && c.senha === senha)
    if (!encontrada) return false
    setEmailLogado(encontrada.email)
    return true
  }

  function atualizarDados(novos) {
    alterarConta((c) => ({ ...c, ...novos }))
  }

  function mudarConsentimento(chave, ligado) {
    alterarConta((c) => ({ ...c, consentimentos: { ...c.consentimentos, [chave]: ligado } }))
  }

  function excluirConta() {
    setContas(contas.filter((c) => c.email !== emailLogado))
    setEmailLogado(null)
  }

  function creditarPontos(pedido) {
    const data = new Date().toLocaleDateString('pt-BR')
    const linhas = [{ id: `${pedido.numero}-compra`, descricao: `Pedido #${pedido.numero}`, pontos: Math.floor(pedido.total), data }]

    if (pedido.pontosEmDobro > 0) {
      linhas.unshift({ id: `${pedido.numero}-dobro`, descricao: `Pontos em dobro de São João (#${pedido.numero})`, pontos: pedido.pontosEmDobro, data })
    }
    if (pedido.pontosUsados > 0) {
      linhas.push({ id: `${pedido.numero}-desconto`, descricao: `Desconto no pedido #${pedido.numero}`, pontos: -pedido.pontosUsados, data })
    }

    const saldo = linhas.reduce((soma, linha) => soma + linha.pontos, 0)
    setContas((lista) =>
      lista.map((c) =>
        c.email === pedido.clienteEmail ? { ...c, pontos: Math.max(0, c.pontos + saldo), historico: [...linhas, ...c.historico] } : c,
      ),
    )
  }

  return (
    <ClienteContext.Provider
      value={{
        cliente,
        pontos: conta ? conta.pontos : 0,
        historico: conta ? conta.historico : [],
        consentimentos: conta ? conta.consentimentos : semConsentimento,
        cadastrar,
        entrar,
        sair: () => setEmailLogado(null),
        atualizarDados,
        mudarConsentimento,
        excluirConta,
        creditarPontos,
      }}
    >
      {children}
    </ClienteContext.Provider>
  )
}

export function useCliente() {
  return useContext(ClienteContext)
}
