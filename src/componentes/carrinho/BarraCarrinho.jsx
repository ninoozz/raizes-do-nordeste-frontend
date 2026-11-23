import { Link } from 'react-router'
import { ShoppingBag } from 'lucide-react'
import { formatarMoeda } from '../../utils/formatar'

export default function BarraCarrinho({ quantidade, total }) {
  if (quantidade === 0) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white p-4 md:hidden">
      <Link to="/carrinho" className="flex h-12 items-center justify-between rounded-md bg-orange-700 px-4 font-medium text-white">
        <span className="flex items-center gap-2">
          <ShoppingBag className="size-5" />
          Ver carrinho ({quantidade})
        </span>
        <span>{formatarMoeda(total)}</span>
      </Link>
    </div>
  )
}
