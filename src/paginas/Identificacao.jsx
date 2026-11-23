import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useCliente } from '../contextos/ClienteContext'
import { useCarrinho } from '../contextos/CarrinhoContext'
import TituloPagina from '../componentes/layout/TituloPagina'
import FormularioCadastro from '../componentes/conta/FormularioCadastro'
import FormularioEntrar from '../componentes/conta/FormularioEntrar'

export default function Identificacao() {
  const { cliente, cadastrar, entrar } = useCliente()
  const { itens } = useCarrinho()
  const navegar = useNavigate()
  const [aba, setAba] = useState('cadastro')

  const destino = itens.length > 0 ? '/pagamento' : '/conta'

  if (cliente) return <Navigate to={destino} replace />

  const estiloAba = (nome) =>
    `h-9 cursor-pointer rounded text-sm font-medium ${aba === nome ? 'bg-orange-700 text-white' : 'text-stone-600 hover:bg-stone-100'}`

  return (
    <div className="mx-auto max-w-md">
      <TituloPagina titulo="Identificação" subtitulo="Entre ou crie sua conta para continuar." voltarPara={itens.length > 0 ? '/carrinho' : '/'} />

      <div className="mb-4 grid grid-cols-2 rounded-md border border-stone-300 bg-white p-1">
        <button type="button" onClick={() => setAba('cadastro')} className={estiloAba('cadastro')}>
          Criar conta
        </button>
        <button type="button" onClick={() => setAba('entrar')} className={estiloAba('entrar')}>
          Já tenho conta
        </button>
      </div>

      <div className="rounded-md border border-stone-200 bg-white p-4">
        {aba === 'cadastro' ? (
          <FormularioCadastro
            onCadastrar={(dados, escolhas) => {
              const erro = cadastrar(dados, escolhas)
              if (!erro) navegar(destino)
              return erro
            }}
          />
        ) : (
          <FormularioEntrar
            onEntrar={(email, senha) => {
              const entrou = entrar(email, senha)
              if (entrou) navegar(destino)
              return entrou
            }}
          />
        )}
      </div>
    </div>
  )
}
