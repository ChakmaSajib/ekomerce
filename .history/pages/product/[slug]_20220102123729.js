// This is dynamic routing
// first, find the route url from the param
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import data from "../../utils/data"

export default function ProductScreen() {
    const router = useRouter()
    const { slug } = router.query
    const product = data.products.find((product) => product.slug === slug)

    if (!product) {
        return <div> product is not found!</div>
    }
    return (
        <Layout title={product.name} description={product.name}>
            <h1>{product.name}</h1>
        </Layout>
    )
}