import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { QrCode, ShieldCheck } from 'lucide-react'
import { useCarrinho } from '../contextos/CarrinhoContext'
import { useCliente } from '../contextos/ClienteContext'
import { usePedidos } from '../contextos/PedidosContext'
import { useLoja } from '../contextos/LojaContext'
import { PONTOS_POR_REAL } from '../dados/regras'
import { solicitarPagamento, consultarPagamento } from '../servicos/pagamentoExterno'
import { formatarMoeda } from '../utils/formatar'
import TituloPagina from '../componentes/layout/TituloPagina'
import Botao from '../componentes/comum/Botao'
import ResumoPedido from '../componentes/pagamento/ResumoPedido'
import OpcoesPagamento from '../componentes/pagamento/OpcoesPagamento'
import SimuladorPagamento from '../componentes/pagamento/SimuladorPagamento'
import RetornoPagamento from '../componentes/pagamento/RetornoPagamento'

export default function Pagamento() {
  const carrinho = useCarrinho()
  const { cliente, creditarPontos } = useCliente()
  const { criarPedido, mudarStatus, cancelarPedido, buscarPedido } = usePedidos()
  const { saoJoao } = useLoja()
  const navegar = useNavigate()
  const [forma, setForma] = useState('pix')
  const [cenario, setCenario] = useState('aprovar')
  const [etapa, setEtapa] = useState('escolha')
  const [pedido, setPedido] = useState(null)
  const [cancelando, setCancelando] = useState(false)

  if (!pedido) {
    if (!carrinho.loja) return <Navigate to="/" replace />
    if (carrinho.itens.length === 0) return <Navigate to="/cardapio" replace />
    if (!cliente) return <Navigate to="/identificacao" replace />
  }

  const resumo = pedido ?? {
    itens: carrinho.itens,
    subtotal: carrinho.subtotal,
    desconto: carrinho.descontoPontos + carrinho.descontoCupom,
    total: carrinho.total,
    retirada: carrinho.retirada,
  }

  async function pagar() {
    let p = pedido
    if (!p) {
      let pontosEmDobro = 0
      if (saoJoao) {
        const valorSaoJoao = carrinho.itens.filter((i) => i.saoJoao).reduce((soma, i) => soma + i.preco * i.quantidade, 0)
        pontosEmDobro = Math.floor(valorSaoJoao)
      }

      p = criarPedido({
        ...resumo,
        canal: 'app',
        lojaId: carrinho.loja.id,
        clienteEmail: cliente.email,
        cupom: carrinho.cupom?.codigo,
        pontosUsados: carrinho.descontoPontos * PONTOS_POR_REAL,
        pontosEmDobro,
        pontosGanhos: Math.floor(resumo.total) + pontosEmDobro,
        forma,
        status: 'aguardando-pagamento',
      })
      setPedido(p)
    }

    setEtapa('aguardando')
    const resposta = await solicitarPagamento(cenario)
    console.log('resposta do pagamento', resposta)

    if (resposta === 'aprovado') {
      mudarStatus(p.numero, 'recebido')
      creditarPontos(p)
      carrinho.limpar()
      setEtapa('aprovado')
    } else if (resposta === 'recusado') {
      mudarStatus(p.numero, 'pagamento-recusado')
      setEtapa('recusado')
    } else {
      mudarStatus(p.numero, 'pagamento-pendente')
      carrinho.limpar()
      setEtapa('sem-resposta')
    }
  }

  async function verificar() {
    setEtapa('verificando')
    await consultarPagamento()
    if (buscarPedido(pedido.numero).status === 'pagamento-pendente') {
      mudarStatus(pedido.numero, 'recebido')
      creditarPontos(pedido)
    }
    setEtapa('aprovado')
  }

  function cancelar() {
    if (pedido) cancelarPedido(pedido.numero, 'Cliente desistiu', 'Cliente (app)')
    carrinho.limpar()
    navegar('/cardapio')
  }

  return (
    <div>
      <TituloPagina titulo="Pagamento" voltarPara={etapa === 'escolha' && !pedido ? '/carrinho' : undefined} />

      <div className="space-y-4 md:grid md:grid-cols-[1fr_400px] md:items-start md:gap-8 md:space-y-0">
        <ResumoPedido pedido={resumo} nomeDaLoja={carrinho.loja?.nome ?? ''} />

        <div className="space-y-4 rounded-md border border-stone-200 bg-white p-5">
          {etapa !== 'escolha' && (
            <RetornoPagamento
              etapa={etapa}
              numero={pedido?.numero}
              onTentarDeNovo={() => setEtapa('escolha')}
              onTrocarForma={() => {
                setForma(forma === 'pix' ? 'cartao' : 'pix')
                setEtapa('escolha')
              }}
              onVerificar={verificar}
            />
          )}

          {etapa === 'escolha' && (
            <>
              <h2 className="font-semibold">Forma de pagamento</h2>
              <OpcoesPagamento forma={forma} onChange={setForma} />

              {forma === 'pix' && (
                <div className="flex flex-col items-center gap-2 rounded-md bg-stone-50 py-6">
                  <QrCode className="size-28 text-stone-800" strokeWidth={1.25} />
                  <p className="text-xs text-stone-500">O QR Code expira em 10 minutos</p>
                </div>
              )}
              {forma === 'cartao' && (
                <div className="flex gap-2 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  Os dados do cartão são digitados na tela do parceiro de pagamento. A Raízes do Nordeste não vê nem guarda esses dados.
                </div>
              )}

              <SimuladorPagamento cenario={cenario} onChange={setCenario} />

              <Botao grande className="w-full" onClick={pagar}>
                Pagar {formatarMoeda(resumo.total)}
              </Botao>

              {!cancelando && (
                <button
                  type="button"
                  onClick={() => setCancelando(true)}
                  className="h-9 w-full cursor-pointer text-sm font-medium text-stone-600 hover:text-red-700"
                >
                  Cancelar pedido
                </button>
              )}
              {cancelando && (
                <div className="space-y-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900">
                  <p>O pedido vai ser cancelado e o carrinho esvaziado. Quer cancelar mesmo?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Botao secundario onClick={() => setCancelando(false)}>
                      Voltar
                    </Botao>
                    <button type="button" onClick={cancelar} className="h-10 cursor-pointer rounded-md bg-red-700 font-medium text-white hover:bg-red-800">
                      Sim, cancelar
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
