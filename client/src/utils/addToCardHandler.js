import React from "react";

import {Modal, Button} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";

const AddToCartHandler = ({modal,handleClose, errorType}) => {

    return (
        <>
        <Modal show={modal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sorry </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {errorType === 'auth' ?

            <div>Sorry register or signin to continue</div>
            :
            <div>Sorry verify your account first</div>
            
            }
            </Modal.Body>
            <Modal.Footer>
                {
                    errorType === 'auth' ?
                    <LinkContainer to="/sign_in">
                        <Button variant="primary">Go to Register</Button>
                    </LinkContainer>

                    :
                    <Button variant="primary"
                        onClick={()=>alert("trigger")}
                    >
                          Send email verification
                    </Button>

                }
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default AddToCartHandler;