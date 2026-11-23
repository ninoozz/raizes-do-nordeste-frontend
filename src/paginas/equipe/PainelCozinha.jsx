import { useEffect, useState } from 'react'
import { usePedidos } from '../../contextos/PedidosContext'
import { useEquipe } from '../../contextos/EquipeContext'
import CartaoCozinha from '../../componentes/cozinha/CartaoCozinha'

const colunas = [
  { status: 'recebido', titulo: 'Recebidos', botao: 'Iniciar', proximo: 'em-preparo' },
  { status: 'em-preparo', titulo: 'Em preparo', botao: 'Pronto', proximo: 'pronto' },
  { status: 'pronto', titulo: 'Prontos' },
]

export default function PainelCozinha() {
  const { pedidos, mudarStatus } = usePedidos()
  const { funcionario } = useEquipe()
  const [, setRelogio] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => setRelogio((n) => n + 1), 30000)
    return () => clearInterval(intervalo)
  }, [])

  const daLoja = pedidos.filter((p) => p.lojaId === funcionario.lojaId)

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Painel da cozinha</h1>

      <div className="grid gap-4 lg:grid-cols-3">
        {colunas.map((coluna) => {
          const lista = daLoja.filter((p) => p.status === coluna.status)

          return (
            <div key={coluna.status} className="rounded-md border border-stone-300 bg-white p-4 lg:min-h-[70vh]">
              <h2 className="mb-3 text-lg font-semibold">
                {coluna.titulo} ({lista.length})
              </h2>
              <div className="space-y-3">
                {lista.map((pedido) => (
                  <CartaoCozinha
                    key={pedido.numero}
                    pedido={pedido}
                    botao={coluna.botao}
                    onAvancar={() => mudarStatus(pedido.numero, coluna.proximo)}
                  />
                ))}
                {lista.length === 0 && <p className="text-sm text-stone-400">Nenhum pedido aqui.</p>}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
