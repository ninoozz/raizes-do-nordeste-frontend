import { useState } from 'react'
import { PackageCheck } from 'lucide-react'
import { usePedidos } from '../../contextos/PedidosContext'
import { useCliente } from '../../contextos/ClienteContext'
import { nomeDoCanal, nomeDoStatus } from '../../dados/pedidos'
import Botao from '../comum/Botao'

const motivos = ['Cliente desistiu', 'Produto acabou', 'Pedido duplicado', 'Pedido errado']

function resumoItens(pedido) {
  return pedido.itens.map((item) => `${item.quantidade}x ${item.nome}`).join(', ')
}

export default function ListaRetiradas({ funcionario }) {
  const { pedidos, mudarStatus, cancelarPedido } = usePedidos()
  const { creditarPontos } = useCliente()
  const [cancelando, setCancelando] = useState(null)
  const [motivo, setMotivo] = useState(motivos[0])

  const daLoja = pedidos.filter((p) => p.lojaId === funcionario.lojaId)
  const prontos = daLoja.filter((p) => p.status === 'pronto')
  const emAndamento = daLoja.filter((p) => p.status === 'recebido' || p.status === 'em-preparo')
  const pendentes = daLoja.filter((p) => p.status === 'pagamento-pendente')

  function confirmarPagamento(pedido) {
    mudarStatus(pedido.numero, 'recebido')
    if (pedido.clienteEmail) creditarPontos(pedido)
  }

  function confirmarCancelamento(numero) {
    cancelarPedido(numero, motivo, funcionario.nome)
    setCancelando(null)
    setMotivo(motivos[0])
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {pendentes.length > 0 && (
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold">Pagamento pendente ({pendentes.length})</h2>
          <div className="space-y-2">
            {pendentes.map((p) => (
              <div key={p.numero} className="flex flex-wrap items-center justify-between gap-3 rounded-md border-2 border-amber-300 bg-white p-4">
                <div>
                  <p className="text-lg font-semibold">
                    #{p.numero} <span className="text-sm font-normal text-stone-500">{nomeDoCanal[p.canal]}</span>
                  </p>
                  <p className="text-sm text-stone-600">{resumoItens(p)}</p>
                </div>
                <div className="flex gap-2">
                  <Botao onClick={() => confirmarPagamento(p)}>Confirmar pagamento</Botao>
                  <Botao secundario onClick={() => cancelarPedido(p.numero, 'Pagamento não confirmado', funcionario.nome)}>
                    Cancelar pedido
                  </Botao>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold">Prontos para retirar ({prontos.length})</h2>
        <div className="space-y-2">
          {prontos.map((p) => (
            <div key={p.numero} className="flex items-center justify-between gap-4 rounded-md border-2 border-green-200 bg-white p-4">
              <div>
                <p className="text-lg font-semibold">
                  #{p.numero} <span className="text-sm font-normal text-stone-500">{nomeDoCanal[p.canal]}</span>
                </p>
                <p className="text-sm text-stone-600">{resumoItens(p)}</p>
              </div>
              <Botao onClick={() => mudarStatus(p.numero, 'retirado')}>
                <PackageCheck className="size-4" />
                Confirmar retirada
              </Botao>
            </div>
          ))}
          {prontos.length === 0 && <p className="text-sm text-stone-500">Nenhum pedido pronto agora.</p>}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Em andamento ({emAndamento.length})</h2>
        <div className="space-y-2">
          {emAndamento.map((p) => (
            <div key={p.numero} className="rounded-md border border-stone-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">
                    #{p.numero} <span className="text-sm font-normal text-stone-500">{nomeDoCanal[p.canal]}</span>
                  </p>
                  <p className="text-sm text-stone-600">{resumoItens(p)}</p>
                  <p className="text-xs text-stone-500">{nomeDoStatus[p.status]}</p>
                </div>
                {cancelando !== p.numero && (
                  <button
                    type="button"
                    onClick={() => setCancelando(p.numero)}
                    className="cursor-pointer text-sm font-medium text-red-700 hover:underline"
                  >
                    Cancelar
                  </button>
                )}
              </div>

              {cancelando === p.numero && (
                <div className="mt-3 space-y-2 rounded-md bg-red-50 p-3">
                  <label htmlFor={`motivo-${p.numero}`} className="block text-sm font-medium text-red-900">
                    Motivo do cancelamento
                  </label>
                  <select
                    id={`motivo-${p.numero}`}
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="h-10 w-full cursor-pointer rounded-md border border-red-200 bg-white px-2 text-sm"
                  >
                    {motivos.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => confirmarCancelamento(p.numero)}
                      className="h-9 cursor-pointer rounded-md bg-red-700 px-3 text-sm font-medium text-white hover:bg-red-800"
                    >
                      Confirmar cancelamento
                    </button>
                    <button type="button" onClick={() => setCancelando(null)} className="h-9 cursor-pointer px-3 text-sm text-stone-600">
                      Voltar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {emAndamento.length === 0 && <p className="text-sm text-stone-500">Nenhum pedido em andamento.</p>}
        </div>
      </div>
    </div>
  )
}
