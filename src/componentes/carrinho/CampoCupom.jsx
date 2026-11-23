import { useState } from 'react'
import { TicketPercent, X } from 'lucide-react'

export default function CampoCupom({ cupom, onAplicar, onRemover, grande = false }) {
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')

  const altura = grande ? 'h-14 text-xl' : 'h-10 text-sm'

  function aplicar(e) {
    e.preventDefault()
    if (!codigo.trim()) return

    const mensagemDeErro = onAplicar(codigo)
    if (mensagemDeErro) {
      setErro(mensagemDeErro)
    } else {
      setErro('')
      setCodigo('')
    }
  }

  if (cupom) {
    return (
      <div className={`flex items-center justify-between rounded-md bg-green-50 px-3 text-green-800 ${grande ? 'py-4 text-lg' : 'py-2 text-sm'}`}>
        <span className="flex items-center gap-2">
          <TicketPercent className={grande ? 'size-6' : 'size-4'} />
          Cupom {cupom.codigo} ({cupom.percentual}% de desconto)
        </span>
        <button type="button" onClick={onRemover} aria-label="Remover cupom" className="cursor-pointer hover:text-green-950">
          <X className={grande ? 'size-6' : 'size-4'} />
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={aplicar}>
      <label htmlFor="cupom" className={`block font-medium ${grande ? 'mb-2 text-xl' : 'mb-1 text-sm'}`}>
        Cupom de desconto {grande && <span className="font-normal text-stone-500">(opcional)</span>}
      </label>
      <div className="flex gap-2">
        <input
          id="cupom"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Digite o código"
          className={`${altura} min-w-0 flex-1 rounded-md border bg-white px-3 uppercase outline-none placeholder:normal-case focus:border-orange-600 ${erro ? 'border-red-400' : 'border-stone-300'}`}
        />
        <button
          type="submit"
          className={`${altura} cursor-pointer rounded-md border border-stone-300 bg-white font-medium hover:bg-stone-100 ${grande ? 'px-6' : 'px-4'}`}
        >
          Aplicar
        </button>
      </div>
      {erro && <p className={`mt-1 text-red-700 ${grande ? 'text-lg' : 'text-sm'}`}>{erro}</p>}
    </form>
  )
}
