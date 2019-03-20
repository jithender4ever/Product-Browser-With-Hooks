import React from 'react'
import Product from './Product'
import styles from './Products.module.css'

const ProductList = ({products, removeProduct}) => {
    const productsJsx = products.map(product => (
        <Product key={product.id} product={product} remove={removeProduct} />
    ))
    return (
        <section>
            <div className={styles['product-list']}>                
                {productsJsx}
            </div>
        </section>
    )
}

export default ProductList
