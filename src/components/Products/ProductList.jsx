import React from 'react'
import Product from './Product'
import styles from './ProductList.module.css'

const ProductList = ({admin, products, removeProduct}) => {
    const productList = products.map(product => (
        <Product key={product.id} admin={admin} product={product} remove={removeProduct} />
    ))

    const productListOrNoDataMessage = productList.length > 0 ? (
        <div className={styles['product-list']}>
            {productList}
        </div>
    ) : <p>No data to display</p>

    return productListOrNoDataMessage
}

export default ProductList
