import React from 'react'
import 'jest-dom/extend-expect'
import {
    render,
    cleanup,
    waitForElement,
    getByText as domGetByText,
    getByTestId as domGetByTestId,
    prettyDOM
} from 'react-testing-library'
import { Simulate } from 'react-dom/test-utils'
import mockAxios from 'axios'
import App from './AppNew'
import formatPrice from '../../format-price'
import styles from './App.module.css'

const scheduler = typeof setImmedate === 'function' ? setImmediate : setTimeout
function flushPromises(millis = 0) {
    if (millis > 0) {
        return new Promise(res => setTimeout(res, millis) )
    }
    else {
        return new Promise(res => scheduler(res))
    }
}

const mockProducts = [
    {
        "id": 1,
        "name": "16 oz. Fiberglass Handle Hammer",
        "brand": "HDX",
        "description": "The 16 oz. Claw Hammer features Perm bond construction between its head and handle for strength. It has a comfort cushion Shock Reduction Grip Protect your eyes from flying particles and dust.",
        "price": 697,
        "rating": 4.8
    },
    {
        "id": 2,
        "name": "16 oz. Rubber Mallet",
        "brand": "HDX",
        "description": "Wood handle for durability. Black rubber head won't mar surfaces. Designed for durability, performance and value.",
        "price": 547,
        "rating": 4.5
    },
    {
        "id": 3,
        "name": "22 oz. Steel Checkered Face Hammer",
        "brand": "Dewalt",
        "description": "Single-piece steel construction with oval strike face. 22-oz. head with optimal weight distribution. Magnetic nail starter for easy nail placement.",
        "price": 2597,
        "rating": 5
    },
]

const mockCart = [
    {
        "id": 11,
        "name": "Simple Drill",
        "brand": "Dewalt",
        "description": "Just a simple drill.",
        "price": 999,
        "rating": 3,
        "quantity": 3
    },
    {
        "id": 12,
        "name": "Fancy Drill",
        "brand": "Dewalt",
        "description": "Just a fancy drill.",
        "price": 1999,
        "rating": 5,
        "quantity": 1
    }
]

function registerMockData(mockData) {
    const methods = ['get', 'put', 'post', 'delete']
    methods.forEach(method => {
        mockAxios[method].mockImplementation((url, data) => {
            const path = new URL(url).pathname
            const response = mockData[method][path]
            if (response) {
                return typeof response === 'function' ? response(data) : response
            }
            else {
                throw new Error(`never found data for response: ${method} ${path}`)
            }
        })
    })
}

function getDefaultMockData() {
    const mockData = {
        get: {},
        put: {},
        post: {},
        delete: {}
    }
    mockData.get['/admin'] = data => Promise.resolve({ data: { value: false } })
    mockData.put['/admin'] = data => Promise.resolve({ data })

    mockData.get['/products'] = data => Promise.resolve({ data: mockProducts })
    mockData.post['/products'] = data => Promise.resolve({ data: { id: 100, ...data } })
    mockData.delete['/products/2'] = data => Promise.resolve({ data: mockProducts.find( t => t.id === Number(id)) })

    mockData.get['/cart'] = data => Promise.resolve({ data: mockCart })
    mockData.put['/cart'] = data => Promise.resolve({ data })
    mockData.post['/cart'] = data => Promise.resolve({ data })
    mockData.delete['/cart/11'] = data => Promise.resolve({ data: mockCart.find( t => t.id === 11) })

    return mockData
}

function printMockData(mockData) {
    const str = Object.keys(mockData).map(method => `\t${method}: ${Object.keys(mockData[method]).join(' ')}`).join('\n')
    console.log(`mockData:\n${str}`)
}

beforeEach(() => {
    registerMockData(getDefaultMockData())
})

afterEach(cleanup)

