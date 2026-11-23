import { useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router'
import { X } from 'lucide-react'
import { useLoja } from '../../contextos/LojaContext'
import { formatarMoeda } from '../../utils/formatar'
import AbasCategorias from '../../componentes/cardapio/AbasCategorias'
import AvisoPromocao from '../../componentes/cardapio/AvisoPromocao'
import ProdutoTotem from '../../componentes/totem/ProdutoTotem'

export default function TotemCardapio() {
  const { produtos, consumo, quantidades, itens, total, adicionar, diminuir, recomecar } = useOutletContext()
  const { saoJoao } = useLoja()
  const navegar = useNavigate()
  const [categoria, setCategoria] = useState('tapiocas')

  if (!consumo) return <Navigate to="/totem" replace />

  const aba = categoria === 'sao-joao' && !saoJoao ? 'tapiocas' : categoria
  const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0)

  return (
    <div className="mx-auto max-w-4xl px-6 pt-6 pb-36">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-lg text-stone-600">{consumo === 'aqui' ? 'Para comer aqui' : 'Para levar'}</p>
        <button type="button" onClick={recomecar} className="flex cursor-pointer items-center gap-1 text-lg text-stone-600 hover:text-red-700">
          <X className="size-5" />
          Cancelar pedido
        </button>
      </div>

      <AvisoPromocao totem />
      <AbasCategorias grande ativa={aba} onChange={setCategoria} saoJoao={saoJoao} />

      <div className="grid grid-cols-2 gap-4">
        {produtos
          .filter((p) => (aba === 'sao-joao' ? p.saoJoao : p.categoria === aba))
          .map((p) => (
            <ProdutoTotem
              key={p.id}
              produto={p}
              quantidade={quantidades[p.id] ?? 0}
              mostrarSaoJoao={saoJoao}
              onAdicionar={() => adicionar(p.id)}
              onDiminuir={() => diminuir(p.id)}
            />
          ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-lg">Meu pedido ({quantidadeTotal})</p>
            <p className="text-2xl font-semibold">{formatarMoeda(total)}</p>
          </div>
          <button
            type="button"
            disabled={quantidadeTotal === 0}
            onClick={() => navegar('/totem/pagamento')}
            className="h-16 cursor-pointer rounded-md bg-orange-700 px-12 text-xl font-medium text-white hover:bg-orange-800 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  )
}
