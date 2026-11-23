import { Flame, Plus } from 'lucide-react'
import { formatarMoeda } from '../../utils/formatar'
import ControleQuantidade from '../comum/ControleQuantidade'
import IconeCategoria from './IconeCategoria'

export default function ItemCardapio({ produto, quantidade, mostrarSaoJoao, onAdicionar, onDiminuir }) {
  const { nome, descricao, preco, categoria, esgotado } = produto

  return (
    <div className={`flex gap-4 rounded-md border bg-white p-3 lg:flex-col lg:gap-3 ${esgotado ? 'border-dashed border-stone-300' : 'border-stone-200'}`}>
      <div
        className={`grid size-20 shrink-0 place-items-center rounded-md lg:h-28 lg:w-full ${esgotado ? 'bg-stone-100 text-stone-300' : 'bg-orange-50 text-orange-700'}`}
      >
        <IconeCategoria categoria={categoria} className="size-8" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-medium ${esgotado ? 'text-stone-400' : ''}`}>{nome}</h3>
          {mostrarSaoJoao && produto.saoJoao && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-900">
              <Flame className="size-3.5" />
              São João
            </span>
          )}
        </div>
        <p className="text-sm text-stone-500">{descricao}</p>

        <div className="mt-auto flex items-center justify-between pt-2 lg:flex-col lg:items-start lg:gap-2">
          {esgotado ? (
            <span className="text-sm font-medium text-red-700">Esgotado nesta loja</span>
          ) : (
            <span className="font-semibold">{formatarMoeda(preco)}</span>
          )}

          {quantidade > 0 && !esgotado ? (
            <ControleQuantidade quantidade={quantidade} onMenos={onDiminuir} onMais={onAdicionar} />
          ) : (
            <button
              type="button"
              onClick={onAdicionar}
              disabled={esgotado}
              aria-label={`Adicionar ${nome}`}
              className="grid size-9 cursor-pointer place-items-center rounded-md bg-orange-700 text-sm font-medium text-white hover:bg-orange-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 lg:w-full"
            >
              <Plus className="size-5 lg:hidden" />
              <span className="hidden lg:inline">Adicionar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
