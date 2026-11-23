import { Link, Navigate, Outlet, useLocation } from 'react-router'
import { LogOut } from 'lucide-react'
import { useEquipe } from '../../contextos/EquipeContext'
import { buscarLoja } from '../../dados/lojas'

export default function LayoutEquipe() {
  const { funcionario, sair } = useEquipe()
  const { pathname } = useLocation()

  if (!funcionario) return <Navigate to="/equipe" replace />

  const gerente = funcionario.funcao === 'Gerente'
  if (!gerente && pathname !== funcionario.painel) return <Navigate to={funcionario.painel} replace />

  const loja = buscarLoja(funcionario.lojaId)
  const estiloLink = (caminho) =>
    `rounded-md px-3 py-1.5 ${pathname === caminho ? 'bg-stone-700 text-white' : 'text-stone-300 hover:text-white'}`

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      <div className="bg-stone-900 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div>
              <span className="font-bold">Raízes do Nordeste</span>
              <span className="ml-2 text-sm text-stone-400">Loja {loja.nome}</span>
            </div>
            {gerente && (
              <div className="flex gap-1 text-sm">
                <Link to="/equipe/cozinha" className={estiloLink('/equipe/cozinha')}>
                  Cozinha
                </Link>
                <Link to="/equipe/balcao" className={estiloLink('/equipe/balcao')}>
                  Balcão
                </Link>
                <Link to="/equipe/gerente" className={estiloLink('/equipe/gerente')}>
                  Gerência
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-stone-300">
              {funcionario.nome} ({funcionario.funcao.toLowerCase()})
            </span>
            <button type="button" onClick={sair} className="flex cursor-pointer items-center gap-1.5 text-stone-300 hover:text-white">
              <LogOut className="size-4" />
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </div>
    </div>
  )
}
