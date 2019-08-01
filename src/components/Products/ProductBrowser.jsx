import React from 'react'
import Collapsible from 'react-collapsible'
import NewProductForm from './NewProductForm'
import ProductList from './ProductList'

class ProductBrowser extends React.Component {
    
    addProductAndCloseForm(product) {
        this.collapsible.closeCollapsible()
        this.props.addProduct(product)
    }

    render() {
        const { products, removeProduct } = this.props
        return (
            <section>
                <h1>Products</h1>
                <div style={{ maxWidth: '600px', textAlign: 'center', margin: '10px auto' }}>
                    <Collapsible ref={ref => (this.collapsible = ref)} trigger={'Add Item'}>
                        <NewProductForm addProduct={this.addProductAndCloseForm.bind(this)} />
                    </Collapsible>
                </div>
                <ProductList products={products} removeProduct={removeProduct} />
            </section>
        )
    }
}

export default ProductBrowser
