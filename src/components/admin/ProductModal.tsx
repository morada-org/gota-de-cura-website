import { productTypes } from 'data/products'
import { ProductItem } from 'interfaces/products'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface ProductModalProps {
  isOpen: boolean
  product?: ProductItem & { type?: string }
  onClose: () => void
  onSave: (data: ProductFormData) => Promise<void>
}

export type ProductFormData = {
  id: string
  type: string
  name: string
  price: number
  oldPrice?: number
  description: string
  detailedDescription?: string
  image: string
  seal?: string
  available: boolean
  hidden: boolean
}

export const ProductModal = ({ isOpen, product, onClose, onSave }: ProductModalProps) => {
  const { register, handleSubmit, reset, formState } = useForm<ProductFormData>()

  const emptyForm: ProductFormData = {
    id: '',
    type: '',
    name: '',
    price: 0,
    oldPrice: undefined,
    description: '',
    detailedDescription: '',
    image: '',
    seal: '',
    available: true,
    hidden: false,
  }

  useEffect(() => {
    if (isOpen) {
      reset(
        product
          ? {
              id: product.id,
              type: (product as any).type ?? '',
              name: product.name,
              price: product.price,
              oldPrice: product.oldPrice,
              description: product.description,
              detailedDescription: product.detailedDescription ?? '',
              image: product.image,
              seal: product.seal ?? '',
              available: product.available ?? true,
              hidden: product.hidden ?? false,
            }
          : emptyForm
      )
    } else {
      reset(emptyForm)
    }
  }, [isOpen, product])

  const onSubmit = async (data: ProductFormData) => {
    await onSave(data)
    onClose()
  }

  if (!isOpen) return null

  const isEditing = !!product

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card" style={{ width: '90%', maxWidth: 640, maxHeight: '90vh' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">
            {isEditing ? 'Editar produto' : 'Novo produto'}
          </p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}
        >
          <section className="modal-card-body" style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
            <div className="field">
              <label className="label">ID</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Ex: lavanda-10ml"
                  disabled={isEditing}
                  {...register('id', { required: true })}
                />
              </div>
              {!isEditing && (
                <p className="help">Identificador único, sem espaços (ex: lavanda-10ml)</p>
              )}
            </div>

            <div className="field">
              <label className="label">Categoria</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select {...register('type', { required: true })}>
                    <option value="" disabled>
                      - Selecione -
                    </option>
                    {productTypes.map((t) => (
                      <option key={t.id} value={t.type}>
                        {t.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Nome</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Nome do produto"
                  {...register('name', { required: true })}
                />
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Preço (R$)</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0,00"
                      {...register('price', { required: true, valueAsNumber: true })}
                    />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Preço antigo (R$)</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0,00"
                      {...register('oldPrice', { valueAsNumber: true })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Descrição</label>
              <div className="control">
                <textarea
                  className="textarea"
                  rows={3}
                  placeholder="Descrição curta do produto"
                  {...register('description', { required: true })}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Descrição detalhada</label>
              <div className="control">
                <textarea
                  className="textarea"
                  rows={4}
                  placeholder="Descrição detalhada (aceita HTML)"
                  {...register('detailedDescription')}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Imagem (URL)</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="URL da imagem"
                  {...register('image', { required: true })}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Selo (URL)</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="URL da imagem do selo (opcional)"
                  {...register('seal')}
                />
              </div>
            </div>

            <div className="columns mt-2">
              <div className="column">
                <label className="checkbox">
                  <input type="checkbox" className="mr-2" {...register('available')} />
                  Disponível para venda
                </label>
              </div>
              <div className="column">
                <label className="checkbox">
                  <input type="checkbox" className="mr-2" {...register('hidden')} />
                  Ocultar produto
                </label>
              </div>
            </div>
          </section>

          <footer className="modal-card-foot is-flex is-justify-content-space-between">
            <button type="button" className="button" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className={`button is-primary ${formState.isSubmitting ? 'is-loading' : ''}`}
              disabled={!formState.isValid || formState.isSubmitting}
            >
              {isEditing ? 'Salvar alterações' : 'Criar produto'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}
