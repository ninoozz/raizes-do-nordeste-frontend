import { usePedidos } from '../../contextos/PedidosContext'
import { fechadosAntes } from '../../dados/relatorios'
import { formatarMoeda } from '../../utils/formatar'

const pagos = ['recebido', 'em-preparo', 'pronto', 'retirado']

export default function Indicadores({ loja }) {
  const { pedidos } = usePedidos()

  const validos = pedidos.filter((p) => p.lojaId === loja.id && pagos.includes(p.status))
  const quantidade = fechadosAntes.pedidos + validos.length
  const vendas = fechadosAntes.vendas + validos.reduce((soma, p) => soma + p.total, 0)

  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-3">
      <div className="rounded-md border border-stone-300 bg-white p-4">
        <p className="text-sm text-stone-500">Vendas hoje</p>
        <p className="text-2xl font-semibold">{formatarMoeda(vendas)}</p>
      </div>
      <div className="rounded-md border border-stone-300 bg-white p-4">
        <p className="text-sm text-stone-500">Pedidos</p>
        <p className="text-2xl font-semibold">{quantidade}</p>
      </div>
      <div className="rounded-md border border-stone-300 bg-white p-4">
        <p className="text-sm text-stone-500">Ticket médio</p>
        <p className="text-2xl font-semibold">{formatarMoeda(vendas / quantidade)}</p>
      </div>
    </div>
  )
}
