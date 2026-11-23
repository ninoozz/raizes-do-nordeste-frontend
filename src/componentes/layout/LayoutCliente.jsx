import { Link, Outlet, useLocation } from 'react-router'
import { Award, ChevronDown, CircleUserRound, ReceiptText, Users } from 'lucide-react'
import { useCarrinho } from '../../contextos/CarrinhoContext'
import { useCliente } from '../../contextos/ClienteContext'
import BannerCookies from '../privacidade/BannerCookies'

export default function LayoutCliente() {
  const { loja } = useCarrinho()
  const { cliente, pontos } = useCliente()
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-800">
      <div className="sticky top-0 z-20 border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
          <Link to="/" className="text-lg font-bold whitespace-nowrap text-orange-800">
            Raízes do Nordeste
          </Link>

          <div className="flex items-center gap-1 text-sm sm:gap-3">
            {loja && pathname !== '/' && (
              <Link to="/" className="hidden items-center gap-1.5 rounded-md border border-stone-300 px-2 py-1.5 hover:bg-stone-100 sm:flex">
                Loja: {loja.nome}
                <ChevronDown className="size-4" />
              </Link>
            )}
            {cliente && (
              <Link to="/pedidos" className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5 hover:bg-stone-100 sm:px-2">
                <ReceiptText className="size-5" />
                <span className="hidden md:inline">Pedidos</span>
              </Link>
            )}
            {cliente && (
              <Link to="/pontos" className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5 hover:bg-stone-100 sm:px-2">
                <Award className="size-5 text-orange-700" />
                <span className="hidden sm:inline">{pontos} pontos</span>
              </Link>
            )}
            <Link to="/conta" className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5 hover:bg-stone-100 sm:px-2">
              <CircleUserRound className="size-5" />
              <span className="hidden sm:inline">{cliente ? cliente.nome.split(' ')[0] : 'Entrar'}</span>
            </Link>
            <Link to="/equipe" className="flex items-center gap-1.5 rounded-md border border-stone-300 px-1.5 py-1.5 hover:bg-stone-100 sm:px-2">
              <Users className="size-5" />
              <span className={cliente ? 'hidden sm:inline' : ''}>Equipe</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-10">
        <Outlet />
      </div>

      <div className="flex justify-center gap-6 border-t border-stone-200 pt-5 pb-24 text-xs text-stone-500 md:pb-5">
        <Link to="/politica-de-privacidade" className="hover:underline">
          Política de privacidade
        </Link>
      </div>

      <BannerCookies />
    </div>
  )
}
