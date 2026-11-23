import { Award, Flame } from 'lucide-react'
import { useCliente } from '../contextos/ClienteContext'
import { useLoja } from '../contextos/LojaContext'
import { PONTOS_POR_REAL } from '../dados/regras'
import { formatarMoeda } from '../utils/formatar'
import TituloPagina from '../componentes/layout/TituloPagina'
import Botao from '../componentes/comum/Botao'
import HistoricoPontos from '../componentes/pontos/HistoricoPontos'

const META = 400

export default function MeusPontos() {
  const { cliente, pontos, historico } = useCliente()
  const { saoJoao } = useLoja()

  if (!cliente) {
    return (
      <div className="mx-auto max-w-md py-6 text-center">
        <Award className="mx-auto mb-3 size-10 text-stone-300" />
        <h1 className="mb-6 text-xl font-semibold">Entre para ver seus pontos</h1>
        <Botao para="/identificacao">Entrar ou criar conta</Botao>
      </div>
    )
  }

  const proximaMeta = (Math.floor(pontos / META) + 1) * META

  return (
    <div className="mx-auto max-w-md">
      <TituloPagina titulo="Meus pontos" subtitulo="A cada R$ 1 gasto você ganha 1 ponto." voltarPara="/" />

      <div className="space-y-4">
        <div className="rounded-md border border-stone-200 bg-white p-5">
          <p className="text-center text-4xl font-semibold text-orange-800">{pontos}</p>
          <p className="mb-4 text-center text-sm text-stone-500">
            pontos, que valem {formatarMoeda(Math.floor(pontos / PONTOS_POR_REAL))} de desconto
          </p>
          <div className="h-2.5 overflow-hidden rounded-full bg-stone-200">
            <div className="h-full bg-orange-700" style={{ width: `${((pontos % META) / META) * 100}%` }} />
          </div>
          <p className="mt-2 text-xs text-stone-500">
            Faltam {proximaMeta - pontos} pontos para {formatarMoeda(proximaMeta / PONTOS_POR_REAL)} de desconto
          </p>
        </div>

        {saoJoao && (
          <div className="flex gap-3 rounded-md bg-yellow-100 p-4 text-sm text-yellow-900">
            <Flame className="size-5 shrink-0" />
            <p>
              <span className="font-medium">São João:</span> pontos em dobro na canjica e na pamonha até 30/06.
            </p>
          </div>
        )}

        <div className="rounded-md border border-stone-200 bg-white p-4">
          <h2 className="mb-1 font-semibold">Histórico</h2>
          <HistoricoPontos historico={historico} />
        </div>

        <Botao para="/" grande className="w-full">
          Trocar pontos
        </Botao>
      </div>
    </div>
  )
}
