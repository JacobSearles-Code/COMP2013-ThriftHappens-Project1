import CheckoutContainer from "./CheckoutContainer.tsx";
import NavBar from "./NavBar.tsx";
import ItemsContainer from "./ItemsContainer.tsx";
import type {ClothingCategory, ClothingProduct, ClothingSize, Fit} from "../Data/data.ts";
import {useState} from "react";

// Interface that holds an array of Products
interface ClothingData {
    data: ClothingProduct[];
}

// Interface that outlines all data types for the data.ts import
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

// Interface to provide structure as to what's needed to display in the shopping cart
export interface CartItems {
    id: number
    name: string;
    itemQuantity: number;
    price: number;
    total: number;
}

// Interface of props passed to the Cart Container (includes functions)
export interface CartContainerProps {
    cartItems: CartItems[];
    total: number;
    toggleIsVisible: () => void;
    isVisible: boolean;
    handleOnDelete: (id: number) => void;
    handleEmptyCart: () => void;
}

// Interface of props passed to the Cart Card (includes functions)
export interface CartCardProps {
    id: number;
    name: string;
    itemQuantity: number;
    price: number;
    handleOnDelete: (id: number) => void;
}

// Interface of props passed to the Item Container (includes functions)
export interface ItemContainerProps {
    data: ClothingProduct[];
    clothesInfo: ClothesInfo[];
    handleQtyChange: (id: number, value: number) => void;
    handleAddtoCart: (cartItem: CartItems) => void;
}

// Interface of props passed to the Clothing Card (includes functions)
export interface ClothingCardProps {
    clothesInfo: ClothesInfo;
    handleQtyChange: (value: number) => void;
    handleAddtoCart: (cartItem: CartItems) => void;
}

function ThriftHappens({ data }: ClothingData) {
    // States
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItems[]>([])
    const [total, setTotal] = useState<number>(0);
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

    // Handles quantity change while ensuring value stays withing range of 0 and stock quantity
    function handleQuantityChange(id: number ,value: number) {
        setProductInfo((prevData) =>
            prevData.map((info) =>
                info.id === id
                ? {...info, itemQuantity: Math.min( info.quantity, Math.max(0, info.itemQuantity + value))}
                : info,
            ),
        );
    }

    // A function that handles adding an item/items to a shopping cart and updating the subtotal
    // Also handles managing stock levels of clothing items
    function handleAddtoCart(cartItem: CartItems) {
        setCartItems((prevList) => {
            let itemExists = false;
            const itemList = prevList.map((entry) => {
                if (entry.id === cartItem.id) {
                    itemExists = true;
                    return {
                        ...entry,
                        itemQuantity: entry.itemQuantity + cartItem.itemQuantity
                    };
                }
                return entry;
            });
            if (itemExists) {
                return itemList;
            }
            return [...itemList, {...cartItem}];
        });

        setTotal(prevState => prevState + (cartItem.itemQuantity * cartItem.price));
        setProductInfo((prevData) =>
            prevData.map((info) =>
                info.id === cartItem.id
                    ? {
                        ...info,
                        quantity: info.quantity - cartItem.itemQuantity,
                        itemQuantity: 0
                    }
                    : info
            )
        );
    }

    // A function I'm using to help with animations and CSS
    // This is called to hide/show the shopping cart tab
    function toggleIsVisible() {
        setIsVisible(!isVisible)
        console.log(isVisible);
    }

    // A function used to delete items from the shopping cart
    // This returns the available stock to the itemCard when an item is removed
    // Will remove all instances of the item, not one by one
    function handleOnDelete(id: number) {
        let deletedQty = 0; // Holds the Qty of items when ID matches
        let deletedCost = 0.00; // Holds cost per unit when ID matches
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === id) {
                deletedQty = cartItems[i].itemQuantity;
                deletedCost = cartItems[i].price
                break;
            }
        }

        setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
        setProductInfo((prevInfo) => prevInfo.map((item) => item.id === id ? {...item, quantity: item.quantity + deletedQty} : item))
        setTotal((prevTotal) => prevTotal - (deletedQty * deletedCost))
    }

    // A function that will empty the current shopping cart, return the stock to the items, and reset the cart total
    function handleEmptyCart() {
        let deletedQty = 0; // Holds the Qty of items when ID matches
        // Loops through and empties items, plus should return the stock
        for (let i = 0; i < cartItems.length; i++) {
            deletedQty = cartItems[i].itemQuantity;
            setProductInfo((prevInfo) => prevInfo.map((item) => item.id === cartItems[i].id ? {...item, quantity: item.quantity + deletedQty} : item))
        }
        setCartItems([]);
        setTotal(0);
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <ItemsContainer data={data} clothesInfo={productInfo} handleQtyChange={handleQuantityChange} handleAddtoCart={handleAddtoCart}/>
            </div>
            // This div holds my revolutionary (Not really) pop in from the right side of the screen cart checkout
            <div className="cartDiv">
                <CheckoutContainer cartItems={cartItems} total={total} toggleIsVisible={toggleIsVisible} isVisible={isVisible} handleOnDelete={handleOnDelete} handleEmptyCart={handleEmptyCart}/>
                <div className={`cartBtn ${isVisible ? "closed" : "open"}`} onClick={toggleIsVisible}><p>&#x1F6D2; Cart</p>{ cartItems.length !== 0 && <div className="alertDot"></div>}</div>
            </div>
        </div>
    )
}

export default  ThriftHappens;