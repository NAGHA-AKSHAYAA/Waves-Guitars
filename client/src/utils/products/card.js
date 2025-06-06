import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import {renderCardImage, WavesButton} from '../tool'
import { useDispatch, useSelector } from "react-redux";
import AddToCartHandler from "utils/addToCardHandler";
import { userAddToCart } from "store/actions/users.actions";

const Card = (props) => {
    const [modal, setModal]= useState(false)
    const [errorType, setErrorType] = useState(null)
    const user = useSelector( state=> state.users)
    const dispatch = useDispatch()


    const handleClose = () => setModal(false)
    const handleAddToCart=(item) => {
        console.log(user);
        
        if(!user.auth){
            setModal(true);
            setErrorType('auth')
            return false
        }

        if(!user.data.verified){
            setModal(true)
            setErrorType('verify')
            return false
        }
        
        dispatch(userAddToCart(item))
    }

    return(
        <div className={`card_item_wrapper ${props.grid ? 'grid_bars': ''}`}>
            <div 
            className="image"
            style={{
                background:`url(${renderCardImage(props.item.images)})`
            }}>
            </div>
            <div className="action_container">
            <div className="tags">
                <div className="brand">{props.item.brand.name}</div>
                <div className="name">{props.item.model}</div>
                <div className="price">{props.item.price}</div>
            </div>

                {props.grid ? (
                    <div className="description">
                        <p>{props.item.description}</p>
                    </div>
                ) : null}

                <div className="actions">
                    <div className="button_wrapp">
                        <WavesButton
                            type="default"
                            altClass="card_link"
                            title="View product"
                            linkTo={`/product_detail/${props.item._id}`}
                            style={{
                                fontWeight:'Bold'
                            }}
                        />
                    </div>
                    <div className="button_wrapp">
                        <WavesButton
                        type="bag_link"
                        runAction={()=>handleAddToCart(props.item)}
                        />
                    </div>
                </div>
            </div>

            <AddToCartHandler
                modal={modal}
                errorType={errorType}
                handleClose={handleClose}
                />
        </div>
    )
}


export default Card;