import CheckoutCard from "./CheckoutCard.tsx";
import type {CartContainerProps} from "./ThriftHappens.tsx";

function CheckoutContainer({cartItems, total, toggleIsVisible, isVisible, handleOnDelete, handleEmptyCart}:CartContainerProps) {
    return (
        <div className={`cartContainer ${isVisible ? "open" : "closed"}`}>
            <h1>Your Cart <span><a onClick={toggleIsVisible} className="exitBtn">X</a></span></h1>
            <button onClick={handleEmptyCart}>Empty Cart</button>
            <div className="cartItemsDiv">
                {/* Displays "Cart is empty" when cartItems array is empty, otherwise it will populate the cart */}
                <p>{cartItems.length === 0 && "Cart is Empty"}</p>
                {cartItems.map((item) => <CheckoutCard key={item.id} {...item} handleOnDelete={handleOnDelete}/>)}
            </div>
            <div className="cartTotals">
                <h3>Subtotal: ${total > 0 ? total.toFixed(2) : 0.00}</h3>
                <h3>Total: ${total > 0 ? (total * 1.13).toFixed(2) : 0.00}</h3>
            </div>
        </div>
    )
}

export default  CheckoutContainer;