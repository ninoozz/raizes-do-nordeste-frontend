import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { Info } from 'lucide-react'
import { contasDaEquipe, useEquipe } from '../../contextos/EquipeContext'
import CampoTexto from '../../componentes/comum/CampoTexto'
import Botao from '../../componentes/comum/Botao'

export default function LoginEquipe() {
  const { funcionario, entrar } = useEquipe()
  const navegar = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  if (funcionario) return <Navigate to={funcionario.painel} replace />

  function enviar(e) {
    e.preventDefault()
    const conta = entrar(email, senha)
    if (conta) navegar(conta.painel)
    else setErro('E-mail ou senha incorretos.')
  }

  return (
    <div className="grid min-h-screen place-items-center bg-stone-800 p-4 text-stone-800">
      <div className="w-full max-w-sm">
        <div className="rounded-md bg-white p-6">
          <h1 className="mb-5 text-xl font-semibold">Área da equipe</h1>

          <form onSubmit={enviar} noValidate className="space-y-4">
            <CampoTexto id="email-equipe" rotulo="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <CampoTexto id="senha-equipe" rotulo="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} erro={erro} />
            <Botao type="submit" grande className="w-full">
              Entrar
            </Botao>
          </form>

          <div className="mt-5 flex gap-2 rounded-md bg-stone-100 p-3 text-sm text-stone-700">
            <Info className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="mb-1 font-medium">Contas de teste (senha 1234)</p>
              {contasDaEquipe.map((conta) => (
                <p key={conta.email}>
                  {conta.funcao}: <span className="font-semibold">{conta.email}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <Link to="/" className="mt-4 block text-center text-sm text-stone-300 hover:underline">
          Voltar para o site
        </Link>
      </div>
    </div>
  )
}
