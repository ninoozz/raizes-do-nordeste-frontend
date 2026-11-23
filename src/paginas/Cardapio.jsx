import { useState } from 'react'
import { Navigate } from 'react-router'
import { useCarrinho } from '../contextos/CarrinhoContext'
import { useLoja } from '../contextos/LojaContext'
import TituloPagina from '../componentes/layout/TituloPagina'
import AbasCategorias from '../componentes/cardapio/AbasCategorias'
import AvisoPromocao from '../componentes/cardapio/AvisoPromocao'
import ItemCardapio from '../componentes/cardapio/ItemCardapio'
import ResumoLateral from '../componentes/carrinho/ResumoLateral'
import BarraCarrinho from '../componentes/carrinho/BarraCarrinho'

export default function Cardapio() {
  const { loja, cardapio, quantidades, itens, quantidadeTotal, subtotal, adicionar, diminuir } = useCarrinho()
  const { saoJoao } = useLoja()
  const [categoria, setCategoria] = useState('tapiocas')

  if (!loja) return <Navigate to="/" replace />

  const aba = categoria === 'sao-joao' && !saoJoao ? 'tapiocas' : categoria
  const produtos = cardapio.filter((p) => (aba === 'sao-joao' ? p.saoJoao : p.categoria === aba))

  return (
    <>
      <div className="md:grid md:grid-cols-[1fr_300px] md:gap-8">
        <div className="min-w-0">
          <TituloPagina titulo={loja.nome} subtitulo={`${loja.endereco}, ${loja.cidade}`} voltarPara="/" />
          <AvisoPromocao />
          <div className="lg:grid lg:grid-cols-[130px_1fr] lg:items-start lg:gap-6">
            <AbasCategorias lateral ativa={aba} onChange={setCategoria} saoJoao={saoJoao} />
            <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
              {produtos.map((produto) => (
                <ItemCardapio
                  key={produto.id}
                  produto={produto}
                  quantidade={quantidades[produto.id] ?? 0}
                  mostrarSaoJoao={saoJoao}
                  onAdicionar={() => adicionar(produto.id)}
                  onDiminuir={() => diminuir(produto.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <ResumoLateral itens={itens} subtotal={subtotal} />
      </div>

      <BarraCarrinho quantidade={quantidadeTotal} total={subtotal} />
    </>
  )
}
