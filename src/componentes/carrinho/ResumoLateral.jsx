import { ShoppingBag } from 'lucide-react'
import { formatarMoeda } from '../../utils/formatar'
import Botao from '../comum/Botao'

export default function ResumoLateral({ itens, subtotal }) {
  return (
    <div className="sticky top-22 hidden h-fit rounded-md border border-stone-200 bg-white p-5 md:block">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <ShoppingBag className="size-5 text-orange-700" />
        Meu pedido
      </h2>

      {itens.length === 0 && <p className="text-sm text-stone-500">Seu carrinho está vazio. Escolha algo do cardápio.</p>}

      {itens.length > 0 && (
        <>
          <div className="mb-4 space-y-2 text-sm">
            {itens.map((item) => (
              <div key={item.id} className="flex justify-between gap-2">
                <span>
                  {item.quantidade}x {item.nome}
                </span>
                <span className="shrink-0">{formatarMoeda(item.preco * item.quantidade)}</span>
              </div>
            ))}
          </div>
          <div className="mb-4 flex justify-between border-t border-stone-200 pt-3 font-semibold">
            <span>Subtotal</span>
            <span>{formatarMoeda(subtotal)}</span>
          </div>
          <Botao para="/carrinho" className="w-full">
            Finalizar pedido
          </Botao>
        </>
      )}
    </div>
  )
}
