import { createContext, useContext, useState } from 'react'
import { PONTOS_POR_REAL } from '../dados/regras'
import { useCliente } from './ClienteContext'
import { useLoja } from './LojaContext'

const CarrinhoContext = createContext(null)

export function CarrinhoProvider({ children }) {
  const { cliente, pontos } = useCliente()
  const { cardapio: cardapioDaLoja, buscarCupom } = useLoja()
  const [loja, setLoja] = useState(null)
  const [quantidades, setQuantidades] = useState({})
  const [usarPontos, setUsarPontos] = useState(false)
  const [cupom, setCupom] = useState(null)
  const [retirada, setRetirada] = useState('balcao')

  const cardapio = loja ? cardapioDaLoja(loja) : []
  const itens = cardapio
    .filter((p) => !p.esgotado && quantidades[p.id] > 0)
    .map((p) => ({ ...p, quantidade: quantidades[p.id] }))

  const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0)
  const subtotal = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0)

  const saldo = cliente ? pontos : 0
  const descontoMaximo = Math.min(Math.floor(saldo / PONTOS_POR_REAL), Math.floor(subtotal))
  const descontoPontos = usarPontos ? descontoMaximo : 0
  const descontoCupom = cupom ? Math.round(subtotal * cupom.percentual) / 100 : 0
  const total = subtotal - descontoPontos - descontoCupom

  function limpar() {
    setQuantidades({})
    setCupom(null)
    setUsarPontos(false)
  }

  function escolherLoja(nova) {
    if (nova.id !== loja?.id) limpar()
    setLoja(nova)
  }

  function adicionar(id) {
    setQuantidades({ ...quantidades, [id]: (quantidades[id] ?? 0) + 1 })
  }

  function diminuir(id) {
    setQuantidades({ ...quantidades, [id]: quantidades[id] - 1 })
  }

  function alternarPontos() {
    setUsarPontos(!usarPontos)
    setCupom(null)
  }

  function aplicarCupom(codigo) {
    const encontrado = buscarCupom(codigo)
    if (!encontrado) return 'Cupom inválido ou expirado.'
    setCupom(encontrado)
    setUsarPontos(false)
  }

  return (
    <CarrinhoContext.Provider
      value={{
        loja,
        cardapio,
        quantidades,
        itens,
        quantidadeTotal,
        subtotal,
        descontoMaximo,
        usarPontos,
        descontoPontos,
        cupom,
        descontoCupom,
        total,
        retirada,
        setRetirada,
        escolherLoja,
        adicionar,
        diminuir,
        alternarPontos,
        aplicarCupom,
        removerCupom: () => setCupom(null),
        limpar,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  return useContext(CarrinhoContext)
}
