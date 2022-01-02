import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { Card, CardActionArea, CardContent, CardMedia, CardActions, Grid, Typography, Button } from '@mui/material'
import data from "../utils/data"

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        {/** Parent Grid */}
        <Grid container spacing={3}>
          {data.products.map((product) => (
            <Grid item key={product.name} md={6}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" image={product.image} title={product.name}>
                  </CardMedia>
                  <CardContent >
                    <Typography>
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary"> Add to cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>

  )
}
