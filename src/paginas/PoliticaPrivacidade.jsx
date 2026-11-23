import TituloPagina from '../componentes/layout/TituloPagina'

export default function PoliticaPrivacidade() {
  return (
    <div className="mx-auto max-w-2xl">
      <TituloPagina titulo="Política de privacidade" subtitulo="Conforme a Lei nº 13.709/2018 (LGPD)." />

      <div className="space-y-5 rounded-md border border-stone-200 bg-white p-5 text-sm text-stone-600">
        <div>
          <h2 className="mb-1 text-base font-semibold text-stone-800">Quais dados coletamos</h2>
          <p>Nome, e-mail e celular para criar sua conta, e o histórico dos seus pedidos para somar pontos de fidelidade.</p>
        </div>

        <div>
          <h2 className="mb-1 text-base font-semibold text-stone-800">Para que usamos</h2>
          <p>
            Para preparar e avisar sobre o seu pedido e para o programa de pontos. Promoções e ofertas personalizadas só com a
            sua autorização.
          </p>
        </div>

        <div>
          <h2 className="mb-1 text-base font-semibold text-stone-800">Pagamento</h2>
          <p>Os dados do cartão são digitados na tela do parceiro de pagamento. A Raízes do Nordeste não recebe nem guarda esses dados.</p>
        </div>

        <div>
          <h2 className="mb-1 text-base font-semibold text-stone-800">Totem e balcão</h2>
          <p>
            O totem não guarda dados pessoais. Ao terminar o pedido, ou depois de 60 segundos sem uso, a tela volta ao início. O CPF
            na nota, no totem ou no balcão, vai só para a nota fiscal e não fica salvo no sistema.
          </p>
        </div>

        <div>
          <h2 className="mb-1 text-base font-semibold text-stone-800">Seus direitos</h2>
          <p>Você pode ver, corrigir, baixar e excluir seus dados, e mudar suas autorizações quando quiser, na tela Meus dados.</p>
        </div>

        <div>
          <h2 className="mb-1 text-base font-semibold text-stone-800">Relatórios da rede</h2>
          <p>Os relatórios usados pelas lojas e pela matriz mostram dados agrupados, sem nome nem CPF de clientes.</p>
        </div>
      </div>
    </div>
  )
}
