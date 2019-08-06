import React from 'react'
import formatPrice from '../../format-price'
import styles from './CartItem.module.css'

const CartItem = ({ item, remove, updateItem }) => {
    const { name, description, price, quantity } = item
    const total = price * quantity
    return (
        <li className={styles["cart-item"]} data-testid={`item-${item.id}`}>
            <div className={styles["name-and-description"]}>
                <div>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.description}>{description}</div>
                </div>
            </div>
            <div className={styles.center}>{formatPrice(price)}</div>
            <div className={styles.center}>
                <input
                    className={styles.quantity}
                    data-testid="item-quantity"
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={e => updateItem({ ...item, quantity: Number(e.target.value) })}
                />
            </div>
            <div className={styles.center}>
                <button className="primary" onClick={() => remove(item.id)}>Remove</button>
            </div>
            <div className={styles.center}>{formatPrice(total)}</div>
        </li>
    )
}

export default CartItem
