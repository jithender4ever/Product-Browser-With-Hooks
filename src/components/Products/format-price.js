function formatPrice(price) {
    const dollars = Math.floor(price / 100)
    let cents = `${price % 100}`.padEnd(2, '0')
    return `$${dollars}.${cents}`
}

export default formatPrice;
