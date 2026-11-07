import type { ClothingCardProps } from "./ThriftHappens.tsx";

function ItemCard({
    clothesInfo,
    handleQtyChange,
    handleAddtoCart,
                  }: ClothingCardProps) {

    return (
        <div className="clothesCard">
            <img className="clothesImg" src={clothesInfo.image} alt={clothesInfo.description}/>
            <div className="clothesCardBody">
                <h3>{clothesInfo.name}</h3>
                <h3>{clothesInfo.size}</h3>
                <div className="cardBody">
                    <p>Fit: {clothesInfo.fit} - Style: {clothesInfo.category}</p>
                    <p>Color: {clothesInfo.color}</p>
                    <p>{clothesInfo.description}</p>
                    <p>${clothesInfo.price.toFixed(2)}/each</p>
                    <p>{clothesInfo.quantity > 0 ? `Stock: ${clothesInfo.quantity - clothesInfo.itemQuantity}`: "Sorry! Out of Stock!"}</p>
                </div>
                <div className="itemCardBtn">
                    <button disabled={clothesInfo.quantity === 0} onClick={() => handleQtyChange(1)}>+</button><span> {clothesInfo.itemQuantity} </span><button disabled={clothesInfo.quantity === 0} onClick={() => handleQtyChange(-1)}>-</button>
                    <button disabled={clothesInfo.quantity === 0 || clothesInfo.itemQuantity === 0} onClick={() => handleAddtoCart(({
                        id: clothesInfo.id,
                        name: clothesInfo.name,
                        itemQuantity: clothesInfo.itemQuantity,
                        price: clothesInfo.price,
                        total: clothesInfo.price * clothesInfo.itemQuantity,
                    }))}
                    >Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default  ItemCard;