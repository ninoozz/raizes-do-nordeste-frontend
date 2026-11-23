import { useState } from 'react'
import { Info } from 'lucide-react'
import CampoTexto from '../comum/CampoTexto'
import Botao from '../comum/Botao'

export default function FormularioEntrar({ onEntrar }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function entrar(e) {
    e.preventDefault()
    if (!onEntrar(email, senha)) setErro('E-mail ou senha incorretos.')
  }

  return (
    <form onSubmit={entrar} noValidate className="space-y-4">
      <CampoTexto id="email-entrar" rotulo="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <CampoTexto id="senha" rotulo="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} erro={erro} />
      <Botao type="submit" grande className="w-full">
        Entrar
      </Botao>

      <div className="flex gap-2 rounded-md bg-stone-100 p-3 text-sm text-stone-700">
        <Info className="mt-0.5 size-4 shrink-0" />
        <div>
          <p className="mb-1 font-medium">Conta de teste</p>
          <p>
            E-mail: <span className="font-semibold">cliente@raizes.com</span>
          </p>
          <p>
            Senha: <span className="font-semibold">1234</span>
          </p>
        </div>
      </div>
    </form>
  )
}
