// This is dynamic routing
// first, find the route url from the param
import { useRouter } from 'next/router'
import NextLink from "next/link"
import Image from "next/image"
import React from 'react'
import Layout from '../../components/Layout'
import data from "../../utils/data"
import { Grid, Link, List, ListItem, Typography } from '@mui/material'
import useStyles from '../../utils/styles'


export default function ProductScreen() {
    const router = useRouter()
    const { slug } = router.query
    const product = data.products.find((product) => product.slug === slug)
    const classes = useStyles()

    if (!product) {
        return <div> product is not found!</div>
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
                    <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive">
                    </Image>
                </Grid>
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
                            <Typography component="h1"> {product.name}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography> Category: {product.category}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography> Brand: {product.brand}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography> Rating: {product.rating} starts </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography> Description: {product.description}</Typography>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item ></Grid>
            </Grid>
        </Layout>
    )
}
