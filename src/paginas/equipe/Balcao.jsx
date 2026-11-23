import { useState } from 'react'
import { useEquipe } from '../../contextos/EquipeContext'
import { usePedidos } from '../../contextos/PedidosContext'
import { buscarLoja } from '../../dados/lojas'
import NovoPedidoBalcao from '../../componentes/balcao/NovoPedidoBalcao'
import ListaRetiradas from '../../componentes/balcao/ListaRetiradas'

export default function Balcao() {
  const { funcionario } = useEquipe()
  const { pedidos } = usePedidos()
  const [aba, setAba] = useState('novo')

  const daLoja = pedidos.filter((p) => p.lojaId === funcionario.lojaId)
  const prontos = daLoja.filter((p) => p.status === 'pronto').length
  const pendentes = daLoja.filter((p) => p.status === 'pagamento-pendente').length

  const estiloAba = (nome) =>
    `h-10 cursor-pointer border-b-2 px-4 text-sm font-medium ${aba === nome ? 'border-orange-700 text-orange-800' : 'border-transparent text-stone-500 hover:text-stone-800'}`

  return (
    <>
      <h1 className="mb-3 text-2xl font-semibold">Balcão</h1>

      <div className="mb-6 flex border-b border-stone-300">
        <button type="button" onClick={() => setAba('novo')} className={estiloAba('novo')}>
          Novo pedido
        </button>
        <button type="button" onClick={() => setAba('retiradas')} className={estiloAba('retiradas')}>
          Retiradas
          {prontos > 0 && <span className="ml-2 rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">{prontos}</span>}
          {pendentes > 0 && <span className="ml-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs text-white">{pendentes}</span>}
        </button>
      </div>

      {aba === 'novo' ? <NovoPedidoBalcao loja={buscarLoja(funcionario.lojaId)} /> : <ListaRetiradas funcionario={funcionario} />}
    </>
  )
}
