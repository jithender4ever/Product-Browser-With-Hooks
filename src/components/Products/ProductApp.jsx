import React from 'react'
import axios from 'axios'
import toastr from '../../toastr'
import 'toastr/build/toastr.min.css'
import ProductBrowser from './ProductBrowser'
import ShoppingCart from './ShoppingCart/ShoppingCart'
import styles from './ProductApp.module.css'

const apiUrl = 'http://localhost:4000'
const productsUrl = `${apiUrl}/products`
const cartUrl = `${apiUrl}/cart`
const admin = false;
class ProductApp extends React.Component {

    state = {
        products: [],
        cart: []
    }

    async addProduct(product) {
        try {
            const response = await axios.post(productsUrl, product)
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
            const response = await axios.delete(`${productsUrl}/${id}`)
            this.setState({
                products: this.state.products.filter(product => product.id !== id),
            })
            return response
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
                    cart: [...this.state.cart, response.data],
                })
                return response
            }
        } catch (error) {
            toastr.error(error)
        }
    }

    async removeProductFromCart(id) {
        try {
            const response = await axios.delete(`${cartUrl}/${id}`)
            this.setState({
                cart: this.state.cart.filter(product => product.id !== id),
            })
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    async componentDidMount() {
        try {
            const productsResponse = await axios.get(productsUrl)
            const cartResponse = await axios.get(cartUrl)
            this.setState({
                products: productsResponse.data,
                cart: cartResponse.data
            })
        } catch (error) {
            console.log(error)
            toastr.error(error)
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <header>
                    <div className={styles["logo-and-title"]}>
                        <img src="thd-logo.svg" alt="The Home Depot"/>
                        <h1 className={styles.title}>React Product Browser and Shopping Cart App</h1>
                    </div>
                    {admin ? <p>Admin</p> : null}
                </header>
                <div className={styles.middle}>
                    <main>
                        <ProductBrowser
                            admin={admin}
                            products={this.state.products}
                            addProduct={this.addProduct.bind(this)}
                            removeProduct={this.removeProduct.bind(this)}
                            addToCart={this.addProductToCart.bind(this)}
                        />
                    </main>
                    <aside>
                        <ShoppingCart
                            items={this.state.cart}
                            removeItem={this.removeProductFromCart.bind(this)}
                            updateItem={this.updateItemInCart.bind(this)}
                        />
                    </aside>
                </div>
            </div>
        )
    }
}

export default ProductApp
