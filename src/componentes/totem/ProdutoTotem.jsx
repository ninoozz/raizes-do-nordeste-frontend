import { Flame } from 'lucide-react'
import { formatarMoeda } from '../../utils/formatar'
import ControleQuantidade from '../comum/ControleQuantidade'
import IconeCategoria from '../cardapio/IconeCategoria'

export default function ProdutoTotem({ produto, quantidade, mostrarSaoJoao, onAdicionar, onDiminuir }) {
  if (produto.esgotado) {
    return (
      <div className="flex flex-col rounded-md border-2 border-dashed border-stone-300 p-4">
        <div className="mb-3 grid h-28 place-items-center rounded-md bg-stone-100 text-stone-300">
          <IconeCategoria categoria={produto.categoria} className="size-12" />
        </div>
        <p className="text-lg text-stone-400">{produto.nome}</p>
        <p className="font-semibold text-red-700">Esgotado</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-md border-2 border-stone-200 bg-white p-4">
      <div className="relative mb-3 grid h-28 place-items-center rounded-md bg-orange-50 text-orange-700">
        <IconeCategoria categoria={produto.categoria} className="size-12" />
        {mostrarSaoJoao && produto.saoJoao && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded bg-yellow-200 px-2 py-0.5 text-sm font-medium text-yellow-900">
            <Flame className="size-4" />
            São João
          </span>
        )}
      </div>
      <p className="text-lg font-medium">{produto.nome}</p>
      <p className="mb-4 text-stone-500">{formatarMoeda(produto.preco)}</p>

      <div className="mt-auto">
        {quantidade > 0 ? (
          <div className="flex justify-center">
            <ControleQuantidade grande quantidade={quantidade} onMenos={onDiminuir} onMais={onAdicionar} />
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdicionar}
            className="h-12 w-full cursor-pointer rounded-md bg-orange-700 text-lg font-medium text-white hover:bg-orange-800"
          >
            Adicionar
          </button>
        )}
      </div>
    </div>
  )
}
