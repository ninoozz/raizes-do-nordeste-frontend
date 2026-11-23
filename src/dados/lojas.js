export const lojas = [
  {
    id: 'boa-viagem',
    nome: 'Boa Viagem',
    cidade: 'Recife',
    endereco: 'Av. Conselheiro Aguiar, 2150',
    aberta: true,
    cozinha: 'completa',
    lat: -8.1188,
    lng: -34.9007,
  },
  {
    id: 'casa-forte',
    nome: 'Casa Forte',
    cidade: 'Recife',
    endereco: 'Praça de Casa Forte, 88',
    aberta: true,
    cozinha: 'reduzida',
    lat: -8.0336,
    lng: -34.9187,
  },
  {
    id: 'aldeota',
    nome: 'Aldeota',
    cidade: 'Fortaleza',
    endereco: 'Rua Silva Paulet, 1200',
    aberta: false,
    abreAs: '6h',
    cozinha: 'completa',
    lat: -3.7363,
    lng: -38.504,
  },
]

export const posicaoSimulada = { lat: -8.04, lng: -34.91 }

export function buscarLoja(id) {
  return lojas.find((loja) => loja.id === id)
}
