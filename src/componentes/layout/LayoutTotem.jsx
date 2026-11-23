import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { Hand } from 'lucide-react'
import { buscarLoja } from '../../dados/lojas'
import { useLoja } from '../../contextos/LojaContext'

const loja = buscarLoja('boa-viagem')
const AVISO_EM = 50
const REINICIA_EM = 60

export default function LayoutTotem() {
  const { cardapio } = useLoja()
  const navegar = useNavigate()
  const { pathname } = useLocation()
  const [consumo, setConsumo] = useState(null)
  const [celular, setCelular] = useState('')
  const [quantidades, setQuantidades] = useState({})
  const [parado, setParado] = useState(0)

  const produtos = cardapio(loja)
  const itens = produtos
    .filter((p) => !p.esgotado && quantidades[p.id] > 0)
    .map((p) => ({ ...p, quantidade: quantidades[p.id] }))
  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0)
  const emUso = pathname !== '/totem' || celular !== ''

  function limparPedido() {
    setQuantidades({})
    setCelular('')
    setConsumo(null)
  }

  function recomecar() {
    limparPedido()
    setParado(0)
    navegar('/totem')
  }

  useEffect(() => {
    if (!emUso) return
    const relogio = setInterval(() => setParado((s) => s + 1), 1000)
    return () => clearInterval(relogio)
  }, [emUso])

  useEffect(() => {
    if (parado >= REINICIA_EM) recomecar()
  }, [parado])

  return (
    <div onPointerDown={() => setParado(0)} onKeyDown={() => setParado(0)} className="min-h-screen bg-stone-100 text-stone-800">
      <div className="bg-orange-800 text-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <span className="text-xl font-bold">Raízes do Nordeste</span>
          <span className="text-orange-100">Loja {loja.nome}</span>
        </div>
      </div>

      <Outlet
        context={{
          loja,
          produtos,
          consumo,
          setConsumo,
          celular,
          setCelular,
          quantidades,
          itens,
          total,
          adicionar: (id) => setQuantidades({ ...quantidades, [id]: (quantidades[id] ?? 0) + 1 }),
          diminuir: (id) => setQuantidades({ ...quantidades, [id]: quantidades[id] - 1 }),
          limparPedido,
          recomecar,
        }}
      />

      {emUso && parado >= AVISO_EM && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-6">
          <div className="w-full max-w-md rounded-md bg-white p-8 text-center">
            <Hand className="mx-auto mb-4 size-14 text-orange-700" />
            <h2 className="mb-2 text-2xl font-semibold">Ainda está aí?</h2>
            <p className="mb-6 text-lg text-stone-600">
              A tela volta ao início em {REINICIA_EM - parado} segundos e o pedido é apagado.
            </p>
            <button type="button" className="h-14 w-full cursor-pointer rounded-md bg-orange-700 text-lg font-medium text-white hover:bg-orange-800">
              Continuar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
