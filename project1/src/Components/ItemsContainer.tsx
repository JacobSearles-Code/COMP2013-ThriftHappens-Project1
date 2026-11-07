import ItemCard from './ItemCard.tsx'
import type {ItemContainerProps} from "./ThriftHappens.tsx";


function ItemsContainer({
    data,
    clothesInfo,
    handleQtyChange,
    handleAddtoCart,
                        }: ItemContainerProps) {

    return (
        <div className="cardContainer">
            {/* Maps incoming data to ItemCards to display all items */}
            {data.map((clothes) => {
                const info = clothesInfo.find((info) => info.id === clothes.id);
                if (!info) {
                    return null;
                }

                return (
                    <ItemCard key={clothes.id} clothesInfo={info}
                        handleQtyChange={(value) => handleQtyChange(clothes.id, value)}
                        handleAddtoCart={handleAddtoCart}
                    />
                )
            })}

        </div>
    )
}

export default  ItemsContainer;