import React, {useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { errorHelper } from "utils/tool";

import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

import { 
    List, 
    ListItem, 
    ListItemText, 
    Collapse,
    TextField,
    Button
 }
 from "@mui/material"; 

const RangeSelect = (props) => {

    const [open, setOpen] = useState(props.initState)

    const handleCollapseOpen = () => {
        setOpen(!open)
    }

    const formik = useFormik({
        initialValues: {min:0, max:5000},
        validationSchema: Yup.object({
            min:Yup.number()
                    .min(0,'The minimum is 0'),
            max: Yup.number()
                    .max(10000,'The max is 10000')
        }),
        onSubmit:(values)=>{
            props.handleRange([values.min, values.max])
        }
    })

    return (
        <>
            <div className="collapse_items_wrapper">
                <List>
                    <ListItem onClick={handleCollapseOpen}>
                        <ListItemText
                            primary={props.title}
                            className="collapse_title"
                        />
                        {open ? <ArrowDropUp/>: <ArrowDropDown/>}
                    </ListItem>
                    <Collapse in={open} timeout="auto">
                        <List component="div" disablePadding>
                           <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <div>
                                <TextField
                                    placeholder="$ min"
                                    name="min"
                                    type="number"
                                    variant="outlined"
                                    {...formik.getFieldProps('min')}
                                    {...errorHelper(formik, 'min')}
                                />
                            </div>
                            <div>
                                <TextField
                                    placeholder="$ max"
                                    name="max"
                                    type="number"
                                    variant="outlined"
                                    {...formik.getFieldProps('max')}
                                    {...errorHelper(formik, 'max')}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="mt-3"
                                variant="outlined"
                                color="secondary"
                                size="small"
                            >
                                submit
                            </Button>
                           </form>
                        </List>
                    </Collapse>
                </List>
            </div>
        </>
    )
}

export default RangeSelect