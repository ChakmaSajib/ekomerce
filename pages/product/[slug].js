// This is dynamic routing
// first, find the route url from the param
import NextLink from "next/link"
import Image from "next/image"
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import { Button, Card, Grid, Link, List, ListItem, Typography } from '@mui/material'
import useStyles from '../../utils/styles'
import db from "../../utils/db"
import Product from '../../models/Product'
import axios from 'axios'
import { Store } from '../../utils/store'
import { useRouter } from 'next/router'



export default function ProductScreen(props) {
    // const router = useRouter()
    // const { slug } = router.query
    // const product = products.find((product) => product.slug === slug)
    const { product } = props
    const router = useRouter()
    const classes = useStyles()
    const { dispatch, state } = useContext(Store)
    if (!product) {
        return <div>product is not found!</div>
    }

    const addToCartHandler = async () => {


        const existItem = state.cart.cartItems.find((item) => item._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1

        const { data } = await axios.get(`/api/products/${product._id}`)
        if (data.countInStock < quantity) {
            window.alert("Sorry, product is out of stock")
            return;
        }

        dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: quantity } })
        router.push("/cart")

    }
    return (
        <Layout title={product.name} description={product.name}>
            <div className={classes.section}>
                <NextLink href="/" passHref>
                    <Link>Back to products</Link>
                </NextLink>
            </div>

            <Grid container >
                {/** Image */}
                <Grid item md={6} xs={12}>
                    <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive" property="true">
                    </Image>
                </Grid>

                {/** Product information */}
                <Grid item md={3} xs={12}>

                    {/**
                     *  Name 
                     *  Category
                     *  Brand
                     *  Rating
                     *  Description
                     * 
                     */}
                    <List>
                        <ListItem>
                            <Typography component="h1" variant="h1"> {product.name}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography> Category: {product.category}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography> Brand: {product.brand}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography> Rating: {product.rating} stars ({product.numReviews} reviews) </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography> Description: {product.description}</Typography>
                        </ListItem>
                    </List>
                </Grid>

                {/** Product price and status */}
                <Grid item md={3} xs={12}>
                    <Card>

                        <List>
                            {/** price */}
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6} >
                                        <Typography>Price: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>${product.price}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>

                            {/** status */}
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography> Status:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{product.countInStock > 0 ? "In stock" : "Unavailable"}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>

                            {/** Add to cart button */}
                            <ListItem>
                                <Button fullWidth color="primary" variant="contained" onClick={addToCartHandler}>
                                    <Typography>Add to cart</Typography>
                                </Button>
                            </ListItem>

                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const { params } = context
    const { slug } = params

    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()
    return {
        props: {
            product: db.convertDocToObj(product)
        }
    }



}