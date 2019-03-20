import React from "react"
import classnames from 'classnames'
import formikEnhancer from './ValidationSchema'
import TextInput from './TextInput'
import styles from '../Products.module.css'

const NewProductForm = props => {
    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
    } = props;
    return (
        <div className={styles['new-form-container']}>
            <form className={styles['new-form']} onSubmit={handleSubmit}>
                <TextInput
                    id="name"
                    type="text"
                    label="Name"
                    error={touched.name && errors.name}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextInput
                    id="brand"
                    type="text"
                    label="Brand"
                    error={touched.brand && errors.brand}
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextInput
                    id="description"
                    type="text"
                    label="Description"
                    error={touched.description && errors.description}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextInput
                    id="price"
                    type="number"
                    label="Price"
                    error={touched.price && errors.price}
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextInput
                    id="rating"
                    type="number"
                    label="Rating"
                    error={touched.rating && errors.rating}
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div className={styles.buttons}>
                    <button
                        className={classnames(styles.outline, styles["form-button"])}
                        type="button"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                    >
                        Reset
                    </button>
                    <button
                        className={styles["form-button"]}
                        type="submit"
                        disabled={isSubmitting}>
                            Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
  
export default formikEnhancer(NewProductForm);

