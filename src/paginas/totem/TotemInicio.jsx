import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import { Coffee, Sandwich, ShieldCheck, ShoppingBag, Smartphone, UtensilsCrossed, Wheat } from 'lucide-react'

export default function TotemInicio() {
  const { setConsumo, celular, setCelular } = useOutletContext()
  const navegar = useNavigate()
  const [digitandoCelular, setDigitandoCelular] = useState(false)
  const [numero, setNumero] = useState('')
  const [saibaMais, setSaibaMais] = useState(false)

  const digitos = numero.replace(/\D/g, '')

  function comecar(tipo) {
    setConsumo(tipo)
    navegar('/totem/cardapio')
  }

  function confirmarCelular(e) {
    e.preventDefault()
    if (digitos.length < 10) return
    setCelular(digitos)
    setDigitandoCelular(false)
    setNumero('')
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-10 flex h-72 flex-col items-center justify-center gap-4 rounded-md bg-orange-700 text-white">
        <div className="flex gap-6 text-orange-200">
          <Sandwich className="size-12" />
          <Wheat className="size-12" />
          <Coffee className="size-12" />
        </div>
        <p className="text-2xl font-semibold">Tapioca, cuscuz e café coado</p>
        <p className="text-orange-100">feitos na hora</p>
      </div>

      <h1 className="mb-6 text-center text-3xl font-semibold">Toque para começar</h1>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => comecar('aqui')}
          className="flex h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border-2 border-stone-300 bg-white text-2xl font-medium hover:border-orange-600"
        >
          <UtensilsCrossed className="size-10 text-orange-700" />
          Comer aqui
        </button>
        <button
          type="button"
          onClick={() => comecar('levar')}
          className="flex h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border-2 border-stone-300 bg-white text-2xl font-medium hover:border-orange-600"
        >
          <ShoppingBag className="size-10 text-orange-700" />
          Levar
        </button>
      </div>

      {celular && !digitandoCelular && (
        <div className="mb-6 flex items-center justify-between rounded-md bg-white p-4 text-lg">
          <span>Pontos vão para o celular com final {celular.slice(-4)}</span>
          <button type="button" onClick={() => setCelular('')} className="cursor-pointer font-medium text-orange-800">
            Remover
          </button>
        </div>
      )}

      {!celular && !digitandoCelular && (
        <button
          type="button"
          onClick={() => setDigitandoCelular(true)}
          className="mb-6 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-stone-300 bg-white text-lg hover:bg-stone-50"
        >
          <Smartphone className="size-5" />
          Entrar com celular (opcional)
        </button>
      )}

      {digitandoCelular && (
        <form onSubmit={confirmarCelular} className="mb-6 rounded-md bg-white p-4">
          <label htmlFor="celular-totem" className="mb-2 block text-lg font-medium">
            Seu celular com DDD
          </label>
          <div className="flex gap-2">
            <input
              id="celular-totem"
              inputMode="numeric"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="(81) 99999-0000"
              className="h-14 min-w-0 flex-1 rounded-md border border-stone-300 px-4 text-xl outline-none focus:border-orange-600"
            />
            <button
              type="submit"
              disabled={digitos.length < 10}
              className="h-14 cursor-pointer rounded-md bg-orange-700 px-6 text-lg font-medium text-white disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              Pronto
            </button>
          </div>
          <button type="button" onClick={() => setDigitandoCelular(false)} className="mt-3 cursor-pointer text-stone-500">
            Agora não
          </button>
        </form>
      )}

      <div className="rounded-md bg-yellow-100 p-5 text-yellow-900">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 size-6 shrink-0" />
          <div>
            <p>
              Este totem não guarda seus dados. CPF na nota só serve para a nota fiscal. A tela reinicia depois de 60 s sem uso.
            </p>
            {saibaMais && (
              <p className="mt-2">
                O celular é opcional e só serve para somar pontos. Quando o pedido termina, tudo o que você digitou aqui é apagado.
              </p>
            )}
            <button type="button" onClick={() => setSaibaMais(!saibaMais)} className="mt-2 cursor-pointer font-medium underline">
              {saibaMais ? 'Mostrar menos' : 'Saiba mais'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
