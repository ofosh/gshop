import { Button, Card } from "react-bootstrap"
import formatCurrency from "./utilities/formatCurrency"
import UseShoppingCart from "./context/UseShoppingCart"

type StoreItemprop = {
  id: number,
  name: string,
  price: number,
  imgUrl: string,
}
const StoreItem = ({ id, name, price, imgUrl }: 
  StoreItemprop) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = UseShoppingCart()
  const quantity = getItemQuantity(id)
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imgUrl} height="200px" style={{objectFit: "cover"}} />
      <Card.Body className="d-flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
        <span className="fs-2">{name}</span>
        <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={()=> increaseCartQuantity(id)}>+ Add to Cart</Button>
          ) : (<div 
            className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
            <div 
              className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem"}}
            >
              <Button onClick={()=> decreaseCartQuantity(id)}>-</Button>
              <div>
                <span className="fs-3">{quantity}</span> in Cart
              </div>
              <Button onClick={()=> increaseCartQuantity(id)}>+</Button>
            </div>
            <Button className="bg-danger" onClick={()=> removeFromCart(id)}>Remove</Button>
          </div>)}
        </div>
      </Card.Body>
    </Card>
  )
}

export default StoreItem