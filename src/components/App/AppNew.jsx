import React, { useState, useEffect } from 'react'
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

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [admin, flipAdmin] = useState({ value: false});
    const [loading, toggleLoading] = useState(false);

    const toggleAdmin = async () => {
        try {
            const response = await axios.put(adminUrl, { value: !admin.value })
            flipAdmin(response.data);
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    const addProduct = async (product) => {
        try {
            const response = await axios.post(productsUrl, product)
            setProducts([...products, response.data])
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.delete(`${productsUrl}/${id}`)
            // filter out the product that was removed
            setProducts(products.filter(product => product.id !== id));
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    const addProductToCart = async (product) => {
        try {
            const cartItem = cart.find(item => item.id === product.id)

            // if we are adding a product that already exists in the cart, then update the quantity
            if (cartItem) {
                const item = { ...cartItem, quantity: cartItem.quantity + 1 }
                return updateItemInCart(item)
            }
            // else append the product to the cart
            else {
                const response = await axios.post(cartUrl, { ...product, quantity: 1 })
                setCart([...cart, response.data]);
                return response
            }
        } catch (error) {
            toastr.error(error)
        }
    }

    const updateItemInCart = async (item) => {
        try {
            const response = await axios.put(`${cartUrl}/${item.id}`, item)
            const updatedProduct = response.data
            // merge the resonse data into the local cart data
            setCart(cart.map(item => item.id === updatedProduct.id ? updatedProduct : item))
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    const removeItemFromCart = async (id) => {
        try {
            const response = await axios.delete(`${cartUrl}/${id}`)
            setCart(cart.filter(product => product.id !== id))
            return response
        } catch (error) {
            toastr.error(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                toggleLoading(true)

                const adminResponse = await axios.get(adminUrl)
                const productsResponse = await axios.get(productsUrl)
                const cartResponse = await axios.get(cartUrl)

                toggleLoading(false);
                flipAdmin(adminResponse.data);
                setProducts(productsResponse.data);
                setCart(cartResponse.data);
            } catch (error) {
                toggleLoading(false);
                toastr.error(error)
            }
        };
        fetchData();
    }, []);

        return (
            <div className={styles.container}>
                <header>
                    <Navbar admin={admin.value} toggleAdmin={toggleAdmin} />
                </header>
                <div className={styles.middle}>
                    <main>
                        <ProductBrowser
                            admin={admin.value}
                            loading={loading}
                            products={products}
                            addProduct={addProduct}
                            removeProduct={removeProduct}
                            addToCart={addProductToCart}
                        />
                    </main>
                    <aside>
                        <ShoppingCart
                            items={cart}
                            removeItem={removeItemFromCart}
                            updateItem={updateItemInCart}
                        />
                    </aside>
                </div>
            </div>
        )
}

export default App
