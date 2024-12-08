import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper } from "utils/tool";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSiteVars } from "store/actions/site.action";



const SiteVars = () => {

    const site = useSelector(state => state.site)
    const dispatch = useDispatch()

    const formik = useFormik({
    initialValues: {
        address: site.vars.data.address,
        phone: site.vars.data.phone,
        hours: site.vars.data.hours,
        email: site.vars.data.email
        },
    validationSchema: Yup.object({
        address: Yup.string().min(3,'You need to add more').required("This is required"),
        phone: Yup.string().min(10,'You need to add more').required("This is required"),
        hours: Yup.string().max(100,'You need to add less').required("This is required"),
        email: Yup.string().email('You need to enter valid email').required("This is required")
    }),

    onSubmit: (values)=>{
        dispatch(updateSiteVars({
            _id : site.vars.data._id,
            ...values
        }))
        
    }
})



    return (
        <>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <TextField
                    style={{width: '100%'}}
                    name="address"
                    label="Enter the store address"
                    variant="outlined"
                    {...formik.getFieldProps('address')}
                    {...errorHelper(formik,'address')}
                />
            </div>
            <div className="form-group">
                <TextField
                    style={{width: '100%'}}
                    name="phone"
                    label="Enter the phone number"
                    variant="outlined"
                    {...formik.getFieldProps('phone')}
                    {...errorHelper(formik,'phone')}
                />
            </div>
            <div className="form-group">
                <TextField
                    style={{width: '100%'}}
                    name="hours"
                    label="Enter the hours"
                    variant="outlined"
                    {...formik.getFieldProps('hours')}
                    {...errorHelper(formik,'hpurs')}
                />
            </div>
            <div className="form-group">
                <TextField
                    style={{width: '100%'}}
                    name="email"
                    label="Enter the email"
                    variant="outlined"
                    {...formik.getFieldProps('email')}
                    {...errorHelper(formik,'email')}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                type="submit">
                    Edit the details
                </Button>

        </form>
        </>
    )
}

export default SiteVars