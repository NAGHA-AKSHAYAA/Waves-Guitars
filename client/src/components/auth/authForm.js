import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";

import * as Yup from 'yup'
import Loader from  "utils/loader";


import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { errorHelper } from "utils/tool";
import { userRegister, userSignIn } from "store/actions/users.actions";

const AuthForm = (props) => {

    const notifications = useSelector(state => state.notifications)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {email: 'naghaakshayaa@gmail.com', password: 'test123'},
        validationSchema: Yup.object({
            email: Yup.string()
            .required('Sorrry the email is required')
            .email("Invalid Email"),

            password: Yup.string()
            .required("Sorry the password is required")
        }),
        onSubmit: (values)=>{
            setLoading(true)
            handleSubmit(values)
            console.log(values);
        }
    })


    const handleSubmit = (values) => {
        if(props.formType){
            console.log("I am here, ", values);
            dispatch(userRegister(values))
        }else{
            dispatch(userSignIn(values))
        }
    }

    useEffect(()=>{
        setLoading(false);
        if(notifications && notifications.success){
            navigate('/dashboard');
        }
    },[notifications,navigate])


    return (
        <>
        <div className="auth_container">
            {
                loading?
                <Loader/>
                :
                <form className="mt-3" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <TextField
                        style={{width:'100%', paddingBottom: '5%'}}
                        name='email'
                        label="Enter email"
                        variant="outlined"
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik,'email')}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                        style={{width:'100%',paddingBottom: '5%'}}
                        name='password'
                        label="Enter your password"
                        variant="outlined"
                        {...formik.getFieldProps('password')}
                        {...errorHelper(formik,'password')}
                        />
                    </div>
                    <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="small">
                        {props.formType ? 'Register' : 'Login'}
                    </Button>
                </form>
            }
        </div>
        </>
    )
}

export default AuthForm