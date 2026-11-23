import { formatarMoeda } from '../../utils/formatar'
import ControleQuantidade from '../comum/ControleQuantidade'

export default function ItemCarrinho({ item, onMais, onMenos }) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="min-w-0 flex-1">
        <p className="font-medium">{item.nome}</p>
        <p className="text-sm text-stone-500">{formatarMoeda(item.preco)} cada</p>
      </div>
      <ControleQuantidade quantidade={item.quantidade} onMais={onMais} onMenos={onMenos} />
      <span className="w-18 shrink-0 text-right font-medium">{formatarMoeda(item.preco * item.quantidade)}</span>
    </div>
  )
}
