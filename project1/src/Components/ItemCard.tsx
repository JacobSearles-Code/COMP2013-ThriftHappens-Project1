import type {ClothesInfo} from "./ThriftHappens.tsx";

interface ClothingProps {
    clothesInfo: ClothesInfo;
}

function ItemCard({
    clothesInfo,
                  }: ClothingProps) {
    return (
        <div className="clothesCard">
            <img className="clothesImg" src={clothesInfo.image} alt={clothesInfo.description}/>
            <div className="clothesCardBody">
                <h3>{clothesInfo.name} - {clothesInfo.size}</h3>
                <p>Fit: {clothesInfo.fit}</p>
                <p>Style: {clothesInfo.category}</p>
                <p>Color: {clothesInfo.color}</p>
                <p>${clothesInfo.price.toFixed(2)}</p>
                <p>Stock: {clothesInfo.quantity - clothesInfo.itemQuantity}</p>
            </div>
        </div>
    )
}

export default  ItemCard;