import { Link } from 'react-router'

export default function Botao({ secundario = false, grande = false, para, className = '', children, ...props }) {
  let classes = 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium disabled:cursor-not-allowed'
  classes += grande ? ' h-12 px-5' : ' h-10 px-4 text-sm'
  classes += secundario
    ? ' border border-stone-300 bg-white text-stone-800 hover:bg-stone-100 disabled:text-stone-400'
    : ' bg-orange-700 text-white hover:bg-orange-800 disabled:bg-stone-300 disabled:text-stone-500'

  if (para) {
    return (
      <Link to={para} className={`${classes} ${className}`} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={`${classes} ${className}`} {...props}>
      {children}
    </button>
  )
}
