import {
    Box,
    Button,
    Container,
    Typography,
    TextField,
    Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import ProductsTable from "../components/ProductsTable";
import CustomAlert from "../components/CustomAlert";

function ProductList() {
    const [disabled, setdisabled] = useState(true);
    const [product, setproduct] = useState({ name: "" });
    const [open, setopen] = useState(false);

    const baseUrl = window.location.origin + "/api/product/";

    function addProduct() {
        if (product) {
            axios
                .post(baseUrl, { name: product.name })
                .then(() => {
                    setproduct({ name: "" });
                    setopen(true);
                })
                .catch((e) => console.log(e));
        }
    }

    function valueChanged(element) {
        const value = element.target.value;
        if (value) {
            setproduct({ name: value });
        } else {
            setproduct({ name: "" });
        }
        setdisabled(value === undefined || value === "");
    }

    return (
        <Container>
            <Typography variant="h4" mb={3}>
                Products
            </Typography>
            <Stack justifyContent={"flex-end"} direction={"row"} spacing={2}>
                <TextField
                    id="productNameField"
                    label="Enter Product Name"
                    value={product.name}
                    onChange={(el) => valueChanged(el)}
                />

                <Button
                    id="addBtn"
                    variant="contained"
                    color="primary"
                    disabled={disabled}
                    startIcon={<AddIcon />}
                    onClick={() => addProduct()}
                >
                    Create
                </Button>
            </Stack>

            <CustomAlert open={open} setOpen={setopen} />
            <ProductsTable />
        </Container>
    );
}

export default ProductList;

const dom = document.getElementById("productContainer");

if (dom) {
    ReactDOM.render(<ProductList />, dom);
}
