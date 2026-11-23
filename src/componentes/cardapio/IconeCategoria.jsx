import { CakeSlice, CupSoda, Sandwich, Wheat } from 'lucide-react'

const icones = {
  tapiocas: Sandwich,
  cuscuz: Wheat,
  doces: CakeSlice,
  bebidas: CupSoda,
}

export default function IconeCategoria({ categoria, className }) {
  const Icone = icones[categoria] ?? Sandwich
  return <Icone className={className} />
}
