import { withFormik } from 'formik'
import * as Yup from 'yup'

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, "Too short")
            .required('A product name is required.'),
        brand: Yup.string()
            .min(2, "Too short")
            .required('A product brand is required.'),
        price: Yup.number()
            .min(1, 'Too small')
            .max(99999, 'Too big')
            .required('A price is required'),
        rating: Yup.number()
            .min(0, 'Too small')
            .max(5, schema => { console.log(schema); return `Too big, the max rating is ${schema.max}` })
    }),
    mapPropsToValues: () => ({
        name: '',
        brand: '',
        description: '',
        price: 0,
        rating: 0
    }),
    handleSubmit: (product, { props, setSubmitting, resetForm }) => {
        props.addProduct(product)
        setSubmitting(false)
        resetForm()
    },
    displayName: 'New Product Form',
})

export default formikEnhancer
