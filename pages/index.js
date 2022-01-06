import React, { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { Card, CardActionArea, CardContent, CardMedia, CardActions, Grid, Typography, Button } from '@mui/material'
import NextLink from "next/link"
import db from "../utils/db"
import Product from "../models/Product"
import { Store } from '../utils/store'
import axios from "axios"
import { useRouter } from 'next/router'

export default function Home(props) {
  const { products } = props
  const { state, dispatch } = useContext(Store)
  const router = useRouter()

  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock <= 0) {
      window.alert("Sorry, product is out of stock")
      return;
    }

    const existItem = state.cart.cartItems.find((item) => item._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } })
    router.push('/cart')

  }
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        {/** Parent Grid */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.name} md={4}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia component="img" image={product.image} title={product.name} />
                    <CardContent >
                      <Typography>
                        {product.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary" onClick={() => addToCartHandler(product)}> Add to cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>

  )
}

export async function getServerSideProps(context) {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()

  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }


}