import React from 'react'
import Product from './Product'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import styles from './ProductList.module.css'

const ProductList = ({ admin, loading, products, removeProduct, addToCart }) => {
    function getProductListOrMessage() {
        if (loading) {
            return (
                <div className={styles.loading}>
                    <LoadingSpinner />
                </div >
            )
        }
        else if (products.length === 0) {
            return <p>No data to display</p>
        }
        else {
            const productList = products.map(product => (
                <Product key={product.id} admin={admin} product={product} remove={removeProduct} addToCart={addToCart} />
            ))
            return (
                <div className={styles['product-list']}>
                    {productList}
                </div>
            )
        }
    }
    return getProductListOrMessage()
}

export default ProductList
