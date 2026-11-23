import { categorias } from '../../dados/produtos'

export default function AbasCategorias({ ativa, onChange, saoJoao = false, grande = false, lateral = false }) {
  const abas = saoJoao ? [...categorias, { id: 'sao-joao', nome: 'São João' }] : categorias

  return (
    <div className={`-mx-4 mb-5 overflow-x-auto px-4 ${lateral ? 'lg:mx-0 lg:px-0' : ''}`}>
      <div className={`flex gap-2 ${lateral ? 'lg:flex-col lg:gap-1' : ''}`}>
        {abas.map((aba) => (
          <button
            key={aba.id}
            type="button"
            onClick={() => onChange(aba.id)}
            className={`shrink-0 cursor-pointer rounded-md font-medium ${grande ? 'h-14 px-6 text-lg' : 'h-9 px-4 text-sm'} ${lateral ? 'lg:px-3 lg:text-left' : ''} ${
              ativa === aba.id ? 'bg-orange-700 text-white' : 'border border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            {aba.nome}
          </button>
        ))}
      </div>
    </div>
  )
}
