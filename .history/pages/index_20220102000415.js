import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { Card, CardActionArea, CardMedia, Grid } from '@mui/material'
import data from "../utils/data"

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        {/** Parent Grid */}
        <Grid container spacing={3}>
          {data.products.map((product) => {
            <Grid item key={product.name} md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" image={product.image} title={product.name}>

                  </CardMedia>
                </CardActionArea>
              </Card>
            </Grid>
          })}
        </Grid>
      </div>
    </Layout>

  )
}
