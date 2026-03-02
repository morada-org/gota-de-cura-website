import { useState } from 'react'
import { useDisclosure } from 'utils/hooks/useDisclosure'
import { ProductItem } from '../../interfaces/products'
import { CartService } from '../../services/CartService'
import { formatCurrency } from '../../utils/format'
import { OptionsSelectModal } from './OptionsSelectModal'
import { StyledProductItemDisplay } from './StyledProductItemDisplay'

const ProductItemDisplay = ({ item, type }: { item: ProductItem; type: string }) => {
  const [viewMode, setViewMode] = useState('')
  const { close, open, isOpen } = useDisclosure()

  const handleOrderClick = () => {
    if (item.optionsSet && item.optionsSet.length > 0) {
      open()
    } else {
      addToCart()
    }
  }

  const addToCart = (selectedTypes?: string[]) => {
    CartService.addItemToCart({
      ...item,
      name: item.name + (selectedTypes ? ` (${selectedTypes.join(', ')})` : ''),
      id: item.id,
      type,
      price: item.price,
    })
  }

  return (
    <StyledProductItemDisplay key={item.name} className="rounded-lg bg-white shadow-lg">
      <div
        className="item "
        onClick={() => setViewMode('expanded')}
        style={{
          background: `url('${item.image}') no-repeat center / cover`,
        }}
      >
        {item.seal && <img src={item.seal} className="seal-img" />}
        {item.priceDiscount && (
          <div className="price-discount">
            {item.priceDiscount}
            <br />
            <small>OFF</small>
          </div>
        )}
      </div>
      <div className="productText p-6">
        <p className="itemTitle ">{item.name}</p>
        {!item.available ? (
          <p className="font-semibold italic text-2xl my-3 text-gray-600">
            Produto não disponível
          </p>
        ) : (
          <div className="my-3">
            {Boolean(item.oldPrice) && (
              <p style={{ marginBottom: 0 }} className="old-price">
                De: <strong>{formatCurrency(item.oldPrice ?? 0)}</strong>
              </p>
            )}
            <p className="font-bold text-2xl">
              {item.oldPrice && 'Por: '}
              {formatCurrency(item.price)}
            </p>
          </div>
        )}
        <p
          className="itemDesc mb-4"
          dangerouslySetInnerHTML={{
            __html: item.description || '',
          }}
        ></p>
        <div style={{ display: 'flex' }}>
          {item.detailedDescription && (
            <button
              style={{ margin: '0 5px' }}
              onClick={() => setViewMode('expanded')}
              className="moreButton"
            >
              Saiba mais
            </button>
          )}
          {item.available && (
            <button
              style={{ margin: '0 5px', display: 'flex' }}
              onClick={handleOrderClick}
              className="moreButton"
            >
              <img
                src="/images/shopping-bag.png"
                style={{ width: 20, marginRight: '5px' }}
              />{' '}
              {item.optionsSet ? 'Selecionar kit' : 'Pedir'}
            </button>
          )}
        </div>
      </div>

      <div className={`modal ${viewMode}`}>
        <div className={`detailedItem modalItem`}>
          <p className="itemTitle">
            {type}: {item.name}
          </p>
          <div className="infoOverflowArea">
            <div
              className="image"
              style={{
                background: `url('${item.image}') no-repeat center / contain`,
                backgroundPosition: 'top',
              }}
            ></div>
            <div
              className="detailedDescription"
              dangerouslySetInnerHTML={{
                __html: item.detailedDescription || '',
              }}
            ></div>
          </div>
          <div className="buttonArea">
            <button onClick={() => setViewMode('')}>Entendi, obrigado!</button>
          </div>
        </div>
      </div>
      <OptionsSelectModal
        item={item}
        displayModal={isOpen}
        closeModal={close}
        addToCart={addToCart}
      />
    </StyledProductItemDisplay>
  )
}

export default ProductItemDisplay
