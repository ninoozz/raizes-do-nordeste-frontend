import { createContext, useContext, useState } from 'react'
import { produtos } from '../dados/produtos'
import { cupons as cuponsIniciais } from '../dados/cupons'

const LojaContext = createContext(null)

export function LojaProvider({ children }) {
  const [esgotados, setEsgotados] = useState({ 'boa-viagem': ['bolo-macaxeira'] })
  const [cupons, setCupons] = useState(cuponsIniciais)
  const [saoJoao, setSaoJoao] = useState(true)
  const [alteracoes, setAlteracoes] = useState([
    { quando: Date.now() - 3 * 60 * 60 * 1000, tipo: 'Alteração', quem: 'Marcos Vieira', descricao: 'Bolo de macaxeira marcado como esgotado' },
  ])

  function registrar(quem, descricao, tipo = 'Alteração') {
    setAlteracoes((lista) => [{ quando: Date.now(), tipo, quem, descricao }, ...lista])
  }

  function cardapio(loja) {
    const semEstoque = esgotados[loja.id] ?? []
    return produtos
      .filter((p) => loja.cozinha === 'completa' || !p.somenteCozinhaCompleta)
      .map((p) => ({ ...p, esgotado: semEstoque.includes(p.id) }))
      .sort((a, b) => a.esgotado - b.esgotado)
  }

  function alternarProduto(loja, produto, quem) {
    const lista = esgotados[loja.id] ?? []
    const estavaEsgotado = lista.includes(produto.id)

    setEsgotados({
      ...esgotados,
      [loja.id]: estavaEsgotado ? lista.filter((id) => id !== produto.id) : [...lista, produto.id],
    })
    registrar(quem, estavaEsgotado ? `${produto.nome} voltou ao cardápio` : `${produto.nome} marcado como esgotado`)
  }

  function buscarCupom(codigo) {
    return cupons.find((c) => c.ativo && c.codigo === codigo.trim().toUpperCase())
  }

  function alternarCupom(codigo, quem) {
    const cupom = cupons.find((c) => c.codigo === codigo)
    setCupons(cupons.map((c) => (c.codigo === codigo ? { ...c, ativo: !c.ativo } : c)))
    registrar(quem, `Cupom ${codigo} ${cupom.ativo ? 'desativado' : 'ativado'}`)
  }

  function alternarSaoJoao(quem) {
    setSaoJoao(!saoJoao)
    registrar(quem, `Campanha de São João ${saoJoao ? 'encerrada' : 'ativada'}`)
  }

  return (
    <LojaContext.Provider
      value={{ cardapio, alternarProduto, cupons, buscarCupom, alternarCupom, saoJoao, alternarSaoJoao, alteracoes, registrar }}
    >
      {children}
    </LojaContext.Provider>
  )
}

export function useLoja() {
  return useContext(LojaContext)
}
