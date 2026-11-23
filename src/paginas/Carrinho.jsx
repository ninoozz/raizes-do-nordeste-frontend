import { Navigate } from 'react-router'
import { ShoppingBag } from 'lucide-react'
import { useCarrinho } from '../contextos/CarrinhoContext'
import { useCliente } from '../contextos/ClienteContext'
import { PONTOS_POR_REAL } from '../dados/regras'
import { formatarMoeda } from '../utils/formatar'
import TituloPagina from '../componentes/layout/TituloPagina'
import ItemCarrinho from '../componentes/carrinho/ItemCarrinho'
import CampoCupom from '../componentes/carrinho/CampoCupom'
import EscolhaRetirada from '../componentes/carrinho/EscolhaRetirada'
import ResumoValores from '../componentes/carrinho/ResumoValores'
import Interruptor from '../componentes/comum/Interruptor'
import Botao from '../componentes/comum/Botao'

export default function Carrinho() {
  const carrinho = useCarrinho()
  const { cliente } = useCliente()
  const { loja, itens, descontoMaximo } = carrinho

  if (!loja) return <Navigate to="/" replace />

  if (itens.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-6 text-center">
        <ShoppingBag className="mx-auto mb-3 size-10 text-stone-300" />
        <h1 className="mb-6 text-xl font-semibold">Seu carrinho está vazio</h1>
        <Botao para="/cardapio">Ver cardápio</Botao>
      </div>
    )
  }

  let textoPontos = 'Entre na sua conta para usar seus pontos'
  if (cliente) {
    textoPontos = `${descontoMaximo * PONTOS_POR_REAL} pontos valem ${formatarMoeda(descontoMaximo)} de desconto`
  }

  return (
    <div className="mx-auto max-w-xl md:max-w-none">
      <TituloPagina titulo="Meu pedido" subtitulo={`Retirada na loja ${loja.nome}`} voltarPara="/cardapio" />

      <div className="space-y-4 md:grid md:grid-cols-[1fr_360px] md:items-start md:gap-8 md:space-y-0">
        <div className="space-y-4">
          <div className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white px-4">
            {itens.map((item) => (
              <ItemCarrinho key={item.id} item={item} onMais={() => carrinho.adicionar(item.id)} onMenos={() => carrinho.diminuir(item.id)} />
            ))}
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-4">
            <EscolhaRetirada retirada={carrinho.retirada} onChange={carrinho.setRetirada} />
          </div>
        </div>

        <div className="space-y-4 md:sticky md:top-24">
          <div className="space-y-4 rounded-md border border-stone-200 bg-white p-4">
            <div>
              <h2 className="font-semibold">Desconto</h2>
              <p className="text-xs text-stone-500">Use pontos ou cupom, um de cada vez.</p>
            </div>
            <Interruptor
              ligado={carrinho.usarPontos}
              onChange={carrinho.alternarPontos}
              rotulo="Usar meus pontos"
              descricao={textoPontos}
              desabilitado={descontoMaximo === 0}
            />
            <CampoCupom cupom={carrinho.cupom} onAplicar={carrinho.aplicarCupom} onRemover={carrinho.removerCupom} />
          </div>

          <div className="space-y-4 rounded-md border border-stone-200 bg-white p-4">
            <ResumoValores
              subtotal={carrinho.subtotal}
              descontoPontos={carrinho.descontoPontos}
              descontoCupom={carrinho.descontoCupom}
              total={carrinho.total}
            />
            <Botao para="/identificacao" grande className="w-full">
              Continuar
            </Botao>
          </div>
        </div>
      </div>
    </div>
  )
}
