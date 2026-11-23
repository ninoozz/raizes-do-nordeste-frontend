const TEMPO_LIMITE = 30000

export const cenariosDeTeste = [
  { id: 'aprovar', rotulo: 'Aprovar' },
  { id: 'recusar', rotulo: 'Recusar' },
  { id: 'sem-resposta', rotulo: 'Sem resposta' },
]

export function solicitarPagamento(cenario) {
  return new Promise((resolve) => {
    if (cenario === 'aprovar') setTimeout(() => resolve('aprovado'), 2500)
    if (cenario === 'recusar') setTimeout(() => resolve('recusado'), 2500)
    if (cenario === 'sem-resposta') setTimeout(() => resolve('sem-resposta'), TEMPO_LIMITE)
  })
}

export function consultarPagamento() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('aprovado'), 1500)
  })
}
