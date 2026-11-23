import { createContext, useContext, useState } from 'react'

const EquipeContext = createContext(null)

export const contasDaEquipe = [
  { email: 'cozinha@raizes.com', nome: 'Socorro Lima', funcao: 'Cozinha', lojaId: 'boa-viagem', painel: '/equipe/cozinha' },
  { email: 'atendente@raizes.com', nome: 'Ana Paula', funcao: 'Atendente', lojaId: 'boa-viagem', painel: '/equipe/balcao' },
  { email: 'gerente@raizes.com', nome: 'Marcos Vieira', funcao: 'Gerente', lojaId: 'boa-viagem', painel: '/equipe/gerente' },
]

export function EquipeProvider({ children }) {
  const [funcionario, setFuncionario] = useState(null)

  function entrar(email, senha) {
    const conta = contasDaEquipe.find((c) => c.email === email.trim().toLowerCase())
    if (!conta || senha !== '1234') return null
    setFuncionario(conta)
    return conta
  }

  return (
    <EquipeContext.Provider value={{ funcionario, entrar, sair: () => setFuncionario(null) }}>
      {children}
    </EquipeContext.Provider>
  )
}

export function useEquipe() {
  return useContext(EquipeContext)
}
