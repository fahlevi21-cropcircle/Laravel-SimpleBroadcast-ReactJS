import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

function ProductsTable(props) {
    const [products, setproducts] = useState([]);
    const [open, setopen] = useState(false);

    const baseUrl = window.location.origin + "/api/product/";
    let no = 0;

    useEffect(() => {
        window.Echo.channel("global-product").listen(
            ".product.created",
            (e) => {
                fetchProduct();
            }
        );

        fetchProduct();
    },[]);

    function fetchProduct() {
        window.axios
            .get(baseUrl)
            .then((res) => {
                // console.log(res);
                setproducts(res.data);
            })
            .catch((e) => console.log(e));
    }

    function deleteProduct(id) {
        if (id !== undefined) {
            window.axios
                .delete(baseUrl + id)
                .then(() => fetchProduct())
                .catch((e) => console.log(e));
        }
    }

    function RenderRows(row) {
        no++;
        return (
            <TableRow
                key={row.id}
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                }}
            >
                <TableCell>{no}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">
                    <IconButton aria-label="View">
                        <ViewIcon color={"primary"} />
                    </IconButton>
                    <IconButton aria-label="Edit">
                        <EditIcon color="secondary" />
                    </IconButton>
                    <IconButton
                        aria-label="Delete"
                        onClick={() => deleteProduct(row.id)}
                    >
                        <DeleteIcon color="danger" />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>UUID</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{products.map((row) => RenderRows(row))}</TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductsTable;

const dom = document.getElementById("productsTable");

if (dom) {
    ReactDOM.render(<ProductsTable />, dom);
}
