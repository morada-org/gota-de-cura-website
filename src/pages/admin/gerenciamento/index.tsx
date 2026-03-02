import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import toast from 'react-hot-toast'
import AdminLayout from '../../../components/admin/AdminLayout'
import { ProductModal, ProductFormData } from '../../../components/admin/ProductModal'
import { ProductsService } from '../../../services/ProductsService'
import { useGetLoggedUser } from 'services/hooks/useGetLoggedUser'
import { formatCurrency } from '../../../utils/format'
import { productTypes } from 'data/products'

const Gerenciamento = () => {
  const router = useRouter()
  const { isAdmin } = useGetLoggedUser()
  const [products, setProducts] = useState<any[]>([])
  const [selectedType, setSelectedType] = useState<string>('all')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editingProduct, setEditingProduct] = useState<any | undefined>(undefined)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (isAdmin === false) {
      router.push('/admin')
    }
  }, [isAdmin])

  const loadProducts = async () => setProducts(await ProductsService.getProducts())

  useEffect(() => {
    loadProducts()
  }, [])

  const handleSave = async (data: ProductFormData) => {
    await ProductsService.saveProduct(data)
    toast.success(editingProduct ? 'Produto atualizado!' : 'Produto criado!')
    await loadProducts()
  }

  const handleDelete = async (id: string) => {
    await ProductsService.deleteProduct(id)
    setConfirmDeleteId(null)
    toast.success('Produto excluído!')
    await loadProducts()
  }

  const openCreate = () => {
    setEditingProduct(undefined)
    setModalOpen(true)
  }

  const openEdit = (product: any) => {
    setEditingProduct(product)
    setModalOpen(true)
  }

  const filtered = products
    .filter((p) => selectedType === 'all' || p.type === selectedType)
    .sort((a, b) => (a.name > b.name ? 1 : -1))

  if (isAdmin === undefined) return <AdminLayout />

  return (
    <AdminLayout>
      <div className="flex justify-between mb-7 pb-4 border-b">
        <h1 className="text-4xl font-semibold">Gerenciamento de produtos</h1>
        <button className="button is-primary" onClick={openCreate}>
          Novo produto
        </button>
      </div>

      <div className="select is-medium mb-5">
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="all">- Todos os produtos -</option>
          {productTypes.map((t) => (
            <option key={t.id} value={t.type}>
              {t.type}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="has-text-grey">Nenhum produto encontrado.</p>
      ) : (
        <div className="table-container">
          <table className="table is-bordered is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Disponível</th>
                <th>Oculto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="font-semibold">{item.name}</div>
                    <div className="has-text-grey is-size-7">{item.id}</div>
                  </td>
                  <td>{item.type}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>
                    {item.available ? (
                      <span className="tag is-success">Sim</span>
                    ) : (
                      <span className="tag is-warning">Não</span>
                    )}
                  </td>
                  <td>
                    {item.hidden ? (
                      <span className="tag is-dark">Oculto</span>
                    ) : (
                      <span className="tag is-light">Visível</span>
                    )}
                  </td>
                  <td>
                    <div className="buttons is-right">
                      <button
                        className="button is-small is-info"
                        onClick={() => openEdit(item)}
                      >
                        Editar
                      </button>
                      {confirmDeleteId === item.id ? (
                        <>
                          <button
                            className="button is-small is-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Confirmar
                          </button>
                          <button
                            className="button is-small is-light"
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <button
                          className="button is-small is-danger is-light"
                          onClick={() => setConfirmDeleteId(item.id)}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ProductModal
        isOpen={modalOpen}
        product={editingProduct}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </AdminLayout>
  )
}

export default Gerenciamento
