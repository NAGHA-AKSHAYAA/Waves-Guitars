import React from "react";
import { Link } from 'react-router-dom'
import { AddShoppingCart } from "@mui/icons-material";
import {  toast  } from 'react-toastify';

export const WavesButton = (props) => {
    let template = '';


    switch (props.type) {
        case "default":
            template = <Link
                className={!props.altClass ? 'link_default' : props.altClass}
                to={props.linkTo}
                style={{
                    ...props.style
                }}
            >{props.title}</Link>
            break

        case "bag_link":
            template =
                <div
                    className="bsg_link"
                    onClick={() => {
                        props.runAction()
                    }}
                    style={{ ...props.style }}
                >
                    <AddShoppingCart style={{ fontsize: props.iconSize }} />
                </div>

            break;
        default:
            template = ''
    }
    return template
}


export const renderCardImage = (image) => {
    if (image.length > 0) {

    } else {
        return '/images/image_not_availble.png'
    }
}

export const showToast = (type,msg) => {
    switch(type){
        case 'SUCCESS':
            toast.success(msg,{
                position: "bottom-right"
            })
        break;

        case 'ERROR':
            toast.error(msg,{
                position: "bottom-right"
            })

        break;

        default:
            return false
    }
}