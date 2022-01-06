import dynamic from "next/dynamic"
import { Button, Card, CardContent, CardHeader, Grid, Link, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/store'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import Image from 'next/image'
import _ from "lodash"
import Cookies from 'js-cookie'




function PlaceOrder() {
    const classes = useStyles()
    const { state, dispatch } = useContext(Store)
    const {
        cart: { shippingAddress, paymentMethod },
    } = state;

    const cartItems = Cookies.get("cartItems")
    console.log(cartItems)


    const price = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    const itemsPrice = _.round(price, 2)
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = _.round(itemsPrice * 0.15, 2)
    const totalPrice = _.round((itemsPrice + shippingPrice + taxPrice), 2)

    return (
        <Layout title="Placeholder">

            <CheckoutWizard activeStep={3} />

            <Typography variant="h1" component="h1">Place Order</Typography>

            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <Card className={classes.section}>
                        <CardContent>
                            <Typography>Shipping Address</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="body1">
                                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                                {shippingAddress.country}
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography variant="h2">Payment Method</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>{paymentMethod.replace(/['", \\]+/g, '')}</Typography>
                            </ListItem>
                        </List>
                    </Card>

                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component="h2" variant="h2">
                                    Order Items
                                </Typography>
                            </ListItem>

                            <ListItem>
                                <TableContainer >
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Image
                                                </TableCell>

                                                <TableCell>
                                                    Name
                                                </TableCell>

                                                <TableCell align="right">
                                                    Quantity
                                                </TableCell>

                                                <TableCell align="right">
                                                    Price
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {cartItems.map((item) => {
                                                <TableRow key={item._id}>
                                                    <TableCell>
                                                        <NextLink href={`/product/${item.slug}`} passHref>
                                                            <Link>
                                                                <Image src={item.image} alt={item.image} width={80} height={80}></Image>
                                                            </Link>
                                                        </NextLink>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography>{item.name}</Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography align="right">{item.quantity}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography align="right">${item.price}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>

                                </TableContainer>
                            </ListItem>
                        </List>
                    </Card>



                </Grid >
                <Grid item md={3} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography variant="h2" component="h2"> Order Summary</Typography>
                            </ListItem>


                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Items: </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography>${itemsPrice}</Typography>
                                    </Grid>
                                </Grid>

                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Tax: </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography>${taxPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>

                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Shipping: </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography>${shippingPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography><strong>Total: </strong> </Typography>
                                    </Grid>

                                    <Grid item item xs={6}>
                                        <Typography> <strong>${totalPrice}</strong></Typography>
                                    </Grid>
                                </Grid>

                            </ListItem>

                            <ListItem>
                                <Button fullWidth color="primary" variant="contained">Place order </Button>
                            </ListItem>


                        </List>
                    </Card>

                </Grid>

            </Grid >

        </Layout >
    )
}


export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });