import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearCurrentProduct } from "store/actions";
import { productById } from "store/actions/products.actions";
import Loader from "utils/loader";
import ProdInfo from "./prodInfo";
import { renderCardImage } from "utils/tool";

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal } from "react-bootstrap";


const ProductDetails = () => {
    const {id} = useParams()
    const [modal, setModal]= useState(false)
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const sliderSettings = {
        dot: false,
        infinte: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const handleClose = () => {
        setModal(false)
    }

    const handleCarrousel = () => {
        if(products.byId.data.images.length > 0){
            setModal(true)
        }
    }

    useEffect(()=>{
        dispatch(productById(id))
    },[dispatch, id])

    useEffect(()=>{
        return ()=>{
            dispatch(clearCurrentProduct())
        }
    },[dispatch])

    return (
        <div className="page_container">
                <div className="container">
                    {products && products.byId ?
                     <div className="product_detail_wrapper">
                        <div className="left">
                            <div>
                                <img 
                                    alt="some alt"
                                    src={renderCardImage(products.byId.data.images)}
                                    onClick={()=> handleCarrousel()} />
                            </div>
                        </div>
                        <div className="right">
                            <ProdInfo
                                detail={products.byId.data}
                            />
                        </div>
                     </div>
                
                    :
                        <Loader/>
                    }
                </div>

                <Modal show={modal} onHide={handleClose} dialogClassName="modal-90w">
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <Slider {...sliderSettings}>
                            {
                                products.byId && products.byId.data.images ?
                                products.byId.data.images.map((item)=>(
                                    <div key={item} style={{margin:'0 auto'}}>
                                        <div className="img-block"
                                            style={{
                                                background: `url(${item}) no-repeat`
                                            }}
                                        ></div>
                                    </div>
                                ))
                                :
                                null
                            }
                        </Slider>
                    </Modal.Body>
                </Modal>
            </div>
    )
}

export default ProductDetails