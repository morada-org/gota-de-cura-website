import AdminLayout from 'components/admin/AdminLayout'
import { StatusTag } from 'components/pedidos/StatusTag'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CartItemType, CartService, ORDER_STATUS } from 'services/CartService'
import { useGetLoggedUser } from 'services/hooks/useGetLoggedUser'
import { formatCurrency } from 'utils/format'

const Relatorios = () => {
  const router = useRouter()
  const { isAdmin } = useGetLoggedUser()
  const [orders, setOrders] = useState<any[]>([])
  const [filteredOrders, setFilteredOrders] = useState<any[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAdmin === false) {
      router.push('/admin/pedidos')
    }
  }, [isAdmin, router])

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const allOrders = await CartService.getOrders()
      setOrders(allOrders)
      setFilteredOrders(allOrders)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterByDate = () => {
    if (!startDate || !endDate) {
      setFilteredOrders(orders)
      return
    }

    const start = new Date(startDate)
    start.setHours(0, 0, 0, 0)

    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt)
      return orderDate >= start && orderDate <= end
    })

    setFilteredOrders(filtered)
  }

  const clearFilters = () => {
    setStartDate('')
    setEndDate('')
    setFilteredOrders(orders)
  }

  const getTotal = (order: any) => {
    let total = 0
    order.items.forEach((element: CartItemType) => {
      total += element.price * (element.amount || 0)
    })

    if (order.coupon && order.coupon.discount) {
      if (order.coupon.discountType === 'fixed') {
        total -= order.coupon.discount
      } else {
        total -= total * (order.coupon.discount / 100)
      }
    }

    return total
  }

  const getTotalRevenue = () => {
    return filteredOrders
      .filter((order) => order.status !== ORDER_STATUS.CANCELADO)
      .reduce((acc, order) => acc + getTotal(order), 0)
  }

  const getTotalItems = () => {
    return filteredOrders
      .filter((order) => order.status !== ORDER_STATUS.CANCELADO)
      .reduce((acc, order) => {
        const orderTotal = order.items.reduce(
          (sum: number, item: CartItemType) => sum + (item.amount || 0),
          0,
        )
        return acc + orderTotal
      }, 0)
  }

  const getOrdersByStatus = (status: string) => {
    return filteredOrders.filter((order) => order.status === status).length
  }

  if (isAdmin === false) {
    return null
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Relatórios de Vendas</h1>

        {/* Date Filters */}
        <div className="flex gap-4 items-end mb-8 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Inicial
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Final
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={filterByDate}
          >
            Filtrar
          </button>

          <button
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            onClick={clearFilters}
          >
            Limpar Filtros
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-[#dbdbdb] rounded-md p-6 text-center">
                <div className="text-sm text-[#7a7a7a] mb-2">Total de Pedidos</div>
                <div className="text-3xl font-bold text-[#363636]">
                  {filteredOrders.length}
                </div>
              </div>

              <div className="bg-white border border-[#dbdbdb] rounded-md p-6 text-center">
                <div className="text-sm text-[#7a7a7a] mb-2">Total de Itens</div>
                <div className="text-3xl font-bold text-[#363636]">{getTotalItems()}</div>
              </div>

              <div className="bg-[#48c774] rounded-md p-6 text-center text-white">
                <div className="text-sm mb-2">Receita Total</div>
                <div className="text-3xl font-bold">
                  R$ {formatCurrency(getTotalRevenue())}
                </div>
              </div>
            </div>

            {/* Orders by Status */}
            <h2 className="text-2xl font-bold mb-4">Pedidos por Status</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
              <div className="bg-white border border-[#dbdbdb] rounded-md p-4 text-center">
                <div className="text-xs text-[#7a7a7a] mb-1">Em Espera</div>
                <div className="text-2xl font-bold text-[#363636]">
                  {getOrdersByStatus(ORDER_STATUS.EM_ESPERA)}
                </div>
              </div>

              <div className="bg-white border border-[#dbdbdb] rounded-md p-4 text-center">
                <div className="text-xs text-[#7a7a7a] mb-1">Em Andamento</div>
                <div className="text-2xl font-bold text-[#363636]">
                  {getOrdersByStatus(ORDER_STATUS.EM_ANDAMENTO)}
                </div>
              </div>

              <div className="bg-white border border-[#dbdbdb] rounded-md p-4 text-center">
                <div className="text-xs text-[#7a7a7a] mb-1">Aprovado</div>
                <div className="text-2xl font-bold text-[#363636]">
                  {getOrdersByStatus(ORDER_STATUS.APROVADO)}
                </div>
              </div>

              <div className="bg-white border border-[#dbdbdb] rounded-md p-4 text-center">
                <div className="text-xs text-[#7a7a7a] mb-1">Pago</div>
                <div className="text-2xl font-bold text-[#363636]">
                  {getOrdersByStatus(ORDER_STATUS.PAGO)}
                </div>
              </div>

              <div className="bg-white border border-[#dbdbdb] rounded-md p-4 text-center">
                <div className="text-xs text-[#7a7a7a] mb-1">Separado/Enviado</div>
                <div className="text-2xl font-bold text-[#363636]">
                  {getOrdersByStatus(ORDER_STATUS.SEPARADO)}
                </div>
              </div>

              <div className="bg-white border border-[#dbdbdb] rounded-md p-4 text-center">
                <div className="text-xs text-[#7a7a7a] mb-1">Finalizado</div>
                <div className="text-2xl font-bold text-[#363636]">
                  {getOrdersByStatus(ORDER_STATUS.FINALIZADO)}
                </div>
              </div>

              <div className="bg-white border border-[#dbdbdb] rounded-md p-4 text-center">
                <div className="text-xs text-[#7a7a7a] mb-1">Cancelado</div>
                <div className="text-2xl font-bold text-[#363636]">
                  {getOrdersByStatus(ORDER_STATUS.CANCELADO)}
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <h2 className="text-2xl font-bold mb-4">Detalhes dos Pedidos</h2>
            {filteredOrders.length > 0 ? (
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Itens
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders
                      .sort((a, b) => b.orderId - a.orderId)
                      .map((order: any) => (
                        <tr key={'order-' + order.orderId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <strong className="text-gray-900">{order.orderId}</strong>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {order.contactInfo.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.contactInfo.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.items.reduce(
                              (sum: number, item: CartItemType) =>
                                sum + (item.amount || 0),
                              0,
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-medium text-gray-900">
                              R$ {formatCurrency(getTotal(order))}
                            </span>
                            {order.coupon && order.coupon.discount && (
                              <span className="ml-1">🎟️</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusTag status={order.status} size="is-small" />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">
                Nenhum pedido encontrado para o período selecionado.
              </p>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}

export default Relatorios
