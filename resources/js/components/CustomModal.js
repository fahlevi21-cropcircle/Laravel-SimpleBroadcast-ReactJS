import { Container } from "postcss";
import React, { useState } from "react";

function CustomModal(props) {
    function ModalBody() {
        if (!props.withForm) {
            return (
                <Typography variant="h6" component="h2">
                    {props.modalDescription}
                </Typography>
            );
        }else if (props.alert) {
            
        }

        return <Container>Form here!</Container>
    }

    return (
        <Modal
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    {props.modalTitle}
                </Typography>

                {/* form */}
            </Box>
        </Modal>
    );
}

export default CustomModal;
