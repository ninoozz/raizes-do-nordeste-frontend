import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { Download, LogOut } from 'lucide-react'
import { useCliente } from '../contextos/ClienteContext'
import { usePedidos } from '../contextos/PedidosContext'
import { useLoja } from '../contextos/LojaContext'
import { nomeDoStatus } from '../dados/pedidos'
import { formatarMoeda } from '../utils/formatar'
import TituloPagina from '../componentes/layout/TituloPagina'
import Botao from '../componentes/comum/Botao'
import CampoTexto from '../componentes/comum/CampoTexto'
import PreferenciasConsentimento from '../componentes/conta/PreferenciasConsentimento'
import ExcluirConta from '../componentes/conta/ExcluirConta'

export default function MinhaConta() {
  const { cliente, pontos, historico, consentimentos, mudarConsentimento, atualizarDados, excluirConta, sair } = useCliente()
  const { pedidos, esquecerCliente } = usePedidos()
  const { registrar } = useLoja()
  const navegar = useNavigate()
  const [editando, setEditando] = useState(false)
  const [nome, setNome] = useState('')
  const [celular, setCelular] = useState('')

  if (!cliente) return <Navigate to="/identificacao" replace />

  function comecarEdicao() {
    setNome(cliente.nome)
    setCelular(cliente.celular)
    setEditando(true)
  }

  function salvar(e) {
    e.preventDefault()
    if (!nome.trim()) return
    atualizarDados({ nome: nome.trim(), celular })
    setEditando(false)
  }

  function baixarDados() {
    const meusPedidos = pedidos.filter((p) => p.clienteEmail === cliente.email)
    const linhas = [
      ['MEUS DADOS'],
      ['Nome', cliente.nome],
      ['E-mail', cliente.email],
      ['Celular', cliente.celular],
      ['Aceitou os termos em', cliente.aceitouTermosEm],
      ['Pontos', pontos],
      [],
      ['CONSENTIMENTOS'],
      ['Promoções por e-mail', consentimentos.promocoes ? 'Sim' : 'Não'],
      ['Ofertas pelo meu histórico', consentimentos.ofertas ? 'Sim' : 'Não'],
      [],
      ['HISTÓRICO DE PONTOS'],
      ['Data', 'Descrição', 'Pontos'],
      ...historico.map((h) => [h.data, h.descricao, h.pontos]),
      [],
      ['PEDIDOS'],
      ['Número', 'Status', 'Total'],
      ...meusPedidos.map((p) => [p.numero, nomeDoStatus[p.status], formatarMoeda(p.total)]),
    ]
    const conteudo = '\uFEFF' + linhas.map((linha) => linha.join(';')).join('\r\n')
    const arquivo = URL.createObjectURL(new Blob([conteudo], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = arquivo
    link.download = 'meus-dados-raizes-do-nordeste.csv'
    link.click()
    registrar('Cliente (app)', 'Baixou os próprios dados', 'Acesso a dados')
    URL.revokeObjectURL(arquivo)
  }

  return (
    <div className="mx-auto max-w-md">
      <TituloPagina titulo="Meus dados e privacidade" voltarPara="/" />

      <div className="space-y-4">
        <div className="rounded-md border border-stone-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Meus dados</h2>
            {!editando && (
              <button type="button" onClick={comecarEdicao} className="cursor-pointer text-sm font-medium text-orange-800 hover:underline">
                Editar
              </button>
            )}
          </div>

          {editando ? (
            <form onSubmit={salvar} className="space-y-3">
              <CampoTexto id="editar-nome" rotulo="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              <CampoTexto id="editar-celular" rotulo="Celular" type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} />
              <div className="flex gap-2">
                <Botao type="submit">Salvar</Botao>
                <Botao secundario onClick={() => setEditando(false)}>
                  Cancelar
                </Botao>
              </div>
            </form>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="flex justify-between gap-4">
                <span className="text-stone-500">Nome</span>
                {cliente.nome}
              </p>
              <p className="flex justify-between gap-4">
                <span className="text-stone-500">E-mail</span>
                {cliente.email}
              </p>
              <p className="flex justify-between gap-4">
                <span className="text-stone-500">Celular</span>
                {cliente.celular}
              </p>
              <p className="flex justify-between gap-4">
                <span className="text-stone-500">Aceitou os termos em</span>
                {cliente.aceitouTermosEm}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-md border border-stone-200 bg-white p-4">
          <h2 className="mb-3 font-semibold">Consentimentos</h2>
          <PreferenciasConsentimento consentimentos={consentimentos} onChange={mudarConsentimento} />
        </div>

        <div className="space-y-3 rounded-md border border-stone-200 bg-white p-4">
          <h2 className="font-semibold">Seus direitos (LGPD)</h2>
          <Botao secundario className="w-full" onClick={baixarDados}>
            <Download className="size-4" />
            Baixar meus dados (planilha)
          </Botao>
          <ExcluirConta
            onExcluir={() => {
              esquecerCliente(cliente.email)
              registrar('Cliente (app)', 'Excluiu a própria conta', 'Acesso a dados')
              excluirConta()
              navegar('/')
            }}
          />
          <Link to="/politica-de-privacidade" className="block text-center text-sm text-orange-800 underline">
            Política de privacidade
          </Link>
        </div>

        <Botao secundario className="w-full" onClick={sair}>
          <LogOut className="size-4" />
          Sair
        </Botao>
      </div>
    </div>
  )
}
