import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import Botao from '../comum/Botao'

export default function ExcluirConta({ onExcluir }) {
  const [confirmando, setConfirmando] = useState(false)

  if (!confirmando) {
    return (
      <button
        type="button"
        onClick={() => setConfirmando(true)}
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-red-300 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        <Trash2 className="size-4" />
        Excluir minha conta
      </button>
    )
  }

  return (
    <div className="space-y-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900">
      <p>Seus dados pessoais e seus pontos serão apagados. Só guardamos as notas fiscais, porque a lei obriga. Quer continuar?</p>
      <div className="grid grid-cols-2 gap-2">
        <Botao secundario onClick={() => setConfirmando(false)}>
          Cancelar
        </Botao>
        <button type="button" onClick={onExcluir} className="h-10 cursor-pointer rounded-md bg-red-700 font-medium text-white hover:bg-red-800">
          Excluir
        </button>
      </div>
    </div>
  )
}
