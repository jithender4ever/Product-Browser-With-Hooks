import React from 'react'
import axios from 'axios'
import toastr from '../../toastr'
import 'toastr/build/toastr.min.css'
import ProductBrowser from './ProductBrowser'
import ShoppingCart from './ShoppingCart'

class ProductApp extends React.Component {
    apiUrl = 'http://localhost:4000/products'

    state = {
        products: [],
    }

    async addProduct(product) {
        try {
            const response = await axios.post(this.apiUrl, product)
            this.setState({
                products: [...this.state.products, response.data],
            })
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    async removeProduct(id) {
        try {
            const response = await axios.delete(`${this.apiUrl}/${id}`)
            this.setState({
                products: this.state.products.filter(product => product.id !== id),
            })
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get(this.apiUrl)
            this.setState({ products: response.data })
        } catch (error) {
            console.log(error)
            toastr.error(error)
        }
    }

    render() {
        return (
            <section>
                <ProductBrowser
                    products={this.state.products}
                    addProduct={this.addProduct.bind(this)}
                    removeProduct={this.removeProduct.bind(this)}
                />
                <ShoppingCart />
            </section>
        )
    }
}

export default ProductApp
