import React from 'react'
import styles from './Products.module.css'
import formatPrice from './format-price.js'

const Product = ({ product, remove }) => {
    const {name, brand, price, description, quantity, rating} = product
    return (
        <div className={styles.product}>
            <h3 className={styles.title}>{name}
                <button className={styles['delete-button']} onClick={() => remove(product.id)}>X</button>
            </h3>
            <hr/>
            <dl>
                <dt>Brand</dt><dd>{brand}</dd>
                <dt>Price</dt><dd>{formatPrice(price)}</dd>
                <dt>Description</dt><dd>{description}</dd>
                
                {quantity && (
                    <><dt>Quantity</dt><dd>{quantity}</dd></>
                )}

                <dt>Rating</dt><dd>{rating} / 5</dd>
            </dl>
        </div>
    )
}

export default Product
