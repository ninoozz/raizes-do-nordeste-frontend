import { maisVendidos, porCanal, vendasPorHora } from '../../dados/relatorios'
import { formatarMoeda } from '../../utils/formatar'

function Barra({ rotulo, valor, maximo, texto }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr_4.5rem] sm:grid-cols-[10rem_1fr_5.5rem] items-center gap-3 text-sm" title={`${rotulo}: ${texto}`}>
      <span className="truncate text-stone-600">{rotulo}</span>
      <div className="h-4">
        <div className="h-full rounded-r bg-orange-600" style={{ width: `${(valor / maximo) * 100}%` }} />
      </div>
      <span className="text-right text-stone-700">{texto}</span>
    </div>
  )
}

export default function Relatorios() {
  const maiorHora = Math.max(...vendasPorHora.map((h) => h.valor))
  const totalCanais = porCanal.reduce((soma, c) => soma + c.pedidos, 0)

  return (
    <div className="space-y-4">
      <p className="rounded-md bg-yellow-100 p-3 text-sm text-yellow-900">
        Os relatórios mostram só dados agrupados. Não aparece nome, CPF nem celular de cliente.
      </p>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-md border border-stone-200 bg-white p-5">
          <h2 className="mb-4 font-semibold">Vendas por hora</h2>
          <div className="space-y-2">
            {vendasPorHora.map((h) => (
              <Barra key={h.hora} rotulo={h.hora} valor={h.valor} maximo={maiorHora} texto={formatarMoeda(h.valor)} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-md border border-stone-200 bg-white p-5">
            <h2 className="mb-4 font-semibold">Pedidos por canal</h2>
            <div className="space-y-2">
              {porCanal.map((c) => (
                <Barra
                  key={c.canal}
                  rotulo={c.canal}
                  valor={c.pedidos}
                  maximo={totalCanais}
                  texto={`${Math.round((c.pedidos / totalCanais) * 100)}%`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-5">
            <h2 className="mb-4 font-semibold">Mais vendidos hoje</h2>
            <div className="space-y-2">
              {maisVendidos.map((p) => (
                <Barra key={p.nome} rotulo={p.nome} valor={p.quantidade} maximo={maisVendidos[0].quantidade} texto={`${p.quantidade} un.`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
