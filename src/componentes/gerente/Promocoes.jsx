import { useLoja } from '../../contextos/LojaContext'
import { usePedidos } from '../../contextos/PedidosContext'
import Interruptor from '../comum/Interruptor'

export default function Promocoes({ funcionario }) {
  const { cupons, alternarCupom, saoJoao, alternarSaoJoao } = useLoja()
  const { pedidos } = usePedidos()

  return (
    <div className="max-w-xl space-y-4">
      <div className="rounded-md border border-stone-200 bg-white p-4">
        <Interruptor
          ligado={saoJoao}
          onChange={() => alternarSaoJoao(funcionario.nome)}
          rotulo="Campanha de São João"
          descricao="Selo no cardápio e pontos em dobro."
        />
      </div>

      <div className="rounded-md border border-stone-200 bg-white p-4">
        <h2 className="mb-4 font-semibold">Cupons</h2>
        <div className="space-y-4">
          {cupons.map((cupom) => {
            const usos = pedidos.filter((p) => p.cupom === cupom.codigo).length
            return (
              <Interruptor
                key={cupom.codigo}
                ligado={cupom.ativo}
                onChange={() => alternarCupom(cupom.codigo, funcionario.nome)}
                rotulo={cupom.codigo}
                descricao={`${cupom.percentual}% de desconto, usado ${usos} ${usos === 1 ? 'vez' : 'vezes'} hoje`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
