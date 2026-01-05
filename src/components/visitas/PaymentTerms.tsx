import Button from 'components/shared/basic/Button'
import { BasicModal } from 'components/shared/Layout/BasicModal'
import { VISIT_PRICES } from '../../constants/prices'

interface PaymentTermsProps {
  isOpen: boolean
  onClose: () => void
}

export const PaymentTerms = ({ isOpen, onClose }: PaymentTermsProps) => {
  return (
    <BasicModal open={isOpen}>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Regras de pagamento e reembolso</h3>
        <p>
          - A programação se inicia pontualmente às 8h, com encerramento às 12h.
          <br />
          - O deslocamento é por conta de cada um. Após fecharmos o grupo, passaremos mais
          detalhes e orientações.
          <br />- O valor é de {VISIT_PRICES.ADULT} por pessoa acima de 15 anos / {VISIT_PRICES.CHILD} por pessoa
          de 8 a 14 anos / {VISIT_PRICES.FREE} até 7 anos.
        </p>

        <p className="border-t font-semibold mt-3">Pagamento</p>
        <p>
          - O pagamento será combinado com a equipe Gota de Cura. <br />- A garantia da
          vaga se dá após a confirmação e o pagamento da taxa.
        </p>

        <p className="border-t font-semibold mt-3">Sobre desistência e reembolso:</p>
        <p>
          - Até 14 dias antes do evento: reembolso de <b>50% do valor</b> através de
          transferência bancária.
          <br />- Até 7 dias antes do evento: reembolso de <b>50% do valor</b> através de
          vale-presente para compra de produtos pelo site ou loja (frete não incluso).
          <br />- Menos de 7 dias para o evento:{' '}
          <u>
            não haverá reembolso, nem reserva de vaga para eventos futuros, nem troca por
            produtos
          </u>
          .
        </p>

        <Button onClick={onClose} className="w-full">
          Entendido
        </Button>
      </div>
    </BasicModal>
  )
}
