import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, waitForElement, prettyDOM, getByText as domGetByText } from 'react-testing-library'
import mockAxios from 'axios'
import ProductBrowser from './ProductBrowser'
import formatPrice from './format-price.js'
import styles from './Products.module.css'

const scheduler = typeof setImmedate === 'function' ? setImmediate : setTimeout
function flushEventQueue(millis = 0) {
    if (millis > 0) {
        return new Promise(res => setTimeout(res, millis) )
    }
    else {
        return new Promise(res => scheduler(res))
    }
}

const mockData = [
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

beforeAll(() => {
    mockAxios.get.mockImplementation(() => {
        return Promise.resolve({ data: mockData })
    })
    mockAxios.put.mockImplementation((url, data) => {
        return Promise.resolve({ data })
    })
    mockAxios.post.mockImplementation((url, data) => {
        return Promise.resolve({ data: { id: 100, ...data } })
    })
    mockAxios.delete.mockImplementation((url, data) => {
        const id = url.slice(1)
        const deletedProduct = mockData.find( t => t.id === Number(id))
        return Promise.resolve({ data: deletedProduct })
    })
})

afterEach(cleanup)

describe('Product Browser App', () => {
    it('displays the title', () => {
        const { getByText } = render(<ProductBrowser />)
        const message = getByText(/Products/i)
        expect(message).toBeInTheDocument()
    })
    it('renders a "No data to display" message when there are no products', async () => {
        mockAxios.get.mockImplementationOnce(() => {
            return Promise.resolve({ data: [] })
        })
        const { getByText } = render(<ProductBrowser />)
        await waitForElement(() => getByText('No data to display'))
    })
    it('renders 3 products with header, description, and price', async () => {
        const { container, getByText } = render(<ProductBrowser />)
        await waitForElement(() => getByText('16 oz. Fiberglass Handle Hammer'))
        const productList = container.querySelector(`.${styles['product-list']}`)
        expect(productList.childElementCount).toEqual(3)
        mockData.forEach(product => {
            const productElementHeader = getByText(product.name)
            const productElementCard = productElementHeader.parentNode
            // console.log('productElementCard:', prettyDOM(productElementCard))
            expect(domGetByText(productElementCard, product.brand)).toBeInTheDocument()
            expect(domGetByText(productElementCard, product.description)).toBeInTheDocument()
            expect(domGetByText(productElementCard, product.rating + ' / 5')).toBeInTheDocument()
            expect(domGetByText(productElementCard, `${formatPrice(product.price)}`)).toBeInTheDocument()
        })
    })
})
