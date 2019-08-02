import React from 'react'
import Collapsible from 'react-collapsible'
import NewProductForm from './NewProductForm'
import ProductList from './ProductList'

class CollapsibleForm extends React.Component {

    addProductAndCloseForm(product) {
        this.collapsible.closeCollapsible()
        this.props.addProduct(product)
    }

    render() {
        return (
            <div style={{ maxWidth: '600px', textAlign: 'center', margin: '10px auto' }}>
                <Collapsible ref={ref => (this.collapsible = ref)} trigger={'Add Product'}>
                    <NewProductForm addProduct={this.addProductAndCloseForm.bind(this)} />
                </Collapsible>
            </div>
        )
    }
}

function ProductBrowser({ admin, products, addProduct, removeProduct, addToCart }) {
    return (
        <div>
            <h1>Browse Products</h1>
            {admin ? <CollapsibleForm addProduct={addProduct} /> : null}
            <ProductList admin={admin} products={products} removeProduct={removeProduct} addToCart={addToCart} />
        </div>
    )
}

export default ProductBrowser
