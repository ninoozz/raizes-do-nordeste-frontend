import { Check } from 'lucide-react'
import { formatarHora } from '../../utils/formatar'

const etapas = [
  { status: 'recebido', titulo: 'Recebido', texto: 'A loja recebeu seu pedido.' },
  { status: 'em-preparo', titulo: 'Em preparo', texto: 'A cozinha está preparando.' },
  { status: 'pronto', titulo: 'Pronto', texto: 'Já pode retirar.' },
  { status: 'retirado', titulo: 'Retirado', texto: 'Pedido entregue.' },
]

export default function LinhaDoTempo({ pedido }) {
  const atual = etapas.findIndex((etapa) => etapa.status === pedido.status)

  return (
    <div>
      {etapas.map((etapa, i) => {
        const feita = i <= atual
        const ultima = i === etapas.length - 1
        const horario = pedido.horarios[etapa.status]

        return (
          <div key={etapa.status} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`grid size-8 place-items-center rounded-full border-2 ${feita ? 'border-orange-700 bg-orange-700 text-white' : 'border-stone-300 bg-white'}`}
              >
                {feita && <Check className="size-4" />}
              </span>
              {!ultima && <span className={`w-0.5 flex-1 ${i < atual ? 'bg-orange-700' : 'bg-stone-300'}`} />}
            </div>
            <div className={`flex flex-1 justify-between gap-2 ${ultima ? '' : 'pb-6'}`}>
              <div>
                <p className={`font-medium ${feita ? '' : 'text-stone-400'}`}>{etapa.titulo}</p>
                <p className="text-sm text-stone-500">{etapa.texto}</p>
              </div>
              {horario && <span className="text-sm text-stone-500">{formatarHora(horario)}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
