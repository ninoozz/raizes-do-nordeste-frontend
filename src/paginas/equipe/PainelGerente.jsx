import { useState } from 'react'
import { useEquipe } from '../../contextos/EquipeContext'
import { buscarLoja } from '../../dados/lojas'
import Indicadores from '../../componentes/gerente/Indicadores'
import ResumoLoja from '../../componentes/gerente/ResumoLoja'
import CardapioLoja from '../../componentes/gerente/CardapioLoja'
import Promocoes from '../../componentes/gerente/Promocoes'
import Relatorios from '../../componentes/gerente/Relatorios'
import Auditoria from '../../componentes/gerente/Auditoria'

const menu = ['Resumo', 'Cardápio', 'Promoções', 'Relatórios', 'Auditoria']

export default function PainelGerente() {
  const { funcionario } = useEquipe()
  const [secao, setSecao] = useState('Resumo')
  const loja = buscarLoja(funcionario.lojaId)

  return (
    <div className="md:grid md:grid-cols-[180px_1fr] md:gap-6">
      <div className="mb-4 flex gap-1 overflow-x-auto md:mb-0 md:flex-col">
        {menu.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSecao(item)}
            className={`h-10 shrink-0 cursor-pointer rounded-md px-3 text-left text-sm font-medium ${
              secao === item ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:bg-stone-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="min-w-0">
        <Indicadores loja={loja} />
        <h1 className="mb-4 text-xl font-semibold">{secao === 'Cardápio' ? 'Cardápio da loja' : secao}</h1>

        {secao === 'Resumo' && <ResumoLoja loja={loja} />}
        {secao === 'Cardápio' && <CardapioLoja loja={loja} funcionario={funcionario} />}
        {secao === 'Promoções' && <Promocoes funcionario={funcionario} />}
        {secao === 'Relatórios' && <Relatorios />}
        {secao === 'Auditoria' && <Auditoria loja={loja} />}
      </div>
    </div>
  )
}
