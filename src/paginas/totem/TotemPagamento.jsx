import { useEffect, useState } from 'react'
import { Link, Navigate, useOutletContext } from 'react-router'
import { CircleCheck, CircleX, CreditCard, LoaderCircle, QrCode, TriangleAlert } from 'lucide-react'
import { usePedidos } from '../../contextos/PedidosContext'
import { useLoja } from '../../contextos/LojaContext'
import { solicitarPagamento } from '../../servicos/pagamentoExterno'
import { formatarMoeda } from '../../utils/formatar'
import ControleQuantidade from '../../componentes/comum/ControleQuantidade'
import CampoCupom from '../../componentes/carrinho/CampoCupom'
import SimuladorPagamento from '../../componentes/pagamento/SimuladorPagamento'

export default function TotemPagamento() {
  const { loja, consumo, celular, itens, total, adicionar, diminuir, limparPedido, recomecar } = useOutletContext()
  const { criarPedido, mudarStatus } = usePedidos()
  const { buscarCupom } = useLoja()
  const [forma, setForma] = useState('cartao')
  const [cpf, setCpf] = useState('')
  const [cenario, setCenario] = useState('aprovar')
  const [etapa, setEtapa] = useState('revisao')
  const [pedido, setPedido] = useState(null)
  const [finalCelular, setFinalCelular] = useState('')
  const [cupom, setCupom] = useState(null)

  const desconto = cupom ? Math.round(total * cupom.percentual) / 100 : 0
  const totalComDesconto = total - desconto

  function aplicarCupom(codigo) {
    const encontrado = buscarCupom(codigo)
    if (!encontrado) return 'Cupom inválido ou expirado.'
    setCupom(encontrado)
  }

  useEffect(() => {
    if (etapa !== 'aprovado') return
    const volta = setTimeout(recomecar, 15000)
    return () => clearTimeout(volta)
  }, [etapa])

  if (!pedido) {
    if (!consumo) return <Navigate to="/totem" replace />
    if (itens.length === 0) return <Navigate to="/totem/cardapio" replace />
  }

  async function pagar() {
    let p = pedido
    if (!p) {
      p = criarPedido({
        canal: 'totem',
        lojaId: loja.id,
        consumo,
        itens,
        subtotal: total,
        desconto,
        cupom: cupom?.codigo,
        total: totalComDesconto,
        forma,
        notaComCpf: cpf.replace(/\D/g, '').length === 11,
        status: 'aguardando-pagamento',
      })
      setPedido(p)
    }

    setEtapa('aguardando')
    const resposta = await solicitarPagamento(cenario)

    if (resposta === 'aprovado') {
      mudarStatus(p.numero, 'recebido')
      setFinalCelular(celular.slice(-4))
      limparPedido()
      setCpf('')
      setEtapa('aprovado')
    } else if (resposta === 'recusado') {
      mudarStatus(p.numero, 'pagamento-recusado')
      setEtapa('recusado')
    } else {
      mudarStatus(p.numero, 'pagamento-pendente')
      setEtapa('sem-resposta')
    }
  }

  if (etapa === 'aguardando') {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        {forma === 'pix' ? (
          <>
            <QrCode className="mx-auto mb-4 size-48" strokeWidth={1} />
            <p className="mb-6 text-2xl">Escaneie o QR Code com o app do seu banco</p>
          </>
        ) : (
          <>
            <CreditCard className="mx-auto mb-4 size-24 text-orange-700" />
            <p className="mb-6 text-2xl">Siga as instruções na maquininha</p>
          </>
        )}
        <p className="flex items-center justify-center gap-2 text-lg text-stone-500">
          <LoaderCircle className="size-5 animate-spin" />
          Aguardando o pagamento de {formatarMoeda(pedido?.total ?? totalComDesconto)}
        </p>
      </div>
    )
  }

  if (etapa === 'aprovado') {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <CircleCheck className="mx-auto mb-4 size-20 text-green-700" />
        <p className="text-2xl">Pagamento aprovado</p>
        <p className="my-6 text-7xl font-bold text-orange-800">#{pedido.numero}</p>
        <p className="mb-2 text-xl">
          {pedido.consumo === 'aqui'
            ? 'Quando o número aparecer no painel, é só pegar no balcão.'
            : 'Quando o número aparecer no painel, retire no balcão para levar.'}
        </p>
        {finalCelular && <p className="mb-2 text-lg text-stone-600">Os pontos vão para o celular com final {finalCelular}.</p>}
        <p className="mb-8 text-stone-500">Seus dados já foram apagados deste totem. A tela volta ao início em alguns segundos.</p>
        <button type="button" onClick={recomecar} className="h-16 w-full cursor-pointer rounded-md bg-orange-700 text-xl font-medium text-white">
          Fazer outro pedido
        </button>
      </div>
    )
  }

  if (etapa === 'recusado') {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <CircleX className="mx-auto mb-4 size-20 text-red-700" />
        <p className="mb-2 text-3xl font-semibold">Pagamento não aprovado</p>
        <p className="mb-8 text-xl text-stone-600">Tente de novo ou escolha outra forma.</p>
        <button
          type="button"
          onClick={() => {
            setPedido(null)
            setEtapa('revisao')
          }}
          className="mb-3 h-16 w-full cursor-pointer rounded-md bg-orange-700 text-xl font-medium text-white"
        >
          Tentar de novo
        </button>
        <button type="button" onClick={recomecar} className="h-16 w-full cursor-pointer rounded-md border border-stone-300 bg-white text-xl">
          Cancelar pedido
        </button>
      </div>
    )
  }

  if (etapa === 'sem-resposta') {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <TriangleAlert className="mx-auto mb-4 size-20 text-amber-600" />
        <p className="mb-2 text-3xl font-semibold">Não conseguimos confirmar o pagamento</p>
        <p className="mb-8 text-xl text-stone-600">
          Procure o atendente no balcão com o número <span className="font-semibold">#{pedido.numero}</span>. Nenhuma nova cobrança
          será feita.
        </p>
        <button type="button" onClick={recomecar} className="h-16 w-full cursor-pointer rounded-md bg-orange-700 text-xl font-medium text-white">
          Voltar ao início
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Seu pedido</h1>
        <Link to="/totem/cardapio" className="text-lg font-medium text-orange-800">
          Adicionar mais
        </Link>
      </div>

      <div className="mb-6 divide-y divide-stone-200 rounded-md bg-white px-5">
        {itens.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 py-4 text-lg">
            <div className="flex-1">
              <p className="font-medium">{item.nome}</p>
              <p className="text-stone-500">{formatarMoeda(item.preco)}</p>
            </div>
            <ControleQuantidade grande quantidade={item.quantidade} onMenos={() => diminuir(item.id)} onMais={() => adicionar(item.id)} />
            <span className="w-24 text-right font-medium">{formatarMoeda(item.preco * item.quantidade)}</span>
          </div>
        ))}
        {desconto > 0 && (
          <div className="flex justify-between py-4 text-lg text-green-700">
            <span>Desconto do cupom</span>
            <span>-{formatarMoeda(desconto)}</span>
          </div>
        )}
        <div className="flex justify-between py-4 text-2xl font-semibold">
          <span>Total</span>
          <span>{formatarMoeda(totalComDesconto)}</span>
        </div>
      </div>

      <p className="mb-3 text-xl font-medium">Como vai pagar?</p>
      <div className="mb-6 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setForma('cartao')}
          className={`flex h-20 cursor-pointer items-center justify-center gap-3 rounded-md border-2 text-xl font-medium ${forma === 'cartao' ? 'border-orange-600 bg-orange-50' : 'border-stone-300 bg-white'}`}
        >
          <CreditCard className="size-7" />
          Cartão
        </button>
        <button
          type="button"
          onClick={() => setForma('pix')}
          className={`flex h-20 cursor-pointer items-center justify-center gap-3 rounded-md border-2 text-xl font-medium ${forma === 'pix' ? 'border-orange-600 bg-orange-50' : 'border-stone-300 bg-white'}`}
        >
          <QrCode className="size-7" />
          Pix
        </button>
      </div>

      <div className="mb-6">
        <CampoCupom grande cupom={cupom} onAplicar={aplicarCupom} onRemover={() => setCupom(null)} />
      </div>

      <label htmlFor="cpf-totem" className="mb-2 block text-xl font-medium">
        CPF na nota <span className="text-stone-500">(opcional)</span>
      </label>
      <input
        id="cpf-totem"
        inputMode="numeric"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="000.000.000-00"
        className="mb-1 h-14 w-full rounded-md border border-stone-300 bg-white px-4 text-xl outline-none focus:border-orange-600"
      />
      <p className="mb-6 text-stone-500">O CPF vai só para a nota fiscal e não fica salvo.</p>

      <div className="mb-6">
        <SimuladorPagamento cenario={cenario} onChange={setCenario} />
      </div>

      <button
        type="button"
        onClick={pagar}
        className="h-16 w-full cursor-pointer rounded-md bg-orange-700 text-xl font-medium text-white hover:bg-orange-800"
      >
        Pagar {formatarMoeda(totalComDesconto)}
      </button>
    </div>
  )
}
