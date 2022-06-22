import {
    Container,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Example() {
    const [subscribed, setsubscribed] = useState(false);
    const [receivedData, setreceivedData] = useState([]);
    const historyData = [];

    let channel = null;

    useEffect(() => {
        console.log("test");
        channel = window.Echo.channel("global-product");
    });

    function subscribeToEvent() {
        setsubscribed(true);
        channel.listen(".product.created", (e) => {
            // console.log(e.product);
            historyData.push(e.product);
            setreceivedData(Array.from(historyData));
        });
    }

    function unsubscribeFromEvent() {
        setsubscribed(false);
        window.Echo.leaveChannel("global-product");
    }

    function ReceivedItems() {
        if (receivedData.length === 0) {
            return (
                <List>
                    <ListItem key={0}>
                        <ListItemText
                            primary={"No received data"}
                            secondary={
                                "try to subscribe or wait for an event to be triggered"
                            }
                        ></ListItemText>
                    </ListItem>
                </List>
            );
        }

        let no = 0;

        return (
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
            >
                {receivedData.map((item) => {
                    no++;
                    return (
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={"Received #" + no}
                                secondary={"Item Name : " + item.name}
                            ></ListItemText>
                        </ListItem>
                    );
                })}
            </List>
        );
    }

    function SubscribeButton() {
        if (subscribed) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    mb={3}
                    onClick={() => unsubscribeFromEvent()}
                >
                    Unsubscribe
                </Button>
            );
        }

        return (
            <Button
                variant="contained"
                color="primary"
                mb={3}
                onClick={() => subscribeToEvent()}
            >
                Subscribe
            </Button>
        );
    }

    return (
        <Container>
            <Typography variant="h4" color="initial" mb={2}>
                Test Broadcast On 'product.created' event
            </Typography>

            <SubscribeButton />
            <Typography variant="h5" color="initial" mb={3}>
                Received Items
            </Typography>
            <ReceivedItems />
        </Container>
    );
}

export default Example;

if (document.getElementById("testContainer")) {
    ReactDOM.render(<Example />, document.getElementById("testContainer"));
}
