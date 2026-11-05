import ItemCard from './ItemCard.tsx'
import type {ClothesInfo} from "./ThriftHappens.tsx";
import type {ClothingProduct} from "../Data/data.ts";

interface ContainerProps {
    data: ClothingProduct[];
    clothesInfo: ClothesInfo[];
}

function ItemsContainer({
    data,
    clothesInfo,
                        }: ContainerProps) {
    return (
        <div className="cardContainer">
            {data.map((clothes) => {
                const info = clothesInfo.find((info) => info.id === clothes.id);

                if (!info) {
                    return null;
                }

                return (
                    <ItemCard key={clothes.id} clothesInfo={info}/>
                )
            })}

        </div>
    )
}

export default  ItemsContainer;