import { useParams } from 'react-router'
import { Award, CircleX, Store } from 'lucide-react'
import { usePedidos } from '../contextos/PedidosContext'
import { buscarLoja } from '../dados/lojas'
import TituloPagina from '../componentes/layout/TituloPagina'
import Botao from '../componentes/comum/Botao'
import LinhaDoTempo from '../componentes/pedido/LinhaDoTempo'

export default function AcompanharPedido() {
  const { numero } = useParams()
  const { buscarPedido } = usePedidos()
  const pedido = buscarPedido(Number(numero))

  if (!pedido) {
    return (
      <div className="mx-auto max-w-md py-6 text-center">
        <h1 className="mb-2 text-xl font-semibold">Pedido não encontrado</h1>
        <Botao para="/" secundario>
          Voltar ao início
        </Botao>
      </div>
    )
  }

  const loja = buscarLoja(pedido.lojaId)
  const pago = ['recebido', 'em-preparo', 'pronto', 'retirado'].includes(pedido.status)

  return (
    <div className="mx-auto max-w-md">
      <TituloPagina titulo={`Pedido #${pedido.numero}`} subtitulo={`Loja ${loja.nome}`} />

      {pedido.status === 'cancelado' && (
        <div className="flex gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <CircleX className="size-5 shrink-0" />
          <p>Esse pedido foi cancelado. Motivo: {pedido.cancelamento.motivo.toLowerCase()}.</p>
        </div>
      )}

      {!pago && pedido.status !== 'cancelado' && (
        <p className="rounded-md bg-amber-50 p-4 text-sm text-amber-900">
          O pagamento ainda não foi confirmado. Assim que confirmar, o pedido vai para a cozinha.
        </p>
      )}

      {pago && (
        <div className="space-y-4">
          <div className="rounded-md border border-stone-200 bg-white p-5">
            <LinhaDoTempo pedido={pedido} />
          </div>

          <div className="flex items-center gap-3 rounded-md border border-stone-200 bg-white p-4">
            <Store className="size-6 shrink-0 text-orange-700" />
            <p className="text-sm">
              Retire {pedido.retirada === 'pickup' ? 'no pick-up' : 'no balcão'} com o código <span className="font-semibold">{pedido.numero}</span>.
            </p>
          </div>

          {pedido.canal === 'app' && (
            <p className="flex items-center gap-2 text-sm text-stone-600">
              <Award className="size-4 text-orange-700" />+{pedido.pontosGanhos} pontos adicionados
            </p>
          )}
        </div>
      )}
    </div>
  )
}
