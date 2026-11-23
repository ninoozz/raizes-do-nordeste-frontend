import { HashRouter, Routes, Route } from 'react-router'
import { EquipeProvider } from './contextos/EquipeContext'
import { LojaProvider } from './contextos/LojaContext'
import { ClienteProvider } from './contextos/ClienteContext'
import { PedidosProvider } from './contextos/PedidosContext'
import { CarrinhoProvider } from './contextos/CarrinhoContext'
import LayoutCliente from './componentes/layout/LayoutCliente'
import LayoutTotem from './componentes/layout/LayoutTotem'
import LayoutEquipe from './componentes/layout/LayoutEquipe'
import EscolherLoja from './paginas/EscolherLoja'
import Cardapio from './paginas/Cardapio'
import Carrinho from './paginas/Carrinho'
import Identificacao from './paginas/Identificacao'
import Pagamento from './paginas/Pagamento'
import AcompanharPedido from './paginas/AcompanharPedido'
import MeusPedidos from './paginas/MeusPedidos'
import MeusPontos from './paginas/MeusPontos'
import MinhaConta from './paginas/MinhaConta'
import PoliticaPrivacidade from './paginas/PoliticaPrivacidade'
import NaoEncontrada from './paginas/NaoEncontrada'
import TotemInicio from './paginas/totem/TotemInicio'
import TotemCardapio from './paginas/totem/TotemCardapio'
import TotemPagamento from './paginas/totem/TotemPagamento'
import LoginEquipe from './paginas/equipe/LoginEquipe'
import PainelCozinha from './paginas/equipe/PainelCozinha'
import Balcao from './paginas/equipe/Balcao'
import PainelGerente from './paginas/equipe/PainelGerente'

export default function App() {
  return (
    <EquipeProvider>
      <LojaProvider>
        <ClienteProvider>
          <PedidosProvider>
            <CarrinhoProvider>
              <HashRouter>
                <Routes>
                  <Route element={<LayoutCliente />}>
                    <Route index element={<EscolherLoja />} />
                    <Route path="cardapio" element={<Cardapio />} />
                    <Route path="carrinho" element={<Carrinho />} />
                    <Route path="identificacao" element={<Identificacao />} />
                    <Route path="pagamento" element={<Pagamento />} />
                    <Route path="pedido/:numero" element={<AcompanharPedido />} />
                    <Route path="pedidos" element={<MeusPedidos />} />
                    <Route path="pontos" element={<MeusPontos />} />
                    <Route path="conta" element={<MinhaConta />} />
                    <Route path="politica-de-privacidade" element={<PoliticaPrivacidade />} />
                    <Route path="*" element={<NaoEncontrada />} />
                  </Route>

                  <Route path="totem" element={<LayoutTotem />}>
                    <Route index element={<TotemInicio />} />
                    <Route path="cardapio" element={<TotemCardapio />} />
                    <Route path="pagamento" element={<TotemPagamento />} />
                  </Route>

                  <Route path="equipe">
                    <Route index element={<LoginEquipe />} />
                    <Route element={<LayoutEquipe />}>
                      <Route path="cozinha" element={<PainelCozinha />} />
                      <Route path="balcao" element={<Balcao />} />
                      <Route path="gerente" element={<PainelGerente />} />
                    </Route>
                  </Route>
                </Routes>
              </HashRouter>
            </CarrinhoProvider>
          </PedidosProvider>
        </ClienteProvider>
      </LojaProvider>
    </EquipeProvider>
  )
}
