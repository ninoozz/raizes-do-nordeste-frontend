import { formatarMoeda } from '../../utils/formatar'

export default function ResumoPedido({ pedido, nomeDaLoja }) {
  return (
    <div className="rounded-md border border-stone-200 bg-white p-4">
      <h2 className="mb-3 font-semibold">Resumo do pedido</h2>
      <div className="space-y-2 text-sm">
        {pedido.itens.map((item) => (
          <div key={item.id} className="flex justify-between gap-2">
            <span>
              {item.quantidade}x {item.nome}
            </span>
            <span className="shrink-0">{formatarMoeda(item.preco * item.quantidade)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1 border-t border-stone-200 pt-3 text-sm">
        <div className="flex justify-between text-stone-600">
          <span>Subtotal</span>
          <span>{formatarMoeda(pedido.subtotal)}</span>
        </div>
        {pedido.desconto > 0 && (
          <div className="flex justify-between text-green-700">
            <span>Desconto</span>
            <span>-{formatarMoeda(pedido.desconto)}</span>
          </div>
        )}
        <div className="flex justify-between pt-1 text-base font-semibold">
          <span>Total</span>
          <span>{formatarMoeda(pedido.total)}</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-stone-500">
        Retirada na loja {nomeDaLoja}, {pedido.retirada === 'balcao' ? 'no balcão' : 'no pick-up'}.
      </p>
    </div>
  )
}
