import React from "react"

class NewProductFormOld extends React.Component {

    state = {
        newProduct: {
            name: '',
            brand: '',
            description: '',
            price: 0,
            rating: 0
        }
    }

    onChange = (propName, val) => {
        this.setState({
            newProduct: { ...this.state.newProduct, [propName]: val }
        })
    }
    
    render() {
        const { addProduct } = this.props
        return (
            <form
                data-testid="new-product-form"
                onSubmit={e => {
                    e.preventDefault()
                    addProduct(this.state.newProduct)
                }}
            >
                <input
                    type="text"
                    placeholder = "Name"
                    value={this.state.newProduct.name}
                    onChange={(e) => this.onChange('name', e.target.value)}
                />
                <input
                    type="text"
                    placeholder = "Brand"
                    value={this.state.newProduct.brand}
                    onChange={(e) => this.onChange('brand', e.target.value)}
                />
                <input
                    type="text"
                    placeholder = "Description"
                    value={this.state.newProduct.description}
                    onChange={(e) => this.onChange('description', e.target.value)}
                />
                <input
                    type="number"
                    placeholder = "Price"
                    value={this.state.newProduct.price}
                    onChange={(e) => this.onChange('price', e.target.value)}
                />
                <input
                    type="number"
                    placeholder = "Rating"
                    value={this.state.newProduct.rating}
                    onChange={(e) => this.onChange('rating', e.target.value)}
                />
                <input type="submit"/>
            </form>
        )
    }
}

export default NewProductFormOld