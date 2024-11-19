import React, { useEffect, useState } from "react";
import DashboardLayout from "hoc/dashboard.layout";
import { useFormik } from "formik";
import { errorHelper } from "utils/tool";
import { TextField,
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from "@mui/material";
import Loader from "utils/loader";
import { useDispatch, useSelector } from "react-redux";
import { validation } from "./formValues";
import { getAllBrands } from "store/actions/brands.action";
import { productAdd } from "store/actions/products.actions";
import {  useNavigate } from "react-router-dom";
import { clearProductAdd } from "store/actions";

const AddProduct = (props) => {

    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state=> state.notifications)
    const dispatch = useDispatch()
    const brands = useSelector(state=>state.brands)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            model:'',
            brand:'',
            frets:'',
            woodtype:'',
            description:'',
            price:'',
            available:'',
            shipping:false,
        },
        validationSchema: validation,
        onSubmit: (values)=>{
           handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        setLoading(true)
        dispatch(productAdd(values))
    }

    useEffect(()=>{
        if(notifications && notifications.success){
            navigate('/dashboard/admin/admin_products');
        }

        if(notifications && notifications.error){
            setLoading(false)
        }

    }, [notifications,navigate])

    useEffect(()=>{
        dispatch(getAllBrands())
    },[dispatch])

    useEffect(()=>{
        return() =>{  //executes when the component is unmounted
            clearProductAdd()
        }
    })

    return (
        <>
            <DashboardLayout title="Add product">
                {
                    loading ?
                    <Loader/>
                    :
                    <>
                        <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <TextField
                                    style={{width:'100%'}}
                                    name="model"
                                    label="Enter a model"
                                    variant="outlined"
                                    {...formik.getFieldProps('model')}
                                    {...errorHelper(formik,'model')}
                                />
                            </div>
                            <div className="form-group">
                            <TextField
                                    style={{width:'100%'}}
                                    name="frets"
                                    label="Enter the amount of frets"
                                    type="number"
                                    variant="outlined"
                                    {...formik.getFieldProps('frets')}
                                    {...errorHelper(formik,'frets')}
                                />
                            </div>
                            <div className="form-group">
                            <TextField
                                    style={{width:'100%'}}
                                    name="woodtype"
                                    label="Enter the wood type"
                                    variant="outlined"
                                    {...formik.getFieldProps('woodtype')}
                                    {...errorHelper(formik,'woodtype')}
                                />
                            </div>
                            <div className="form-group">
                                <FormControl variant="outlined">
                                    <h5>Select a brand</h5>
                                    <Select name="brand"
                                            {...formik.getFieldProps('brand')}
                                            error={formik.errors.brand && formik.touched.brand? true: false}
                                            >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        {brands && brands.all ? 
                                        brands.all.map((item)=>(
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                        </MenuItem>
                                        ))
                                        :null}
                                    </Select>
                                        {formik.errors.brand && formik.touched.brand ? 
                                        <FormHelperText error={true}>
                                            {formik.errors.brand}
                                        </FormHelperText>
                                        : null}
                                </FormControl>
                            </div>
                            <div className="form-group">
                            <TextField
                                    style={{width:'100%'}}
                                    name="description"
                                    label="Enter the description"
                                    variant="outlined"
                                    {...formik.getFieldProps('description')}
                                    {...errorHelper(formik,'description')}
                                    multiline
                                    rows={4}
                                />
                            </div>
                            <div className="form-group"> 
                            <TextField
                                    style={{width:'100%'}}
                                    name="price"
                                    label="Enter the price"
                                    variant="outlined"
                                    type="number"
                                    {...formik.getFieldProps('price')}
                                    {...errorHelper(formik,'price')}
                                />
                            </div>
                            <div className="form-group"> 
                            <TextField
                                    style={{width:'100%'}}
                                    name="available"
                                    label="Enter the available count"
                                    variant="outlined"
                                    type="number"
                                    {...formik.getFieldProps('available')}
                                    {...errorHelper(formik,'available')}
                                />
                            </div>
                            <Divider className="mt-3  mb-3"/>
                            <div className="form-group">
                                <FormControl variant="outlined">
                                    <h5>Do we offer free shipping</h5>
                                    <Select name="shipping"
                                        {...formik.getFieldProps('shipping')}
                                        error={formik.errors.brand && formik.touched.brand? true: false}
                                        >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>Nope</MenuItem>
                                    </Select>
                                        {formik.errors.shipping && formik.touched.shipping ? 
                                        <FormHelperText error={true}>
                                            {formik.errors.shipping}
                                        </FormHelperText>
                                        : null}
                                </FormControl>
                            </div>
                            <Divider className="mt-3  mb-3"/>
                            <Button variant="contained"
                                    color="primary"
                                    type="submit">
                                Add Product
                            </Button>
                        </form>
                    </>
                }
            </DashboardLayout>
        </>
    )
}


export default AddProduct