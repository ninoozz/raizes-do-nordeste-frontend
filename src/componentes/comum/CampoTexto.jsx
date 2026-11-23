export default function CampoTexto({ id, rotulo, erro, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {rotulo}
      </label>
      <input
        id={id}
        className={`h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:border-orange-600 ${erro ? 'border-red-400' : 'border-stone-300'}`}
        {...props}
      />
      {erro && <p className="mt-1 text-sm text-red-700">{erro}</p>}
    </div>
  )
}
