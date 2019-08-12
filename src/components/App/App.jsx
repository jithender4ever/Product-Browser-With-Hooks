import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import ProductBrowser from '../ProductBrowser/ProductBrowser'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import toastr from '../../toastr'
import styles from './App.module.css'
import 'toastr/build/toastr.min.css'

const apiUrl = 'http://localhost:4000'
const adminUrl = `${apiUrl}/admin`
const productsUrl = `${apiUrl}/products`
const cartUrl = `${apiUrl}/cart`

class App extends Component {
    state = {
        loading: false,
        admin: { value: false },
        products: [],
        cart: []
    }

    async toggleAdmin() {
        const admin = { value: !this.state.admin.value }
        try {
            const response = await axios.put(adminUrl, admin)
            this.setState({
                admin: response.data
            })
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    async addProduct(product) {
        try {
            const response = await axios.post(productsUrl, product)
            this.setState({
                products: [...this.state.products, response.data]
            })
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    async removeProduct(id) {
        try {
            const response = await axios.delete(`${productsUrl}/${id}`)
            // filter out the product that was removed
            this.setState({
                products: this.state.products.filter(product => product.id !== id)
            })
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    async addProductToCart(product) {
        try {
            const cartItem = this.state.cart.find(item => item.id === product.id)
            // if we are adding a product that already exists in the cart, then update the quantity
            if (cartItem) {
                const item = { ...cartItem, quantity: cartItem.quantity + 1 }
                return this.updateItemInCart(item)
            }
            // else append the product to the cart
            else {
                const response = await axios.post(cartUrl, { ...product, quantity: 1 })
                this.setState({
                    cart: [...this.state.cart, response.data]
                })
                return response
            }
        } catch (error) {
            toastr.error(error)
        }
    }

    async updateItemInCart(item) {
        try {
            const response = await axios.put(`${cartUrl}/${item.id}`, item)
            const updatedProduct = response.data
            // merge the resonse data into the local cart data
            this.setState({
                cart: this.state.cart.map(item => item.id === updatedProduct.id ? updatedProduct : item)
            })
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    async removeItemFromCart(id) {
        try {
            const response = await axios.delete(`${cartUrl}/${id}`)
            this.setState({
                cart: this.state.cart.filter(product => product.id !== id)
            })
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            const adminResponse = await axios.get(adminUrl)
            const productsResponse = await axios.get(productsUrl)
            const cartResponse = await axios.get(cartUrl)
            this.setState({
                loading: false,
                admin: adminResponse.data,
                products: productsResponse.data,
                cart: cartResponse.data
            })
        } catch (error) {
            this.setState({
                loading: false
            })
            console.log(error)
            toastr.error(error)
        }
    }

    render() {
        const { admin, loading, products, cart } = this.state
        return (
            <div className={styles.container}>
                <header>
                    <Navbar admin={admin.value} toggleAdmin={this.toggleAdmin.bind(this)} />
                </header>
                <div className={styles.middle}>
                    <main>
                        <ProductBrowser
                            admin={admin.value}
                            loading={loading}
                            products={products}
                            addProduct={this.addProduct.bind(this)}
                            removeProduct={this.removeProduct.bind(this)}
                            addToCart={this.addProductToCart.bind(this)}
                        />
                    </main>
                    <aside>
                        <ShoppingCart
                            items={cart}
                            removeItem={this.removeItemFromCart.bind(this)}
                            updateItem={this.updateItemInCart.bind(this)}
                        />
                    </aside>
                </div>
            </div>
        )
    }
}

export default App
