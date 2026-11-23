import { usePedidos } from '../../contextos/PedidosContext'
import { nomeDoCanal, nomeDoStatus } from '../../dados/pedidos'
import { formatarHora, formatarMoeda } from '../../utils/formatar'

export default function ResumoLoja({ loja }) {
  const { pedidos } = usePedidos()
  const daLoja = pedidos.filter((p) => p.lojaId === loja.id)
  const contar = (status) => daLoja.filter((p) => p.status === status).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-3 font-semibold">Agora na loja</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-md bg-white p-4">
            <p className="text-2xl font-semibold">{contar('recebido')}</p>
            <p className="text-sm text-stone-500">esperando a cozinha</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-2xl font-semibold">{contar('em-preparo')}</p>
            <p className="text-sm text-stone-500">em preparo</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-2xl font-semibold">{contar('pronto')}</p>
            <p className="text-sm text-stone-500">prontos para retirar</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-2xl font-semibold">{contar('pagamento-pendente')}</p>
            <p className="text-sm text-stone-500">com pagamento pendente</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">Últimos pedidos</h2>
        <div className="overflow-x-auto rounded-md border border-stone-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left text-stone-500">
              <tr>
                <th className="px-4 py-2 font-medium">Pedido</th>
                <th className="px-4 py-2 font-medium">Hora</th>
                <th className="px-4 py-2 font-medium">Canal</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[...daLoja].reverse().slice(0, 6).map((p) => (
                <tr key={p.numero}>
                  <td className="px-4 py-2 font-medium">#{p.numero}</td>
                  <td className="px-4 py-2">{formatarHora(p.criadoEm)}</td>
                  <td className="px-4 py-2">{nomeDoCanal[p.canal]}</td>
                  <td className="px-4 py-2">{nomeDoStatus[p.status]}</td>
                  <td className="px-4 py-2 text-right">{formatarMoeda(p.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
