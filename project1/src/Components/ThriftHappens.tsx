import CheckoutContainer from "./CheckoutContainer.tsx";
import NavBar from "./NavBar.tsx";
import ItemsContainer from "./ItemsContainer.tsx";
import type {ClothingCategory, ClothingProduct, ClothingSize, Fit} from "../Data/data.ts";
import {useState} from "react";

interface ClothingData {
    data: ClothingProduct[];
}

export interface ClothesInfo {
    id: number;
    name: string;
    image: string;
    fit: Fit;
    category: ClothingCategory;
    color: string;
    description: string;
    size: ClothingSize;
    price: number;
    quantity: number;
    itemQuantity: number;
}

function ThriftHappens({ data }: ClothingData) {
    const [productInfo, setProductInfo] = useState<ClothesInfo[]>(() =>
        data.map((clothes) => ({
            id: clothes.id,
            name: clothes.name,
            image: clothes.image,
            fit: clothes.fit,
            category: clothes.category,
            color: clothes.color,
            description: clothes.description,
            size: clothes.size,
            price: clothes.price,
            quantity: clothes.quantity,
            itemQuantity: clothes.itemQuantity,
        })),
    );

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <ItemsContainer data={data} clothesInfo={productInfo}/>
            </div>
            <div>
                <CheckoutContainer />
            </div>
        </div>
    )
}

export default  ThriftHappens;