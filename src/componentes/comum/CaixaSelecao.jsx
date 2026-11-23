export default function CaixaSelecao({ id, marcada, onChange, children }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm">
      <input
        id={id}
        type="checkbox"
        checked={marcada}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-orange-700"
      />
      <span>{children}</span>
    </label>
  )
}
