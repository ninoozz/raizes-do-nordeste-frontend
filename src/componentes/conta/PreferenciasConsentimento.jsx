import { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import Interruptor from '../comum/Interruptor'

export default function PreferenciasConsentimento({ consentimentos, onChange }) {
  const [salvou, setSalvou] = useState(false)

  function mudar(chave, ligado) {
    onChange(chave, ligado)
    setSalvou(true)
    setTimeout(() => setSalvou(false), 2500)
  }

  return (
    <div className="space-y-4">
      <Interruptor
        ligado={consentimentos.promocoes}
        onChange={(ligado) => mudar('promocoes', ligado)}
        rotulo="Promoções por e-mail"
        descricao="Campanhas e cupons da rede."
      />
      <Interruptor
        ligado={consentimentos.ofertas}
        onChange={(ligado) => mudar('ofertas', ligado)}
        rotulo="Ofertas pelo meu histórico"
        descricao="Usamos o que você pede para sugerir produtos."
      />

      {salvou ? (
        <p className="flex items-center gap-1.5 text-sm text-green-700">
          <CircleCheck className="size-4" />
          Preferência salva.
        </p>
      ) : (
        <p className="text-xs text-stone-500">Você pode mudar quando quiser.</p>
      )}
    </div>
  )
}
