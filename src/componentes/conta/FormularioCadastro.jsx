import { useState } from 'react'
import { Link } from 'react-router'
import CampoTexto from '../comum/CampoTexto'
import CaixaSelecao from '../comum/CaixaSelecao'
import Botao from '../comum/Botao'
import ExplicacaoDados from '../privacidade/ExplicacaoDados'

export default function FormularioCadastro({ onCadastrar }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [celular, setCelular] = useState('')
  const [senha, setSenha] = useState('')
  const [aceitouTermos, setAceitouTermos] = useState(false)
  const [promocoes, setPromocoes] = useState(false)
  const [ofertas, setOfertas] = useState(false)
  const [tentouEnviar, setTentouEnviar] = useState(false)
  const [emailRepetido, setEmailRepetido] = useState('')

  const erroNome = nome.trim() ? '' : 'Digite seu nome.'
  const erroEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Digite um e-mail válido.'
  const erroCelular = celular.replace(/\D/g, '').length >= 10 ? '' : 'Digite um celular com DDD.'
  const erroSenha = senha.length >= 4 ? '' : 'A senha precisa ter pelo menos 4 caracteres.'

  function criarConta(e) {
    e.preventDefault()
    setTentouEnviar(true)
    if (erroNome || erroEmail || erroCelular || erroSenha || !aceitouTermos) return
    setEmailRepetido(onCadastrar({ nome, email, celular, senha }, { promocoes, ofertas }) ?? '')
  }

  return (
    <form onSubmit={criarConta} noValidate className="space-y-4">
      <CampoTexto id="nome" rotulo="Nome" value={nome} onChange={(e) => setNome(e.target.value)} erro={tentouEnviar && erroNome} />
      <CampoTexto
        id="email"
        rotulo="E-mail"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setEmailRepetido('')
        }}
        erro={(tentouEnviar && erroEmail) || emailRepetido}
      />
      <CampoTexto
        id="celular"
        rotulo="Celular"
        type="tel"
        placeholder="(81) 99999-0000"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        erro={tentouEnviar && erroCelular}
      />
      <CampoTexto
        id="senha-nova"
        rotulo="Crie uma senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        erro={tentouEnviar && erroSenha}
      />

      <div className="space-y-3 border-t border-stone-200 pt-4">
        <CaixaSelecao id="termos" marcada={aceitouTermos} onChange={setAceitouTermos}>
          Li e aceito os{' '}
          <Link to="/politica-de-privacidade" className="font-medium text-orange-800 underline">
            Termos de Uso e a Política de Privacidade
          </Link>
          . <span className="text-stone-500">(obrigatório)</span>
        </CaixaSelecao>
        <CaixaSelecao id="promocoes" marcada={promocoes} onChange={setPromocoes}>
          Quero receber promoções por e-mail. <span className="text-stone-500">(opcional)</span>
        </CaixaSelecao>
        <CaixaSelecao id="ofertas" marcada={ofertas} onChange={setOfertas}>
          Usar meu histórico de pedidos para ofertas personalizadas. <span className="text-stone-500">(opcional)</span>
        </CaixaSelecao>
        <ExplicacaoDados />
      </div>

      {!aceitouTermos && <p className="text-sm text-stone-500">Aceite os termos para continuar.</p>}
      <Botao type="submit" grande className="w-full" disabled={!aceitouTermos}>
        Criar conta
      </Botao>
    </form>
  )
}
