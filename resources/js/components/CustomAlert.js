import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

function CustomAlert(props) {
    return (
        <Box sx={{ width: "100%" }} m={3}>
            <Collapse in={props.open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                props.setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Operation Success!
                </Alert>
            </Collapse>
        </Box>
    );
}

export default CustomAlert;
