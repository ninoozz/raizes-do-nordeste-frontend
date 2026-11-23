import { SearchX } from 'lucide-react'
import Botao from '../componentes/comum/Botao'

export default function NaoEncontrada() {
  return (
    <div className="mx-auto max-w-xl py-10 text-center">
      <SearchX className="mx-auto mb-3 size-10 text-stone-300" />
      <h1 className="mb-6 text-xl font-semibold">Página não encontrada</h1>
      <Botao para="/" secundario>
        Voltar ao início
      </Botao>
    </div>
  )
}
