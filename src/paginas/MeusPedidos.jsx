import { Link } from 'react-router'
import { ChevronRight, ReceiptText } from 'lucide-react'
import { useCliente } from '../contextos/ClienteContext'
import { usePedidos } from '../contextos/PedidosContext'
import { nomeDoStatus } from '../dados/pedidos'
import { formatarHora, formatarMoeda } from '../utils/formatar'
import TituloPagina from '../componentes/layout/TituloPagina'
import Botao from '../componentes/comum/Botao'

export default function MeusPedidos() {
  const { cliente } = useCliente()
  const { pedidos } = usePedidos()

  if (!cliente) {
    return (
      <div className="mx-auto max-w-md py-6 text-center">
        <ReceiptText className="mx-auto mb-3 size-10 text-stone-300" />
        <h1 className="mb-6 text-xl font-semibold">Entre para ver seus pedidos</h1>
        <Botao para="/identificacao">Entrar ou criar conta</Botao>
      </div>
    )
  }

  const meus = pedidos.filter((p) => p.clienteEmail === cliente.email).reverse()

  return (
    <div className="mx-auto max-w-md">
      <TituloPagina titulo="Meus pedidos" voltarPara="/" />

      {meus.length === 0 && (
        <div className="rounded-md border border-stone-200 bg-white p-5 text-center">
          <p className="mb-4 text-sm text-stone-500">Você ainda não fez nenhum pedido hoje.</p>
          <Botao para="/">Fazer um pedido</Botao>
        </div>
      )}

      <div className="space-y-2">
        {meus.map((p) => (
          <Link
            key={p.numero}
            to={`/pedido/${p.numero}`}
            className="flex items-center justify-between gap-3 rounded-md border border-stone-200 bg-white p-4 hover:border-orange-300"
          >
            <div>
              <p className="font-medium">
                Pedido #{p.numero} <span className="text-sm font-normal text-stone-500">às {formatarHora(p.criadoEm)}</span>
              </p>
              <p className="text-sm text-stone-600">
                {nomeDoStatus[p.status]}, {formatarMoeda(p.total)}
              </p>
            </div>
            <ChevronRight className="size-5 shrink-0 text-stone-400" />
          </Link>
        ))}
      </div>
    </div>
  )
}
