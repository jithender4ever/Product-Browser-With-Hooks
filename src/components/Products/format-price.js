function formatPrice(price) {
    const dollars = Math.floor(price / 100)
    const cents = `${Math.round(price % 100)}`.padStart(2, '0')
    return `$${dollars}.${cents}`
}

export default formatPrice;
