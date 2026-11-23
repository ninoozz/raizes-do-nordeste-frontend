export default function Interruptor({ ligado, onChange, rotulo, descricao, desabilitado = false, ...props }) {
  const chave = (
    <button
      type="button"
      role="switch"
      aria-checked={ligado}
      disabled={desabilitado}
      onClick={() => onChange(!ligado)}
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed ${ligado ? 'bg-orange-700' : 'bg-stone-300'}`}
      {...props}
    >
      <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${ligado ? 'translate-x-5' : ''}`} />
    </button>
  )

  if (!rotulo) return chave

  return (
    <label className={`flex items-center justify-between gap-4 ${desabilitado ? 'opacity-50' : 'cursor-pointer'}`}>
      <span>
        <span className="block text-sm font-medium text-stone-800">{rotulo}</span>
        {descricao && <span className="block text-xs text-stone-500">{descricao}</span>}
      </span>
      {chave}
    </label>
  )
}
