import { useLoja } from '../../contextos/LojaContext'
import { usePedidos } from '../../contextos/PedidosContext'
import { formatarHora, formatarMoeda } from '../../utils/formatar'

export default function Auditoria({ loja }) {
  const { pedidos } = usePedidos()
  const { alteracoes } = useLoja()

  const registros = []

  for (const p of pedidos) {
    if (p.lojaId !== loja.id) continue

    if (p.desconto > 0 && p.status !== 'aguardando-pagamento' && p.status !== 'pagamento-recusado') {
      registros.push({
        quando: p.criadoEm,
        tipo: 'Desconto',
        quem: `Cliente (${p.canal})`,
        oque: `${formatarMoeda(p.desconto)} no pedido #${p.numero}`,
        motivo: p.cupom ? `Cupom ${p.cupom}` : `${p.pontosUsados} pontos`,
      })
    }

    if (p.cancelamento) {
      registros.push({
        quando: p.cancelamento.quando,
        tipo: 'Cancelamento',
        quem: p.cancelamento.quem,
        oque: `Pedido #${p.numero} (${formatarMoeda(p.total)})`,
        motivo: p.cancelamento.motivo,
      })
    }
  }

  for (const a of alteracoes) {
    registros.push({ quando: a.quando, tipo: a.tipo, quem: a.quem, oque: a.descricao, motivo: '' })
  }

  registros.sort((a, b) => b.quando - a.quando)

  return (
    <div className="overflow-x-auto rounded-md border border-stone-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 text-left text-stone-500">
          <tr>
            <th className="px-4 py-2 font-medium">Hora</th>
            <th className="px-4 py-2 font-medium">Tipo</th>
            <th className="px-4 py-2 font-medium">Quem</th>
            <th className="px-4 py-2 font-medium">O que</th>
            <th className="px-4 py-2 font-medium">Motivo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {registros.map((r, i) => {
            let cor = 'bg-stone-100 text-stone-700'
            if (r.tipo === 'Cancelamento') cor = 'bg-red-100 text-red-800'
            if (r.tipo === 'Desconto') cor = 'bg-green-100 text-green-800'

            return (
              <tr key={i}>
                <td className="px-4 py-2 whitespace-nowrap">{formatarHora(r.quando)}</td>
                <td className="px-4 py-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${cor}`}>{r.tipo}</span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{r.quem}</td>
                <td className="px-4 py-2">{r.oque}</td>
                <td className="px-4 py-2 text-stone-500">{r.motivo || '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
