import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'

export default function TituloPagina({ titulo, subtitulo, voltarPara }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      {voltarPara && (
        <Link to={voltarPara} aria-label="Voltar" className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-stone-300 bg-white hover:bg-stone-100">
          <ArrowLeft className="size-5" />
        </Link>
      )}
      <div>
        <h1 className="text-2xl font-semibold">{titulo}</h1>
        {subtitulo && <p className="text-sm text-stone-500">{subtitulo}</p>}
      </div>
    </div>
  )
}