describe('Product Browser App', () => {
    it('displays the title', () => {
        const { getByText } = render(<App />)
        const message = getByText(/Products/i)
        expect(message).toBeInTheDocument()
    })
    it('renders a "No data to display" message when there are no products', async () => {
        const mockData = getDefaultMockData()
        mockData.get['/products'] = data => Promise.resolve({ data: [] })
        // printMockData(mockData);
        registerMockData(mockData)
        const { getByText } = render(<App />)
        await waitForElement(() => getByText('No data to display'))
    })
    it('renders 3 products with header, description, and price', async () => {
        const { container, getByText } = render(<App />)
        await waitForElement(() => getByText('16 oz. Fiberglass Handle Hammer'))
        const productList = container.querySelector(`.${styles['product-list']}`)
        expect(productList.childElementCount).toEqual(mockProducts.length)
        mockProducts.forEach(product => {
            const productElementHeader = getByText(product.name)
            const productElementCard = productElementHeader.parentNode
            // console.log('productElementCard:', prettyDOM(productElementCard))
            expect(domGetByText(productElementCard, product.brand)).toBeInTheDocument()
            expect(domGetByText(productElementCard, product.description)).toBeInTheDocument()
            expect(domGetByText(productElementCard, product.rating + ' / 5')).toBeInTheDocument()
            expect(domGetByText(productElementCard, `${formatPrice(product.price)}`)).toBeInTheDocument()
        })
    })
    it('displays some cart items', async () => {
        const { getByText, getByTestId } = render(<App />)
        await waitForElement(() => getByText(mockCart[0].name))
        const cartItems = getByTestId("cart-items")
        expect(cartItems.childElementCount).toEqual(mockCart.length)
        mockCart.forEach(item => {
            const itemElement = domGetByTestId(cartItems, `item-${item.id}`)
            // console.log('itemElement:', prettyDOM(itemElement))
            expect(domGetByText(itemElement, item.name)).toBeInTheDocument()
            expect(domGetByText(itemElement, item.description)).toBeInTheDocument()
            const quantityFromDom = Number(domGetByTestId(itemElement, 'item-quantity').value)
            expect(quantityFromDom).toBe(item.quantity)
        })
    })
    it('can add a product to the shopping cart', async () => {
        const { getByText, getByTestId } = render(<App />)

        // find the productToAdd and it's addToCart button and click it
        const productToAdd = mockProducts[1]
        const product = await waitForElement(() => getByText(productToAdd.name))
        const addToCartButton = domGetByText(product.parentNode, 'Add to cart')
        const numCartItems = getByTestId("cart-items").childElementCount
        Simulate.click(addToCartButton)

        // wait for promises to resolve
        await flushPromises()

        // verify that we have another item in our cart
        const cartItems = getByTestId("cart-items")
        expect(cartItems.childElementCount).toEqual(numCartItems + 1)
        const addedItem = domGetByTestId(cartItems, `item-${productToAdd.id}`)
        const quantityFromDom = Number(domGetByTestId(addedItem, 'item-quantity').value)
        expect(quantityFromDom).toBe(1)
        // console.log('addedItem:', prettyDOM(addedItem))
    })
    it('can remove a product from the shopping cart', async () => {
        const { getByText, getByTestId, queryByTestId } = render(<App />)
        await waitForElement(() => getByText(mockCart[0].name))
        const cartItems = getByTestId("cart-items")
        const itemToRemove = mockCart[0]

        // find the itemToRemove and it's addToCart button and click it
        const item = (await waitForElement(() => getByText(itemToRemove.name))).closest('li')
        // console.log('item:', prettyDOM(item))
        const removeFromCartButton = domGetByText(item, 'Remove')
        const numCartItems = cartItems.childElementCount
        Simulate.click(removeFromCartButton)

        // wait for promises to resolve
        await flushPromises()

        // verify that we have 1 less item in our cart
        const updatedCartItems = getByTestId("cart-items")
        expect(updatedCartItems.childElementCount).toEqual(numCartItems - 1)

        // verify that itemToRemove was removed
        expect(queryByTestId(`item-${itemToRemove.id}`)).toBeNull()
    })
})
