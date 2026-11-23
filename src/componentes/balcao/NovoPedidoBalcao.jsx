import { useState } from 'react'
import { CircleCheck, Plus } from 'lucide-react'
import { categorias } from '../../dados/produtos'
import { useLoja } from '../../contextos/LojaContext'
import { usePedidos } from '../../contextos/PedidosContext'
import { formatarMoeda } from '../../utils/formatar'
import ControleQuantidade from '../comum/ControleQuantidade'
import Botao from '../comum/Botao'

export default function NovoPedidoBalcao({ loja }) {
  const { cardapio } = useLoja()
  const { criarPedido } = usePedidos()
  const [quantidades, setQuantidades] = useState({})
  const [forma, setForma] = useState('dinheiro')
  const [cpf, setCpf] = useState('')
  const [ultimoNumero, setUltimoNumero] = useState(null)

  const produtos = cardapio(loja)
  const itens = produtos
    .filter((p) => !p.esgotado && quantidades[p.id] > 0)
    .map((p) => ({ ...p, quantidade: quantidades[p.id] }))
  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0)

  function mudarQuantidade(id, diferenca) {
    setQuantidades({ ...quantidades, [id]: (quantidades[id] ?? 0) + diferenca })
    setUltimoNumero(null)
  }

  function registrar() {
    const pedido = criarPedido({
      canal: 'balcao',
      lojaId: loja.id,
      itens,
      subtotal: total,
      desconto: 0,
      total,
      forma,
      notaComCpf: cpf.replace(/\D/g, '').length === 11,
      status: 'recebido',
    })
    setUltimoNumero(pedido.numero)
    setQuantidades({})
    setCpf('')
  }

  return (
    <div className="gap-6 lg:grid lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="mb-6 space-y-5 lg:mb-0">
        {categorias.map((categoria) => (
          <div key={categoria.id}>
            <h3 className="mb-2 text-sm font-semibold text-stone-500 uppercase">{categoria.nome}</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {produtos
                .filter((p) => p.categoria === categoria.id)
                .map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    disabled={p.esgotado}
                    onClick={() => mudarQuantidade(p.id, 1)}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-md border border-stone-200 bg-white p-3 text-left hover:border-orange-400 disabled:cursor-not-allowed disabled:border-dashed disabled:bg-stone-50"
                  >
                    <span>
                      <span className={`block text-sm font-medium ${p.esgotado ? 'text-stone-400' : ''}`}>{p.nome}</span>
                      <span className={`text-sm ${p.esgotado ? 'text-red-700' : 'text-stone-500'}`}>
                        {p.esgotado ? 'Esgotado' : formatarMoeda(p.preco)}
                      </span>
                    </span>
                    {!p.esgotado && <Plus className="size-5 text-orange-700" />}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 rounded-md border border-stone-200 bg-white p-5 lg:sticky lg:top-6">
        <h2 className="font-semibold">Pedido no balcão</h2>

        {ultimoNumero && (
          <p className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-800">
            <CircleCheck className="size-4 shrink-0" />
            Pedido #{ultimoNumero} enviado para a cozinha.
          </p>
        )}

        {itens.length === 0 ? (
          <p className="text-sm text-stone-500">Nenhum item ainda.</p>
        ) : (
          <div className="divide-y divide-stone-200">
            {itens.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                <span className="flex-1">{item.nome}</span>
                <ControleQuantidade quantidade={item.quantidade} onMenos={() => mudarQuantidade(item.id, -1)} onMais={() => mudarQuantidade(item.id, 1)} />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between border-t border-stone-200 pt-3 text-lg font-semibold">
          <span>Total</span>
          <span>{formatarMoeda(total)}</span>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium">Pagamento</p>
          <div className="grid grid-cols-3 gap-1 rounded-md border border-stone-300 p-1 text-sm">
            {['dinheiro', 'cartao', 'pix'].map((opcao) => {
              let nome = 'Pix'
              if (opcao === 'dinheiro') nome = 'Dinheiro'
              if (opcao === 'cartao') nome = 'Cartão'

              return (
                <button
                  key={opcao}
                  type="button"
                  onClick={() => setForma(opcao)}
                  className={`h-8 cursor-pointer rounded ${forma === opcao ? 'bg-stone-800 text-white' : 'hover:bg-stone-100'}`}
                >
                  {nome}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label htmlFor="cpf-balcao" className="mb-1 block text-sm font-medium">
            CPF na nota (opcional)
          </label>
          <input
            id="cpf-balcao"
            inputMode="numeric"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            className="h-10 w-full rounded-md border border-stone-300 px-3 text-sm outline-none focus:border-orange-600"
          />
          <p className="mt-1 text-xs text-stone-500">Vai só para a nota fiscal, não fica salvo no sistema.</p>
        </div>

        <Botao grande className="w-full" disabled={itens.length === 0} onClick={registrar}>
          Registrar pedido
        </Botao>
      </div>
    </div>
  )
}
