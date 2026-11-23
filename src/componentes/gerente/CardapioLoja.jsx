import { Flame } from 'lucide-react'
import { useLoja } from '../../contextos/LojaContext'
import { formatarMoeda } from '../../utils/formatar'
import Interruptor from '../comum/Interruptor'

export default function CardapioLoja({ loja, funcionario }) {
  const { cardapio, alternarProduto } = useLoja()
  const produtos = [...cardapio(loja)].sort((a, b) => a.nome.localeCompare(b.nome))

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-md border border-stone-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-stone-500">
            <tr>
              <th className="px-4 py-2 font-medium">Produto</th>
              <th className="px-4 py-2 font-medium">Preço</th>
              <th className="px-4 py-2 font-medium">Disponível</th>
              <th className="px-4 py-2 font-medium">Sazonal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {produtos.map((p) => (
              <tr key={p.id} className={p.esgotado ? 'text-stone-400' : ''}>
                <td className="px-4 py-3 font-medium">{p.nome}</td>
                <td className="px-4 py-3">{formatarMoeda(p.preco)}</td>
                <td className="px-4 py-2">
                  <Interruptor
                    ligado={!p.esgotado}
                    onChange={() => alternarProduto(loja, p, funcionario.nome)}
                    aria-label={`${p.nome} disponível`}
                  />
                </td>
                <td className="px-4 py-2">
                  {p.saoJoao && (
                    <span className="inline-flex items-center gap-1 rounded bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-900">
                      <Flame className="size-3.5" />
                      São João
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-lg space-y-2 text-sm text-yellow-900">
        <p className="rounded-md bg-yellow-100 p-3">Descontos e cancelamentos ficam registrados na Auditoria (quem fez, quando e por quê).</p>
        <p className="rounded-md bg-yellow-100 p-3">Relatórios usam dados agrupados, sem nome nem CPF do cliente (LGPD).</p>
      </div>
    </div>
  )
}
