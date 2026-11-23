import { CreditCard, QrCode } from 'lucide-react'

export default function OpcoesPagamento({ forma, onChange }) {
  const classe = (id) =>
    `flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-medium ${
      forma === id ? 'border-orange-600 bg-orange-50 text-orange-800' : 'border-stone-300 bg-white'
    }`

  return (
    <div className="grid grid-cols-2 gap-2">
      <button type="button" onClick={() => onChange('pix')} className={classe('pix')}>
        <QrCode className="size-5" />
        Pix
      </button>
      <button type="button" onClick={() => onChange('cartao')} className={classe('cartao')}>
        <CreditCard className="size-5" />
        Cartão
      </button>
    </div>
  )
}
