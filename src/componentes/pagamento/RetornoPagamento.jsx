import { CircleCheck, CircleX, LoaderCircle, TriangleAlert } from 'lucide-react'
import Botao from '../comum/Botao'

export default function RetornoPagamento({ etapa, numero, onTentarDeNovo, onTrocarForma, onVerificar }) {
  if (etapa === 'aguardando' || etapa === 'verificando') {
    return (
      <div className="py-8 text-center">
        <LoaderCircle className="mx-auto mb-3 size-12 animate-spin text-orange-700" />
        <h2 className="text-lg font-semibold">{etapa === 'aguardando' ? 'Aguardando pagamento' : 'Verificando o pagamento'}</h2>
      </div>
    )
  }

  if (etapa === 'aprovado') {
    return (
      <div className="py-6 text-center">
        <CircleCheck className="mx-auto mb-3 size-12 text-green-700" />
        <h2 className="mb-1 text-lg font-semibold">Pagamento aprovado</h2>
        <p className="mb-5 text-sm text-stone-500">Seu pedido #{numero} foi enviado para a cozinha.</p>
        <Botao para={`/pedido/${numero}`} grande className="w-full">
          Acompanhar pedido
        </Botao>
      </div>
    )
  }

  if (etapa === 'recusado') {
    return (
      <div className="py-6 text-center">
        <CircleX className="mx-auto mb-3 size-12 text-red-700" />
        <h2 className="mb-1 text-lg font-semibold">Pagamento não aprovado</h2>
        <p className="mb-5 text-sm text-stone-500">Tente de novo ou escolha outra forma de pagamento.</p>
        <div className="space-y-2">
          <Botao grande className="w-full" onClick={onTentarDeNovo}>
            Tentar de novo
          </Botao>
          <Botao secundario grande className="w-full" onClick={onTrocarForma}>
            Trocar forma de pagamento
          </Botao>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6 text-center">
      <TriangleAlert className="mx-auto mb-3 size-12 text-amber-600" />
      <h2 className="mb-1 text-lg font-semibold">Não conseguimos confirmar o pagamento</h2>
      <p className="mx-auto mb-5 max-w-xs text-sm text-stone-500">
        O serviço de pagamento não respondeu. O pedido #{numero} ficou como pagamento pendente e nenhuma nova cobrança será feita.
      </p>
      <Botao grande className="w-full" onClick={onVerificar}>
        Verificar pagamento
      </Botao>
    </div>
  )
}
