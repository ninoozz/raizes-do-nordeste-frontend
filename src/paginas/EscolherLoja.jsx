import { useState } from 'react'
import { useNavigate } from 'react-router'
import { LocateFixed, Search } from 'lucide-react'
import { lojas, posicaoSimulada } from '../dados/lojas'
import { useCarrinho } from '../contextos/CarrinhoContext'
import TituloPagina from '../componentes/layout/TituloPagina'
import CartaoLoja from '../componentes/loja/CartaoLoja'

export default function EscolherLoja() {
  const { escolherLoja } = useCarrinho()
  const navegar = useNavigate()
  const [busca, setBusca] = useState('')
  const [posicao, setPosicao] = useState(null)
  const [aviso, setAviso] = useState('')

  let lista = lojas.filter((loja) => `${loja.cidade} ${loja.nome}`.toLowerCase().includes(busca.toLowerCase()))

  if (posicao) {
    const distancia = (loja) => (loja.lat - posicao.lat) ** 2 + (loja.lng - posicao.lng) ** 2
    lista = [...lista].sort((a, b) => distancia(a) - distancia(b))
  }

  function usarLocalizacao() {
    setPosicao(posicaoSimulada)
    setAviso('Localização simulada no Recife. Lojas mais perto primeiro.')
  }

  return (
    <div className="mx-auto max-w-xl">
      <TituloPagina titulo="Onde você vai pedir?" subtitulo="Escolha a loja para ver o cardápio." />

      <div className="relative mb-4">
        <Search className="absolute top-3 left-3 size-5 text-stone-400" />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar cidade ou bairro"
          aria-label="Buscar cidade ou bairro"
          className="h-11 w-full rounded-md border border-stone-300 bg-white pr-3 pl-10 text-sm outline-none focus:border-orange-600"
        />
      </div>

      <div className="space-y-3">
        {lista.map((loja) => (
          <CartaoLoja
            key={loja.id}
            loja={loja}
            onClick={() => {
              escolherLoja(loja)
              navegar('/cardapio')
            }}
          />
        ))}
        {lista.length === 0 && <p className="py-4 text-center text-sm text-stone-500">Nenhuma loja encontrada para "{busca}".</p>}
      </div>

      <button
        type="button"
        onClick={usarLocalizacao}
        className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-stone-300 bg-white text-sm font-medium hover:bg-stone-100"
      >
        <LocateFixed className="size-4" />
        Usar minha localização
      </button>
      {aviso && <p className="mt-2 text-center text-xs text-stone-500">{aviso}</p>}
    </div>
  )
}
