import { useState } from 'react'
import { Cookie } from 'lucide-react'
import Botao from '../comum/Botao'

export default function BannerCookies() {
  const [escolha, setEscolha] = useState(localStorage.getItem('raizes-cookies'))

  if (escolha) return null

  function decidir(valor) {
    localStorage.setItem('raizes-cookies', valor)
    setEscolha(valor)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="flex gap-2 text-sm text-stone-700">
          <Cookie className="mt-0.5 size-4 shrink-0 text-orange-700" />
          Usamos cookies essenciais para o site funcionar. Cookies de análise só com a sua permissão.
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2">
          <Botao secundario onClick={() => decidir('essenciais')}>
            Só essenciais
          </Botao>
          <Botao secundario onClick={() => decidir('todos')}>
            Aceitar todos
          </Botao>
        </div>
      </div>
    </div>
  )
}
