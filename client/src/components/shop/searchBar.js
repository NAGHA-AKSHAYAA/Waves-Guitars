import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { errorHelper } from "utils/tool";


import { TextField
 } from "@mui/material";


 const SearchBar = ({handleKeyword}) => {

    const formik = useFormik({
        initialValues: {keywords: ''},
        validationSchema: Yup.object({
            keywords: Yup.string()
                        .min(3, "You neeed to search more than 3")
                        .max(200, 'You need to search for less than 200')
        }),
        onSubmit: (values, {resetForm })=>{
            handleKeyword(values.keywords)
            resetForm()
        }
    })

    return (
        <div className="container">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        style={{
                            width:'100%'
                        }}
                        placeholder="Search for something"
                        name="keywords"
                        variant="outlined"
                        {...formik.getFieldProps('keywords')}
                        {...errorHelper(formik, 'keywords')}
                    />
                </div>
            </form>
        </div>
    )
 }


 export default SearchBar   