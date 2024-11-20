import * as Yup from 'yup'
export const formValues = {
    model:'',
    brand:'',
    frets:'',
    woodtype:'',
    description:'',
    price:'',
    available:'',
    shipping:false,
}

export const validation = () => (
    Yup.object({
        model:Yup.string()
                .required('Sorry, the model is required'),
        brand:Yup.string()
                .required('Sorry, brand is required'),
        frets:Yup.number()
                .required('Sorry, the fret is required')
                .oneOf([20,21,22,24], "Only 20,21,22,24 are allowed"),
        woodtype:Yup.string()
                .required('Woodtype is required'),
        description:Yup.string()
                .required('Description is required'),
        price:Yup.number()
                .required("Price is required")
                .min(1,"Min is 1")
                .max(10000, "Sorrt its 1000 max"),
        available:Yup.number().required("available is required"),
        shipping:Yup.boolean(),
    })
)

export const getValuesToEdit = (input) => {
        let product = input.data
        return {
                model: product.model,
                brand: product.brand._id,
                frets: product.frets,
                woodtype: product.woodtype,
                description:product.description,
                price:product.price,
                available:product.available,
                shipping:product.shipping,
                images:product.images
        }
}