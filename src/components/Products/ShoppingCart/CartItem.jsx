import React from 'react'
import classnames from 'classnames'
import formatPrice from '../format-price.js'
import styles from './CartItem.module.css'
import gridStyles from './Grid.module.css'

const centerAnd1of6 = classnames(gridStyles["grid-1of6"], styles.center);
const nameAndDescription = classnames(gridStyles["grid-1of3"], styles["name-and-description"]);

const CartItem = ({ item, remove, updateItem }) => {
    const { name, description, price, quantity } = item
    const total = price * quantity
    return (
        <li className={styles["cart-item"]}>
            <div className={nameAndDescription}>
                <div>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.description}>{description}</div>
                </div>
            </div>
            <div className={centerAnd1of6}>{formatPrice(price)}</div>
            <div className={centerAnd1of6}>
                <input
                    className={styles.quantity}
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={e => updateItem({ ...item, quantity: Number(e.target.value) })}
                />
            </div>
            <div className={centerAnd1of6}>
                <button className="primary" onClick={() => remove(item.id)}>Remove</button>
            </div>
            <div className={centerAnd1of6}>{formatPrice(total)}</div>
        </li>
    )
}

export default CartItem
