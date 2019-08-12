const argv = require('yargs').argv

module.exports = () => {

    console.log('ARGS:', process.argv);
    const num = argv.n || 20

    const data = {
        admin: {
            value: false
        },
        products: [],
        cart: []
    }

    // Create lots of products
    for (let n = 0; n < num; n++) {
        data.products.push({
            id: n,
            name: `Product ${n + 1}`,
            brand: `Brand ${n % 3 + 1}`,
            description: `Product  ${n+1} is a very fine product. You should buy it right now. BUY IT NOW!!!`,
            price:  Math.floor(Math.random() * 30) * 100 + 99,         // from 99 cents to $30.99
            rating: Math.floor(Math.random() * 5) + 1                  // from 1 to 5
        })
    }

    // Put 2 of the products in the cart
    data.cart.push({ ...data.products[0], quantity: 1 })
    data.cart.push({ ...data.products[3], quantity: 2 })
    data.cart.push({ ...data.products[5], quantity: 1 })

    return data
}