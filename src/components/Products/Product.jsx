import React from 'react'
import styles from './Product.module.css'
import formatPrice from './format-price.js'

const Product = ({ admin, product, remove, addToCart }) => {
    const {name, brand, price, description, rating} = product
    return (
        <div className={styles.product}>
            <h3 className={styles['product-title']}>{name}
                {admin ? <button className={styles['delete-button']} onClick={() => remove(product.id)}>X</button> : null}
            </h3>
            <dl>
                <dt>Brand</dt><dd>{brand}</dd>
                <dt>Price</dt><dd>{formatPrice(price)}</dd>
                <dt>Description</dt><dd>{description}</dd>
                <dt>Rating</dt><dd>{rating} / 5</dd>
            </dl>
            <div className={styles.buttons}>
                <button className="primary" onClick={() => addToCart(product)}>Add to cart</button>
            </div>
        </div>
    )
}

export default Product
