import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Stack } from 'react-bootstrap'
import UseShoppingCart from './context/UseShoppingCart'
import CartItem from './CartItem'
import formatCurrency from './utilities/formatCurrency'
import StoreItems from "./data/items.json"

type shoppingCartProps = {
  isOpen:boolean
}

const ShoppingCart = ({isOpen} : shoppingCartProps) => {
  const { closeCart, cartItems } = UseShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <OffcanvasHeader closeButton>
        <OffcanvasTitle>Cart</OffcanvasTitle>
      </OffcanvasHeader>
      <OffcanvasBody>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item}/>
          ))}
          <div className='me-auto fw-bold fs-5'>
            Total{" "} 
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = StoreItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </OffcanvasBody>
    </Offcanvas>
  )
}

export default ShoppingCart