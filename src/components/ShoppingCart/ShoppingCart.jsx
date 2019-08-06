import React from 'react'
import formatPrice from '../../format-price.js'
import CartItem from './CartItem'
import styles from './ShoppingCart.module.css'

function ShoppingCart({ items, removeItem, updateItem }) {
    const cartItems = items.map(item => (
        <CartItem key={item.id} item={item} remove={removeItem} updateItem={updateItem} />
    ))
    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = subTotal * 0.07
    const shipping = items.length * 200
    const grandTotal = subTotal + tax + shipping
    return (
        <div className={styles.cart}>
            <h1 className={styles["title"]}>Shopping Cart</h1>
            <div className={styles["cart-body"]}>
                <div className={styles["headers"]}>
                    <div className={styles["item-header"]}>Items</div>
                    <div className={styles["header"]}>Price</div>
                    <div className={styles["header"]}>Quantity</div>
                    <div className={styles["grid-1of6"]}></div>
                    <div className={styles["header"]}>Total</div>
                </div>
                <ul className={styles["items"]} data-testid="cart-items">
                    {cartItems}
                </ul>
                <div className={styles["summary"]}>
                    <div className={styles["grid-1of6"]}>
                        <div className={styles["summary-label"]}>Total</div>
                        <div className={styles["summary-label"]}>Tax (7%)</div>
                        <div className={styles["summary-label"]}>Shipping</div>
                        <div className={styles["summary-label"]}>Grand total</div>
                    </div>
                    <div className={styles["grid-1of6"]}>
                        <div className={styles["summary-data"]}>{formatPrice(subTotal)}</div>
                        <div className={styles["summary-data"]}>{formatPrice(tax)}</div>
                        <div className={styles["summary-data"]}>{formatPrice(shipping)}</div>
                        <div className={styles["summary-data"]}>{formatPrice(grandTotal)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
