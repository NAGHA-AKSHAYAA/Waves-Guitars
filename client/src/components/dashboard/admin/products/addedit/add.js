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


const AddProduct = (props) => {

    const [loading, setLoadig] = useState(false)
    const notifications = useSelector(state=> state.notifications)
    const dispatch = useDispatch()

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
            console.log(values)
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
                        <form className="mt-3 article_form">
                            form
                        </form>
                    </>
                }
            </DashboardLayout>
        </>
    )
}


export default AddProduct