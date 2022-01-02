// This is dynamic routing
// first, find the route url from the param
import { useRouter } from 'next/router'
import NextLink from "next/link"
import Image from "next/image"
import React from 'react'
import Layout from '../../components/Layout'
import data from "../../utils/data"
import { Grid, Link } from '@mui/material'
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
                <Grid item>

                </Grid>
                <Grid item md={6} xs={12}>
                    <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive">
                    </Image>
                </Grid>
                <Grid item ></Grid>
            </Grid>
        </Layout>
    )
}
