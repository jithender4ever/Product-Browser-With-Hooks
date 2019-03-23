import React from 'react'
import axios from 'axios'
import Collapsible from 'react-collapsible'
import toastr from '../../toastr'
import 'toastr/build/toastr.min.css'
import NewProductForm from './NewProductForm'
import ProductList from './ProductList'

class ProductBrowser extends React.Component {

    apiUrl = 'http://localhost:4000/products'

    state = {
        products: []
    }

    async addProduct(product) {
        try {
            const response = await axios.post(this.apiUrl, product)
            this.setState({
                products: [...this.state.products, response.data]
            })
            this.collapsible.closeCollapsible()
            return response
        }
        catch(error) {
            toastr.error(error)
        }
    }

    async removeProduct(id) {
        try {
            const response = await axios.delete(`${this.apiUrl}/${id}`)
            this.setState({
                products: this.state.products.filter( product => product.id !== id )
            })
            return response
        }
        catch(error) {
            toastr.error(error)
        }
    }

    componentDidMount() {
        axios.get(this.apiUrl).then((res) => {
            this.setState({products: res.data})
        }).catch(function (error) {
            console.log(error)
            toastr.error(error)
        })
    }

    render() {
        return (
            <section>
                <h1>Product Browser</h1>
                <div style={{ maxWidth: "600px", textAlign: "center", margin: "10px auto" }}>
                    <Collapsible ref={ ref => this.collapsible=ref } trigger={"Add Item"}>
                        <NewProductForm addProduct={this.addProduct.bind(this)}/>
                    </Collapsible>
                </div>
                <ProductList products={this.state.products} removeProduct={this.removeProduct.bind(this)}/>
                    
            </section>
        )
    }
}

export default ProductBrowser
