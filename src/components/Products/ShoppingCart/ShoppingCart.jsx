import React from 'react'
import classnames from 'classnames'
import formatPrice from '../format-price.js'
import CartItem from './CartItem'
import styles from './ShoppingCart.module.css'
import gridStyles from './Grid.module.css'

const shppingCartLabelClasses = classnames(gridStyles["grid-1of3"], styles["header"])
const headerClasses = classnames(gridStyles["grid-1of6"], styles["header"])
const labelClasses = styles["summary-label"]
const summaryDataClasses = styles["summary-data"]

function ShoppingCart({ items, remove }) {
    const cartItems = items.map(item => (
        <CartItem key={item.id} item={item} remove={remove} />
    ))
    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = subTotal * 0.07;
    const shipping = 10.00
    const grandTotal = subTotal + tax + shipping
    return (
        <div className={styles.cart}>
            <h1 className={styles["title"]}>Shopping Cart</h1>
            <div className={styles["cart-body"]}>
                <div className={styles["headers"]}>
                    <div className={shppingCartLabelClasses}>Items</div>
                    <div className={headerClasses}>Price</div>
                    <div className={headerClasses}>Quantity</div>
                    <div className={gridStyles["grid-1of6"]}></div>
                    <div className={headerClasses}>Total</div>
                </div>
                <ul className={styles["items"]}>
                    {cartItems}
                </ul>
                <div className={styles["summary"]}>
                    <div className={gridStyles["grid-1of6"]}>
                        <div className={labelClasses}>Total</div>
                        <div className={labelClasses}>Tax (7%)</div>
                        <div className={labelClasses}>Shipping</div>
                        <div className={labelClasses}>Grand total</div>
                    </div>
                    <div className={gridStyles["grid-1of6"]}>
                        <div className={summaryDataClasses}>{formatPrice(subTotal)}</div>
                        <div className={summaryDataClasses}>{formatPrice(tax)}</div>
                        <div className={summaryDataClasses}>{formatPrice(shipping)}</div>
                        <div className={summaryDataClasses}>{formatPrice(grandTotal)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
