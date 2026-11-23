import { createContext, useContext, useState } from 'react'
import { pedidosDeHoje } from '../dados/pedidos'

const PedidosContext = createContext(null)

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState(pedidosDeHoje)

  function criarPedido(dados) {
    const novo = {
      ...dados,
      numero: pedidos[pedidos.length - 1].numero + 1,
      criadoEm: Date.now(),
      horarios: dados.status === 'recebido' ? { recebido: Date.now() } : {},
    }
    setPedidos([...pedidos, novo])
    return novo
  }

  function mudarStatus(numero, status) {
    setPedidos((lista) =>
      lista.map((p) => (p.numero === numero ? { ...p, status, horarios: { ...p.horarios, [status]: Date.now() } } : p)),
    )
  }

  function cancelarPedido(numero, motivo, quem) {
    setPedidos((lista) =>
      lista.map((p) =>
        p.numero === numero ? { ...p, status: 'cancelado', cancelamento: { motivo, quem, quando: Date.now() } } : p,
      ),
    )
  }

  function esquecerCliente(email) {
    setPedidos((lista) => lista.map((p) => (p.clienteEmail === email ? { ...p, clienteEmail: null } : p)))
  }

  function buscarPedido(numero) {
    return pedidos.find((p) => p.numero === numero)
  }

  return (
    <PedidosContext.Provider value={{ pedidos, criarPedido, mudarStatus, cancelarPedido, esquecerCliente, buscarPedido }}>
      {children}
    </PedidosContext.Provider>
  )
}

export function usePedidos() {
  return useContext(PedidosContext)
}
