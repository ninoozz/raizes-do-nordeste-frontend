export default function HistoricoPontos({ historico }) {
  if (historico.length === 0) {
    return <p className="text-sm text-stone-500">Nenhuma movimentação ainda.</p>
  }

  return (
    <div className="divide-y divide-stone-200">
      {historico.map((linha) => (
        <div key={linha.id} className="flex items-center justify-between py-2.5 text-sm">
          <div>
            <p>{linha.descricao}</p>
            <p className="text-xs text-stone-500">{linha.data}</p>
          </div>
          <span className={`font-medium ${linha.pontos > 0 ? 'text-green-700' : 'text-red-700'}`}>
            {linha.pontos > 0 ? `+${linha.pontos}` : linha.pontos}
          </span>
        </div>
      ))}
    </div>
  )
}
