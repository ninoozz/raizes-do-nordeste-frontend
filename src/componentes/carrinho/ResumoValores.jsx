import { formatarMoeda } from '../../utils/formatar'

export default function ResumoValores({ subtotal, descontoPontos = 0, descontoCupom = 0, total }) {
  return (
    <div className="space-y-1.5 text-sm text-stone-600">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatarMoeda(subtotal)}</span>
      </div>

      {descontoPontos > 0 && (
        <div className="flex justify-between">
          <span>Desconto com pontos</span>
          <span className="text-green-700">-{formatarMoeda(descontoPontos)}</span>
        </div>
      )}

      {descontoCupom > 0 && (
        <div className="flex justify-between">
          <span>Desconto do cupom</span>
          <span className="text-green-700">-{formatarMoeda(descontoCupom)}</span>
        </div>
      )}

      <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-semibold text-stone-800">
        <span>Total</span>
        <span>{formatarMoeda(total)}</span>
      </div>
    </div>
  )
}
