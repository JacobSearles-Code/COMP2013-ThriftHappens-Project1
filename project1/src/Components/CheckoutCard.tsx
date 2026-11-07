import type {CartCardProps} from "./ThriftHappens.tsx";

function CheckoutCard({
                          id,
                          name,
                          itemQuantity,
                          price,
                          handleOnDelete,
                      }: CartCardProps) {
    return (
        <div>
            <p>{name} x{itemQuantity}</p>
            <p>${price.toFixed(2)}/each <button onClick={() => handleOnDelete(id) }>Remove</button></p>
        </div>
    )
}

export default CheckoutCard;