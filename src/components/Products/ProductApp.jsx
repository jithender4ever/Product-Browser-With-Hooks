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
                        />
                    </main>
                    <aside>
                        <ShoppingCart items={this.state.cart} />
                    </aside>
                </div>
            </div>
        )
    }
}

export default ProductApp
